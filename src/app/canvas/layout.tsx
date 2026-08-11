import type { Metadata } from 'next'
import { DESC, KEYWORDS, PAGE, SHORT_TITLE, TITLE, faqs } from './seo'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  keywords: KEYWORDS,
  authors: [{ name: 'Brian Munene Mwirigi', url: 'https://brianmunene.me' }],
  creator: 'Brian Munene Mwirigi',
  openGraph: {
    title: SHORT_TITLE,
    description: DESC,
    url: PAGE,
    siteName: 'Brian Munene',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SHORT_TITLE,
    description: DESC,
    creator: '@BrianMMwirigi',
  },
  alternates: {
    canonical: PAGE,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Canvas Viewer',
      url: PAGE,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description: DESC,
      author: {
        '@type': 'Person',
        name: 'Brian Munene Mwirigi',
        url: 'https://brianmunene.me',
      },
      featureList: [
        'Upload .canvas.tsx files',
        'Render interactive canvases in the browser',
        'Short shareable links for teams',
        'Architecture reviews, specs, dashboards, audits',
        'Compatible with Cursor canvases and canvas SDK files',
      ],
    },
    {
      '@type': 'FAQPage',
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
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://brianmunene.me',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Canvas Viewer',
          item: PAGE,
        },
      ],
    },
  ],
}

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
