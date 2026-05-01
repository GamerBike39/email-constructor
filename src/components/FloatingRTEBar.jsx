import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import useEditorStore from '../store/useEditorStore'

const COLORS = [
  '#000000', '#0f172a', '#374151', '#6b7280', '#9ca3af', '#e5e7eb', '#f9fafb', '#ffffff',
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7',
  '#fca5a5', '#fdba74', '#fde68a', '#86efac', '#67e8f9', '#93c5fd', '#a5b4fc', '#d8b4fe',
]

/**
 * Global floating toolbar that appears above any selected text within
 * an element that has [data-inline-editable].
 * Reads data-block-id + data-field-key (+ optional data-nested-key) to save.
 */
export default function FloatingRTEBar() {
  const { updateBlockContent, updateBlockNestedContent } = useEditorStore()
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0 })
  const [formats, setFormats] = useState({ bold: false, italic: false, underline: false })
  const [showColors, setShowColors] = useState(false)
  const activeRef = useRef(null)

  useEffect(() => {
    const handleSelectionChange = () => {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        setVisible(false)
        setShowColors(false)
        return
      }

      // Walk up DOM to find nearest [data-inline-editable]
      let node = sel.anchorNode
      if (node && node.nodeType === Node.TEXT_NODE) node = node.parentElement
      let editable = null
      let el = node
      while (el && el !== document.body) {
        if (el.dataset && 'inlineEditable' in el.dataset) {
          editable = el
          break
        }
        el = el.parentElement
      }

      if (!editable) { setVisible(false); return }

      activeRef.current = editable

      const range = sel.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      if (!rect || rect.width === 0) { setVisible(false); return }

      setPos({
        top: Math.max(8, rect.top - 44),
        left: Math.max(90, Math.min(rect.left + rect.width / 2, window.innerWidth - 170)),
      })
      setVisible(true)
      setFormats({
        bold: document.queryCommandState('bold'),
        italic: document.queryCommandState('italic'),
        underline: document.queryCommandState('underline'),
      })
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => document.removeEventListener('selectionchange', handleSelectionChange)
  }, [])

  const save = () => {
    const el = activeRef.current
    if (!el) return
    const blockId = el.dataset.blockId
    const fieldKey = el.dataset.fieldKey
    const nestedKey = el.dataset.nestedKey
    if (!blockId || !fieldKey) return
    if (nestedKey) {
      updateBlockNestedContent(blockId, nestedKey, { [fieldKey]: el.innerHTML })
    } else {
      updateBlockContent(blockId, { [fieldKey]: el.innerHTML })
    }
  }

  const exec = (cmd, val) => {
    const el = activeRef.current
    if (!el) return
    el.focus()
    document.execCommand(cmd, false, val || null)
    save()
    setFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    })
  }

  if (!visible) return null

  return createPortal(
    <div
      className="floating-rte-bar"
      style={{ position: 'fixed', top: pos.top, left: pos.left, transform: 'translateX(-50%)' }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <button className={`frte-btn${formats.bold ? ' active' : ''}`} onMouseDown={() => exec('bold')} title="Gras"><b>B</b></button>
      <button className={`frte-btn${formats.italic ? ' active' : ''}`} onMouseDown={() => exec('italic')} title="Italique"><em>I</em></button>
      <button className={`frte-btn${formats.underline ? ' active' : ''}`} onMouseDown={() => exec('underline')} title="Souligner"><u>U</u></button>
      <div className="frte-sep" />
      <div style={{ position: 'relative' }}>
        <button
          className={`frte-btn${showColors ? ' active' : ''}`}
          onMouseDown={(e) => { e.stopPropagation(); setShowColors(!showColors) }}
          title="Couleur du texte"
        >
          <span style={{ borderBottom: '2px solid #6366f1', fontWeight: 700 }}>A</span>
        </button>
        {showColors && (
          <div className="frte-colors" onMouseDown={(e) => e.stopPropagation()}>
            {COLORS.map((c) => (
              <button
                key={c}
                className="frte-color-swatch"
                style={{ background: c, border: c === '#ffffff' || c === '#f9fafb' ? '1px solid #374151' : 'none' }}
                onMouseDown={(e) => { e.stopPropagation(); exec('foreColor', c); setShowColors(false) }}
                title={c}
              />
            ))}
          </div>
        )}
      </div>
      <div className="frte-sep" />
      <button
        className="frte-btn frte-clear"
        onMouseDown={() => exec('removeFormat')}
        title="Effacer le formatage"
        style={{ color: '#f87171', fontWeight: 700 }}
      >✕</button>
    </div>,
    document.body
  )
}
