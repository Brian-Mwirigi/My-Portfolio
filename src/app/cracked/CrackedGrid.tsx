'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { CrackedPost } from '@/lib/cracked'

function PinnedCard({ post, i }: { post: CrackedPost; i: number }) {
  return (
    <motion.article
      key={post.slug}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1 }}
    >
      <Link
        href={`/cracked/${post.slug}`}
        className="group block p-5 border border-neutral-800 rounded-xl bg-neutral-900/20 hover:border-neutral-600 transition"
      >
        <div className="flex flex-wrap items-center gap-2 mb-2 text-[10px] tracking-widest text-neutral-500">
          {post.phase && (
            <span className="px-2 py-0.5 border border-neutral-800 rounded-full">{post.phase}</span>
          )}
          <span>PINNED</span>
        </div>
        <h2 className="text-lg font-semibold mb-1 group-hover:text-neutral-300 transition">{post.title}</h2>
        <p className="text-neutral-500 text-sm">{post.excerpt}</p>
      </Link>
    </motion.article>
  )
}

export default function CrackedGrid({ posts }: { posts: CrackedPost[] }) {
  const pinned = posts.filter((p) => p.pinned)
  const rest = posts.filter((p) => !p.pinned)

  return (
    <section className="px-6 md:px-10 pb-16">
      <div className="max-w-2xl mx-auto space-y-8">
        {pinned.length > 0 && (
          <div className="space-y-3">
            <p className="text-[10px] tracking-[0.2em] text-neutral-600">why i started this project</p>
            {pinned.map((post, i) => (
              <PinnedCard key={post.slug} post={post} i={i} />
            ))}
          </div>
        )}

        <div className="space-y-3">
          <p className="text-[10px] tracking-[0.2em] text-neutral-600">posts</p>

          {rest.length === 0 ? (
            <div className="py-8 px-6 border border-dashed border-neutral-800 rounded-xl text-center">
              <p className="text-neutral-500 text-sm mb-1">Nothing here yet.</p>
              <p className="text-neutral-600 text-xs">First weekly writeup goes up soon.</p>
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
                  className="group block p-4 border border-neutral-800 rounded-lg hover:border-neutral-600 transition"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-neutral-500">
                    {post.week != null && <span className="font-mono">WK {post.week}</span>}
                    {post.phase && <span>• {post.phase}</span>}
                    <span>• {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-base font-semibold mb-1 group-hover:text-neutral-300 transition">{post.title}</h2>
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
