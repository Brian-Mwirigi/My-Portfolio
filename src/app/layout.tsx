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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
