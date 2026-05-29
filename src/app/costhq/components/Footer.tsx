import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900">CostHQ</span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Developer session tracking and cost analytics for engineering teams.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#features" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Pricing</a></li>
              <li><a href="https://github.com/brian-mwirigi/codesession-cli" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Documentation</a></li>
              <li><Link href="/blog" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-3">
              <li><a href="https://github.com/brian-mwirigi/codesession-cli" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">GitHub</a></li>
              <li><a href="https://www.npmjs.com/package/codesession-cli" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">NPM Package</a></li>
              <li><a href="https://github.com/brian-mwirigi/codesession-cli/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">License</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Portfolio</Link></li>
              <li><a href="https://github.com/brian-mwirigi" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Creator</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} CostHQ. Built by Brian Munene. MIT Licensed.
          </p>
          <div className="flex items-center gap-5">
            <a href="https://github.com/brian-mwirigi/codesession-cli" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.npmjs.com/package/codesession-cli" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-600 transition-colors" aria-label="NPM">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}