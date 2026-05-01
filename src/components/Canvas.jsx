import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import useEditorStore from '../store/useEditorStore'
import CanvasBlock from './CanvasBlock'

export default function Canvas({ isDraggingFromLibrary, previewMode, openRTE }) {
  const { blocks, deselectAll, templateSettings } = useEditorStore()

  const { setNodeRef, isOver } = useDroppable({ id: 'canvas-drop' })

  const handleCanvasClick = (e) => {
    if (e.target === e.currentTarget) deselectAll()
  }

  return (
    <main className="canvas-area" onClick={handleCanvasClick}>
      <div className="canvas-scroll">
        {/* Email outer wrapper — simulates email client width */}
        <div
          className={`canvas-email-wrapper${isOver && isDraggingFromLibrary ? ' drop-active' : ''}${previewMode === 'mobile' ? ' mobile-preview' : ''}`}
          style={{
            maxWidth: `${parseInt(templateSettings.maxWidth) || 600}px`,
            backgroundColor: templateSettings.backgroundColor || '#f0f0f0',
          }}
        >
          {/* Drop zone hint bar shown when dragging from library */}
          {isDraggingFromLibrary && (
            <div className="canvas-drop-hint">
              <span className="canvas-drop-hint-icon">⬇</span>
              Déposez le bloc ici
            </div>
          )}
          {/* Actual email content area */}
          <div
            ref={setNodeRef}
            className="canvas-email-body"
            style={{ width: previewMode === 'mobile' ? '100%' : `${parseInt(templateSettings.maxWidth) || 600}px` }}
          >
            <SortableContext
              items={blocks.map((b) => b.id)}
              strategy={verticalListSortingStrategy}
            >
              {blocks.length === 0 ? (
                <div className="canvas-empty">
                  <div className="canvas-empty-icon">✉</div>
                  <p className="canvas-empty-title">Canvas vide</p>
                  <p className="canvas-empty-hint">
                    Glissez des blocs depuis le panneau de gauche<br />pour construire votre email
                  </p>
                </div>
              ) : (
                blocks.map((block) => (
                  <CanvasBlock
                    key={block.id}
                    block={block}
                    isDraggingFromLibrary={isDraggingFromLibrary}
                    openRTE={openRTE}
                  />
                ))
              )}
            </SortableContext>
          </div>
        </div>

        {/* Canvas info bar */}
        <div className="canvas-info-bar">
          <span>{parseInt(templateSettings.maxWidth) || 600}px</span>
          <span>·</span>
          <span>{blocks.length} bloc{blocks.length !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </main>
  )
}
