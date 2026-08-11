import Link from 'next/link'
import { NotFoundExcuse } from './NotFoundExcuse'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 24,
        background: '#0a0a0a',
        color: '#f5f5f5',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      <div style={{ maxWidth: 520, width: '100%' }}>
        <p
          style={{
            margin: 0,
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#888',
          }}
        >
          HTTP // emotional support edition
        </p>

        <h1
          style={{
            margin: '12px 0 0',
            fontSize: 'clamp(64px, 18vw, 120px)',
            lineHeight: 0.9,
            fontWeight: 700,
            letterSpacing: '-0.06em',
          }}
        >
          404
        </h1>

        <p
          style={{
            margin: '16px 0 0',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          This page dipped.
        </p>

        <NotFoundExcuse />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: 28,
          }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 40,
              padding: '0 16px',
              borderRadius: 999,
              background: '#f5f5f5',
              color: '#0a0a0a',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Take me home
          </Link>
          <Link
            href="/canvas"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 40,
              padding: '0 16px',
              borderRadius: 999,
              border: '1px solid #333',
              color: '#f5f5f5',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Drop a canvas instead
          </Link>
          <Link
            href="/cracked"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 40,
              padding: '0 16px',
              borderRadius: 999,
              border: '1px solid #333',
              color: '#f5f5f5',
              fontSize: 14,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Read CRACKED
          </Link>
        </div>

        <p
          style={{
            margin: '24px 0 0',
            fontSize: 12,
            color: '#666',
          }}
        >
          If you followed a link from me: my bad. If you typed this yourself:
          respect the curiosity, wrong door though.
        </p>
      </div>
    </main>
  )
}
