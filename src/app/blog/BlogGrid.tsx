'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import type { BlogPost } from '@/lib/blog'

const categories = ['ALL', 'BUILD', 'UPDATE', 'TIPS', 'SETUP']

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState('ALL')

  const filteredPosts = activeCategory === 'ALL' 
    ? posts 
    : posts.filter(post => post.category === activeCategory)

  return (
    <>
      {/* Category filters */}
      <section className="px-8 md:px-16 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs tracking-widest border rounded-full transition ${
                  activeCategory === cat
                    ? 'bg-white text-black border-white'
                    : 'border-neutral-800 hover:bg-white hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-8 md:px-16 pb-32">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-neutral-500">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="relative h-64 md:h-72 overflow-hidden rounded-2xl mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs tracking-widest">
                          {post.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-neutral-300 transition">
                      {post.title}
                    </h2>
                    
                    <p className="text-neutral-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-neutral-900 rounded-full text-xs text-neutral-500"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
