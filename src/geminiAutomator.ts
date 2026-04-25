import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

import { chromium, type Browser, type BrowserContext, type Locator, type Page } from 'playwright';

import type { GeminiAutomatorOptions, PromptItem, PromptResult } from './types';

interface LocatorCandidate {
  name: string;
  locator: () => Locator;
}

interface LocatedElement {
  name: string;
  locator: Locator;
}

interface ResponseSnapshot {
  totalCount: number;
  latestText: string;
  source: string;
}

interface ClipboardFilePayload {
  name: string;
  type: string;
  base64: string;
}

interface TextAttachmentPayload {
  name: string;
  content: string;
}

const RESPONSE_SELECTORS = [
  'model-response',
  '.model-response-text',
  'message-content',
  '[data-testid*="response" i]',
  '[data-test-id*="response" i]',
  '.markdown',
  'main [role="article"]',
];

const GEMINI_LINK_SETTLE_MS = 4_000;

export class GeminiAutomator {
  constructor(private readonly options: GeminiAutomatorOptions) {}

  async run(prompts: PromptItem[]): Promise<PromptResult[]> {
    await mkdir(this.options.outDir, { recursive: true });
    await mkdir(this.options.profileDir, { recursive: true });

    if (this.options.cdpUrl) {
      return this.runWithExistingBrowser(prompts, this.options.cdpUrl);
    }

    const context = await chromium.launchPersistentContext(this.options.profileDir, {
      acceptDownloads: true,
      channel: this.options.browserChannel,
      executablePath: this.options.browserExecutable,
      headless: this.options.headless,
      viewport: { width: 1280, height: 900 },
    });

    try {
      context.setDefaultTimeout(15_000);
      await this.grantClipboardPermissions(context);
      const page = context.pages()[0] ?? (await context.newPage());
      await this.openGemini(page);

      const results: PromptResult[] = [];
      for (const prompt of prompts) {
        results.push(await this.runPrompt(page, prompt));
      }

      return results;
    } finally {
      await context.close();
    }
  }

  private async runWithExistingBrowser(prompts: PromptItem[], cdpUrl: string): Promise<PromptResult[]> {
    const browser = await chromium.connectOverCDP(cdpUrl);

    try {
      const context = browser.contexts()[0];
      if (!context) {
        throw new Error(`Connected to ${cdpUrl}, but no browser context was available.`);
      }

      context.setDefaultTimeout(15_000);
      await this.grantClipboardPermissions(context);
      const page = await this.findOrCreateTargetPage(context);
      await this.openGemini(page);

      const results: PromptResult[] = [];
      for (const prompt of prompts) {
        results.push(await this.runPrompt(page, prompt));
      }

      return results;
    } finally {
      disconnectWithoutClosingBrowser(browser);
    }
  }

  private async findOrCreateTargetPage(context: BrowserContext): Promise<Page> {
    const pages = context.pages();
    const targetUrl = new URL(this.options.geminiUrl);
    const targetPage = pages.find((page) => isSameGeminiTarget(page.url(), targetUrl));

    if (targetPage) {
      return targetPage;
    }

    return context.newPage();
  }

  private async grantClipboardPermissions(context: BrowserContext): Promise<void> {
    await context
      .grantPermissions(['clipboard-read', 'clipboard-write'], {
        origin: new URL(this.options.geminiUrl).origin,
      })
      .catch(() => undefined);
  }

  private async openGemini(page: Page): Promise<void> {
    await page.goto(this.options.geminiUrl, { waitUntil: 'domcontentloaded' });
    await page.bringToFront();
    await this.waitForRequestedGeminiUrl(page);
    await delay(GEMINI_LINK_SETTLE_MS);

    try {
      await this.findPromptInput(page, 15_000);
      return;
    } catch (error) {
      if (this.options.headless) {
        throw new Error(
          `Could not find the Gemini prompt box in headless mode. Run once without --headless and sign in. ${formatError(error)}`,
        );
      }
    }

    console.log('\nGemini is not ready yet. If the browser is asking you to sign in, complete that now.');
    await waitForEnter('After Gemini shows the prompt box, press Enter here to continue...');
    await this.findPromptInput(page, 120_000);
    await this.waitForRequestedGeminiUrl(page);
  }

  private async waitForRequestedGeminiUrl(page: Page): Promise<void> {
    const targetUrl = new URL(this.options.geminiUrl);
    if (!isSpecificGeminiChatTarget(targetUrl)) {
      return;
    }

    await page
      .waitForURL((url) => isSameGeminiTarget(url.href, targetUrl), {
        timeout: 30_000,
        waitUntil: 'domcontentloaded',
      })
      .catch(() => undefined);

    if (!isSameGeminiTarget(page.url(), targetUrl)) {
      throw new Error(
        `Gemini did not stay on requested chat URL before prompting. Expected ${targetUrl.href}, got ${page.url()}`,
      );
    }
  }

  private async runPrompt(page: Page, prompt: PromptItem): Promise<PromptResult> {
    console.log(`\nSubmitting prompt: ${prompt.id}`);

    const before = await this.readResponseSnapshot(page);
    await this.attachFiles(page, prompt.attachments);
    await this.submitPrompt(page, prompt.prompt);

    const response = await this.waitForResponseCompletion(page, before, prompt.prompt);
    const completedAt = new Date().toISOString();
    const outputPath = await this.saveMarkdown(prompt, response, completedAt);

    console.log(`Saved response: ${outputPath}`);

    return {
      id: prompt.id,
      prompt: prompt.prompt,
      attachments: prompt.attachments,
      response,
      outputPath,
      completedAt,
    };
  }

  private async attachFiles(page: Page, attachments: string[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    console.log(`Pasting ${attachments.length} file${attachments.length === 1 ? '' : 's'} into Gemini...`);

    const inputBox = await this.findPromptInput(page, 30_000);
    await inputBox.click();
    await this.copyFilesToBrowserClipboard(page, attachments);
    const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
    await page.keyboard.press(`${modifier}+V`);
    await this.waitForAttachmentProcessing(page, attachments.length);
  }

  private async copyFilesToBrowserClipboard(page: Page, attachments: string[]): Promise<void> {
    if (attachments.every(isTextLikePath)) {
      const textAttachments = await Promise.all(
        attachments.map(async (attachment) => ({
          name: path.basename(attachment),
          content: await readFile(attachment, 'utf8'),
        })),
      );

      await this.copyTextAttachmentsToBrowserClipboard(page, textAttachments);
      return;
    }

    const files = await Promise.all(
      attachments.map(async (attachment) => ({
        name: path.basename(attachment),
        type: mimeTypeForPath(attachment),
        base64: (await readFile(attachment)).toString('base64'),
      })),
    );

    await page.evaluate(async (clipboardFiles: ClipboardFilePayload[]) => {
      const clipboardItems = clipboardFiles.map((clipboardFile) => {
        const binary = atob(clipboardFile.base64);
        const bytes = new Uint8Array(binary.length);
        for (let index = 0; index < binary.length; index += 1) {
          bytes[index] = binary.charCodeAt(index);
        }

        return new ClipboardItem({
          [clipboardFile.type]: new Blob([bytes], {
            type: clipboardFile.type,
          }),
        });
      });

      await navigator.clipboard.write(clipboardItems);
    }, files);
  }

  private async copyTextAttachmentsToBrowserClipboard(
    page: Page,
    attachments: TextAttachmentPayload[],
  ): Promise<void> {
    const clipboardText =
      attachments.length === 1
        ? attachments[0]?.content ?? ''
        : attachments
            .map((attachment) => `--- File: ${attachment.name} ---\n\n${attachment.content}`)
            .join('\n\n');

    await page.evaluate(async (text) => {
      await navigator.clipboard.writeText(text);
    }, clipboardText);
  }

  private async submitPrompt(page: Page, prompt: string): Promise<void> {
    const inputBox = await this.findPromptInput(page, 30_000);

    await inputBox.click();
    try {
      await inputBox.fill(prompt);
    } catch {
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
      await inputBox.press(`${modifier}+A`).catch(() => undefined);
      await page.keyboard.press('Backspace').catch(() => undefined);
      await page.keyboard.insertText(prompt);
    }

    await delay(500);

    const sendButton = await this.findSendButton(page, 15_000);
    if (sendButton) {
      console.log(`Clicking Gemini send control: ${sendButton.name}`);
      await sendButton.locator.click();
      return;
    }

    console.warn('Could not find a visible Send button. Falling back to keyboard shortcut.');
    await page.keyboard.press('Control+Enter').catch(() => inputBox.press('Enter'));
  }

  private async waitForResponseCompletion(
    page: Page,
    before: ResponseSnapshot,
    submittedPrompt: string,
  ): Promise<string> {
    const deadline = Date.now() + this.options.maxWaitMs;
    let latestText = before.latestText;
    let lastChangedAt = Date.now();
    let bestResponse = '';

    while (Date.now() < deadline) {
      const snapshot = await this.readResponseSnapshot(page);
      const latestNormalized = normalizeForComparison(snapshot.latestText);

      if (latestNormalized !== normalizeForComparison(latestText)) {
        latestText = snapshot.latestText;
        lastChangedAt = Date.now();
      }

      const textLooksNew =
        Boolean(snapshot.latestText) &&
        latestNormalized !== normalizeForComparison(submittedPrompt) &&
        (snapshot.totalCount > before.totalCount ||
          latestNormalized !== normalizeForComparison(before.latestText));

      if (textLooksNew) {
        bestResponse = snapshot.latestText;
      }

      const isStable = Boolean(bestResponse) && Date.now() - lastChangedAt >= this.options.stableMs;
      if (isStable && !(await this.isGenerating(page))) {
        return bestResponse.trim();
      }

      await delay(1_000);
    }

    const lastSeen = bestResponse || latestText || 'No response text detected.';
    throw new Error(
      `Timed out waiting for Gemini to finish. Last response snapshot: "${truncate(lastSeen, 240)}"`,
    );
  }

  private async findPromptInput(page: Page, timeoutMs: number): Promise<Locator> {
    const promptInput = await findVisibleLocator(
      [
        {
          name: 'labeled prompt input',
          locator: () => page.getByLabel(/enter.*prompt|prompt|message/i),
        },
        {
          name: 'textbox',
          locator: () => page.getByRole('textbox'),
        },
        {
          name: 'rich text editor',
          locator: () => page.locator('rich-textarea [contenteditable="true"]'),
        },
        {
          name: 'contenteditable textbox',
          locator: () => page.locator('[contenteditable="true"][role="textbox"]'),
        },
        {
          name: 'contenteditable',
          locator: () => page.locator('[contenteditable="true"]'),
        },
        {
          name: 'textarea',
          locator: () => page.locator('textarea'),
        },
      ],
      timeoutMs,
      true,
    );

    return promptInput.locator;
  }

  private async findSendButton(page: Page, timeoutMs: number): Promise<LocatedElement | null> {
    return findVisibleLocator(
      [
        {
          name: 'accessible send button',
          locator: () => page.getByRole('button', { name: /send|submit/i }),
        },
        {
          name: 'send aria button',
          locator: () =>
            page.locator(
              'button[aria-label*="send" i], button[title*="send" i], button[data-testid*="send" i], button[data-test-id*="send" i], [role="button"][aria-label*="send" i], [aria-label*="Send message" i]',
            ),
        },
        {
          name: 'material send icon button',
          locator: () => page.locator('button:has(mat-icon:has-text("send"))'),
        },
        {
          name: 'send text button',
          locator: () => page.locator('button:has-text("Send")'),
        },
      ],
      timeoutMs,
      true,
    ).catch(() => null);
  }

  private async waitForAttachmentProcessing(page: Page, attachmentCount: number): Promise<void> {
    console.log('Waiting for Gemini to process pasted attachment...');

    const deadline = Date.now() + Math.max(30_000, attachmentCount * 30_000);
    const minimumWaitUntil = Date.now() + 5_000;
    let sawBusyState = false;

    while (Date.now() < deadline) {
      const busy = await this.isAttachmentProcessing(page);
      if (busy) {
        sawBusyState = true;
      }

      if (!busy && Date.now() >= minimumWaitUntil && (sawBusyState || attachmentCount > 0)) {
        return;
      }

      await delay(1_000);
    }

    console.warn('Attachment paste did not expose a clear completion signal; continuing with prompt submit.');
  }

  private async isAttachmentProcessing(page: Page): Promise<boolean> {
    const processingIndicators = [
      page.getByText(/uploading|processing|analyzing|scanning/i),
      page.locator('[aria-busy="true"], [role="progressbar"], mat-progress-spinner'),
    ];

    for (const indicator of processingIndicators) {
      const count = await indicator.count().catch(() => 0);
      for (let index = count - 1; index >= 0; index -= 1) {
        if (await indicator.nth(index).isVisible({ timeout: 250 }).catch(() => false)) {
          return true;
        }
      }
    }

    return false;
  }

  private async isGenerating(page: Page): Promise<boolean> {
    const stopControls = [
      page.getByRole('button', { name: /stop|cancel/i }),
      page.locator('button[aria-label*="stop" i], button[aria-label*="cancel" i]'),
      page.locator('button:has-text("Stop"), button:has-text("Cancel")'),
    ];

    for (const controls of stopControls) {
      const count = await controls.count().catch(() => 0);
      for (let index = count - 1; index >= 0; index -= 1) {
        const control = controls.nth(index);
        if (await control.isVisible({ timeout: 250 }).catch(() => false)) {
          return true;
        }
      }
    }

    return false;
  }

  private async readResponseSnapshot(page: Page): Promise<ResponseSnapshot> {
    let totalCount = 0;

    for (const selector of RESPONSE_SELECTORS) {
      const locator = page.locator(selector);
      const count = await locator.count().catch(() => 0);
      totalCount += count;

      const latestText = await readLatestText(locator, count);
      if (latestText) {
        return {
          totalCount,
          latestText,
          source: selector,
        };
      }
    }

    return {
      totalCount,
      latestText: '',
      source: 'none',
    };
  }

  private async saveMarkdown(
    prompt: PromptItem,
    response: string,
    completedAt: string,
  ): Promise<string> {
    const filename = `${timestampForFile(completedAt)}-${sanitizeFilePart(prompt.id)}.md`;
    const outputPath = path.join(this.options.outDir, filename);
    const markdown = renderMarkdown(prompt, response, completedAt);

    await writeFile(outputPath, markdown, 'utf8');
    return outputPath;
  }
}

async function findVisibleLocator(
  candidates: LocatorCandidate[],
  timeoutMs: number,
  requireEnabled: boolean,
): Promise<LocatedElement> {
  const deadline = Date.now() + timeoutMs;
  let lastCandidate = candidates[candidates.length - 1]?.name ?? 'unknown';

  while (Date.now() < deadline) {
    for (const candidate of candidates) {
      lastCandidate = candidate.name;
      const locator = candidate.locator();
      const count = await locator.count().catch(() => 0);

      if (count === 0) {
        continue;
      }

      for (let index = count - 1; index >= 0; index -= 1) {
        const target = locator.nth(index);
        const visible = await target.isVisible({ timeout: 250 }).catch(() => false);
        if (!visible) {
          continue;
        }

        if (requireEnabled) {
          const enabled = await target.isEnabled({ timeout: 250 }).catch(() => true);
          if (!enabled) {
            continue;
          }
        }

        return {
          name: candidate.name,
          locator: target,
        };
      }
    }

    await delay(250);
  }

  throw new Error(`Could not find visible locator. Last checked: ${lastCandidate}.`);
}

async function readLatestText(locator: Locator, count: number): Promise<string> {
  const minIndex = Math.max(0, count - 6);
  for (let index = count - 1; index >= minIndex; index -= 1) {
    const text = await locator
      .nth(index)
      .innerText({ timeout: 500 })
      .catch(() => '');
    const clean = cleanExtractedText(text);

    if (clean) {
      return clean;
    }
  }

  return '';
}

function disconnectWithoutClosingBrowser(browser: Browser): void {
  const browserWithConnection = browser as unknown as { _connection?: { close: () => void } };
  browserWithConnection._connection?.close();
}

function isSpecificGeminiChatTarget(url: URL): boolean {
  return url.hostname === 'gemini.google.com' && /^\/app\/[^/]+/.test(url.pathname);
}

function isSameGeminiTarget(candidateUrl: string, targetUrl: URL): boolean {
  const candidate = safeParseUrl(candidateUrl);
  if (!candidate) {
    return false;
  }

  if (candidate.origin !== targetUrl.origin) {
    return false;
  }

  if (!isSpecificGeminiChatTarget(targetUrl)) {
    return candidate.pathname === targetUrl.pathname;
  }

  return candidate.pathname === targetUrl.pathname || candidate.pathname.startsWith(`${targetUrl.pathname}/`);
}

function safeParseUrl(value: string): URL | null {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function renderMarkdown(prompt: PromptItem, response: string, completedAt: string): string {
  const attachmentBlock =
    prompt.attachments.length > 0
      ? `\n## Attachments\n\n${prompt.attachments.map((attachment) => `- ${attachment}`).join('\n')}\n`
      : '';

  return `# Gemini Response: ${prompt.id}

- Completed at: ${completedAt}

## Prompt

~~~text
${prompt.prompt}
~~~
${attachmentBlock}

## Response

${response.trim()}
`;
}

async function waitForEnter(message: string): Promise<void> {
  const readline = createInterface({ input, output });
  try {
    await readline.question(`${message} `);
  } finally {
    readline.close();
  }
}

function cleanExtractedText(value: string): string {
  return value.replace(/\r\n/g, '\n').replace(/[ \t]+\n/g, '\n').trim();
}

function normalizeForComparison(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function sanitizeFilePart(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function isTextLikePath(filePath: string): boolean {
  const extension = path.extname(filePath).toLowerCase();
  return new Set([
    '.c',
    '.cpp',
    '.cs',
    '.css',
    '.csv',
    '.go',
    '.html',
    '.java',
    '.js',
    '.json',
    '.jsx',
    '.log',
    '.md',
    '.mdx',
    '.py',
    '.rs',
    '.sh',
    '.sql',
    '.ts',
    '.tsx',
    '.txt',
    '.xml',
    '.yaml',
    '.yml',
  ]).has(extension);
}

function mimeTypeForPath(filePath: string): string {
  const extension = path.extname(filePath).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.bmp': 'image/bmp',
    '.csv': 'text/csv',
    '.gif': 'image/gif',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.json': 'application/json',
    '.md': 'text/markdown',
    '.pdf': 'application/pdf',
    '.png': 'image/png',
    '.txt': 'text/plain',
    '.webp': 'image/webp',
  };

  return mimeTypes[extension] ?? 'application/octet-stream';
}

function timestampForFile(value: string): string {
  return value.replace(/[:.]/g, '-');
}

function truncate(value: string, maxLength: number): string {
  return value.length <= maxLength ? value : `${value.slice(0, maxLength - 3)}...`;
}

function formatError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
