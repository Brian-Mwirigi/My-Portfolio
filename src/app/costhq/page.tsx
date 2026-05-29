'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

// ─── Live typewriter terminal ───────────────────────────────────────────────

type LineType = 'cmd' | 'out' | 'gap'
interface SessionLine { type: LineType; text?: string }

const SESSION_LINES: SessionLine[] = [
  { type: 'cmd',  text: '$ cs run python my_agent.py' },
  { type: 'out',  text: '● Session started  ·  Proxy listening on port 3739' },
  { type: 'gap' },
  { type: 'out',  text: '✓ Agent execution complete' },
  { type: 'gap' },
  { type: 'out',  text: 'Receipt:' },
  { type: 'out',  text: '  Duration:  14m' },
  { type: 'out',  text: '  Changes:   3 files touched' },
  { type: 'out',  text: '  Cost:      $0.14 spent' },
  { type: 'out',  text: '  Model:     claude-3-5-sonnet' },
]

function LiveTerminal() {
  const [visible, setVisible] = useState(0)   // how many full lines are visible
  const [typing, setTyping] = useState('')     // in-progress char build
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pause' | 'next'>('pause')
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => { if (inView) { const t = setTimeout(() => setStarted(true), 400); return () => clearTimeout(t) } }, [inView])

  useEffect(() => {
    if (!started) return
    const currentIdx = visible
    if (currentIdx >= SESSION_LINES.length) return
    const line = SESSION_LINES[currentIdx]

    if (line.type === 'gap') {
      const t = setTimeout(() => { setVisible(v => v + 1) }, 300)
      return () => clearTimeout(t)
    }

    if (line.type === 'out') {
      setTyping(line.text ?? '')
      const t = setTimeout(() => { setVisible(v => v + 1); setTyping('') }, 700)
      return () => clearTimeout(t)
    }

    // cmd: typewriter
    const lineText = line.text ?? ''
    if (charIdx < lineText.length) {
      const delay = lineText[charIdx] === '\n' ? 80 : 28
      const t = setTimeout(() => {
        setTyping(lineText.slice(0, charIdx + 1))
        setCharIdx(i => i + 1)
      }, delay)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setVisible(v => v + 1)
        setTyping('')
        setCharIdx(0)
      }, 350)
      return () => clearTimeout(t)
    }
  }, [started, visible, charIdx])

  const done = visible >= SESSION_LINES.length

  return (
    <div ref={ref} className="rounded-2xl overflow-hidden border border-neutral-800/80 bg-[#0c0c0c] shadow-2xl shadow-black/50">
      {/* chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800/80 bg-neutral-900/40">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-auto text-[11px] font-mono text-neutral-600">~/projects/my-app  —  zsh</span>
      </div>
      <div className="p-5 font-mono text-[12px] leading-relaxed min-h-[320px] overflow-x-auto">
        {SESSION_LINES.slice(0, visible).map((line, i) => (
          <div key={i}>
            {line.type === 'gap' && <div className="h-2" />}
            {line.type === 'cmd' && (
              <div className="text-neutral-200 whitespace-pre">{line.text}</div>
            )}
            {line.type === 'out' && (
              <div className="text-purple-400/90 pl-0">{line.text}</div>
            )}
          </div>
        ))}
        {/* currently typing line */}
        {!done && visible < SESSION_LINES.length && (() => {
          const cur = SESSION_LINES[visible]
          if (cur.type === 'cmd') return (
            <div className="text-neutral-200 whitespace-pre">
              {typing}<span className="inline-block w-[7px] h-[13px] bg-neutral-200 ml-px align-middle animate-pulse" />
            </div>
          )
          if (cur.type === 'out') return (
            <div className="text-purple-400/90">{typing}</div>
          )
          return null
        })()}
        {done && (
          <div className="mt-3 text-neutral-700 text-[11px]">
            → <span className="text-neutral-500">cs list</span>  ·  <span className="text-neutral-500">cs stats</span>  ·  <span className="text-neutral-500">cs export</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Animated cost counter ───────────────────────────────────────────────────

function CostCounter() {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const target = 87.45
    const duration = 1800
    const steps = 60
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, target)
      setValue(current)
      if (current >= target) clearInterval(timer)
    }, duration / steps)
    return () => clearInterval(timer)
  }, [inView])

  return (
    <span ref={ref} className="font-mono tabular-nums">
      ${value.toFixed(2)}
    </span>
  )
}

const DASHBOARD_SHOTS = [
  {
    src: 'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png',
    label: 'Overview',
  },
  {
    src: 'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/cost-charts.png',
    label: 'Cost Charts',
  },
  {
    src: 'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/session-detail.png',
    label: 'Session Detail',
  },
]

// ─── Command marquee ─────────────────────────────────────────────────────────

const MARQUEE_CMDS = [
  'cs start', 'cs log-ai', 'cs end', 'cs status', 'cs dashboard',
  'cs stats', 'cs list', 'cs show', 'cs note', 'cs export', 'cs pricing',
  'cs start', 'cs log-ai', 'cs end', 'cs status', 'cs dashboard',
  'cs stats', 'cs list', 'cs show', 'cs note', 'cs export', 'cs pricing',
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CostHQ() {
  const [copied, setCopied] = useState(false)
  const [activeShot, setActiveShot] = useState(0)

  const copy = () => {
    navigator.clipboard.writeText('npm install -g codesession-cli')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/5">
        <Link href="/" className="text-[11px] tracking-[0.25em] text-neutral-500 hover:text-white transition font-mono">
          ← brianmunene.me
        </Link>
        <span className="text-[11px] tracking-[0.2em] text-neutral-600 font-mono">CostHQ</span>
        <a
          href="https://github.com/brian-mwirigi/codesession-cli"
          target="_blank" rel="noopener noreferrer"
          className="text-[11px] px-4 py-1.5 border border-neutral-800 rounded-full hover:border-neutral-500 hover:text-white transition tracking-widest"
        >
          GITHUB
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="min-h-screen pt-24 pb-16 px-6 md:px-12 flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Overline */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-8 bg-purple-500" />
              <span className="text-[11px] tracking-[0.35em] text-purple-400 font-mono">NPM · OPEN SOURCE · MIT</span>
            </div>

            {/* Heading — sr-only gives crawlers the exact keyword; aria-hidden keeps visual for humans */}
            <h1 className="text-[13vw] sm:text-[10vw] lg:text-[5.5rem] xl:text-[6.5rem] font-black leading-[0.88] tracking-tighter mb-8">
              <span className="sr-only">codesession-cli CostHQ</span>
              <span aria-hidden="true">
                Cost<br />
                <span className="text-transparent [-webkit-text-stroke:1px_rgba(168,85,247,0.6)]">HQ</span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-neutral-300 max-w-lg mb-6 leading-relaxed font-medium">
              Stop AI Agents from Burning Your API Budget. Track, cap, and analyze LLM costs locally with zero configuration.
            </p>

            {/* Security Guarantees */}
            <div className="flex flex-col gap-2 mb-10 p-4 rounded-xl border border-green-900/30 bg-green-950/10 max-w-md">
              <div className="flex items-center gap-2 text-green-400 font-bold text-sm tracking-wide">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Strict Security Guarantees
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                100% Local. SQLite Backed. No Telemetry. No Prompt Logging. We never see your code or your API keys.
              </p>
            </div>

            {/* Install */}
            <button
              onClick={copy}
              className="group w-full sm:w-auto flex items-center gap-3 px-5 py-3.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/40 transition-all font-mono text-sm mb-6"
            >
              <span className="text-purple-400">$</span>
              <span className="text-neutral-100">npm install -g codesession-cli</span>
              <span className={`ml-auto text-[11px] transition ${copied ? 'text-green-400' : 'text-neutral-700 group-hover:text-neutral-400'}`}>
                {copied ? '✓ copied' : 'copy'}
              </span>
            </button>

            <div className="flex flex-wrap gap-3">
              <Link href="/docs/codesession-cli-docs"
                className="px-6 py-2.5 bg-white text-black text-xs tracking-widest font-semibold rounded-full hover:bg-neutral-200 transition">
                VIEW FULL DOCS
              </Link>
            </div>
          </motion.div>

          {/* Right — terminal */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <LiveTerminal />
          </motion.div>
        </div>
      </section>

      {/* ── Dashboard Product Shot (Above the Fold) ── */}
      <section className="px-6 md:px-12 -mt-16 pb-24 relative z-10 hidden sm:block">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.5 }}
            className="rounded-2xl overflow-hidden border border-neutral-800 shadow-[0_0_80px_rgba(168,85,247,0.15)] bg-[#0c0c0c]"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900/40">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="ml-auto text-[11px] font-mono text-neutral-500">cs dashboard (localhost:3737)</span>
            </div>
            {/* TODO: temporary URL. Replace with local /public/screenshots/ asset later */}
            <img 
              src="https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png" 
              alt="codesession-cli Dashboard Overview" 
              className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition duration-500"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Command strip marquee ── */}
      <div className="border-y border-neutral-900 py-4 overflow-hidden">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
          className="flex gap-8 whitespace-nowrap"
        >
          {MARQUEE_CMDS.map((cmd, i) => (
            <span key={i} className="text-sm font-mono text-neutral-700 flex items-center gap-8">
              <span className="text-purple-500/40">·</span>
              {cmd}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── What it tracks — 4 big feature blocks ── */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-[11px] tracking-[0.35em] text-neutral-600 mb-4">WHAT IT TRACKS</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              FOUR<br />THINGS.
            </h2>
          </div>

          <div className="space-y-px">
            {[
              {
                num: '01',
                title: 'Time',
                sub: 'Named sessions with start/stop timestamps. Duration, concurrent sessions, stale session recovery.',
                detail: 'cs start "task" · cs end -n "notes"',
                accent: 'text-purple-400',
              },
              {
                num: '02',
                title: 'Files',
                sub: 'Chokidar filesystem watcher. Detects add, change, unlink. Deduped within 1-second windows. Scoped to git root.',
                detail: '342 files across 45 sessions',
                accent: 'text-pink-400',
              },
              {
                num: '03',
                title: 'Commits',
                sub: 'Git polling every 10 seconds. Backfills on session end via git log and git diff. Hash, message, author captured.',
                detail: '156 commits · auto-captured',
                accent: 'text-violet-400',
              },
              {
                num: '04',
                title: 'AI Cost',
                sub: 'Log per-call with provider, model, and token counts. 17+ models built-in. Custom pricing support. Hard budget caps.',
                detail: '$2.34 · anthropic / claude-sonnet-4-6',
                accent: 'text-fuchsia-400',
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.05 }}
                className="group grid grid-cols-[3rem_1fr_auto] md:grid-cols-[5rem_1fr_1fr] items-center gap-6 py-8 px-6 border border-neutral-900 rounded-2xl hover:border-neutral-700 hover:bg-neutral-900/20 transition-all cursor-default"
              >
                <span className="text-xs font-mono text-neutral-700">{item.num}</span>
                <div>
                  <h3 className={`text-3xl md:text-4xl font-black tracking-tighter mb-2 ${item.accent}`}>{item.title}</h3>
                  <p className="text-sm text-neutral-500 max-w-md leading-relaxed">{item.sub}</p>
                </div>
                <code className="hidden md:block text-[11px] font-mono text-neutral-700 group-hover:text-neutral-500 transition text-right">
                  {item.detail}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard section ── */}
      <section className="py-24 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[11px] tracking-[0.35em] text-neutral-600 mb-4">CS DASHBOARD</p>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              SEE THE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">FULL PICTURE</span>
            </h2>
            <p className="text-neutral-400 leading-relaxed mb-8 max-w-sm">
              One command launches a local analytics server. Real-time KPIs, 30-day projections,
              per-model breakdowns, and activity heatmaps.
            </p>
            <div className="space-y-3">
              {[
                'Daily cost area charts',
                'Per-model and per-provider analytics',
                'Budget alert system with browser notifications',
                'Binds to 127.0.0.1 by default — stays private',
              ].map(line => (
                <div key={line} className="flex items-center gap-3 text-sm text-neutral-500">
                  <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                  {line}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <code className="text-sm font-mono px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-purple-300">
                $ cs dashboard
              </code>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {/* Tab switcher */}
            <div className="flex gap-2">
              {DASHBOARD_SHOTS.map((shot, i) => (
                <button
                  key={shot.label}
                  onClick={() => setActiveShot(i)}
                  className={`text-[11px] px-3 py-1.5 rounded-lg font-mono tracking-wide transition ${
                    activeShot === i
                      ? 'bg-neutral-800 text-white border border-neutral-700'
                      : 'text-neutral-600 hover:text-neutral-400'
                  }`}
                >
                  {shot.label}
                </button>
              ))}
            </div>
            {/* Screenshot */}
            <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-[#0c0c0c]">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/40">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-neutral-500">cs dashboard</span>
                </div>
                <span className="text-[10px] text-neutral-700 font-mono">localhost:3737</span>
              </div>
              <motion.img
                key={activeShot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                src={DASHBOARD_SHOTS[activeShot].src}
                alt={`codesession-cli dashboard — ${DASHBOARD_SHOTS[activeShot].label}`}
                className="w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Programmatic API ── */}
      <section className="py-24 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] tracking-[0.35em] text-neutral-600 mb-4">AGENT READY</p>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
                BUILT FOR<br />AGENTS TOO
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8 max-w-sm">
                Full programmatic TypeScript API. Wrap your agent loop. Set hard budget caps.
                Ships as an OpenClaw skill on ClawHub.
              </p>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  ['BudgetExceededError', 'hard caps via thrown exception'],
                  ['session.canAfford(n)', 'check before expensive calls'],
                  ['--json flag', 'machine-readable, never prompts'],
                  ['clawhub install codesession', 'one-line OpenClaw setup'],
                ].map(([code, label]) => (
                  <div key={code} className="flex items-center gap-4">
                    <code className="text-[11px] text-purple-300 font-mono bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-lg shrink-0">
                      {code}
                    </code>
                    <span className="text-neutral-600 text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-neutral-800 bg-[#0c0c0c]"
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-800 bg-neutral-900/30">
                <span className="w-2 h-2 rounded-full bg-purple-400/60" />
                <span className="text-[11px] font-mono text-neutral-600">agent.ts</span>
              </div>
              <pre className="p-5 text-[12px] font-mono leading-relaxed overflow-x-auto text-neutral-400">
<span className="text-neutral-600">import</span> {`{ AgentSession, BudgetExceededError }`}{'\n'}
<span className="text-neutral-600">  from</span> <span className="text-green-400/80">'codesession-cli/agents'</span>{'\n'}
{'\n'}
<span className="text-neutral-600">const</span> session = <span className="text-purple-400">new</span> AgentSession({'\n'}
  <span className="text-neutral-300">'Refactor auth'</span>,{'\n'}
  {`{`} budget: <span className="text-orange-400">5.00</span>, git: <span className="text-blue-400">true</span> {`}`}{'\n'}
){'\n'}
{'\n'}
session.<span className="text-yellow-400/80">start</span>(){'\n'}
{'\n'}
<span className="text-neutral-600">// mid-session affordability check</span>{'\n'}
<span className="text-neutral-600">if</span> (!session.<span className="text-yellow-400/80">canAfford</span>(<span className="text-orange-400">2.00</span>)) {`{`}{'\n'}
  <span className="text-neutral-600">// switch to cheaper model</span>{'\n'}
{`}`}{'\n'}
{'\n'}
<span className="text-neutral-600">const</span> summary = session.<span className="text-yellow-400/80">end</span>(){'\n'}
<span className="text-neutral-600">{'// → { duration, cost, files, commits }'}</span>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Stats — big number section ── */}
      <section className="py-24 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-neutral-900">
            {[
              { value: <CostCounter />, label: 'tracked in a single month', sub: 'example session data' },
              { value: '17+', label: 'AI models with built-in pricing', sub: 'Anthropic, OpenAI, Google…' },
              { value: '100%', label: 'local — no cloud, no telemetry', sub: 'SQLite at ~/.codesession/' },
              { value: 'v2.0', label: 'web dashboard release', sub: 'charts, heatmaps, alerts' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0a0a0a] p-8 flex flex-col justify-between min-h-[180px]"
              >
                <div className="text-4xl md:text-5xl font-black tracking-tighter text-white">
                  {s.value}
                </div>
                <div>
                  <div className="text-sm text-neutral-400 mb-1">{s.label}</div>
                  <div className="text-[11px] text-neutral-700">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 px-6 md:px-12 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <p className="text-[11px] tracking-[0.35em] text-neutral-600 mb-4">PRICING</p>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
              SIMPLE<br />PLANS.
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Free */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-neutral-800 bg-[#0c0c0c] hover:border-neutral-700 transition flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <div className="text-3xl font-black tracking-tighter mb-6">$0<span className="text-sm font-normal text-neutral-500 tracking-normal"> Forever</span></div>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Local CLI tracking</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Local SQLite storage</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Basic dashboard (localhost)</li>
              </ul>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-purple-500/50 bg-[#0c0c0c] relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-lg">POPULAR</div>
              <h3 className="text-xl font-bold mb-2 text-purple-400">Pro</h3>
              <div className="text-3xl font-black tracking-tighter mb-2">$12<span className="text-sm font-normal text-neutral-500 tracking-normal">/mo</span></div>
              <p className="text-xs text-neutral-500 mb-6">Or $120/yr. 14-day free trial.</p>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Everything in Free</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Encrypted cloud sync</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Advanced cost anomaly alerts</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Semantic Token Caching Proxy</li>
              </ul>
            </motion.div>

            {/* Team */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl border border-neutral-800 bg-[#0c0c0c] hover:border-neutral-700 transition flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">Team</h3>
              <div className="text-3xl font-black tracking-tighter mb-6">$25<span className="text-sm font-normal text-neutral-500 tracking-normal">/seat/mo</span></div>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Everything in Pro</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Shared API budget wallets</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Centralized team web dashboard</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Slack/Teams alerting</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> GitHub Actions CI/CD breaker</li>
              </ul>
            </motion.div>
            
            {/* Enterprise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-neutral-800 bg-[#0c0c0c] hover:border-neutral-700 transition flex flex-col"
            >
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-3xl font-black tracking-tighter mb-6">Custom</div>
              <ul className="space-y-4 text-sm text-neutral-400">
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> Everything in Team</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> SAML SSO (Okta, Entra ID)</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> SOC2 compliance guarantees</li>
                <li className="flex items-start gap-3"><span className="text-purple-400 shrink-0">✓</span> On-premise proxy deployment</li>
              </ul>
            </motion.div>
          </div>
          
          {/* Launch Promo */}
          <div className="mt-8 text-center">
            <p className="text-sm text-neutral-500">
              <span className="text-purple-400 font-bold">LAUNCH PROMO:</span> Solo developer? Grab the <span className="text-neutral-300 font-semibold">Pro Lifetime license for $249</span> (Limited time only).
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-40 px-6 relative overflow-hidden border-t border-neutral-900">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[300px] bg-purple-600/8 rounded-full blur-[120px]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            INSTALL.<br />
            <span className="text-neutral-700">TRACK.</span><br />
            KNOW.
          </h2>
          <p className="text-neutral-600 text-sm mb-12">Works in any git repo. No config file required.</p>

          <button
            onClick={copy}
            className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-purple-500/50 transition-all font-mono text-sm mb-10"
          >
            <span className="text-purple-400">$</span>
            <span className="text-white">npm install -g codesession-cli</span>
            <span className={`text-[11px] ml-2 transition ${copied ? 'text-green-400' : 'text-neutral-700 group-hover:text-neutral-400'}`}>
              {copied ? '✓' : 'copy'}
            </span>
          </button>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="https://github.com/brian-mwirigi/codesession-cli" target="_blank" rel="noopener noreferrer"
              className="px-7 py-3 bg-white text-black text-xs tracking-widest font-semibold rounded-full hover:bg-neutral-200 transition">
              GITHUB →
            </a>
            <a href="https://www.npmjs.com/package/codesession-cli" target="_blank" rel="noopener noreferrer"
              className="px-7 py-3 border border-neutral-800 text-xs tracking-widest rounded-full hover:border-neutral-500 transition">
              NPM
            </a>
            <Link href="/docs/codesession-cli-docs"
              className="px-7 py-3 border border-neutral-800 text-xs tracking-widest rounded-full hover:border-neutral-500 transition">
              DOCS
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ── Semantic keyword section for crawlers ── */}
      <section className="sr-only" aria-label="About codesession-cli">
        <h2>codesession-cli — Free CLI to Track Coding Sessions and AI Costs</h2>
        <p>
          codesession-cli (also written as codesession cli or code session cli) is an open-source
          Node.js command-line tool published on npm. It tracks developer coding sessions including
          session duration, file changes, git commits, and AI API costs. Supported AI providers
          include Anthropic (Claude), OpenAI (GPT-4o, GPT-4), Google (Gemini), Azure OpenAI, and
          Cohere — with built-in pricing for 17+ models.
        </p>
        <p>
          Install with: npm install -g codesession-cli. Use cs start to begin a session, cs log-ai
          to record AI usage costs, cs end to finish and summarize, and cs dashboard to open the
          real-time web analytics UI at localhost:3737.
        </p>
        <p>
          All data is stored locally in a SQLite database at ~/.codesession/sessions.db. No cloud
          sync, no telemetry. codesession-cli also ships with a full programmatic TypeScript API for
          AI agent workflows, budget enforcement via BudgetExceededError, and an OpenClaw skill
          available on ClawHub.
        </p>
        <h3>Keywords</h3>
        <p>
          codesession-cli, codesession cli, coding session tracker, code session tracker, AI cost
          tracking CLI, AI API cost tracker, track AI costs developer, claude cost tracker, openai
          cost tracker cli, anthropic cost tracker, gpt4 cost tracking, llm cost tracker, developer
          session tracker, coding time tracker, terminal session tracker, npm session tracker,
          git commit session tracker, file change tracker cli, developer productivity cli,
          ai agent session manager, openclaw codesession, free developer time tracker cli,
          open source coding session tracker
        </p>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-900 py-7 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-neutral-700">
          <span className="font-mono">CostHQ (codesession-cli) · MIT · by Brian Munene</span>
          <span className="font-mono">npm install -g codesession-cli</span>
          <Link href="/" className="hover:text-white transition tracking-widest">
            PORTFOLIO →
          </Link>
        </div>
      </footer>
    </main>
  )
}
