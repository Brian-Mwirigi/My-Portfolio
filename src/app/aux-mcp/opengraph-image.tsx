import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AUX — Spotify, for your AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#070707',
          color: '#f2f2f2',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '20%',
            width: '60%',
            height: '70%',
            background:
              'radial-gradient(ellipse at center, rgba(30,215,96,0.28), transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            fontSize: 28,
            letterSpacing: '0.45em',
            color: '#1ed760',
            fontWeight: 700,
          }}
        >
          AUX
        </div>
        <div
          style={{
            position: 'relative',
            marginTop: 28,
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          Spotify, for your AI.
        </div>
        <div
          style={{
            position: 'relative',
            marginTop: 22,
            fontSize: 28,
            color: '#8a8a8a',
          }}
        >
          Not a remote. A DJ that talks back.
        </div>
        <div
          style={{
            position: 'relative',
            marginTop: 40,
            fontSize: 20,
            color: '#1ed760',
            letterSpacing: '0.08em',
          }}
        >
          pass the aux
        </div>
      </div>
    ),
    { ...size }
  )
}
