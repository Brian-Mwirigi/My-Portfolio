'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { CrackedPost } from '@/lib/cracked'

export default function CrackedGrid({ posts }: { posts: CrackedPost[] }) {
  const pinned = posts.filter((p) => p.pinned)
  const rest = posts.filter((p) => !p.pinned)

  return (
    <section className="px-8 md:px-16 pb-32">
      <div className="max-w-4xl mx-auto space-y-12">
        {pinned.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs tracking-[0.3em] text-neutral-600">THE PLAN</p>
            {pinned.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/cracked/${post.slug}`}
                  className="group block p-8 border border-neutral-700 rounded-2xl bg-neutral-900/30 hover:border-neutral-500 transition"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4 text-xs tracking-widest text-neutral-500">
                    {post.phase && (
                      <span className="px-3 py-1 border border-neutral-700 rounded-full">{post.phase}</span>
                    )}
                    <span>PINNED</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-3 group-hover:text-neutral-300 transition">{post.title}</h2>
                  <p className="text-neutral-400">{post.excerpt}</p>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        <div className="space-y-4">
          <p className="text-xs tracking-[0.3em] text-neutral-600">
            {rest.length > 0 ? 'WEEKLY ARTIFACTS' : 'ARTIFACTS'}
          </p>

          {rest.length === 0 ? (
            <div className="py-16 px-8 border border-dashed border-neutral-800 rounded-2xl text-center">
              <p className="text-neutral-500 mb-2">Nothing posted yet.</p>
              <p className="text-neutral-600 text-sm">Weekly writeups land here — code, numbers, honest lessons.</p>
            </div>
          ) : (
            rest.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/cracked/${post.slug}`}
                  className="group block p-6 border border-neutral-800 rounded-xl hover:border-neutral-600 transition"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-neutral-500">
                    {post.week != null && <span className="font-mono">WK {post.week}</span>}
                    {post.phase && <span>• {post.phase}</span>}
                    <span>• {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-neutral-300 transition">{post.title}</h2>
                  <p className="text-neutral-400 text-sm line-clamp-2">{post.excerpt}</p>
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-neutral-900 rounded text-xs text-neutral-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
