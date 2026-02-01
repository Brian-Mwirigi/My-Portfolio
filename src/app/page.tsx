'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

const projects = [
  { title: 'Jarvis', desc: 'AI Assistant', tech: ['Python', 'OpenAI', 'Speech Recognition'], img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', github: 'https://github.com/brian-mwirigi/Jarvis', size: 'large' },
  { title: 'Deliveroo', desc: 'Parcel tracking', tech: ['TypeScript', 'React', 'Node.js'], img: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80', github: 'https://github.com/valarie-jep/Deliveroo-Frontend', backend: 'https://github.com/A-Barongo/Deliveroo', size: 'medium' },
  { title: 'Stride Footwear', desc: 'E-commerce', tech: ['React', 'Tailwind', 'Framer Motion'], img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80', github: 'https://github.com/brian-mwirigi/stride-footwear', size: 'medium' },
  { title: 'Galaxy Medicare', desc: 'Telemedicine', tech: ['Python', 'Flask', 'JavaScript'], img: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=80', github: 'https://github.com/brian-mwirigi/galaxy-medicare', size: 'small' },
  { title: 'Real Estate', desc: 'Property mgmt', tech: ['Python', 'PostgreSQL', 'React'], img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', github: 'https://github.com/Kipkoech854/Real-estate-management', size: 'small' },
  { title: 'Bot Battlr', desc: 'React app', tech: ['React', 'JavaScript', 'API'], img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80', github: 'https://github.com/brian-mwirigi/bot-battlr', size: 'small' },
]

const extensions = [
  { title: 'TikTok Video Downloader', desc: 'HD No Watermark', rating: 5, users: 30, version: '1.0', link: 'https://chromewebstore.google.com/detail/idnanafggnifgcdleabgkhknojpbkgbf', color: 'from-pink-500 to-red-500' },
  { title: 'AI Slop Blocker', desc: 'Filter AI content', rating: 5, users: 53, version: '1.2', link: 'https://chromewebstore.google.com/detail/cnibfnnnmlbhhmojfnlpdiddfbmobdan', color: 'from-orange-500 to-yellow-500' },
  { title: 'Twitter Thread Downloader', desc: 'Save threads', rating: 5, users: 67, version: '1.4.0', link: 'https://chromewebstore.google.com/detail/hgcajlfkjlepfonhcbhgepdjpfmbfcai', color: 'from-blue-400 to-cyan-400' },
  { title: 'InstantCurrency', desc: 'Currency converter', rating: 4.67, users: 5, version: '1.0.0', link: 'https://chromewebstore.google.com/detail/plllcajmaikchnknphlajpkmdnahpolo', color: 'from-green-500 to-emerald-500' },
]

export default function Home() {
  const [form, setForm] = useState({ name: '', email: '', msg: '' })

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Floating nav */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-2 py-2 bg-white/10 backdrop-blur-xl rounded-full flex gap-1">
        {['home', 'work', 'info', 'contact'].map(item => (
          <a key={item} href={`#${item}`} className="px-5 py-2 text-xs uppercase tracking-widest hover:bg-white/10 rounded-full transition">
            {item}
          </a>
        ))}
        <a href="/blog" className="px-5 py-2 text-xs uppercase tracking-widest hover:bg-white/10 rounded-full transition">
          blog
        </a>
      </nav>

      {/* HERO - Centered minimal */}
      <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[150px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10"
        >
          <p className="text-xs tracking-[0.5em] text-neutral-500 mb-8">FULL STACK DEVELOPER</p>
          <h1 className="text-[15vw] font-bold leading-none tracking-tighter">
            BRIAN
          </h1>
          <div className="flex items-center justify-center gap-6 mt-4 mb-8">
            <span className="h-px w-16 bg-neutral-700" />
            <span className="text-xs tracking-[0.3em] text-neutral-500">REACT • TYPESCRIPT • PYTHON</span>
            <span className="h-px w-16 bg-neutral-700" />
          </div>
          <div className="flex justify-center gap-12 text-xs tracking-widest text-neutral-500">
            <span>50+ PROJECTS</span>
            <span>NAIROBI, KE</span>
            <span>REMOTE OK</span>
          </div>
          <a 
            href="/Brian_Mwirigi_Arc_Resume.pdf" 
            download 
            className="mt-8 inline-block px-8 py-3 border border-neutral-700 rounded-full text-xs tracking-widest hover:bg-white hover:text-black transition"
          >
            DOWNLOAD RESUME
          </a>
        </motion.div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-widest text-neutral-600">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-8 bg-neutral-700" />
        </div>
      </section>

      {/* WORK - Bento grid */}
      <section id="work" className="min-h-screen p-4 md:p-8">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.3em] text-neutral-600 mb-2">SELECTED WORK</p>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter">PROJECTS</h2>
          </div>
          <p className="text-xs text-neutral-600 max-w-xs text-right hidden md:block">
            Healthcare, e-commerce, and SaaS applications built with modern tech stacks.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.github}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl ${
                p.size === 'large' ? 'col-span-2 row-span-2' : 
                p.size === 'medium' ? 'col-span-2 md:col-span-1 row-span-2' : 
                'col-span-1 row-span-1'
              }`}
            >
              <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <p className="text-[10px] tracking-widest text-neutral-400 mb-1">{p.desc.toUpperCase()}</p>
                <h3 className="text-xl md:text-2xl font-bold">{p.title}</h3>
                <div className="flex flex-wrap gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
                  {p.tech.slice(0, 3).map(t => (
                    <span key={t} className="text-[10px] px-2 py-1 bg-white/20 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* SKILLS - Horizontal marquee style */}
      <section className="py-32 overflow-hidden">
        <div className="flex whitespace-nowrap">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="flex gap-8 text-[120px] md:text-[200px] font-bold text-neutral-900"
          >
            <span>REACT</span><span className="text-neutral-800">•</span>
            <span>TYPESCRIPT</span><span className="text-neutral-800">•</span>
            <span>PYTHON</span><span className="text-neutral-800">•</span>
            <span>NODE</span><span className="text-neutral-800">•</span>
            <span>FLASK</span><span className="text-neutral-800">•</span>
            <span>REACT</span><span className="text-neutral-800">•</span>
            <span>TYPESCRIPT</span><span className="text-neutral-800">•</span>
          </motion.div>
        </div>
      </section>

      {/* CHROME EXTENSIONS */}
      <section className="py-24 px-4 md:px-8">
        <div className="mb-12">
          <p className="text-xs tracking-[0.3em] text-neutral-600 mb-2">CHROME WEB STORE</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">EXTENSIONS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {extensions.map((ext, i) => (
            <motion.a
              key={ext.title}
              href={ext.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 border border-neutral-800 rounded-2xl hover:border-neutral-600 transition group block"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${ext.color} rounded-xl mb-4 flex items-center justify-center text-xl font-bold`}>
                {ext.title.charAt(0)}
              </div>
              <h3 className="font-bold text-lg mb-1">{ext.title}</h3>
              <p className="text-neutral-500 text-sm mb-4">{ext.desc}</p>
              <div className="flex items-center justify-between text-xs text-neutral-600">
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span> {ext.rating}
                </span>
                <span>{ext.users} users</span>
                <span>v{ext.version}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* INFO - Diagonal split */}
      <section id="info" className="min-h-screen relative">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-[#0a0a0a] to-neutral-900" />
        
        <div className="relative z-10 min-h-screen flex items-center">
          {/* Content */}
          <div className="w-full p-8 md:p-16 flex flex-col justify-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
              <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">ABOUT</p>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                BUILDING<br />
                <span className="text-neutral-600">DIGITAL</span><br />
                PRODUCTS
              </h2>
              
              <p className="text-neutral-400 text-lg max-w-xl mb-12 leading-relaxed">
                CS student at Strathmore University. I turn complex problems into elegant solutions. 
                Specialized in healthcare and SaaS systems.
              </p>

              {/* Stats in horizontal row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                <div className="border-l border-neutral-800 pl-4">
                  <p className="text-4xl font-bold">50+</p>
                  <p className="text-xs text-neutral-600 mt-1">PROJECTS</p>
                </div>
                <div className="border-l border-neutral-800 pl-4">
                  <p className="text-4xl font-bold">2+</p>
                  <p className="text-xs text-neutral-600 mt-1">YEARS</p>
                </div>
                <div className="border-l border-neutral-800 pl-4">
                  <p className="text-4xl font-bold">24</p>
                  <p className="text-xs text-neutral-600 mt-1">HRS/WEEK</p>
                </div>
                <div className="border-l border-neutral-800 pl-4">
                  <p className="text-4xl font-bold text-green-500">●</p>
                  <p className="text-xs text-neutral-600 mt-1">AVAILABLE</p>
                </div>
              </div>

              {/* Tech pills */}
              <div className="flex flex-wrap gap-3">
                {['React', 'TypeScript', 'Python', 'Flask', 'Node.js', 'PostgreSQL', 'MongoDB', 'Tailwind', 'Git'].map(t => (
                  <span key={t} className="px-4 py-2 border border-neutral-800 rounded-full text-sm hover:bg-white hover:text-black transition cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROCESS - Timeline vertical */}
      <section className="py-32 px-8 md:px-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] text-neutral-600 mb-4">HOW I WORK</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-16">PROCESS</h2>

          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-px bg-neutral-800" />
            {[
              { n: '01', t: 'DISCOVER', d: 'Deep dive into your requirements and goals' },
              { n: '02', t: 'ARCHITECT', d: 'Plan the technical foundation and timeline' },
              { n: '03', t: 'BUILD', d: 'Iterative development with regular updates' },
              { n: '04', t: 'SHIP', d: 'Deploy with documentation and support' },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-12 pb-16 last:pb-0"
              >
                <div className="absolute left-0 -translate-x-1/2 w-3 h-3 bg-white rounded-full" />
                <span className="text-xs text-neutral-600">{s.n}</span>
                <h3 className="text-2xl font-bold mt-1 mb-2">{s.t}</h3>
                <p className="text-neutral-500">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT - Full width form */}
      <section id="contact" className="min-h-screen bg-[#0a0a0a] text-white p-8 md:p-16 flex items-center">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="text-xs tracking-[0.3em] text-neutral-500 mb-4">GET IN TOUCH</p>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                LET'S<br />WORK
              </h2>
              <p className="text-neutral-400 text-lg mb-12">
                Available for part-time remote projects. Let's build something great together.
              </p>

              <div className="space-y-6">
                <a href="mailto:brianinesh@gmail.com" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 border border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition">@</span>
                  <span className="text-lg">brianinesh@gmail.com</span>
                </a>
                <a href="https://github.com/brian-mwirigi" target="_blank" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 border border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition">GH</span>
                  <span className="text-lg">brian-mwirigi</span>
                </a>
                <a href="https://linkedin.com/in/brian-munene-890993346" target="_blank" className="flex items-center gap-4 group">
                  <span className="w-12 h-12 border border-white rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition">IN</span>
                  <span className="text-lg">brian-munene</span>
                </a>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); window.location.href = `mailto:brianinesh@gmail.com?subject=Project from ${form.name}&body=${form.msg}` }} className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full text-3xl md:text-4xl font-bold bg-transparent border-b-2 border-neutral-700 pb-4 focus:border-white outline-none transition placeholder:text-neutral-600"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full text-3xl md:text-4xl font-bold bg-transparent border-b-2 border-neutral-700 pb-4 focus:border-white outline-none transition placeholder:text-neutral-600"
                />
              </div>
              <div>
                <textarea
                  placeholder="Tell me about your project"
                  rows={3}
                  required
                  value={form.msg}
                  onChange={(e) => setForm({...form, msg: e.target.value})}
                  className="w-full text-xl bg-transparent border-b-2 border-neutral-700 pb-4 focus:border-white outline-none transition placeholder:text-neutral-600 resize-none"
                />
              </div>
              <button type="submit" className="w-full py-6 bg-white text-black text-sm tracking-widest hover:bg-neutral-200 transition">
                SEND MESSAGE →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="bg-[#0a0a0a] text-white py-8 px-8 border-t border-neutral-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <span>© 2026 BRIAN MUNENE</span>
          <span>NAIROBI, KENYA • UTC+3</span>
          <a href="#home" className="hover:text-white transition">BACK TO TOP ↑</a>
        </div>
      </footer>
    </main>
  )
}
