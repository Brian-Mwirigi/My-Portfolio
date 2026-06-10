'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/costhq', label: 'Product' },
  { href: '/costhq#install', label: 'Install' },
  { href: '/costhq#pricing', label: 'Pricing' },
  { href: 'https://costhq.mintlify.app/', label: 'Docs', external: true },
  { href: 'https://github.com/brian-mwirigi/costhq', label: 'GitHub', external: true },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-[#e5e5e3] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-6 md:px-8">
        <Link href="/costhq" className="text-lg font-semibold tracking-tight text-[#111]" onClick={() => setMobileOpen(false)}>
          CostHQ
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#666] transition hover:text-[#111]"
              >
                {link.label}
              </a>
            ) : (
              <Link key={link.label} href={link.href} className="text-sm text-[#666] transition hover:text-[#111]">
                {link.label}
              </Link>
            ),
          )}
          <a
            href="https://www.npmjs.com/package/costhq"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#111] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#333]"
          >
            Install
          </a>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center text-[#666] md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 5l10 10M15 5L5 15" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 6h14M3 10h14M3 14h14" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#e5e5e3] bg-white px-6 py-4 md:hidden">
          <div className="space-y-1">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2.5 text-sm text-[#666]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-2.5 text-sm text-[#666]"
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
