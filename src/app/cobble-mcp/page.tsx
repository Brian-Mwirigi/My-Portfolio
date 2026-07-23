'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const GH = 'https://github.com/brian-mwirigi/cobble-mcp'
const NPM = 'https://www.npmjs.com/package/cobble-mcp'

const splashes = [
  'Works with any MCP!',
  'Now with mc_design!',
  'As seen in your world!',
  '100% more cobble!',
  'Kids AND nerds!',
  'Come. Kill. Build.',
]

const chatLines = [
  { who: 'sys', text: 'Claude joined the game' },
  { who: 'bot', text: "I'm live. Tell your agent: play with me." },
  { who: 'you', text: 'build me a witch hut by the river' },
  { who: 'bot', text: 'Spruce + moss. Crooked roof. On it.' },
  { who: 'you', text: 'kill that creeper' },
  { who: 'bot', text: 'Target locked.' },
]

const clips = [
  {
    title: 'Cabin from nothing',
    line: 'play with me → build me a witch hut → film it rising',
  },
  {
    title: 'Chat teammate',
    line: 'In Minecraft type: come · kill that · what should we build',
  },
  {
    title: 'Style flex',
    line: 'Same prompt twice → two different designs',
  },
]

const mcpConfig = `{
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
}`

function DirtButton({
  children,
  href,
  onClick,
  primary,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  primary?: boolean
}) {
  const className = [
    'mc-btn relative block w-full max-w-md px-4 py-3 text-center text-[11px] sm:text-[13px] leading-none tracking-wide text-white transition',
    primary ? 'mc-btn-primary' : '',
  ].join(' ')

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={className}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default function CobblePage() {
  const [copied, setCopied] = useState<'npm' | 'mcp' | null>(null)
  const [splash, setSplash] = useState(splashes[0])
  const [splashKey, setSplashKey] = useState(0)

  useEffect(() => {
    setSplash(splashes[Math.floor(Math.random() * splashes.length)])
    const id = setInterval(() => {
      setSplash(splashes[Math.floor(Math.random() * splashes.length)])
      setSplashKey((k) => k + 1)
    }, 4200)
    return () => clearInterval(id)
  }, [])

  const copy = async (key: 'npm' | 'mcp', text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1600)
  }

  return (
    <main className="cobble-mc relative min-h-screen overflow-x-hidden bg-transparent text-white">
      <style jsx global>{`
        .cobble-mc {
          --mc-gold: #ffff55;
        }
        .cobble-mc .font-pixel {
          font-family: var(--font-mc-pixel), monospace;
        }
        .cobble-mc .font-chat {
          font-family: var(--font-mc-chat), monospace;
        }
        .mc-btn {
          font-family: var(--font-mc-pixel), monospace;
          background: linear-gradient(#c6c6c6, #8b8b8b);
          border: 2px solid #000;
          box-shadow:
            inset -2px -4px 0 #565656,
            inset 2px 2px 0 #ffffff;
          text-shadow: 2px 2px 0 #3f3f3f;
          image-rendering: pixelated;
        }
        .mc-btn:hover {
          background: linear-gradient(#d7d7d7, #9a9a9a);
        }
        .mc-btn:active {
          box-shadow:
            inset 2px 4px 0 #565656,
            inset -2px -2px 0 #ffffff;
          transform: translateY(1px);
        }
        .mc-btn-primary {
          background: linear-gradient(#6bc04a, #3e8a28);
          box-shadow:
            inset -2px -4px 0 #2d651c,
            inset 2px 2px 0 #9ae070;
        }
        .mc-btn-primary:hover {
          background: linear-gradient(#7ad358, #479a30);
        }
        .mc-panel {
          background: rgba(0, 0, 0, 0.62);
          border: 4px solid #000;
          box-shadow:
            inset 0 0 0 2px #555,
            inset 0 0 0 4px #2a2a2a;
        }
        .mc-logo {
          text-shadow:
            4px 4px 0 #3f3f3f,
            -2px 0 0 #222,
            0 -2px 0 #222;
          letter-spacing: 0.04em;
        }
        .mc-splash {
          color: var(--mc-gold);
          text-shadow: 2px 2px 0 #3f3f00;
          transform: rotate(-12deg);
          transform-origin: center;
        }
        .mc-hotbar {
          background: rgba(0, 0, 0, 0.45);
          border: 3px solid #555;
          box-shadow: inset 0 0 0 2px #000;
        }
        .mc-slot {
          width: 32px;
          height: 32px;
          border: 2px solid #373737;
          box-shadow:
            inset 2px 2px 0 #8b8b8b,
            inset -2px -2px 0 #000;
          background: rgba(139, 139, 139, 0.35);
        }
        @media (min-width: 768px) {
          .mc-slot {
            width: 40px;
            height: 40px;
          }
        }
        @keyframes cobble-bob {
          0%,
          100% {
            transform: rotate(-12deg) scale(1);
          }
          50% {
            transform: rotate(-12deg) scale(1.08);
          }
        }
        .mc-splash-anim {
          animation: cobble-bob 1.8s ease-in-out infinite;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#78a7ff]">
        <video
          className="h-full w-full scale-110 object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/cobble/overworld.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
      </div>

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-4 py-4 md:px-8">
          <Link
            href="/"
            className="font-chat text-xl text-white/80 hover:text-white"
          >
            ← brianmunene.me
          </Link>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="inline-block h-2.5 w-2.5 sm:h-3 sm:w-3"
                style={{
                  background: '#ff5555',
                  boxShadow: '1px 1px 0 #000',
                  clipPath:
                    'polygon(50% 0, 61% 0, 80% 12%, 100% 35%, 100% 55%, 80% 80%, 50% 100%, 20% 80%, 0 55%, 0 35%, 20% 12%, 39% 0)',
                }}
              />
            ))}
          </div>
        </nav>

        {/* Hero — stacked flow, no absolute pile-up on mobile */}
        <section className="flex min-h-[calc(100svh-4rem)] flex-col items-center px-4 pb-6 pt-6 text-center md:justify-center md:pb-10 md:pt-10">
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mc-logo font-pixel text-[clamp(2.2rem,11vw,6.5rem)] leading-none text-[#ececec]"
            >
              COBBLE
            </motion.h1>

            <AnimatePresence mode="wait">
              <motion.p
                key={splashKey}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mc-splash mc-splash-anim font-pixel absolute -right-1 top-[85%] text-[9px] sm:-right-6 sm:text-[10px] md:-right-10 md:text-xs"
              >
                {splash}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="font-chat mt-8 max-w-xl text-xl leading-tight text-white/90 sm:mt-10 sm:text-2xl md:text-3xl"
          >
            Minecraft for your AI.
            <br />
            Your agent joins the world — chats, builds, fights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-8 flex w-full max-w-md flex-col gap-2.5 sm:mt-10 sm:gap-3"
          >
            <DirtButton primary onClick={() => copy('npm', 'npx -y cobble-mcp')}>
              {copied === 'npm' ? 'Copied!' : 'npx -y cobble-mcp'}
            </DirtButton>
            <div className="grid grid-cols-2 gap-2.5">
              <DirtButton href={GH}>GitHub</DirtButton>
              <DirtButton href={NPM}>npm</DirtButton>
            </div>
            <DirtButton href="#try">Add to your agent ↓</DirtButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mc-panel font-chat mt-8 w-full max-w-xl p-3 text-left text-lg leading-snug sm:mt-10 sm:p-4 sm:text-xl md:mt-12"
          >
            {chatLines.map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.1 }}
                className={
                  line.who === 'sys'
                    ? 'text-yellow-300'
                    : line.who === 'bot'
                      ? 'text-[#55ff55]'
                      : 'text-white'
                }
              >
                {line.who === 'sys' && line.text}
                {line.who === 'bot' && (
                  <>
                    <span className="text-white/50">&lt;Claude&gt;</span>{' '}
                    {line.text}
                  </>
                )}
                {line.who === 'you' && (
                  <>
                    <span className="text-white/50">&lt;You&gt;</span> {line.text}
                  </>
                )}
              </motion.p>
            ))}
          </motion.div>

          <div className="mc-hotbar mt-5 flex gap-1 p-1 sm:mt-6">
            {[
              '#8b8b8b',
              '#866043',
              '#5d9c3d',
              '#c6a15b',
              '#3a7d34',
              '#4a90d9',
              '#aa3a3a',
              '#6b4f9a',
              '#e0a040',
            ].map((color, i) => (
              <div
                key={i}
                className={`mc-slot ${i === 3 ? 'outline outline-2 outline-white' : ''}`}
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${color}cc 45%, #00000055 100%)`,
                }}
              />
            ))}
          </div>
        </section>

        <section className="relative border-t-4 border-black bg-[#1d1d1d]/92 backdrop-blur-sm px-4 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-pixel text-base leading-relaxed text-[#ececec] sm:text-lg md:text-xl">
              Clips of an AI placing blocks
              <span className="mt-3 block text-[#55ff55]">
                spread. Admin panels don&apos;t.
              </span>
            </h2>
            <p className="font-chat mt-6 text-xl leading-snug text-white/75 sm:text-2xl">
              COBBLE drops a Mineflayer bot into your server. Your MCP agent is
              the brain. Builds get invented via{' '}
              <span className="text-[#55ff55]">mc_design</span> — not the same
              oak cabin every time.
            </p>
          </div>
        </section>

        <section className="relative border-t-4 border-black bg-[#2a2118]/95 px-4 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-pixel text-base text-[#ffff55] sm:text-lg md:text-xl">
              Film this
            </h2>
            <p className="font-chat mt-3 text-xl text-white/70">
              30-second recipes. Post with #cobble
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {clips.map((c, i) => (
                <div key={c.title} className="mc-panel p-5">
                  <p className="font-pixel text-[10px] text-[#55ff55]">0{i + 1}</p>
                  <h3 className="font-pixel mt-3 text-xs leading-relaxed text-white">
                    {c.title}
                  </h3>
                  <p className="font-chat mt-3 text-xl text-white/70">{c.line}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative border-t-4 border-black bg-[#121212]/95 px-4 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-pixel text-base sm:text-lg md:text-xl">
              Your agent is the brain
            </h2>
            <p className="font-chat mt-3 max-w-xl text-xl text-white/70">
              The agent stays in the loop — not a side API that forgot the cabin.
            </p>
            <pre className="mc-panel font-chat mt-8 overflow-x-auto p-5 text-lg text-[#55ff55] sm:text-xl">
              {`mc_connect → mc_come → loop:
  mc_play → think → mc_chat / mc_design → mc_play`}
            </pre>
          </div>
        </section>

        <section
          id="try"
          className="relative border-t-4 border-black bg-[#1a2418]/95 px-4 py-16 md:px-10 md:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <h2 className="font-pixel text-base text-[#55ff55] sm:text-lg md:text-xl">
              Try it tonight
            </h2>
            <p className="font-chat mt-3 max-w-xl text-xl text-white/70">
              Creative Java world · online-mode=false · paste into any MCP
              client (Claude Desktop, Cursor, Windsurf, etc.)
            </p>
            <div className="relative mt-8">
              <button
                type="button"
                onClick={() => copy('mcp', mcpConfig)}
                className="mc-btn absolute right-3 top-3 z-10 px-3 py-2 text-[10px]"
              >
                {copied === 'mcp' ? 'Copied!' : 'Copy'}
              </button>
              <pre className="mc-panel overflow-x-auto p-5 pt-14 font-mono text-xs leading-relaxed text-[#a8c9a0] md:text-sm">
                {mcpConfig}
              </pre>
            </div>
            <p className="font-chat mt-5 text-xl text-white/60">
              Then tell your agent:{' '}
              <span className="text-white">play with me</span> — talk in
              Minecraft chat.
            </p>
          </div>
        </section>

        <section className="relative border-t-4 border-black bg-[#1d1d1d]/95 px-4 py-16 md:px-10 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
            <div>
              <h2 className="font-pixel text-sm md:text-base">Craft</h2>
              <p className="font-chat mt-4 text-xl leading-snug text-white/70">
                TypeScript · Mineflayer · MCP. Hard parts: no pathfind hangs,
                survey/dig/repair against the real world, agent ASCII
                architecture.
              </p>
            </div>
            <div>
              <h2 className="font-pixel text-sm md:text-base">Open source</h2>
              <p className="font-chat mt-4 text-xl leading-snug text-white/70">
                Easiest PR: drop a JSON house in{' '}
                <span className="text-[#55ff55]">examples/designs</span>. No
                TypeScript required.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <DirtButton href={`${GH}/blob/main/CONTRIBUTING.md`}>
                  Contributing
                </DirtButton>
                <DirtButton href={`${GH}/blob/main/ROADMAP.md`}>
                  Roadmap
                </DirtButton>
              </div>
            </div>
          </div>
        </section>

        <section className="relative border-t-4 border-black px-4 py-20 text-center md:py-32">
          <p className="mc-logo font-pixel text-lg leading-relaxed text-white sm:text-xl md:text-3xl">
            Same world.
            <br />
            Your call.
            <br />
            Its hands.
          </p>
          <div className="mx-auto mt-10 flex w-full max-w-md flex-col gap-3">
            <DirtButton primary href={NPM}>
              npm · cobble-mcp
            </DirtButton>
            <DirtButton href={GH}>Star on GitHub</DirtButton>
          </div>
          <Link
            href="/"
            className="font-chat mt-12 inline-block text-xl text-white/50 hover:text-white"
          >
            ← Portfolio
          </Link>
          <p className="font-chat mt-8 text-sm text-white/30">
            Not affiliated with Mojang or Microsoft. Background footage used for
            atmosphere.
          </p>
        </section>
      </div>
    </main>
  )
}
