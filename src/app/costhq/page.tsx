'use client'

import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

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

export default function CostHQ() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('npm install -g codesession-cli')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="bg-[#f8f9fa] text-slate-900 min-h-screen overflow-x-hidden selection:bg-purple-200 selection:text-purple-900 font-sans">
      
      {/* ── Background Mesh/Gradient ── */}
      <div className="absolute top-0 inset-x-0 h-[800px] pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-30 blur-[100px] bg-gradient-to-b from-indigo-100 via-purple-50 to-transparent rounded-full" />
      </div>

      {/* ── Nav ── */}
      <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-xl font-bold tracking-tight text-slate-900">CostHQ</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition">Portfolio</Link>
          <a href="#features" className="hover:text-slate-900 transition">Features</a>
          <a href="#pricing" className="hover:text-slate-900 transition">Pricing</a>
          <a href="https://github.com/brian-mwirigi/codesession-cli" className="hover:text-slate-900 transition">Docs</a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/brian-mwirigi/codesession-cli"
            target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 transition"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <button className="bg-slate-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-slate-900 transition shadow-md shadow-slate-800/20">
            Dashboard
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-28 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-1.5 shadow-sm mb-10"
          >
            <span className="text-[13px] font-semibold text-slate-800">CostHQ v2.0 Released</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[3.5rem] md:text-[5.5rem] leading-[1.05] font-bold tracking-tight text-slate-900 mb-6"
          >
            Track, Audit, & Control <br className="hidden md:block" />
            Reliable AI Agents.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl font-medium"
          >
            The leading developer platform for AI agent observability and cost auditing. 
            Tracking for OpenAI, Anthropic, Gemini, and 17+ LLMs and frameworks.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-6 w-full"
          >
            {/* Install box */}
            <div className="flex items-center justify-between bg-[#111827] text-green-400 px-6 py-4 rounded-xl font-mono text-sm w-full max-w-[26rem] shadow-xl shadow-slate-900/10 border border-slate-800">
              <span>pip install costhq <span className="text-slate-500 italic ml-2"># alias</span></span>
              <button onClick={copy} className="text-slate-400 hover:text-white transition">
                {copied ? (
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                )}
              </button>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Link href="#pricing" className="bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-8 py-3.5 rounded-lg font-semibold shadow-lg shadow-indigo-500/30 transition border border-indigo-400/20">
                Start for Free &rarr;
              </Link>
              <a href="https://github.com/brian-mwirigi/codesession-cli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#1e293b] hover:bg-[#0f172a] text-white px-8 py-3.5 rounded-lg font-semibold shadow-md transition border border-slate-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>5,584+</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Logos */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="mt-28 max-w-4xl mx-auto"
        >
          <p className="text-[13px] text-slate-500 mb-8 font-medium">Powering thousands of engineers building reliable agents</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition duration-500">
            <div className="text-2xl font-black tracking-tight text-slate-800">aggle</div>
            <div className="text-xl font-bold tracking-widest text-slate-800">wework</div>
            <div className="flex items-center gap-2"><div className="w-5 h-5 rounded bg-slate-800" /><span className="text-xl font-bold text-slate-800">Capgemini</span></div>
            <div className="text-2xl font-bold tracking-tight text-slate-800">vodafone</div>
          </div>
        </motion.div>
      </section>

      {/* ── Dashboard Product Shot ── */}
      <section className="px-6 md:px-12 pb-24 pt-10 relative z-10 max-w-[1200px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
          className="rounded-xl overflow-hidden border border-slate-200 shadow-2xl shadow-slate-300/60 bg-white"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
            <span className="ml-auto text-[11px] font-mono text-slate-400">cs dashboard (localhost:3737)</span>
          </div>
          <img 
            src="https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png" 
            alt="CostHQ Dashboard Overview" 
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </section>

      {/* ── What it tracks — 4 blocks (Light Mode) ── */}
      <section id="features" className="py-24 px-6 md:px-12 bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Four Core Pillars of Observability.
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Everything you need to trace your LLM application's behavior and cost, stored entirely locally.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Time & Sessions',
                sub: 'Named sessions with start/stop timestamps. Duration tracking, concurrent execution support, and stale session recovery.',
                detail: '$ cs start "agent-task"',
                icon: <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              },
              {
                title: 'Filesystem Watcher',
                sub: 'Chokidar filesystem watcher detects add, change, unlink events. Deduped within 1-second windows and scoped to git root.',
                detail: '342 files changed',
                icon: <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              },
              {
                title: 'Git Commits',
                sub: 'Git polling every 10 seconds. Backfills on session end via git log and git diff. Captures hash, message, and author.',
                detail: '156 commits tracked',
                icon: <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              },
              {
                title: 'AI Token Cost',
                sub: 'Log per-call with provider, model, and token counts. 17+ models built-in. Custom pricing support and hard budget caps.',
                detail: '$2.34 spent / claude-3-5',
                icon: <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-8 border border-slate-200 rounded-2xl hover:shadow-lg hover:shadow-slate-200/50 transition-shadow bg-white flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-slate-50 flex items-center justify-center mb-6 border border-slate-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 flex-grow">{item.sub}</p>
                <code className="text-[11px] font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded w-fit border border-slate-100">
                  {item.detail}
                </code>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmatic API ── */}
      <section className="py-24 px-6 md:px-12 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Built for <span className="text-indigo-600">Agents</span> Too.
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Full programmatic TypeScript API. Wrap your agent loop. Set hard budget caps to prevent runaway LLM costs.
              Available as a plugin for major agent frameworks.
            </p>
            <div className="space-y-4">
              {[
                { code: 'BudgetExceededError', label: 'Hard caps via thrown exception' },
                { code: 'session.canAfford(n)', label: 'Check before expensive calls' },
                { code: '--json flag', label: 'Machine-readable, never prompts' },
              ].map(({ code, label }) => (
                <div key={code} className="flex items-center gap-4 border-b border-slate-200 pb-4">
                  <code className="text-[11px] text-indigo-700 font-mono bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded">
                    {code}
                  </code>
                  <span className="text-slate-600 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0f1117] shadow-2xl shadow-indigo-900/5"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-[#161b22]">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
              <span className="ml-2 text-[11px] font-mono text-slate-400">agent.ts</span>
            </div>
            <pre className="p-6 text-[13px] font-mono leading-relaxed overflow-x-auto text-slate-300">
<span className="text-rose-400">import</span> {`{ AgentSession, BudgetExceededError }`}{'\n'}
<span className="text-rose-400">  from</span> <span className="text-emerald-400">'codesession-cli/agents'</span>{'\n'}
{'\n'}
<span className="text-rose-400">const</span> session = <span className="text-indigo-400">new</span> AgentSession({'\n'}
  <span className="text-emerald-400">'Refactor auth module'</span>,{'\n'}
  {`{`} budget: <span className="text-amber-400">5.00</span>, git: <span className="text-indigo-400">true</span> {`}`}{'\n'}
){'\n'}
{'\n'}
session.<span className="text-sky-400">start</span>(){'\n'}
{'\n'}
<span className="text-slate-500">// mid-session affordability check</span>{'\n'}
<span className="text-rose-400">if</span> (!session.<span className="text-sky-400">canAfford</span>(<span className="text-amber-400">2.00</span>)) {`{`}{'\n'}
  <span className="text-slate-500">// switch to cheaper model or gracefully exit</span>{'\n'}
{`}`}{'\n'}
{'\n'}
<span className="text-rose-400">const</span> summary = session.<span className="text-sky-400">end</span>(){'\n'}
<span className="text-slate-500">{'// → { duration, cost, files, commits }'}</span>
            </pre>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Simple, transparent pricing.
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              Start free, upgrade when your team scales. No hidden fees.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Free */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">$0<span className="text-sm font-medium text-slate-500"> Forever</span></div>
              <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Local CLI tracking</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Local SQLite storage</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Basic dashboard</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Get Started</button>
            </div>

            {/* Pro */}
            <div className="p-8 rounded-2xl border-2 border-indigo-500 bg-white shadow-xl shadow-indigo-100 relative flex flex-col lg:scale-105 z-10">
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl-lg rounded-tr-xl">POPULAR</div>
              <h3 className="text-lg font-bold text-indigo-600 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-slate-900 mb-2">$12<span className="text-sm font-medium text-slate-500">/mo</span></div>
              <p className="text-xs text-slate-500 mb-6">Or $120/yr. 14-day trial.</p>
              <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Everything in Free</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Encrypted cloud sync</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Advanced alerts</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Token Caching Proxy</li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-md shadow-indigo-200">Start Free Trial</button>
            </div>

            {/* Team */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Team</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">$25<span className="text-sm font-medium text-slate-500">/seat/mo</span></div>
              <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Everything in Pro</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Shared API budgets</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Team dashboard</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Slack/Teams alerts</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Contact Sales</button>
            </div>
            
            {/* Enterprise */}
            <div className="p-8 rounded-2xl border border-slate-200 bg-white flex flex-col hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">Custom</div>
              <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Everything in Team</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> SAML SSO</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> SOC2 compliance</li>
                <li className="flex items-start gap-2"><svg className="w-5 h-5 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> On-premise proxy</li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Semantic SEO Block ── */}
      <section className="sr-only" aria-label="About codesession-cli">
        <h2>codesession-cli — Free CLI to Track Coding Sessions and AI Costs</h2>
        <p>
          CostHQ (formerly codesession-cli) is an open-source Node.js command-line tool published on npm. 
          It tracks developer coding sessions including session duration, file changes, git commits, and AI API costs. 
          Supported AI providers include Anthropic (Claude), OpenAI (GPT-4o, GPT-4), Google (Gemini), 
          Azure OpenAI, and Cohere — with built-in pricing for 17+ models.
        </p>
        <p>
          Install with: npm install -g codesession-cli. Use cs start to begin a session, cs log-ai 
          to record AI usage costs, cs end to finish and summarize, and cs dashboard to open the 
          real-time web analytics UI at localhost:3737. All data is stored locally in a SQLite database 
          at ~/.codesession/sessions.db. No cloud sync, no telemetry.
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
      <footer className="border-t border-slate-200 py-12 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-semibold text-slate-800">CostHQ</span>
          </div>
          <p className="text-sm text-slate-500">© 2026 Brian Munene. MIT Licensed. (formerly codesession-cli)</p>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <a href="https://github.com/brian-mwirigi/codesession-cli" className="hover:text-slate-900 transition">GitHub</a>
            <a href="https://www.npmjs.com/package/codesession-cli" className="hover:text-slate-900 transition">NPM</a>
            <Link href="/" className="hover:text-slate-900 transition">Portfolio</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
