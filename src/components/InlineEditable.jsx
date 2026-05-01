import { useRef, useEffect } from 'react'

/**
 * Generic inline-editable contentEditable element.
 * - Syncs HTML prop → DOM only when not focused (prevents caret jumps)
 * - Adds data-* attributes picked up by FloatingRTEBar
 * - Stops keydown propagation so editor shortcuts don't fire while typing
 * - For heading tags (h1/h2/h3): Enter key blurs instead of inserting <br>
 */
export default function InlineEditable({
  as: Tag = 'div',
  blockId,
  fieldKey,
  nestedKey,     // optional: for nested content (e.g. columns left/right)
  html,
  onSave,
  className = '',
  style,
}) {
  const ref = useRef(null)
  const isFocused = useRef(false)

  useEffect(() => {
    if (ref.current && !isFocused.current) {
      ref.current.innerHTML = html || ''
    }
  }, [html])

  const handleBlur = (e) => {
    isFocused.current = false
    if (onSave) onSave(e.currentTarget.innerHTML)
  }

  const handleKeyDown = (e) => {
    e.stopPropagation()
    const isHeading = ['h1', 'h2', 'h3'].includes(String(Tag).toLowerCase())
    if (isHeading && e.key === 'Enter') {
      e.preventDefault()
      e.currentTarget.blur()
    }
  }

  const dataAttrs = {
    'data-inline-editable': '',
    'data-block-id': blockId,
    'data-field-key': fieldKey,
  }
  if (nestedKey) dataAttrs['data-nested-key'] = nestedKey

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      {...dataAttrs}
      className={`inline-editable${className ? ' ' + className : ''}`}
      style={{ outline: 'none', ...style }}
      onFocus={() => { isFocused.current = true }}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={(e) => e.stopPropagation()}
    />
  )
}
