'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { BlogPost } from '@/lib/costhq-blog'

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {posts.map((post, i) => (
        <motion.article
          key={post.slug}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
        >
          <Link
            href={`/costhq/blog/${post.slug}`}
            className="group flex min-h-full flex-col border border-white/10 bg-[#0e130e] p-6 transition hover:border-[#54f4a8]/70 hover:bg-[#102218]"
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-[#98ffc5]">
                <BookOpen className="h-3.5 w-3.5" />
                {post.category}
              </span>
              <span className="text-xs text-[#928b7a]">{post.readTime}</span>
            </div>

            <h2 className="text-2xl font-semibold leading-snug text-white transition group-hover:text-[#98ffc5]">
              {post.title}
            </h2>

            <p className="mt-4 flex-1 leading-7 text-[#b5ad9d]">{post.excerpt}</p>

            <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-sm">
              <span className="text-[#928b7a]">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="inline-flex items-center gap-2 font-semibold text-[#54f4a8] transition group-hover:gap-3">
                Read
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  )
}
