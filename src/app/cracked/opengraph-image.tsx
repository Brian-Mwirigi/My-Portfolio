import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BIP-100 — Project CRACKED'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ color: '#737373', fontSize: 28, letterSpacing: '0.35em', marginBottom: 24 }}>
          PROJECT
        </div>
        <div style={{ color: '#ffffff', fontSize: 96, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1 }}>
          CRACKED
        </div>
        <div style={{ color: '#a3a3a3', fontSize: 32, marginTop: 32, maxWidth: 800, lineHeight: 1.4 }}>
          BIP-100 — one post a week on what I actually built or broke.
        </div>
        <div style={{ color: '#525252', fontSize: 24, marginTop: 'auto' }}>
          brianmunene.me/cracked
        </div>
      </div>
    ),
    { ...size }
  )
}
