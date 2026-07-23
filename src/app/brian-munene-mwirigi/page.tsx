import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brian Munene Mwirigi — Full Stack Developer | Nairobi, Kenya',
  description: 'Brian Munene Mwirigi (Brian Mwirigi) is a Full Stack Developer and Computer Science student at Strathmore University, Nairobi, Kenya. Creator of triton-blackhole, AUX, COBBLE, CostHQ, aitoken-cli, and more.',
  keywords: 'Brian Munene Mwirigi, Brian Mwirigi, Brian Munene, Full Stack Developer Nairobi, Strathmore University developer, Kenya software engineer, CLI tools developer, React TypeScript Python developer',
  openGraph: {
    title: 'Brian Munene Mwirigi — Full Stack Developer | Nairobi, Kenya',
    description: 'Full Stack Developer and CS student at Strathmore University. Building CLI tools, Chrome extensions, and full-stack applications.',
    type: 'profile',
    url: 'https://www.brianmunene.me/brian-munene-mwirigi',
  },
  alternates: {
    canonical: 'https://www.brianmunene.me/brian-munene-mwirigi',
  },
}

const tools = [
  { name: 'AUX', desc: 'Spotify, for your AI. Vibe DJ, roast cards, party rooms, and auto-DJ as a full Spotify MCP for Cursor and Claude.', npm: 'https://www.npmjs.com/package/spotify-aux', github: 'https://github.com/brian-mwirigi/aux-mcp', docs: '/aux-mcp' },
  { name: 'aitoken-cli', desc: 'Track AI API costs locally across OpenAI, Anthropic, Google, Azure & Cohere. 41+ models supported.', npm: 'https://www.npmjs.com/package/aitoken-cli', github: 'https://github.com/brian-mwirigi/aitoken-cli', docs: '/docs/aitoken-cli-docs' },
  { name: 'CostHQ', desc: 'Track coding sessions with automatic time tracking, file change monitoring, git commit logging, and AI cost integration.', npm: 'https://www.npmjs.com/package/codesession-cli', github: 'https://github.com/brian-mwirigi/codesession-cli', docs: '/costhq' },
  { name: 'runbook-cli', desc: 'Remember and run project commands from any subfolder. Never forget a project-specific command again.', npm: 'https://www.npmjs.com/package/runbook-cli', github: 'https://github.com/brian-mwirigi/runbook-cli', docs: '/docs/runbook-cli-docs' },
]

const extensions = [
  { name: 'TikTok Video Downloader', desc: 'Download TikTok videos in HD without watermarks.', link: 'https://chromewebstore.google.com/detail/idnanafggnifgcdleabgkhknojpbkgbf' },
  { name: 'AI Slop Blocker', desc: 'Automatically filter low-quality AI-generated content from your browsing.', link: '/ai-slop-blocker' },
  { name: 'Twitter Thread Downloader', desc: 'Save and export Twitter/X threads to readable formats.', link: 'https://chromewebstore.google.com/detail/hgcajlfkjlepfonhcbhgepdjpfmbfcai' },
  { name: 'InstantCurrency', desc: 'Real-time currency converter that works on any webpage.', link: 'https://chromewebstore.google.com/detail/plllcajmaikchnknphlajpkmdnahpolo' },
]

const stack = ['React', 'TypeScript', 'Python', 'Flask', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Next.js', 'Git']

export default function BrianMuneneMwirigiPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← HOME
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">BRIAN MUNENE MWIRIGI</span>
        <div className="w-12" />
      </nav>

      <article className="pt-32 px-8 md:px-16 pb-32 max-w-4xl mx-auto">

        {/* Identity */}
        <header className="mb-16">
          <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">FULL PROFILE</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Brian Munene<br />
            <span className="text-neutral-500">Mwirigi</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Full Stack Developer and Computer Science student at Strathmore University, Nairobi, Kenya.
            Also known as <strong className="text-white">Brian Mwirigi</strong> and <strong className="text-white">Brian Munene</strong>.
            I build CLI tools, Chrome extensions, and full-stack web applications — all open source.
          </p>
        </header>

        {/* Quick links */}
        <section className="mb-16 flex flex-wrap gap-3">
          {[
            { label: 'brianmunene.me', href: 'https://www.brianmunene.me' },
            { label: 'GitHub', href: 'https://github.com/brian-mwirigi' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/brian-munene-890993346' },
            { label: 'X / Twitter', href: 'https://x.com/BrianMMwirigi' },
            { label: 'npm', href: 'https://www.npmjs.com/~brian-mwirigi' },
            { label: 'DEV.to', href: 'https://dev.to/brian_mwirigi' },
          ].map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 border border-neutral-800 rounded-full text-sm text-neutral-400 hover:text-white hover:border-neutral-600 transition">
              {l.label} ↗
            </a>
          ))}
        </section>

        {/* About */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">About Brian Munene Mwirigi</h2>
          <div className="space-y-4 text-neutral-400 leading-relaxed">
            <p>
              Brian Munene Mwirigi is a Full Stack Developer based in Nairobi, Kenya, currently studying Computer Science at Strathmore University.
              He is best known online as <strong className="text-white">Brian Mwirigi</strong> and publishes open-source tools under the GitHub handle <a href="https://github.com/brian-mwirigi" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">brian-mwirigi</a>.
            </p>
            <p>
              Brian&apos;s focus is on developer tooling — specifically CLI utilities that solve real problems he faces as a developer who works heavily with AI APIs.
              His tools are published to npm and used by developers worldwide.
            </p>
            <p>
              Outside of tooling, Brian builds full-stack web applications in React, TypeScript, Python (Flask), and Node.js, with experience across healthcare (telemedicine), e-commerce, and SaaS domains.
            </p>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 tracking-tight">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {stack.map(t => (
              <span key={t} className="px-4 py-2 border border-neutral-800 rounded-full text-sm text-neutral-400">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* CLI Tools */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">CLI Tools by Brian Munene Mwirigi</h2>
          <p className="text-neutral-500 text-sm mb-8">All tools are open source, published to npm, and MIT licensed.</p>
          <div className="space-y-6">
            {tools.map(t => (
              <div key={t.name} className="border border-neutral-800 rounded-xl p-6 hover:border-neutral-700 transition">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="text-lg font-bold font-mono">{t.name}</h3>
                  <div className="flex gap-3 text-xs text-neutral-500 shrink-0">
                    <a href={t.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub ↗</a>
                    <a href={t.npm} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">npm ↗</a>
                    <Link href={t.docs} className="hover:text-white transition">Docs ↗</Link>
                  </div>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chrome Extensions */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-2 tracking-tight">Chrome Extensions</h2>
          <p className="text-neutral-500 text-sm mb-8">Published to the Chrome Web Store.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extensions.map(e => (
              <a key={e.name} href={e.link} target="_blank" rel="noopener noreferrer"
                className="border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition">
                <h3 className="font-bold mb-2">{e.name} ↗</h3>
                <p className="text-neutral-500 text-sm">{e.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* Location & Availability */}
        <section className="mb-16 border border-neutral-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4 tracking-tight">Location & Availability</h2>
          <dl className="space-y-3 text-sm">
            {[
              { dt: 'Full name', dd: 'Brian Munene Mwirigi' },
              { dt: 'Also known as', dd: 'Brian Mwirigi, Brian Munene' },
              { dt: 'Location', dd: 'Nairobi, Kenya (UTC+3)' },
              { dt: 'Education', dd: 'BSc Computer Science, Strathmore University' },
              { dt: 'Availability', dd: 'Open to remote work and freelance projects' },
              { dt: 'Contact', dd: 'Via brianmunene.me' },
            ].map(({ dt, dd }) => (
              <div key={dt} className="flex gap-6">
                <dt className="text-neutral-600 w-32 shrink-0">{dt}</dt>
                <dd className="text-neutral-300">{dd}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Back link */}
        <div className="text-center">
          <Link href="/" className="inline-block px-8 py-4 bg-white text-black rounded-full text-sm tracking-widest font-medium hover:bg-neutral-200 transition">
            VIEW FULL PORTFOLIO →
          </Link>
        </div>

      </article>

      <footer className="border-t border-neutral-800 py-8 px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
          <span>© 2026 Brian Munene Mwirigi</span>
          <span>Nairobi, Kenya</span>
          <Link href="/" className="hover:text-white transition">brianmunene.me</Link>
        </div>
      </footer>
    </main>
  )
}
