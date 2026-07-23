import { Metadata } from 'next'
import { Syne, IBM_Plex_Mono } from 'next/font/google'

const display = Syne({
  subsets: ['latin'],
  variable: '--font-aux-display',
  weight: ['600', '700', '800'],
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-aux-mono',
  weight: ['400', '500'],
})

const BASE = 'https://brianmunene.me'
const PAGE = `${BASE}/aux-mcp`
const TITLE = 'AUX — Spotify, for your AI'
const DESC =
  'Not a remote. A DJ that talks back. Vibe queues, roast cards, party rooms, and auto-DJ — full Spotify MCP for Cursor and Claude.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  applicationName: 'AUX',
  keywords: [
    'AUX',
    'spotify-aux',
    'aux-mcp',
    'Spotify MCP',
    'AI DJ',
    'Cursor Spotify',
    'Claude Spotify',
    'Model Context Protocol',
    'vibe DJ',
    'playlist roast',
  ].join(', '),
  alternates: { canonical: PAGE },
  authors: [{ name: 'Brian Munene Mwirigi', url: BASE }],
  creator: 'Brian Munene Mwirigi',
  openGraph: {
    type: 'website',
    url: PAGE,
    title: TITLE,
    description: DESC,
    siteName: 'Brian Munene',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    creator: '@BrianMMwirigi',
  },
  robots: { index: true, follow: true },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'AUX',
      alternateName: ['spotify-aux', 'aux-mcp'],
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      description: DESC,
      url: PAGE,
      downloadUrl: 'https://www.npmjs.com/package/spotify-aux',
      codeRepository: 'https://github.com/brian-mwirigi/aux-mcp',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: {
        '@type': 'Person',
        name: 'Brian Munene Mwirigi',
        url: BASE,
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Brian Munene', item: BASE },
        { '@type': 'ListItem', position: 2, name: 'AUX', item: PAGE },
      ],
    },
  ],
}

export default function AuxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${display.variable} ${mono.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  )
}
