import { notFound } from 'next/navigation'
import { SharedCanvasClient } from './SharedCanvasClient'
import { fetchSharedCanvas } from '@/lib/canvas-viewer/fetchShare'

export default async function SharedCanvasPage({
  params,
}: {
  params: { id: string }
}) {
  const doc = await fetchSharedCanvas(params.id)
  if (!doc) notFound()

  return (
    <SharedCanvasClient
      id={params.id}
      source={doc.source}
      kind={doc.kind}
      fileName={doc.fileName}
    />
  )
}
