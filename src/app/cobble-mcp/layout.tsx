import { Metadata } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'

const pixel = Press_Start_2P({
  subsets: ['latin'],
  variable: '--font-mc-pixel',
  weight: '400',
})

const chat = VT323({
  subsets: ['latin'],
  variable: '--font-mc-chat',
  weight: '400',
})

const BASE = 'https://brianmunene.me'
const PAGE = `${BASE}/cobble-mcp`
const TITLE = 'COBBLE — Minecraft for your AI'
const DESC =
  'Drop Claude into your Minecraft world. Mineflayer co-op bot that chats, invents builds, and fights beside you.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  applicationName: 'COBBLE',
  keywords: [
    'COBBLE',
    'cobble-mcp',
    'Minecraft MCP',
    'Mineflayer',
    'Claude Minecraft',
    'AI co-op building',
    'Model Context Protocol',
    'Cursor MCP',
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
      name: 'COBBLE',
      alternateName: ['cobble-mcp', 'cobble'],
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      description: DESC,
      url: PAGE,
      downloadUrl: 'https://www.npmjs.com/package/cobble-mcp',
      codeRepository: 'https://github.com/brian-mwirigi/cobble-mcp',
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
        { '@type': 'ListItem', position: 2, name: 'COBBLE', item: PAGE },
      ],
    },
  ],
}

export default function CobbleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${pixel.variable} ${chat.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  )
}
