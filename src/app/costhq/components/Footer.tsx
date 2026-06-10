import Link from 'next/link'

type FooterLink = {
  label: string
  href: string
  external?: boolean
}

const links: Record<string, FooterLink[]> = {
  Product: [
    { label: 'Features', href: '/costhq#install' },
    { label: 'Pricing', href: '/costhq#pricing' },
    { label: 'Documentation', href: 'https://costhq.mintlify.app/', external: true },
  ],
  Resources: [
    { label: 'GitHub', href: 'https://github.com/brian-mwirigi/costhq', external: true },
    { label: 'NPM', href: 'https://www.npmjs.com/package/costhq', external: true },
    { label: 'Portfolio', href: '/' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-[#e5e5e3] bg-[#fafaf9]">
      <div className="mx-auto grid max-w-[1080px] gap-10 px-6 py-14 md:grid-cols-[1.2fr_1fr] md:px-8">
        <div>
          <Link href="/costhq" className="text-lg font-semibold text-[#111]">
            CostHQ
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#888]">
            The circuit breaker for AI agents. Enforce hard dollar limits per session, user, or project. Local-first. Open source.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-xs font-medium uppercase tracking-widest text-[#888]">{group}</h3>
              <ul className="mt-4 space-y-3">
                {items.map((item) => (
                  <li key={item.href + item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#666] transition hover:text-[#111]"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="text-sm text-[#666] transition hover:text-[#111]">
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

      <div className="border-t border-[#e5e5e3] px-6 py-5 md:px-8">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-2 text-xs text-[#999] md:flex-row md:items-center md:justify-between">
          <span>{new Date().getFullYear()} CostHQ. Built by Brian Munene.</span>
          <span>Local-first. MIT licensed. No account required.</span>
        </div>
      </div>
    </footer>
  )
}
