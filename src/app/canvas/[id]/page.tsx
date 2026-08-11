import { notFound } from 'next/navigation'
import { SharedCanvasClient } from './SharedCanvasClient'
import { fetchSharedCanvas } from '@/lib/canvas-viewer/fetchShare'

export default async function SharedCanvasPage({
  params,
}: {
  params: { id: string }
}) {
  const source = await fetchSharedCanvas(params.id)
  if (!source) notFound()

  return <SharedCanvasClient id={params.id} source={source} />
}
