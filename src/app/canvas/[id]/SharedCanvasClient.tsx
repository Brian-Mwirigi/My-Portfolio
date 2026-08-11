'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { compileCanvasSource } from '@/lib/canvas-viewer/compile'
import type { DocKind } from '@/lib/canvas-viewer/kind'
import { canvasTokens } from '@/lib/cursor-canvas/tokens'
import { MarkdownView } from '../MarkdownView'

export function SharedCanvasClient({
  id,
  source,
  kind,
  fileName,
}: {
  id: string
  source: string
  kind: DocKind
  fileName?: string
}) {
  const compiled = useMemo(() => {
    if (kind !== 'canvas') return null
    return compileCanvasSource(source)
  }, [kind, source])
  const [copied, setCopied] = useState(false)
  const Comp = compiled?.ok ? compiled.Component : null

  const copy = async () => {
    const url = `${window.location.origin}/canvas/${id}`
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy link:', url)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: canvasTokens.bg.chrome,
        color: canvasTokens.text.primary,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '10px 16px',
          borderBottom: `1px solid ${canvasTokens.stroke.tertiary}`,
          background: canvasTokens.bg.chrome,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/canvas"
            style={{
              color: canvasTokens.text.tertiary,
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            Canvas viewer
          </Link>
          <span style={{ color: canvasTokens.stroke.primary }}>/</span>
          <code
            style={{
              fontSize: 12,
              color: canvasTokens.text.secondary,
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            }}
          >
            {id}
          </code>
          <span
            style={{
              fontSize: 11,
              color: canvasTokens.text.tertiary,
              border: `1px solid ${canvasTokens.stroke.tertiary}`,
              borderRadius: 999,
              padding: '2px 8px',
            }}
          >
            {kind === 'markdown' ? 'markdown' : 'canvas'}
            {fileName ? ` · ${fileName}` : ''}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          style={{
            height: 28,
            padding: '0 10px',
            borderRadius: 6,
            border: '1px solid transparent',
            background: canvasTokens.accent.control,
            color: canvasTokens.text.onAccent,
            fontSize: 12,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {copied ? 'Copied' : 'Copy short link'}
        </button>
      </header>

      {kind === 'markdown' ? (
        <MarkdownView source={source} />
      ) : compiled && !compiled.ok ? (
        <div
          style={{
            margin: 16,
            padding: 14,
            borderRadius: 8,
            color: '#FC6B83',
            background: canvasTokens.fill.tertiary,
            fontSize: 13,
          }}
        >
          {compiled.error}
        </div>
      ) : (
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {Comp ? <Comp /> : null}
        </div>
      )}
    </div>
  )
}
