export type DocKind = 'canvas' | 'markdown'

export function detectKind(source: string, fileName?: string | null): DocKind {
  const name = (fileName ?? '').toLowerCase()
  if (name.endsWith('.md') || name.endsWith('.markdown')) return 'markdown'
  if (name.endsWith('.canvas.tsx') || name.endsWith('.tsx')) return 'canvas'
  if (/from\s*['"]cursor\/canvas['"]/.test(source)) return 'canvas'
  return 'markdown'
}

export function storageExt(kind: DocKind): string {
  return kind === 'markdown' ? 'md' : 'canvas.tsx'
}
