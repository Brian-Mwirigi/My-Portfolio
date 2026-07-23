import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'
import { getAllCrackedPosts } from '@/lib/cracked'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://brianmunene.me'

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all blog posts
  const posts = getAllPosts()
  
  // Blog post URLs
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const crackedPosts = getAllCrackedPosts()
  const crackedUrls = crackedPosts.map((post) => ({
    url: `${baseUrl}/cracked/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }))

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aux-mcp`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/cobble-mcp`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/costhq`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/cracked`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/docs/costhq-docs`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: `${baseUrl}/brian-munene-mwirigi`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
  ]

  return [...staticPages, ...blogUrls, ...crackedUrls]
}
