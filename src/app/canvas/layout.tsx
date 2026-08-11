import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Canvas viewer — drop a .canvas.tsx and share',
  description:
    'Upload a Cursor .canvas.tsx file, render it in the browser, and share a link with teammates. No account. Nothing stored on a server.',
  openGraph: {
    title: 'Canvas viewer — drop a .canvas.tsx and share',
    description:
      'Render Cursor canvas files in the browser and share them with your team.',
    url: 'https://brianmunene.me/canvas',
  },
}

export default function CanvasLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
