import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getCrackedPostBySlug, getAllCrackedSlugs } from '@/lib/cracked'
import CrackedContent from './CrackedContent'

const baseUrl = 'https://www.brianmunene.me'

export async function generateStaticParams() {
  const slugs = getAllCrackedSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getCrackedPostBySlug(params.slug)
  if (!post) return {}

  const url = `${baseUrl}/cracked/${post.slug}`
  return {
    title: `${post.title} — CRACKED`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: 'Brian Munene Mwirigi',
      type: 'article',
      publishedTime: post.date,
      authors: ['Brian Munene Mwirigi'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      creator: '@BrianMMwirigi',
    },
  }
}

export default function CrackedPostPage({ params }: { params: { slug: string } }) {
  const post = getCrackedPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <CrackedContent post={post} />
}
