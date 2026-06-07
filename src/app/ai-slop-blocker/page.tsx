'use client'

import { motion } from 'framer-motion'
import {
  Brain,
  ShieldAlert,
  Zap,
  Globe2,
  Lock,
  MessageSquareOff,
  UserCheck,
  Cpu,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Download
} from 'lucide-react'
import Link from 'next/link'

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AISlopBlockerPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="text-sm font-medium tracking-wide text-slate-400 hover:text-white transition">
          ← Brian Munene
        </Link>
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-purple-500" />
          <span className="font-bold text-white tracking-tight">AI Slop Blocker</span>
        </div>
        <a href="https://chromewebstore.google.com/detail/ai-slop-blocker/cnibfnnnmlbhhmojfnlpdiddfbmobdan?authuser=0&hl=en" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-200 transition">
          Install Now
        </a>
      </nav>

      {/* ── Hero ── */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto relative">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center space-y-8 relative z-10"
        >
          <motion.h1 
            variants={fadeIn}
            className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 tracking-tight leading-tight"
          >
            Your feed is broken because half of it isn't written by humans anymore.
          </motion.h1>
          
          <motion.div variants={fadeIn} className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto space-y-4">
            <p>
              <strong className="text-white font-medium">LinkedIn</strong> is drowning in "I'm thrilled to announce" posts that AI wrote.
            </p>
            <p>
              <strong className="text-white font-medium">Twitter</strong> is full of threads that nobody thought.
            </p>
            <p>
              <strong className="text-white font-medium">Reddit</strong> is being colonized by accounts that generate 40 posts a day on topics they've never touched.
            </p>
          </motion.div>

          <motion.div variants={fadeIn} className="pt-8">
            <div className="inline-block bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl px-8 py-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 text-purple-400" />
                AI Slop Blocker fixes it.
              </h2>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="mb-16"
          >
            <h2 className="text-sm font-bold tracking-widest text-purple-500 uppercase mb-4">How it works</h2>
            <p className="text-3xl md:text-4xl font-bold text-white max-w-2xl leading-tight">
              Install it. Open your feed. Watch the slop disappear.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6 text-lg text-slate-400"
            >
              <p>
                The extension runs a 6-layer hybrid detection engine <strong className="text-white">entirely on your device</strong> — no data leaves your browser, ever. 
              </p>
              <p>
                It combines fast signature detection (catches "As an AI language model" in under 1ms) with a Naive Bayes ML classifier trained on 23,000 human vs. AI text samples. <strong className="text-white">Accuracy: 94.8% on the test set.</strong>
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-[#111] border border-white/5 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-400" />
                Local Analysis Engine
              </h3>
              <p className="text-slate-400 mb-6">
                It reads the text analyzing sentence structure, burstiness, emoji density, hashtag spam, listicle formatting and 40+ linguistic fingerprints that separate human writing from algorithmic slop.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Burstiness', 'Sentence Structure', 'Emoji Density', 'Hashtag Spam', 'Listicles'].map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Platforms ── */}
      <section className="py-24 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505] to-[#050505] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-4">Coverage</motion.h2>
            <motion.p variants={fadeIn} className="text-4xl md:text-5xl font-bold text-white mb-12">8 Platforms. One Extension.</motion.p>
            
            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                'Twitter / X', 'LinkedIn', 'Reddit (old & new UI)', 'Facebook',
                'Threads', 'Bluesky', 'Google Search (AI Overviews)', 'YouTube (coming soon)'
              ].map((platform) => (
                <div key={platform} className="bg-white/[0.02] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/[0.04] transition duration-300">
                  <Globe2 className="w-6 h-6 text-slate-400" />
                  <span className="font-medium text-slate-200">{platform}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.p variants={fadeIn} className="mt-12 text-xl text-slate-400 font-medium">
              One install. Every feed. Clean.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing & Features ── */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-[#111] border border-white/5 rounded-3xl p-8 md:p-12"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-slate-400 mb-8">Everything you need to clean up your daily feeds.</p>
              
              <ul className="space-y-4 mb-12">
                {[
                  'Hybrid ML + pattern detection across all 8 platforms',
                  'Three blocking modes: Blur, Hide, or Label',
                  'Sensitivity slider (20% strict → 80% lenient)',
                  'See exactly why each post got flagged',
                  'Real-time block counter - today and all-time',
                  'Right-click any post → "Flag as AI slop" to train local model',
                  '30 blocks per day'
                ].map((feature, i) => (
                  <li key={i} className="flex gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-slate-500 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://chromewebstore.google.com/detail/ai-slop-blocker/cnibfnnnmlbhhmojfnlpdiddfbmobdan?authuser=0&hl=en" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-6 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition text-center">
                Install for Free
              </a>
            </motion.div>

            {/* Pro */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-gradient-to-b from-purple-900/20 to-[#111] border border-purple-500/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-purple-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">
                Pay Once
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <div className="mb-8">
                <span className="text-5xl font-extrabold text-white">$12</span>
                <span className="text-slate-400 ml-2">One time. Yours forever.</span>
                <p className="text-sm text-purple-300 mt-2 font-medium">Not $6 a month. Not $72 a year. Twelve dollars, once.</p>
              </div>
              
              <ul className="space-y-4 mb-12">
                {[
                  'Unlimited blocks, every day',
                  'Custom keyword and phrase blocklists',
                  'Author whitelist — trust specific accounts permanently',
                  'History log of everything blocked',
                  'Settings export/import',
                  'Every future platform added to Pro automatically'
                ].map((feature, i) => (
                  <li key={i} className="flex gap-3 text-slate-100 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://chromewebstore.google.com/detail/ai-slop-blocker/cnibfnnnmlbhhmojfnlpdiddfbmobdan?authuser=0&hl=en" target="_blank" rel="noopener noreferrer" className="block w-full py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-500/25 transition text-center">
                Get Pro Access
              </a>
              
              <p className="mt-6 text-sm text-slate-400 italic">
                When you hit 30 blocks on the free tier, the extension shows you the upgrade prompt right there in your feed — at the exact moment you need it most. You'll know immediately whether it's worth it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Community & Comparison ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto space-y-24">
          
          {/* Smarter Model */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl font-bold text-white">The model gets smarter the more you use it.</h2>
              <p className="text-lg text-slate-400">
                Every time you highlight a missed post and right-click to flag it, two things happen:
              </p>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                    <span className="text-blue-400 font-bold">1</span>
                  </div>
                  <p className="text-slate-300">Your local model updates instantly. That pattern is caught from that point forward, on your device only.</p>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <span className="text-purple-400 font-bold">2</span>
                  </div>
                  <p className="text-slate-300">A cryptographic hash (SHA-256) of the text syncs anonymously to a shared dataset. No raw content nor personal data just a fingerprint that improves the base model for everyone.</p>
                </li>
              </ul>
              <p className="text-white font-medium bg-white/5 p-4 rounded-lg border border-white/10">
                The extension you have in six months will be more accurate than the one you install today.
              </p>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Brain className="w-48 h-48 text-white/5" />
            </div>
          </motion.div>

          {/* Comparison */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Why not the "other guys"?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> The Leading Competitor
                </h4>
                <p className="text-slate-400">
                  Has 20,000 users, but only <strong className="text-white">30% detection accuracy</strong> — verified by independent benchmarks. That means 7 out of 10 AI posts walk straight through it. Usually requires a monthly subscription.
                </p>
              </div>
              <div>
                <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> AI Slop Blocker
                </h4>
                <p className="text-slate-400">
                  <strong className="text-white">94.8% accuracy</strong>, full local processing, a one-time price and a model that learns. Covers the same platforms. Costs less over any 3-month period.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Privacy & Trust ── */}
      <section className="py-24 px-6 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-16"
          >
            {/* Privacy */}
            <motion.div variants={fadeIn} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
                  <Lock className="w-8 h-8 text-green-400" /> Privacy First
                </h2>
                <ul className="space-y-3">
                  {[
                    'Zero external API calls for detection',
                    'No browsing history collected',
                    'No account required',
                    'No email required',
                    'Post content never transmitted anywhere',
                    'Only anonymous SHA-256 hashes sync for community training (opt-outable)',
                    'Chrome storage only — your data stays in your browser'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3 text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Trust */}
            <motion.div variants={fadeIn} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-6">
                  <UserCheck className="w-8 h-8 text-blue-400" /> Built by one developer
                </h2>
                <p className="text-lg text-slate-400 mb-4">
                  This isn't a VC-backed product team. One person built this because the internet has so much slop.
                </p>
                <div className="bg-[#111] border border-white/5 p-6 rounded-xl space-y-4 text-slate-300">
                  <p>If something breaks, there's a real human to email.</p>
                  <p>If you want a feature, ask.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6 border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="max-w-3xl mx-auto relative z-10 space-y-8"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold text-white">
            Install. Open Twitter.<br/>Watch it work.
          </h2>
          <p className="text-xl text-slate-400">
            The before/after is immediate. You'll see it in the first 30 seconds.
          </p>
          <div className="pt-8">
            <a href="https://chromewebstore.google.com/detail/ai-slop-blocker/cnibfnnnmlbhhmojfnlpdiddfbmobdan?authuser=0&hl=en" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-200 hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto shadow-xl shadow-white/10 w-fit">
              <Download className="w-5 h-5" /> Add to Browser — Free
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-slate-500 text-sm bg-[#050505]">
        <p>© 2026 Brian Munene. AI Slop Blocker. Fighting the dead internet.</p>
      </footer>
    </main>
  )
}
