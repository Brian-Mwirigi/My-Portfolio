'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
              {/* Background shapes */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-purple-500/20 rounded-3xl transform rotate-3" />
              <div className="absolute inset-0 bg-white rounded-3xl border border-border shadow-lg transform -rotate-3" />
              
              {/* Main content area */}
              <div className="relative bg-white rounded-3xl border border-border p-8 h-full flex flex-col justify-center">
                {/* Profile placeholder */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center">
                  <span className="font-display text-4xl font-bold text-white">BM</span>
                </div>
                
                {/* Quick info */}
                <div className="text-center space-y-3">
                  <h3 className="font-display text-2xl font-bold text-primary">Brian Munene</h3>
                  <p className="text-secondary">Full Stack Developer</p>
                  <div className="flex justify-center gap-4 pt-4">
                    <a
                      href="https://github.com/TheCoderBuilder-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-surface-alt rounded-lg text-secondary hover:text-accent transition-colors"
                      aria-label="GitHub"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a
                      href="https://linkedin.com/in/brian-munene-890993346"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-surface-alt rounded-lg text-secondary hover:text-accent transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a
                      href="mailto:brianinesh@gmail.com"
                      className="p-2 bg-surface-alt rounded-lg text-secondary hover:text-accent transition-colors"
                      aria-label="Email"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-sm font-mono text-accent mb-4 tracking-wider uppercase">
              About Me
            </p>
            <h2 className="section-title mb-6">
              Building software that solves real problems
            </h2>
            
            <div className="space-y-4 text-secondary leading-relaxed">
              <p>
                I am a Computer Science student at Strathmore University with a passion for 
                building clean, user-focused applications. With 50+ shipped projects across 
                healthcare, e-commerce, and SaaS domains, I have developed a strong foundation 
                in full-stack development.
              </p>
              <p>
                My expertise lies in turning complex requirements into elegant, maintainable 
                solutions. I specialize in React and TypeScript on the frontend, with Python 
                and Flask powering my backend systems. Every project I take on receives the 
                same attention to detail, whether it is a simple landing page or a complex 
                healthcare management platform.
              </p>
              <p>
                Based in Nairobi, Kenya, I am available for remote work and thrive in 
                async-first environments. I value clear communication, well-documented code, 
                and building long-term relationships with clients who care about quality.
              </p>
            </div>

            {/* Quick Facts */}
            <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-border">
              <div>
                <h4 className="font-display font-bold text-primary mb-2">Location</h4>
                <p className="text-secondary text-sm">Nairobi, Kenya (UTC+3)</p>
              </div>
              <div>
                <h4 className="font-display font-bold text-primary mb-2">Availability</h4>
                <p className="text-secondary text-sm">20-25 hours/week</p>
              </div>
              <div>
                <h4 className="font-display font-bold text-primary mb-2">Focus Areas</h4>
                <p className="text-secondary text-sm">Healthcare, E-commerce, SaaS</p>
              </div>
              <div>
                <h4 className="font-display font-bold text-primary mb-2">Work Style</h4>
                <p className="text-secondary text-sm">Remote, Async-friendly</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
