---
title: "runbook-cli - Remember Project Commands"
excerpt: "Remember and run project commands from any subfolder. Automatic git root detection with cross-language support."
category: TOOLS
order: 3
lastUpdated: 2026-02-01
published: false
description: "Complete documentation for runbook-cli - a CLI tool to remember and run project commands from anywhere in your codebase."
tags: CLI, Productivity, DevTools, Documentation
cover_image: 
canonical_url: 
series: Building CLI Tools
---

# runbook-cli Documentation

Remember project commands and run them from any subfolder.

## Overview

runbook-cli eliminates the need to remember project-specific commands. Set commands once, run them from anywhere in your project tree. Works with any language, framework, or toolchain.

**Key Features:**
- Set commands once, run from any subfolder
- Automatic git root detection
- Cross-language support (Node, Python, Go, Rust, etc.)
- Team sharing via git
- Simple JSON storage
- Fast and lightweight

## Installation

```bash
npm install -g runbook-cli
```

## Quick Start

```bash
# Set a command
runbook set dev "npm run dev"

# Run from anywhere
runbook dev

# Works in subfolders too
cd src/components
runbook dev  # Still works!
```

## Usage

### Setting Commands

Save commands with descriptive names:

```bash
# Development server
runbook set dev "npm run dev"

# Testing
runbook set test "npm test"

# Build
runbook set build "npm run build"

# Multi-step commands
runbook set deploy "npm run build && npm test && git push"

# With installation
runbook set dev "npm install && npm run dev"
```

### Running Commands

Execute saved commands from anywhere:

```bash
# Run by name
runbook dev

# Short alias
rb dev

# Works from any project subfolder
cd src/components
runbook dev  # Executes from project root
```

### Listing Commands

View all saved commands:

```bash
# Show all commands
runbook list

# Or simply
runbook
```

Output:
```
Available commands:
  dev: npm run dev
  test: npm test
  build: npm run build
```

### Deleting Commands

Remove commands you no longer need:

```bash
# Delete by name
runbook delete dev

# Short form
runbook rm dev
```

### Project Information

View runbook configuration:

```bash
runbook info
```

Shows:
- Project root location
- Number of commands
- Storage file path

## Command Reference

### Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `runbook set <name> <command>` | - | Save a command |
| `runbook <name>` | `rb <name>` | Run a saved command |
| `runbook list` | `runbook` | List all commands |
| `runbook delete <name>` | `runbook rm <name>` | Delete a command |
| `runbook info` | - | Show project information |

### Options

- All commands automatically detect git root
- Commands execute from project root regardless of current directory
- Changes saved to `.runbook` file in project root

## How It Works

### Git Root Detection

runbook-cli automatically finds your project root by traversing upward until it finds a `.git` directory. Commands always execute from this root location.

```bash
# Your structure
my-project/
├── .git/
├── .runbook          # Commands stored here
├── src/
│   └── components/
│       └── Button.tsx

# From anywhere
cd my-project/src/components
runbook dev  # Executes from my-project/
```

### Storage Format

Commands are stored in `.runbook` (JSON):

```json
{
  "dev": "npm run dev",
  "test": "npm test",
  "build": "npm run build",
  "deploy": "npm run build && npm test && git push"
}
```

### Team Sharing

Commit `.runbook` to share with your team:

```bash
git add .runbook
git commit -m "Add runbook commands"
git push
```

Team members clone and immediately have access to all commands:

```bash
git clone repo
cd repo
runbook  # Shows: dev, test, build, deploy
runbook dev  # Works instantly
```

## Language Examples

### Node.js / TypeScript

```bash
runbook set dev "npm install && npm run dev"
runbook set build "npm run build"
runbook set test "npm test"
runbook set lint "npm run lint"
runbook set deploy "npm run build && npm run test && git push"
```

### Python / Django

```bash
runbook set dev "pip install -r requirements.txt && python manage.py runserver"
runbook set migrate "python manage.py migrate"
runbook set shell "python manage.py shell"
runbook set test "python manage.py test"
runbook set collectstatic "python manage.py collectstatic --noinput"
```

### Go

```bash
runbook set dev "go run main.go"
runbook set build "go build -o bin/app"
runbook set test "go test ./..."
runbook set install "go mod download"
runbook set run "go build -o bin/app && ./bin/app"
```

### Rust

```bash
runbook set dev "cargo run"
runbook set build "cargo build --release"
runbook set test "cargo test"
runbook set check "cargo check"
runbook set fmt "cargo fmt"
```

### Docker / Docker Compose

```bash
runbook set up "docker-compose up -d"
runbook set down "docker-compose down"
runbook set logs "docker-compose logs -f"
runbook set build "docker-compose build"
runbook set restart "docker-compose restart"
```

### Full Stack

```bash
runbook set dev "docker-compose up -d && npm run dev"
runbook set backend "cd backend && python manage.py runserver"
runbook set frontend "cd frontend && npm start"
runbook set all "docker-compose up -d && npm run backend & npm run frontend"
```

## Use Cases

### New Developer Onboarding

**Before runbook:**
1. Find README
2. Locate setup section
3. Copy commands
4. Hope they work

**With runbook:**
```bash
runbook dev  # Done in 10 seconds
```

### Context Switching

Jump between 5 projects with different tooling:

```bash
cd project-a
runbook dev  # npm run dev

cd ../project-b
runbook dev  # python manage.py runserver

cd ../project-c
runbook dev  # go run main.go
```

All use the same command. No thinking required.

### Remote Development

SSH into server, forgot the commands:

```bash
ssh user@server
cd project
runbook  # Shows all available commands
runbook deploy  # Runs instantly
```

### Polyglot Teams

- Frontend developer: `runbook dev` → npm run dev
- Backend developer: `runbook dev` → python manage.py runserver
- DevOps engineer: `runbook dev` → docker-compose up

Same interface, different stacks.

## Comparison

| Feature | runbook | README | Makefile | package.json |
|---------|---------|---------|----------|--------------|
| **Works in subfolders** | ✅ | ❌ | ❌ | ❌ |
| **Cross-language** | ✅ | ✅ | ✅ | ❌ (Node only) |
| **No config files** | ✅ | ❌ (must read) | ❌ (need Makefile) | ❌ (need package.json) |
| **Instant recall** | ✅ | ❌ (search docs) | ❌ (search Makefile) | ❌ (open file) |
| **Team sharing** | ✅ (commit .runbook) | ⚠️ (documentation) | ⚠️ (documentation) | ⚠️ (Node projects) |
| **Learning curve** | None | N/A | Moderate | Low |

## Best Practices

### Naming Conventions

Use consistent names across projects:

```bash
# Standard names
dev      # Development server
test     # Run tests
build    # Build for production
deploy   # Deploy to production
lint     # Linting
format   # Code formatting
clean    # Clean build artifacts
```

### Command Composition

Combine multiple steps:

```bash
# Pre-deploy checklist
runbook set deploy "npm run lint && npm run test && npm run build && git push"

# Full reset
runbook set reset "git clean -fd && npm install && npm run build"

# Database setup
runbook set db-setup "dropdb myapp && createdb myapp && python manage.py migrate"
```

### Environment Variables

Include environment setup:

```bash
runbook set dev "export NODE_ENV=development && npm run dev"
runbook set prod "export NODE_ENV=production && npm start"
```

### Conditional Logic

Use shell features:

```bash
runbook set test "npm test && echo 'Tests passed!' || echo 'Tests failed!'"
```

## Troubleshooting

### Command Not Found

**Issue:** `runbook: command not found`

**Solution:**
```bash
# Reinstall globally
npm install -g runbook-cli

# Verify installation
which runbook
```

### Not in Git Repository

**Issue:** `Error: Not in a git repository`

**Solution:**
```bash
# Initialize git
git init

# Then set commands
runbook set dev "npm run dev"
```

### File Permissions

**Issue:** `.runbook` file permission errors

**Solution:**
```bash
# Fix permissions
chmod 644 .runbook
```

### Commands Not Persisting

**Issue:** Commands disappear after setting

**Solution:**
```bash
# Check file exists
ls -la .runbook

# View contents
cat .runbook

# If empty, recreate
runbook set dev "npm run dev"
```

## Advanced Usage

### Aliases

Create shell aliases for even faster access:

```bash
# In ~/.bashrc or ~/.zshrc
alias rd="runbook dev"
alias rt="runbook test"
alias rb="runbook build"
```

### Integration with Scripts

Use in shell scripts:

```bash
#!/bin/bash
# deploy.sh

echo "Running tests..."
runbook test || exit 1

echo "Building..."
runbook build || exit 1

echo "Deploying..."
git push
```

### CI/CD Integration

Use in GitHub Actions:

```yaml
# .github/workflows/test.yml
steps:
  - uses: actions/checkout@v2
  - run: npm install -g runbook-cli
  - run: runbook test
```

## Resources

- [npm Package](https://www.npmjs.com/package/runbook-cli)
- [GitHub Repository](https://github.com/brian-mwirigi/runbook-cli)
- [Issues](https://github.com/brian-mwirigi/runbook-cli/issues)

## Related Tools

- [aitoken-cli](https://www.npmjs.com/package/aitoken-cli) - Track AI API costs
- [codesession-cli](https://www.npmjs.com/package/codesession-cli) - Track coding sessions

## License

MIT

## Contributing

Contributions welcome. Please open an issue or pull request on [GitHub](https://github.com/brian-mwirigi/runbook-cli).

---

**Author:** [Brian Mwirigi](https://github.com/brian-mwirigi)  
**Website:** [brianmunene.me](https://brianmunene.me)
