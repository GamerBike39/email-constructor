import { useDraggable } from '@dnd-kit/core'
import { BLOCK_CATEGORIES } from '../data/blockDefs'

function DraggableBlock({ blockDef }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `lib-${blockDef.type}`,
    data: { fromLibrary: true, blockDef },
  })

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`lib-block${isDragging ? ' dragging' : ''}`}
      title={blockDef.description}
    >
      <span className="lib-block-icon">{blockDef.icon}</span>
      <span className="lib-block-label">{blockDef.label}</span>
    </div>
  )
}

export default function LeftPanel() {
  return (
    <aside className="left-panel">
      <div className="panel-header">
        <span className="panel-title">Blocs</span>
        <span className="panel-hint">Glissez sur le canvas</span>
      </div>

      <div className="lib-content">
        {BLOCK_CATEGORIES.map((cat) => (
          <div key={cat.name} className="lib-category">
            <div className="lib-category-header">
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </div>
            <div className="lib-blocks-grid">
              {cat.blocks.map((block) => (
                <DraggableBlock key={block.type} blockDef={block} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="panel-footer">
        <span className="panel-hint">Double-cliquez pour éditer le texte</span>
      </div>
    </aside>
  )
}
