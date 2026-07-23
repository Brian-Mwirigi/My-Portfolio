'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const GH = 'https://github.com/brian-mwirigi/aux-mcp'
const NPM = 'https://www.npmjs.com/package/spotify-aux'

const mcpConfig = `{
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
}`

const hooks = [
  {
    say: 'rainy 2am drive',
    tool: 'vibe',
    line: 'LLM invents searches + energy/valence/tempo. AUX ranks the catalog.',
  },
  {
    say: 'music Spotify won’t show me',
    tool: 'anti_algorithm',
    line: 'Dodge your top tracks and chart bait. Discover sideways.',
  },
  {
    say: 'DJ for right now',
    tool: 'context_vibe',
    line: 'Local time + weather → a queue that fits this exact moment.',
  },
  {
    say: 'roast my top tracks',
    tool: 'roast_my_playlist',
    line: 'Grades your taste. Drops an ASCII card made for screenshots.',
  },
  {
    say: 'keep it going',
    tool: 'auto_dj',
    line: 'Session + refill loop. The agent stays on the decks.',
  },
  {
    say: 'open a party room',
    tool: 'party_room',
    line: 'Friends sync queues through a local relay. Democracy, but loud.',
  },
]

const cards = [
  {
    title: 'VIBE',
    body: `┌──────────────────────────────────────────┐
│ AUX · VIBE                               │
├──────────────────────────────────────────┤
│ RAINY 2AM DRIVE                          │
│ 2am neo-soul · night drive alt r&b       │
│                                          │
│ energy  █████░░░░░░░░░░░ 0.30            │
│ valence ██████░░░░░░░░░░ 0.35            │
│ tempo   ████████░░░░░░░░ 92bpm           │
└──────────────────────────────────────────┘
  aux-mcp · pass the aux`,
  },
  {
    title: 'ROAST',
    body: `╔══════════════════════════════════════════╗
║ AUX · TASTE ROAST                        ║
╠══════════════════════════════════════════╣
║ grade · A concerning                     ║
║                                          ║
║ your top artists form a support group    ║
║ for people who skip intros.              ║
║ energy spikes like a group chat at 1am.  ║
╚══════════════════════════════════════════╝
  screenshot this. judge later.`,
  },
  {
    title: 'DNA',
    body: `╔══════════════════════════════════════════╗
║ AUX · PLAYLIST DNA                       ║
╠══════════════════════════════════════════╣
║ archetype · SOFT CHAOS BALLAD CORE       ║
║ ENERGY   ██████░░░░░░░░░░                ║
║ VALENCE  ████░░░░░░░░░░░░                ║
║ DANCE    █████░░░░░░░░░░░                ║
║ dominant gene · Frank Ocean              ║
╚══════════════════════════════════════════╝
  screenshot this. judge later.`,
  },
]

const tryLines = [
  { who: 'you', text: 'rainy 2am drive' },
  { who: 'aux', text: 'inventing searches · scoring catalog' },
  { who: 'aux', text: 'queued · Rainy Window — pass the aux' },
]

export default function AuxPage() {
  const [copied, setCopied] = useState<'npm' | 'mcp' | 'login' | null>(null)
  const [cardIdx, setCardIdx] = useState(0)
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCardIdx((i) => (i + 1) % cards.length)
    }, 4800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (lineIdx >= tryLines.length - 1) return
    const t = setTimeout(() => setLineIdx((i) => i + 1), 900)
    return () => clearTimeout(t)
  }, [lineIdx])

  const copy = async (key: 'npm' | 'mcp' | 'login', text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1600)
  }

  return (
    <main className="aux-page relative min-h-screen overflow-x-hidden text-[#f2f2f2]">
      <style jsx global>{`
        .aux-page {
          --aux-green: #1ed760;
          --aux-muted: #8a8a8a;
          --aux-line: #1c1c1c;
          --aux-card: #0e0e0e;
          font-family: var(--font-aux-mono), ui-monospace, monospace;
          background: #070707;
        }
        .aux-display {
          font-family: var(--font-aux-display), system-ui, sans-serif;
        }
        .aux-noise {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 1;
          opacity: 0.045;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .aux-btn {
          font-family: var(--font-aux-mono), ui-monospace, monospace;
          border: 1px solid var(--aux-line);
          background: var(--aux-card);
          color: #f2f2f2;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .aux-btn:hover {
          border-color: #2a2a2a;
          background: #121212;
        }
        .aux-btn-primary {
          background: var(--aux-green);
          border-color: var(--aux-green);
          color: #04140a;
          font-weight: 500;
        }
        .aux-btn-primary:hover {
          background: #23f06b;
          border-color: #23f06b;
          color: #04140a;
        }
        @keyframes aux-pulse {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(1);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }
        .aux-glow {
          animation: aux-pulse 6s ease-in-out infinite;
        }
        @keyframes aux-eq {
          0%,
          100% {
            transform: scaleY(0.35);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .aux-bar {
          transform-origin: bottom;
          animation: aux-eq 1.1s ease-in-out infinite;
        }
      `}</style>

      <div className="aux-noise" />

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070707]">
        <div className="aux-glow absolute left-1/2 top-[-18%] h-[70vh] w-[90vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,215,96,0.22),transparent_65%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0a0a0a_0%,#050505_55%,#070707_100%)]" />
      </div>

      <div className="relative z-10">
        <nav className="flex items-center justify-between px-5 py-5 md:px-10">
          <Link
            href="/"
            className="text-sm text-[var(--aux-muted)] transition hover:text-white"
          >
            ← brianmunene.me
          </Link>
          <div className="flex items-end gap-1 h-5" aria-hidden>
            {[0.2, 0.45, 0.7, 0.35, 0.9, 0.5, 0.25].map((d, i) => (
              <span
                key={i}
                className="aux-bar inline-block w-1 rounded-sm bg-[var(--aux-green)]"
                style={{
                  height: `${10 + i * 2}px`,
                  animationDelay: `${d}s`,
                }}
              />
            ))}
          </div>
        </nav>

        {/* Hero — brand + line + CTA + full-bleed demo */}
        <section className="flex min-h-[calc(100svh-4.5rem)] flex-col">
          <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-5 pb-8 pt-6 text-center md:px-10">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="aux-display text-sm font-bold tracking-[0.45em] text-[var(--aux-green)] sm:text-base"
            >
              AUX
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="aux-display mt-5 max-w-3xl text-[clamp(2.4rem,8vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.04em]"
            >
              Spotify, for your AI.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.18 }}
              className="mt-5 max-w-md text-[0.95rem] leading-relaxed text-[var(--aux-muted)] sm:text-base"
            >
              Not a remote. A DJ that talks back.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="mt-9 flex w-full max-w-md flex-col gap-2.5"
            >
              <button
                type="button"
                className="aux-btn aux-btn-primary w-full rounded-xl px-4 py-3.5 text-sm"
                onClick={() => copy('npm', 'npx -y spotify-aux')}
              >
                {copied === 'npm' ? 'Copied.' : 'npx -y spotify-aux'}
              </button>
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={GH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aux-btn rounded-xl px-4 py-3 text-center text-sm"
                >
                  GitHub
                </a>
                <a
                  href={NPM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aux-btn rounded-xl px-4 py-3 text-center text-sm"
                >
                  npm
                </a>
              </div>
              <a
                href="#install"
                className="aux-btn rounded-xl px-4 py-3 text-center text-sm text-[var(--aux-muted)]"
              >
                Add to Cursor ↓
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="w-full border-t border-[var(--aux-line)] bg-[#050505]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/aux-mcp/demo.svg"
              alt="AUX demo: rainy 2am drive vibe card"
              className="mx-auto block h-auto w-full max-w-5xl object-cover object-left px-0 sm:px-4 md:px-8"
            />
          </motion.div>
        </section>

        {/* One job: what it is */}
        <section className="border-t border-[var(--aux-line)] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-2xl">
            <h2 className="aux-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Your agent gets the aux cord.
            </h2>
            <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--aux-muted)] sm:text-base">
              Full Spotify Web API as an MCP server — plus peak hooks that make
              chat feel like a late-night booth. Say a mood. AUX invents the
              search, ranks the catalog, and drops a card worth posting.
            </p>
            <div className="mt-10 space-y-2 font-mono text-sm">
              {tryLines.slice(0, lineIdx + 1).map((l, i) => (
                <motion.p
                  key={`${l.text}-${i}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    l.who === 'you'
                      ? 'text-white'
                      : 'text-[var(--aux-green)]'
                  }
                >
                  <span className="text-[var(--aux-muted)]">
                    {l.who === 'you' ? 'you' : 'aux'}
                  </span>{' '}
                  {l.text}
                </motion.p>
              ))}
            </div>
          </div>
        </section>

        {/* One job: peak hooks */}
        <section className="border-t border-[var(--aux-line)] bg-[#0a0a0a] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-5xl">
            <h2 className="aux-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Peak hooks
            </h2>
            <p className="mt-3 max-w-xl text-sm text-[var(--aux-muted)] sm:text-base">
              Say it in Cursor. The tool does the rest.
            </p>
            <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
              {hooks.map((h, i) => (
                <motion.div
                  key={h.tool}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.05 }}
                >
                  <p className="text-xs tracking-[0.14em] text-[var(--aux-green)]">
                    {h.tool}
                  </p>
                  <p className="aux-display mt-2 text-xl font-bold tracking-[-0.02em] sm:text-2xl">
                    “{h.say}”
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--aux-muted)]">
                    {h.line}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* One job: share cards */}
        <section className="border-t border-[var(--aux-line)] px-5 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-3xl">
            <h2 className="aux-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Cards made for screenshots
            </h2>
            <p className="mt-3 text-sm text-[var(--aux-muted)] sm:text-base">
              Every hook can drop ASCII. Vibes, roasts, DNA, battles, weekly
              reports.
            </p>

            <div className="mt-10 flex gap-2">
              {cards.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => setCardIdx(i)}
                  className={`rounded-lg px-3 py-1.5 text-xs tracking-wide transition ${
                    cardIdx === i
                      ? 'bg-[var(--aux-green)] text-[#04140a]'
                      : 'border border-[var(--aux-line)] text-[var(--aux-muted)] hover:text-white'
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.pre
                key={cards[cardIdx].title}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-6 overflow-x-auto rounded-2xl border border-[var(--aux-line)] bg-[var(--aux-card)] p-5 text-[11px] leading-relaxed text-[#d6d6d6] sm:p-6 sm:text-xs"
              >
                {cards[cardIdx].body}
              </motion.pre>
            </AnimatePresence>
          </div>
        </section>

        {/* Install — interactive config */}
        <section
          id="install"
          className="border-t border-[var(--aux-line)] bg-[#0a0a0a] px-5 py-20 md:px-10 md:py-28"
        >
          <div className="mx-auto max-w-3xl">
            <h2 className="aux-display text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              Wire it up
            </h2>
            <p className="mt-3 text-sm text-[var(--aux-muted)] sm:text-base">
              Spotify app credentials + one login. Redirect URI:{' '}
              <code className="text-[var(--aux-green)]">
                http://127.0.0.1:7654/callback
              </code>
            </p>

            <div className="mt-10 space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[var(--aux-line)] bg-[var(--aux-card)]">
                <div className="flex items-center justify-between border-b border-[var(--aux-line)] px-4 py-3">
                  <span className="text-xs text-[var(--aux-muted)]">
                    Cursor mcp.json
                  </span>
                  <button
                    type="button"
                    onClick={() => copy('mcp', mcpConfig)}
                    className="text-xs text-[var(--aux-green)] hover:underline"
                  >
                    {copied === 'mcp' ? 'Copied.' : 'Copy'}
                  </button>
                </div>
                <pre className="overflow-x-auto p-4 text-[11px] leading-relaxed text-[#d6d6d6] sm:text-xs">
                  {mcpConfig}
                </pre>
              </div>

              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => copy('login', 'npx -y spotify-aux login')}
                  className="aux-btn flex-1 rounded-xl px-4 py-3 text-sm"
                >
                  {copied === 'login'
                    ? 'Copied.'
                    : 'npx -y spotify-aux login'}
                </button>
                <a
                  href={GH}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="aux-btn flex-1 rounded-xl px-4 py-3 text-center text-sm"
                >
                  Full README ↗
                </a>
              </div>

              <p className="text-xs leading-relaxed text-[var(--aux-muted)]">
                Also: <code>demo</code> · <code>autodj</code> ·{' '}
                <code>party-host</code> · <code>web</code> (roast site on :7656).
                Playback needs Spotify Premium + an active device.
              </p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-[var(--aux-line)] px-5 py-24 text-center md:px-10 md:py-32">
          <p className="aux-display text-sm font-bold tracking-[0.45em] text-[var(--aux-green)]">
            AUX
          </p>
          <h2 className="aux-display mt-5 text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
            Star it. Pass the aux.
          </h2>
          <div className="mx-auto mt-10 flex max-w-md flex-col gap-2.5 sm:flex-row">
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              className="aux-btn aux-btn-primary flex-1 rounded-xl px-4 py-3.5 text-sm"
            >
              GitHub
            </a>
            <a
              href={NPM}
              target="_blank"
              rel="noopener noreferrer"
              className="aux-btn flex-1 rounded-xl px-4 py-3.5 text-sm"
            >
              npm · spotify-aux
            </a>
          </div>
          <p className="mt-12 text-xs text-[var(--aux-muted)]">
            MIT · Brian Munene Mwirigi ·{' '}
            <Link href="/" className="hover:text-white">
              brianmunene.me
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
