import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import BlogGrid from './BlogGrid'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← BACK
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">BLOG</span>
        <div className="w-12" />
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div>
            <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">THOUGHTS & BUILDS</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">BLOG</h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              Updates on my builds, projects, and random tech thoughts. Sharing what I learn along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <BlogGrid posts={posts} />

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
