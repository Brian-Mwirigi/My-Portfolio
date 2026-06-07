import Link from 'next/link'
import { ArrowUpRight, Github, Package } from 'lucide-react'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const links: Record<string, FooterLink[]> = {
  Product: [
    { label: 'Features', href: '/costhq#features' },
    { label: 'Pricing', href: '/costhq#pricing' },
    { label: 'Field notes', href: '/costhq/blog' },
  ],
  Resources: [
    { label: 'GitHub', href: 'https://github.com/brian-mwirigi/codesession-cli', external: true },
    { label: 'NPM package', href: 'https://www.npmjs.com/package/codesession-cli', external: true },
    { label: 'Portfolio', href: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070907] text-[#f7f3e8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div>
          <Link href="/costhq" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-[#54f4a8]/40 bg-[#102218] text-[#54f4a8]">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-lg font-semibold">CostHQ</span>
              <span className="block text-sm text-[#928b7a]">Private development telemetry.</span>
            </div>
          </Link>
          <p className="mt-5 max-w-lg leading-7 text-[#b5ad9d]">
            Track coding sessions, file changes, commits, and AI model costs from the terminal.
            Built for developers who want receipts for the work.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com/brian-mwirigi/codesession-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-[#c7c1b2] transition hover:border-[#54f4a8] hover:text-[#54f4a8]"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.npmjs.com/package/codesession-cli"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/10 px-4 py-2 text-sm font-semibold text-[#c7c1b2] transition hover:border-[#f8c351] hover:text-[#f8c351]"
            >
              NPM
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold text-white">{group}</h3>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.href}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-[#928b7a] transition hover:text-white"
                      >
                        {item.label}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link href={item.href} className="text-sm text-[#928b7a] transition hover:text-white">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-[#928b7a] md:flex-row md:items-center md:justify-between">
          <span>Copyright {new Date().getFullYear()} CostHQ. Built by Brian Munene.</span>
          <span>Local-first. MIT licensed. No account required.</span>
        </div>
      </div>
    </footer>
  )
}
