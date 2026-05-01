import useEditorStore from '../store/useEditorStore'
import { exportToHTML } from '../utils/exportHTML'

export default function TopBar({ previewMode, setPreviewMode, onOpenPreview }) {
  const { templateSettings, exportJSON, loadTemplate, clearCanvas, blocks, undo, redo, _history, _future } = useEditorStore()

  const canUndo = _history && _history.length > 0
  const canRedo = _future && _future.length > 0

  const handleExportHTML = () => {
    const html = exportToHTML(blocks, templateSettings)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${templateSettings.subject || 'email'}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSaveJSON = () => {
    const json = exportJSON()
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${templateSettings.subject || 'template'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleLoadJSON = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => loadTemplate(ev.target.result)
      reader.readAsText(file)
    }
    input.click()
  }

  const handleCopy = () => {
    const html = exportToHTML(blocks, templateSettings)
    navigator.clipboard.writeText(html).then(() => {
      alert('HTML copié dans le presse-papiers !')
    })
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="topbar-logo">
          <span className="logo-mark">✉</span>
          <span className="logo-text">MailCraft</span>
        </div>
        <div className="topbar-divider" />
        <span className="topbar-subject">{templateSettings.subject || 'Sans titre'}</span>
      </div>

      <div className="topbar-center">
        {/* Undo / Redo */}
        <button
          className="btn-icon"
          onClick={undo}
          disabled={!canUndo}
          title="Annuler (Ctrl+Z)"
        >↩</button>
        <button
          className="btn-icon"
          onClick={redo}
          disabled={!canRedo}
          title="Rétablir (Ctrl+Y)"
        >↪</button>

        <div className="topbar-sep" />

        {/* Preview mode toggle */}
        <div className="preview-toggle">
          <button
            className={`preview-toggle-btn${previewMode === 'desktop' ? ' active' : ''}`}
            onClick={() => setPreviewMode('desktop')}
            title="Vue bureau (600px)"
          >🖥</button>
          <button
            className={`preview-toggle-btn${previewMode === 'mobile' ? ' active' : ''}`}
            onClick={() => setPreviewMode('mobile')}
            title="Vue mobile (375px)"
          >📱</button>
        </div>
      </div>

      <div className="topbar-right">
        <button className="btn btn-ghost" onClick={onOpenPreview} title="Aperçu rendu">
          <span>Aperçu</span>
        </button>
        <button className="btn btn-ghost" onClick={handleLoadJSON} title="Charger un template JSON">
          <span>Charger</span>
        </button>
        <button className="btn btn-ghost" onClick={handleSaveJSON} title="Sauvegarder en JSON">
          <span>Sauvegarder</span>
        </button>
        <button className="btn btn-ghost" onClick={handleCopy} title="Copier le HTML">
          <span>Copier HTML</span>
        </button>
        <button className="btn btn-primary" onClick={handleExportHTML} title="Exporter le fichier HTML">
          <span>↓ Exporter HTML</span>
        </button>
      </div>
    </header>
  )
}

