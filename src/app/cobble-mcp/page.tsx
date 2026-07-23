'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const GH = 'https://github.com/brian-mwirigi/cobble-mcp'
const NPM = 'https://www.npmjs.com/package/cobble-mcp'

const splashes = [
  'Also try Cursor!',
  'Now with mc_design!',
  'As seen in your world!',
  '100% more cobble!',
  'Kids AND nerds!',
  'Come. Kill. Build.',
]

const chatLines = [
  { who: 'sys', text: 'Claude joined the game' },
  { who: 'bot', text: "I'm live. Say play with me in Cursor." },
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
    'mc-btn relative block w-full max-w-md px-4 py-3 text-center text-[13px] leading-none tracking-wide text-white transition',
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
          --mc-dirt: #8b6b4a;
          --mc-dirt-dark: #5a4330;
          --mc-grass: #5d9c3d;
          --mc-stone: #8b8b8b;
          --mc-gold: #ffff55;
          --mc-sky: #78a7ff;
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
          background: rgba(0, 0, 0, 0.55);
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
          width: 40px;
          height: 40px;
          border: 2px solid #373737;
          box-shadow:
            inset 2px 2px 0 #8b8b8b,
            inset -2px -2px 0 #000;
          background: rgba(139, 139, 139, 0.35);
        }
        .mc-heart {
          color: #ff5555;
          text-shadow: 1px 1px 0 #000;
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

      {/* Full-bleed Minecraft video */}
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
      {/* Top bar */}
      <nav className="relative z-20 flex items-center justify-between px-4 py-4 md:px-8">
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
              className="inline-block h-3 w-3"
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

      {/* Title screen hero */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center px-4 pb-28 pt-8 text-center">
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mc-logo font-pixel text-[clamp(2.4rem,10vw,6.5rem)] leading-none text-[#ececec]"
          >
            COBBLE
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={splashKey}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mc-splash mc-splash-anim font-pixel absolute -right-2 top-full mt-2 text-[10px] md:-right-8 md:text-xs"
            >
              {splash}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-chat mt-10 max-w-xl text-2xl leading-tight text-white/90 md:text-3xl"
        >
          Minecraft for your AI.
          <br />
          Claude joins your world — chats, builds, fights.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-10 flex w-full max-w-md flex-col gap-3"
        >
          <DirtButton primary onClick={() => copy('npm', 'npx -y cobble-mcp')}>
            {copied === 'npm' ? 'Copied!' : 'npx -y cobble-mcp'}
          </DirtButton>
          <DirtButton href={GH}>GitHub</DirtButton>
          <DirtButton href={NPM}>npm · cobble-mcp</DirtButton>
          <DirtButton href="#try">Wire Cursor ↓</DirtButton>
        </motion.div>

        {/* In-game chat overlay */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mc-panel font-chat absolute bottom-24 left-4 right-4 mx-auto max-w-xl p-4 text-left text-xl leading-snug md:left-8 md:right-auto md:bottom-28"
        >
          {chatLines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.12 }}
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
                  <span className="text-white/50">&lt;Claude&gt;</span> {line.text}
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

        {/* Hotbar — block colors */}
        <div className="mc-hotbar absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1 p-1">
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

      {/* Why */}
      <section className="relative border-t-4 border-black bg-[#1d1d1d]/92 backdrop-blur-sm px-4 py-20 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-pixel text-lg leading-relaxed text-[#ececec] md:text-xl">
            Clips of Claude placing blocks
            <span className="mt-3 block text-[#55ff55]">spread. Admin panels don&apos;t.</span>
          </h2>
          <p className="font-chat mt-6 text-2xl leading-snug text-white/75">
            COBBLE drops a Mineflayer bot into your server. Cursor is the brain.
            Builds get invented via{' '}
            <span className="text-[#55ff55]">mc_design</span> — not the same oak
            cabin every time.
          </p>
        </div>
      </section>

      {/* Film */}
      <section className="relative border-t-4 border-black bg-[#2a2118]/95 px-4 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-pixel text-lg text-[#ffff55] md:text-xl">Film this</h2>
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

      {/* Brain */}
      <section className="relative border-t-4 border-black bg-[#121212]/95 px-4 py-20 md:px-10">
        <div className="mx-auto max-w-5xl">
          <h2 className="font-pixel text-lg md:text-xl">You are the brain</h2>
          <p className="font-chat mt-3 max-w-xl text-xl text-white/70">
            Cursor stays in the loop — not a side API that forgot the cabin.
          </p>
          <pre className="mc-panel font-chat mt-8 overflow-x-auto p-5 text-xl text-[#55ff55]">
            {`mc_connect → mc_come → loop:
  mc_play → think → mc_chat / mc_design → mc_play`}
          </pre>
        </div>
      </section>

      {/* Try */}
      <section
        id="try"
        className="relative border-t-4 border-black bg-[#1a2418]/95 px-4 py-20 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <h2 className="font-pixel text-lg text-[#55ff55] md:text-xl">
            Try it tonight
          </h2>
          <p className="font-chat mt-3 max-w-xl text-xl text-white/70">
            Creative Java world · online-mode=false · paste into Cursor MCP
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
            Then in Cursor: <span className="text-white">play with me</span> —
            talk in Minecraft chat.
          </p>
        </div>
      </section>

      {/* Craft / OSS */}
      <section className="relative border-t-4 border-black bg-[#1d1d1d]/95 px-4 py-20 md:px-10">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-pixel text-sm md:text-base">Craft</h2>
            <p className="font-chat mt-4 text-xl leading-snug text-white/70">
              TypeScript · Mineflayer · MCP · Cursor. Hard parts: no pathfind
              hangs, survey/dig/repair against the real world, agent ASCII
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
              <DirtButton href={`${GH}/blob/main/ROADMAP.md`}>Roadmap</DirtButton>
            </div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="relative border-t-4 border-black px-4 py-24 text-center md:py-32">
        <p className="mc-logo font-pixel text-xl leading-relaxed text-white md:text-3xl">
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
