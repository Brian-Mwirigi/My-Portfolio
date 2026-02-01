'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Blog posts data - you can move this to a separate file or CMS later
export const blogPosts = [
  {
    slug: 'building-jarvis-ai-assistant',
    title: 'Building Jarvis - My Personal AI Assistant',
    excerpt: 'How I built an AI assistant using Python, OpenAI API, and speech recognition. The journey from concept to a working voice-controlled assistant.',
    date: '2026-01-28',
    readTime: '8 min read',
    category: 'BUILD',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: ['Python', 'OpenAI', 'AI', 'Voice Recognition'],
  },
  {
    slug: 'chrome-extensions-journey',
    title: 'From Zero to 150+ Users: My Chrome Extension Journey',
    excerpt: 'The story behind building 4 Chrome extensions and what I learned about shipping products that people actually use.',
    date: '2026-01-20',
    readTime: '6 min read',
    category: 'UPDATE',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
    tags: ['Chrome Extensions', 'JavaScript', 'Product'],
  },
  {
    slug: 'healthcare-app-telemedicine',
    title: 'Building Galaxy Medicare - A Telemedicine Platform',
    excerpt: 'Deep dive into building a full-stack telemedicine application with Python Flask and real-time features.',
    date: '2026-01-15',
    readTime: '10 min read',
    category: 'BUILD',
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80',
    tags: ['Python', 'Flask', 'Healthcare', 'Full Stack'],
  },
  {
    slug: 'react-typescript-tips',
    title: 'React + TypeScript: Patterns I Use Daily',
    excerpt: 'Practical TypeScript patterns and tips that make my React code more maintainable and bug-free.',
    date: '2026-01-10',
    readTime: '5 min read',
    category: 'TIPS',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    tags: ['React', 'TypeScript', 'Best Practices'],
  },
  {
    slug: 'my-dev-setup-2026',
    title: 'My Developer Setup in 2026',
    excerpt: 'The tools, extensions, and configurations I use daily to stay productive. VS Code setup, terminal configs, and more.',
    date: '2026-01-05',
    readTime: '7 min read',
    category: 'SETUP',
    image: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&q=80',
    tags: ['Setup', 'Productivity', 'Tools'],
  },
]

const categories = ['ALL', 'BUILD', 'UPDATE', 'TIPS', 'SETUP']

export default function BlogPage() {
  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← BACK
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">BLOG</span>
        <div className="w-12" />
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-8 md:px-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">THOUGHTS & BUILDS</p>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">BLOG</h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              Updates on my builds, projects, and random tech thoughts. Sharing what I learn along the way.
            </p>
          </motion.div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-3 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-4 py-2 text-xs tracking-widest border border-neutral-800 rounded-full hover:bg-white hover:text-black transition"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="px-8 md:px-16 pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post, i) => (
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
        </div>
      </section>

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
