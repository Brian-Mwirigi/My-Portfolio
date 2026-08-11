import { CanvasViewer } from './CanvasViewer'
import { CanvasSeoContent } from './CanvasSeoContent'

export default function CanvasPage() {
  return (
    <>
      <CanvasViewer />
      <div style={{ background: '#141414' }}>
        <CanvasSeoContent />
      </div>
    </>
  )
}
