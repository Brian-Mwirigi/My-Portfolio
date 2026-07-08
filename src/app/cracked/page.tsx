import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCrackedPosts } from '@/lib/cracked'
import CrackedGrid from './CrackedGrid'

export const metadata: Metadata = {
  title: 'CRACKED — Brian Munene Mwirigi',
  description: 'What I learned this week — bugs, numbers, and the stuff that finally clicked.',
  alternates: {
    canonical: 'https://www.brianmunene.me/cracked',
  },
  openGraph: {
    title: 'CRACKED — Brian Munene Mwirigi',
    description: 'What I learned this week — bugs, numbers, and the stuff that finally clicked.',
    url: 'https://www.brianmunene.me/cracked',
    type: 'website',
  },
}

export default function CrackedPage() {
  const posts = getAllCrackedPosts()

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← BACK
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">CRACKED</span>
        <div className="w-12" />
      </nav>

      <section className="pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
            Stuff I&apos;m figuring out
          </h1>
          <p className="text-neutral-400 text-lg max-w-xl leading-relaxed">
            One post a week on what I actually built.
          </p>
        </div>
      </section>

      <CrackedGrid posts={posts} />

      <footer className="border-t border-neutral-800 py-8 px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <span>© 2026 BRIAN MUNENE MWIRIGI</span>
          <Link href="/" className="hover:text-white transition">
            BACK TO HOME →
          </Link>
        </div>
      </footer>
    </main>
  )
}
