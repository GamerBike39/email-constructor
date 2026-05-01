import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'
import { arrayMove } from '@dnd-kit/sortable'

const MAX_HISTORY = 50

const snapshot = (blocks) => JSON.parse(JSON.stringify(blocks))

const useEditorStore = create(
  persist(
    (set, get) => ({
  blocks: [],
  selectedId: null,
  _history: [],   // undo stack — NOT persisted
  _future: [],    // redo stack — NOT persisted
  templateSettings: {
    subject: 'Mon Email',
    previewText: '',
    backgroundColor: '#f0f0f0',
    maxWidth: '600',
    fontFamily: 'Arial, Helvetica, sans-serif',
  },

  // ── History helpers ────────────────────────────────────────
  _pushHistory: () => {
    const { blocks, _history } = get()
    set({
      _history: [..._history.slice(-(MAX_HISTORY - 1)), snapshot(blocks)],
      _future: [],
    })
  },

  undo: () => {
    const { blocks, _history, _future } = get()
    if (!_history.length) return
    const prev = _history[_history.length - 1]
    set({
      blocks: prev,
      _history: _history.slice(0, -1),
      _future: [snapshot(blocks), ..._future.slice(0, MAX_HISTORY - 1)],
      selectedId: null,
    })
  },

  redo: () => {
    const { blocks, _history, _future } = get()
    if (!_future.length) return
    const next = _future[0]
    set({
      blocks: next,
      _history: [..._history.slice(-(MAX_HISTORY - 1)), snapshot(blocks)],
      _future: _future.slice(1),
      selectedId: null,
    })
  },

  // ── Block actions ──────────────────────────────────────────
  selectBlock: (id) => set({ selectedId: id }),
  deselectAll: () => set({ selectedId: null }),

  addBlock: (blockDef, insertAt) => {
    get()._pushHistory()
    const newBlock = {
      id: uuidv4(),
      type: blockDef.type,
      content: JSON.parse(JSON.stringify(blockDef.defaultContent)),
      style: JSON.parse(JSON.stringify(blockDef.defaultStyle)),
    }
    set((state) => {
      const blocks = [...state.blocks]
      if (insertAt !== undefined && insertAt >= 0 && insertAt <= blocks.length) {
        blocks.splice(insertAt, 0, newBlock)
      } else {
        blocks.push(newBlock)
      }
      return { blocks, selectedId: newBlock.id }
    })
    return newBlock.id
  },

  duplicateBlock: (id) => {
    get()._pushHistory()
    set((state) => {
      const idx = state.blocks.findIndex((b) => b.id === id)
      if (idx === -1) return {}
      const original = state.blocks[idx]
      const clone = {
        ...JSON.parse(JSON.stringify(original)),
        id: uuidv4(),
      }
      const blocks = [...state.blocks]
      blocks.splice(idx + 1, 0, clone)
      return { blocks, selectedId: clone.id }
    })
  },

  updateBlockContent: (id, partial) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, content: { ...b.content, ...partial } } : b
      ),
    })),

  updateBlockNestedContent: (id, nested, partial) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id
          ? { ...b, content: { ...b.content, [nested]: { ...b.content[nested], ...partial } } }
          : b
      ),
    })),

  updateBlockStyle: (id, partial) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, style: { ...b.style, ...partial } } : b
      ),
    })),

  deleteBlock: (id) => {
    get()._pushHistory()
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
      selectedId: state.selectedId === id ? null : state.selectedId,
    }))
  },

  reorderBlocks: (oldIndex, newIndex) => {
    get()._pushHistory()
    set((state) => ({
      blocks: arrayMove(state.blocks, oldIndex, newIndex),
    }))
  },

  updateTemplateSettings: (partial) =>
    set((state) => ({
      templateSettings: { ...state.templateSettings, ...partial },
    })),

  loadTemplate: (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr)
      if (!data.blocks || !Array.isArray(data.blocks)) throw new Error('Format invalide')
      get()._pushHistory()
      set({
        blocks: data.blocks,
        templateSettings: { ...get().templateSettings, ...(data.templateSettings || {}) },
        selectedId: null,
      })
    } catch (e) {
      alert(`Impossible de charger le template: ${e.message}`)
    }
  },

  exportJSON: () => {
    const { blocks, templateSettings } = get()
    return JSON.stringify({ version: '1.0', templateSettings, blocks }, null, 2)
  },

  clearCanvas: () => {
    get()._pushHistory()
    set({ blocks: [], selectedId: null })
  },
    }),
    { 
      name: 'mailcraft-editor-v1',
      partialize: (state) => ({ blocks: state.blocks, templateSettings: state.templateSettings }),
    }
  )
)

export default useEditorStore

