---
title: Getting Started with CostHQ
excerpt: Learn how to install and start tracking your coding sessions and infrastructure costs with CostHQ in under five minutes.
date: 2026-05-20
readTime: 4 min read
category: Guides
image: https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop
tags:
  - Getting Started
  - CLI
  - Developer Tools
---

## Installation

CostHQ (distributed as `codesession-cli` on npm) requires Node.js 16 or later. Install it globally with a single command:

```bash
npm install -g codesession-cli
```

On macOS, you may need Xcode command line tools:

```bash
xcode-select --install
```

On Linux, ensure build tools are available:

```bash
sudo apt-get install build-essential
```

## Your First Session

Once installed, start tracking immediately:

```bash
cs start "my-first-session"
```

This creates a cryptographically identified session and begins monitoring file changes and git activity in the current directory. All data is stored locally in a SQLite database at `~/.codesession/sessions.db` — no cloud sync, no telemetry.

## Tracking API Costs

If you are using AI APIs in your development workflow, log the costs directly:

```bash
cs log-ai --provider anthropic --model claude-sonnet-4-20250514 --prompt-tokens 1200 --completion-tokens 450
```

CostHQ ships with built-in pricing for 17+ commercial models. The tool calculates costs automatically using up-to-date pricing definitions.

## End a Session

When you are done, close the session:

```bash
cs end
```

This generates a summary including total duration, file changes, git commits, and cumulative API costs. You can also view the full history:

```bash
cs list
```

## The Dashboard

CostHQ includes a real-time web analytics dashboard:

```bash
cs dashboard
```

Open `http://localhost:3737` in your browser. The dashboard shows KPIs, 30-day cost projections, per-model breakdowns, activity heatmaps, and budget alerts. It binds to 127.0.0.1 by default — nothing leaves your machine.

## Programmatic Usage

For CI/CD pipelines and automated workflows, CostHQ exposes a TypeScript API:

```typescript
import { AgentSession, BudgetExceededError } from 'codesession-cli/agents'

const session = new AgentSession('CI pipeline', { budget: 5.00 })

try {
  session.start()
  // Your automation logic here
  const metrics = session.end()
  console.log(JSON.stringify(metrics, null, 2))
} catch (e) {
  if (e instanceof BudgetExceededError) {
    console.error('Budget exceeded, aborting pipeline')
  }
}
```

## Next Steps

- Read the full [documentation on GitHub](https://github.com/brian-mwirigi/codesession-cli)
- Set up automated budget alerts
- Explore the [TypeScript SDK API reference](https://github.com/brian-mwirigi/codesession-cli#api)