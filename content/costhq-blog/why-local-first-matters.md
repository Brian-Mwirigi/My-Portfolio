---
title: Why Local-First Storage Matters for Developer Tools
excerpt: CostHQ stores all your data locally. No cloud sync, no telemetry, no external connections. Here is why this architectural decision matters for security and reliability.
date: 2026-05-10
readTime: 5 min read
category: Engineering
image: https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&auto=format&fit=crop
tags:
  - Architecture
  - Security
  - Privacy
---

## CostHQ — Local-First by Design

CostHQ is minimal, auditable, and unambiguous. Data lives where you control it: on your machine. No defaults that leak, no telemetry by accident, no hidden network activity.

## Design Principles

- Local-first: primary storage is local, authoritative, and fast.
- Zero telemetry: nothing is sent unless you explicitly opt in.
- Localhost-only UI: dashboard binds to 127.0.0.1; no public endpoints.
- Opt-in cloud: team sync and cloud features are strictly opt-in and end-to-end encrypted.

## Technical Snapshot

- Storage: a single SQLite file kept in your user data directory (`~/.costhq/sessions.db`).
- UI: lightweight dashboard served on `127.0.0.1` for debugging and inspection.
- No outbound: the runtime makes no external connections by default.
- Auditability: every data schema and migration is open source and reviewable.

## Inspect & Export

Query the local DB directly for verification:

```bash
sqlite3 ~/.costhq/sessions.db "SELECT id, started_at, project, cost FROM sessions ORDER BY started_at DESC LIMIT 10;"
```

Export JSON for tooling or backup:

```bash
cs list --json > costhq-sessions.json
```

## When Cloud Is Appropriate

Cloud sync exists for teams that need it. It is encrypted, auditable, and opt-in. CostHQ's default stance: cloud features must not reduce local control.

## Commitment

CostHQ is a tool for engineers who refuse surprise data collection. Local-first is not a marketing line — it is an operational guarantee: auditable, resilient, and controlled by you.
