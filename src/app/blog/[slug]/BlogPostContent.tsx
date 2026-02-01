'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { BlogPost } from '@/lib/blog'

export default function BlogPostContent({ post }: { post: BlogPost }) {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/blog" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← BLOG
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">{post.category}</span>
        <div className="w-12" />
      </nav>

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Content */}
      <article className="relative -mt-32 z-10 px-8 md:px-16 pb-32">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-neutral-500 mb-6">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Content - Markdown */}
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-pink-400 prose-code:bg-neutral-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
              prose-ul:text-neutral-300 prose-ol:text-neutral-300
              prose-li:marker:text-neutral-600
            ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* Share & Navigation */}
            <div className="mt-16 pt-8 border-t border-neutral-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="text-sm text-neutral-500 mb-2">Share this post</p>
                  <div className="flex gap-4">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://brianmunene.dev/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-neutral-800 rounded-full text-sm hover:bg-white hover:text-black transition"
                    >
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://brianmunene.dev/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-neutral-800 rounded-full text-sm hover:bg-white hover:text-black transition"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-white text-black rounded-full text-sm tracking-widest hover:bg-neutral-200 transition"
                >
                  MORE POSTS →
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
