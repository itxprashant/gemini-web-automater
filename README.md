# Gemini Web Automater

A small TypeScript CLI that uses Playwright to automate Gemini Web:

1. Open Gemini in Chromium.
2. Submit prompts from a JSON queue one at a time.
3. Wait for each response to finish.
4. Save every response as a Markdown file.

This automates Gemini Web, not the Gemini API.

## Setup

Install dependencies:

```bash
npm install
```

Install the Chromium browser used by Playwright:

```bash
npm run install:browsers
```

## Prompt Queue

Create a JSON file with either an object containing `prompts`:

```json
{
  "prompts": [
    {
      "id": "first-prompt",
      "prompt": "Write a short explanation of Playwright."
    },
    {
      "id": "second-prompt",
      "prompt": "Turn the previous explanation into a checklist.",
      "files": ["./notes.md"]
    }
  ]
}
```

Use `files` or `attachments` for per-prompt uploads. Relative paths resolve from the prompt queue file location. Text-like files are pasted into the Gemini prompt box, similar to copying a file and pressing `Ctrl+V`; non-text files such as PDFs use Gemini's upload menu and file chooser.

Or a plain array:

```json
[
  "Write a short explanation of Playwright.",
  {
    "id": "second-prompt",
    "prompt": "Turn the previous explanation into a checklist."
  }
]
```

## Run

Start with the example queue:

```bash
npm run start -- --input prompts.example.json --out responses
```

Open an existing Gemini chat link instead of the default new chat page:

```bash
npm run attach -- --chat-url "https://gemini.google.com/app/<chat-id>" --input prompts.example.json --out responses
```

Attach the same file to every prompt from the CLI:

```bash
npm run start -- --input prompts.example.json --attach ./README.md
```

Validate a prompt file without opening Gemini:

```bash
npm run start -- --input prompts.example.json --dry-run
```

The first run opens a headed Chromium window with a dedicated profile stored in `.playwright/gemini-profile`.
If Gemini asks you to sign in, complete login in that browser window, wait until the prompt box is visible, then press Enter in the terminal.

If Google says the browser may not be secure, sign in with a regular Chrome/Chromium launch instead:

```bash
npm run login
```

This starts Chrome/Chromium with a debugging port and the dedicated profile. Sign in to Gemini in that browser and leave the browser open. Then run the automater by attaching to the same already-open browser:

```bash
npm run attach -- --input prompts.example.json --out responses
```

To choose a specific browser executable, include npm's `--` separator before custom flags:

```bash
npm run login -- --browser-executable /usr/bin/google-chrome-beta
npm run attach -- --input prompts.example.json --out responses
```

If you use a different debugging port:

```bash
npm run login -- --remote-debugging-port 9333
npm run start -- --input prompts.example.json --out responses --connect-cdp http://127.0.0.1:9333
```

The attach flow controls the same normal browser window you logged into, which avoids the unsafe-browser sign-in page caused by launching a new automated browser.

After the profile is logged in, you can run headless:

```bash
npm run start -- --input prompts.example.json --out responses --headless
```

## CLI Options

```bash
npm run start -- --help
```

Common options:

- `--input <file>`: prompt queue JSON file.
- `--out <dir>`: Markdown response output directory.
- `--profile <dir>`: persistent Chromium profile directory.
- `--url <url>`: Gemini URL, defaulting to `https://gemini.google.com/app`.
- `--chat-url <url>`: existing Gemini chat URL to open. This is an alias for `--url`.
- `--headless`: run Chromium without a visible browser after login is already saved.
- `--dry-run`: parse and list prompts without opening Gemini.
- `--login`: open a normal Chrome/Chromium browser for Google sign-in only.
- `--browser-channel <channel>`: use an installed Playwright browser channel, such as `chrome`.
- `--browser-executable <path>`: choose the browser executable for login or automation. With npm scripts, pass it after `--`.
- `--connect-cdp <url>` or `--cdp-url <url>`: connect to an already-open Chrome debugging URL instead of launching a new browser.
- `--remote-debugging-port <port>`: port used by `--login` for attach mode, defaulting to `9222`.
- `--attach <path>` or `--file <path>`: attach a file to every prompt. Can be repeated.
- `--max-wait-ms <ms>`: maximum wait per prompt.
- `--stable-ms <ms>`: how long the response text must stop changing before it is saved.

## Output

Each prompt writes one Markdown file like:

```text
responses/2026-04-24T21-00-00-000Z-first-prompt.md
```

The file includes the prompt id, completion timestamp, original prompt, attachment paths, and Gemini response.

## Attachment Behavior

The automater uses two attachment paths:

- Text-like files (`.md`, `.txt`, `.json`, `.csv`, source code, YAML, logs) are copied into the browser clipboard as plain text and pasted into Gemini.
- Non-text files (`.pdf`, images, and unknown binary files) use Gemini's upload UI. The current selectors are `button` named `Open upload file menu`, followed by the `menuitem` named `Upload files`.

If the native file chooser event is not exposed, the tool falls back to the hidden `input[type="file"]` element.

## Notes

- The tool will not bypass Google login, captchas, account checks, rate limits, or Gemini restrictions.
- Attachments depend on the selected Gemini model/account supporting pasted text or file uploads.
- Google may invalidate or reject sessions in newly launched automated browsers. If that happens, use `npm run login` and `npm run attach` so the tool controls the same normal browser window.
- Gemini Web UI selectors can change. If the tool stops finding the prompt box, send button, or response text, update the selector lists in `src/geminiAutomator.ts`.
- Use a dedicated automation profile. Do not point `--profile` at your normal Chrome user profile.
