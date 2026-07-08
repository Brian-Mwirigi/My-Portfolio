import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const crackedDirectory = path.join(process.cwd(), 'content/cracked')

export interface CrackedPost {
  slug: string
  title: string
  excerpt: string
  date: string
  week?: number
  phase?: string
  pinned?: boolean
  tags: string[]
  content: string
}

export function getAllCrackedPosts(): CrackedPost[] {
  if (!fs.existsSync(crackedDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(crackedDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(crackedDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        week: data.week,
        phase: data.phase,
        pinned: data.pinned ?? false,
        tags: data.tags || [],
        content,
      }
    })

  return posts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return a.date > b.date ? -1 : 1
  })
}

export function getCrackedPostBySlug(slug: string): CrackedPost | null {
  try {
    const fullPath = path.join(crackedDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      week: data.week,
      phase: data.phase,
      pinned: data.pinned ?? false,
      tags: data.tags || [],
      content,
    }
  } catch {
    return null
  }
}

export function getAllCrackedSlugs(): string[] {
  if (!fs.existsSync(crackedDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(crackedDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''))
}
