'use client'

import Link from 'next/link'
import { BookOpen, FileText, Github, Menu, Moon, Package, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { href: '/costhq', label: 'Product', active: true },
  { href: '/costhq#features', label: 'Ecosystem' },
  { href: '/costhq/blog', label: 'Blog', icon: BookOpen },
  { href: 'https://github.com/brian-mwirigi/codesession-cli', label: 'Docs', icon: FileText, external: true },
  { href: 'https://github.com/brian-mwirigi/codesession-cli', label: 'GitHub', icon: Github, external: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#172239] bg-[#070b15]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[70px] max-w-[1840px] items-center justify-between px-5 md:px-10">
        <Link href="/costhq" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <span className="chq-nav-mark" aria-hidden="true">
            <Package className="h-4 w-4" />
          </span>
          <span className="text-xl font-black tracking-[-0.04em] text-white">CostHQ</span>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            const className = link.active
              ? 'rounded-xl border border-[#1f2c48] bg-[#0c1322] px-5 py-3 text-lg font-black text-[#00f5c8]'
              : 'inline-flex items-center gap-2 rounded-xl px-4 py-3 text-lg font-bold text-[#65708d] transition hover:text-white'

            return link.external ? (
              <a key={link.href + link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
                {Icon && <Icon className="h-4 w-4" />}
                {link.label}
              </a>
            ) : (
              <Link key={link.href + link.label} href={link.href} className={className}>
                {Icon && <Icon className="h-4 w-4" />}
                {link.label}
              </Link>
            )
          })}
          <a
            href="https://www.npmjs.com/package/codesession-cli"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#1f2c48] bg-[#00f5c8] px-4 py-3 text-lg font-black text-[#04100d] transition hover:bg-[#8cffdd]"
          >
            Install
          </a>
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#1f2c48] text-[#94a0bf]" aria-label="Theme">
            <Moon className="h-5 w-5" />
          </button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#1f2c48] text-white md:hidden"
          onClick={() => setMobileOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#172239] bg-[#070b15] px-5 py-5 md:hidden">
          <div className="space-y-2">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href + link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-xl border border-[#172239] px-4 py-3 font-bold text-[#94a0bf]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="block rounded-xl border border-[#172239] px-4 py-3 font-bold text-[#94a0bf]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
