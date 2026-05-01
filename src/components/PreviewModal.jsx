import { useEffect, useRef, useState } from 'react'
import useEditorStore from '../store/useEditorStore'
import { exportToHTML } from '../utils/exportHTML'

export default function PreviewModal({ onClose }) {
  const { blocks, templateSettings } = useEditorStore()
  const iframeRef = useRef(null)
  const [viewWidth, setViewWidth] = useState('desktop')

  useEffect(() => {
    const html = exportToHTML(blocks, templateSettings)
    const iframe = iframeRef.current
    if (!iframe) return
    iframe.srcdoc = html
  }, [blocks, templateSettings])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-header">
          <span className="modal-title">Aperçu HTML rendu</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-toolbar">
          <div className="preview-toggle">
            <button
              className={`preview-toggle-btn${viewWidth === 'desktop' ? ' active' : ''}`}
              onClick={() => setViewWidth('desktop')}
              title="Vue bureau (600px)"
            >
              🖥
            </button>
            <button
              className={`preview-toggle-btn${viewWidth === 'mobile' ? ' active' : ''}`}
              onClick={() => setViewWidth('mobile')}
              title="Vue mobile (375px)"
            >
              📱
            </button>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 8 }}>
            {viewWidth === 'desktop' ? '600px' : '375px'}
          </span>
        </div>
        <div style={{
          flex: 1,
          background: '#e5e7eb',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflow: 'auto',
          padding: '16px',
        }}>
          <iframe
            ref={iframeRef}
            className="modal-iframe"
            style={{
              width: viewWidth === 'desktop' ? '600px' : '375px',
              height: '100%',
              minHeight: '400px',
              border: 'none',
              borderRadius: 4,
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              flex: 'none',
            }}
            title="Email Preview"
            sandbox="allow-same-origin"
          />
        </div>
      </div>
    </div>
  )
}
