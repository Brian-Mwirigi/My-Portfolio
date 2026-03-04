import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDocBySlug, getAllSlugs } from '@/lib/docs'
import DocContent from './DocContent'

const baseUrl = 'https://www.brianmunene.me'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const doc = getDocBySlug(params.slug)
  if (!doc) return {}

  const url = `${baseUrl}/docs/${doc.slug}`
  return {
    title: `${doc.title} — Docs | Brian Munene Mwirigi`,
    description: doc.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: doc.title,
      description: doc.excerpt,
      url,
      type: 'article',
      modifiedTime: doc.lastUpdated,
      authors: ['Brian Munene Mwirigi'],
    },
  }
}

export default function DocPage({ params }: { params: { slug: string } }) {
  const doc = getDocBySlug(params.slug)

  if (!doc) {
    notFound()
  }

  return <DocContent doc={doc} />
}
