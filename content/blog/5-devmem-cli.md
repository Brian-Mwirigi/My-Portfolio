---
title: "I Built a CLI That Gives AI Assistants Memory Across All Your Projects"
date: 2026-02-02
readTime: 11 min read
category: BUILD
image: https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop
tags:
  - CLI
  - AI
  - Productivity
  - TypeScript
  - DevTools
excerpt: "Index all your code projects and give AI assistants like Cursor memory across ALL your code. Stop rewriting the same patterns."
---

**TL;DR:** I shipped [devmem-cli](https://www.npmjs.com/package/devmem-cli) - index all your code projects, search them instantly, and give AI assistants like Cursor/Claude access to patterns from ALL your code, not just the current project.

---

## The Problem

You have 10 projects. Each uses similar patterns.

**You to Cursor:** _"Use the JWT authentication from my-api project"_

**Cursor:** _"I don't have access to that project."_

AI assistants are **amnesiac**. They forget everything outside the current project folder.

You **know** you wrote great error handling in that old project. But you can't remember which project. And even if you could, Cursor can't see it.

**Result:** You rewrite the same patterns over and over.

---

## The Solution

**Index all projects. Let AI search them.**

```bash
# Index your projects once
devmem index ~/projects/my-api
devmem index ~/projects/my-frontend
devmem index ~/projects/my-backend

# Now search across ALL projects
devmem search "authentication middleware"
# Found 8 result(s):
# 
# 1. authMiddleware
#    my-api • src/middleware/auth.ts
#    Type: function • Relevance: 100.00
#    
#    export const authMiddleware = async (req, res, next) => {
#      const token = req.headers.authorization?.split(' ')[1];
#      ...

# Export everything as context for AI
devmem export --output context.md

# Attach to Cursor/Claude
# Now ask: "Use the auth pattern from my-api"
# AI can see that project!
```

**Your AI assistant just got 10x smarter.**

---

## How It Works

### 1. Intelligent Code Indexing

devmem scans your projects and extracts:

- **Functions:** All function definitions with signatures
- **Classes:** Class definitions and methods
- **Patterns:** Common code patterns (try/catch, async/await)
- **Keywords:** Semantic keywords for better search

```bash
devmem index ~/projects/my-api
# Indexing...
# ✓ Indexed project
#   Files: 127
#   Functions: 284
#   Classes: 45
#   Patterns: 156
```

**Speed:** ~1000 files in 5 seconds.

**Supported languages:**
- JavaScript/TypeScript
- Python
- Go
- Rust
- Java

### 2. Semantic Search

Search isn't just grep. It understands code structure:

```bash
devmem search "error handling"
```

**Ranking algorithm:**
- Exact name match: 100 points
- Keyword match: 50 points
- Code snippet match: 25 points

Results sorted by relevance:

```bash
# Found 12 result(s):
# 
# 1. globalErrorHandler (100.00)
#    my-api • middleware/error.ts
#    
# 2. handleDatabaseError (75.50)
#    my-backend • utils/errors.ts
#    
# 3. ErrorBoundary (72.25)
#    my-frontend • components/ErrorBoundary.tsx
```

### 3. AI Context Export

The killer feature: **export everything as markdown** for AI assistants.

```bash
devmem export --output context.md
# ✓ Context exported to context.md
#   Use this file as context for AI assistants
```

Generated markdown:

```markdown
# DevMem Context Export

## Project: my-api

### Functions

#### authenticateUser
**File:** src/middleware/auth.ts (lines 12-28)

```typescript
export async function authenticateUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedError('No token');
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token'));
  }
}
```
```

**Usage in Cursor:**

1. Generate context: `devmem export`
2. Open Cursor, press Cmd+L
3. Click "Add context" → attach `context.md`
4. Ask: _"Use the JWT auth pattern from my-api"_
5. **Cursor can now see that code!**

---

## Real-World Use Cases

### Use Case 1: Consistent Patterns Across Microservices

**Problem:** You have 5 microservices. Each should use the same auth pattern.

**Before devmem:**
- Dig through old projects
- Copy-paste code manually
- Hope you got the right version

**With devmem:**

```bash
# Index reference service
devmem index ~/services/auth-service

# In new service
devmem search "authentication"
devmem show 1  # Show full code
# Copy-paste

# OR let AI do it
devmem export --project auth-service
# Attach to Cursor: "Implement auth like auth-service"
```

**All services now use consistent auth pattern.**

### Use Case 2: Finding Forgotten Code

**Scenario:** "I wrote a great rate limiter 6 months ago... which project was it?"

**Before devmem:**
- Check 10 projects manually
- Grep each project
- Give up, rewrite it

**With devmem:**

```bash
devmem search "rate limit"
# Found 3 result(s):
# 
# 1. rateLimiter
#    old-api • middleware/rateLimit.ts
#    
#    [Found it in 2 seconds]

devmem show 1
# Copy entire implementation
```

**Never rewrite code you've already written.**

### Use Case 3: Onboarding New Developers

**Problem:** New dev needs to learn company coding conventions.

**Solution:**

```bash
# Export company patterns
devmem export --output company-patterns.md

# Give to new dev:
# "Attach this to Cursor before asking questions.
#  It contains all our standard patterns."
```

**AI teaches them your conventions instantly.**

### Use Case 4: Cross-Language Pattern Transfer

**Scenario:** You wrote a Python API, now building Node.js version.

```bash
# Index Python project
devmem index ~/python-api

# In Node.js project
devmem search "user authentication"
# Shows Python implementation

devmem show 3
# See Python code

# Ask Cursor: "Convert this Python auth to TypeScript"
# (after attaching devmem export)
```

**Reuse patterns across language barriers.**

---

## Technical Details

### Storage

Everything stored locally in SQLite:

```
~/.devmem/index.db

projects (id, name, path, file_count, indexed_at)
code_entries (id, project_id, file_path, name, type, code, keywords)
```

**Size:** ~1MB per 1000 files.

**Privacy:** All data local. Nothing sent to external servers.

### Indexing Algorithm

```typescript
// Simplified version
async function indexProject(path: string) {
  const files = await scanFiles(path, [
    '**/*.ts', '**/*.js', '**/*.py',
    '**/*.go', '**/*.rs', '**/*.java'
  ]);
  
  for (const file of files) {
    const content = await readFile(file);
    
    // Extract functions
    const functions = extractFunctions(content);
    
    // Extract classes
    const classes = extractClasses(content);
    
    // Extract keywords
    const keywords = extractKeywords(content);
    
    // Store in database
    await db.insertCodeEntry({
      projectId,
      filePath: file,
      name: func.name,
      type: 'function',
      code: func.code,
      keywords: keywords.join(',')
    });
  }
}
```

Uses regex + AST parsing for accurate extraction.

---

## Integration with My Other Tools

devmem is part of my CLI tool ecosystem:

### With aitoken-cli

Track cost of using large context:

```bash
devmem export  # 50KB context

# Attach to Claude
# Each message costs ~15K tokens (context overhead)

aitoken report --today
# Shows: Context costs $0.15 per message
```

Know the cost of giving AI more context.

### With runbook-cli

Automate indexing:

```bash
runbook new weekly-index

runbook add "devmem update"
runbook add "devmem export --output ~/ai-context.md"

# Run weekly via cron
0 0 * * 0 runbook run weekly-index
```

Keep index always fresh.

### With codesession-cli

Track time on cross-project work:

```bash
codesession start "refactoring-auth"

devmem search "authentication"
devmem show 3
# (refactor code)

codesession end
# Shows: 1.5 hours saved by reusing pattern
```

---

## Why I Built This

I was building a new project. Needed JWT auth. **I knew** I'd written it perfectly in 3 previous projects.

**Problem:** Which project? What was the exact implementation?

Spent 30 minutes searching. Finally rewrote it.

**Thought:** "My computer knows where this code is. Why am I manually searching?"

**Built devmem in 3 days.**

Now I find any pattern in 10 seconds.

---

## The Magic of AI + devmem

Here's what changed for me:

**Before devmem:**

_Me to Cursor:_ "Add JWT authentication"

_Cursor:_ "Sure, here's a basic implementation..."

_Me:_ "No, use MY auth pattern with refresh tokens"

_Cursor:_ "I don't have access to your other projects."

_Me:_ *manually searches old code*

**After devmem:**

_Me:_ `devmem export`

_Me to Cursor (with context.md attached):_ "Add JWT authentication like my-api project"

_Cursor:_ "I see your my-api auth implementation with JWT + refresh tokens. Here's the adapted version for this project..."

**Perfect. First try.**

---

## Installation

```bash
npm install -g devmem-cli

devmem --version
# 1.0.0
```

**Repository:** [github.com/brian-mwirigi/devmem-cli](https://github.com/brian-mwirigi/devmem-cli)

**Docs:** [Full documentation](https://brianmunene.me/docs/devmem-cli)

---

## Try It Now

```bash
npm install -g devmem-cli

# Index your projects
devmem index ~/projects/my-api
devmem index ~/projects/my-frontend

# Search across all projects
devmem search "authentication"

# Export for AI
devmem export

# Attach context.md to Cursor/Claude
# Ask AI to use patterns from your projects
```

**Your AI assistant just learned from ALL your code.**

---

## Roadmap

Planning to add:

- Semantic search with embeddings (vector similarity)
- Dependency graph visualization
- Pattern similarity scoring ("Show me auth implementations")
- Project relationship mapping
- Auto-update on file changes (watch mode)
- Optional cloud sync for teams

---

## The Vision

**AI assistants are powerful but amnesiac.**

devmem gives them memory.

Not just "remember this conversation." Real memory: **your entire coding history.**

Imagine:
- AI knows every pattern you've ever written
- AI suggests YOUR solutions, not generic ones
- AI maintains YOUR coding style across all projects

**That's what devmem enables.**

---

**Links:**
- [npm package](https://www.npmjs.com/package/devmem-cli)
- [GitHub](https://github.com/brian-mwirigi/devmem-cli)
- [Documentation](https://brianmunene.me/docs/devmem-cli)
- [My other CLI tools](https://brianmunene.me)

Built by [Brian Mwirigi](https://brianmunene.me) • [Twitter/X](https://x.com/brianmwirigi_)
