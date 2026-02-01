import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'
import BlogPostContent from './BlogPostContent'

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <BlogPostContent post={post} />
}
