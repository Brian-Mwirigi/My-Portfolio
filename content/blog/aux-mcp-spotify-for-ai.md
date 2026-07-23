---
title: "I Built AUX — Spotify, for Your AI"
date: 2026-07-23
readTime: 6 min read
category: BUILD
image: https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=1200&auto=format&fit=crop
tags:
  - Spotify
  - MCP
  - AI Agents
  - Claude
  - Cursor
  - Open Source
  - AUX
  - spotify-aux
  - aux-mcp
excerpt: "Not a remote. A DJ that talks back. Here's how AUX turns any MCP agent into a vibe-first Spotify DJ with roast cards, party rooms, and auto-DJ."
---

**The pitch:** Your AI shouldn't just pause Spotify. It should **pass the aux**.

**The product:** [AUX](https://brianmunene.me/aux-mcp) (`spotify-aux` on npm) — a Model Context Protocol server that gives Cursor, Claude, and any MCP client full Spotify power plus peak DJ hooks.

**The vibe:** Say a mood. Get a queue. Drop a card worth posting.

## Why Spotify + AI needed a DJ, not a remote

Most “AI Spotify” integrations are thin API wrappers:

- play / pause / skip
- search by literal string
- zero personality

That’s a remote control. AUX is a **booth**.

When you say *“rainy 2am drive”*, the agent invents search queries and energy/valence/tempo targets. AUX ranks the catalog, skips repeats, can dodge algorithm bait, and returns an ASCII **VIBE** card made for screenshots.

## Peak hooks

| Say this | What happens |
|----------|----------------|
| *rainy 2am drive* | `vibe` — LLM invents searches, catalog DJ |
| *music Spotify won’t show me* | `anti_algorithm` discovery |
| *DJ for right now* | `context_vibe` — time + weather |
| *roast my top tracks* | `roast_my_playlist` + share card |
| *keep it going* | `auto_dj` refill loop |
| *party room* | friend sync via `party-host` |

Every hook can drop a card: vibe, roast, DNA, battle, weekly report.

## 60-second setup

1. Create a [Spotify Developer](https://developer.spotify.com/dashboard) app  
2. Redirect URI (exact): `http://127.0.0.1:7654/callback`  
3. Add to Cursor MCP:

```json
{
  "mcpServers": {
    "aux": {
      "command": "npx",
      "args": ["-y", "spotify-aux"],
      "env": {
        "SPOTIFY_CLIENT_ID": "your_id",
        "SPOTIFY_CLIENT_SECRET": "your_secret"
      }
    }
  }
}
```

4. Login:

```bash
npx -y spotify-aux login
```

Then in chat: *“rainy 2am drive”* · *“roast my top tracks”* · *“start auto DJ”*

No Cursor? Try the roast site:

```bash
npx -y spotify-aux web
```

## Links

- Product page: [https://brianmunene.me/aux-mcp](https://brianmunene.me/aux-mcp)  
- Short URL: [https://brianmunene.me/aux](https://brianmunene.me/aux)  
- npm: `npx -y spotify-aux`  
- GitHub: [brian-mwirigi/aux-mcp](https://github.com/brian-mwirigi/aux-mcp)

Star it. Pass the aux.
