import { useRef, useState, useEffect, useCallback } from 'react'

const COLORS = [
  '#000000', '#1f2937', '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#f3f4f6', '#ffffff',
  '#ef4444', '#f97316', '#eab308', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7',
  '#fca5a5', '#fdba74', '#fde68a', '#86efac', '#67e8f9', '#93c5fd', '#a5b4fc', '#d8b4fe',
  '#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#0891b2', '#2563eb', '#4f46e5', '#9333ea',
]

const EMOJIS = [
  '😀','😊','😂','🥰','😎','🤔','🙏','👍',
  '👏','💪','❤️','🔥','✅','⭐','💡','🎉',
  '📧','📱','💼','🎯','💰','🚀','✨','🔗',
  '📊','📈','🛒','🎁','⚡','💎','🌟','📣',
]

export default function RichTextEditor({ value, onChange, placeholder = 'Saisissez votre texte...' }) {
  const editorRef = useRef(null)
  const savedRangeRef = useRef(null)
  const [showColors, setShowColors] = useState(false)
  const [showEmoji, setShowEmoji] = useState(false)
  const [showLink, setShowLink] = useState(false)
  const [linkUrl, setLinkUrl] = useState('https://')
  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false })

  // Set content on mount only
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value || ''
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync when value changes externally (e.g. block selection change)
  const prevBlockId = useRef(null)

  const saveRange = useCallback(() => {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0 && editorRef.current?.contains(sel.anchorNode)) {
      savedRangeRef.current = sel.getRangeAt(0).cloneRange()
    }
  }, [])

  const restoreRange = useCallback(() => {
    editorRef.current?.focus()
    if (savedRangeRef.current) {
      const sel = window.getSelection()
      sel?.removeAllRanges()
      sel?.addRange(savedRangeRef.current)
      return true
    }
    return false
  }, [])

  const exec = useCallback((cmd, val = null) => {
    editorRef.current?.focus()
    document.execCommand(cmd, false, val)
    if (editorRef.current) onChange(editorRef.current.innerHTML)
    updateActiveFormats()
  }, [onChange])

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    })
  }

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML)
  }

  const handleSelectionChange = () => updateActiveFormats()

  const applyColor = (color) => {
    restoreRange()
    exec('foreColor', color)
    setShowColors(false)
  }

  const insertEmoji = (emoji) => {
    restoreRange()
    exec('insertText', emoji)
    setShowEmoji(false)
  }

  const applyLink = () => {
    if (!linkUrl || linkUrl === 'https://') return
    restoreRange()
    exec('createLink', linkUrl)
    // Make links open in new tab - find recently created link
    if (editorRef.current) {
      editorRef.current.querySelectorAll('a').forEach(a => {
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener noreferrer')
      })
      onChange(editorRef.current.innerHTML)
    }
    setShowLink(false)
    setLinkUrl('https://')
  }

  const closeAll = () => {
    setShowColors(false)
    setShowEmoji(false)
    setShowLink(false)
  }

  return (
    <div className="rte-wrapper">
      <div className="rte-toolbar">
        {/* Bold */}
        <button
          className={`rte-btn${activeFormats.bold ? ' active' : ''}`}
          onMouseDown={(e) => { e.preventDefault(); exec('bold') }}
          title="Gras (Ctrl+B)"
        >
          <strong>B</strong>
        </button>

        {/* Italic */}
        <button
          className={`rte-btn${activeFormats.italic ? ' active' : ''}`}
          onMouseDown={(e) => { e.preventDefault(); exec('italic') }}
          title="Italique (Ctrl+I)"
        >
          <em>I</em>
        </button>

        {/* Underline */}
        <button
          className={`rte-btn${activeFormats.underline ? ' active' : ''}`}
          onMouseDown={(e) => { e.preventDefault(); exec('underline') }}
          title="Souligner (Ctrl+U)"
        >
          <span style={{ textDecoration: 'underline' }}>U</span>
        </button>

        <div className="rte-separator" />

        {/* Color */}
        <button
          className={`rte-btn${showColors ? ' active' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault()
            saveRange()
            setShowColors(!showColors)
            setShowEmoji(false)
            setShowLink(false)
          }}
          title="Couleur du texte"
        >
          <span style={{ fontWeight: 700, borderBottom: '2px solid #6366f1' }}>A</span>
        </button>

        {/* Link */}
        <button
          className={`rte-btn${showLink ? ' active' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault()
            saveRange()
            setShowLink(!showLink)
            setShowColors(false)
            setShowEmoji(false)
          }}
          title="Insérer un lien"
        >
          🔗
        </button>

        <div className="rte-separator" />

        {/* Emoji */}
        <button
          className={`rte-btn${showEmoji ? ' active' : ''}`}
          onMouseDown={(e) => {
            e.preventDefault()
            saveRange()
            setShowEmoji(!showEmoji)
            setShowColors(false)
            setShowLink(false)
          }}
          title="Emoji"
          style={{ fontSize: 14 }}
        >
          😀
        </button>

        <div className="rte-separator" />

        {/* Clear format */}
        <button
          className="rte-btn"
          onMouseDown={(e) => { e.preventDefault(); exec('removeFormat') }}
          title="Effacer le formatage"
          style={{ fontSize: 10, fontWeight: 700, color: 'var(--danger)' }}
        >
          ✕
        </button>
      </div>

      {/* Color palette */}
      {showColors && (
        <div className="rte-palette">
          {COLORS.map((color) => (
            <button
              key={color}
              className="rte-palette-swatch"
              style={{ backgroundColor: color }}
              onMouseDown={(e) => { e.preventDefault(); applyColor(color) }}
              title={color}
            />
          ))}
        </div>
      )}

      {/* Emoji grid */}
      {showEmoji && (
        <div className="rte-emoji-grid">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              className="rte-emoji-btn"
              onMouseDown={(e) => { e.preventDefault(); insertEmoji(emoji) }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Link bar */}
      {showLink && (
        <div className="rte-link-bar">
          <input
            type="url"
            className="rte-link-input"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="https://..."
            onKeyDown={(e) => e.key === 'Enter' && applyLink()}
            autoFocus
          />
          <button className="rte-link-submit" onMouseDown={(e) => { e.preventDefault(); applyLink() }}>
            OK
          </button>
        </div>
      )}

      {/* Editable content */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyUp={handleSelectionChange}
        onMouseUp={handleSelectionChange}
        onBlur={() => { handleInput(); closeAll() }}
        className="rte-content"
        data-placeholder={placeholder}
      />
    </div>
  )
}
