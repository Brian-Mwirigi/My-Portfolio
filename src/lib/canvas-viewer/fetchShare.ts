const RAW_BASE =
  'https://raw.githubusercontent.com/brian-mwirigi/canvas-bins/main'

export async function fetchSharedCanvas(id: string): Promise<string | null> {
  if (!/^[a-z0-9]{6,12}$/i.test(id)) return null
  const res = await fetch(`${RAW_BASE}/${id}.canvas.tsx`, {
    cache: 'no-store',
    next: { revalidate: 0 },
  })
  if (!res.ok) return null
  return res.text()
}
