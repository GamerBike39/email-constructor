const FONT_FAMILIES = [
  'Arial, Helvetica, sans-serif',
  'Georgia, "Times New Roman", serif',
  'Verdana, Geneva, sans-serif',
  'Tahoma, Geneva, sans-serif',
  '"Trebuchet MS", Helvetica, sans-serif',
  '"Courier New", Courier, monospace',
]

const FONT_WEIGHTS = ['normal', 'bold', '300', '400', '500', '600', '700', '800']

function parsePx(val) {
  if (!val && val !== 0) return ''
  return String(val).replace('px', '')
}

// ─── WCAG Contrast Utilities ─────────────────────────────────────────────────

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  if (h.length !== 6) return null
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function relativeLuminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0
  const toLinear = (c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * toLinear(rgb.r) + 0.7152 * toLinear(rgb.g) + 0.0722 * toLinear(rgb.b)
}

function contrastRatio(hex1, hex2) {
  try {
    const l1 = relativeLuminance(hex1)
    const l2 = relativeLuminance(hex2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  } catch {
    return 1
  }
}

// Palette of accessible-friendly colors to suggest
const CONTRAST_PALETTE = [
  '#000000', '#0f172a', '#1e293b', '#1f2937', '#374151', '#4b5563',
  '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8',
  '#dc2626', '#b91c1c', '#ea580c', '#d97706', '#ca8a04', '#65a30d',
  '#16a34a', '#0891b2', '#2563eb', '#4f46e5', '#7c3aed', '#c026d3',
]

// ─── ColorField ───────────────────────────────────────────────────────────────

function ColorField({ label, value, onChange, bgColor }) {
  const safeValue = value || '#000000'
  const ratio = bgColor ? contrastRatio(bgColor, safeValue) : null
  const passAA = ratio !== null ? ratio >= 4.5 : null
  const passAALarge = ratio !== null ? ratio >= 3 : null

  const suggestions = bgColor
    ? CONTRAST_PALETTE.filter((c) => contrastRatio(bgColor, c) >= 4.5)
    : []

  return (
    <>
      <div className="sf-row">
        <label className="sf-label">{label}</label>
        <div className="sf-color-wrap">
          <input
            type="color"
            className="sf-color-swatch"
            value={safeValue}
            onChange={(e) => onChange(e.target.value)}
          />
          <input
            type="text"
            className="sf-color-text"
            value={safeValue}
            onChange={(e) => onChange(e.target.value)}
            placeholder="#000000"
          />
          {ratio !== null && (
            <span
              className={`sf-contrast-badge ${passAA ? 'pass' : passAALarge ? 'warn' : 'fail'}`}
              title={passAA ? 'AA ✓ (≥4.5:1)' : passAALarge ? 'AA Large seulement (≥3:1)' : 'Contraste insuffisant'}
            >
              {ratio.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      {bgColor && suggestions.length > 0 && (
        <div className="sf-contrast-row">
          <span className="sf-contrast-label">Accessibles</span>
          <div className="sf-contrast-palette">
            {suggestions.map((c) => (
              <button
                key={c}
                className={`sf-contrast-swatch${safeValue === c ? ' active' : ''}`}
                style={{ background: c }}
                onClick={() => onChange(c)}
                title={`${c} — ${contrastRatio(bgColor, c).toFixed(1)}:1`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function PxField({ label, value, onChange }) {
  return (
    <div className="sf-row">
      <label className="sf-label">{label}</label>
      <div className="sf-px-wrap">
        <input
          type="number"
          className="sf-input sf-input-sm"
          value={parsePx(value)}
          onChange={(e) => onChange(`${e.target.value}px`)}
          min={0}
          step={1}
        />
        <span className="sf-unit">px</span>
      </div>
    </div>
  )
}

function SpacingField({ label, value, onChange }) {
  // Parse "top right bottom left" or shorthand
  const parts = (value || '0px').split(' ')
  const t = parsePx(parts[0] || '0')
  const r = parsePx(parts[1] || parts[0] || '0')
  const b = parsePx(parts[2] || parts[0] || '0')
  const l = parsePx(parts[3] || parts[1] || parts[0] || '0')

  const emit = (top, right, bottom, left) => {
    if (top === right && top === bottom && top === left) {
      onChange(`${top}px`)
    } else {
      onChange(`${top}px ${right}px ${bottom}px ${left}px`)
    }
  }

  return (
    <div className="sf-spacing">
      <label className="sf-label sf-label-full">{label}</label>
      <div className="sf-spacing-grid">
        {[['T', t, (v) => emit(v, r, b, l)], ['R', r, (v) => emit(t, v, b, l)],
          ['B', b, (v) => emit(t, r, v, l)], ['L', l, (v) => emit(t, r, b, v)]].map(([side, val, cb]) => (
          <div key={side} className="sf-spacing-cell">
            <input
              type="number"
              className="sf-input sf-input-xs"
              value={val}
              min={0}
              onChange={(e) => cb(e.target.value)}
            />
            <span className="sf-spacing-side">{side}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NumberField({ label, value, onChange, step = 0.1, min = 0 }) {
  return (
    <div className="sf-row">
      <label className="sf-label">{label}</label>
      <input
        type="number"
        className="sf-input sf-input-sm"
        value={value || ''}
        step={step}
        min={min}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

function SelectField({ label, value, onChange, options }) {
  return (
    <div className="sf-row">
      <label className="sf-label">{label}</label>
      <select className="sf-select" value={value || ''} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

function AlignField({ label, value, onChange }) {
  const options = ['left', 'center', 'right']
  const icons = { left: '⬅', center: '⬛', right: '➡' }
  return (
    <div className="sf-row">
      <label className="sf-label">{label}</label>
      <div className="sf-align-group">
        {options.map((opt) => (
          <button
            key={opt}
            className={`sf-align-btn${value === opt ? ' active' : ''}`}
            onClick={() => onChange(opt)}
            title={opt}
          >
            {opt === 'left' ? '≡' : opt === 'center' ? '≡' : '≡'}
            <span style={{ fontSize: 8 }}>{opt[0].toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function StyleField({ fieldDef, value, onChange, bgColor }) {
  const { key, label, type } = fieldDef

  switch (type) {
    case 'color':
      return <ColorField label={label} value={value} onChange={onChange} bgColor={bgColor} />
    case 'px':
      return <PxField label={label} value={value} onChange={onChange} />
    case 'spacing':
      return <SpacingField label={label} value={value} onChange={onChange} />
    case 'number':
      return <NumberField label={label} value={value} onChange={onChange} />
    case 'fontWeight':
      return <SelectField label={label} value={value} onChange={onChange} options={FONT_WEIGHTS} />
    case 'fontFamily':
      return <SelectField label={label} value={value} onChange={onChange} options={FONT_FAMILIES} />
    case 'align':
      return <AlignField label={label} value={value} onChange={onChange} />
    default:
      return null
  }
}
