import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllDocs } from '@/lib/docs'
import DocsGrid from './DocsGrid'

export const metadata: Metadata = {
  title: 'Docs — Brian Munene Mwirigi',
  description: 'Documentation for CLI tools and projects by Brian Munene Mwirigi — aitoken-cli, codesession-cli, devmem-cli, runbook-cli, apisnap-cli.',
  alternates: {
    canonical: 'https://www.brianmunene.me/docs',
  },
  openGraph: {
    title: 'Docs — Brian Munene Mwirigi',
    description: 'Documentation for CLI tools and projects by Brian Munene Mwirigi.',
    url: 'https://www.brianmunene.me/docs',
    type: 'website',
  },
}

export default function DocsPage() {
  const docs = getAllDocs()

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← BACK
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">DOCS</span>
        <div className="w-12" />
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div>
            <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">DOCUMENTATION</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">DOCS</h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              Technical documentation and guides for my projects and builds. Everything you need to get started.
            </p>
          </div>
        </div>
      </section>

      {/* Docs Grid */}
      <DocsGrid docs={docs} />

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <span>© 2026 BRIAN MUNENE</span>
          <Link href="/" className="hover:text-white transition">BACK TO HOME →</Link>
        </div>
      </footer>
    </main>
  )
}
