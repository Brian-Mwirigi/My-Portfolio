# apisnap-cli Documentation

Record real API traffic and automatically generate tests, mocks, and documentation.

---

## Overview

**apisnap-cli** is a command-line tool that records HTTP/HTTPS API calls and generates test files, mock handlers, and API documentation from real traffic. Instead of manually writing tests based on assumptions, capture actual production behavior and turn it into automated tests.

**Problem it solves:** Manually writing integration tests and mocks is time-consuming and often inaccurate because you're guessing what the API returns. apisnap records real data.

**Key insight:** Real API traffic is the best source of truth for tests and documentation.

---

## Installation

```bash
npm install -g apisnap-cli
```

Verify installation:

```bash
apisnap --version
# 1.0.0
```

---

## Quick Start

**Record a session:**

```bash
# Start recording on default port 8080
apisnap record

# Configure your app to use proxy: http://localhost:8080
# Or set HTTP_PROXY environment variable
export HTTP_PROXY=http://localhost:8080

# Use your application normally
# All API calls are captured

# Stop recording
apisnap stop
```

**Generate outputs:**

```bash
# Generate Jest integration tests
apisnap generate tests

# Generate MSW (Mock Service Worker) handlers
apisnap generate mocks

# Generate OpenAPI 3.0 specification
apisnap generate docs
```

---

## Commands Reference

### `apisnap record [target]`

Start recording API calls through HTTP proxy.

**Options:**
- `--name <name>` - Session name for organization
- `--env <environment>` - Environment tag (dev/staging/prod)
- `--port <port>` - Proxy port (default: 8080)

**Examples:**

```bash
# Basic recording
apisnap record

# Named session with environment
apisnap record --name "checkout-flow" --env production

# Custom proxy port
apisnap record --port 9000
```

**How it works:**
1. Starts HTTP/HTTPS proxy server
2. Intercepts all requests and responses
3. Stores method, URL, headers, body, status, timing
4. Groups calls into a session

**Configure your app:**

```bash
# Environment variable (works for most HTTP clients)
export HTTP_PROXY=http://localhost:8080
export HTTPS_PROXY=http://localhost:8080

# Node.js fetch
fetch('https://api.example.com/users', {
  agent: new HttpsProxyAgent('http://localhost:8080')
})

# Axios
axios.defaults.proxy = {
  host: 'localhost',
  port: 8080
}

# System-wide (macOS/Linux)
export http_proxy=http://localhost:8080
export https_proxy=http://localhost:8080
```

---

### `apisnap stop`

Stop the active recording session.

**Example:**

```bash
apisnap stop
# ✓ Recording stopped
#   Session #1 • 47 API calls
```

Creates a session in the database with all captured API calls.

---

### `apisnap generate <type>`

Generate tests, mocks, or documentation from recorded sessions.

**Types:**
- `tests` - Generate Jest integration tests
- `mocks` - Generate MSW mock handlers
- `docs` - Generate OpenAPI 3.0 specification

**Options:**
- `-s, --session <id>` - Session ID to generate from
- `-o, --output <dir>` - Output directory (default: `./generated`)

**Examples:**

```bash
# Generate Jest tests from latest session
apisnap generate tests

# Generate from specific session
apisnap generate tests --session 3

# Custom output directory
apisnap generate mocks --output ./src/__mocks__

# Generate all three
apisnap generate tests
apisnap generate mocks
apisnap generate docs
```

**Generated Jest Tests:**

```javascript
// generated/tests/api.users.test.js
describe('GET /api/users', () => {
  it('should return 200 with user list', async () => {
    const response = await fetch('https://api.example.com/api/users');
    expect(response.status).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data[0]).toHaveProperty('id');
    expect(data[0]).toHaveProperty('name');
  });
});
```

**Generated MSW Mocks:**

```javascript
// generated/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  rest.get('https://api.example.com/api/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ])
    );
  }),
];
```

**Generated OpenAPI Docs:**

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "API Documentation",
    "version": "1.0.0"
  },
  "paths": {
    "/api/users": {
      "get": {
        "summary": "GET /api/users",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "example": [...]
              }
            }
          }
        }
      }
    }
  }
}
```

---

### `apisnap list`

List all recorded sessions.

**Options:**
- `-l, --limit <n>` - Number of sessions to show (default: 10)

**Example:**

```bash
apisnap list
# Recorded Sessions:
# 
# #3 checkout-flow
#   47 calls • production • 2/2/2026, 10:30:00 AM
# 
# #2 user-auth
#   12 calls • dev • 2/1/2026, 3:45:00 PM
# 
# #1 Unnamed
#   8 calls • dev • 2/1/2026, 2:00:00 PM
```

Session IDs are used with `--session` flag in generate commands.

---

### `apisnap replay <session>`

Replay API calls from a recorded session (for debugging).

**Example:**

```bash
apisnap replay 3
# Replaying 47 API calls...
# GET https://api.example.com/users
# POST https://api.example.com/auth/login
# GET https://api.example.com/products
# ...
```

**Use cases:**
- Debug production issues by replaying exact request sequence
- Test API changes against recorded production traffic
- Verify API responses match expectations

---

### `apisnap diff <session1> <session2>`

Compare two sessions to detect API changes.

**Example:**

```bash
apisnap diff 1 2
# 
# Added endpoints:
#   POST /api/v2/orders
#   GET /api/v2/orders/:id
# 
# Removed endpoints:
#   POST /api/orders
# 
# Changed endpoints:
#   GET /api/users
#     Response status: 200 → 201
```

**Use cases:**
- Detect breaking changes between API versions
- Compare production vs staging behavior
- Identify new or deprecated endpoints

---

## Use Cases

### 1. Integration Testing

**Without apisnap:**
```javascript
// Manually write 50 tests, guessing API responses
it('should login', async () => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ /* what fields? */ })
  });
  // What status code? What response structure?
});
```

**With apisnap:**
```bash
# Login manually, record traffic
apisnap record --name "auth-flow"
# (login through UI)
apisnap stop
apisnap generate tests

# Now you have accurate tests based on real data
```

---

### 2. Frontend Development with Mocks

**Problem:** Backend APIs aren't ready yet or unstable.

**Solution:**

```bash
# Record production API calls once
apisnap record --env production
# (use production app for 5 minutes)
apisnap stop

# Generate MSW mocks
apisnap generate mocks --output ./src/mocks

# Use mocks in development
npm run dev
# App works offline with realistic data
```

Your MSW setup:
```javascript
// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers'; // Generated by apisnap

export const worker = setupWorker(...handlers);
```

---

### 3. API Documentation

**Without apisnap:**
- Manually write OpenAPI spec (hundreds of lines)
- Keep it updated as API changes
- Forget edge cases

**With apisnap:**

```bash
# Record comprehensive API usage
apisnap record --name "full-api-coverage"
# (test all features thoroughly)
apisnap stop

# Generate OpenAPI spec
apisnap generate docs --output ./docs

# Import into Postman, Swagger UI, or Redoc
```

Always accurate because it reflects real usage.

---

### 4. Debugging Production Issues

**Scenario:** "The checkout flow broke in production yesterday."

```bash
# Replay yesterday's production traffic
apisnap replay 15

# Compare to today's staging
apisnap record --name "staging-checkout"
# (test checkout in staging)
apisnap stop

# Spot the difference
apisnap diff 15 16
# Response status changed: 200 → 400
# New required field: "shipping_address"
```

Find the breaking change instantly.

---

### 5. Detecting Breaking Changes

Before deploying new API version:

```bash
# Record current production behavior
apisnap record --name "v1-baseline" --env production
# (comprehensive test suite)
apisnap stop

# Record new version behavior
apisnap record --name "v2-candidate" --env staging
# (same test suite)
apisnap stop

# Compare
apisnap diff 10 11
# Shows exactly what changed
```

Catch breaking changes before users do.

---

## Integration with Other Tools

### With aitoken-cli

Track API costs while recording:

```bash
# Start recording
apisnap record --name "cost-analysis"

# Your app makes API calls (OpenAI, Anthropic, etc.)
# ... calls happen ...

# Stop recording
apisnap stop

# Check costs
aitoken report --today
# Shows token usage from recorded session
```

Combined workflow tracks both behavior and cost.

---

### With runbook-cli

Document API setup process:

```bash
# Create runbook for API testing workflow
runbook new api-testing

# Add recording steps
runbook add "Start recording: apisnap record --name test-session"
runbook add "Configure proxy: export HTTP_PROXY=http://localhost:8080"
runbook add "Run test suite: npm test"
runbook add "Stop recording: apisnap stop"
runbook add "Generate tests: apisnap generate tests"

# Run complete workflow
runbook run api-testing
```

Repeatable API testing process saved as runbook.

---

### With codesession-cli

Track time spent on API-related tasks:

```bash
# Start session
codesession start "api-integration"

# Record API behavior
apisnap record
# (integrate with API)
apisnap stop
apisnap generate tests

# End session
codesession end
# Shows: 2.5 hours on api-integration
```

Know exactly how long API work takes.

---

## Storage Location

**Database:** `~/.apisnap/recordings.db` (SQLite)

**Schemas:**

```sql
sessions (
  id, name, environment, started_at, ended_at,
  call_count, status
)

api_calls (
  id, session_id, method, url, path,
  request_headers, request_body,
  response_status, response_headers, response_body,
  duration, timestamp
)
```

**Privacy:** All data stored locally. Nothing sent to external servers.

---

## Troubleshooting

### "No sessions recorded yet"

**Cause:** Recording wasn't started or no traffic captured.

**Fix:**
1. Verify proxy is running: `apisnap record`
2. Configure app to use proxy
3. Make some API calls
4. Stop recording: `apisnap stop`

---

### Proxy connection refused

**Cause:** App can't reach proxy server.

**Fix:**
```bash
# Verify proxy is running
netstat -an | grep 8080  # Should show LISTEN

# Try different port
apisnap record --port 9000

# Check firewall settings
```

---

### HTTPS requests not captured

**Cause:** SSL certificate verification failing.

**Fix:**
```bash
# Disable SSL verification (development only!)
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Or use HTTP endpoints during development
```

---

### Generated tests fail

**Cause:** API behavior changed since recording.

**Fix:**
```bash
# Record fresh session
apisnap record --name "updated-baseline"
# (test thoroughly)
apisnap stop

# Regenerate tests
apisnap generate tests --session <new-id>
```

Keep recordings up-to-date with API changes.

---

## Best Practices

1. **Name your sessions:** `--name "checkout-flow"` makes them easy to find
2. **Tag environments:** `--env production` helps compare behavior
3. **Record comprehensively:** Exercise all features in one session
4. **Update regularly:** Re-record when APIs change
5. **Version control generated code:** Commit tests/mocks to see diffs
6. **Don't record sensitive data:** Avoid recording with real credentials

---

## Roadmap

- [ ] Support for GraphQL introspection
- [ ] WebSocket traffic recording
- [ ] Request filtering (exclude certain endpoints)
- [ ] Response body transformation
- [ ] Performance profiling (slow endpoints)
- [ ] Session branching (record variations)

---

## Why apisnap-cli?

**vs Postman:** Postman requires manual request creation. apisnap captures real traffic automatically.

**vs Swagger Codegen:** Codegen generates from spec. apisnap generates spec from reality.

**vs Manual Testing:** Writing tests manually takes hours and is error-prone. apisnap does it in seconds with accurate data.

**vs Other Proxies:** Charles/Fiddler are GUI tools. apisnap is CLI-first and generates code automatically.

**Key advantage:** Your tests are based on real production behavior, not assumptions.

---

**Built by:** [Brian Mwirigi](https://brianmunene.me)  
**License:** MIT  
**Source:** [github.com/brian-mwirigi/apisnap-cli](https://github.com/brian-mwirigi/apisnap-cli)
