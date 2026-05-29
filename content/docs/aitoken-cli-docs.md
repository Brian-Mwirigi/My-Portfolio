---
title: "aitoken-cli (Deprecated) - See CostHQ"
published: true
description: "aitoken-cli has been deprecated and replaced by CostHQ, a more robust, professional FinOps platform for AI agents."
tags: AI, CLI, CostHQ, Documentation
cover_image:
canonical_url:
series: Building CLI Tools
---

# aitoken-cli is now CostHQ

> **Notice:** `aitoken-cli` (and `codesession-cli`) have been officially deprecated and completely rebranded into a single, much more robust platform: **CostHQ**.

If you are looking to track AI agent session costs, monitor file changes, track git commits, and enforce budget limits, please use [CostHQ](https://github.com/brian-mwirigi/costhq).

### Why the change?
CostHQ is the professional evolution of aitoken-cli. It introduces:
- A beautiful Local Web Dashboard for analytics
- Hard spend limits and team budgets
- Runaway agent detection (infinite loops, cost velocity)
- Complete OpenClaw integration
- Custom model pricing

## Next Steps

**1. Uninstall the old CLI:**
```bash
npm uninstall -g aitoken-cli
```

**2. Install CostHQ:**
```bash
npm install -g costhq
```

For full documentation, setup instructions, and features, visit the official [CostHQ GitHub Repository](https://github.com/brian-mwirigi/costhq).
