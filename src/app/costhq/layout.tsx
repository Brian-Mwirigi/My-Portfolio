import { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const BASE = 'https://brianmunene.me'
const PAGE = `${BASE}/costhq`
const TITLE = 'CostHQ - The Circuit Breaker for AI Agents'
const DESC =
  'Stop runaway LLM costs before they happen. Enforce hard dollar limits per session, user, or project. Local-first CLI with budget gates, cost ledger, and a private dashboard.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  applicationName: 'CostHQ',
  keywords: [
    'CostHQ',
    'AI cost protection',
    'LLM budget gate',
    'runaway agent protection',
    'AI API cost limiter',
    'developer session tracker',
    'AI cost tracking CLI',
    'local-first developer tools',
    'budget enforcement',
    'agent loop protection',
  ].join(', '),
  alternates: {
    canonical: PAGE,
  },
  authors: [{ name: 'Brian Munene', url: BASE }],
  creator: 'Brian Munene',
  publisher: 'Brian Munene',
  openGraph: {
    type: 'website',
    url: PAGE,
    title: TITLE,
    description: DESC,
    siteName: 'CostHQ',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    creator: '@brianmunene',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  category: 'Developer Tools',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'CostHQ',
      alternateName: ['costhq'],
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'AI Cost Management',
      operatingSystem: 'Windows, macOS, Linux',
      description: DESC,
      url: PAGE,
      downloadUrl: 'https://www.npmjs.com/package/costhq',
      installUrl: 'https://www.npmjs.com/package/costhq',
      codeRepository: 'https://github.com/brian-mwirigi/costhq',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      author: {
        '@type': 'Person',
        name: 'Brian Munene',
        url: BASE,
        sameAs: [
          'https://github.com/brian-mwirigi',
          'https://www.npmjs.com/~brian-mwirigi',
        ],
      },
      featureList: [
        'Hard budget gates with process termination',
        'Per-session, per-user, and per-project cost ceilings',
        'Multi-provider cost ledger (OpenAI, Anthropic, Google, Azure, Cohere)',
        'Git-aware session tracking',
        'Local SQLite storage',
        'Programmatic TypeScript API',
        'JSON output mode for CI/CD',
        'Local dashboard on localhost',
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Brian Munene', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'CostHQ', item: PAGE },
      ],
    },
  ],
}

export default function CostHQLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
