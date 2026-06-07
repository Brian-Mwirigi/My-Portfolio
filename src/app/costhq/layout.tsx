import { Metadata } from 'next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const BASE = 'https://brianmunene.me'
const PAGE = `${BASE}/costhq`
const TITLE = 'CostHQ - Developer Session Tracking and AI Cost Analytics'
const DESC =
  'Track coding sessions, file changes, git commits, and API costs from the terminal. Free CLI with a private local dashboard.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  applicationName: 'CostHQ',
  keywords: [
    'codesession-cli',
    'CostHQ',
    'developer session tracker',
    'AI cost tracking',
    'coding time tracker',
    'developer productivity',
    'cost analytics',
    'npm session tracker',
    'cli time tracking',
    'git commit tracker',
    'file change tracker',
    'local first developer tools',
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
    images: [
      {
        url: 'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png',
        width: 1280,
        height: 800,
        alt: 'CostHQ dashboard for real-time cost analytics and session tracking',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    creator: '@brianmunene',
    images: [
      'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png',
    ],
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
      alternateName: ['codesession-cli', 'codesession cli', 'cs cli'],
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Developer Productivity Tool',
      operatingSystem: 'Windows, macOS, Linux',
      softwareVersion: '2.2.0',
      description: DESC,
      url: PAGE,
      downloadUrl: 'https://www.npmjs.com/package/codesession-cli',
      installUrl: 'https://www.npmjs.com/package/codesession-cli',
      codeRepository: 'https://github.com/brian-mwirigi/codesession-cli',
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
      keywords: 'codesession-cli, CostHQ, coding session tracker, AI cost tracking, developer tools, npm, CLI',
      featureList: [
        'Automatic coding session time tracking',
        'Git commit capture and logging',
        'File change monitoring',
        'API cost logging for commercial and custom models',
        'Real-time web analytics dashboard',
        'Budget alerts',
        'Programmatic TypeScript API',
        'Local SQLite storage',
        'JSON output mode',
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
    <div className="costhq">
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
