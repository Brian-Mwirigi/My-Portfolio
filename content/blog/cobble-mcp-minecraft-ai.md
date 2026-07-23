---
title: "I Built COBBLE — So Any AI Agent Can Play Minecraft With You"
date: 2026-07-23
readTime: 7 min read
category: BUILD
image: https://images.unsplash.com/photo-1587574293340-e0011c4e8fcc?w=1200&auto=format&fit=crop
tags:
  - Minecraft
  - MCP
  - Mineflayer
  - AI Agents
  - Claude
  - Open Source
  - COBBLE
  - cobble-mcp
excerpt: "RCON is boring. Clips of an AI placing blocks spread. Here's how cobble-mcp drops a real Mineflayer bot into your world."
---

**The pitch:** Your AI shouldn't manage Minecraft from a terminal. It should **join the world**.

**The product:** [COBBLE](https://brianmunene.me/cobble-mcp) (`cobble-mcp` on npm) — a Model Context Protocol server that connects any MCP agent to Minecraft through [Mineflayer](https://github.com/PrismarineJS/mineflayer).

**The vibe:** Same chunk. Your call. Its hands.

## Why Minecraft + AI needed a different approach

Most "AI Minecraft" tools are:

- RCON wrappers that fire `/setblock` from outside the world
- Mods that require client installs
- One-off scripts that forget the cabin you just built

COBBLE takes the co-op path: the agent is a **player bot**. It chats in-game, pathfinds (or setblocks in creative), and invents builds with you watching.

That matters because **clips spread**. Admin panels don't.

## What COBBLE does

| Capability | How |
| --- | --- |
| Join your Java server | Mineflayer bot (`MC_USERNAME`, offline auth supported) |
| Stay smart | Agent brain loop via `mc_play` — your MCP client is the mind |
| Invent builds | `mc_design` ASCII floorplans → place blocks in-world |
| Chat co-op | Talk in Minecraft: `come`, `kill`, `stop`, build requests |
| Background jobs | Long builds don't freeze the agent tool call |

Works with **any MCP client** — Claude Desktop, Cursor, Windsurf, and friends. Not locked to one IDE.

## Install in ~10 minutes

1. Run a Minecraft **Java** world (Creative is easiest). Set `online-mode=false`.
2. Add this to your MCP config:

```json
{
  "mcpServers": {
    "cobble": {
      "command": "npx",
      "args": ["-y", "cobble-mcp"],
      "env": {
        "MC_HOST": "localhost",
        "MC_PORT": "25565",
        "MC_USERNAME": "Claude",
        "MC_AUTH": "offline",
        "MC_FAST": "1",
        "MC_BRAIN": "agent"
      }
    }
  }
}
```

3. Tell your agent: **play with me**.
4. In Minecraft chat: `build me a witch hut by the river`.

Full walkthrough: [brianmunene.me/cobble-mcp](https://brianmunene.me/cobble-mcp) · npm: [cobble-mcp](https://www.npmjs.com/package/cobble-mcp) · GitHub: [brian-mwirigi/cobble-mcp](https://github.com/brian-mwirigi/cobble-mcp)

## The hard parts (why this wasn't a weekend toy)

- **Pathfind hangs** mid-build on farmland → creative fast path with timed `/setblock`
- **Cookie-cutter houses** → demote stamp blueprints; prefer agent-invented `mc_design`
- **Blocking tool calls** → background build jobs + `mc_build_status`
- **Chat locked by pathfinding** → reactive reflexes (`come` / `kill` / `stop`) stay snappy

## Film this (yes, that's the growth loop)

1. Agent joins → builds a cabin from a prompt  
2. You type `kill that creeper` in chat  
3. Same prompt twice → two different designs  

Post with **#cobble**. Kids get it. Devs get the MCP hook.

## Contribute without writing TypeScript

Easiest PR: drop a JSON house into [`examples/designs`](https://github.com/brian-mwirigi/cobble-mcp/tree/main/examples/designs). See [CONTRIBUTING.md](https://github.com/brian-mwirigi/cobble-mcp/blob/main/CONTRIBUTING.md).

## Links

- Product page: [https://brianmunene.me/cobble-mcp](https://brianmunene.me/cobble-mcp)  
- Short URL: [https://brianmunene.me/cobble](https://brianmunene.me/cobble)  
- npm: `npx -y cobble-mcp`  
- GitHub: [brian-mwirigi/cobble-mcp](https://github.com/brian-mwirigi/cobble-mcp)

Not affiliated with Mojang or Microsoft. Built because Minecraft for your AI should feel like co-op — not a control panel.
