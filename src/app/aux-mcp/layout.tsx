import { Metadata } from 'next'
import { Syne, IBM_Plex_Mono } from 'next/font/google'
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

export const metadata: Metadata = {
  title: {
    default: TITLE,
    absolute: TITLE,
  },
  description: DESC,
  applicationName: 'AUX',
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
  classification: 'Spotify AI / Model Context Protocol',
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
        alt: 'AUX — Spotify, for your AI',
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
    'theme-color': '#1ed760',
    'color-scheme': 'dark',
    'application-name': 'AUX',
    'apple-mobile-web-app-title': 'AUX',
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
      inLanguage: 'en-US',
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
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2'],
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${PAGE}#software`,
      name: 'AUX',
      alternateName: [
        'spotify-aux',
        'aux-mcp',
        'AUX MCP',
        'Spotify for your AI',
        'Spotify AUX',
      ],
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Spotify AI / Model Context Protocol',
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
        'Full Spotify Web API as an MCP server',
        'vibe — LLM invents searches and ranks the catalog',
        'anti_algorithm discovery that dodges top tracks and chart bait',
        'context_vibe using local time and weather',
        'roast_my_playlist and ASCII share cards',
        'playlist_dna archetypes and weekly_report',
        'party rooms with local friend relay',
        'auto-DJ session refill loop',
        'Works with Cursor, Claude Desktop, Windsurf, any MCP client',
        'Browser roast site via npx spotify-aux web',
        'Open source MIT on npm as spotify-aux',
      ],
      screenshot: OG,
      softwareRequirements:
        'Node.js 20+, Spotify Developer app credentials, MCP-compatible AI client',
      releaseNotes: GH,
    },
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${PAGE}#source`,
      name: 'aux-mcp',
      codeRepository: GH,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Node.js',
      license: 'https://opensource.org/licenses/MIT',
      url: GH,
      about: { '@id': `${PAGE}#software` },
    },
    {
      '@type': 'HowTo',
      '@id': `${PAGE}#howto`,
      name: 'How to connect Spotify to Cursor or Claude with AUX',
      description:
        'Install spotify-aux, add it to your MCP client, log in with Spotify PKCE, and start vibing from chat.',
      totalTime: 'PT8M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'USD',
        value: '0',
      },
      tool: [
        { '@type': 'HowToTool', name: 'Node.js 20+' },
        { '@type': 'HowToTool', name: 'Spotify Developer Dashboard app' },
        { '@type': 'HowToTool', name: 'MCP-compatible AI client (Cursor, Claude Desktop)' },
      ],
      supply: [
        {
          '@type': 'HowToSupply',
          name: 'SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET',
        },
      ],
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Create a Spotify app',
          text: 'In the Spotify Developer Dashboard, create an app and add redirect URI http://127.0.0.1:7654/callback exactly.',
          url: PAGE,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Add AUX to your MCP client',
          text: 'Configure mcpServers.aux with command npx and args ["-y", "spotify-aux"], plus SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET env vars.',
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Log in',
          text: 'Run npx -y spotify-aux login and complete the PKCE OAuth flow in the browser.',
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Vibe',
          text: 'In Cursor or Claude say “rainy 2am drive”, “roast my top tracks”, or “start auto DJ”.',
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
          name: 'AUX',
          item: PAGE,
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': `${BASE}/#person`,
      name: 'Brian Munene Mwirigi',
      alternateName: ['Brian Munene', 'Brian Mwirigi'],
      url: BASE,
      sameAs: [
        'https://github.com/brian-mwirigi',
        'https://www.npmjs.com/~brianmwirigi',
        'https://twitter.com/BrianMMwirigi',
        'https://x.com/BrianMMwirigi',
      ],
      jobTitle: 'Software Engineer',
    },
    {
      '@type': 'ItemList',
      '@id': `${PAGE}#features`,
      name: 'AUX peak hooks and features',
      numberOfItems: 8,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'vibe — open-world AI DJ' },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'anti_algorithm discovery',
        },
        { '@type': 'ListItem', position: 3, name: 'context_vibe (time + weather)' },
        { '@type': 'ListItem', position: 4, name: 'roast_my_playlist + ASCII cards' },
        { '@type': 'ListItem', position: 5, name: 'playlist_dna archetypes' },
        { '@type': 'ListItem', position: 6, name: 'weekly_report' },
        { '@type': 'ListItem', position: 7, name: 'party rooms + party-host relay' },
        { '@type': 'ListItem', position: 8, name: 'auto-DJ refill loop' },
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
