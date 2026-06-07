---
title: Tracking API Costs Across Multiple Providers
excerpt: A practical guide to monitoring and managing your expenditure across OpenAI, Anthropic, Google Gemini, and other AI providers with CostHQ.
date: 2026-05-15
readTime: 6 min read
category: Best Practices
image: https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop
tags:
  - Cost Tracking
  - APIs
  - Developer Tools
---

## The Challenge

Modern development workflows increasingly involve multiple AI providers. You might use Claude for code generation, GPT-4 for documentation, and Gemini for data analysis — all within a single project. Tracking costs across these providers manually is error-prone and time-consuming.

CostHQ solves this by providing a unified interface for logging API costs regardless of the provider.

## Built-In Provider Support

CostHQ ships with pricing definitions for 17+ models across these providers:

- **Anthropic**: Claude Sonnet, Claude Opus, Claude Haiku
- **OpenAI**: GPT-4o, GPT-4 Turbo, GPT-3.5 Turbo
- **Google**: Gemini Pro, Gemini Flash
- **Azure**: OpenAI on Azure
- **Cohere**: Command R, Command R+
- **AWS Bedrock**: Various hosted models

## Logging Costs During Development

The simplest approach is logging costs immediately after each API call:

```bash
# After an Anthropic API call
cs log-ai -p anthropic -m claude-sonnet-4-20250514 --prompt-tokens 3200 --completion-tokens 800

# After an OpenAI API call
cs log-ai -p openai -m gpt-4o --prompt-tokens 450 --completion-tokens 1200
```

Each command appends the cost data to your active session. At the end of the session, `cs end` provides a complete breakdown by provider and model.

## Custom Pricing Models

For self-hosted models or providers not in the built-in list, define custom pricing:

```bash
cs pricing set my-custom-model 0.000001 0.000002
```

This registers your model with a rate of $0.001 per 1000 input tokens and $0.002 per 1000 output tokens. Use it just like any other model:

```bash
cs log-ai -p custom -m my-custom-model --prompt-tokens 5000 --completion-tokens 2000
```

## Programmatic Budget Enforcement

The most powerful pattern is embedding cost tracking directly into your automation code using the TypeScript SDK:

```typescript
import { AgentSession, BudgetExceededError } from 'codesession-cli/agents'

async function processWithBudget(items: string[]) {
  const session = new AgentSession('batch-processing', { budget: 10.00 })
  session.start()

  for (const item of items) {
    if (!session.canAfford(0.50)) {
      throw new BudgetExceededError('Insufficient budget remaining')
    }

    const result = await callLLM(item)
    // Log cost programmatically — cost is calculated from token counts
    // and the session's budget is automatically decremented
  }

  const report = session.end()
  return report
}
```

## Analyzing Cost Trends

Use the dashboard (`cs dashboard`) to visualize trends over time:

- Daily and 30-day cost projections
- Per-model spending breakdowns
- Provider comparison charts
- Activity heatmaps correlated with costs

All data stays on your machine. The dashboard server binds to localhost and makes no external network requests.

## Best Practices

1. **Set budgets per session**: Even if you do not automate enforcement, having a budget creates awareness
2. **Log costs immediately**: Integrate `cs log-ai` into your API wrapper or middleware
3. **Review weekly**: Regular reviews of the dashboard help catch unexpected cost increases early
4. **Use custom pricing**: For any model not in the built-in list, register it so your reports are complete

## Conclusion

CostHQ provides the visibility you need to understand and control your AI infrastructure costs. Whether you are an individual developer or part of a team, automated cost tracking ensures you never lose sight of your expenditure.