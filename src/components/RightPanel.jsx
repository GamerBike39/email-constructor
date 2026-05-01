import useEditorStore from '../store/useEditorStore'
import { BLOCK_DEFS_MAP } from '../data/blockDefs'
import StyleField from './StyleField'
import { useState } from 'react'

// ─── Date label formatter ────────────────────────────────────────────────────
const FR_DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const FR_MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']

function formatDateLabel(dateISO, timeValue) {
  if (!dateISO) return ''
  const [year, month, day] = dateISO.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  let label = `${FR_DAYS[d.getDay()]} ${day} ${FR_MONTHS[month - 1]}`
  if (timeValue) {
    const [h, m] = timeValue.split(':')
    const hNum = parseInt(h, 10)
    label += m && m !== '00' ? ` — ${hNum}h${m}` : ` — ${hNum}h`
  }
  return label
}

// ─── Events Editor (for the 'events' block type) ─────────────────────────────

function EventsEditor({ block }) {
  const { updateBlockContent } = useEditorStore()
  const content = block.content
  const events = content.events || []
  const [expanded, setExpanded] = useState(null)

  const update = (partial) => updateBlockContent(block.id, partial)

  const addEvent = () => {
    const id = `evt-${Date.now()}`
    const newEvt = { id, dateISO: '', dateTime: '', dateLabel: 'Date', dateColor: '#7b3f57', title: 'Titre', description: 'Description', badge: '', prix: '' }
    update({ events: [...events, newEvt] })
    setExpanded(id)
  }

  const removeEvent = (id) => {
    if (expanded === id) setExpanded(null)
    update({ events: events.filter((e) => e.id !== id) })
  }

  const updateEvent = (id, partial) =>
    update({ events: events.map((e) => (e.id === id ? { ...e, ...partial } : e)) })

  const handleDateChange = (evt, field, value) => {
    const newISO = field === 'dateISO' ? value : (evt.dateISO || '')
    const newTime = field === 'dateTime' ? value : (evt.dateTime || '')
    const newLabel = formatDateLabel(newISO, newTime) || evt.dateLabel
    updateEvent(evt.id, { [field]: value, dateLabel: newLabel })
  }

  const moveEvent = (id, dir) => {
    const idx = events.findIndex((e) => e.id === id)
    const arr = [...events]
    const target = idx + dir
    if (target < 0 || target >= arr.length) return
    ;[arr[idx], arr[target]] = [arr[target], arr[idx]]
    update({ events: arr })
  }

  return (
    <div className="rp-section">
      <div className="rp-section-title">Contenu</div>
      {/* Section title */}
      <div className="sf-row">
        <label className="sf-label">Titre de section</label>
        <input
          className="sf-input sf-input-full"
          value={content.sectionTitle || ''}
          onChange={(e) => update({ sectionTitle: e.target.value })}
          placeholder="Ex : 🌼 Les rendez-vous du mois"
        />
      </div>

      {/* Events list */}
      <div className="events-editor-list">
        {events.map((evt, i) => (
          <div key={evt.id} className={`evt-item${expanded === evt.id ? ' open' : ''}`}>
            <div className="evt-item-header" onClick={() => setExpanded(expanded === evt.id ? null : evt.id)}>
              <span className="evt-item-chevron">{expanded === evt.id ? '▾' : '▸'}</span>
              <span className="evt-item-label">{evt.dateLabel || `Événement ${i + 1}`}</span>
              <div className="evt-item-actions">
                <button onClick={(e) => { e.stopPropagation(); moveEvent(evt.id, -1) }} disabled={i === 0} title="Monter">↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveEvent(evt.id, 1) }} disabled={i === events.length - 1} title="Descendre">↓</button>
                <button className="evt-remove-btn" onClick={(e) => { e.stopPropagation(); removeEvent(evt.id) }} title="Supprimer">✕</button>
              </div>
            </div>
            {expanded === evt.id && (
              <div className="evt-item-body">
                <div className="sf-row">
                  <label className="sf-label">Date</label>
                  <input
                    type="date"
                    className="sf-input sf-input-full"
                    value={evt.dateISO || ''}
                    onChange={(e) => handleDateChange(evt, 'dateISO', e.target.value)}
                  />
                </div>
                <div className="sf-row">
                  <label className="sf-label">Heure (opt.)</label>
                  <input
                    type="time"
                    className="sf-input sf-input-full"
                    value={evt.dateTime || ''}
                    onChange={(e) => handleDateChange(evt, 'dateTime', e.target.value)}
                  />
                </div>
                {evt.dateLabel && (
                  <div className="sf-row">
                    <label className="sf-label" style={{ opacity: 0.6 }}>Aperçu</label>
                    <span style={{ fontSize: 11, color: 'var(--text-2)', fontStyle: 'italic' }}>{evt.dateLabel}</span>
                  </div>
                )}
                <div className="sf-row">
                  <label className="sf-label">Couleur date</label>
                  <input
                    type="color"
                    className="sf-color-native"
                    value={evt.dateColor || '#7b3f57'}
                    onChange={(e) => updateEvent(evt.id, { dateColor: e.target.value })}
                  />
                </div>
                <div className="sf-row">
                  <label className="sf-label">Titre</label>
                  <input
                    className="sf-input sf-input-full"
                    value={evt.title || ''}
                    onChange={(e) => updateEvent(evt.id, { title: e.target.value })}
                    placeholder="Ex : 🎉 Titre de l'événement"
                  />
                </div>
                <div className="sf-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <label className="sf-label" style={{ marginBottom: 4 }}>Description <span style={{ opacity: 0.5, fontWeight: 400 }}>(HTML accepté)</span></label>
                  <textarea
                    className="sf-textarea"
                    rows={3}
                    value={evt.description || ''}
                    onChange={(e) => updateEvent(evt.id, { description: e.target.value })}
                    placeholder="Description…"
                  />
                </div>
                <div className="sf-row">
                  <label className="sf-label">Prix</label>
                  <input
                    className="sf-input sf-input-full"
                    value={evt.prix || ''}
                    onChange={(e) => updateEvent(evt.id, { prix: e.target.value })}
                    placeholder="Ex : 25 € · Gratuit"
                  />
                </div>
                <div className="sf-row">
                  <label className="sf-label">Badge</label>
                  <input
                    className="sf-input sf-input-full"
                    value={evt.badge || ''}
                    onChange={(e) => updateEvent(evt.id, { badge: e.target.value })}
                    placeholder="Ex : ⚠️ Plus que 3 places"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-ghost events-add-btn" onClick={addEvent}>
          + Ajouter un événement
        </button>
      </div>
    </div>
  )
}

// ─── Stats Editor (for the 'stats' block type) ───────────────────────────────

function StatsEditor({ block }) {
  const { updateBlockContent } = useEditorStore()
  const content = block.content
  const items = content.items || []
  const update = (partial) => updateBlockContent(block.id, partial)

  const addItem = () => {
    const id = `stat-${Date.now()}`
    update({ items: [...items, { id, value: '0', label: 'Métrique', icon: '📊' }] })
  }
  const removeItem = (id) => update({ items: items.filter((s) => s.id !== id) })
  const updateItem = (id, partial) => update({ items: items.map((s) => (s.id === id ? { ...s, ...partial } : s)) })

  return (
    <div className="rp-section">
      <div className="rp-section-title">Statistiques</div>
      {items.map((item, i) => (
        <div key={item.id} className="evt-item open" style={{ marginBottom: 6 }}>
          <div className="evt-item-body" style={{ paddingTop: 0 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
              <input className="sf-input" style={{ width: 32, textAlign: 'center' }} value={item.icon || ''} onChange={(e) => updateItem(item.id, { icon: e.target.value })} placeholder="🔢" />
              <input className="sf-input sf-input-full" value={item.value || ''} onChange={(e) => updateItem(item.id, { value: e.target.value })} placeholder="Valeur" />
              <input className="sf-input sf-input-full" value={item.label || ''} onChange={(e) => updateItem(item.id, { label: e.target.value })} placeholder="Label" />
              <button className="evt-remove-btn" onClick={() => removeItem(item.id)} title="Supprimer" style={{ flexShrink: 0 }}>✕</button>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-ghost events-add-btn" onClick={addItem}>+ Ajouter une stat</button>
    </div>
  )
}

// ─── Social Editor (for the 'social' block type) ─────────────────────────────

function SocialEditor({ block }) {
  const { updateBlockContent } = useEditorStore()
  const content = block.content
  const links = content.links || []
  const update = (partial) => updateBlockContent(block.id, partial)

  const addLink = () => {
    const id = `soc-${Date.now()}`
    update({ links: [...links, { id, platform: 'Réseau', url: '#', icon: '🔗', color: '#6366f1' }] })
  }
  const removeLink = (id) => update({ links: links.filter((l) => l.id !== id) })
  const updateLink = (id, partial) => update({ links: links.map((l) => (l.id === id ? { ...l, ...partial } : l)) })

  return (
    <div className="rp-section">
      <div className="rp-section-title">Liens</div>
      <div className="sf-row">
        <label className="sf-label">Titre</label>
        <input className="sf-input sf-input-full" value={content.title || ''} onChange={(e) => update({ title: e.target.value })} placeholder="Suivez-nous" />
      </div>
      {links.map((link) => (
        <div key={link.id} className="evt-item open" style={{ marginBottom: 6 }}>
          <div className="evt-item-body" style={{ paddingTop: 0 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
              <input className="sf-input" style={{ width: 32, textAlign: 'center' }} value={link.icon || ''} onChange={(e) => updateLink(link.id, { icon: e.target.value })} placeholder="📘" />
              <input className="sf-input sf-input-full" value={link.platform || ''} onChange={(e) => updateLink(link.id, { platform: e.target.value })} placeholder="Plateforme" />
              <input type="color" className="sf-color-native" value={link.color || '#6366f1'} onChange={(e) => updateLink(link.id, { color: e.target.value })} />
              <button className="evt-remove-btn" onClick={() => removeLink(link.id)} title="Supprimer" style={{ flexShrink: 0 }}>✕</button>
            </div>
            <input className="sf-input sf-input-full" value={link.url || ''} onChange={(e) => updateLink(link.id, { url: e.target.value })} placeholder="https://..." style={{ marginBottom: 0 }} />
          </div>
        </div>
      ))}
      <button className="btn btn-ghost events-add-btn" onClick={addLink}>+ Ajouter un réseau</button>
    </div>
  )
}

// ─── Pricing Editor (for the 'pricing' block type) ───────────────────────────

function PricingEditor({ block }) {
  const { updateBlockContent } = useEditorStore()
  const content = block.content
  const features = content.features || []
  const update = (partial) => updateBlockContent(block.id, partial)

  const addFeature = () => update({ features: [...features, 'Nouvelle fonctionnalité'] })
  const removeFeature = (i) => update({ features: features.filter((_, idx) => idx !== i) })
  const updateFeature = (i, val) => update({ features: features.map((f, idx) => (idx === i ? val : f)) })

  return (
    <div className="rp-section">
      <div className="rp-section-title">Tarification</div>
      <div className="sf-row">
        <label className="sf-label">Nom du plan</label>
        <input className="sf-input sf-input-full" value={content.planName || ''} onChange={(e) => update({ planName: e.target.value })} placeholder="Pack Premium" />
      </div>
      <div className="sf-row">
        <label className="sf-label">Prix</label>
        <input className="sf-input sf-input-sm" value={content.price || ''} onChange={(e) => update({ price: e.target.value })} placeholder="49" />
        <input className="sf-input" style={{ width: 40 }} value={content.currency || ''} onChange={(e) => update({ currency: e.target.value })} placeholder="€" />
        <input className="sf-input sf-input-full" value={content.period || ''} onChange={(e) => update({ period: e.target.value })} placeholder="/mois" />
      </div>
      <div className="sf-row">
        <label className="sf-label">Description</label>
        <input className="sf-input sf-input-full" value={content.description || ''} onChange={(e) => update({ description: e.target.value })} placeholder="Inclus dans ce plan…" />
      </div>
      <div className="sf-row">
        <label className="sf-label">Badge</label>
        <input className="sf-input sf-input-full" value={content.badge || ''} onChange={(e) => update({ badge: e.target.value })} placeholder="Populaire" />
      </div>
      <div className="rp-section-title" style={{ marginTop: 8 }}>Fonctionnalités</div>
      {features.map((f, i) => (
        <div key={i} className="sf-row">
          <input className="sf-input sf-input-full" value={f} onChange={(e) => updateFeature(i, e.target.value)} placeholder="Fonctionnalité" />
          <button className="evt-remove-btn" onClick={() => removeFeature(i)} title="Supprimer">✕</button>
        </div>
      ))}
      <button className="btn btn-ghost events-add-btn" onClick={addFeature}>+ Ajouter</button>
      <div className="rp-section-title" style={{ marginTop: 8 }}>Bouton CTA</div>
      <div className="sf-row">
        <label className="sf-label">Texte</label>
        <input className="sf-input sf-input-full" value={content.ctaText || ''} onChange={(e) => update({ ctaText: e.target.value })} placeholder="Commencer" />
      </div>
      <div className="sf-row">
        <label className="sf-label">URL</label>
        <input className="sf-input sf-input-full" value={content.ctaHref || ''} onChange={(e) => update({ ctaHref: e.target.value })} placeholder="https://" />
      </div>
    </div>
  )
}

// ─── Meeting Agenda Editor ────────────────────────────────────────────────────

function MeetingAgendaEditor({ block }) {
  const { updateBlockContent } = useEditorStore()
  const content = block.content
  const items = content.items || []
  const [expanded, setExpanded] = useState(null)
  const update = (partial) => updateBlockContent(block.id, partial)

  const addItem = () => {
    const id = `ag-${Date.now()}`
    update({ items: [...items, { id, time: '', text: 'Nouveau point' }] })
    setExpanded(id)
  }
  const removeItem = (id) => { if (expanded === id) setExpanded(null); update({ items: items.filter((i) => i.id !== id) }) }
  const updateItem = (id, partial) => update({ items: items.map((i) => (i.id === id ? { ...i, ...partial } : i)) })
  const moveItem = (id, dir) => {
    const idx = items.findIndex((i) => i.id === id)
    const arr = [...items]
    const t = idx + dir
    if (t < 0 || t >= arr.length) return
    ;[arr[idx], arr[t]] = [arr[t], arr[idx]]
    update({ items: arr })
  }

  return (
    <div className="rp-section">
      <div className="rp-section-title">Contenu</div>
      <div className="sf-row">
        <label className="sf-label">Titre</label>
        <input className="sf-input sf-input-full" value={content.title || ''} onChange={(e) => update({ title: e.target.value })} placeholder="Ordre du jour" />
      </div>
      <div className="sf-row">
        <label className="sf-label">Sous-titre</label>
        <input className="sf-input sf-input-full" value={content.subtitle || ''} onChange={(e) => update({ subtitle: e.target.value })} placeholder="Réunion du 5 mai — 18h30" />
      </div>
      <div className="rp-section-title" style={{ marginTop: 8 }}>Points à l'ordre du jour</div>
      <div className="events-editor-list">
        {items.map((item, i) => (
          <div key={item.id} className={`evt-item${expanded === item.id ? ' open' : ''}`}>
            <div className="evt-item-header" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <span className="evt-item-chevron">{expanded === item.id ? '▾' : '▸'}</span>
              <span className="evt-item-label">{item.text ? item.text.substring(0, 28) + (item.text.length > 28 ? '…' : '') : `Point ${i + 1}`}</span>
              <div className="evt-item-actions">
                <button onClick={(e) => { e.stopPropagation(); moveItem(item.id, -1) }} disabled={i === 0}>↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveItem(item.id, 1) }} disabled={i === items.length - 1}>↓</button>
                <button className="evt-remove-btn" onClick={(e) => { e.stopPropagation(); removeItem(item.id) }}>✕</button>
              </div>
            </div>
            {expanded === item.id && (
              <div className="evt-item-body">
                <div className="sf-row">
                  <label className="sf-label">Horaire (opt.)</label>
                  <input className="sf-input sf-input-full" value={item.time || ''} onChange={(e) => updateItem(item.id, { time: e.target.value })} placeholder="18h30" />
                </div>
                <div className="sf-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <label className="sf-label" style={{ marginBottom: 4 }}>Point</label>
                  <textarea className="sf-textarea" rows={2} value={item.text || ''} onChange={(e) => updateItem(item.id, { text: e.target.value })} placeholder="Intitulé du point…" />
                </div>
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-ghost events-add-btn" onClick={addItem}>+ Ajouter un point</button>
      </div>
    </div>
  )
}

// ─── Practical Info Editor ────────────────────────────────────────────────────

function PracticalInfoEditor({ block }) {
  const { updateBlockContent } = useEditorStore()
  const content = block.content
  const items = content.items || []
  const update = (partial) => updateBlockContent(block.id, partial)

  const addItem = () => update({ items: [...items, { id: `pi-${Date.now()}`, icon: '📌', label: '', value: '' }] })
  const removeItem = (id) => update({ items: items.filter((i) => i.id !== id) })
  const updateItem = (id, partial) => update({ items: items.map((i) => (i.id === id ? { ...i, ...partial } : i)) })
  const moveItem = (id, dir) => {
    const idx = items.findIndex((i) => i.id === id)
    const arr = [...items]
    const t = idx + dir
    if (t < 0 || t >= arr.length) return
    ;[arr[idx], arr[t]] = [arr[t], arr[idx]]
    update({ items: arr })
  }

  return (
    <div className="rp-section">
      <div className="rp-section-title">Contenu</div>
      <div className="sf-row">
        <label className="sf-label">Titre</label>
        <input className="sf-input sf-input-full" value={content.title || ''} onChange={(e) => update({ title: e.target.value })} placeholder="Infos pratiques" />
      </div>
      <div className="rp-section-title" style={{ marginTop: 8 }}>Lignes d'information</div>
      {items.map((item, i) => (
        <div key={item.id} className="evt-item open" style={{ marginBottom: 6 }}>
          <div className="evt-item-body" style={{ paddingTop: 0 }}>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginBottom: 4 }}>
              <input className="sf-input" style={{ width: 32, textAlign: 'center' }} value={item.icon || ''} onChange={(e) => updateItem(item.id, { icon: e.target.value })} placeholder="📍" />
              <input className="sf-input" style={{ width: 80 }} value={item.label || ''} onChange={(e) => updateItem(item.id, { label: e.target.value })} placeholder="Label" />
              <input className="sf-input sf-input-full" value={item.value || ''} onChange={(e) => updateItem(item.id, { value: e.target.value })} placeholder="Valeur" />
              <button onClick={(e) => { e.stopPropagation(); moveItem(item.id, -1) }} disabled={i === 0} title="Monter" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', flexShrink: 0 }}>↑</button>
              <button onClick={(e) => { e.stopPropagation(); moveItem(item.id, 1) }} disabled={i === items.length - 1} title="Descendre" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', flexShrink: 0 }}>↓</button>
              <button className="evt-remove-btn" onClick={() => removeItem(item.id)} style={{ flexShrink: 0 }}>✕</button>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-ghost events-add-btn" onClick={addItem}>+ Ajouter une ligne</button>
    </div>
  )
}

// ─── News Items Editor ────────────────────────────────────────────────────────

function NewsItemsEditor({ block }) {
  const { updateBlockContent } = useEditorStore()
  const content = block.content
  const items = content.items || []
  const [expanded, setExpanded] = useState(null)
  const update = (partial) => updateBlockContent(block.id, partial)

  const addItem = () => {
    const id = `ni-${Date.now()}`
    update({ items: [...items, { id, category: '', headline: 'Nouveau titre', text: '', href: '' }] })
    setExpanded(id)
  }
  const removeItem = (id) => { if (expanded === id) setExpanded(null); update({ items: items.filter((i) => i.id !== id) }) }
  const updateItem = (id, partial) => update({ items: items.map((i) => (i.id === id ? { ...i, ...partial } : i)) })
  const moveItem = (id, dir) => {
    const idx = items.findIndex((i) => i.id === id)
    const arr = [...items]
    const t = idx + dir
    if (t < 0 || t >= arr.length) return
    ;[arr[idx], arr[t]] = [arr[t], arr[idx]]
    update({ items: arr })
  }

  return (
    <div className="rp-section">
      <div className="rp-section-title">Contenu</div>
      <div className="sf-row">
        <label className="sf-label">Titre</label>
        <input className="sf-input sf-input-full" value={content.title || ''} onChange={(e) => update({ title: e.target.value })} placeholder="Les brèves du mois" />
      </div>
      <div className="rp-section-title" style={{ marginTop: 8 }}>Articles</div>
      <div className="events-editor-list">
        {items.map((item, i) => (
          <div key={item.id} className={`evt-item${expanded === item.id ? ' open' : ''}`}>
            <div className="evt-item-header" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <span className="evt-item-chevron">{expanded === item.id ? '▾' : '▸'}</span>
              <span className="evt-item-label">{item.headline || `Article ${i + 1}`}</span>
              <div className="evt-item-actions">
                <button onClick={(e) => { e.stopPropagation(); moveItem(item.id, -1) }} disabled={i === 0}>↑</button>
                <button onClick={(e) => { e.stopPropagation(); moveItem(item.id, 1) }} disabled={i === items.length - 1}>↓</button>
                <button className="evt-remove-btn" onClick={(e) => { e.stopPropagation(); removeItem(item.id) }}>✕</button>
              </div>
            </div>
            {expanded === item.id && (
              <div className="evt-item-body">
                <div className="sf-row">
                  <label className="sf-label">Catégorie</label>
                  <input className="sf-input sf-input-full" value={item.category || ''} onChange={(e) => updateItem(item.id, { category: e.target.value })} placeholder="Ex : Activités" />
                </div>
                <div className="sf-row">
                  <label className="sf-label">Titre</label>
                  <input className="sf-input sf-input-full" value={item.headline || ''} onChange={(e) => updateItem(item.id, { headline: e.target.value })} placeholder="Titre de la brève" />
                </div>
                <div className="sf-row" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                  <label className="sf-label" style={{ marginBottom: 4 }}>Texte</label>
                  <textarea className="sf-textarea" rows={3} value={item.text || ''} onChange={(e) => updateItem(item.id, { text: e.target.value })} placeholder="Description courte…" />
                </div>
                <div className="sf-row">
                  <label className="sf-label">Lien (opt.)</label>
                  <input className="sf-input sf-input-full" value={item.href || ''} onChange={(e) => updateItem(item.id, { href: e.target.value })} placeholder="https://" />
                </div>
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-ghost events-add-btn" onClick={addItem}>+ Ajouter un article</button>
      </div>
    </div>
  )
}


function TemplateSettings() {
  const { templateSettings, updateTemplateSettings } = useEditorStore()
  const s = templateSettings

  return (
    <div className="rp-content">
      <div className="rp-section-header">
        <span className="rp-section-icon">⚙</span>
        <span>Paramètres du template</span>
      </div>

      <div className="rp-section">
        <div className="rp-section-title">Email</div>
        <div className="sf-row">
          <label className="sf-label">Sujet</label>
          <input
            type="text"
            className="sf-input sf-input-full"
            value={s.subject || ''}
            onChange={(e) => updateTemplateSettings({ subject: e.target.value })}
            placeholder="Objet de l'email"
          />
        </div>
        <div className="sf-row">
          <label className="sf-label">Prévisualisation</label>
          <input
            type="text"
            className="sf-input sf-input-full"
            value={s.previewText || ''}
            onChange={(e) => updateTemplateSettings({ previewText: e.target.value })}
            placeholder="Texte prévisualisé dans la boîte mail"
          />
        </div>
      </div>

      <div className="rp-section">
        <div className="rp-section-title">Layout</div>
        <div className="sf-row">
          <label className="sf-label">Largeur max</label>
          <div className="sf-px-wrap">
            <input
              type="number"
              className="sf-input sf-input-sm"
              value={parseInt(s.maxWidth) || 600}
              min={320}
              max={900}
              onChange={(e) => updateTemplateSettings({ maxWidth: e.target.value })}
            />
            <span className="sf-unit">px</span>
          </div>
        </div>

        <div className="sf-row">
          <label className="sf-label">Fond</label>
          <div className="sf-color-wrap">
            <input
              type="color"
              className="sf-color-swatch"
              value={s.backgroundColor || '#f0f0f0'}
              onChange={(e) => updateTemplateSettings({ backgroundColor: e.target.value })}
            />
            <input
              type="text"
              className="sf-color-text"
              value={s.backgroundColor || ''}
              onChange={(e) => updateTemplateSettings({ backgroundColor: e.target.value })}
              placeholder="#f0f0f0"
            />
          </div>
        </div>

        <div className="sf-row">
          <label className="sf-label">Police globale</label>
          <select
            className="sf-select"
            value={s.fontFamily || 'Arial, Helvetica, sans-serif'}
            onChange={(e) => updateTemplateSettings({ fontFamily: e.target.value })}
          >
            <option value="Arial, Helvetica, sans-serif">Arial</option>
            <option value="Georgia, &quot;Times New Roman&quot;, serif">Georgia</option>
            <option value="Verdana, Geneva, sans-serif">Verdana</option>
            <option value="Tahoma, Geneva, sans-serif">Tahoma</option>
            <option value="&quot;Trebuchet MS&quot;, Helvetica, sans-serif">Trebuchet MS</option>
          </select>
        </div>
      </div>
    </div>
  )
}

// ─── Block Inspector (shown when a block is selected) ────────────────────────

function BlockInspector({ block, openRTE }) {
  const { updateBlockStyle, updateBlockContent, updateBlockNestedContent } = useEditorStore()
  const def = BLOCK_DEFS_MAP[block.type]
  if (!def) return null

  const handleStyleChange = (key, value) => updateBlockStyle(block.id, { [key]: value })

  const handleContentChange = (fieldDef, value) => {
    if (fieldDef.nested) {
      const [nestKey, propKey] = fieldDef.nested
      updateBlockNestedContent(block.id, nestKey, { [propKey]: value })
    } else {
      updateBlockContent(block.id, { [fieldDef.key]: value })
    }
  }

  const getContentValue = (fieldDef) => {
    if (fieldDef.nested) {
      const [nestKey, propKey] = fieldDef.nested
      const v = block.content[nestKey]?.[propKey]
      return v === undefined ? '' : v
    }
    const v = block.content[fieldDef.key]
    return v === undefined ? '' : v
  }

  return (
    <div className="rp-content">
      <div className="rp-block-header">
        <span className="rp-block-icon">{def.icon}</span>
        <div>
          <div className="rp-block-name">{def.label}</div>
          <div className="rp-block-desc">{def.description}</div>
        </div>
      </div>

      {/* Special block editors */}
      {block.type === 'events' && <EventsEditor block={block} />}
      {block.type === 'stats' && <StatsEditor block={block} />}
      {block.type === 'social' && <SocialEditor block={block} />}
      {block.type === 'pricing' && <PricingEditor block={block} />}
      {block.type === 'meeting-agenda' && <MeetingAgendaEditor block={block} />}
      {block.type === 'practical-info' && <PracticalInfoEditor block={block} />}
      {block.type === 'news-items' && <NewsItemsEditor block={block} />}

      {/* Content fields (generic) */}
      {def.contentSchema && def.contentSchema.length > 0 && (
        <div className="rp-section">
          <div className="rp-section-title">Contenu</div>
          {def.contentSchema.map((field) => (
            <div key={field.key} className="sf-row" style={field.type === 'richtext' ? { flexDirection: 'column', alignItems: 'stretch' } : {}}>
              <label className="sf-label">{field.label}</label>
              {field.type === 'richtext' ? (
                <div className="sf-richtext-preview-wrap">
                  <div
                    className="sf-richtext-preview"
                    dangerouslySetInnerHTML={{ __html: getContentValue(field) || '<em style="color:#64748b">Vide</em>' }}
                  />
                  <button
                    className="btn btn-ghost sf-richtext-edit-btn"
                    onClick={() => openRTE && openRTE(block.id, field.key)}
                  >
                    ✎ Éditer
                  </button>
                </div>
              ) : field.type === 'toggle' ? (
                <label className="sf-toggle-wrap">
                  <input
                    type="checkbox"
                    className="sf-toggle-input"
                    checked={getContentValue(field) !== false && getContentValue(field) !== 'false'}
                    onChange={(e) => handleContentChange(field, e.target.checked)}
                  />
                  <span className="sf-toggle-track"><span className="sf-toggle-thumb" /></span>
                </label>
              ) : field.type === 'select' ? (
                <select
                  className="sf-select"
                  value={getContentValue(field)}
                  onChange={(e) => handleContentChange(field, e.target.value)}
                >
                  {(field.options || []).map((opt, i) => (
                    <option key={opt} value={opt}>
                      {field.labels?.[i] || opt}
                    </option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  className="sf-textarea"
                  value={getContentValue(field)}
                  onChange={(e) => handleContentChange(field, e.target.value)}
                  rows={3}
                />
              ) : (
                <input
                  type={field.type === 'date' ? 'date' : field.type === 'time' ? 'time' : 'text'}
                  className="sf-input sf-input-full"
                  value={getContentValue(field)}
                  onChange={(e) => handleContentChange(field, e.target.value)}
                  placeholder={field.type === 'url' ? 'https://' : ''}
                />
              )}
              {field.hint && <p className="sf-field-hint">{field.hint}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Style sections */}
      {def.styleSchema && def.styleSchema.map((section) => (
        <div key={section.section} className="rp-section">
          <div className="rp-section-title">{section.section}</div>
          {section.fields.map((fieldDef) => (
            <StyleField
              key={fieldDef.key}
              fieldDef={fieldDef}
              value={block.style[fieldDef.key]}
              onChange={(val) => handleStyleChange(fieldDef.key, val)}
              bgColor={fieldDef.contrastWith ? block.style[fieldDef.contrastWith] : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Right Panel ─────────────────────────────────────────────────────────────

export default function RightPanel({ openRTE, width }) {
  const { selectedId, blocks } = useEditorStore()
  const selectedBlock = blocks.find((b) => b.id === selectedId)

  return (
    <aside className="right-panel" style={width ? { width, minWidth: width } : {}}>
      <div className="panel-header">
        <span className="panel-title">
          {selectedBlock ? 'Inspecteur' : 'Paramètres'}
        </span>
        {selectedBlock && (
          <span className="panel-hint">Bloc sélectionné</span>
        )}
      </div>

      {selectedBlock ? (
        <BlockInspector block={selectedBlock} openRTE={openRTE} />
      ) : (
        <TemplateSettings />
      )}
    </aside>
  )
}
