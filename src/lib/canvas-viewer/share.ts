import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from 'lz-string'

const PREFIX = 'c'

export function encodeCanvasSource(source: string): string {
  return compressToEncodedURIComponent(source)
}

export function decodeCanvasSource(encoded: string): string | null {
  if (!encoded) return null
  try {
    const out = decompressFromEncodedURIComponent(encoded)
    return out || null
  } catch {
    return null
  }
}

/** Build a shareable URL. Puts payload in the hash so nothing hits the server. */
export function buildShareUrl(source: string, origin?: string): string {
  const base =
    origin ??
    (typeof window !== 'undefined' ? window.location.origin : 'https://brianmunene.me')
  const encoded = encodeCanvasSource(source)
  return `${base}/canvas#${PREFIX}=${encoded}`
}

export function readSourceFromLocation(hash = typeof window !== 'undefined' ? window.location.hash : ''): string | null {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  if (!raw) return null
  const params = new URLSearchParams(raw)
  const encoded = params.get(PREFIX)
  if (!encoded) return null
  return decodeCanvasSource(encoded)
}
