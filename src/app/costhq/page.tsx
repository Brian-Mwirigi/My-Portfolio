'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Clipboard,
  Code2,
  Database,
  GitBranch,
  ShieldCheck,
  Terminal,
  Timer,
  WalletCards,
} from 'lucide-react'

const installModes = [
  {
    id: 'one-liner',
    label: 'One-liner',
    platform: 'macOS & Linux',
    command: 'curl -fsSL https://costhq.dev/install.sh | bash',
    lines: [
      '# Works everywhere. Installs everything. You are welcome.',
      '$ curl -fsSL https://costhq.dev/install.sh | bash',
    ],
  },
  {
    id: 'npm',
    label: 'npm',
    platform: 'Windows',
    command: 'npm install -g codesession-cli',
    lines: [
      '# Install CostHQ',
      '$ npm install -g codesession-cli',
      '',
      '# Start a tracked coding session',
      '$ cs start "ship-costhq"',
      '',
      '# Open the local dashboard',
      '$ cs dashboard',
    ],
  },
  {
    id: 'hackable',
    label: 'Hackable',
    platform: 'Source',
    command: 'git clone https://github.com/brian-mwirigi/codesession-cli.git',
    lines: [
      '# For people who read source code for fun',
      '$ git clone https://github.com/brian-mwirigi/codesession-cli.git',
      '$ cd codesession-cli && npm install',
      '$ npm run build',
      '$ node dist/src/index.js dashboard',
    ],
  },
]

const capabilities = [
  { icon: Timer, title: 'Time', text: 'Tracks when sessions start, pause, recover, and end.' },
  { icon: GitBranch, title: 'Git', text: 'Captures commits, branches, messages, and authorship.' },
  { icon: Code2, title: 'Files', text: 'Watches hot paths and file bursts while you work.' },
  { icon: WalletCards, title: 'AI spend', text: 'Logs provider, model, tokens, and session cost.' },
  { icon: ShieldCheck, title: 'Budgets', text: 'Stops scripts and agents before cost gets weird.' },
  { icon: Database, title: 'Local data', text: 'Keeps the ledger on your machine in SQLite.' },
]

const quotes = [
  {
    text: 'This is the first time a coding session has felt like it came with a receipt.',
    author: '@local_builder',
  },
  {
    text: 'I can finally explain client work with time, commits, changed files, and AI cost in one place.',
    author: '@ship_fast',
  },
  {
    text: 'The local-first part is the point. I want telemetry without handing over my repo history.',
    author: '@terminal_only',
  },
  {
    text: 'Budget gates around AI agents should have existed from day one. CostHQ makes it obvious.',
    author: '@agent_loop',
  },
  {
    text: 'It feels like git status for development cost. Blunt, fast, and actually useful.',
    author: '@cli_person',
  },
]

const notes = [
  {
    date: 'Jun 2, 2026',
    title: 'Track AI API costs across multiple providers',
    href: '/costhq/blog/tracking-api-costs-multiple-providers',
  },
  {
    date: 'May 31, 2026',
    title: 'Why local-first matters for developer telemetry',
    href: '/costhq/blog/why-local-first-matters',
  },
]

export default function CostHQPage() {
  const [activeMode, setActiveMode] = useState(installModes[0])
  const [copied, setCopied] = useState(false)

  const copyCommand = async () => {
    await navigator.clipboard.writeText(activeMode.command)
    setCopied(true)
    setTimeout(() => setCopied(false), 1400)
  }

  return (
    <main className="chq-stars min-h-screen overflow-hidden bg-[#050812] text-[#eef4ff]">
      <section className="px-5 pt-28 md:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="chq-hero-mark mx-auto mb-9"
            aria-hidden="true"
          >
            <span />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="chq-gradient-title text-6xl font-black leading-none tracking-[-0.04em] md:text-8xl lg:text-9xl"
          >
            CostHQ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="mt-5 text-xl font-black uppercase tracking-[0.22em] text-[#00f5c8] md:text-2xl"
          >
            Track it. Price it. Ship it.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="mx-auto mt-9 max-w-4xl text-xl leading-9 text-[#929cb8] md:text-2xl"
          >
            Records coding time, file changes, commits, and AI model spend.
            All from the CLI and a local dashboard you already control.
          </motion.p>
        </div>
      </section>

      <section className="px-5 pb-12 pt-20 md:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center gap-3">
            <span className="text-4xl font-black leading-none text-[#00f5c8]">&gt;</span>
            <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">Quick Start</h2>
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[#1e2940] bg-[#101827] shadow-2xl shadow-black/40">
            <div className="flex flex-col gap-3 border-b border-[#1e2940] bg-[#0b1220] px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full bg-[#ff5f57]" />
                <span className="h-4 w-4 rounded-full bg-[#ffbd2e]" />
                <span className="h-4 w-4 rounded-full bg-[#28c840]" />
                <div className="ml-3 flex rounded-lg bg-[#080d18] p-1">
                  {installModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setActiveMode(mode)}
                      className={`rounded-md px-4 py-2 font-mono text-sm transition ${
                        activeMode.id === mode.id
                          ? 'bg-[#00f5c8] text-[#04100d]'
                          : 'text-[#65708d] hover:text-[#cbd5f1]'
                      }`}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-md bg-[#080d18] px-4 py-2 font-mono text-sm text-[#65708d]">
                  {activeMode.platform}
                </span>
                <span className="rounded-md border border-[#26344f] px-4 py-2 font-mono text-sm text-[#65708d]">
                  BETA
                </span>
              </div>
            </div>

            <div className="relative bg-[#121b2c] px-6 py-7 md:px-8">
              <button
                onClick={copyCommand}
                className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#202b40] text-[#7e89a6] transition hover:text-[#00f5c8]"
                aria-label="Copy command"
              >
                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              </button>

              <pre className="overflow-x-auto pr-12 font-mono text-base leading-8 md:text-lg">
                {activeMode.lines.map((line, index) => (
                  <div
                    key={`${activeMode.id}-${index}`}
                    className={
                      line.startsWith('#')
                        ? 'italic text-[#66718e]'
                        : line.startsWith('$')
                          ? 'font-bold text-[#eef4ff]'
                          : 'text-[#00f5c8]'
                    }
                  >
                    {line.startsWith('$') ? (
                      <>
                        <span className="text-[#00f5c8]">$</span>
                        {line.slice(1)}
                      </>
                    ) : (
                      line || ' '
                    )}
                  </div>
                ))}
              </pre>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-4xl text-center text-lg leading-8 text-[#65708d]">
            Works on macOS, Linux, and Windows. CostHQ stores sessions locally and opens a dashboard
            on localhost when you want to inspect the receipt.
          </p>
        </div>
      </section>

      <section id="features" className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black leading-none text-[#00f5c8]">&gt;</span>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">What It Tracks</h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="rounded-2xl border border-[#172239] bg-[#08101f]/80 p-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#00f5c8]/10 text-[#00f5c8]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black tracking-[-0.03em] text-white">{item.title}</h3>
                  <p className="mt-3 text-lg leading-8 text-[#8590ad]">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl font-black leading-none text-[#00f5c8]">&gt;</span>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">What People Say</h2>
            </div>
            <a href="#latest" className="hidden text-lg font-semibold text-[#00f5c8] hover:text-white md:block">
              View all -&gt;
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((quote, index) => (
              <figure
                key={quote.author}
                className={`rounded-2xl border border-[#172239] bg-[#08101f]/80 p-6 ${index === 2 ? 'hidden lg:block' : ''}`}
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00f5c8] font-black text-[#04100d]">
                    {quote.author.slice(1, 3).toUpperCase()}
                  </div>
                  <figcaption className="font-black text-[#00f5c8]">{quote.author}</figcaption>
                </div>
                <blockquote className="text-lg font-semibold leading-8 text-[#929cb8]">"{quote.text}"</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="latest" className="px-5 pb-28 pt-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#00f5c8]">Latest</p>
              <h2 className="text-3xl font-black tracking-[-0.04em] text-white md:text-4xl">
                Product notes with docs-level depth.
              </h2>
            </div>
            <a href="/costhq/blog" className="hidden text-lg font-semibold text-[#00f5c8] hover:text-white md:block">
              Read all
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {notes.map((note, index) => (
              <a
                key={note.href}
                href={note.href}
                className={`group rounded-2xl border border-[#172239] p-7 transition hover:border-[#00f5c8]/70 ${
                  index === 0 ? 'bg-[#101827]' : 'bg-[#08101f]/80'
                }`}
              >
                <div className="mb-7 flex items-center gap-4">
                  {index === 0 && (
                    <span className="rounded-full bg-[#00f5c8] px-4 py-2 text-sm font-black text-[#04100d]">
                      LATEST
                    </span>
                  )}
                  <span className="text-lg font-semibold text-[#65708d]">{note.date}</span>
                </div>
                <h3 className="text-2xl font-black leading-tight tracking-[-0.03em] text-white md:text-3xl">
                  {note.title}
                </h3>
                <div className="mt-8 inline-flex items-center gap-2 font-black text-[#00f5c8] transition group-hover:gap-3">
                  Read note
                  <ArrowRight className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
