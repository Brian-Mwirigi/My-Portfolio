export const BASE = 'https://brianmunene.me'
export const PAGE = `${BASE}/cobble-mcp`
export const SHORT = `${BASE}/cobble`
export const NPM = 'https://www.npmjs.com/package/cobble-mcp'
export const GH = 'https://github.com/brian-mwirigi/cobble-mcp'
export const OG = `${PAGE}/opengraph-image`

export const TITLE =
  'COBBLE — Minecraft MCP for AI Agents | Mineflayer Co-op Bot'
export const SHORT_TITLE = 'COBBLE — Minecraft for your AI'
export const DESC =
  'COBBLE (cobble-mcp) lets any AI agent join your Minecraft world as a Mineflayer bot. Chat in-game, invent builds with mc_design, fight mobs, and co-op with Claude, Cursor, Windsurf, or any MCP client. Free open-source npm package.'

export const KEYWORDS = [
  'COBBLE',
  'cobble-mcp',
  'cobble mcp',
  'Minecraft MCP',
  'Minecraft AI',
  'AI Minecraft bot',
  'Mineflayer',
  'Mineflayer MCP',
  'Claude Minecraft',
  'Claude Desktop Minecraft',
  'AI co-op Minecraft',
  'Model Context Protocol Minecraft',
  'MCP Minecraft server',
  'Minecraft AI agent',
  'AI builds Minecraft',
  'mc_design',
  'mc_play',
  'Minecraft bot npm',
  'open source Minecraft AI',
  'AI agent Minecraft Java',
  'Cursor Minecraft',
  'Windsurf Minecraft',
  'ChatGPT Minecraft bot',
  'Minecraft co-op AI',
  'directed building AI',
  'Minecraft for your AI',
  'Brian Munene',
  'Brian Munene Mwirigi',
]

export const faqs = [
  {
    q: 'What is COBBLE (cobble-mcp)?',
    a: 'COBBLE is an open-source Model Context Protocol (MCP) server that connects AI agents to Minecraft via Mineflayer. Your agent joins the world as a real bot — chatting, building, and fighting beside you.',
  },
  {
    q: 'How is COBBLE different from RCON Minecraft tools?',
    a: 'RCON and admin panels send commands from outside the world. COBBLE spawns a Mineflayer player bot inside your Java server, so the AI shares the same chunk, chat, and blocks as you.',
  },
  {
    q: 'Which AI agents work with COBBLE?',
    a: 'Any MCP-compatible client: Claude Desktop, Cursor, Windsurf, and other agents that support Model Context Protocol. Install with npx -y cobble-mcp and paste the MCP config.',
  },
  {
    q: 'Can the AI invent unique Minecraft builds?',
    a: 'Yes. With mc_design the agent drafts ASCII floorplans and materials, then places blocks in-world. Builds are invented per prompt — not a stamped cookie-cutter cabin.',
  },
  {
    q: 'Is cobble-mcp free?',
    a: 'Yes. COBBLE is MIT-licensed, free on npm as cobble-mcp, and open source on GitHub at brian-mwirigi/cobble-mcp.',
  },
  {
    q: 'How do I install COBBLE for Minecraft?',
    a: 'Run a Java Minecraft server with online-mode=false, then add cobble-mcp to your MCP client with MC_HOST, MC_PORT, MC_USERNAME, and MC_BRAIN=agent. Tell your agent “play with me” and chat in-game.',
  },
]
