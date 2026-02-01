---
title: "aitoken-cli - Track AI API Costs Locally"
excerpt: "Track AI API costs locally across 41+ models from OpenAI, Anthropic, Google, Azure & Cohere. Privacy-first with local SQLite storage."
category: TOOLS
order: 1
lastUpdated: 2026-02-01
published: false
description: "Complete documentation for aitoken-cli - a local-first CLI tool for tracking AI API costs across OpenAI, Anthropic, Google, Azure, and Cohere."
tags: AI, CLI, OpenAI, Documentation
cover_image: 
canonical_url: 
series: Building CLI Tools
---

# aitoken-cli Documentation

Track AI API usage and costs locally across multiple providers.

## Overview

aitoken-cli is a command-line tool for tracking AI API costs from OpenAI, Anthropic, Google, Azure, and Cohere. All data is stored locally in SQLite with automatic cost calculation based on current pricing.

**Key Features:**
- Multi-provider support (OpenAI, Anthropic, Google, Azure, Cohere)
- Automatic cost calculation for 41+ models
- Local SQLite storage (privacy-first)
- Beautiful terminal output with statistics
- JSON export for integration
- Fast and lightweight

## Installation

```bash
npm install -g aitoken-cli
```

## Usage

### Tracking API Calls

```bash
# Track a GPT-4 call
at add -p openai -m gpt-4o -i 1500 -o 800

# Output: ✓ Added usage #47 - openai/gpt-4o - $0.0118
```

### Viewing Statistics

```bash
at stats

# Output:
# Total Usage: $34.56 (245,890 tokens)
# 
# By Provider:
# OpenAI:    $21.34 (150,000 tokens)
# Anthropic: $11.22 (85,000 tokens)
# Google:    $2.00  (10,890 tokens)
```

### Today's Usage

```bash
at today

# Output:
# Today's Usage: $4.23 (15,670 tokens)
# 
# Latest entries:
# 10:15 AM - gpt-4o     - $1.52 (5,000 tokens)
# 11:30 AM - claude-3.5 - $2.71 (10,670 tokens)
```

### Code Integration

**One-time setup, automatic tracking forever:**

```javascript
// Create API wrapper once
async function callGPT(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages
  });
  
  // Automatic tracking
  const { prompt_tokens, completion_tokens } = response.usage;
  exec(`at add -p openai -m gpt-4o -i ${prompt_tokens} -o ${completion_tokens}`);
  
  return response;
}

// Now every call tracks automatically
await callGPT([{role: "user", content: "Hello"}]);  // tracked ✓
await callGPT([{role: "user", content: "Goodbye"}]); // tracked ✓
```

**Works with any provider:**

```javascript
// Anthropic wrapper
async function callClaude(messages) {
  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    messages
  });
  
  const input = response.usage.input_tokens;
  const output = response.usage.output_tokens;
  exec(`at add -p anthropic -m claude-3-5-sonnet -i ${input} -o ${output}`);
  
  return response;
}
```

## Cost Optimization Strategies

### Use Appropriate Models for Tasks

**Simple tasks:** Use GPT-3.5 Turbo instead of GPT-4
- Cost savings: ~75% per request
- Use cases: String formatting, simple queries, basic text generation

**Coding tasks:** Use Claude 3.5 Sonnet
- Often cheaper than GPT-4
- Better code generation quality
- Cost savings: ~30% compared to GPT-4

### Optimize Prompts

**Cache system prompts:**
- Send full system prompt once
- Send only deltas in subsequent requests
- Reduces token usage by 40-60%

**Minimize redundancy:**
- Deduplicate API calls
- Cache responses when appropriate
- Batch similar requests

### Monitor Usage Patterns

```bash
# Check daily spending
at today

# Review weekly trends
at stats -d 7

# Identify expensive operations
at list -l 50
```

## Technical Details

### Tech Stack
- **TypeScript** - Type safety for pricing data
- **Commander.js** - CLI framework
- **SQLite (better-sqlite3)** - Local database
- **Chalk** - Pretty terminal output

### Database Schema
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

Simple. Effective. **Local.**

## Privacy and Security

### Local-First Architecture

aitoken-cli stores everything in `~/.aitoken/usage.db`.

**No cloud. No API. No tracking.**

**Benefits:**

1. **Privacy** - Your usage patterns stay private
2. **Offline** - Works without internet connection
3. **Fast** - No network latency
4. **Free** - No subscription costs
5. **Ownership** - You control your data

### Data Export

```bash
# Export as JSON
at list --json > usage.json
at stats --json > stats.json
```

### Add Usage

Track an API call:

```bash
# Basic command
at add -p <provider> -m <model> -i <input_tokens> -o <output_tokens>

# Example
at add -p openai -m gpt-4o -i 1000 -o 500

# With notes
at add -p anthropic -m claude-3.5-sonnet -i 2000 -o 1200 -n "Code review"
```

**Options:**
- `-p, --provider` - Provider (openai, anthropic, google, azure, cohere)
- `-m, --model` - Model name
- `-i, --input` - Input/prompt tokens
- `-o, --output` - Output/completion tokens
- `-n, --notes` - Optional notes

### View Usage

List recent usage:

```bash
# Default: last 20 entries
at list

# Filter by provider
at list -p openai

# Limit results
at list -l 50

# Export as JSON
at list --json
```

### View Statistics

```bash
# Overall stats
at stats

# Last N days
at stats -d 7

# Specific provider
at stats -p anthropic

# Export as JSON
at stats --json
```

### Today's Usage

```bash
at today
at today --json
```

### List Models

```bash
# All models and pricing
```bash
# All models and pricing
at models

# Filter by provider
at models -p openai
```

### Clear Data

```bash
# Clear all data (requires confirmation)
at clear --yes

# Clear specific provider
at clear -p openai --yes

# Clear before date
at clear --before 2026-01-01 --yes
```

## Supported Providers and Models

### OpenAI
- GPT-5.2, GPT-4.5, GPT-4o, GPT-4o Mini
- GPT-4 Turbo, GPT-4
- GPT-3.5 Turbo variants
- O1 Preview, O1 Mini

### Anthropic (Claude)
- Claude 4.5, Claude 3.5 Sonnet, Claude 3.5 Haiku
- Claude 3 Opus, Sonnet, Haiku
- Claude 2.x, Claude Instant

### Google
- Gemini 1.5 Pro, Flash
- Gemini 1.0 Pro, Pro Vision

### Azure OpenAI
- GPT-4, GPT-3.5 Turbo

### Cohere
- Command, Command Light, Command R, Command R+

## Use Cases

### API Development

Track costs during development:

```bash
# After each API call in your app
at add -p openai -m gpt-4o -i ${tokens_in} -o ${tokens_out}
```

### Budget Monitoring

Daily budget check script:

```bash
#!/bin/bash
COST=$(at today --json | jq '[.[] | .cost] | add')
if (( $(echo "$COST > 10" | bc -l) )); then
  echo "⚠️  Daily budget exceeded: $${COST}"
fi
```

### Team Cost Attribution

Track costs per project:

```bash
at add -p openai -m gpt-4o -i 1000 -o 500 -n "Project: CustomerPortal"
at add -p anthropic -m claude-3.5-sonnet -i 2000 -o 800 -n "Project: Analytics"
```

### CI/CD Integration

Track AI costs in pipelines:

```bash
# In your CI script
at add -p openai -m gpt-4o -i ${INPUT} -o ${OUTPUT} -n "Build: ${CI_BUILD_ID}"
```

## Troubleshooting

### Database Location

Database file: `~/.aitoken/usage.db`

**Windows:** `C:\Users\<username>\.aitoken\usage.db`  
**Mac/Linux:** `/home/<username>/.aitoken/usage.db`

### Backup Data

```bash
# Copy database file
cp ~/.aitoken/usage.db ~/backups/aitoken-backup-$(date +%Y%m%d).db

# Or export as JSON
at list --json > aitoken-export.json
```

### Reset Database

```bash
at clear --yes
```

## Resources

- [npm Package](https://www.npmjs.com/package/aitoken-cli)
- [GitHub Repository](https://github.com/brian-mwirigi/aitoken-cli)
- [Pricing Verification](https://github.com/brian-mwirigi/aitoken-cli/blob/main/VERIFICATION.md)
- [Blog Post](https://www.brianmunene.me/blog/2-track-ai-api-costs)

## Related Tools

- [runbook-cli](https://www.npmjs.com/package/runbook-cli) - Remember project commands
- [codesession-cli](https://www.npmjs.com/package/codesession-cli) - Track coding sessions

## License

MIT

## Contributing

Contributions welcome. Please open an issue or pull request on [GitHub](https://github.com/brian-mwirigi/aitoken-cli).

---

**Author:** [Brian Mwirigi](https://github.com/brian-mwirigi)  
**Website:** [brianmunene.me](https://brianmunene.me)

