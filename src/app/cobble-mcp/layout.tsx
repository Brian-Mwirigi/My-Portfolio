import { Metadata } from 'next'
import { Press_Start_2P, VT323 } from 'next/font/google'
import {
  BASE,
  PAGE,
  SHORT,
  OG,
  NPM,
  GH,
  TITLE,
  SHORT_TITLE,
  DESC,
  KEYWORDS,
  faqs,
} from './seo'

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

export const metadata: Metadata = {
  title: {
    default: TITLE,
    absolute: TITLE,
  },
  description: DESC,
  applicationName: 'COBBLE',
  keywords: KEYWORDS,
  alternates: {
    canonical: PAGE,
    languages: { 'en-US': PAGE },
  },
  authors: [
    { name: 'Brian Munene Mwirigi', url: BASE },
    { name: 'Brian Munene', url: `${BASE}/brian-munene-mwirigi` },
  ],
  creator: 'Brian Munene Mwirigi',
  publisher: 'Brian Munene Mwirigi',
  category: 'Developer Tools',
  classification: 'Minecraft AI / Model Context Protocol',
  referrer: 'origin-when-cross-origin',
  openGraph: {
    type: 'website',
    url: PAGE,
    title: SHORT_TITLE,
    description: DESC,
    siteName: 'Brian Munene',
    locale: 'en_US',
    images: [
      {
        url: OG,
        width: 1200,
        height: 630,
        alt: 'COBBLE — Minecraft for your AI',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SHORT_TITLE,
    description: DESC,
    creator: '@BrianMMwirigi',
    site: '@BrianMMwirigi',
    images: [`${PAGE}/twitter-image`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  other: {
    'theme-color': '#5d9c3d',
    'color-scheme': 'dark',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: BASE,
      name: 'Brian Munene',
      publisher: { '@id': `${BASE}/#person` },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE}#webpage`,
      url: PAGE,
      name: TITLE,
      description: DESC,
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': `${PAGE}#software` },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: OG,
        width: 1200,
        height: 630,
      },
      breadcrumb: { '@id': `${PAGE}#breadcrumb` },
      inLanguage: 'en-US',
      datePublished: '2026-07-23',
      dateModified: '2026-07-23',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${PAGE}#software`,
      name: 'COBBLE',
      alternateName: [
        'cobble-mcp',
        'cobble',
        'Cobble MCP',
        'Minecraft for your AI',
      ],
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Minecraft AI / Model Context Protocol',
      operatingSystem: 'Windows, macOS, Linux',
      softwareVersion: '0.4.0',
      description: DESC,
      url: PAGE,
      sameAs: [SHORT, NPM, GH],
      downloadUrl: NPM,
      installUrl: NPM,
      codeRepository: GH,
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Node.js',
      keywords: KEYWORDS.join(', '),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: NPM,
      },
      author: { '@id': `${BASE}/#person` },
      creator: { '@id': `${BASE}/#person` },
      publisher: { '@id': `${BASE}/#person` },
      featureList: [
        'Mineflayer bot joins your Minecraft Java world',
        'Works with any MCP client (Claude Desktop, Cursor, Windsurf)',
        'In-game chat co-op and reactive commands (come, kill, stop)',
        'Agent-designed builds via ASCII mc_design and mc_sculpt',
        'Background smart builds with survey and repair',
        'mc_play agent brain loop for continuous play',
        'Creative fast path with setblock',
        'Open source MIT — contribute house designs without TypeScript',
      ],
      screenshot: OG,
      softwareRequirements: 'Node.js 18+, Minecraft Java Edition server',
      releaseNotes: GH,
    },
    {
      '@type': 'HowTo',
      '@id': `${PAGE}#howto`,
      name: 'How to connect an AI agent to Minecraft with COBBLE',
      description:
        'Install cobble-mcp, wire it into any MCP client, and let your AI join a Minecraft Java world.',
      totalTime: 'PT10M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: [
        { '@type': 'HowToTool', name: 'Node.js 18+' },
        { '@type': 'HowToTool', name: 'Minecraft Java Edition server' },
        { '@type': 'HowToTool', name: 'MCP-compatible AI client' },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Start a Minecraft Java server',
          text: 'Use Creative mode and set online-mode=false so the offline bot can join.',
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Install cobble-mcp',
          text: 'Add the MCP server with command npx and args ["-y", "cobble-mcp"].',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Configure environment',
          text: 'Set MC_HOST, MC_PORT, MC_USERNAME, MC_AUTH=offline, MC_FAST=1, MC_BRAIN=agent.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Play',
          text: 'Tell your agent “play with me”, then chat in Minecraft: come, build, kill.',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'COBBLE',
          item: PAGE,
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${BASE}/#person`,
      name: 'Brian Munene Mwirigi',
      alternateName: 'Brian Munene',
      url: BASE,
      sameAs: [
        'https://github.com/brian-mwirigi',
        'https://www.npmjs.com/~brianmwirigi',
        'https://twitter.com/BrianMMwirigi',
      ],
      jobTitle: 'Software Engineer',
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE}#features`,
      name: 'COBBLE features',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Mineflayer co-op bot',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'MCP agent brain (mc_play)',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Agent-designed builds (mc_design)',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'In-game chat and combat',
        },
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
