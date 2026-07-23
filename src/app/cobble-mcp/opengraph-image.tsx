import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'COBBLE — Minecraft for your AI'
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
          background: 'linear-gradient(180deg, #78a7ff 0%, #5d9c3d 55%, #866043 100%)',
          color: '#ececec',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.35)',
          }}
        />
        <div
          style={{
            position: 'relative',
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: '0.06em',
            textShadow: '6px 6px 0 #222',
          }}
        >
          COBBLE
        </div>
        <div
          style={{
            position: 'relative',
            marginTop: 24,
            fontSize: 36,
            color: '#ffff55',
            textShadow: '3px 3px 0 #3f3f00',
          }}
        >
          Minecraft for your AI.
        </div>
        <div
          style={{
            position: 'relative',
            marginTop: 20,
            fontSize: 22,
            color: '#ffffffcc',
          }}
        >
          Claude joins your world
        </div>
      </div>
    ),
    { ...size }
  )
}
