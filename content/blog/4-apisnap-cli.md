---
title: "I Built a CLI That Records Your API Calls and Generates Tests Automatically"
date: 2026-02-02
readTime: 10 min read
category: BUILD
image: https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop
tags:
  - CLI
  - Testing
  - API
  - TypeScript
  - DevTools
excerpt: "Record real API traffic and generate Jest tests, MSW mocks, and OpenAPI docs automatically. No more guessing what APIs actually return."
---

**TL;DR:** I shipped [apisnap-cli](https://www.npmjs.com/package/apisnap-cli) - record real API traffic, generate Jest tests, MSW mocks, and OpenAPI docs automatically. No more manually writing integration tests.

---

## The Problem

You just integrated a payment API. It has 15 endpoints. Now you need to:

1. Write integration tests for all 15 endpoints
2. Create mock handlers for local development
3. Document the API for your team
4. Debug production issues when things break

**This takes 6+ hours of manual work.**

And worst part? You're **guessing** what the API returns. You write tests based on documentation, not reality.

```javascript
// You write this based on API docs
it('should return user data', async () => {
  const response = await fetch('/api/user/123');
  expect(response.status).toBe(200);
  
  const data = await response.json();
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('name');
  // But what does the API ACTUALLY return?
  // Does it include 'email'? 'avatar'? 'preferences'?
});
```

## The Solution

**Record real API traffic. Generate tests from reality.**

```bash
# Start recording
apisnap record

# Use your app normally (login, checkout, etc.)
# All API calls captured automatically

# Stop recording
apisnap stop

# Generate everything
apisnap generate tests    # 47 Jest tests created
apisnap generate mocks    # MSW handlers ready
apisnap generate docs     # OpenAPI spec exported
```

**2 minutes. Done.**

---

## How It Works

### 1. HTTP Proxy Interception

apisnap runs an HTTP/HTTPS proxy server that captures all traffic:

```bash
apisnap record --port 8080
```

Configure your app to use the proxy:

```bash
export HTTP_PROXY=http://localhost:8080
export HTTPS_PROXY=http://localhost:8080
```

Every request and response flows through the proxy and gets stored in SQLite.

### 2. Intelligent Code Generation

When you run `apisnap generate tests`, it analyzes captured data:

```javascript
// Generated from REAL API response
describe('POST /api/orders', () => {
  it('should create order and return 201', async () => {
    const response = await fetch('https://api.example.com/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 123,
        items: [{ productId: 456, quantity: 2 }],
        shippingAddress: { /* ... */ }
      })
    });
    
    expect(response.status).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('orderId');
    expect(data).toHaveProperty('total');
    expect(data).toHaveProperty('estimatedDelivery');
    // All fields that API ACTUALLY returns
  });
});
```

**Based on real data, not assumptions.**

### 3. MSW Mock Generation

Frontend developers need stable mocks:

```javascript
// Generated MSW handlers
import { rest } from 'msw';

export const handlers = [
  rest.post('https://api.example.com/api/orders', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        orderId: 'ord_123abc',
        total: 99.99,
        estimatedDelivery: '2026-02-05',
        trackingNumber: 'TRK789XYZ'
      })
    );
  }),
];
```

Real response structure, realistic data.

---

## Real-World Use Cases

### Use Case 1: Integration Testing

**Before apisnap:**
- 6 hours writing tests manually
- Tests based on guesswork
- Break when API changes

**After apisnap:**
- 5 minutes recording + generating
- Tests based on production data
- Re-record to update tests

```bash
# Initial setup
apisnap record --name "baseline-tests"
# (use app comprehensively)
apisnap stop
apisnap generate tests

# API changed? Just re-record
apisnap record --name "updated-tests"
apisnap stop
apisnap generate tests --session 2
```

### Use Case 2: Frontend Development

**Problem:** Backend APIs unstable or not ready.

**Solution:** Record production API once, use mocks forever.

```bash
# Record production traffic (5 minutes)
apisnap record --env production
# (test all features)
apisnap stop

# Generate mocks
apisnap generate mocks --output ./src/mocks

# Setup MSW
# src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers'; // Generated!

export const worker = setupWorker(...handlers);

# Development now works offline
npm run dev
```

No more "waiting for backend team."

### Use Case 3: Debugging Production Issues

**Scenario:** "Checkout broke yesterday in production."

```bash
# Replay yesterday's traffic
apisnap replay 15
# See exact sequence of API calls

# Record current staging
apisnap record --name "staging-debug"
# (reproduce issue)
apisnap stop

# Find the difference
apisnap diff 15 16
# 
# Changed endpoints:
#   POST /api/checkout
#     Response status: 200 → 400
#     New error: "Invalid shipping_address format"
```

**Found the breaking change in 30 seconds.**

---

## Technical Details

### Storage

Everything stored locally in SQLite:

```
~/.apisnap/recordings.db

sessions (id, name, environment, started_at, ended_at, call_count)
api_calls (id, session_id, method, url, headers, body, status, duration)
```

**Privacy:** No data sent anywhere. Runs completely offline.

### Proxy Implementation

Built with Node.js `http-proxy`:

```typescript
import httpProxy from 'http-proxy';
import http from 'http';

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  // Capture request
  const requestData = captureRequest(req);
  
  // Forward to target
  proxy.web(req, res, { target: req.url }, (error) => {
    if (error) handleError(error);
  });
  
  // Capture response
  const originalWrite = res.write;
  res.write = function(chunk) {
    captureResponse(chunk);
    return originalWrite.apply(res, arguments);
  };
});
```

Transparent interception, minimal overhead.

---

## Integration with My Other Tools

I built apisnap as part of a CLI tool ecosystem:

### With aitoken-cli

Track API costs while recording:

```bash
apisnap record --name "cost-analysis"
# (make OpenAI/Anthropic API calls)
apisnap stop

aitoken report --today
# Shows token usage and costs from session
```

### With runbook-cli

Automate testing workflows:

```bash
runbook new api-testing

runbook add "apisnap record --name test-session"
runbook add "npm test"
runbook add "apisnap stop"
runbook add "apisnap generate tests"

runbook run api-testing
# Complete workflow automated
```

### With codesession-cli

Track time on API work:

```bash
codesession start "api-integration"

apisnap record
# (integrate with API)
apisnap stop
apisnap generate tests

codesession end
# Shows: 1.2 hours on api-integration
```

---

## Why I Built This

I was writing integration tests for a project with 50+ API endpoints.

Hour 3: Still manually writing test cases.

**Thought:** "I'm literally using the API right now. Why can't the computer watch me and write the tests?"

**Built apisnap in 2 days.**

Now testing takes 5 minutes instead of 6 hours.

---

## Installation

```bash
npm install -g apisnap-cli

apisnap --version
# 1.0.0
```

**Repository:** [github.com/brian-mwirigi/apisnap-cli](https://github.com/brian-mwirigi/apisnap-cli)

**Docs:** [Full documentation](https://brianmunene.me/docs/apisnap-cli)

---

## Roadmap

Planning to add:

- GraphQL introspection
- WebSocket recording
- Request filtering (exclude sensitive endpoints)
- Performance profiling (identify slow APIs)
- Response transformation rules
- CI/CD integration

---

## Try It

```bash
npm install -g apisnap-cli

# Record your API usage
apisnap record
# (use your app)
apisnap stop

# Generate tests
apisnap generate tests

# Check the generated tests
ls generated/tests/
```

**Stop guessing. Start recording.**

---

**Links:**
- [npm package](https://www.npmjs.com/package/apisnap-cli)
- [GitHub](https://github.com/brian-mwirigi/apisnap-cli)
- [Documentation](https://brianmunene.me/docs/apisnap-cli)
- [My other CLI tools](https://brianmunene.me)

Built by [Brian Mwirigi](https://brianmunene.me) • [Twitter/X](https://x.com/brianmwirigi_)
