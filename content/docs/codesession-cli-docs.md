---
title: "codesession-cli - Track Coding Sessions"
excerpt: "Track coding sessions with automatic time tracking, file change monitoring, git commit logging, and AI cost integration."
category: TOOLS
order: 2
lastUpdated: 2026-03-02
published: true
description: "Complete documentation for codesession-cli - a developer CLI for tracking session time, file changes, git commits, and AI API costs per coding session."
tags: CLI, Productivity, DevTools, AI, Documentation
cover_image: 
canonical_url: 
series: Building CLI Tools
---

# codesession-cli Documentation

codesession-cli is a command-line tool for tracking coding sessions. It records how long you code, which files change, which git commits you make, and exactly how much you spend on AI APIs such as Claude and OpenAI. All data is stored locally in a SQLite database - nothing leaves your machine.

Current version: **2.5.1**
Node.js requirement: **18+**
License: **MIT**

---

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Tracking Methods](#tracking-methods)
   - [cs run - Wrap any command](#cs-run--wrap-any-command)
   - [Skill / MCP install - Claude Code and OpenClaw](#skill--mcp-install--claude-code-and-openclaw)
   - [cs proxy - Local API proxy](#cs-proxy--local-api-proxy)
   - [Manual tracking - cs start / cs end](#manual-tracking--cs-start--cs-end)
5. [Command Reference](#command-reference)
6. [Web Dashboard](#web-dashboard)
7. [Budget Alerts](#budget-alerts)
8. [MCP Server](#mcp-server)
9. [Example Output](#example-output)
10. [Data Storage](#data-storage)
11. [Configuration](#configuration)
12. [Integration](#integration)
13. [Use Cases](#use-cases)
14. [Troubleshooting](#troubleshooting)
15. [Best Practices](#best-practices)
16. [Advanced Usage](#advanced-usage)
17. [Resources](#resources)

---

## Overview

codesession-cli is designed for developers who work with AI agents and want full visibility into what each task costs - in time, in API dollars, and in code changes.

**Key capabilities:**

- One-command session tracking with `cs run` - starts session, proxy, command, and prints a cost summary on exit
- Auto-tracking for Claude Code and OpenClaw via a skill install
- Local HTTP proxy that intercepts Anthropic and OpenAI API calls and logs them to the active session automatically
- Budget alerts - configurable per-session and per-day spending limits
- Web dashboard - visual breakdown of sessions, model usage, and cost trends
- MCP server (`codesession-mcp`) - exposes session management as a Model Context Protocol tool inside Claude Code
- Built-in pricing for all major Claude, OpenAI, and Codex models - no manual cost calculation required
- Local SQLite storage - all data stays on your machine
- JSON export

**Works with:** Claude Code, OpenClaw, Codex, Cursor, Windsurf, Cline, and any custom agent script or manual workflow.

---

## Installation

```bash
npm install -g codesession-cli
```

This installs three binaries:

| Binary | Purpose |
|--------|---------|
| `cs` | Main CLI - all session and tracking commands |
| `codesession` | Alias for `cs` |
| `codesession-mcp` | Model Context Protocol server |

**Build tools requirement**

better-sqlite3 (the database driver) requires native compilation. On most systems this is automatic. If installation fails, see [Build Tools](#build-tools) below.

---

## Quick Start

**Option A - Wrap a command (recommended for agent scripts):**

```bash
cs run python my_agent.py
```

Starts a session, starts the local proxy, runs your command with the proxy pre-configured, ends the session, and prints a cost summary.

**Option B - Install a skill (recommended for Claude Code / OpenClaw):**

```bash
clawhub install codesession
```

The agent tracks itself automatically on every task.

**Option C - Manual:**

```bash
cs start "Build user authentication"
# ... code ...
cs end -n "Completed login flow"
cs show
```

---

## Tracking Methods

### cs run - Wrap any command

`cs run` is the zero-configuration approach for tracking any agent script or one-off command. It handles the full session lifecycle automatically.

```bash
cs run python my_agent.py
cs run node agent.js
cs run -- npx my-agent --task "fix the bug"
```

What happens in sequence:

1. A new session is created (name defaults to the command string)
2. A local proxy is started on port 3739 (configurable)
3. The command is launched with `ANTHROPIC_BASE_URL` and `OPENAI_BASE_URL` already pointing at the proxy - no environment variable setup required
4. All API calls made by the command are intercepted and logged to the session
5. When the command exits, the session is ended and a cost summary is printed

**Options:**

| Flag | Description |
|------|-------------|
| `--name <name>` | Custom session name instead of the command string |
| `--port <port>` | Proxy port (default: 3739) |
| `--no-proxy` | Skip the proxy; track session time only |

**Example output on exit:**

```
  Done  python my_agent.py
    14m  â€¢  8 files  â€¢  2 commits  â€¢  $1.43 AI cost
    Top model: claude-3-5-sonnet-20241022
```

---

### Skill / MCP install - Claude Code and OpenClaw

For Claude Code and OpenClaw users, install the codesession skill once and the agent tracks all its own activity automatically - no `cs run`, no manual steps.

**Install via ClawHub:**

```bash
clawhub install codesession
```

**Manual skill install (Claude Code):**

```bash
# Copy skill to Claude Code's skills directory
cp -r $(npm root -g)/codesession-cli/skills/codesession ~/.openclaw/skills/
```

**Manual MCP server setup (Claude Code):**

```bash
cs mcp
```

Then add the MCP server to Claude Code's configuration. See [MCP Server](#mcp-server) for details.

After installation, every Claude Code or OpenClaw task automatically:
- Creates a session on start
- Logs all API calls to the session
- Ends the session with a cost summary

Open the dashboard at any time:

```bash
cs dashboard
```

---

### cs proxy - Local API proxy

`cs proxy` starts a local HTTP proxy that sits in front of the Anthropic and OpenAI APIs. Any process that sends its API calls through the proxy has those calls automatically logged to the active session.

This approach works with any tool or script - not just scripts wrapped with `cs run`.

**Start the proxy:**

```bash
cs proxy
```

Default address: `http://127.0.0.1:3739`

**Start the proxy and create a session at the same time:**

```bash
cs proxy --session "fix auth bug"
```

This eliminates the need for a separate `cs start`.

**Options:**

| Flag | Description |
|------|-------------|
| `--port <port>` | Port to listen on (default: 3739) |
| `--session <name>`, `-s <name>` | Create and start a named session automatically |

**Configure your tools to use the proxy:**

```bash
# Mac / Linux
export ANTHROPIC_BASE_URL=http://127.0.0.1:3739
export OPENAI_BASE_URL=http://127.0.0.1:3739

# Windows PowerShell
$env:ANTHROPIC_BASE_URL = "http://127.0.0.1:3739"
$env:OPENAI_BASE_URL   = "http://127.0.0.1:3739"
```

When the proxy starts, it prints the correct syntax for your OS automatically.

**Proxy health check:**

```
GET http://127.0.0.1:3739/health
```

Returns JSON with proxy status and active session metadata.

**Security notes:**

- Binds to `127.0.0.1` only - not accessible to other machines on the network
- Upstream API hosts are hardcoded (`api.anthropic.com`, `api.openai.com`) - SSRF is not possible
- Request bodies and `Authorization` headers are forwarded only and never stored or logged
- 10 MB cap on upstream response buffers in non-streaming mode
- 30-second upstream timeout
- Returns 403 for any non-loopback connection attempt
- Returns a generic 502 on upstream failure - no internal stack traces are exposed

---

### Manual tracking - cs start / cs end

For longer work periods where you want to control the session boundaries yourself:

```bash
cs start "Refactor payment service"
# ... work ...
cs end -n "Extracted PaymentService class, 3 tests added"
```

AI costs can be logged manually during the session:

```bash
cs log-ai -p anthropic -m claude-3-5-sonnet-20241022 -t 25000 -c 0.25
```

Or the proxy can be started separately and left running while you work:

```bash
cs start "Build recommendation engine"
cs proxy   # in a separate terminal, or use cs proxy --session above
# ... code ...
cs end
```

---

## Command Reference

### cs run

```
cs run [options] <command> [args...]
```

Wraps a command with a full session lifecycle including the local proxy.

| Flag | Default | Description |
|------|---------|-------------|
| `--name <name>` | command string | Session name |
| `--port <port>` | 3739 | Proxy port |
| `--no-proxy` | false | Disable proxy, track session only |

---

### cs start

```
cs start <description>
```

Start a new session manually. Only one session can be active at a time.

```bash
cs start "Feature: Add user search"
cs start "Bug: Fix null pointer in payment flow"
```

---

### cs end

```
cs end [options]
```

End the active session and print a summary.

| Flag | Description |
|------|-------------|
| `-n, --notes <text>` | Add notes to the session before ending |

```bash
cs end
cs end -n "Completed login flow, needs QA review"
```

---

### cs proxy

```
cs proxy [options]
```

Start the local API proxy.

| Flag | Default | Description |
|------|---------|-------------|
| `--port <port>` | 3739 | Port to listen on |
| `-s, --session <name>` | - | Start a named session automatically |

```bash
cs proxy
cs proxy --port 4000
cs proxy --session "fix auth bug"
```

---

### cs status

```
cs status
```

Show whether a session is currently active, and if so, its ID, name, start time, and elapsed duration.

---

### cs show

```
cs show [id] [options]
```

Show details for a session. Defaults to the most recent session.

| Flag | Description |
|------|-------------|
| `--files` | List changed files |
| `--commits` | List git commits |

```bash
cs show
cs show 12
cs show 12 --files --commits
```

---

### cs list

```
cs list [options]
```

List recent sessions in a summary table.

| Flag | Default | Description |
|------|---------|-------------|
| `-l, --limit <n>` | 10 | Number of sessions to show |

```bash
cs list
cs list -l 50
```

---

### cs stats

```
cs stats
```

Show aggregate statistics across all sessions: total time, total AI cost, average session length, files changed, commits made, and total tokens.

---

### cs log-ai

```
cs log-ai [options]
```

Manually log an AI API usage entry to the active session.

| Flag | Description |
|------|-------------|
| `-p, --provider <name>` | Provider name (anthropic, openai, etc.) |
| `-m, --model <name>` | Model name |
| `-t, --tokens <n>` | Total tokens used |
| `-c, --cost <amount>` | Cost in USD |

```bash
cs log-ai -p openai -m gpt-4o -t 15000 -c 0.125
cs log-ai -p anthropic -m claude-3-5-sonnet-20241022 -t 25000 -c 0.250
```

---

### cs dashboard

```
cs dashboard
```

Start the local web dashboard and open it in the browser. Shows session history, per-session cost breakdown, model usage distribution, and cost trends over time.

---

### cs budget

```
cs budget [options]
```

Configure spending alerts.

| Flag | Description |
|------|-------------|
| `--daily <amount>` | Alert when daily AI spend exceeds this amount (USD) |
| `--session <amount>` | Alert when a single session's AI spend exceeds this amount (USD) |

```bash
cs budget --daily 10.00
cs budget --session 2.00
```

---

### cs mcp

```
cs mcp
```

Start the Model Context Protocol server. Used to integrate codesession-cli with Claude Code as an MCP tool. See [MCP Server](#mcp-server) for setup instructions.

---

## Web Dashboard

Start the dashboard:

```bash
cs dashboard
```

The dashboard runs locally and provides:

- Session list with duration, cost, files, and commits per session
- Aggregate cost and token usage over time
- Model breakdown - which models are being used and what they cost
- Session detail view with file and commit lists
- Pricing reference for supported models

The dashboard is served locally only and does not transmit data externally.

---

## Budget Alerts

Set per-session or daily spending limits:

```bash
# Alert if a single session exceeds $2.00
cs budget --session 2.00

# Alert if daily total exceeds $10.00
cs budget --daily 10.00
```

When a limit is reached, the proxy and `cs run` will emit a warning. Sessions are not terminated automatically - you remain in control of when to stop.

---

## MCP Server

The `codesession-mcp` binary exposes session management as a Model Context Protocol server, allowing Claude Code to start sessions, log usage, and query session data directly during a task.

**Start the MCP server:**

```bash
cs mcp
# or
codesession-mcp
```

**Add to Claude Code's MCP configuration:**

In your Claude Code settings file, add:

```json
{
  "mcpServers": {
    "codesession": {
      "command": "codesession-mcp"
    }
  }
}
```

Once configured, Claude Code can manage its own sessions without any manual commands.

---

## Example Output

### cs run exit summary

```
  Done  python my_agent.py
    14m  â€¢  8 files  â€¢  2 commits  â€¢  $1.43 AI cost
    Top model: claude-3-5-sonnet-20241022
```

### cs show

```
$ cs show

Session: Fix authentication bug

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Status          â”‚ Completed                          â”‚
â”‚ Started         â”‚ Mar 02, 2026 14:30                 â”‚
â”‚ Ended           â”‚ Mar 02, 2026 14:44                 â”‚
â”‚ Duration        â”‚ 14m                                â”‚
â”‚ Files Changed   â”‚ 8                                  â”‚
â”‚ Commits         â”‚ 2                                  â”‚
â”‚ AI Tokens       â”‚ 31,450                             â”‚
â”‚ AI Cost         â”‚ $1.43                              â”‚
â”‚ Top Model       â”‚ claude-3-5-sonnet-20241022         â”‚
â”‚ Notes           â”‚ Resolved null pointer in JWT check â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### cs list

```
$ cs list

Recent Sessions:

â”Œâ”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ ID â”‚ Description                     â”‚ Duration â”‚ Files â”‚ Cost    â”‚
â”œâ”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”¼â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¤
â”‚ 14 â”‚ Fix authentication bug          â”‚ 14m      â”‚ 8     â”‚ $1.43   â”‚
â”‚ 13 â”‚ Build recommendation engine     â”‚ 2h 10m   â”‚ 21    â”‚ $6.25   â”‚
â”‚ 12 â”‚ Refactor payment service        â”‚ 1h 45m   â”‚ 14    â”‚ $3.12   â”‚
â”‚ 11 â”‚ Add user search with filters    â”‚ 55m      â”‚ 6     â”‚ $0.89   â”‚
â””â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

### cs stats

```
$ cs stats

Overall Statistics:

â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
â”‚ Total Sessions    â”‚ 52       â”‚
â”‚ Total Time        â”‚ 138h 20m â”‚
â”‚ Average Session   â”‚ 2h 39m   â”‚
â”‚ Files Changed     â”‚ 412      â”‚
â”‚ Total Commits     â”‚ 184      â”‚
â”‚ AI Tokens Used    â”‚ 3.1M     â”‚
â”‚ Total AI Cost     â”‚ $104.72  â”‚
â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
```

---

## Data Storage

### Location

All session data is stored in a local SQLite database.

| Platform | Path |
|----------|------|
| Windows | `C:\Users\<username>\.codesession\sessions.db` |
| Mac / Linux | `~/.codesession/sessions.db` |

The database is created automatically on first use.

### Environment variable override

To store the database at a custom path (useful for test isolation or shared configurations):

```bash
# Mac / Linux
export CODESESSION_DB_PATH=/path/to/sessions.db

# Windows PowerShell
$env:CODESESSION_DB_PATH = "C:\path\to\sessions.db"
```

### Schema

```sql
CREATE TABLE sessions (
  id              INTEGER PRIMARY KEY,
  description     TEXT    NOT NULL,
  started_at      TEXT    NOT NULL,
  ended_at        TEXT,
  duration_minutes INTEGER,
  files_changed   INTEGER DEFAULT 0,
  commits_count   INTEGER DEFAULT 0,
  notes           TEXT,
  status          TEXT    DEFAULT 'active'
);

CREATE TABLE ai_usage (
  id          INTEGER PRIMARY KEY,
  session_id  INTEGER,
  provider    TEXT,
  model       TEXT,
  tokens      INTEGER,
  cost        REAL,
  logged_at   TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);
```

### Privacy

- No cloud sync - all data stays on the local machine
- No telemetry - the tool does not phone home
- No API key storage - the proxy forwards `Authorization` headers as-is and never stores them
- Full control - delete or export data at any time

### Backup

```bash
# Mac / Linux - copy the database file
cp ~/.codesession/sessions.db ~/backups/codesession-$(date +%Y%m%d).db

# Export session list as text
cs list -l 1000 > sessions-export.txt
```

---

## Configuration

### Supported model pricing

codesession-cli includes built-in pricing for the following model families. Costs are calculated automatically when the proxy intercepts API calls - no manual `-c` flag required.

**Anthropic - Claude:**
- claude-opus-4, claude-sonnet-4, claude-3-7-sonnet
- claude-3-5-sonnet-20241022, claude-3-5-haiku-20241022
- claude-3-opus-20240229, claude-3-sonnet-20240229, claude-3-haiku-20240307

**OpenAI:**
- gpt-4o, gpt-4o-mini
- gpt-4-turbo, gpt-4, gpt-3.5-turbo
- o1, o1-mini, o3-mini

**OpenAI Codex:**
- gpt-5.1-codex-max, gpt-5.1-codex-mini
- gpt-5.3-codex, codex-mini-latest

For models not in the pricing table, use the `-c` flag with `cs log-ai` to provide the cost manually.

### Build tools

If installation fails with a native compilation error, install the C/C++ build tools for your platform:

**Windows:**
```bash
npm install -g windows-build-tools
```

Or install "Desktop development with C++" from the Visual Studio installer.

**Mac:**
```bash
xcode-select --install
```

**Linux (Debian / Ubuntu):**
```bash
sudo apt-get install build-essential
```

---

## Integration

### Claude Code - MCP skill

See [Skill / MCP install](#skill--mcp-install--claude-code-and-openclaw) and [MCP Server](#mcp-server).

### With aitoken-cli

If you use [aitoken-cli](https://www.npmjs.com/package/aitoken-cli) to track API usage separately, import entries into the active session:

```bash
at today --json | jq -r '.[-1] | "cs log-ai -p \(.provider) -m \(.model) -t \(.total_tokens) -c \(.cost)"' | sh
```

### Git hooks

Commits made during an active session are logged automatically. If you want to trigger additional actions on commit, add to `.git/hooks/post-commit`:

```bash
#!/bin/sh
cs status > /dev/null 2>&1
if [ $? -eq 0 ]; then
  echo "Commit logged to active session"
fi
```

### CI/CD

Track build and test pipelines:

```bash
cs start "CI Build #${BUILD_NUMBER}"
npm run build && npm test
cs end -n "Build result: $?"
```

### Custom agent scripts

Any script that makes Anthropic or OpenAI API calls can be tracked without code changes:

```bash
# Wrap with cs run - proxy is pre-configured automatically
cs run python my_agent.py

# Or start the proxy manually and set env vars before running
cs proxy --session "agent run" &
export ANTHROPIC_BASE_URL=http://127.0.0.1:3739
python my_agent.py
cs end
```

---

## Use Cases

### Freelance billing

Track exact time and AI costs per client feature to support accurate invoicing:

```bash
cs start "Client A: Rebuild checkout flow"
# ... work ...
cs log-ai -p openai -m gpt-4o -t 20000 -c 2.50
cs end -n "Checkout complete, deployed to staging"
cs show   # exact duration and AI spend for the invoice
```

### AI cost governance

Monitor how much each feature or task actually costs in API spend:

```bash
cs run python build_feature.py --feature recommendations
# On exit: duration, files, commits, total API cost
```

Review weekly:

```bash
cs list -l 20
cs stats
```

### Learning and portfolio tracking

Build a record of what you have learned and how long each topic took:

```bash
cs start "Learning: React Server Components"
# ... 3 hours later
cs end -n "Completed RSC tutorial, built small demo"
cs stats  # total learning time over time
```

### Team velocity

Each developer tracks their own sessions; aggregate stats reveal patterns in time allocation and AI spend across features:

```bash
cs list -l 30  # last 30 sessions
cs stats       # overall metrics
```

---

## Troubleshooting

### Cannot start a session - one already active

Only one session can be active at a time.

```bash
cs status   # check what is active
cs end      # end it before starting a new one
cs start "New session"
```

### Proxy port already in use

```bash
cs proxy --port 4000
cs run --port 4000 python my_agent.py
```

### API costs not being tracked

Ensure the tool is configured to send requests through the proxy:

```bash
# Confirm the proxy is running
curl http://127.0.0.1:3739/health

# Confirm the env vars are set correctly in the same shell session
echo $ANTHROPIC_BASE_URL          # Mac / Linux
echo $env:ANTHROPIC_BASE_URL      # Windows PowerShell
```

If using `cs run`, environment variables are set automatically - no manual configuration needed.

### Database location

```bash
# Mac / Linux
echo ~/.codesession/sessions.db

# Windows PowerShell
echo $env:USERPROFILE\.codesession\sessions.db
```

### Reset all data

```bash
# Back up first
cp ~/.codesession/sessions.db ~/sessions-backup.db

# Delete to reset
rm ~/.codesession/sessions.db
# Database is recreated automatically on next use
```

### File changes not tracking

File change monitoring requires the watcher process to be running during the session. With `cs run`, this is handled automatically. With manual `cs start`, file tracking relies on git commit detection - real-time file watching requires the watcher to be active. For most use cases, relying on git commits is sufficient and more accurate.

---

## Best Practices

### Write meaningful session descriptions

Descriptions appear in `cs list` output and the dashboard. Specific descriptions make historical data far more useful:

```bash
# Useful
cs start "Feature: Add rate limiting to /api/search"
cs start "Bug: Fix race condition in queue processor"
cs start "Refactor: Extract EmailService from UserController"

# Not useful
cs start "coding"
cs start "working on stuff"
```

### Use cs run for agent scripts

`cs run` eliminates the most common mistake: forgetting to start or end a session, or forgetting to set proxy env vars. If you are running an agent script, always prefer `cs run` over the manual workflow.

### Check status before starting work

If you switch contexts mid-session, it is easy to have a session left running from a previous task:

```bash
cs status   # always check before cs start
```

### Set budget limits

If you are experimenting with agents, set a per-session budget to avoid surprise costs:

```bash
cs budget --session 5.00
cs budget --daily 20.00
```

### Review at the end of each week

```bash
cs list -l 20
cs stats
```

This builds an accurate picture of where your time and AI budget are actually going.

---

## Advanced Usage

### Shell aliases

```bash
# Add to ~/.bashrc or ~/.zshrc
alias csr="cs run"
alias css="cs start"
alias cse="cs end"
alias csl="cs list"
alias csst="cs stats"
```

### Dynamic session notes

Capture branch or commit context automatically when ending a session:

```bash
# Include current git branch
cs end -n "Branch: $(git branch --show-current)"

# Include number of commits made
cs end -n "Made $(git rev-list --count HEAD ^origin/main) commits"
```

### Custom database path for project isolation

Keep sessions for separate projects in separate databases:

```bash
export CODESESSION_DB_PATH=~/projects/client-a/.codesession.db
cs start "Client A work"
```

### Export reports

```bash
# Export last 50 sessions to a text file
cs list -l 50 > weekly-report-$(date +%Y%m%d).txt

# Full stats snapshot
cs stats > monthly-stats-$(date +%Y-%m).txt
```

---

## Resources

- [npm Package](https://www.npmjs.com/package/codesession-cli)
- [GitHub Repository](https://github.com/brian-mwirigi/codesession-cli)
- [Changelog](https://github.com/brian-mwirigi/codesession-cli/blob/main/CHANGELOG.md)
- [Issues](https://github.com/brian-mwirigi/codesession-cli/issues)
- [Sponsor on GitHub](https://github.com/sponsors/brian-mwirigi)

## Related Tools

- [aitoken-cli](https://www.npmjs.com/package/aitoken-cli) - Track AI API token usage and costs
- [runbook-cli](https://www.npmjs.com/package/runbook-cli) - Save and recall project-specific commands

## License

MIT

## Contributing

Contributions are welcome. Please open an issue to discuss the change before submitting a pull request. See [CONTRIBUTING.md](https://github.com/brian-mwirigi/codesession-cli/blob/main/CONTRIBUTING.md) for guidelines.

---

**Author:** [Brian Mwirigi](https://github.com/brian-mwirigi)
**Website:** [brianmunene.me](https://brianmunene.me)
