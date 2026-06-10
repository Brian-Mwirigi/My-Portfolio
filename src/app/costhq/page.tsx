'use client'

import { useState } from 'react'
import { Check, Clipboard } from 'lucide-react'

const installModes = [
  {
    id: 'npm',
    label: 'npm',
    command: 'npm install -g costhq',
    lines: [
      '$ npm install -g costhq',
      '',
      '# Start tracking an agent or manual session',
      '$ cs start "Fix authentication bug"',
      '',
      '# ... files and commits track automatically ...',
      '',
      '# End and see the damage',
      '$ cs end',
      '# Session: 47m • 15 files • 4 commits • $8.47 AI cost',
    ],
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
    <main className="min-h-screen bg-[#fafaf9] text-[#1a1a1a]">

      {/* Hero */}
      <section className="border-b border-[#e5e5e3] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 pb-20 pt-32 md:px-8 lg:pt-40">
          <p className="mb-5 text-sm font-medium tracking-wide text-[#8b8b8b] uppercase">
            Developer Telemetry
          </p>
          <h1 className="max-w-4xl text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-[#111] md:text-[3.5rem] lg:text-[4.5rem]">
            Know what your AI agents cost.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-[#555]">
            Track what your AI agents cost including files, commits, tokens, and budgets. CostHQ runs locally, enforces budgets, and gives you complete visibility before the bill arrives.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="https://www.npmjs.com/package/costhq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#111] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#333]"
            >
              npm install -g costhq
            </a>
            <a
              href="https://costhq.mintlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#111] px-7 py-3.5 text-sm font-medium text-white transition hover:bg-[#333]"
            >
              Read the docs
            </a>
            <a
              href="https://github.com/brian-mwirigi/costhq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#d5d5d3] bg-white px-7 py-3.5 text-sm font-medium text-[#333] transition hover:border-[#999] hover:text-[#111]"
            >
              GitHub Source
            </a>
          </div>
        </div>
      </section>

      {/* Proof Banner */}
      <section className="border-b border-[#e5e5e3] bg-[#f5f5f3]">
        <div className="mx-auto flex max-w-[1080px] flex-col items-start gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-xl font-medium text-[#111]">
              Works seamlessly with standard frameworks
            </p>
          </div>
          <div className="flex flex-wrap gap-8 text-sm font-medium text-[#555] md:gap-12 md:text-base">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#111]"></div>
              OpenClaw (Skill available)
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#111]"></div>
              Claude Code
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[#111]"></div>
              Custom Agents (Node.js SDK)
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="border-b border-[#e5e5e3] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium tracking-widest text-[#c44] uppercase">The Problem</p>
              <h2 className="text-2xl font-semibold leading-tight text-[#111]">
                Zero visibility until the invoice arrives.
              </h2>
              <p className="mt-4 leading-relaxed text-[#666]">
                Your AI agent just ran for 45 minutes. It made 23 API calls, edited 15 files, and created 4 commits. You have no idea what it cost.
              </p>
              <p className="mt-4 leading-relaxed text-[#666]">
                OpenClaw, Claude Code, and custom agents all burn tokens with zero visibility. You only find out the damage when you check your provider's billing page.
              </p>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-widest text-[#2a7d5f] uppercase">The Fix</p>
              <h2 className="text-2xl font-semibold leading-tight text-[#111]">
                One command to start tracking. Everything logged automatically.
              </h2>
              <p className="mt-4 leading-relaxed text-[#666]">
                Just run <code className="rounded bg-[#f0f0ee] px-1.5 py-0.5 text-sm font-mono text-[#333]">cs start "Fix bug"</code>. CostHQ will automatically track the files changed and commits made using its filesystem watcher and git poller. 
              </p>
              <p className="mt-4 leading-relaxed text-[#666]">
                For API costs, use <code className="rounded bg-[#f0f0ee] px-1.5 py-0.5 text-sm font-mono text-[#333]">cs log-ai</code> from the CLI, or use our drop-in Node.js wrappers (like <code className="rounded bg-[#f0f0ee] px-1.5 py-0.5 text-sm font-mono text-[#333]">TrackedOpenAI</code>) to log every token directly to your local dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What It Does */}
      <section className="border-b border-[#e5e5e3] bg-[#fafaf9]">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8">
          <p className="mb-3 text-xs font-medium tracking-widest text-[#8b8b8b] uppercase">Features</p>
          <h2 className="mb-12 max-w-2xl text-3xl font-semibold tracking-tight text-[#111]">
            Everything you need to track, limit, and analyze agent spend.
          </h2>
          <div className="grid gap-px overflow-hidden rounded-lg border border-[#e5e5e3] bg-[#e5e5e3] md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Drop-in Node.js SDK', desc: 'Replace `new OpenAI()` with `new TrackedOpenAI()`. Works exactly like the official SDK, but logs tokens and costs directly to your local dashboard.' },
              { title: 'Programmatic Budget Gates', desc: 'Set a hard cap: `budget: 5.00`. When spend hits the threshold, CostHQ throws a `BudgetExceededError` to terminate the process.' },
              { title: 'Git & File Tracking', desc: 'Sessions automatically capture branches, commits, and file changes. Correlate agent compute costs directly to output deliverables.' },
              { title: '17+ Built-in Models', desc: 'Auto-calculates costs for major models across OpenAI, Anthropic, Google, Azure, and Cohere. Easily add custom pricing for local/edge models.' },
              { title: '100% Local SQLite Data', desc: 'All data is stored locally in `~/.costhq/sessions.db`. No telemetry. No cloud account required. Your data never leaves your machine.' },
              { title: 'Local Web Dashboard', desc: 'Run `cs dashboard` to view a rich UI on localhost. KPIs, token charts, file hotspots, cost velocity, and programmatic alert thresholds.' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8">
                <h3 className="text-lg font-semibold text-[#111]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDK vs CLI */}
      <section className="border-b border-[#e5e5e3] bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-medium tracking-widest text-[#8b8b8b] uppercase">Node.js Integration</p>
              <h2 className="text-2xl font-semibold text-[#111]">Drop-in SDK extensions</h2>
              <p className="mt-3 mb-6 text-[#666]">
                With the merge of aitoken-cli, you can use CostHQ as a drop-in Node.js library. Costs are automatically calculated and sent to your dashboard.
              </p>
              <div className="overflow-hidden rounded-lg border border-[#e5e5e3] bg-[#f5f5f3]">
                <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-[#333]">
<span className="text-[#888]">import</span> {'{ TrackedOpenAI }'} <span className="text-[#888]">from</span> 'costhq/extensions';{'\n\n'}
<span className="text-[#888]">// Works exactly like the official SDK</span>{'\n'}
<span className="text-[#888]">// Logs tokens & costs automatically!</span>{'\n'}
const openai = new TrackedOpenAI({'{ apiKey }'});{'\n'}
await openai.chat.completions.create({'{...}'});
                </pre>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-widest text-[#8b8b8b] uppercase">Programmatic API</p>
              <h2 className="text-2xl font-semibold text-[#111]">Agent Budget Enforcement</h2>
              <p className="mt-3 mb-6 text-[#666]">
                Build CostHQ directly into your custom agent frameworks. Set strict budgets and catch exceptions when they are breached.
              </p>
              <div className="overflow-hidden rounded-lg border border-[#e5e5e3] bg-[#f5f5f3]">
                <pre className="overflow-x-auto p-6 font-mono text-sm leading-relaxed text-[#333]">
<span className="text-[#888]">import</span> {'{ AgentSession }'} <span className="text-[#888]">from</span> 'costhq/agents';{'\n\n'}
const session = new AgentSession('Task', {'{\n'}
  budget: <span className="text-[#2a7d5f]">5.00</span>, <span className="text-[#888]">// Hard cap: stop at $5</span>{'\n'}
  git: true,{'\n'}
{'}'});{'\n'}
session.start();
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-[#e5e5e3] bg-[#fafaf9]">
        <div className="mx-auto max-w-[1080px] px-6 py-20 md:px-8">
          <p className="mb-3 text-xs font-medium tracking-widest text-[#8b8b8b] uppercase">Pricing</p>
          <h2 className="mb-12 text-3xl font-semibold tracking-tight text-[#111]">
            Simple pricing for serious developers.
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Free */}
            <div className="rounded-lg border border-[#e5e5e3] bg-white p-8">
              <h3 className="text-lg font-semibold text-[#111]">Hobby</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-[#111]">Free</span>
              </div>
              <p className="mt-3 text-sm text-[#888]">Everything you need to track manual sessions and solo agents.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#555]">
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />CLI session tracking</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Git and file change capture</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Local SQLite ledger</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Basic local dashboard</li>
              </ul>
              <div className="mt-8">
                <a href="https://www.npmjs.com/package/costhq" className="block w-full rounded border border-[#e5e5e3] bg-[#fafaf9] py-2.5 text-center text-sm font-medium text-[#333] hover:bg-[#f0f0ee]">
                  Install Free
                </a>
              </div>
            </div>

            {/* Pro Monthly */}
            <div className="rounded-lg border border-[#111] bg-white p-8 shadow-sm">
              <div className="mb-2 inline-block rounded bg-[#111] px-2 py-0.5 text-xs font-semibold text-white uppercase tracking-widest">
                Pro
              </div>
              <h3 className="text-lg font-semibold text-[#111]">Monthly</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-[#111]">$12</span>
                <span className="text-sm text-[#888]">/ month</span>
              </div>
              <p className="mt-3 text-sm text-[#888]">For teams and products that need active cost protection.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#555]">
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Everything in Hobby</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Hard budget gates (API)</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Node.js drop-in SDK</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Full dashboard analytics</li>
              </ul>
              <div className="mt-8">
                <button className="block w-full rounded bg-[#111] py-2.5 text-center text-sm font-medium text-white hover:bg-[#333]">
                  Subscribe Monthly
                </button>
              </div>
            </div>

            {/* Pro Lifetime */}
            <div className="rounded-lg border border-[#e5e5e3] bg-[#f5f5f3] p-8">
              <h3 className="text-lg font-semibold text-[#111]">Lifetime</h3>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-[#111]">$120</span>
                <span className="text-sm text-[#888]">pay once</span>
              </div>
              <p className="mt-3 text-sm text-[#888]">All Pro features, forever. Skip the recurring subscription.</p>
              <ul className="mt-6 space-y-3 text-sm text-[#555]">
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Everything in Pro</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Never pay another invoice</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />All future 2.x updates</li>
                <li className="flex gap-3"><span className="mt-0.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-[#111]" />Priority email support</li>
              </ul>
              <div className="mt-8">
                <button className="block w-full rounded border border-[#111] bg-white py-2.5 text-center text-sm font-medium text-[#111] hover:bg-[#f0f0ee]">
                  Get Lifetime
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
