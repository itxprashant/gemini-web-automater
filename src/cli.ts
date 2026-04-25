#!/usr/bin/env node
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';

import { GeminiAutomator } from './geminiAutomator';
import type { CliOptions, PromptItem, PromptQueueFile, RawPromptItem } from './types';

const DEFAULT_OPTIONS = {
  inputPath: 'prompts.example.json',
  outDir: 'responses',
  profileDir: '.playwright/gemini-profile',
  geminiUrl: 'https://gemini.google.com/app',
  headless: false,
  dryRun: false,
  loginOnly: false,
  browserChannel: undefined,
  browserExecutable: undefined,
  cdpUrl: undefined,
  remoteDebuggingPort: 9222,
  attachments: [],
  maxWaitMs: 180_000,
  stableMs: 4_000,
} satisfies CliOptions;

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));

  if (options.loginOnly) {
    await launchLoginBrowser(options);
    return;
  }

  const prompts = await loadPromptQueue(options.inputPath, options.attachments);

  console.log(`Loaded ${prompts.length} prompt${prompts.length === 1 ? '' : 's'}.`);

  if (options.dryRun) {
    console.log('Dry run only. Prompts were parsed successfully:');
    for (const prompt of prompts) {
      const attachmentSummary =
        prompt.attachments.length > 0 ? ` (${prompt.attachments.length} attachment${prompt.attachments.length === 1 ? '' : 's'})` : '';
      console.log(`- ${prompt.id}${attachmentSummary}`);
    }
    return;
  }

  console.log(`Using Gemini profile: ${options.profileDir}`);
  console.log(`Opening Gemini URL: ${options.geminiUrl}`);

  const automator = new GeminiAutomator(options);
  const results = await automator.run(prompts);

  console.log('\nCompleted prompt queue:');
  for (const result of results) {
    console.log(`- ${result.id}: ${result.outputPath}`);
  }
}

function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    ...DEFAULT_OPTIONS,
    inputPath: path.resolve(DEFAULT_OPTIONS.inputPath),
    outDir: path.resolve(DEFAULT_OPTIONS.outDir),
    profileDir: path.resolve(DEFAULT_OPTIONS.profileDir),
  };

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    switch (arg) {
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
      case '--input':
      case '-i':
        options.inputPath = path.resolve(readRequiredValue(args, (index += 1), arg));
        break;
      case '--out':
      case '-o':
        options.outDir = path.resolve(readRequiredValue(args, (index += 1), arg));
        break;
      case '--profile':
        options.profileDir = path.resolve(readRequiredValue(args, (index += 1), arg));
        break;
      case '--url':
      case '--chat-url':
        options.geminiUrl = normalizeGeminiUrl(readRequiredValue(args, (index += 1), arg));
        break;
      case '--headless':
        options.headless = true;
        break;
      case '--headed':
        options.headless = false;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--login':
        options.loginOnly = true;
        break;
      case '--browser-channel':
        options.browserChannel = readRequiredValue(args, (index += 1), arg);
        break;
      case '--browser-executable':
        options.browserExecutable = path.resolve(readRequiredValue(args, (index += 1), arg));
        break;
      case '--connect-cdp':
      case '--cdp-url':
        options.cdpUrl = readRequiredValue(args, (index += 1), arg);
        break;
      case '--remote-debugging-port':
        options.remoteDebuggingPort = parsePositiveInt(readRequiredValue(args, (index += 1), arg), arg);
        break;
      case '--attach':
      case '--file':
        options.attachments.push(path.resolve(readRequiredValue(args, (index += 1), arg)));
        break;
      case '--max-wait-ms':
        options.maxWaitMs = parsePositiveInt(readRequiredValue(args, (index += 1), arg), arg);
        break;
      case '--stable-ms':
        options.stableMs = parsePositiveInt(readRequiredValue(args, (index += 1), arg), arg);
        break;
      default:
        if (options.loginOnly && !arg.startsWith('-') && !options.browserExecutable) {
          options.browserExecutable = path.resolve(arg);
          break;
        }

        throw new Error(`Unknown option "${arg}". Run with --help for usage.`);
    }
  }

  return options;
}

function normalizeGeminiUrl(value: string): string {
  const parsed = new URL(value);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`Gemini URL must be an http(s) URL: ${value}`);
  }

  return parsed.toString();
}

async function launchLoginBrowser(options: CliOptions): Promise<void> {
  const browserExecutable = await resolveLoginBrowserExecutable(options.browserExecutable);
  const browserArgs = [
    `--user-data-dir=${options.profileDir}`,
    '--profile-directory=Default',
    `--remote-debugging-port=${options.remoteDebuggingPort}`,
    '--no-first-run',
    '--no-default-browser-check',
    options.geminiUrl,
  ];

  console.log('Opening a normal browser for Google sign-in.');
  console.log(`Browser: ${browserExecutable}`);
  console.log(`Profile: ${options.profileDir}`);
  console.log(`Debug URL: http://127.0.0.1:${options.remoteDebuggingPort}`);
  console.log('\nSign in to Google/Gemini in this browser window and leave it open while automation runs.');

  const child = spawn(browserExecutable, browserArgs, {
    detached: true,
    stdio: 'ignore',
  });

  child.unref();

  console.log('\nAfter login, run automation with:');
  console.log(
    `  npm run start -- --input prompts.example.json --out responses --connect-cdp http://127.0.0.1:${options.remoteDebuggingPort}`,
  );
  console.log('\nThis connects to the same already-open browser instead of launching an automated login browser.');
}

async function resolveLoginBrowserExecutable(explicitExecutable?: string): Promise<string> {
  if (explicitExecutable) {
    await assertExecutableExists(explicitExecutable);
    return explicitExecutable;
  }

  const candidates = browserExecutableCandidates();
  for (const candidate of candidates) {
    if (await executableExists(candidate)) {
      return candidate;
    }
  }

  throw new Error(
    `Could not find Chrome/Chromium. Install Google Chrome or Chromium, or pass --browser-executable /path/to/browser.`,
  );
}

function browserExecutableCandidates(): string[] {
  if (process.platform === 'darwin') {
    return [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
    ];
  }

  if (process.platform === 'win32') {
    return [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    ];
  }

  return [
    '/usr/bin/google-chrome-beta',
    '/usr/bin/google-chrome-unstable',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ];
}

async function assertExecutableExists(filePath: string): Promise<void> {
  if (!(await executableExists(filePath))) {
    throw new Error(`Browser executable does not exist: ${filePath}`);
  }
}

async function executableExists(filePath: string): Promise<boolean> {
  const stats = await stat(filePath).catch(() => null);
  return Boolean(stats?.isFile());
}

async function loadPromptQueue(inputPath: string, cliAttachments: string[]): Promise<PromptItem[]> {
  const raw = await readFile(inputPath, 'utf8');
  const parsed: unknown = JSON.parse(raw);
  const rawItems = extractRawPromptItems(parsed);

  if (rawItems.length === 0) {
    throw new Error(`Prompt queue "${inputPath}" does not contain any prompts.`);
  }

  const usedIds = new Map<string, number>();
  const inputDir = path.dirname(inputPath);
  const prompts = rawItems.map((item, index) =>
    normalizePromptItem(item, index, usedIds, inputDir, cliAttachments),
  );

  await validateAttachmentPaths(prompts);
  return prompts;
}

function extractRawPromptItems(parsed: unknown): RawPromptItem[] {
  if (Array.isArray(parsed)) {
    return parsed as RawPromptItem[];
  }

  if (isPromptQueueFile(parsed)) {
    return parsed.prompts;
  }

  throw new Error('Prompt queue must be a JSON array or an object with a "prompts" array.');
}

function normalizePromptItem(
  item: RawPromptItem,
  index: number,
  usedIds: Map<string, number>,
  inputDir: string,
  cliAttachments: string[],
): PromptItem {
  if (typeof item === 'string') {
    const prompt = requireNonEmptyPrompt(item, index);
    return {
      id: uniqueId(slugify(prompt) || `prompt-${index + 1}`, usedIds),
      prompt,
      attachments: cliAttachments,
    };
  }

  if (!item || typeof item !== 'object') {
    throw new Error(`Prompt at index ${index} must be a string or object.`);
  }

  const prompt = requireNonEmptyPrompt(item.prompt, index);
  const baseId = typeof item.id === 'string' && item.id.trim() ? item.id : slugify(prompt);
  const promptAttachments = parseAttachmentList(item.attachments ?? item.files, index, inputDir);

  return {
    id: uniqueId(slugify(baseId) || `prompt-${index + 1}`, usedIds),
    prompt,
    attachments: [...promptAttachments, ...cliAttachments],
  };
}

function requireNonEmptyPrompt(value: unknown, index: number): string {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Prompt at index ${index} must contain a non-empty "prompt" string.`);
  }

  return value.trim();
}

function uniqueId(baseId: string, usedIds: Map<string, number>): string {
  const nextCount = (usedIds.get(baseId) ?? 0) + 1;
  usedIds.set(baseId, nextCount);
  return nextCount === 1 ? baseId : `${baseId}-${nextCount}`;
}

function parseAttachmentList(value: unknown, index: number, inputDir: string): string[] {
  if (value === undefined) {
    return [];
  }

  const rawPaths = typeof value === 'string' ? [value] : value;
  if (!Array.isArray(rawPaths)) {
    throw new Error(`Attachments for prompt at index ${index} must be a string or array of strings.`);
  }

  return rawPaths.map((filePath, fileIndex) => {
    if (typeof filePath !== 'string' || !filePath.trim()) {
      throw new Error(`Attachment ${fileIndex} for prompt at index ${index} must be a non-empty string.`);
    }

    return path.resolve(inputDir, filePath);
  });
}

async function validateAttachmentPaths(prompts: PromptItem[]): Promise<void> {
  for (const prompt of prompts) {
    for (const attachment of prompt.attachments) {
      const stats = await stat(attachment).catch(() => null);
      if (!stats) {
        throw new Error(`Attachment for prompt "${prompt.id}" does not exist: ${attachment}`);
      }

      if (!stats.isFile()) {
        throw new Error(`Attachment for prompt "${prompt.id}" is not a file: ${attachment}`);
      }
    }
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
}

function isPromptQueueFile(value: unknown): value is PromptQueueFile {
  return Boolean(value && typeof value === 'object' && Array.isArray((value as PromptQueueFile).prompts));
}

function readRequiredValue(args: string[], index: number, flag: string): string {
  const value = args[index];
  if (!value || value.startsWith('--')) {
    throw new Error(`Missing value for ${flag}.`);
  }
  return value;
}

function parsePositiveInt(value: string, flag: string): number {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`${flag} must be a positive integer.`);
  }
  return parsed;
}

function printHelp(): void {
  console.log(`
Gemini Web Automater

Usage:
  npm run start -- --input prompts.example.json --out responses

Options:
  -i, --input <file>       Prompt queue JSON file (default: prompts.example.json)
  -o, --out <dir>          Directory for Markdown responses (default: responses)
      --profile <dir>      Persistent Chromium profile directory (default: .playwright/gemini-profile)
      --url <url>          Gemini URL (default: https://gemini.google.com/app)
      --chat-url <url>     Existing Gemini chat URL to open (alias for --url)
      --headless           Run Chromium headless after the profile is already logged in
      --headed             Run Chromium headed (default)
      --dry-run            Validate and list prompts without opening Gemini
      --login              Open normal Chrome/Chromium for Google sign-in only
      --browser-channel <channel>
                           Use an installed Playwright browser channel, e.g. chrome
      --browser-executable <path>
                           Browser executable to use for login or automation
      --connect-cdp, --cdp-url <url>
                           Connect to an already-open Chrome debugging URL
      --remote-debugging-port <port>
                           Port used by --login for CDP attach mode (default: 9222)
      --attach, --file <path>
                           Attach a file to every prompt. Can be used more than once.
      --max-wait-ms <ms>   Maximum wait for one Gemini response (default: 180000)
      --stable-ms <ms>     Response text stability window before saving (default: 4000)
  -h, --help               Show this help
`);
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`\nError: ${message}`);
  process.exitCode = 1;
});
