# devmem-cli Documentation

Give AI coding assistants memory across all your projects.

---

## Overview

**devmem-cli** indexes all your code projects and makes them searchable, so AI assistants like Cursor, Claude, and GitHub Copilot can reference patterns from ANY of your projects, not just the current one.

**Problem it solves:** AI assistants can only see the current project. When you want to reuse a pattern from another project, they can't help because they don't have access.

**Key insight:** Your past projects contain valuable patterns. Make them accessible to AI in the current project.

---

## Installation

```bash
npm install -g devmem-cli
```

Verify installation:

```bash
devmem --version
# 1.0.0

# Short alias also works
dm --version
```

---

## Quick Start

**Index your projects:**

```bash
# Index a project
devmem index ~/projects/my-api

# Index more projects
devmem index ~/projects/my-frontend
devmem index ~/projects/my-mobile-app

# View what's indexed
devmem list
```

**Search across all projects:**

```bash
devmem search "authentication"
# Found 12 result(s):
# 
# 1. authenticateUser
#    my-api • src/auth/middleware.ts
#    Type: function • Relevance: 100.00
#    
#    export async function authenticateUser(req, res, next) {
#      const token = req.headers.authorization...
```

**Export context for AI:**

```bash
# Export ALL indexed code as markdown
devmem export --output context.md

# In Cursor/Claude: attach context.md
# Now AI can see patterns from all your projects
```

---

## Commands Reference

### `devmem index <path>`

Index a project or directory for searchability.

**Options:**
- `-n, --name <name>` - Custom project name
- `-r, --recursive` - Index subdirectories
- `--exclude <patterns>` - Exclude patterns (comma-separated)

**Examples:**

```bash
# Index with automatic name (uses directory name)
devmem index ~/projects/my-api

# Custom name
devmem index ~/projects/work/api --name "company-api"

# Index with exclusions
devmem index ~/projects/monorepo --exclude "node_modules,dist,build"

# Index recursively (multiple projects)
devmem index ~/projects --recursive
```

**What gets indexed:**
- Functions (JavaScript, TypeScript, Python, Go, Rust, Java)
- Classes and interfaces
- Common patterns (try/catch, async/await, map/filter)
- File paths and line numbers
- Extracted keywords for semantic search

**Example output:**

```bash
devmem index ~/projects/my-api
# Indexing...
# ✓ Indexed project
#   Files: 127
#   Functions: 284
#   Classes: 45
#   Patterns: 156
```

**Performance:** Indexes ~1000 files in <5 seconds.

---

### `devmem search <query>`

Search for code patterns across all indexed projects.

**Options:**
- `-p, --project <name>` - Limit to specific project
- `-t, --type <type>` - Filter by type (function, class, pattern)
- `-l, --limit <n>` - Number of results (default: 10)

**Examples:**

```bash
# Basic search
devmem search "jwt token"

# Limit to one project
devmem search "validation" --project my-api

# Filter by type
devmem search "user" --type class

# More results
devmem search "error handling" --limit 20
```

**Search algorithm:**
- Exact name match: 100 points
- Keyword match: 50 points
- Snippet match: 25 points
- Results sorted by relevance

**Example output:**

```bash
devmem search "authentication middleware"
# Found 8 result(s):
# 
# 1. authMiddleware
#    my-api • src/middleware/auth.ts
#    Type: function • Relevance: 100.00
#    
#    export const authMiddleware = async (req, res, next) => {
#      const token = req.headers.authorization?.split(' ')[1];
# 
# 2. AuthController
#    my-backend • controllers/AuthController.java
#    Type: class • Relevance: 75.50
#    
#    public class AuthController {
#      @PostMapping("/login")
```

---

### `devmem show <id>`

Show full code for a specific search result.

**Example:**

```bash
# After searching, show result #3
devmem show 3

# Full Code:
# 
# export async function authenticateUser(
#   req: Request,
#   res: Response,
#   next: NextFunction
# ): Promise<void> {
#   try {
#     const token = req.headers.authorization?.split(' ')[1];
#     if (!token) {
#       throw new UnauthorizedError('No token provided');
#     }
#     
#     const decoded = jwt.verify(token, process.env.JWT_SECRET);
#     req.user = decoded;
#     next();
#   } catch (error) {
#     next(new UnauthorizedError('Invalid token'));
#   }
# }
```

Copy-paste entire function/class into current project.

---

### `devmem list`

List all indexed projects.

**Example:**

```bash
devmem list
# Indexed Projects:
# 
# • my-api
#   /Users/brian/projects/my-api
#   127 files • Indexed 2/2/2026
# 
# • my-frontend
#   /Users/brian/projects/my-frontend
#   89 files • Indexed 2/1/2026
# 
# • mobile-app
#   /Users/brian/projects/mobile-app
#   203 files • Indexed 1/28/2026
```

Shows project names used in `--project` flag.

---

### `devmem update [project]`

Re-index a project or all projects (after code changes).

**Examples:**

```bash
# Update specific project
devmem update my-api
# Updating my-api...
# ✓ Project updated

# Update all indexed projects
devmem update
# Updating all projects...
# ✓ All projects updated
```

**When to update:**
- After adding new functions/classes
- After refactoring
- Weekly/monthly to keep index fresh

---

### `devmem remove <project>`

Remove a project from the index.

**Example:**

```bash
devmem remove old-project
# ✓ Project removed
```

Deletes all indexed data for that project. Doesn't delete actual files.

---

### `devmem stats`

Show indexing statistics.

**Example:**

```bash
devmem stats
# DevMem Statistics:
# 
# Projects: 5
# Files Indexed: 1,247
# Functions: 3,456
# Classes: 567
# Patterns: 2,134
# Total Lines: 87,293
```

See scope of indexed knowledge.

---

### `devmem export`

Export index as markdown for AI context attachment.

**Options:**
- `-p, --project <name>` - Export specific project only
- `-o, --output <path>` - Output file (default: `./devmem-context.md`)

**Examples:**

```bash
# Export everything
devmem export
# ✓ Context exported to devmem-context.md
#   Use this file as context for AI assistants

# Export one project
devmem export --project my-api --output api-context.md

# Custom path
devmem export --output ~/Documents/ai-context.md
```

**Generated markdown structure:**

```markdown
# DevMem Context Export

## Project: my-api

### Functions

#### authenticateUser
**File:** src/middleware/auth.ts (lines 12-28)

```typescript
export async function authenticateUser(req, res, next) {
  // ... full code ...
}
```

#### validateEmail
**File:** src/utils/validation.ts (lines 5-10)

```typescript
export function validateEmail(email: string): boolean {
  // ... full code ...
}
```

### Classes

#### UserController
**File:** src/controllers/UserController.ts (lines 8-95)

```typescript
export class UserController {
  // ... full code ...
}
```
```

**Usage with AI assistants:**

**Cursor:**
1. Generate context: `devmem export`
2. Open Cursor
3. Use "Add context" → attach `devmem-context.md`
4. Ask: "Use the JWT auth pattern from my-api"
5. Cursor can now see that project's code

**Claude Desktop:**
1. Export: `devmem export`
2. In chat, use "Attach" → select `devmem-context.md`
3. Ask: "Show me error handling patterns similar to my-backend"

**GitHub Copilot Chat:**
1. Export: `devmem export`
2. Open file in VS Code
3. Reference in comments: `// Use pattern from devmem-context.md`

---

## Use Cases

### 1. Consistent Patterns Across Projects

**Problem:** You have 5 microservices. Each should use the same auth pattern.

**Solution:**

```bash
# Index reference project
devmem index ~/services/auth-service

# In new service project
devmem search "authentication middleware"
# Copy pattern from result

# Or let AI use it
devmem export --project auth-service
# Attach to Cursor: "Use auth pattern from auth-service"
```

All services now use consistent auth.

---

### 2. AI Context for Current Project

**Scenario:** Building a new feature, want to reference old projects.

```bash
# Index all past projects
devmem index ~/projects/old-ecommerce
devmem index ~/projects/old-saas
devmem index ~/projects/old-api

# In current project
devmem export
# Attach to Cursor

# Ask Cursor: "Implement payment processing like old-ecommerce"
# Cursor sees that project's code and adapts pattern
```

AI becomes smarter because it knows your coding style.

---

### 3. Finding Forgotten Code

**Problem:** "I wrote a great error handler 6 months ago... which project?"

```bash
devmem search "error handler global"
# Found 3 result(s):
# 
# 1. globalErrorHandler
#    old-api • src/middleware/error.ts
#    
#    [Found it!]

devmem show 1
# Copy entire implementation
```

Never rewrite code you've already written.

---

### 4. Onboarding New Developers

**Problem:** New dev needs to understand company patterns.

```bash
# Create comprehensive context
devmem export --output company-patterns.md

# Give to new dev
# "Attach this to Cursor/Claude before asking questions"
```

AI teaches them company conventions instantly.

---

### 5. Code Reuse Across Languages

**Scenario:** You wrote Python API logic, now building Node.js version.

```bash
# Index Python project
devmem index ~/python-api

# In Node.js project
devmem search "user authentication"
# Shows Python implementation

devmem show 5
# See Python code

# Ask Cursor: "Convert this Python auth to TypeScript"
# (after attaching devmem export)
```

Cross-language pattern transfer.

---

## Supported Languages

**Fully supported:**
- JavaScript (`.js`)
- TypeScript (`.ts`)
- Python (`.py`)
- Go (`.go`)
- Rust (`.rs`)
- Java (`.java`)

**Function extraction:** All languages
**Class extraction:** TypeScript, Python, Java, Go
**Pattern extraction:** All languages

More languages coming: C#, PHP, Ruby, Kotlin.

---

## Integration with Other Tools

### With Cursor

```bash
# Index all projects
devmem index ~/projects/* --recursive

# Export for Cursor
devmem export --output cursor-context.md

# In Cursor:
# 1. Cmd+L (chat)
# 2. Attach cursor-context.md
# 3. Ask about any project
```

Cursor now has cross-project knowledge.

---

### With Claude Desktop

```bash
# Export context
devmem export

# In Claude:
# 1. Start conversation
# 2. Click "Attach files"
# 3. Select devmem-context.md
# 4. Ask: "What auth patterns do I typically use?"
```

Claude sees your entire codebase history.

---

### With aitoken-cli

Track cost of AI queries using indexed context:

```bash
# Export large context
devmem export  # 50KB markdown

# Attach to Claude
# Each message includes 50KB context

# Check token costs
aitoken report --today
# Shows: ~15K tokens per message (context overhead)
```

Understand cost of providing context to AI.

---

### With runbook-cli

Automate project indexing:

```bash
# Create indexing runbook
runbook new index-all

runbook add "cd ~/projects/api && devmem index ."
runbook add "cd ~/projects/frontend && devmem index ."
runbook add "cd ~/projects/mobile && devmem index ."
runbook add "devmem export --output ~/ai-context.md"

# Run weekly
runbook run index-all
```

Keep index always up-to-date.

---

### With codesession-cli

Track time spent on cross-project work:

```bash
# Start session
codesession start "refactoring-auth"

# Search and adapt patterns
devmem search "authentication"
devmem show 3
# (refactor current project)

# End session
codesession end
# Shows: 1.5 hours on refactoring-auth
```

Measure productivity with pattern reuse.

---

## Storage Location

**Database:** `~/.devmem/index.db` (SQLite)

**Schemas:**

```sql
projects (
  id, name, path, file_count, indexed_at
)

code_entries (
  id, project_id, file_path, name, type,
  code, snippet, line_start, line_end, keywords
)
```

**Size:** ~1MB per 1000 files indexed.

**Privacy:** All data stored locally. Nothing sent to external servers.

---

## Troubleshooting

### "No projects indexed yet"

**Cause:** Haven't indexed any projects.

**Fix:**
```bash
devmem index ~/projects/my-project
```

---

### Search returns no results

**Cause:** Query doesn't match any code.

**Fix:**
1. Try broader search: `devmem search "user"`
2. Check what's indexed: `devmem list`
3. Try different keywords: `devmem search "function name"`

---

### Project not found when updating

**Cause:** Project name doesn't match.

**Fix:**
```bash
# Check exact name
devmem list
# Use exact name shown

devmem update "my-api"  # Use correct name
```

---

### Export file too large for AI

**Cause:** Too many projects indexed (>100MB markdown).

**Fix:**
```bash
# Export only relevant project
devmem export --project my-api --output api-only.md

# Or remove old projects
devmem remove old-unused-project
```

**AI context limits:**
- Claude: ~200KB recommended
- Cursor: ~500KB recommended
- GPT-4: ~100KB recommended

---

## Best Practices

1. **Index regularly:** Run `devmem update` weekly
2. **Use descriptive names:** `--name "company-auth-api"` better than default
3. **Export per-project:** Don't overwhelm AI with all projects at once
4. **Remove stale projects:** `devmem remove` old projects you don't use
5. **Search before coding:** Check if pattern already exists
6. **Update after major changes:** Re-index after refactoring

---

## Roadmap

- [ ] Semantic search (embeddings-based)
- [ ] Dependency graph visualization
- [ ] Pattern similarity scoring
- [ ] Project relationship mapping
- [ ] Auto-update on file changes (watch mode)
- [ ] Cloud sync for teams (optional)

---

## Why devmem-cli?

**vs GitHub search:** GitHub searches repos individually. devmem searches all your code at once.

**vs grep:** grep finds text. devmem understands code structure (functions, classes).

**vs IDE search:** IDE searches current project. devmem searches ALL projects.

**vs Cursor's @codebase:** Cursor sees one project. devmem gives it multiple projects.

**Key advantage:** Your AI assistant becomes exponentially smarter because it learns from all your past work.

---

**Built by:** [Brian Mwirigi](https://brianmunene.me)  
**License:** MIT  
**Source:** [github.com/brian-mwirigi/devmem-cli](https://github.com/brian-mwirigi/devmem-cli)
