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
import { detectKind, type DocKind } from '@/lib/canvas-viewer/kind'
import {
  buildShareUrl,
  readSourceFromLocation,
} from '@/lib/canvas-viewer/share'
import { canvasTokens } from '@/lib/cursor-canvas/tokens'
import { MarkdownView } from './MarkdownView'

type Mode = 'drop' | 'view'

export function CanvasViewer() {
  const [source, setSource] = useState('')
  const [fileName, setFileName] = useState<string | null>(null)
  const [kind, setKind] = useState<DocKind>('canvas')
  const [mode, setMode] = useState<Mode>('drop')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [sharing, setSharing] = useState(false)
  const [shortPath, setShortPath] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const compiled = useMemo(() => {
    if (kind !== 'canvas' || !source.trim()) return null
    return compileCanvasSource(source)
  }, [kind, source])

  useEffect(() => {
    const fromHash = readSourceFromLocation()
    if (fromHash) {
      const k = detectKind(fromHash)
      setSource(fromHash)
      setKind(k)
      setFileName(k === 'markdown' ? 'shared.md' : 'shared.canvas.tsx')
      setMode('view')
      setError(null)
    }

    const onHash = () => {
      const next = readSourceFromLocation()
      if (next) {
        const k = detectKind(next)
        setSource(next)
        setKind(k)
        setFileName((f) => f ?? (k === 'markdown' ? 'shared.md' : 'shared.canvas.tsx'))
        setMode('view')
        setError(null)
      }
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    if (kind !== 'canvas') {
      setError(null)
      return
    }
    if (!compiled) return
    if (!compiled.ok) setError(compiled.error)
    else setError(null)
  }, [compiled, kind])

  const loadText = useCallback(async (file: File) => {
    const lower = file.name.toLowerCase()
    const ok =
      lower.endsWith('.md') ||
      lower.endsWith('.markdown') ||
      lower.endsWith('.tsx') ||
      lower.endsWith('.canvas.tsx')
    if (!ok) {
      setError('Drop a .canvas.tsx / .tsx or .md file.')
      return
    }
    const text = await file.text()
    const k = detectKind(text, file.name)
    setSource(text)
    setFileName(file.name)
    setKind(k)
    setMode('view')
    setError(null)
    setShortPath(null)
    window.history.replaceState(null, '', '/canvas')
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

  const copyText = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.prompt('Copy this share link:', url)
    }
  }

  const share = useCallback(async () => {
    if (!source.trim() || sharing) return
    setSharing(true)
    setError(null)
    try {
      const res = await fetch('/api/canvas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source, fileName }),
      })
      const data = (await res.json()) as {
        url?: string
        path?: string
        error?: string
        fallback?: string
      }

      if (res.ok && data.path) {
        setShortPath(data.path)
        window.history.replaceState(null, '', data.path)
        await copyText(data.url ?? `${window.location.origin}${data.path}`)
        return
      }

      const fat = buildShareUrl(source)
      window.history.replaceState(
        null,
        '',
        fat.replace(window.location.origin, '')
      )
      await copyText(fat)
      if (data.error) {
        setError(
          `${data.error} Copied a long fallback link instead — add CANVAS_BINS_TOKEN on Vercel for short URLs.`
        )
      }
    } catch {
      const fat = buildShareUrl(source)
      window.history.replaceState(
        null,
        '',
        fat.replace(window.location.origin, '')
      )
      await copyText(fat)
      setError('Short link failed — copied a long fallback link instead.')
    } finally {
      setSharing(false)
    }
  }, [source, fileName, sharing])

  const clear = useCallback(() => {
    setSource('')
    setFileName(null)
    setKind('canvas')
    setMode('drop')
    setError(null)
    setShortPath(null)
    window.history.replaceState(null, '', '/canvas')
  }, [])

  const renderPasted = () => {
    if (!source.trim()) return
    const k = detectKind(source, fileName)
    setKind(k)
    setFileName((f) => f ?? (k === 'markdown' ? 'pasted.md' : 'pasted.canvas.tsx'))
    setMode('view')
    setShortPath(null)
    window.history.replaceState(null, '', '/canvas')
  }

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
          {mode === 'view' ? (
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
            </span>
          ) : null}
          {shortPath ? (
            <code
              style={{
                fontSize: 12,
                color: canvasTokens.text.secondary,
                fontFamily:
                  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              }}
            >
              {shortPath}
            </code>
          ) : fileName ? (
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
              <button
                type="button"
                onClick={share}
                disabled={sharing}
                style={btnStyle(true)}
              >
                {sharing ? 'Creating…' : copied ? 'Copied' : 'Copy short link'}
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
            Free canvas & markdown viewer
          </h1>
          <p
            style={{
              margin: '0 0 24px',
              fontSize: 14,
              lineHeight: '20px',
              color: canvasTokens.text.secondary,
            }}
          >
            Drop a <code style={codeStyle}>.canvas.tsx</code> or{' '}
            <code style={codeStyle}>.md</code> file — reviews, specs, notes,
            dashboards, audits — render it live and share a short team link like{' '}
            <code style={codeStyle}>/canvas/a8k2m9qx</code>.
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
              Drop <code style={codeStyle}>.canvas.tsx</code> or{' '}
              <code style={codeStyle}>.md</code> here
            </div>
            <div style={{ fontSize: 13, color: canvasTokens.text.secondary }}>
              or click to choose a file
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".tsx,.canvas.tsx,.md,.markdown,text/plain,text/markdown"
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
              Or paste canvas TSX / markdown
            </label>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder={`# Product notes\n\nPaste **markdown** or a \`.canvas.tsx\` file.\n\n- Short links for teammates\n- No account\n- GFM tables supported`}
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
                onClick={renderPasted}
                style={btnStyle(true)}
              >
                Render
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
            Markdown = any <code style={codeStyle}>.md</code>. Canvas = import the
            UI SDK (<code style={codeStyle}>cursor/canvas</code>). Short links are
            public — only open ones from people you trust.
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
          {kind === 'markdown' ? (
            <MarkdownView source={source} />
          ) : (
            <div style={{ maxWidth: 1100, margin: '0 auto' }}>
              {Comp && compiled?.ok ? <Comp /> : null}
            </div>
          )}
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
