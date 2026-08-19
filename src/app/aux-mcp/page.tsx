'use client'

import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { faqs, GH, NPM } from './seo'

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

const scenes = [
  {
    id: 'prompt',
    label: '01 · ASK',
    title: 'rainy 2am drive',
    sub: 'you say a mood. not a playlist name.',
  },
  {
    id: 'invent',
    label: '02 · INVENT',
    title: 'aux builds the brief',
    searches: [
      '2am neo-soul rain window',
      'night drive alt r&b 90bpm',
      'wet asphalt soft synth',
      'late city headlights lofi',
    ],
    sub: 'LLM invents searches + energy · valence · tempo',
  },
  {
    id: 'card',
    label: '03 · DROP',
    title: 'card worth posting',
    sub: 'ASCII made for screenshots. pass the aux.',
  },
  {
    id: 'play',
    label: '04 · PLAY',
    title: 'Rainy Window',
    artist: 'now queued · anti-algorithm',
    sub: 'catalog ranked. repeats skipped. decks live.',
  },
]

const hooks = [
  {
    say: 'music Spotify won’t show me',
    tool: 'anti_algorithm',
    line: 'Filter your top tracks and chart bait. Discover sideways.',
  },
  {
    say: 'DJ for right now',
    tool: 'context_vibe',
    line: 'Local time + weather → a queue for this exact moment.',
  },
  {
    say: 'roast my top tracks',
    tool: 'roast_my_playlist',
    line: 'Grade your taste. Drop an ASCII card made for screenshots.',
  },
  {
    say: 'keep it going',
    tool: 'auto_dj',
    line: 'Start a session. Refill the queue until you kill it.',
  },
  {
    say: 'open a party room',
    tool: 'party_room',
    line: 'Friends sync through a local relay. Democracy, but loud.',
  },
  {
    say: 'what’s my playlist DNA',
    tool: 'playlist_dna',
    line: 'Archetypes, audio genes, dominant artist. Judge later.',
  },
]

const heroPrompts = [
  'rainy 2am drive',
  'roast my top tracks',
  'DJ for right now',
  'music Spotify won’t show me',
]

function VizCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let t = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const bars = 64
    const draw = () => {
      t += 0.016
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      const cx = w * 0.5
      const cy = h * 0.38
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.55)
      grad.addColorStop(0, 'rgba(30,215,96,0.28)')
      grad.addColorStop(0.4, 'rgba(30,215,96,0.08)')
      grad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      const barW = w / bars
      for (let i = 0; i < bars; i++) {
        const n =
          0.3 +
          0.7 *
            Math.abs(
              Math.sin(t * 2.1 + i * 0.28) *
                Math.cos(t * 1.3 + i * 0.11)
            )
        const bh = n * h * 0.34
        const x = i * barW
        const y = h - bh
        ctx.fillStyle = `rgba(30,215,96,${0.14 + n * 0.45})`
        ctx.fillRect(x + 1, y, Math.max(1, barW - 2), bh)
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

function FilmReel({ scene }: { scene: number }) {
  const s = scenes[scene]
  const [hasVideo, setHasVideo] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch('/aux-mcp/trailer.mp4', { method: 'HEAD' })
      .then((r) => {
        if (!cancelled) setHasVideo(r.ok)
      })
      .catch(() => {
        if (!cancelled) setHasVideo(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (hasVideo) {
    return (
      <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden border border-[#1c1c1c] bg-black">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          controls={false}
          poster="/aux-mcp/demo.svg"
        >
          <source src="/aux-mcp/trailer.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-5xl overflow-hidden border border-[#1c1c1c] bg-[#070707]">
      <div className="relative z-10 flex h-full flex-col justify-between px-5 py-5 sm:px-8 sm:py-7">
        <p className="mb-4 font-mono text-[11px] text-white/30">
          <span className="text-[#1ed760]">›</span> aux
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.45 }}
            className="flex min-h-0 flex-1 flex-col"
          >
            <p className="text-[10px] tracking-[0.35em] text-[#1ed760] sm:text-xs">
              {s.label}
            </p>

            {s.id === 'prompt' && (
              <div className="mt-8 max-w-lg">
                <p className="text-xs text-white/35">you → cursor</p>
                <p className="aux-display mt-2 text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                  “{s.title}
                  <span className="ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[0.1em] animate-pulse bg-[#1ed760]" />
                  ”
                </p>
                <p className="mt-4 text-sm text-white/45">{s.sub}</p>
              </div>
            )}

            {s.id === 'invent' && (
              <div className="mt-6 grid flex-1 gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="aux-display text-xl font-bold sm:text-3xl">
                    {s.title}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.searches?.map((q, i) => (
                      <motion.li
                        key={q}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 * i }}
                        className="rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2 text-xs text-white/70 sm:text-sm"
                      >
                        <span className="text-[#1ed760]">›</span> {q}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col justify-center gap-3 font-mono text-[11px] text-white/55 sm:text-xs">
                  <Meter label="energy" value={0.3} />
                  <Meter label="valence" value={0.35} />
                  <Meter label="tempo" value={0.48} suffix="92bpm" />
                  <p className="mt-2 text-white/35">{s.sub}</p>
                </div>
              </div>
            )}

            {s.id === 'card' && (
              <div className="mt-4 flex flex-1 items-center justify-center">
                <motion.pre
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full max-w-md overflow-hidden rounded-xl border border-[#1ed760]/30 bg-black/70 p-4 text-[10px] leading-relaxed text-[#c8f5d6] shadow-[0_0_40px_rgba(30,215,96,0.15)] sm:p-5 sm:text-[11px]"
                >{`┌──────────────────────────────────────────┐
│ AUX · VIBE                               │
├──────────────────────────────────────────┤
│ RAINY 2AM DRIVE                          │
│ 2am neo-soul · night drive alt r&b       │
│                                          │
│ energy  █████░░░░░░░░░░░ 0.30            │
│ valence ██████░░░░░░░░░░ 0.35            │
│ tempo   ████████░░░░░░░░ 92bpm           │
└──────────────────────────────────────────┘
  aux-mcp · pass the aux`}</motion.pre>
              </div>
            )}

            {s.id === 'play' && (
              <div className="mt-8 flex flex-1 flex-col items-center justify-center text-center">
                <div className="relative mb-6 h-28 w-28 overflow-hidden rounded-2xl sm:h-36 sm:w-36">
                  <div className="absolute inset-0 animate-[spin_12s_linear_infinite] bg-[conic-gradient(from_180deg_at_50%_50%,#1ed760,#0a3d1c,#1ed760,#063014,#1ed760)]" />
                  <div className="absolute inset-[10%] rounded-xl bg-[#0a0a0a]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-8 items-end gap-1">
                      {[0.4, 0.7, 1, 0.55, 0.85].map((h, i) => (
                        <span
                          key={i}
                          className="aux-eq-bar w-1.5 rounded-sm bg-[#1ed760]"
                          style={{
                            height: `${h * 100}%`,
                            animationDelay: `${i * 0.12}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="aux-display text-2xl font-extrabold tracking-[-0.03em] sm:text-4xl">
                  {s.title}
                </p>
                <p className="mt-2 text-sm text-[#1ed760]">{s.artist}</p>
                <p className="mt-3 text-xs text-white/40 sm:text-sm">{s.sub}</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex gap-1.5">
          {scenes.map((_, i) => (
            <div
              key={i}
              className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                className="h-full bg-[#1ed760]"
                initial={false}
                animate={{
                  width: i < scene ? '100%' : i === scene ? '100%' : '0%',
                  opacity: i === scene ? 1 : i < scene ? 0.45 : 0.2,
                }}
                transition={{ duration: i === scene ? 3.6 : 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Meter({
  label,
  value,
  suffix,
}: {
  label: string
  value: number
  suffix?: string
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between">
        <span>{label}</span>
        <span className="text-[#1ed760]">
          {suffix ?? value.toFixed(2)}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[#1ed760]"
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

export default function AuxPage() {
  const [scene, setScene] = useState(0)
  const [copied, setCopied] = useState<'npm' | 'mcp' | null>(null)
  const [hookIdx, setHookIdx] = useState(0)
  const [promptIdx, setPromptIdx] = useState(0)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.97])

  useEffect(() => {
    const id = setInterval(() => {
      setScene((s) => (s + 1) % scenes.length)
    }, 3800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setHookIdx((i) => (i + 1) % hooks.length)
    }, 3200)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setPromptIdx((i) => (i + 1) % heroPrompts.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  const copy = async (key: 'npm' | 'mcp', text: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <main className="aux-page relative min-h-screen overflow-x-hidden bg-[#050505] text-[#f2f2f2]">
      <style jsx global>{`
        .aux-page {
          font-family: var(--font-aux-mono), ui-monospace, monospace;
        }
        .aux-display {
          font-family: var(--font-aux-display), system-ui, sans-serif;
        }
        .aux-noise {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 40;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
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
        .aux-eq-bar {
          transform-origin: bottom;
          animation: aux-eq 0.7s ease-in-out infinite;
        }
        .aux-btn {
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          transition: 0.2s ease;
        }
        .aux-btn:hover {
          border-color: rgba(30, 215, 96, 0.45);
          background: rgba(30, 215, 96, 0.08);
        }
        .aux-btn-primary {
          background: #1ed760;
          border-color: #1ed760;
          color: #04140a;
          font-weight: 600;
        }
        .aux-btn-primary:hover {
          background: #2af072;
          border-color: #2af072;
        }
      `}</style>

      <div className="aux-noise" />

      {/* HERO */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-[100svh]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[100svh] overflow-hidden">
          <VizCanvas />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-[#050505]" />
        </div>

        <nav className="relative z-20 flex items-center justify-between px-5 py-5 md:px-10">
          <Link
            href="/"
            className="text-xs text-white/45 transition hover:text-white sm:text-sm"
          >
            ← brianmunene.me
          </Link>
          <div className="flex gap-4 text-xs sm:text-sm">
            <a
              href="#hooks"
              className="hidden text-white/40 hover:text-white sm:inline"
            >
              hooks
            </a>
            <a
              href="#install"
              className="text-white/40 hover:text-white"
            >
              install
            </a>
            <a
              href={GH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 hover:text-white"
            >
              GitHub
            </a>
            <a
              href={NPM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/45 hover:text-white"
            >
              npm
            </a>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col px-4 pb-12 pt-4 md:px-8 md:pb-16 md:pt-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="aux-display text-sm font-bold tracking-[0.45em] text-[#1ed760] sm:text-base"
            >
              AUX
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="aux-display mt-4 text-[clamp(2.8rem,8vw,4.8rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
            >
              Spotify,
              <br />
              for your AI.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/50 sm:text-base"
            >
              Not a remote. A DJ that talks back — vibe queues, roast cards,
              party rooms, auto-DJ.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row"
            >
              <button
                type="button"
                onClick={() => copy('npm', 'npx -y spotify-aux')}
                className="aux-btn aux-btn-primary flex-1 rounded-xl px-5 py-3 text-sm"
              >
                {copied === 'npm' ? 'Copied.' : 'npx -y spotify-aux'}
              </button>
              <a
                href="#install"
                className="aux-btn flex-1 rounded-xl px-5 py-3 text-center text-sm text-white/70"
              >
                Wire Cursor
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.42 }}
              className="mx-auto mt-8 max-w-md border-t border-white/10 pt-5"
            >
              <p className="text-[10px] tracking-[0.2em] text-white/30">
                TRY SAYING
              </p>
              <div className="mt-2 min-h-[1.75rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={heroPrompts[promptIdx]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="text-sm text-white/70 sm:text-base"
                  >
                    “{heroPrompts[promptIdx]}”
                  </motion.p>
                </AnimatePresence>
              </div>
              <p className="mt-4 text-[11px] text-white/30">
                open source ·{' '}
                <a
                  href={NPM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/45 hover:text-[#1ed760]"
                >
                  spotify-aux
                </a>{' '}
                · MIT
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="mt-10 w-full md:mt-12"
          >
            <FilmReel scene={scene} />
            <div className="mt-3 flex gap-2">
              {scenes.map((sc, i) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setScene(i)}
                  className={`flex-1 border px-2 py-2 text-left text-[10px] transition sm:text-[11px] ${
                    scene === i
                      ? 'border-[#1ed760]/50 text-[#1ed760]'
                      : 'border-[#1c1c1c] text-white/30 hover:text-white/55'
                  }`}
                >
                  {sc.label}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* HOOKS */}
      <section
        id="hooks"
        className="relative border-t border-white/5 py-24 md:py-32"
      >
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#1ed760]">
            PEAK HOOKS
          </p>
          <h2 className="aux-display mt-3 max-w-2xl text-3xl font-extrabold tracking-[-0.03em] sm:text-5xl">
            Say it once.
            <span className="text-white/35"> The decks move.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/45 sm:text-base">
            These aren’t menu items. They’re lines you type in Cursor or Claude
            — AUX picks the tool and finishes the set.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
            <div>
              <div className="min-h-[10rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={hooks[hookIdx].tool}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p className="text-xs tracking-[0.2em] text-[#1ed760]">
                      {hooks[hookIdx].tool}
                    </p>
                    <p className="aux-display mt-3 text-[clamp(1.7rem,5vw,3.1rem)] font-extrabold leading-[1.05] tracking-[-0.035em]">
                      “{hooks[hookIdx].say}”
                    </p>
                    <p className="mt-4 max-w-md text-sm leading-relaxed text-white/45">
                      {hooks[hookIdx].line}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {hooks.map((h, i) => (
                  <button
                    key={h.tool}
                    type="button"
                    onClick={() => setHookIdx(i)}
                    className={`border px-3 py-1.5 text-[10px] tracking-wide transition sm:text-xs ${
                      hookIdx === i
                        ? 'border-[#1ed760] bg-[#1ed760] text-[#04140a]'
                        : 'border-white/10 text-white/40 hover:text-white'
                    }`}
                  >
                    {h.tool}
                  </button>
                ))}
              </div>
            </div>

            <div className="border border-[#1c1c1c] bg-[#070707] p-5 sm:p-6">
              <p className="text-[10px] tracking-[0.2em] text-white/30">
                ALSO SHIPS
              </p>
              <ul className="mt-5 space-y-4 text-sm text-white/55">
                {[
                  ['weekly_report', 'Week DNA + one roast line. Sunday bait.'],
                  ['aux_battle', 'Two tastes enter. One aux cord leaves.'],
                  ['blend_tastes', 'Merge queues without killing the vibe.'],
                  ['whats_playing_story', 'Narrate whatever’s on right now.'],
                ].map(([t, d]) => (
                  <li key={t} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <p className="font-mono text-xs text-[#1ed760]">{t}</p>
                    <p className="mt-1 text-white/45">{d}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="relative overflow-hidden border-t border-white/5 bg-[#080808] py-24 md:py-32">
        <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#1ed760]/10 blur-[100px]" />
        <div className="mx-auto grid max-w-5xl gap-14 px-5 md:grid-cols-2 md:gap-16 md:px-8">
          <div>
            <p className="text-[10px] tracking-[0.35em] text-[#1ed760]">
              WHY IT SLAPS
            </p>
            <h2 className="aux-display mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
              The agent is the vibe model.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/50 sm:text-base">
              <strong className="text-white/75">AUX</strong> (
              <code className="text-[#1ed760]">spotify-aux</code>) is a full{' '}
              <strong className="text-white/75">Spotify MCP server</strong> for
              Cursor, Claude Desktop, Windsurf, and any Model Context Protocol
              client. No hardcoded mood dictionary — your LLM invents the
              search queries. AUX scores the catalog, remembers skips, dodges
              algorithm bait, and can keep auto-DJing until you kill the
              session.
            </p>
            <ul className="mt-10 space-y-5 text-sm text-white/55 sm:text-base">
              {[
                ['Taste memory', 'Skips, likes, repeats bias the next vibe.'],
                ['Anti-algorithm', 'Leave the For You Page. Find sideways.'],
                ['Party rooms', 'Local relay. Friends sync. Loud democracy.'],
                ['Roast web', 'npx spotify-aux web — card, no Cursor needed.'],
              ].map(([t, d]) => (
                <li key={t} className="border-l border-[#1ed760]/40 pl-4">
                  <p className="aux-display text-lg font-bold text-white">{t}</p>
                  <p className="mt-1 text-white/45">{d}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col justify-center">
            <pre className="overflow-x-auto border border-[#1c1c1c] bg-[#070707] p-4 text-[10px] leading-relaxed text-[#c8f5d6] sm:p-5 sm:text-[11px]">{`╔══════════════════════════════════════════╗
║ AUX · TASTE ROAST                        ║
╠══════════════════════════════════════════╣
║ grade · A concerning                     ║
║                                          ║
║ your top artists form a support group    ║
║ for people who skip intros.              ║
║ energy spikes like a group chat at 1am.  ║
╚══════════════════════════════════════════╝
  screenshot this. judge later.`}</pre>
            <p className="mt-4 text-xs text-white/35">
              Every hook can drop a card — vibe, roast, DNA, battle, weekly.
            </p>
          </div>
        </div>
      </section>

      {/* INSTALL */}
      <section
        id="install"
        className="border-t border-white/5 py-24 md:py-32"
      >
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#1ed760]">
            BACKSTAGE
          </p>
          <h2 className="aux-display mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl">
            Drop it in Cursor.
          </h2>
          <p className="mt-3 text-sm text-white/45">
            Spotify app + one login. Redirect URI must be exact:{' '}
            <span className="text-[#1ed760]">
              http://127.0.0.1:7654/callback
            </span>
          </p>

          <ol className="mt-10 space-y-6 text-sm text-white/55">
            {[
              [
                '01',
                'Create a Spotify Developer app',
                'Dashboard → create app → paste the redirect URI above.',
              ],
              [
                '02',
                'Add AUX to mcp.json',
                'npx -y spotify-aux with your client id + secret.',
              ],
              [
                '03',
                'Login once',
                'npx -y spotify-aux login — then say a mood in chat.',
              ],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-4">
                <span className="font-mono text-xs text-[#1ed760]">{n}</span>
                <div>
                  <p className="aux-display text-base font-bold text-white">
                    {t}
                  </p>
                  <p className="mt-1 text-white/40">{d}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 overflow-hidden border border-[#1c1c1c] bg-[#070707]">
            <div className="flex items-center justify-between border-b border-[#1c1c1c] px-4 py-3">
              <span className="text-xs text-white/35">mcp.json</span>
              <button
                type="button"
                onClick={() => copy('mcp', mcpConfig)}
                className="text-xs text-[#1ed760] hover:underline"
              >
                {copied === 'mcp' ? 'Copied.' : 'Copy'}
              </button>
            </div>
            <pre className="overflow-x-auto p-4 text-[11px] leading-relaxed text-[#b8f0c8] sm:p-5 sm:text-xs">
              {mcpConfig}
            </pre>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {[
              'npx -y spotify-aux login',
              'npx -y spotify-aux openclaw',
              'npx -y spotify-aux web',
            ].map((cmd) => (
              <button
                key={cmd}
                type="button"
                onClick={() => copy('npm', cmd)}
                className="aux-btn px-3 py-3 text-left text-[11px] text-white/60 sm:text-xs"
              >
                {cmd}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/30">
            Playback needs Spotify Premium + an active device. Browse/search
            work without it.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="border-t border-white/5 bg-[#080808] py-24 md:py-32"
        aria-labelledby="aux-faq-heading"
      >
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="text-[10px] tracking-[0.35em] text-[#1ed760]">FAQ</p>
          <h2
            id="aux-faq-heading"
            className="aux-display mt-3 text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl"
          >
            Spotify MCP questions, answered
          </h2>
          <div className="mt-12 space-y-8">
            {faqs.map((f) => (
              <article key={f.q}>
                <h3 className="aux-display text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
                  {f.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50 sm:text-base">
                  {f.a}
                </p>
              </article>
            ))}
          </div>
          <p className="mt-12 text-sm text-white/35">
            Looking for the long write-up?{' '}
            <Link
              href="/blog/aux-mcp-spotify-for-ai"
              className="text-[#1ed760] hover:underline"
            >
              Read the AUX launch post
            </Link>
            .
          </p>
        </div>
      </section>

      {/* OUTRO */}
      <section className="relative overflow-hidden border-t border-white/5 px-5 py-28 text-center md:py-40">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1ed760]/15 blur-[120px]" />
        <p className="aux-display relative text-sm font-bold tracking-[0.45em] text-[#1ed760]">
          AUX
        </p>
        <h2 className="aux-display relative mt-5 text-[clamp(2.4rem,8vw,4.5rem)] font-extrabold tracking-[-0.04em]">
          Star it.
          <br />
          Pass the aux.
        </h2>
        <p className="relative mx-auto mt-5 max-w-sm text-sm text-white/40">
          Free on npm. MIT. Built for agents that should DJ, not just remote.
        </p>
        <div className="relative mx-auto mt-10 flex max-w-md flex-col gap-2 sm:flex-row">
          <a
            href={GH}
            target="_blank"
            rel="noopener noreferrer"
            className="aux-btn aux-btn-primary flex-1 rounded-xl px-5 py-3.5 text-sm"
          >
            GitHub
          </a>
          <a
            href={NPM}
            target="_blank"
            rel="noopener noreferrer"
            className="aux-btn flex-1 rounded-xl px-5 py-3.5 text-sm text-white/70"
          >
            npm · spotify-aux
          </a>
        </div>
        <p className="relative mt-14 text-xs text-white/30">
          MIT ·{' '}
          <Link href="/" className="hover:text-white">
            brianmunene.me
          </Link>
        </p>
      </section>
    </main>
  )
}
