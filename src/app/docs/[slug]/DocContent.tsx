'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Doc } from '@/lib/docs'
import { FileText, Calendar } from 'lucide-react'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')  // remove all non-alphanumeric except spaces
    .replace(/ /g, '-')           // replace each space with - (preserves double-spaces -> double-hyphens)
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
    return <h1 id={id} {...props}>{children}</h1>
  },
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(extractText(children))
    return <h2 id={id} {...props}>{children}</h2>
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(extractText(children))
    return <h3 id={id} {...props}>{children}</h3>
  },
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const id = slugify(extractText(children))
    return <h4 id={id} {...props}>{children}</h4>
  },
}

export default function DocContent({ doc }: { doc: Doc }) {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/docs" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← DOCS
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">{doc.category}</span>
        <div className="w-12" />
      </nav>

      {/* Content */}
      <article className="pt-32 px-8 md:px-16 pb-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex p-3 bg-neutral-800 rounded-xl">
                  <FileText className="w-6 h-6 text-neutral-400" />
                </div>
                <span className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm tracking-widest">
                  {doc.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                {doc.title}
              </h1>

              <p className="text-xl text-neutral-400 mb-6">
                {doc.excerpt}
              </p>

              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {new Date(doc.lastUpdated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Documentation Content - Markdown */}
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-neutral-800
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
              prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
              prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-pink-400 prose-code:bg-neutral-900 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
              prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800 prose-pre:rounded-xl
              prose-ul:text-neutral-300 prose-ol:text-neutral-300
              prose-li:marker:text-neutral-600
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-neutral-900/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-table:border prose-table:border-neutral-800
              prose-th:bg-neutral-900 prose-th:border prose-th:border-neutral-800 prose-th:p-3
              prose-td:border prose-td:border-neutral-800 prose-td:p-3
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={headingComponents}>
                {doc.content}
              </ReactMarkdown>
            </div>

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-neutral-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="text-sm text-neutral-500 mb-2">Need help?</p>
                  <p className="text-neutral-400">
                    Found an issue or have a question? <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Open an issue on GitHub</a>
                  </p>
                </div>
                <Link
                  href="/docs"
                  className="px-6 py-3 bg-white text-black rounded-full text-sm tracking-widest hover:bg-neutral-200 transition"
                >
                  ALL DOCS →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

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
