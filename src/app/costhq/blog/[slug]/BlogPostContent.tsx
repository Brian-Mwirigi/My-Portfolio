'use client'

import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, BookOpen } from 'lucide-react'
import type { BlogPost } from '@/lib/costhq-blog'

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <main className="min-h-screen bg-[#070907] text-[#f7f3e8]">
      <article>
        <header className="relative overflow-hidden border-b border-white/10 px-5 pt-28 pb-14 md:px-8">
          <div className="chq-grid-bg absolute inset-0 opacity-30" />
          <div className="relative mx-auto max-w-4xl">
            <Link
              href="/costhq/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#98ffc5] transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Field notes
            </Link>

            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 border border-[#54f4a8]/30 bg-[#102218] px-3 py-1.5 text-xs font-semibold text-[#98ffc5]">
                <BookOpen className="h-3.5 w-3.5" />
                {post.category}
              </span>
              <span className="text-sm text-[#928b7a]">{post.readTime}</span>
              <span className="text-sm text-[#928b7a]">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">{post.title}</h1>
            <p className="mt-6 text-lg leading-8 text-[#c7c1b2]">{post.excerpt}</p>
          </div>
        </header>

        <div className="px-5 py-14 md:px-8">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div>
              {post.image && (
                <div className="mb-10 overflow-hidden border border-white/10 bg-[#0e130e]">
                  <img src={post.image} alt={post.title} className="max-h-[420px] w-full object-cover" />
                </div>
              )}

              <div
                className="prose prose-invert prose-lg max-w-none
                prose-headings:font-semibold prose-headings:text-white
                prose-h2:mt-12 prose-h2:text-3xl
                prose-h3:mt-8 prose-h3:text-2xl
                prose-p:leading-8 prose-p:text-[#c7c1b2]
                prose-li:text-[#c7c1b2]
                prose-strong:text-white
                prose-a:text-[#54f4a8] prose-a:no-underline hover:prose-a:text-[#9dffd0]
                prose-code:rounded-none prose-code:bg-[#102218] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[#98ffc5] prose-code:before:content-none prose-code:after:content-none
                prose-pre:border prose-pre:border-white/10 prose-pre:bg-black prose-pre:text-[#d8d2c3]
                prose-blockquote:border-l-[#54f4a8] prose-blockquote:text-[#d8d2c3]"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="border border-white/10 bg-[#0e130e] p-5">
                <h2 className="text-sm font-semibold text-white">About this note</h2>
                <p className="mt-3 text-sm leading-6 text-[#928b7a]">
                  Practical CostHQ guidance for tracking work, costs, sessions, and AI-assisted delivery.
                </p>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="border border-white/10 bg-black/25 px-2.5 py-1 text-xs text-[#c7c1b2]">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/costhq/blog"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold text-[#54f4a8] transition hover:border-[#54f4a8]"
              >
                <ArrowLeft className="h-4 w-4" />
                All notes
              </Link>
            </aside>
          </div>
        </div>
      </article>
    </main>
  )
}
