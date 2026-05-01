import { useState } from 'react'
import { TEMPLATES } from '../data/templateDefs'
import useEditorStore from '../store/useEditorStore'

export default function TemplatesModal({ onClose }) {
  const { applyTemplate, blocks } = useEditorStore()
  const [hovered, setHovered] = useState(null)
  const [confirmId, setConfirmId] = useState(null)

  const handleSelect = (tpl) => {
    if (blocks.length > 0) {
      setConfirmId(tpl.id)
    } else {
      applyTemplate(tpl)
      onClose()
    }
  }

  const handleConfirm = (tpl) => {
    applyTemplate(tpl)
    setConfirmId(null)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="templates-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="templates-modal-header">
          <div>
            <div className="templates-modal-title">Choisir un modèle</div>
            <div className="templates-modal-subtitle">Sélectionnez un point de départ et personnalisez-le à votre image</div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Grid */}
        <div className="templates-grid">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className={`template-card${hovered === tpl.id ? ' hovered' : ''}`}
              onMouseEnter={() => setHovered(tpl.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleSelect(tpl)}
            >
              {/* Preview area */}
              <div className="template-card-preview">
                <TemplatePreview tpl={tpl} />
              </div>

              {/* Meta */}
              <div className="template-card-body">
                <div className="template-card-icon">{tpl.icon}</div>
                <div className="template-card-name">{tpl.name}</div>
                <div className="template-card-desc">{tpl.description}</div>
                <div className="template-card-tags">
                  {tpl.tags.map((tag) => (
                    <span key={tag} className="template-tag">{tag}</span>
                  ))}
                </div>
                <button className="btn btn-primary template-use-btn">
                  Utiliser ce modèle
                </button>
              </div>

              {/* Confirm overlay */}
              {confirmId === tpl.id && (
                <div className="template-confirm-overlay" onClick={(e) => e.stopPropagation()}>
                  <div className="template-confirm-box">
                    <div className="template-confirm-icon">⚠️</div>
                    <div className="template-confirm-text">Le canvas actuel sera remplacé. Cette action peut être annulée (Ctrl+Z).</div>
                    <div className="template-confirm-actions">
                      <button className="btn btn-primary" onClick={() => handleConfirm(tpl)}>Confirmer</button>
                      <button className="btn btn-ghost" onClick={() => setConfirmId(null)}>Annuler</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Mini visual preview of a template (non-interactive)
function TemplatePreview({ tpl }) {
  const bg = tpl.templateSettings.backgroundColor
  const blocks = tpl.blocks.slice(0, 5)
  return (
    <div style={{ background: bg, width: '100%', height: '100%', overflow: 'hidden', padding: '6px 8px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 3 }}>
      {blocks.map((block) => (
        <MiniBlock key={block.id} block={block} />
      ))}
      {tpl.blocks.length > 5 && (
        <div style={{ textAlign: 'center', fontSize: 8, color: '#94a3b8', paddingTop: 2 }}>
          +{tpl.blocks.length - 5} blocs…
        </div>
      )}
    </div>
  )
}

function MiniBlock({ block }) {
  const s = block.style
  const c = block.content
  const base = {
    background: s.backgroundColor || '#fff',
    borderRadius: 3,
    overflow: 'hidden',
    flexShrink: 0,
  }

  if (block.type === 'header') {
    return (
      <div style={{ ...base, background: s.backgroundColor, padding: '4px 6px', textAlign: 'center' }}>
        <span style={{ color: s.color || '#fff', fontSize: 6, fontFamily: s.fontFamily, fontWeight: 'bold', letterSpacing: 1 }}>
          {c.logoText}
        </span>
      </div>
    )
  }
  if (block.type === 'hero') {
    return (
      <div style={{ ...base, background: s.backgroundColor, padding: '6px 8px', textAlign: 'center' }}>
        <div style={{ background: s.titleColor || '#fff', height: 5, width: '70%', margin: '0 auto 2px', borderRadius: 2, opacity: 0.9 }} />
        <div style={{ background: s.subtitleColor || '#aaa', height: 3, width: '85%', margin: '0 auto', borderRadius: 2, opacity: 0.6 }} />
        {c.showButton && (
          <div style={{ background: s.buttonBackground || '#f59e0b', height: 5, width: 30, margin: '4px auto 0', borderRadius: 3 }} />
        )}
      </div>
    )
  }
  if (block.type === 'heading') {
    return (
      <div style={{ ...base, background: s.backgroundColor, padding: '3px 6px' }}>
        <div style={{ background: s.color || '#1e1b4b', height: 4, width: '55%', borderRadius: 2, opacity: 0.85 }} />
      </div>
    )
  }
  if (block.type === 'text') {
    return (
      <div style={{ ...base, background: s.backgroundColor, padding: '3px 6px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[85, 90, 70].map((w, i) => (
          <div key={i} style={{ background: '#94a3b8', height: 2, width: `${w}%`, borderRadius: 1, opacity: 0.5 }} />
        ))}
      </div>
    )
  }
  if (block.type === 'button') {
    return (
      <div style={{ ...base, background: s.backgroundColor, padding: '3px 6px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: s.buttonBackground || '#6366f1', height: 5, width: 40, borderRadius: 3 }} />
      </div>
    )
  }
  if (block.type === 'divider') {
    return (
      <div style={{ ...base, background: s.backgroundColor, padding: '2px 6px' }}>
        <div style={{ borderTop: `1px solid ${s.borderColor || '#e5e7eb'}` }} />
      </div>
    )
  }
  if (block.type === 'news-items' || block.type === 'events' || block.type === 'meeting-agenda') {
    const items = c.items || c.events || []
    return (
      <div style={{ ...base, background: s.backgroundColor || '#fff', padding: '3px 6px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {(items.slice(0, 2)).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <div style={{ background: s.numberBackground || s.categoryBackground || '#e0e7ff', height: 5, width: 5, borderRadius: '50%', flexShrink: 0 }} />
            <div style={{ background: '#94a3b8', height: 2, flex: 1, borderRadius: 1, opacity: 0.5 }} />
          </div>
        ))}
      </div>
    )
  }
  if (block.type === 'practical-info') {
    return (
      <div style={{ ...base, background: s.backgroundColor || '#fff', padding: '3px 6px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {[0, 1].map((i) => (
          <div key={i} style={{ display: 'flex', gap: 3, alignItems: 'center', background: s.cardBackground || '#f9fafb', borderRadius: 2, padding: '1px 3px', borderLeft: `2px solid ${s.accentColor || '#6366f1'}` }}>
            <div style={{ background: '#94a3b8', height: 2, width: '80%', borderRadius: 1, opacity: 0.5 }} />
          </div>
        ))}
      </div>
    )
  }
  if (block.type === 'volunteer') {
    return (
      <div style={{ ...base, background: s.headerBackground || '#fef3c7', padding: '4px 6px', borderLeft: `3px solid ${s.headerBorderColor || '#f59e0b'}` }}>
        <div style={{ background: s.titleColor || '#92400e', height: 4, width: '65%', borderRadius: 2, opacity: 0.8 }} />
      </div>
    )
  }
  if (block.type === 'highlight') {
    return (
      <div style={{ ...base, background: s.blockBackground || '#ecfdf5', padding: '4px 6px', borderLeft: `3px solid ${s.blockBorderColor || '#10b981'}` }}>
        <div style={{ background: s.titleColor || '#065f46', height: 4, width: '70%', borderRadius: 2, opacity: 0.8 }} />
        <div style={{ background: '#94a3b8', height: 2, width: '90%', borderRadius: 1, opacity: 0.4, marginTop: 2 }} />
      </div>
    )
  }
  // fallback
  return (
    <div style={{ ...base, background: s.backgroundColor || '#f8fafc', height: 8 }} />
  )
}
