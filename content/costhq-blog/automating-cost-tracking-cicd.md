---
title: Automating Cost Tracking in CI/CD Pipelines
excerpt: Integrate CostHQ into your GitHub Actions and CI/CD workflows to automatically track infrastructure costs across build and deployment pipelines.
date: 2026-05-05
readTime: 7 min read
category: DevOps
image: https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop
tags:
  - CI/CD
  - Automation
  - DevOps
---

## Why Track Costs in CI/CD

If your deployment pipeline calls AI APIs — for example, generating release notes, analyzing test failures, or running automated code reviews — those costs add up. Without tracking, you have no visibility into what your automation is spending.

CostHQ's TypeScript SDK makes it straightforward to wrap pipeline steps with budget enforcement and cost logging.

## GitHub Actions Integration

Here is a complete GitHub Actions workflow that tracks costs during an automated code review step:

```yaml
name: PR Review with Cost Tracking

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install CostHQ
        run: npm install -g codesession-cli

      - name: Start Cost Session
        run: cs start "pr-review-${{ github.event.pull_request.number }}"

      - name: Run Code Review
        run: node scripts/ai-review.js

      - name: End Session
        run: cs end --json > cost-report.json

      - name: Upload Cost Report
        uses: actions/upload-artifact@v4
        with:
          name: cost-report
          path: cost-report.json
```

## Programmatic Budget Enforcement

For pipelines that should not exceed a cost threshold, use the SDK directly in your automation scripts:

```typescript
// scripts/ai-review.js
import { AgentSession, BudgetExceededError } from 'codesession-cli/agents'

const session = new AgentSession(
  `pr-review-${process.env.GITHUB_RUN_ID}`,
  { budget: 2.50, git: false }
)

session.start()

try {
  const diff = getPullRequestDiff()
  const files = getChangedFiles(diff)

  for (const file of files) {
    if (!session.canAfford(0.25)) {
      console.warn('Budget limit approaching — reviewing remaining files with basic analysis')
      basicReview(file)
      continue
    }
    deepReview(file)
  }
} catch (e) {
  if (e instanceof BudgetExceededError) {
    console.error('Budget exceeded — pipeline stopped to prevent cost overrun')
    process.exit(1)
  }
  throw e
} finally {
  session.end()
}
```

## Tracking Across Pipeline Stages

A typical deployment pipeline has multiple stages. You can track costs per stage:

```bash
# Build stage
cs start "build-$BUILD_ID"
npm run build
cs log-ai -p openai -m gpt-4o --prompt-tokens 800 --completion-tokens 200
cs end

# Test stage
cs start "test-$BUILD_ID"
npm test
cs end

# Deploy stage
cs start "deploy-$BUILD_ID"
npm run deploy
cs log-ai -p anthropic -m claude-sonnet-4-20250514 --prompt-tokens 600 --completion-tokens 300
cs end
```

## Aggregating Results

After the pipeline completes, aggregate cost data:

```bash
# Collect all session data as JSON
cs list --json > all-sessions.json

# Use jq to calculate totals
cat all-sessions.json | jq '[.[].cost] | add'
```

## Setting Up Alerts

For Teams and Enterprise plans, configure notification webhooks to alert when pipeline costs exceed thresholds:

```typescript
// Integration with Slack/Discord webhooks
const metrics = session.end()
if (metrics.totalCost > 5.00) {
  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: `Pipeline ${metrics.sessionId} exceeded cost threshold: $${metrics.totalCost.toFixed(2)}`
    })
  })
}
```

## Summary

CostHQ in CI/CD provides:

- Visibility into automation costs
- Budget enforcement to prevent cost overruns
- Per-stage cost breakdowns
- JSON export for aggregation and analysis

Start small — wrap your most expensive pipeline step first, then expand coverage as you see the value.