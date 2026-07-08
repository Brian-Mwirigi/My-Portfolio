'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { CrackedPost } from '@/lib/cracked'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/ /g, '-')
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (children && typeof children === 'object' && 'props' in (children as object)) {
    return extractText((children as React.ReactElement).props.children)
  }
  return ''
}

const headingComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(extractText(children))
    return (
      <h1 id={id} {...props}>
        {children}
      </h1>
    )
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(extractText(children))
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    )
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(extractText(children))
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    )
  },
}

const proseClasses = `prose prose-invert prose-lg max-w-none
  prose-headings:font-bold prose-headings:tracking-tight
  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-neutral-800
  prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
  prose-p:text-neutral-300 prose-p:leading-relaxed
  prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline
  prose-strong:text-white
  prose-code:text-pink-400 prose-code:bg-neutral-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
  prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl
  prose-ul:text-neutral-300 prose-ol:text-neutral-300
  prose-li:marker:text-neutral-600
  prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-neutral-900/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
  prose-table:border prose-table:border-neutral-800 prose-table:text-sm
  prose-th:bg-neutral-900 prose-th:border prose-th:border-neutral-800 prose-th:p-3
  prose-td:border prose-td:border-neutral-800 prose-td:p-3
  prose-hr:border-neutral-800`

export default function CrackedContent({ post }: { post: CrackedPost }) {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/cracked" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← CRACKED
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">
          {post.week != null ? `WEEK ${post.week}` : post.phase || 'ARTIFACT'}
        </span>
        <div className="w-12" />
      </nav>

      <article className="pt-32 px-8 md:px-16 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <header className="mb-12">
              <div className="flex flex-wrap items-center gap-3 mb-6 text-xs tracking-widest text-neutral-500">
                {post.phase && (
                  <span className="px-3 py-1 border border-neutral-800 rounded-full">{post.phase}</span>
                )}
                {post.week != null && <span className="font-mono">WK {post.week}</span>}
                <span>
                  {new Date(post.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">{post.title}</h1>
              <p className="text-xl text-neutral-400">{post.excerpt}</p>
            </header>

            <div className={proseClasses}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={headingComponents}>
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-16 pt-8 border-t border-neutral-800">
              <Link
                href="/cracked"
                className="inline-block px-6 py-3 border border-neutral-700 rounded-full text-sm tracking-widest hover:bg-white hover:text-black transition"
              >
                ALL CRACKED →
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

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
