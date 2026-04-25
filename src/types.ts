export interface PromptItem {
  id: string;
  prompt: string;
  attachments: string[];
}

export interface PromptQueueFile {
  prompts: RawPromptItem[];
}

export interface RawPromptObject {
  id?: unknown;
  prompt?: unknown;
  files?: unknown;
  attachments?: unknown;
}

export type RawPromptItem = string | RawPromptObject;

export interface CliOptions {
  inputPath: string;
  outDir: string;
  profileDir: string;
  geminiUrl: string;
  headless: boolean;
  dryRun: boolean;
  loginOnly: boolean;
  browserChannel?: string;
  browserExecutable?: string;
  cdpUrl?: string;
  remoteDebuggingPort: number;
  attachments: string[];
  maxWaitMs: number;
  stableMs: number;
}

export interface GeminiAutomatorOptions {
  outDir: string;
  profileDir: string;
  geminiUrl: string;
  headless: boolean;
  browserChannel?: string;
  browserExecutable?: string;
  cdpUrl?: string;
  maxWaitMs: number;
  stableMs: number;
}

export interface PromptResult {
  id: string;
  prompt: string;
  attachments: string[];
  response: string;
  outputPath: string;
  completedAt: string;
}
