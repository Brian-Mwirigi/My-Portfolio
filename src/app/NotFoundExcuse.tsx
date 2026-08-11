'use client'

import { useMemo } from 'react'

const EXCUSES = [
  'This route compiled in my head and nowhere else.',
  'The page joined a startup and ghosted production.',
  '404: responsibility not found.',
  'I asked the CDN nicely. It said “lol no.”',
  'Somewhere a href is lying to you.',
  'Status: page is in a meeting that could’ve been a 200.',
  'We looked under /public. Just vibes and a lonely favicon.',
  'Deploy succeeded. Truth did not.',
]

export function NotFoundExcuse() {
  const excuse = useMemo(
    () => EXCUSES[Math.floor(Math.random() * EXCUSES.length)],
    []
  )

  return (
    <>
      <p
        style={{
          margin: '10px 0 0',
          fontSize: 15,
          lineHeight: 1.5,
          color: '#a3a3a3',
        }}
      >
        {excuse}
      </p>

      <pre
        style={{
          margin: '28px 0 0',
          padding: 14,
          borderRadius: 10,
          border: '1px solid #262626',
          background: '#111',
          color: '#d4d4d4',
          fontSize: 12,
          lineHeight: 1.6,
          overflow: 'auto',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        }}
      >{`$ curl -I https://brianmunene.me/this-page
HTTP/1.1 404 Not Found
x-excuse: ${excuse}
x-vibe: slightly embarrassed but still shipping`}</pre>
    </>
  )
}
