const RAW_BASE =
  'https://raw.githubusercontent.com/brian-mwirigi/canvas-bins/main'

export type SharedDoc = {
  source: string
  kind: 'canvas' | 'markdown'
  fileName: string
}

export async function fetchSharedCanvas(id: string): Promise<SharedDoc | null> {
  if (!/^[a-z0-9]{6,12}$/i.test(id)) return null

  const candidates: Array<{ ext: string; kind: 'canvas' | 'markdown' }> = [
    { ext: 'canvas.tsx', kind: 'canvas' },
    { ext: 'md', kind: 'markdown' },
    { ext: 'tsx', kind: 'canvas' },
  ]

  for (const c of candidates) {
    const res = await fetch(`${RAW_BASE}/${id}.${c.ext}`, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })
    if (res.ok) {
      return {
        source: await res.text(),
        kind: c.kind,
        fileName: `${id}.${c.ext}`,
      }
    }
  }
  return null
}
