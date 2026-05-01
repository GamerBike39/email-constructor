import { useState, useEffect, useRef, useCallback } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core'
import TopBar from './components/TopBar'
import LeftPanel from './components/LeftPanel'
import Canvas from './components/Canvas'
import RightPanel from './components/RightPanel'
import PreviewModal from './components/PreviewModal'
import RichTextModal from './components/RichTextModal'
import TemplatesModal from './components/TemplatesModal'
import FloatingRTEBar from './components/FloatingRTEBar'
import useEditorStore from './store/useEditorStore'
import './App.css'

export default function App() {
  const { blocks, addBlock, reorderBlocks, deleteBlock, deselectAll, undo, redo, selectedId } = useEditorStore()
  const [activeDrag, setActiveDrag] = useState(null)
  const [previewMode, setPreviewMode] = useState('desktop')
  const [showPreview, setShowPreview] = useState(false)
  const [showTemplates, setShowTemplates] = useState(false)
  const [rteTarget, setRteTarget] = useState(null) // { blockId, fieldKey }
  const [rightPanelWidth, setRightPanelWidth] = useState(268)
  const isResizingRef = useRef(false)
  const resizeStartXRef = useRef(0)
  const resizeStartWidthRef = useRef(268)

  const handleResizeStart = useCallback((e) => {
    isResizingRef.current = true
    resizeStartXRef.current = e.clientX
    resizeStartWidthRef.current = rightPanelWidth
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }, [rightPanelWidth])

  useEffect(() => {
    const onMove = (e) => {
      if (!isResizingRef.current) return
      const delta = resizeStartXRef.current - e.clientX
      const newWidth = Math.max(200, Math.min(500, resizeStartWidthRef.current + delta))
      setRightPanelWidth(newWidth)
    }
    const onUp = () => {
      if (!isResizingRef.current) return
      isResizingRef.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  const openRTE = (blockId, fieldKey) => setRteTarget({ blockId, fieldKey })

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName?.toLowerCase()
      const isEditing = tag === 'input' || tag === 'textarea' || document.activeElement?.contentEditable === 'true'

      if ((e.key === 'Delete' || e.key === 'Backspace') && !isEditing && selectedId) {
        e.preventDefault()
        deleteBlock(selectedId)
      }
      if (e.key === 'Escape' && !isEditing) {
        deselectAll()
      }
      if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
        e.preventDefault()
        undo()
      }
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
        e.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [selectedId, deleteBlock, deselectAll, undo, redo])

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  )

  const handleDragStart = ({ active }) => {
    setActiveDrag(active.data.current || null)
  }

  const handleDragEnd = ({ active, over }) => {
    setActiveDrag(null)
    if (!over) return
    const isFromLibrary = active.data.current?.fromLibrary
    if (isFromLibrary) {
      const blockDef = active.data.current.blockDef
      const overIndex = blocks.findIndex((b) => b.id === over.id)
      addBlock(blockDef, overIndex >= 0 ? overIndex + 1 : blocks.length)
    } else {
      if (active.id !== over.id) {
        const oldIndex = blocks.findIndex((b) => b.id === active.id)
        const newIndex = blocks.findIndex((b) => b.id === over.id)
        if (oldIndex !== -1 && newIndex !== -1) reorderBlocks(oldIndex, newIndex)
      }
    }
  }

  const isDraggingFromLibrary = activeDrag?.fromLibrary === true

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="app-shell">
        <TopBar
          previewMode={previewMode}
          setPreviewMode={setPreviewMode}
          onOpenPreview={() => setShowPreview(true)}
          onOpenTemplates={() => setShowTemplates(true)}
        />
        <div className="editor-layout">
          <LeftPanel />
          <Canvas isDraggingFromLibrary={isDraggingFromLibrary} previewMode={previewMode} openRTE={openRTE} />
          <div
            className="right-panel-resize-handle"
            onMouseDown={handleResizeStart}
          />
          <RightPanel openRTE={openRTE} width={rightPanelWidth} />
        </div>
      </div>
      <DragOverlay dropAnimation={null}>
        {activeDrag ? (
          <div className="drag-ghost">
            {isDraggingFromLibrary ? (
              <><span className="drag-ghost-icon">{activeDrag.blockDef?.icon}</span><span>{activeDrag.blockDef?.label}</span></>
            ) : (
              <span>⠿ Déplacement...</span>
            )}
          </div>
        ) : null}
      </DragOverlay>
      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} />}
      {showTemplates && <TemplatesModal onClose={() => setShowTemplates(false)} />}
      {rteTarget && (
        <RichTextModal
          blockId={rteTarget.blockId}
          fieldKey={rteTarget.fieldKey}
          onClose={() => setRteTarget(null)}
        />
      )}
      <FloatingRTEBar />
    </DndContext>
  )
}



