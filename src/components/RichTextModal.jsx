import { useState, useEffect } from 'react'
import RichTextEditor from './RichTextEditor'
import useEditorStore from '../store/useEditorStore'

export default function RichTextModal({ blockId, fieldKey, onClose }) {
  const { blocks, updateBlockContent } = useEditorStore()
  const block = blocks.find((b) => b.id === blockId)

  // Local draft — only commits on Confirm
  const [localHtml, setLocalHtml] = useState(() => block?.content[fieldKey] || '')

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const handleConfirm = () => {
    updateBlockContent(blockId, { [fieldKey]: localHtml })
    onClose()
  }

  if (!block) return null

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box rte-modal-box">
        <div className="modal-header">
          <span className="modal-title">✎ Éditer le texte</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="rte-modal-body">
          <RichTextEditor
            key={`${blockId}-${fieldKey}-modal`}
            value={localHtml}
            onChange={setLocalHtml}
            placeholder="Saisissez votre texte..."
          />
        </div>

        <div className="rte-modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
          <button className="btn btn-primary" onClick={handleConfirm}>✓ Confirmer</button>
        </div>
      </div>
    </div>
  )
}
