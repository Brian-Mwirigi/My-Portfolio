import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brian Munene Mwirigi | Full Stack Developer — Nairobi, Kenya',
  description: 'Brian Munene Mwirigi (also known as Brian Mwirigi) is a Full Stack Developer and CS student at Strathmore University, Nairobi, Kenya. Specializing in React, TypeScript, and Python. Building CLI tools, Chrome extensions, and production-ready applications.',
  keywords: 'Brian Munene Mwirigi, Brian Mwirigi, Brian Munene, Full Stack Developer, React Developer, TypeScript, Python, Flask, Kenya, Nairobi, Strathmore University, Remote Developer, CLI Tools, Chrome Extensions, SaaS Developer',
  openGraph: {
    title: 'Brian Munene Mwirigi | Full Stack Developer — Nairobi, Kenya',
    description: 'Brian Munene Mwirigi — Full Stack Developer based in Nairobi, Kenya. Building CLI tools, Chrome extensions, and full-stack applications.',
    type: 'website',
    url: 'https://www.brianmunene.me',
  },
  twitter: {
    card: 'summary',
    title: 'Brian Munene Mwirigi | Full Stack Developer — Nairobi, Kenya',
    description: 'Brian Munene Mwirigi — Full Stack Developer based in Nairobi, Kenya.',
    creator: '@BrianMMwirigi',
  },
  alternates: {
    canonical: 'https://www.brianmunene.me',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Brian Munene Mwirigi',
  alternateName: ['Brian Mwirigi', 'Brian Munene'],
  url: 'https://www.brianmunene.me',
  sameAs: [
    'https://github.com/brian-mwirigi',
    'https://linkedin.com/in/brian-munene-mwirigi',
    'https://x.com/BrianMMwirigi',
    'https://dev.to/brian_mwirigi',
    'https://www.npmjs.com/~brian-mwirigi',
  ],
  jobTitle: 'Full Stack Developer',
  description: 'Full Stack Developer and Computer Science student at Strathmore University. Creator of aitoken-cli, CostHQ, devmem-cli, runbook-cli, and apisnap-cli.',
  knowsAbout: ['React', 'TypeScript', 'Python', 'Node.js', 'Flask', 'CLI Tools', 'Chrome Extensions', 'Full Stack Development'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Strathmore University',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nairobi',
      addressCountry: 'KE',
    },
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Nairobi',
    addressCountry: 'KE',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
