import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Brian Munene | Full Stack Developer',
  description: 'Full Stack Developer specializing in React, TypeScript, and Python. Building production-ready web applications for healthcare, e-commerce, and SaaS.',
  keywords: ['Full Stack Developer', 'React Developer', 'TypeScript', 'Python', 'Flask', 'Kenya', 'Remote Developer', 'Web Developer'],
  authors: [{ name: 'Brian Munene' }],
  openGraph: {
    title: 'Brian Munene | Full Stack Developer',
    description: 'Building production-ready web applications for healthcare, e-commerce, and SaaS.',
    url: 'https://brianmunene.dev',
    siteName: 'Brian Munene Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brian Munene | Full Stack Developer',
    description: 'Building production-ready web applications for healthcare, e-commerce, and SaaS.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}
