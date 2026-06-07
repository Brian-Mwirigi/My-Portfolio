import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Terminal } from 'lucide-react'
import { getAllPosts } from '@/lib/costhq-blog'
import BlogGrid from './BlogGrid'

export const metadata: Metadata = {
  title: 'Field Notes - CostHQ',
  description: 'Guides and engineering notes about developer session tracking, AI cost analytics, and local-first automation.',
  alternates: {
    canonical: 'https://brianmunene.me/costhq/blog',
  },
  openGraph: {
    title: 'Field Notes - CostHQ',
    description: 'Guides and engineering notes from CostHQ.',
    url: 'https://brianmunene.me/costhq/blog',
    type: 'website',
  },
}

export default function CostHQBlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-[#070907] text-[#f7f3e8]">
      <section className="relative overflow-hidden border-b border-white/10 px-5 pt-28 pb-16 md:px-8">
        <div className="chq-grid-bg absolute inset-0 opacity-35" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/costhq"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#98ffc5] transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to product
          </Link>
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 border border-[#54f4a8]/30 bg-[#102218] px-3 py-2 text-sm text-[#98ffc5]">
              <Terminal className="h-4 w-4" />
              CostHQ field notes
            </div>
            <h1 className="text-5xl font-semibold leading-tight md:text-7xl">
              Practical notes on tracking dev work and AI spend.
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#c7c1b2]">
              Guides, release notes, and workflow breakdowns for developers who want measurable
              sessions, cleaner budgets, and a better record of what actually happened.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="border border-white/10 bg-[#0e130e] px-6 py-16 text-center">
              <p className="text-lg text-[#c7c1b2]">No field notes yet.</p>
              <Link href="/costhq" className="mt-5 inline-flex text-sm font-semibold text-[#54f4a8]">
                Back to CostHQ
              </Link>
            </div>
          ) : (
            <BlogGrid posts={posts} />
          )}
        </div>
      </section>
    </main>
  )
}
