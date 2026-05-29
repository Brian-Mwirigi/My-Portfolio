'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function CostHQ() {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText('npm install -g codesession-cli')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="bg-white text-slate-900 min-h-screen overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 font-sans relative">
      
      {/* ── Background Dot Grid ── */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* ── Nav ── */}
      <nav className="relative z-50 px-6 py-6 flex justify-between items-center max-w-7xl mx-auto bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="flex items-center">
          <img src="/logo/light.png" alt="CostHQ Logo" className="h-8 w-auto" />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition">Portfolio</Link>
          <a href="#features" className="hover:text-slate-900 transition">Features</a>
          <a href="#pricing" className="hover:text-slate-900 transition">Pricing</a>
          <a href="https://github.com/brian-mwirigi/codesession-cli" className="hover:text-slate-900 transition">Documentation</a>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/brian-mwirigi/codesession-cli"
            target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 transition"
            aria-label="GitHub Repository"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <button className="bg-slate-900 text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-slate-800 transition">
            Sign In
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative z-10 pt-28 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-3 bg-white border border-slate-200 rounded px-3 py-1 shadow-sm mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-[13px] font-semibold text-slate-800 tracking-wide uppercase">Version 2.0 Available</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[3.5rem] md:text-[5rem] leading-[1.1] font-bold tracking-tight text-slate-900 mb-6"
          >
            Track, Audit, and Control <br className="hidden md:block" />
            Agent Expenditure.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl font-normal leading-relaxed"
          >
            The enterprise-grade observability platform for tracking infrastructure costs, developer sessions, and API usage across multi-provider deployments.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-center gap-6 w-full"
          >
            {/* Install box (macOS Terminal Style) */}
            <div className="w-full max-w-[28rem] rounded-lg overflow-hidden border border-slate-300 shadow-xl shadow-slate-200/50 bg-white text-left">
              <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                </div>
                <span className="mx-auto text-[11px] font-mono text-slate-500">bash</span>
              </div>
              <div className="px-6 py-5 flex items-center justify-between">
                <code className="text-sm font-mono text-slate-800">
                  <span className="text-slate-400 select-none mr-2">$</span>
                  npm install -g codesession-cli
                </code>
                <button onClick={copy} className="text-slate-400 hover:text-slate-600 transition" aria-label="Copy command">
                  {copied ? (
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
              <Link href="#pricing" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded font-medium transition shadow-sm border border-transparent">
                Start Free Trial
              </Link>
              <a href="https://github.com/brian-mwirigi/codesession-cli" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-white hover:bg-slate-50 text-slate-800 px-8 py-3 rounded font-medium transition shadow-sm border border-slate-300">
                View Documentation
              </a>
            </div>
          </motion.div>
        </div>

        {/* Integration Points */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          className="mt-28 max-w-4xl mx-auto border-t border-slate-200 pt-8"
        >
          <p className="text-[11px] uppercase tracking-widest text-slate-500 mb-6 font-semibold">Integrates securely with</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {['OpenAI', 'Anthropic', 'Google Gemini', 'Azure AI', 'Cohere', 'Local LLMs'].map((provider) => (
              <div key={provider} className="px-4 py-2 border border-slate-200 bg-white rounded text-sm font-medium text-slate-600 shadow-sm">
                {provider}
              </div>
            ))}
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
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="ml-auto text-[11px] font-mono text-slate-500">localhost:3737</span>
          </div>
          <img 
            src="https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png" 
            alt="CostHQ Dashboard Overview" 
            className="w-full h-auto object-cover border-b border-slate-100"
          />
        </motion.div>
      </section>

      {/* ── What it tracks — Professional Bento Box ── */}
      <section id="features" className="py-24 px-6 md:px-12 bg-slate-50 border-y border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Core Observability Modules
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              A comprehensive toolkit for auditing application behavior and expenditure, engineered for strict compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)]">
            
            {/* Main Wide Card - Token Cost */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="md:col-span-2 p-8 border border-slate-200 rounded-xl bg-white flex flex-col shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center border border-blue-100">
                  <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <code className="text-[11px] font-mono text-slate-500 bg-slate-50 px-3 py-1 rounded border border-slate-200">
                  cs log-ai --provider anthropic
                </code>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Expenditure & Token Auditing</h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                Log API calls with exact provider, model, and token counts. Built-in pricing definitions for 17+ commercial models alongside custom pricing support for self-hosted instances. Strict budget enforcement prevents runaway scripts.
              </p>
            </motion.div>

            {/* Side Card - Commits */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="p-8 border border-slate-200 rounded-xl bg-white flex flex-col shadow-sm"
            >
              <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center border border-slate-200 mb-6">
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">VCS Telemetry</h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                Automated Git polling captures commit hashes, messages, and authorship. Backfills historical data on session termination via standard diff analysis.
              </p>
            </motion.div>

            {/* Bottom Card 1 - Filesystem */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="p-8 border border-slate-200 rounded-xl bg-white flex flex-col shadow-sm"
            >
              <div className="w-10 h-10 rounded bg-slate-50 flex items-center justify-center border border-slate-200 mb-6">
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Filesystem Watcher</h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                Chokidar-based event monitoring detects structural changes, scoped exclusively to the repository root to ensure host isolation.
              </p>
            </motion.div>

            {/* Bottom Card 2 - Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}
              className="md:col-span-2 p-8 border border-slate-200 rounded-xl bg-white flex flex-col justify-center shadow-sm relative overflow-hidden"
            >
              <div className="relative z-10 w-full lg:w-2/3">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Session & Duration Control</h3>
                <p className="text-slate-600 leading-relaxed">
                  Cryptographically identified sessions with precise duration tracking. Supports concurrent execution environments and automated recovery protocols for stale or interrupted processes.
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <code className="text-xs font-mono text-slate-600 px-3 py-1.5 rounded border border-slate-200 bg-slate-50">
                    cs start "data-pipeline"
                  </code>
                  <span className="text-slate-400 text-sm">&rarr;</span>
                  <code className="text-xs font-mono text-slate-600 px-3 py-1.5 rounded border border-slate-200 bg-slate-50">
                    cs end
                  </code>
                </div>
              </div>
              {/* Decorative accent graphic in the background of this card */}
              <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-slate-50 border-l border-slate-100 hidden lg:flex items-center justify-center">
                 <svg className="w-16 h-16 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Programmatic API ── */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-6">
              Native TypeScript SDK
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Implement strict architectural controls programmatically. Wrap operational loops and enforce expenditure limits via automated circuit breakers.
            </p>
            <div className="space-y-4">
              {[
                { code: 'BudgetExceededError', label: 'Circuit breaker exception handling' },
                { code: 'session.canAfford(n)', label: 'Pre-flight expenditure validation' },
                { code: '--json flag', label: 'Standardized machine-readable outputs' },
              ].map(({ code, label }) => (
                <div key={code} className="flex items-center gap-4 border-b border-slate-100 pb-4">
                  <code className="text-[11px] text-slate-700 font-mono bg-slate-50 border border-slate-200 px-2.5 py-1 rounded">
                    {code}
                  </code>
                  <span className="text-slate-600 text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/50"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-200 bg-slate-50">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
              <span className="ml-2 text-[11px] font-mono text-slate-500">pipeline.ts</span>
            </div>
            <pre className="p-6 text-[13px] font-mono leading-relaxed overflow-x-auto bg-white text-slate-800">
<span className="text-blue-600">import</span> {`{ AgentSession, BudgetExceededError }`}{'\n'}
<span className="text-blue-600">  from</span> <span className="text-green-700">'codesession-cli/agents'</span>{'\n'}
{'\n'}
<span className="text-blue-600">const</span> session = <span className="text-blue-600">new</span> AgentSession({'\n'}
  <span className="text-green-700">'ETL processing'</span>,{'\n'}
  {`{`} budget: <span className="text-orange-600">5.00</span>, git: <span className="text-blue-600">true</span> {`}`}{'\n'}
){'\n'}
{'\n'}
session.start(){'\n'}
{'\n'}
<span className="text-slate-400">// Mid-process validation</span>{'\n'}
<span className="text-blue-600">if</span> (!session.canAfford(<span className="text-orange-600">2.00</span>)) {`{`}{'\n'}
  <span className="text-slate-400">// Failsafe execution route</span>{'\n'}
{`}`}{'\n'}
{'\n'}
<span className="text-blue-600">const</span> metrics = session.end(){'\n'}
            </pre>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24 px-6 md:px-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Licensing
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Transparent, predictable flat-rate licensing for engineering teams.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="p-8 rounded-xl border border-slate-200 bg-white flex flex-col hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Free Tier</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">$0<span className="text-sm font-medium text-slate-500"> / forever</span></div>
              <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Full CLI access & built-in AI pricing</li>
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Local SQLite Database & Git Integration</li>
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Basic Dashboard & session history</li>
              </ul>
              <button className="w-full py-2.5 rounded border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Download Free</button>
            </div>

            {/* Pro Subscription */}
            <div className="p-8 rounded-xl border-2 border-slate-900 bg-white shadow-xl shadow-slate-200/50 relative flex flex-col z-10">
              <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded-bl rounded-tr-lg uppercase">Recommended</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pro Subscription</h3>
              <div className="text-4xl font-bold text-slate-900 mb-2">$12<span className="text-sm font-medium text-slate-500"> / month</span></div>
              <p className="text-xs text-slate-500 mb-6">Billed monthly. Cancel anytime.</p>
              <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> The Spend Firewall & Custom Pricing</li>
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Runaway Agent Alerts & Alarms Dashboard</li>
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Advanced Insights (Heatmaps, Hotspots)</li>
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Shareable Stats Card & CSV Export</li>
              </ul>
              <button className="w-full py-2.5 rounded bg-slate-900 text-white font-semibold hover:bg-slate-800 transition">Get Pro</button>
            </div>

            {/* Pro Lifetime */}
            <div className="p-8 rounded-xl border border-slate-200 bg-white flex flex-col hover:shadow-md transition">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Pro Lifetime</h3>
              <div className="text-4xl font-bold text-slate-900 mb-6">$249<span className="text-sm font-medium text-slate-500"> / once</span></div>
              <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-grow">
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> All Pro Tier features included forever</li>
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Pay once, own it forever</li>
                <li className="flex items-start gap-3"><svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg> Lifetime updates & future Pro features</li>
              </ul>
              <button className="w-full py-2.5 rounded border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition">Get Lifetime</button>
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
      <footer className="border-t border-slate-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <img src="/logo/light.png" alt="CostHQ Logo" className="h-6 w-auto opacity-80" />
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
