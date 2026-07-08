import type { Metadata } from 'next'

const baseUrl = 'https://www.brianmunene.me'

export const metadata: Metadata = {
  title: 'BIP-100 — Project CRACKED',
  description: 'One post a week on what I actually built or broke. Personal log.',
  alternates: {
    canonical: `${baseUrl}/cracked`,
  },
  openGraph: {
    title: 'BIP-100 — Project CRACKED',
    description: 'One post a week on what I actually built or broke. Personal log.',
    url: `${baseUrl}/cracked`,
    siteName: 'Brian Munene Mwirigi',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIP-100 — Project CRACKED',
    description: 'One post a week on what I actually built or broke.',
    creator: '@BrianMMwirigi',
  },
}

export default function CrackedLayout({ children }: { children: React.ReactNode }) {
  return children
}
