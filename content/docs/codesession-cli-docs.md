---
title: "codesession-cli - Track Coding Sessions"
excerpt: "Track coding sessions with automatic time tracking, file change monitoring, git commit logging, and AI cost integration."
category: TOOLS
order: 2
lastUpdated: 2026-02-01
published: false
description: "Complete documentation for codesession-cli - a CLI tool to track coding time, file changes, commits, and AI costs per session."
tags: CLI, Productivity, DevTools, Documentation
cover_image: 
canonical_url: 
series: Building CLI Tools
---

# codesession-cli Documentation

Track coding sessions with time, file changes, commits, and AI costs.

## Overview

codesession-cli helps developers understand how they spend their coding time. Track sessions, monitor file changes, log commits, and calculate AI API costs—all from the command line.

**Key Features:**
- Session time tracking (start/stop)
- Automatic file change monitoring
- Git commit logging
- AI cost tracking integration
- Detailed session statistics
- Local SQLite storage
- JSON export

## Installation

```bash
npm install -g codesession-cli
```

## Quick Start

```bash
# Start a session
cs start "Build user authentication"

# Code... (automatic tracking)

# End session
cs end -n "Completed login flow"

# View summary
cs show
```

## Usage

### Starting a Session

Begin tracking a coding session:

```bash
# Start with description
cs start "Feature name"

# Example
cs start "Build user profile page"
```

What gets tracked automatically:
- Start timestamp
- File changes (if file watcher is active)
- Git commits
- Session duration

### Ending a Session

Stop tracking and view summary:

```bash
# Simple end
cs end

# With notes
cs end -n "Completed feature X, needs testing"

# End and add notes later
cs end
```

Output includes:
- Total duration
- Files changed
- Commits made
- AI costs (if logged)
- Notes

### Viewing Sessions

#### Show Last Session

```bash
# Default: show last session
cs show

# With details
cs show --files --commits
```

#### Show Specific Session

```bash
# By session ID
cs show 5

# With full details
cs show 5 --files --commits
```

#### List Recent Sessions

```bash
# Last 10 sessions (default)
cs list

# More sessions
cs list -l 20

# Last 50
cs list -l 50
```

### Session Statistics

View aggregate statistics:

```bash
# Overall stats
cs stats

# Shows:
# - Total sessions
# - Total time coded
# - Average session length
# - Files changed
# - Commits made
# - AI costs
```

### Checking Status

Check if a session is active:

```bash
cs status
```

Output:
- Active session ID
- Description
- Start time
- Current duration

### Logging AI Usage

Track AI API costs during sessions:

```bash
# Log AI usage
cs log-ai -p <provider> -m <model> -t <tokens> -c <cost>

# Example
cs log-ai -p openai -m gpt-4o -t 15000 -c 0.125

# Multiple entries
cs log-ai -p anthropic -m claude-3.5-sonnet -t 25000 -c 0.250
```

**Options:**
- `-p, --provider` - AI provider (openai, anthropic, etc.)
- `-m, --model` - Model name
- `-t, --tokens` - Total tokens used
- `-c, --cost` - Cost in USD

## Command Reference

### Core Commands

| Command | Description |
|---------|-------------|
| `cs start <description>` | Start a new session |
| `cs end [-n <notes>]` | End active session |
| `cs show [id] [--files] [--commits]` | Show session details |
| `cs list [-l <limit>]` | List recent sessions |
| `cs stats` | Show aggregate statistics |
| `cs status` | Check active session |
| `cs log-ai` | Log AI API usage |

### Options

**cs end:**
- `-n, --notes` - Add notes to session

**cs show:**
- `--files` - Show changed files
- `--commits` - Show commits

**cs list:**
- `-l, --limit` - Number of sessions (default: 10)

**cs log-ai:**
- `-p, --provider` - Provider name
- `-m, --model` - Model name
- `-t, --tokens` - Token count
- `-c, --cost` - Cost amount

## Example Output

### Session Summary

```bash
$ cs show

Session: Build user authentication

┌──────────────┬────────────────────────────┐
│ Metric       │ Value                      │
├──────────────┼────────────────────────────┤
│ Status       │ Completed                  │
│ Started      │ Feb 01, 2026 14:30         │
│ Ended        │ Feb 01, 2026 16:45         │
│ Duration     │ 2h 15m                     │
│ Files Changed│ 12                         │
│ Commits      │ 5                          │
│ AI Tokens    │ 45,000                     │
│ AI Cost      │ $2.34                      │
│ Notes        │ Completed basic auth flow  │
└──────────────┴────────────────────────────┘
```

### Session List

```bash
$ cs list

Recent Sessions:

┌────┬─────────────────────────────┬──────────┬───────┬─────────┐
│ ID │ Description                 │ Duration │ Files │ Cost    │
├────┼─────────────────────────────┼──────────┼───────┼─────────┤
│ 10 │ Build user profile          │ 1h 45m   │ 8     │ $1.23   │
│ 9  │ Fix authentication bug      │ 45m      │ 3     │ $0.45   │
│ 8  │ Add password reset          │ 2h 30m   │ 15    │ $3.12   │
│ 7  │ Implement email verification│ 1h 20m   │ 6     │ $0.89   │
└────┴─────────────────────────────┴──────────┴───────┴─────────┘
```

### Statistics

```bash
$ cs stats

Overall Statistics:

┌───────────────────┬──────────┐
│ Metric            │ Value    │
├───────────────────┼──────────┤
│ Total Sessions    │ 45       │
│ Total Time        │ 124h 30m │
│ Average Session   │ 2h 46m   │
│ Files Changed     │ 342      │
│ Total Commits     │ 156      │
│ AI Tokens Used    │ 2.4M     │
│ Total AI Cost     │ $87.45   │
└───────────────────┴──────────┘
```

## Use Cases

### Freelance Work

Track time and AI costs per client feature:

```bash
# Start client work
cs start "Client A: User dashboard"

# Code for 3 hours...
# Log AI usage as you go
cs log-ai -p openai -m gpt-4o -t 15000 -c 1.25

# End session
cs end -n "Dashboard complete, pending review"

# Generate invoice
cs show 15  # Shows exact time and costs
```

### Learning & Portfolio

Track your learning journey:

```bash
cs start "Learning React hooks"
# ... 2 hours later
cs end -n "Completed useState and useEffect"

# Later, show progress
cs list  # See all learning sessions
cs stats # Total learning time
```

### Content Creation

Track time for blog posts about your builds:

```bash
cs start "Building authentication system"
# ... build and track
cs end -n "Blog post: How I built auth in 3 hours"

# Use session data for content
cs show --files --commits
```

### Team Velocity

Monitor individual productivity:

```bash
# Each dev tracks sessions
cs start "Feature: Search functionality"
# ... code
cs end

# Weekly review
cs list -l 20  # Last 20 sessions
cs stats       # Overall velocity
```

### Budget Management

Track AI spending per feature:

```bash
cs start "Build recommendation engine"

# Log AI usage per API call
cs log-ai -p openai -m gpt-4o -t 20000 -c 2.50
cs log-ai -p anthropic -m claude-3.5-sonnet -t 35000 -c 3.75

cs end -n "AI cost: $6.25 for recommendations"

# Review monthly AI spending
cs stats  # Total AI cost
```

## Integration

### With aitoken-cli

Automatically import AI costs:

```bash
# Track AI calls with aitoken-cli
at add -p openai -m gpt-4o -i 10000 -o 5000

# Then log to session
at today --json | jq -r '.[-1] | "cs log-ai -p \(.provider) -m \(.model) -t \(.total_tokens) -c \(.cost)"' | sh
```

### With Git Hooks

Auto-log commits to active sessions.

Create `.git/hooks/post-commit`:

```bash
#!/bin/sh
# Check if session active
cs status > /dev/null 2>&1
if [ $? -eq 0 ]; then
  # Session active, commit will be logged automatically
  echo "Commit logged to active session"
fi
```

### CI/CD Integration

Track build times:

```bash
# In CI script
cs start "CI Build #${BUILD_ID}"
npm run build
npm test
cs end -n "Build successful"
```

## Data Storage

### Location

All data stored locally in SQLite:

**Windows:** `C:\Users\<username>\.codesession\sessions.db`  
**Mac/Linux:** `~/.codesession/sessions.db`

### Database Schema

```sql
CREATE TABLE sessions (
  id INTEGER PRIMARY KEY,
  description TEXT NOT NULL,
  started_at TEXT NOT NULL,
  ended_at TEXT,
  duration_minutes INTEGER,
  files_changed INTEGER DEFAULT 0,
  commits_count INTEGER DEFAULT 0,
  notes TEXT,
  status TEXT DEFAULT 'active'
);

CREATE TABLE ai_usage (
  id INTEGER PRIMARY KEY,
  session_id INTEGER,
  provider TEXT,
  model TEXT,
  tokens INTEGER,
  cost REAL,
  logged_at TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);
```

### Privacy

- **No cloud sync** - All data stays local
- **No tracking** - Your sessions are private
- **Full control** - Export or delete anytime

### Backup

```bash
# Backup database
cp ~/.codesession/sessions.db ~/backups/codesession-$(date +%Y%m%d).db

# Or export as JSON
cs list -l 1000 > sessions-backup.txt
```

## Troubleshooting

### Session Won't Start

**Issue:** Cannot start session

**Check:**
```bash
# Is there an active session?
cs status

# End it first
cs end
cs start "New session"
```

### File Changes Not Tracking

**Note:** File watching requires running process. For production use, implement a persistent file watcher or use git commit tracking instead.

**Current limitation:** Basic file tracking included, but real-time monitoring needs additional setup.

### Database Location

**Find database:**
```bash
# Windows
echo %USERPROFILE%\.codesession\sessions.db

# Mac/Linux
echo ~/.codesession/sessions.db
```

### Reset All Data

```bash
# Delete database (backup first!)
rm ~/.codesession/sessions.db

# Tool will create new database on next use
cs start "Fresh start"
```

## Best Practices

### Session Descriptions

Be specific and consistent:

```bash
# Good
cs start "Feature: Add user search with filters"
cs start "Bug: Fix memory leak in image processor"
cs start "Refactor: Extract payment service"

# Avoid vague descriptions
cs start "Working on stuff"
cs start "Coding"
```

### End Sessions Promptly

Don't leave sessions running:

```bash
# Check status when resuming work
cs status

# End forgotten sessions
cs end -n "Forgot to end session"
```

### Track AI Costs Immediately

Log AI usage right after API calls:

```bash
# In your code
response = call_openai()
tokens = response.usage.total_tokens
cost = calculate_cost(tokens)

# Log immediately
subprocess.run(['cs', 'log-ai', '-p', 'openai', '-m', 'gpt-4o', '-t', str(tokens), '-c', str(cost)])
```

### Review Weekly

Check productivity trends:

```bash
# Monday morning ritual
cs list -l 20  # Review last week
cs stats       # Overall metrics
```

## Advanced Usage

### Shell Aliases

Create shortcuts:

```bash
# In ~/.bashrc or ~/.zshrc
alias css="cs start"
alias cse="cs end"
alias csl="cs list"
alias csst="cs stats"
```

### Automatic Session Notes

End with dynamic notes:

```bash
# Capture git branch
cs end -n "Branch: $(git branch --show-current)"

# Include commit count
cs end -n "Made $(git rev-list --count HEAD ^origin/main) commits"
```

### Export Reports

Generate reports:

```bash
# Weekly report
cs list -l 50 > weekly-report-$(date +%Y%m%d).txt

# Monthly stats
cs stats > monthly-stats-$(date +%Y-%m).txt
```

## Resources

- [npm Package](https://www.npmjs.com/package/codesession-cli)
- [GitHub Repository](https://github.com/brian-mwirigi/codesession-cli)
- [Issues](https://github.com/brian-mwirigi/codesession-cli/issues)

## Related Tools

- [aitoken-cli](https://www.npmjs.com/package/aitoken-cli) - Track AI API costs
- [runbook-cli](https://www.npmjs.com/package/runbook-cli) - Remember project commands

## License

MIT

## Contributing

Contributions welcome. Please open an issue or pull request on [GitHub](https://github.com/brian-mwirigi/codesession-cli).

---

**Author:** [Brian Mwirigi](https://github.com/brian-mwirigi)  
**Website:** [brianmunene.me](https://brianmunene.me)
