export const BASE = 'https://brianmunene.me'
export const PAGE = `${BASE}/aux-mcp`
export const SHORT = `${BASE}/aux`
export const NPM = 'https://www.npmjs.com/package/spotify-aux'
export const GH = 'https://github.com/brian-mwirigi/aux-mcp'
export const OG = `${PAGE}/opengraph-image`

export const TITLE =
  'AUX — Spotify MCP for AI Agents | Vibe DJ, Roast Cards & Auto-DJ'
export const SHORT_TITLE = 'AUX — Spotify, for your AI'
export const DESC =
  'AUX (spotify-aux) is a full Spotify MCP server for Cursor, Claude, and any Model Context Protocol client. Vibe DJ, anti-algorithm discovery, playlist roast cards, party rooms, context vibe, and auto-DJ. Free open-source npm package — Spotify for your AI.'

export const KEYWORDS = [
  'AUX',
  'aux-mcp',
  'aux mcp',
  'spotify-aux',
  'spotify aux',
  'Spotify MCP',
  'Spotify MCP server',
  'Spotify for your AI',
  'AI DJ',
  'AI Spotify',
  'Cursor Spotify',
  'Claude Spotify',
  'Claude Desktop Spotify',
  'Model Context Protocol Spotify',
  'MCP Spotify server',
  'Spotify AI agent',
  'vibe DJ MCP',
  'playlist roast',
  'roast my playlist AI',
  'anti algorithm Spotify',
  'Spotify auto DJ',
  'AI party room Spotify',
  'context vibe Spotify',
  'playlist DNA AI',
  'Spotify Web API MCP',
  'npx spotify-aux',
  'open source Spotify MCP',
  'Windsurf Spotify',
  'ChatGPT Spotify MCP',
  'AI music curator',
  'agent Spotify playback',
  'Spotify PKCE MCP',
  'Brian Munene',
  'Brian Munene Mwirigi',
  'brian-mwirigi',
]

export const faqs = [
  {
    q: 'What is AUX (spotify-aux / aux-mcp)?',
    a: 'AUX is an open-source Model Context Protocol (MCP) server that gives AI agents full Spotify control plus peak DJ hooks — vibe queues, roast cards, party rooms, context vibe, and auto-DJ. Install with npx -y spotify-aux.',
  },
  {
    q: 'How is AUX different from a normal Spotify remote or API wrapper?',
    a: 'Most Spotify tools just expose play/pause/search. AUX treats your agent as the vibe model: it invents search queries, ranks the catalog, remembers taste, dodges algorithm bait, and drops ASCII share cards made for screenshots.',
  },
  {
    q: 'Which AI clients work with AUX?',
    a: 'Any MCP-compatible client: Cursor, Claude Desktop, Windsurf, and other agents that support Model Context Protocol. Add the spotify-aux MCP server to your client config and log in with Spotify.',
  },
  {
    q: 'Is Spotify Premium required?',
    a: 'Browsing, search, and many read tools work with a free account via client credentials or user login. Active playback control (play, queue, auto-DJ) needs Spotify Premium and an active device.',
  },
  {
    q: 'How do I install AUX for Cursor or Claude?',
    a: 'Create a Spotify Developer app, set redirect URI to http://127.0.0.1:7654/callback, add spotify-aux to your MCP config with SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET, then run npx -y spotify-aux login.',
  },
  {
    q: 'What is the vibe tool?',
    a: 'vibe is AUX’s flagship open-world DJ. You say a mood like “rainy 2am drive”; the LLM invents search queries plus energy/valence/tempo targets; AUX searches and ranks Spotify’s catalog and can queue tracks.',
  },
  {
    q: 'Can AUX roast my playlist?',
    a: 'Yes. Use roast_my_playlist in chat, or run npx -y spotify-aux web for a browser roast site that grades a playlist and generates a shareable ASCII roast card — no Cursor required.',
  },
  {
    q: 'Is spotify-aux free and open source?',
    a: 'Yes. AUX is MIT-licensed, free on npm as spotify-aux, and open source on GitHub at brian-mwirigi/aux-mcp.',
  },
]
