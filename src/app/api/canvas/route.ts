import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const OWNER = 'brian-mwirigi'
const REPO = 'canvas-bins'
const MAX_BYTES = 180_000

function shortId(len = 8) {
  const alphabet = '23456789abcdefghijkmnopqrstuvwxyz'
  const bytes = crypto.getRandomValues(new Uint8Array(len))
  return Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('')
}

function getToken() {
  return (
    process.env.CANVAS_BINS_TOKEN ||
    process.env.GITHUB_TOKEN ||
    process.env.GH_TOKEN ||
    ''
  )
}

export async function POST(req: NextRequest) {
  try {
    const token = getToken()
    if (!token) {
      return NextResponse.json(
        {
          error:
            'Short links are not configured (missing CANVAS_BINS_TOKEN).',
          fallback: 'hash',
        },
        { status: 503 }
      )
    }

    const body = (await req.json()) as { source?: string; fileName?: string }
    const source = body.source?.trim() ?? ''
    if (!source) {
      return NextResponse.json({ error: 'Missing source.' }, { status: 400 })
    }
    if (source.length > MAX_BYTES) {
      return NextResponse.json(
        { error: 'Canvas too large (max ~180KB).' },
        { status: 413 }
      )
    }
    if (!/from\s*['"]cursor\/canvas['"]/.test(source)) {
      return NextResponse.json(
        {
          error:
            'File must use the canvas UI SDK (import from "cursor/canvas").',
        },
        { status: 400 }
      )
    }

    const id = shortId(8)
    const path = `${id}.canvas.tsx`
    const content = Buffer.from(source, 'utf8').toString('base64')

    const gh = await fetch(
      `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `share ${id}`,
          content,
          branch: 'main',
        }),
      }
    )

    if (!gh.ok) {
      const detail = await gh.text()
      console.error('canvas-bins upload failed', gh.status, detail)
      return NextResponse.json(
        { error: 'Failed to create short link.', detail: gh.status },
        { status: 502 }
      )
    }

    const origin = req.nextUrl.origin
    return NextResponse.json({
      id,
      url: `${origin}/canvas/${id}`,
      path: `/canvas/${id}`,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
