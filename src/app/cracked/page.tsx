import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllCrackedPosts } from '@/lib/cracked'
import CrackedGrid from './CrackedGrid'

export const metadata: Metadata = {
  title: 'BIP-100 — Project CRACKED',
  description: 'One post a week on what I actually built or broke. Personal log.',
}

export default function CrackedPage() {
  const posts = getAllCrackedPosts()

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← BACK
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">CRACKED</span>
        <div className="w-12" />
      </nav>

      <section className="pt-20 pb-8 px-6 md:px-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            BIP-100
          </h1>
          <p className="text-neutral-500 text-sm">
            Personal.
          </p>
        </div>
      </section>

      <CrackedGrid posts={posts} />

      <footer className="border-t border-neutral-800 py-8 px-8">
        <div className="max-w-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <span>© 2026 BRIAN MUNENE MWIRIGI</span>
          <Link href="/" className="hover:text-white transition">
            BACK TO HOME →
          </Link>
        </div>
      </footer>
    </main>
  )
}
