import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shared canvas',
  robots: { index: false, follow: true },
}

export default function SharedCanvasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
