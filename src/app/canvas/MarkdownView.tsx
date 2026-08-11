'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { canvasTokens } from '@/lib/cursor-canvas/tokens'

export function MarkdownView({ source }: { source: string }) {
  return (
    <article
      style={{
        maxWidth: 760,
        margin: '0 auto',
        padding: '28px 24px 64px',
        color: canvasTokens.text.primary,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        fontSize: 15,
        lineHeight: 1.7,
      }}
      className="canvas-md"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1
              style={{
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: '-0.03em',
                margin: '0 0 16px',
                lineHeight: 1.2,
              }}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              style={{
                fontSize: 22,
                fontWeight: 650,
                letterSpacing: '-0.02em',
                margin: '32px 0 12px',
              }}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              style={{
                fontSize: 17,
                fontWeight: 600,
                margin: '24px 0 8px',
              }}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p style={{ margin: '0 0 14px', color: canvasTokens.text.secondary }}>
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: canvasTokens.text.link }}
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul style={{ margin: '0 0 14px', paddingLeft: 22, color: canvasTokens.text.secondary }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol style={{ margin: '0 0 14px', paddingLeft: 22, color: canvasTokens.text.secondary }}>
              {children}
            </ol>
          ),
          li: ({ children }) => <li style={{ marginBottom: 4 }}>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote
              style={{
                margin: '0 0 14px',
                padding: '4px 0 4px 14px',
                borderLeft: `3px solid ${canvasTokens.stroke.primary}`,
                color: canvasTokens.text.tertiary,
              }}
            >
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const inline = !className
            if (inline) {
              return (
                <code
                  style={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: '0.9em',
                    background: canvasTokens.fill.tertiary,
                    padding: '1px 5px',
                    borderRadius: 4,
                    color: canvasTokens.text.primary,
                  }}
                >
                  {children}
                </code>
              )
            }
            return (
              <code
                className={className}
                style={{
                  display: 'block',
                  fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontSize: 12,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre
              style={{
                margin: '0 0 16px',
                padding: 14,
                borderRadius: 8,
                border: `1px solid ${canvasTokens.stroke.tertiary}`,
                background: canvasTokens.bg.editor,
                overflow: 'auto',
              }}
            >
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div style={{ overflow: 'auto', margin: '0 0 16px' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: 13,
                }}
              >
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th
              style={{
                textAlign: 'left',
                padding: '8px 10px',
                borderBottom: `1px solid ${canvasTokens.stroke.secondary}`,
                color: canvasTokens.text.tertiary,
                fontWeight: 500,
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                padding: '8px 10px',
                borderBottom: `1px solid ${canvasTokens.stroke.tertiary}`,
                color: canvasTokens.text.secondary,
                verticalAlign: 'top',
              }}
            >
              {children}
            </td>
          ),
          hr: () => (
            <hr
              style={{
                border: 'none',
                borderTop: `1px solid ${canvasTokens.stroke.tertiary}`,
                margin: '24px 0',
              }}
            />
          ),
          img: ({ src, alt }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt ?? ''}
              style={{
                maxWidth: '100%',
                borderRadius: 8,
                margin: '8px 0 16px',
              }}
            />
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </article>
  )
}
