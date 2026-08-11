'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type DragEvent,
} from 'react'
import { compileCanvasSource } from '@/lib/canvas-viewer/compile'
import {
  buildShareUrl,
  readSourceFromLocation,
} from '@/lib/canvas-viewer/share'
import { canvasTokens } from '@/lib/cursor-canvas/tokens'

type Mode = 'drop' | 'view'

export function CanvasViewer() {
  const [source, setSource] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [mode, setMode] = useState<Mode>('drop')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const compiled = useMemo(() => {
    if (!source.trim()) return null
    return compileCanvasSource(source)
  }, [source])

  useEffect(() => {
    const fromHash = readSourceFromLocation()
    if (fromHash) {
      setSource(fromHash)
      setFileName('shared.canvas.tsx')
      setMode('view')
      setError(null)
    }

    const onHash = () => {
      const next = readSourceFromLocation()
      if (next) {
        setSource(next)
        setFileName((f) => f ?? 'shared.canvas.tsx')
        setMode('view')
        setError(null)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (!compiled) return
    if (!compiled.ok) setError(compiled.error)
    else setError(null)
  }, [compiled])

  const loadText = useCallback(async (file: File) => {
    if (!file.name.endsWith('.tsx') && !file.name.endsWith('.canvas.tsx')) {
      setError('Drop a .canvas.tsx (or .tsx) file.')
      return
    }
    const text = await file.text()
    setSource(text)
    setFileName(file.name)
    setMode('view')
    setError(null)
    const url = buildShareUrl(text)
    window.history.replaceState(null, '', url.replace(window.location.origin, ''))
  }, [])

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault()
      setDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) void loadText(file)
    },
    [loadText]
  )

  const onFileInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) void loadText(file)
    },
    [loadText]
  )

  const share = useCallback(async () => {
    if (!source.trim()) return
    const url = buildShareUrl(source)
    window.history.replaceState(null, '', url.replace(window.location.origin, ''))
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this share link:', url)
    }
  }, [source])

  const clear = useCallback(() => {
    setSource('')
    setFileName(null)
    setMode('drop')
    setError(null)
    window.history.replaceState(null, '', '/canvas')
  }, [])

  const Comp = compiled?.ok ? compiled.Component : null

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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <a
            href="/"
            style={{
              color: canvasTokens.text.tertiary,
              fontSize: 12,
              textDecoration: 'none',
            }}
          >
            brianmunene.me
          </a>
          <span style={{ color: canvasTokens.stroke.primary }}>/</span>
          <strong style={{ fontSize: 13, fontWeight: 600 }}>Canvas viewer</strong>
          {fileName ? (
            <span
              style={{
                fontSize: 12,
                color: canvasTokens.text.tertiary,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {fileName}
            </span>
          ) : null}
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {mode === 'view' ? (
            <>
              <button type="button" onClick={() => setMode('drop')} style={btnStyle(false)}>
                Replace
              </button>
              <button type="button" onClick={share} style={btnStyle(true)}>
                {copied ? 'Copied' : 'Copy share link'}
              </button>
              <button type="button" onClick={clear} style={btnStyle(false)}>
                Clear
              </button>
            </>
          ) : null}
        </div>
      </header>

      {mode === 'drop' || !source ? (
        <div style={{ padding: 24, maxWidth: 720, margin: '0 auto' }}>
          <h1
            style={{
              margin: '24px 0 8px',
              fontSize: 28,
              fontWeight: 590,
              letterSpacing: '-0.02em',
            }}
          >
            Drop a Cursor canvas
          </h1>
          <p
            style={{
              margin: '0 0 24px',
              fontSize: 14,
              lineHeight: '20px',
              color: canvasTokens.text.secondary,
            }}
          >
            Anyone can upload a <code style={codeStyle}>.canvas.tsx</code> file,
            view it like in Cursor, and share a link with teammates. No account.
            The file stays in the URL — nothing is stored on a server.
          </p>

          <div
            onDragEnter={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragOver={(e) => {
              e.preventDefault()
              setDragging(true)
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click()
            }}
            style={{
              border: `1px dashed ${dragging ? canvasTokens.accent.primary : canvasTokens.stroke.primary}`,
              background: dragging ? canvasTokens.fill.tertiary : canvasTokens.bg.elevated,
              borderRadius: 10,
              padding: '48px 24px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>
              Drop <code style={codeStyle}>.canvas.tsx</code> here
            </div>
            <div style={{ fontSize: 13, color: canvasTokens.text.secondary }}>
              or click to choose a file
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".tsx,.canvas.tsx,text/plain"
              style={{ display: 'none' }}
              onChange={onFileInput}
            />
          </div>

          <div style={{ marginTop: 20 }}>
            <label
              style={{
                display: 'block',
                fontSize: 12,
                color: canvasTokens.text.tertiary,
                marginBottom: 8,
              }}
            >
              Or paste source
            </label>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder={`import { Stack, H1, Text } from "cursor/canvas"\n\nexport default function MyCanvas() {\n  return (\n    <Stack gap={16} style={{ padding: 24 }}>\n      <H1>Hello</H1>\n      <Text tone="secondary">Share this with your team.</Text>\n    </Stack>\n  )\n}`}
              rows={12}
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: 12,
                borderRadius: 8,
                border: `1px solid ${canvasTokens.stroke.tertiary}`,
                background: canvasTokens.bg.editor,
                color: canvasTokens.text.primary,
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: 12,
                lineHeight: '18px',
                resize: 'vertical',
              }}
            />
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button
                type="button"
                disabled={!source.trim()}
                onClick={() => {
                  if (!source.trim()) return
                  setMode('view')
                  setFileName((f) => f ?? 'pasted.canvas.tsx')
                  const url = buildShareUrl(source)
                  window.history.replaceState(
                    null,
                    '',
                    url.replace(window.location.origin, '')
                  )
                }}
                style={btnStyle(true)}
              >
                Render canvas
              </button>
            </div>
          </div>

          <p
            style={{
              marginTop: 28,
              fontSize: 12,
              lineHeight: '18px',
              color: canvasTokens.text.tertiary,
            }}
          >
            Only <code style={codeStyle}>cursor/canvas</code> imports are allowed
            (same rules as Cursor). Share links can run whatever is in the file —
            only open links from people you trust.
          </p>
        </div>
      ) : (
        <div>
          {error ? (
            <div
              style={{
                margin: 16,
                padding: '12px 14px',
                borderRadius: 8,
                border: `1px solid ${canvasTokens.stroke.secondary}`,
                background: canvasTokens.fill.tertiary,
                color: '#FC6B83',
                fontSize: 13,
                whiteSpace: 'pre-wrap',
              }}
            >
              {error}
            </div>
          ) : null}
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {Comp && !error ? <Comp /> : null}
          </div>
        </div>
      )}
    </div>
  )
}

function btnStyle(primary: boolean): CSSProperties {
  return {
    height: 28,
    padding: '0 10px',
    borderRadius: 6,
    border: primary
      ? '1px solid transparent'
      : `1px solid ${canvasTokens.stroke.secondary}`,
    background: primary ? canvasTokens.accent.control : 'transparent',
    color: primary ? canvasTokens.text.onAccent : canvasTokens.text.secondary,
    fontSize: 12,
    fontWeight: 500,
    cursor: 'pointer',
  }
}

const codeStyle: CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '0.92em',
  background: canvasTokens.fill.tertiary,
  padding: '1px 5px',
  borderRadius: 4,
}
