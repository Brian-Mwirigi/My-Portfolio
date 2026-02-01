'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { blogPosts } from '../page'

// Sample blog content - in a real app, this would come from a CMS or markdown files
const blogContent: Record<string, string> = {
  'building-jarvis-ai-assistant': `
## The Vision

Ever since I watched Iron Man, I've been fascinated by the idea of having a personal AI assistant. Last month, I finally decided to build my own version of Jarvis.

## Tech Stack

I chose Python for this project because of its excellent AI/ML ecosystem:

- **OpenAI API** - For natural language understanding and generation
- **SpeechRecognition** - For converting voice to text
- **pyttsx3** - For text-to-speech responses
- **Python** - The glue that holds everything together

## The Journey

### Week 1: Basic Voice Commands

Started with simple voice recognition. Getting the microphone to work reliably was harder than expected. Pro tip: always handle the ambient noise adjustment.

\`\`\`python
import speech_recognition as sr

r = sr.Recognizer()
with sr.Microphone() as source:
    r.adjust_for_ambient_noise(source, duration=1)
    audio = r.listen(source)
\`\`\`

### Week 2: Adding Intelligence

Integrated OpenAI's API to make the responses actually useful. The key was crafting the right system prompt to give Jarvis personality.

### Week 3: Making It Useful

Added practical features:
- Weather updates
- Calendar integration
- Email summaries
- Code assistance

## What I Learned

1. **Start simple** - Get voice recognition working first
2. **Handle errors gracefully** - Network issues, API limits, unclear speech
3. **Test in real conditions** - Your quiet room isn't real life

## What's Next

Planning to add:
- Smart home integration
- Multi-language support
- Custom wake word detection

Check out the code on [GitHub](https://github.com/brian-mwirigi/Jarvis)!
  `,
  
  'chrome-extensions-journey': `
## How It Started

I was frustrated with TikTok watermarks on downloaded videos. Instead of searching for a solution, I decided to build one myself.

## The Extensions

### 1. TikTok Video Downloader (30+ users)

My first extension. Learning the Chrome Extension manifest v3 was a journey, but seeing that first download work was magical.

### 2. AI Slop Blocker (53 users)

With AI-generated content flooding the internet, I built this to help filter it out. Uses pattern matching and ML indicators.

### 3. Twitter Thread Downloader (67 users)

The most popular one! Turns Twitter threads into readable formats. The challenge was handling Twitter's dynamic content loading.

### 4. InstantCurrency (5 users)

A simple but useful currency converter. Taught me about working with financial APIs.

## Key Learnings

1. **Solve your own problems** - You'll understand the use case better
2. **Ship early** - My first versions were rough but worked
3. **Listen to feedback** - Users found bugs I never would have
4. **Keep it simple** - One feature, done well

## Chrome Web Store Tips

- Good icons matter more than you think
- Write clear descriptions
- Screenshots are essential
- Respond to reviews

## Revenue?

These are all free. The goal was learning and helping people, not money. Though I might add optional donations later.
  `,

  'healthcare-app-telemedicine': `
## The Problem

Healthcare access in Kenya can be challenging, especially in remote areas. Galaxy Medicare aims to bridge that gap with telemedicine.

## Architecture

### Backend (Python Flask)

\`\`\`
├── app/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
├── config.py
└── run.py
\`\`\`

### Key Features

- **Video consultations** - WebRTC integration
- **Appointment scheduling** - With reminders
- **Prescription management** - Digital prescriptions
- **Patient records** - Secure, HIPAA-inspired design

## Technical Challenges

### 1. Real-time Video

WebRTC is complex. Handling peer connections, ICE candidates, and fallbacks took weeks to get right.

### 2. Data Security

Medical data is sensitive. Implemented:
- End-to-end encryption
- Role-based access
- Audit logging
- Secure file storage

### 3. Offline Support

Many users have unreliable internet. Added:
- Progressive Web App features
- Offline appointment viewing
- Queue system for sync

## Lessons Learned

Building healthcare software taught me the importance of:
- **Reliability** - People depend on this
- **Accessibility** - Not everyone has fast internet
- **Privacy** - Trust is everything

## Impact

While still in development, early testing has been promising. The goal is to eventually deploy this in rural clinics.
  `,

  'react-typescript-tips': `
## Why TypeScript?

After debugging too many "undefined is not a function" errors, I made the switch. Here are patterns I use daily.

## 1. Component Props

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

const Button = ({ 
  variant, 
  size = 'md', 
  isLoading = false,
  children,
  onClick 
}: ButtonProps) => {
  // ...
}
\`\`\`

## 2. Generic Components

\`\`\`typescript
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}
\`\`\`

## 3. Custom Hooks

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  return [value, setValue] as const
}
\`\`\`

## 4. API Response Types

\`\`\`typescript
interface ApiResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url)
  return response.json()
}
\`\`\`

## Pro Tips

- Use \`as const\` for literal types
- Prefer interfaces for objects, types for unions
- Use \`unknown\` instead of \`any\`
- Enable strict mode in tsconfig

TypeScript has saved me countless hours of debugging. The initial investment pays off quickly.
  `,

  'my-dev-setup-2026': `
## Hardware

- **MacBook Pro M3** - For the power
- **27" 4K Monitor** - Code needs space
- **Mechanical Keyboard** - Keychron K2
- **Standing Desk** - Health matters

## VS Code Setup

### Theme
Currently using **One Dark Pro** with some customizations.

### Essential Extensions

1. **GitHub Copilot** - AI pair programming
2. **Prettier** - Code formatting
3. **ESLint** - Linting
4. **GitLens** - Git superpowers
5. **Thunder Client** - API testing
6. **Tailwind CSS IntelliSense** - Autocomplete

### Settings I Can't Live Without

\`\`\`json
{
  "editor.fontSize": 14,
  "editor.fontFamily": "JetBrains Mono",
  "editor.fontLigatures": true,
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
\`\`\`

## Terminal

Using **iTerm2** with **Oh My Zsh** and the **Powerlevel10k** theme.

### Aliases I Use Daily

\`\`\`bash
alias gs="git status"
alias gc="git commit -m"
alias gp="git push"
alias dev="npm run dev"
alias build="npm run build"
\`\`\`

## Apps

- **Raycast** - Spotlight replacement
- **Rectangle** - Window management
- **Notion** - Notes and planning
- **Figma** - Design
- **Postman** - API testing

## Browser

Chrome with my own extensions (of course) plus:
- React DevTools
- Redux DevTools
- JSON Viewer

## The Philosophy

My setup prioritizes:
1. **Speed** - Fast boot, fast commands
2. **Simplicity** - Only what I need
3. **Consistency** - Same setup everywhere

What's your setup? Hit me up on Twitter!
  `,
}

export default function BlogPost() {
  const params = useParams()
  const slug = params.slug as string
  const post = blogPosts.find(p => p.slug === slug)
  const content = blogContent[slug] || ''

  if (!post) {
    return (
      <main className="bg-[#0a0a0a] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-neutral-400 hover:text-white">
            ← Back to Blog
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-[#0a0a0a] text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-800/50">
        <Link href="/blog" className="text-sm tracking-widest hover:text-neutral-400 transition">
          ← BLOG
        </Link>
        <span className="text-xs tracking-[0.3em] text-neutral-500">{post.category}</span>
        <div className="w-12" />
      </nav>

      {/* Hero Image */}
      <div className="relative h-[50vh] md:h-[60vh]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
      </div>

      {/* Content */}
      <article className="relative -mt-32 z-10 px-8 md:px-16 pb-32">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-neutral-500 mb-6">
              <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-12">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Article Content */}
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-neutral-300 prose-p:leading-relaxed
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-code:text-pink-400 prose-code:bg-neutral-900 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-neutral-900 prose-pre:border prose-pre:border-neutral-800
              prose-ul:text-neutral-300 prose-ol:text-neutral-300
              prose-li:marker:text-neutral-600
            ">
              {content.split('\n').map((paragraph, i) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i}>{paragraph.replace('## ', '')}</h2>
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i}>{paragraph.replace('### ', '')}</h3>
                }
                if (paragraph.startsWith('```')) {
                  return null // Skip code fence markers
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={i}>{paragraph.replace('- ', '')}</li>
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ') || paragraph.startsWith('4. ')) {
                  return <li key={i}>{paragraph.replace(/^\d+\. /, '')}</li>
                }
                if (paragraph.trim() === '') {
                  return null
                }
                return <p key={i}>{paragraph}</p>
              })}
            </div>

            {/* Share & Navigation */}
            <div className="mt-16 pt-8 border-t border-neutral-800">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <p className="text-sm text-neutral-500 mb-2">Share this post</p>
                  <div className="flex gap-4">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://brianmunene.dev/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-neutral-800 rounded-full text-sm hover:bg-white hover:text-black transition"
                    >
                      Twitter
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://brianmunene.dev/blog/${post.slug}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-neutral-800 rounded-full text-sm hover:bg-white hover:text-black transition"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="px-6 py-3 bg-white text-black rounded-full text-sm tracking-widest hover:bg-neutral-200 transition"
                >
                  MORE POSTS →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-neutral-800 py-8 px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <span>© 2026 BRIAN MUNENE</span>
          <Link href="/" className="hover:text-white transition">BACK TO HOME →</Link>
        </div>
      </footer>
    </main>
  )
}
