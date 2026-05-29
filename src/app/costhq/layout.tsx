import { Metadata } from 'next'

const BASE = 'https://brianmunene.me'
const PAGE = `${BASE}/codesession-cli`
const TITLE = 'codesession-cli — Coding Session & AI Cost Tracker for Developers'
const DESC =
  'Track coding sessions, file changes, git commits, and AI API costs from the terminal. Free CLI with web dashboard. Works with Claude, GPT-4, Gemini & more. npm install -g codesession-cli'

export const metadata: Metadata = {
  // ── Core ──────────────────────────────────────────────────────────────────
  title: TITLE,
  description: DESC,
  applicationName: 'codesession-cli',

  // ── Keywords — every real variation people search ─────────────────────────
  keywords: [
    // Brand exact + variations
    'codesession-cli',
    'codesession cli',
    'codesession',
    'code session cli',
    'cs cli tool',
    // What it does — functional queries
    'coding session tracker',
    'code session tracker',
    'developer session tracker',
    'coding time tracker cli',
    'track coding sessions',
    'track developer time cli',
    // AI cost angle — fast-growing search intent
    'AI cost tracking cli',
    'AI API cost tracker',
    'track AI costs developer',
    'AI spending tracker',
    'claude cost tracker',
    'openai cost tracker cli',
    'anthropic cost tracker',
    'gpt4 cost tracking',
    'llm cost tracker cli',
    'AI token cost tracker',
    'AI agent cost tracking',
    // Tool stack
    'npm session tracker',
    'npm coding tracker',
    'node cli session tracker',
    'cli time tracking developer',
    'terminal session tracker',
    // Specific features
    'git commit session tracker',
    'file change tracker cli',
    'developer productivity cli',
    'coding stats cli',
    'developer dashboard cli',
    'codesession dashboard',
    // Agent / automation
    'AI agent session manager',
    'openclaw codesession skill',
    'agent budget tracking',
    'programmatic session tracking',
    // Long-tail
    'how to track AI API costs development',
    'cli tool track time and ai costs',
    'open source coding session tracker',
    'free developer time tracker cli',
    'npm install codesession-cli',
  ].join(', '),

  // ── Canonical + alternates ────────────────────────────────────────────────
  alternates: {
    canonical: PAGE,
  },

  // ── Authors / attribution ─────────────────────────────────────────────────
  authors: [{ name: 'Brian Munene', url: BASE }],
  creator: 'Brian Munene',
  publisher: 'Brian Munene',

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    url: PAGE,
    title: TITLE,
    description: DESC,
    siteName: 'Brian Munene — codesession-cli',
    images: [
      {
        url: 'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png',
        width: 1280,
        height: 800,
        alt: 'codesession-cli web dashboard — real-time AI cost analytics and session tracking',
      },
    ],
    locale: 'en_US',
  },

  // ── Twitter / X card ─────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESC,
    creator: '@brianmunene',
    images: [
      'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png',
    ],
  },

  // ── Crawling / indexing ───────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  // ── Verification placeholders ─────────────────────────────────────────────
  // verification: { google: 'YOUR_CODE', yandex: 'YOUR_CODE' },

  // ── Category ─────────────────────────────────────────────────────────────
  category: 'Developer Tools',
}

// ── JSON-LD structured data ───────────────────────────────────────────────────

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    // SoftwareApplication — makes Google show install / rating rich results
    {
      '@type': 'SoftwareApplication',
      name: 'codesession-cli',
      alternateName: ['codesession cli', 'cs cli', 'code session tracker'],
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: 'Developer Productivity Tool',
      operatingSystem: 'Windows, macOS, Linux',
      softwareVersion: '2.2.0',
      datePublished: '2025-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      description: DESC,
      url: PAGE,
      downloadUrl: 'https://www.npmjs.com/package/codesession-cli',
      installUrl: 'https://www.npmjs.com/package/codesession-cli',
      codeRepository: 'https://github.com/brian-mwirigi/codesession-cli',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      author: {
        '@type': 'Person',
        name: 'Brian Munene',
        url: BASE,
        sameAs: [
          'https://github.com/brian-mwirigi',
          'https://www.npmjs.com/~brian-mwirigi',
        ],
      },
      keywords:
        'codesession-cli, coding session tracker, AI cost tracking, developer tools, npm, CLI, git, file watcher',
      featureList: [
        'Automatic coding session time tracking',
        'Git commit capture and logging',
        'File change monitoring via chokidar',
        'AI API cost logging for 17+ models',
        'Real-time web analytics dashboard',
        'Budget alerts with browser notifications',
        'Programmatic TypeScript API',
        'OpenClaw skill integration',
        'Local SQLite storage — no cloud',
        'JSON output mode for CI/CD and agents',
      ],
      screenshot: [
        'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/dashboard-overview.png',
        'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/cost-charts.png',
        'https://raw.githubusercontent.com/brian-mwirigi/codesession-cli/main/docs/screenshots/session-detail.png',
      ],
      sameAs: [
        'https://www.npmjs.com/package/codesession-cli',
        'https://github.com/brian-mwirigi/codesession-cli',
        'https://clawhub.ai/brian-mwirigi/codesession',
      ],
    },

    // BreadcrumbList — gives Google the site hierarchy
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Brian Munene',
          item: BASE,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'codesession-cli',
          item: PAGE,
        },
      ],
    },

    // FAQPage — targets "People Also Ask" boxes
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is codesession-cli?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codesession-cli (npm: codesession-cli) is a free, open-source command-line tool that tracks your coding sessions. It automatically logs session duration, file changes, git commits, and AI API costs (Claude, GPT-4, Gemini, etc.) to a local SQLite database — no cloud sync required.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I install codesession-cli?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Install globally via npm: `npm install -g codesession-cli`. Requires Node.js and build tools (e.g. `xcode-select --install` on macOS, `sudo apt-get install build-essential` on Linux). Then run `cs start "your task"` to begin tracking.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I track AI API costs with codesession-cli?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Use `cs log-ai -p <provider> -m <model> --prompt-tokens <n> --completion-tokens <n>` after each AI API call. codesession-cli has built-in pricing for 17+ models including Claude, GPT-4o, Gemini, and more. It calculates cost automatically and adds it to the active session.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does codesession-cli store data in the cloud?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. All data is stored locally in a SQLite database at ~/.codesession/sessions.db. There is no telemetry, no cloud sync, and no external network connections. Your session data and AI costs never leave your machine.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does codesession-cli have a web dashboard?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Since v2.0.0, running `cs dashboard` opens a local analytics server at http://localhost:3737. It shows real-time KPIs, 30-day cost projections, daily cost charts, per-model breakdowns, activity heatmaps, and budget alerts. It binds to 127.0.0.1 by default for privacy.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use codesession-cli with AI agents?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. codesession-cli has a full programmatic TypeScript API (`import { AgentSession } from "codesession-cli/agents"`). It supports hard budget caps via BudgetExceededError, mid-session affordability checks, and JSON output mode for CI/CD pipelines. It also ships as an OpenClaw skill on ClawHub.',
          },
        },
        {
          '@type': 'Question',
          name: 'What AI models does codesession-cli support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'codesession-cli ships with built-in pricing for 17+ models including Claude (Anthropic), GPT-4o, GPT-4 (OpenAI), Gemini (Google), Azure OpenAI, and Cohere. You can also add custom model pricing with `cs pricing set <model> <input-price> <output-price>`.',
          },
        },
      ],
    },
  ],
}

export default function CodeSessionLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  )
}
