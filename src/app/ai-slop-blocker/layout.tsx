import { Metadata } from 'next'

const TITLE = 'AI Slop Blocker — Clean your feed of AI-generated content'
const DESC =
  'Instantly filter out AI-generated slop on Twitter, LinkedIn, Reddit, and more. A hybrid ML extension that runs locally to keep your feed human.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  applicationName: 'AI Slop Blocker',
  keywords: [
    'AI slop blocker',
    'block AI content',
    'detect AI posts',
    'filter AI on twitter',
    'filter AI on linkedin',
    'chrome extension',
    'AI content blocker',
    'machine learning',
    'local AI detection',
  ].join(', '),
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESC,
    siteName: 'Brian Munene — AI Slop Blocker',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
  },
}

export default function AISlopBlockerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 selection:bg-purple-500/30">
      {children}
    </div>
  )
}
