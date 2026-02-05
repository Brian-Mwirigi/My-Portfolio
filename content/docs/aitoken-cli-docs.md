---
title: "aitoken-cli - Track AI API Costs Locally"
published: false
description: "Complete documentation for aitoken-cli v1.1.0 - a local-first CLI tool and Node.js library for tracking AI API costs across OpenAI, Anthropic, Google, Azure, and Cohere. Includes automatic tracking with zero code changes."
tags: AI, CLI, OpenAI, Documentation
cover_image:
canonical_url:
series: Building CLI Tools
---

# aitoken-cli Documentation

Track every dollar you spend on AI APIs. Locally. Automatically.

- **npm:** [npmjs.com/package/aitoken-cli](https://www.npmjs.com/package/aitoken-cli)
- **GitHub:** [github.com/brian-mwirigi/aitoken-cli](https://github.com/brian-mwirigi/aitoken-cli)
- **Version:** 1.1.0
- **License:** MIT

## Overview

aitoken-cli is a developer tool that tracks AI API costs across OpenAI, Anthropic, Google, Azure, and Cohere. It works as both a CLI tool and a Node.js library with built-in automatic tracking.

**Key Features:**

- **Automatic Tracking** - Built-in wrappers, middleware, and SDK extensions
- **42 Models** across 5 providers with accurate pricing
- **Local SQLite storage** - privacy-first, no data sent anywhere
- **Beautiful terminal output** with tables and statistics
- **JSON export** for dashboards and integrations
- **Programmatic API** - use in your code, not just the terminal
- **TypeScript support** - full type definitions with autocomplete
- **Cross-platform** - Windows, macOS, Linux

---

## Installation

### Global (CLI tool)

```bash
npm install -g aitoken-cli
```

This gives you two commands:
- `at` - short alias
- `aitoken` - full name

### Local (library in your project)

```bash
npm install aitoken-cli
```

### Optional peer dependencies

Install only if you want automatic tracking with SDK extensions:

```bash
npm install openai                  # For OpenAI tracking
npm install @anthropic-ai/sdk      # For Anthropic tracking
npm install @google/generative-ai  # For Google tracking
```

### Requirements

- Node.js 16+
- No other setup needed (SQLite is bundled)

---

## CLI Reference

### `at add` - Track a usage entry

```bash
at add -p <provider> -m <model> -i <input_tokens> -o <output_tokens> [-n <notes>]
```

| Flag | Description | Required |
|------|-------------|----------|
| `-p, --provider` | Provider (openai, anthropic, google, azure, cohere) | Yes |
| `-m, --model` | Model name (e.g., gpt-4o, claude-sonnet-4.5) | Yes |
| `-i, --input` | Input/prompt tokens | Yes |
| `-o, --output` | Output/completion tokens | Yes |
| `-n, --notes` | Optional notes | No |

```bash
at add -p openai -m gpt-4o -i 1500 -o 800
# ✔ Added usage #42 - openai/gpt-4o - $0.0195

at add -p anthropic -m claude-sonnet-4.5 -i 2000 -o 1200 -n "Code review"
# ✔ Added usage #43 - anthropic/claude-sonnet-4.5 - $0.0240
```

Cost is calculated automatically from built-in pricing data.

### `at list` - List usage entries

```bash
at list [-p <provider>] [-l <limit>] [--json]
```

| Flag | Description | Default |
|------|-------------|---------|
| `-p, --provider` | Filter by provider | All |
| `-l, --limit` | Number of entries | 20 |
| `--json` | Output as JSON | Table |

```bash
# Last 20 entries
at list

# OpenAI only, last 5
at list -p openai -l 5

# Export to file
at list -l 1000 --json > usage.json
```

**Output:**

```
┌────────────────────┬───────────┬───────────────────┬────────┬─────────┐
│ Date               │ Provider  │ Model             │ Tokens │ Cost    │
├────────────────────┼───────────┼───────────────────┼────────┼─────────┤
│ Feb 06, 2026 10:30 │ openai    │ gpt-4o            │ 3.7K   │ $0.0305 │
│ Feb 06, 2026 10:28 │ anthropic │ claude-sonnet-4.5 │ 4.8K   │ $0.0360 │
│ Feb 06, 2026 10:25 │ google    │ gemini-1.5-pro    │ 2.4K   │ $0.0147 │
└────────────────────┴───────────┴───────────────────┴────────┴─────────┘

💰 Total: $0.0812 | 10.9K tokens | 3 requests
```

### `at stats` - View statistics

```bash
at stats [-p <provider>] [-d <days>] [--json]
```

| Flag | Description | Default |
|------|-------------|---------|
| `-p, --provider` | Filter by provider | All |
| `-d, --days` | Show last N days | All time |
| `--json` | Output as JSON | Table |

```bash
# Overall stats
at stats

# Last 7 days
at stats -d 7

# Anthropic only
at stats -p anthropic
```

**Output:**

```
📊 Overall Stats

┌────────────────┬─────────┐
│ Metric         │ Value   │
├────────────────┼─────────┤
│ Total Requests │ 127     │
│ Total Tokens   │ 3.2M    │
│ Total Cost     │ $24.57  │
└────────────────┴─────────┘

📦 By Provider

┌───────────┬──────────┬────────┬─────────┬────────────┐
│ Provider  │ Requests │ Tokens │ Cost    │ % of Total │
├───────────┼──────────┼────────┼─────────┼────────────┤
│ openai    │ 85       │ 2.1M   │ $18.23  │ 74.2%      │
│ anthropic │ 32       │ 890K   │ $5.12   │ 20.9%      │
│ google    │ 10       │ 210K   │ $1.21   │ 4.9%       │
└───────────┴──────────┴────────┴─────────┴────────────┘

🤖 Top Models

┌─────────────────────────────┬──────────┬────────┬─────────┐
│ Model                       │ Requests │ Tokens │ Cost    │
├─────────────────────────────┼──────────┼────────┼─────────┤
│ openai/gpt-4o               │ 65       │ 1.5M   │ $12.40  │
│ anthropic/claude-sonnet-4.5 │ 28       │ 780K   │ $4.56   │
└─────────────────────────────┴──────────┴────────┴─────────┘
```

### `at today` - Today's usage

```bash
at today [--json]
```

```
📅 Today's Usage

┌────────────────────┬───────────┬───────────────────┬────────┬─────────┐
│ Date               │ Provider  │ Model             │ Tokens │ Cost    │
├────────────────────┼───────────┼───────────────────┼────────┼─────────┤
│ Feb 06, 2026 10:56 │ cohere    │ command-r-plus    │ 1.2K   │ $0.0084 │
│ Feb 06, 2026 10:56 │ google    │ gemini-1.5-pro    │ 2.4K   │ $0.0147 │
│ Feb 06, 2026 10:56 │ anthropic │ claude-sonnet-4.5 │ 4.8K   │ $0.0360 │
│ Feb 06, 2026 10:56 │ openai    │ gpt-4o            │ 3.7K   │ $0.0305 │
└────────────────────┴───────────┴───────────────────┴────────┴─────────┘

💰 Total: $0.0896 | 12.1K tokens | 4 requests
```

### `at models` - Show pricing

```bash
at models [-p <provider>]
```

```bash
at models -p openai
```

```
💰 Supported Models & Pricing

OPENAI

┌───────────────────┬────────────────┬─────────────────┐
│ Model             │ Input (per 1M) │ Output (per 1M) │
├───────────────────┼────────────────┼─────────────────┤
│ gpt-5.2           │ $1.75          │ $14.00          │
│ gpt-5.2-pro       │ $21.00         │ $168.00         │
│ gpt-5-mini        │ $0.25          │ $2.00           │
│ gpt-4.1           │ $3.00          │ $12.00          │
│ gpt-4o            │ $5.00          │ $15.00          │
│ gpt-4o-mini       │ $0.15          │ $0.60           │
└───────────────────┴────────────────┴─────────────────┘
```

### `at clear` - Clear data

```bash
at clear --yes [-p <provider>] [--before <date>]
```

| Flag | Description | Required |
|------|-------------|----------|
| `-y, --yes` | Confirm deletion | Yes |
| `-p, --provider` | Clear only this provider | No |
| `--before` | Clear entries before this ISO date | No |

```bash
at clear --yes                       # Clear everything
at clear -p openai --yes             # Clear OpenAI only
at clear --before 2026-01-01 --yes   # Clear old entries
```

---

## Automatic Tracking (v1.1.0)

aitoken-cli includes **built-in automatic tracking** - no `exec()` calls, no CLI in your code. Import functions directly.

### Method 1: Wrapper Functions (Recommended)

The simplest approach. Replace your API call with a tracked version.

```typescript
import { trackedGPT, trackedClaude, trackedGemini } from 'aitoken-cli/wrappers';
import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// OpenAI - use trackedGPT() instead of openai.chat.completions.create()
const gptResponse = await trackedGPT(openai, {
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});
// Cost tracked automatically

// Anthropic - use trackedClaude() instead of anthropic.messages.create()
const claudeResponse = await trackedClaude(anthropic, {
  model: 'claude-sonnet-4.5',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello!' }]
});
// Cost tracked automatically
```

**What happens behind the scenes:**
1. Makes the API call normally
2. Extracts token counts from the response
3. Calculates cost from built-in pricing
4. Saves to local SQLite database
5. Returns the original response unchanged

#### Available wrappers

| Function | Provider | Wraps |
|----------|----------|-------|
| `trackedGPT()` | OpenAI | `openai.chat.completions.create()` |
| `trackedClaude()` | Anthropic | `anthropic.messages.create()` |
| `trackedGemini()` | Google | `genAI.getGenerativeModel().generateContent()` |
| `trackedAI()` | Any | Generic wrapper for custom providers |

#### `trackedAI()` - Generic wrapper

For providers not directly supported:

```typescript
import { trackedAI } from 'aitoken-cli/wrappers';

const response = await trackedAI(
  'cohere',                    // provider name
  'command-r',                 // model name
  async () => cohere.generate({ prompt: 'Hello' }),  // your API call
  (res) => ({                  // token extractor
    promptTokens: res.meta.tokens.input_tokens,
    completionTokens: res.meta.tokens.output_tokens
  }),
  'Custom tracking'            // optional notes
);
```

---

### Method 2: Middleware Pattern (Zero Code Changes)

Wrap your client once at initialization. All calls are tracked automatically without changing any business logic.

```typescript
import { createTrackedClient } from 'aitoken-cli/middleware';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Wrap once
const tracked = createTrackedClient(openai, {
  provider: 'openai',
  model: 'gpt-4o'
});

// Use exactly like normal - tracking is invisible
const response = await tracked.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});
// Tracked automatically with zero code changes
```

#### `withTracking()` - Higher-order function

```typescript
import { withTracking } from 'aitoken-cli/middleware';

const trackedGenerate = withTracking(
  async (prompt) => openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }]
  }),
  { provider: 'openai', model: 'gpt-4o' }
);

const response = await trackedGenerate('Hello!');
// Tracked
```

#### `BatchTracker` - Parallel request tracking

```typescript
import { BatchTracker } from 'aitoken-cli/middleware';

const tracker = new BatchTracker('openai', 'gpt-4o');

const responses = await Promise.all([
  tracker.track(() => openai.chat.completions.create({ ... })),
  tracker.track(() => openai.chat.completions.create({ ... })),
  tracker.track(() => openai.chat.completions.create({ ... })),
]);
// All 3 tracked individually
```

---

### Method 3: SDK Extensions (Drop-in Replacement)

Change one import line. Everything else stays identical.

```typescript
// Before:
// import OpenAI from 'openai';

// After:
import { TrackedOpenAI } from 'aitoken-cli/extensions';

const openai = new TrackedOpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Identical usage - tracking is built in
const response = await openai.chat.completions.create({
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'Hello!' }]
});
// Tracked automatically
```

Available classes:

| Class | Replaces | Requires |
|-------|----------|----------|
| `TrackedOpenAI` | `openai` SDK | `npm install openai` |
| `TrackedAnthropic` | `@anthropic-ai/sdk` | `npm install @anthropic-ai/sdk` |
| `TrackedGoogleAI` | `@google/generative-ai` | `npm install @google/generative-ai` |

If the SDK is not installed, you get a helpful error telling you what to install.

---

### Which Method to Use?

| Method | Best For | Code Changes | Setup |
|--------|----------|-------------|-------|
| **Wrapper Functions** | New projects, simple apps | Replace API call | Medium |
| **Middleware Pattern** | Existing codebases | Wrap client once | Low |
| **SDK Extensions** | Drop-in, minimal effort | Change import | None |

---

## Programmatic API

Import functions directly in your Node.js / TypeScript code:

```typescript
import { calculateCost, addUsage, getUsage, getStats, clearUsage } from 'aitoken-cli';
```

### `calculateCost(provider, model, inputTokens, outputTokens)`

Returns the dollar cost for a given token count.

```typescript
const cost = calculateCost('openai', 'gpt-4o', 1500, 800);
// Returns: 0.0195

calculateCost('anthropic', 'claude-sonnet-4.5', 2000, 1000);
// Returns: 0.0210

calculateCost('unknown', 'fake-model', 1000, 500);
// Returns: 0 (unknown models return 0)
```

Provider names are case-insensitive. Partial model matching is supported (e.g., `gpt-4o-2024-05-13` matches `gpt-4o`).

### `addUsage(entry)`

Saves a usage entry to the local database.

```typescript
const id = addUsage({
  provider: 'openai',
  model: 'gpt-4o',
  promptTokens: 1500,
  completionTokens: 800,
  totalTokens: 2300,
  cost: 0.0195,
  timestamp: new Date().toISOString(),
  notes: 'Optional notes',
});
// Returns: numeric ID of the new entry
```

### `getUsage(filters?)`

Retrieves usage entries.

```typescript
const entries = getUsage({ limit: 20 });
const openaiOnly = getUsage({ provider: 'openai', limit: 50 });
const today = getUsage({ startDate: '2026-02-06' });
```

Each entry contains:

```typescript
{
  id: number;
  provider: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cost: number;
  timestamp: string;
  notes?: string;
}
```

### `getStats(filters?)`

Returns aggregated statistics.

```typescript
const stats = getStats({});
// {
//   totalRequests: 127,
//   totalTokens: 3200000,
//   totalCost: 24.567,
//   byProvider: {
//     openai: { requests: 85, tokens: 2100000, cost: 18.234 },
//     anthropic: { requests: 32, tokens: 890000, cost: 5.123 },
//   }
// }

const weekStats = getStats({ startDate: '2026-02-01' });
const openaiStats = getStats({ provider: 'openai' });
```

### `clearUsage(filters?)`

Deletes usage entries. Returns number of deleted entries.

```typescript
clearUsage({});                          // Clear all
clearUsage({ provider: 'openai' });      // Clear one provider
clearUsage({ before: '2026-01-01' });    // Clear old entries
```

---

## Supported Models & Pricing

42 models across 5 providers. Pricing is per 1 million tokens.

### OpenAI (16 models)

| Model | Input / 1M | Output / 1M |
|-------|-----------|-------------|
| gpt-5.2 | $1.75 | $14.00 |
| gpt-5.2-pro | $21.00 | $168.00 |
| gpt-5-mini | $0.25 | $2.00 |
| gpt-4.1 | $3.00 | $12.00 |
| gpt-4.1-mini | $0.80 | $3.20 |
| gpt-4.1-nano | $0.20 | $0.80 |
| o4-mini | $4.00 | $16.00 |
| gpt-4 | $30.00 | $60.00 |
| gpt-4-32k | $60.00 | $120.00 |
| gpt-4-turbo | $10.00 | $30.00 |
| gpt-4o | $5.00 | $15.00 |
| gpt-4o-mini | $0.15 | $0.60 |
| gpt-3.5-turbo | $0.50 | $1.50 |
| gpt-3.5-turbo-16k | $3.00 | $4.00 |
| o1-preview | $15.00 | $60.00 |
| o1-mini | $3.00 | $12.00 |

### Anthropic (14 models)

| Model | Input / 1M | Output / 1M |
|-------|-----------|-------------|
| claude-sonnet-4.5 | $3.00 | $15.00 |
| claude-haiku-4.5 | $1.00 | $5.00 |
| claude-opus-4.5 | $5.00 | $25.00 |
| claude-3.5-sonnet | $3.00 | $15.00 |
| claude-3.5-haiku | $1.00 | $5.00 |
| claude-3-opus | $15.00 | $75.00 |
| claude-3-sonnet | $3.00 | $15.00 |
| claude-3-haiku | $0.25 | $1.25 |
| claude-2.1 | $8.00 | $24.00 |
| claude-2.0 | $8.00 | $24.00 |
| claude-instant | $0.80 | $2.40 |

Both dash and dot variants work: `claude-sonnet-4-5` and `claude-sonnet-4.5`.

### Google (5 models)

| Model | Input / 1M | Output / 1M |
|-------|-----------|-------------|
| gemini-1.5-pro | $3.50 | $10.50 |
| gemini-1.5-flash | $0.075 | $0.30 |
| gemini-1.0-pro | $0.50 | $1.50 |
| gemini-pro | $0.50 | $1.50 |
| gemini-pro-vision | $0.25 | $0.50 |

### Azure OpenAI (3 models)

| Model | Input / 1M | Output / 1M |
|-------|-----------|-------------|
| gpt-4 | $30.00 | $60.00 |
| gpt-4-32k | $60.00 | $120.00 |
| gpt-35-turbo | $0.50 | $1.50 |

### Cohere (4 models)

| Model | Input / 1M | Output / 1M |
|-------|-----------|-------------|
| command-r-plus | $3.00 | $15.00 |
| command-r | $0.50 | $1.50 |
| command | $1.00 | $2.00 |
| command-light | $0.30 | $0.60 |

Unknown models or providers return a cost of $0.00. Partial model name matching is supported (e.g., `gpt-4o-2024-05-13` matches `gpt-4o` pricing).

---

## Data Storage & Privacy

- **Database:** `~/.token-tracker/usage.db` (SQLite via better-sqlite3)
- **Created automatically** on first use
- **No data sent anywhere** - 100% local
- **No API keys stored** - only token counts and costs
- **No browser cookies** - no filesystem scanning
- **No network requests** - the tracker itself makes zero HTTP calls
- **No permissions required** - just `npm install`

### Database schema

```sql
CREATE TABLE usage (
  id INTEGER PRIMARY KEY,
  provider TEXT NOT NULL,
  model TEXT NOT NULL,
  prompt_tokens INTEGER NOT NULL,
  completion_tokens INTEGER NOT NULL,
  total_tokens INTEGER NOT NULL,
  cost REAL NOT NULL,
  timestamp TEXT NOT NULL,
  notes TEXT
);
```

### Backup & export

```bash
# Export as JSON
at list -l 10000 --json > usage-backup.json

# Copy database directly
cp ~/.token-tracker/usage.db ~/backups/
```

**Windows location:** `C:\Users\<username>\.token-tracker\usage.db`
**Mac/Linux location:** `/home/<username>/.token-tracker/usage.db`

---

## Real-World Examples

### Express.js API server

```typescript
import express from 'express';
import { trackedGPT } from 'aitoken-cli/wrappers';
import OpenAI from 'openai';

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const response = await trackedGPT(openai, {
    model: 'gpt-4o',
    messages: [{ role: 'user', content: message }]
  }, `User: ${req.ip}`);

  res.json({ reply: response.choices[0].message.content });
  // Every request tracked. Run "at today" to see spend.
});

app.listen(3000);
```

### Next.js API route

```typescript
// app/api/chat/route.ts
import { TrackedOpenAI } from 'aitoken-cli/extensions';

export async function POST(request: Request) {
  const { message } = await request.json();

  const openai = new TrackedOpenAI({
    apiKey: process.env.OPENAI_API_KEY!
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: message }]
  });

  return Response.json({
    reply: response.choices[0].message.content
  });
}
```

### Budget-aware chatbot

```typescript
import { trackedGPT } from 'aitoken-cli/wrappers';
import { getStats } from 'aitoken-cli';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const DAILY_BUDGET = 10.00;

async function chat(message: string) {
  const today = new Date().toISOString().split('T')[0];
  const stats = getStats({ startDate: today });

  if (stats.totalCost >= DAILY_BUDGET) {
    return 'Daily budget reached. Try again tomorrow.';
  }

  // Use cheaper model when budget is running low
  const model = stats.totalCost > DAILY_BUDGET * 0.8
    ? 'gpt-4o-mini'
    : 'gpt-4o';

  const response = await trackedGPT(openai, {
    model,
    messages: [{ role: 'user', content: message }]
  });

  return response.choices[0].message.content;
}
```

### Multi-provider chatbot

```typescript
import { TrackedOpenAI, TrackedAnthropic } from 'aitoken-cli/extensions';

class AIAssistant {
  private openai = new TrackedOpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  private claude = new TrackedAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  async ask(question: string, provider: 'openai' | 'claude' = 'openai') {
    if (provider === 'openai') {
      const res = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: question }]
      });
      return res.choices[0].message.content;
    } else {
      const res = await this.claude.messages.create({
        model: 'claude-sonnet-4.5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: question }]
      });
      return res.content[0].text;
    }
    // Both tracked automatically
  }
}
```

### Budget monitoring script

```bash
#!/bin/bash
COST=$(at today --json | jq '[.[] | .cost] | add // 0')
BUDGET=10.00

if (( $(echo "$COST > $BUDGET" | bc -l) )); then
  echo "WARNING: Daily budget exceeded! Spent: \$${COST}"
  # Send alert, block further requests, etc.
fi
```

### CI/CD tracking

```bash
# In your CI pipeline
at add -p openai -m gpt-4o -i ${INPUT_TOKENS} -o ${OUTPUT_TOKENS} -n "Build: ${CI_BUILD_ID}"
```

---

## Package Exports

aitoken-cli uses Node.js subpath exports:

```typescript
// Main entry - core functions
import { calculateCost, addUsage, getUsage, getStats, clearUsage } from 'aitoken-cli';

// Wrapper functions
import { trackedGPT, trackedClaude, trackedGemini, trackedAI } from 'aitoken-cli/wrappers';

// Middleware pattern
import { createTrackedClient, withTracking, BatchTracker } from 'aitoken-cli/middleware';

// SDK extensions
import { TrackedOpenAI, TrackedAnthropic, TrackedGoogleAI } from 'aitoken-cli/extensions';
```

All exports include TypeScript `.d.ts` type definitions.

---

## Tech Stack

- **TypeScript 5.3** - compiled to CommonJS
- **Commander.js 11** - CLI framework
- **better-sqlite3 9** - embedded SQLite
- **chalk 4** - terminal colors
- **cli-table3** - table formatting
- **date-fns 3** - date utilities
- **ora 5** - spinners

---

## Development

```bash
git clone https://github.com/brian-mwirigi/aitoken-cli.git
cd aitoken-cli
npm install
npm run build
npm link
at stats
```

## Contributing

Contributions welcome. Please open an issue or pull request on [GitHub](https://github.com/brian-mwirigi/aitoken-cli).

## License

MIT

---

**Author:** [Brian Mwirigi](https://github.com/brian-mwirigi)
**Website:** [brianmunene.me](https://brianmunene.me)

