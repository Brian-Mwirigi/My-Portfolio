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

const proseClasses = `prose prose-invert prose-sm md:prose-base max-w-none
  prose-headings:font-semibold prose-headings:tracking-tight
  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
  prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
  prose-p:text-neutral-400 prose-p:leading-relaxed prose-p:text-[15px]
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
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/cracked" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← CRACKED
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">
          {post.week != null ? `WEEK ${post.week}` : post.phase || 'ARTIFACT'}
        </span>
        <div className="w-12" />
      </nav>

      <article className="pt-20 px-6 md:px-10 pb-16">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 mb-3 text-[10px] tracking-widest text-neutral-500">
                {post.phase && (
                  <span className="px-2 py-0.5 border border-neutral-800 rounded-full">{post.phase}</span>
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

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">{post.title}</h1>
              <p className="text-sm text-neutral-500">{post.excerpt}</p>
            </header>

            <div className={proseClasses}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={headingComponents}>
                {post.content}
              </ReactMarkdown>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-800">
              <Link
                href="/cracked"
                className="text-xs text-neutral-500 hover:text-white transition"
              >
                ← back
              </Link>
            </div>
          </motion.div>
        </div>
      </article>

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
