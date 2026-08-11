import type { CSSProperties } from 'react'
import { faqs } from './seo'

const uses = [
  'Architecture reviews',
  'Product & GTM specs',
  'Metrics / billing dashboards',
  'Security audits',
  'Competitive analyses',
  'Roadmaps & status reports',
  'Agent-generated briefings',
  'Design / systems writeups',
]

export function CanvasSeoContent() {
  return (
    <section
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '8px 24px 64px',
        color: '#E4E4E48D',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
      }}
    >
      <h2
        style={{
          margin: '32px 0 8px',
          fontSize: 18,
          fontWeight: 590,
          color: '#E4E4E4EB',
        }}
      >
        Share any canvas — not just one IDE
      </h2>
      <p style={{ margin: 0, fontSize: 14, lineHeight: '22px' }}>
        This is a free online <strong style={{ color: '#E4E4E4EB' }}>canvas & markdown
        viewer</strong> and short-link host for <code style={code}>.canvas.tsx</code> and{' '}
        <code style={code}>.md</code> files. Use it for team reviews, investor updates,
        incident writeups, product fits, notes, or any report that should live as a link —
        not a screenshot thread. Cursor canvases, canvas-SDK files, and GFM markdown all
        work.
      </p>

      <h2
        style={{
          margin: '28px 0 10px',
          fontSize: 18,
          fontWeight: 590,
          color: '#E4E4E4EB',
        }}
      >
        Built for
      </h2>
      <ul
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 8,
        }}
      >
        {uses.map((u) => (
          <li
            key={u}
            style={{
              fontSize: 13,
              padding: '8px 10px',
              borderRadius: 8,
              border: '1px solid #E4E4E414',
              background: '#181818',
              color: '#E4E4E4EB',
            }}
          >
            {u}
          </li>
        ))}
      </ul>

      <h2
        style={{
          margin: '28px 0 10px',
          fontSize: 18,
          fontWeight: 590,
          color: '#E4E4E4EB',
        }}
      >
        How it works
      </h2>
      <ol style={{ margin: 0, paddingLeft: 18, fontSize: 14, lineHeight: '24px' }}>
        <li>
          Drop or paste a <code style={code}>.canvas.tsx</code> or{' '}
          <code style={code}>.md</code> file
        </li>
        <li>Preview the live render in your browser</li>
        <li>Copy a short link like <code style={code}>/canvas/a8k2m9qx</code></li>
        <li>Send it to teammates — they see the same canvas, no install</li>
      </ol>

      <h2
        style={{
          margin: '28px 0 10px',
          fontSize: 18,
          fontWeight: 590,
          color: '#E4E4E4EB',
        }}
      >
        FAQ
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {faqs.map((f) => (
          <div key={f.q}>
            <h3
              style={{
                margin: 0,
                fontSize: 14,
                fontWeight: 600,
                color: '#E4E4E4EB',
              }}
            >
              {f.q}
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, lineHeight: '20px' }}>{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const code: CSSProperties = {
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: '0.92em',
  background: '#E4E4E411',
  padding: '1px 5px',
  borderRadius: 4,
  color: '#E4E4E4EB',
}
