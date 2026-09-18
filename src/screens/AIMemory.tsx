import { useState } from 'react'

type MemoryCategory = 'preferences' | 'goals' | 'spending' | 'context'

interface MemoryItem {
  id: string
  category: MemoryCategory
  text: string
  learnedAt: string
  source: string
}

const CAT_CONFIG: Record<MemoryCategory, { label: string; color: string; icon: React.ReactNode }> = {
  preferences: {
    label: 'Preferences',
    color: '#3FE7FF',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.1" /><path d="M6 1v1.5M6 9.5V11M1 6h1.5M9.5 6H11M2.64 2.64l1.07 1.07M8.29 8.29l1.07 1.07M2.64 9.36l1.07-1.07M8.29 3.71l1.07-1.07" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>,
  },
  goals: {
    label: 'Goals',
    color: '#22C55E',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.1" /><circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.1" /><circle cx="6" cy="6" r="0.6" fill="currentColor" /></svg>,
  },
  spending: {
    label: 'Spending',
    color: '#F5B700',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="3.5" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.1" /><path d="M3 3.5V2.5A1 1 0 0 1 4 1.5h4a1 1 0 0 1 1 1v1M4.5 7h3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
  context: {
    label: 'Context',
    color: '#9945FF',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1a5 5 0 1 1 0 10A5 5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1.1" /><path d="M6 5v4M6 3.5v.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
}

const INITIAL_MEMORIES: MemoryItem[] = []

type FilterCat = MemoryCategory | 'all'

interface AIMemoryProps {
  onBack?: () => void
  onPrivacySettings?: () => void
}

export default function AIMemory({ onBack, onPrivacySettings }: AIMemoryProps) {
  const [memories, setMemories] = useState<MemoryItem[]>([])
  const [filter, setFilter] = useState<FilterCat>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')

  const filtered = filter === 'all' ? memories : memories.filter(m => m.category === filter)

  const startEdit = (m: MemoryItem) => { setEditingId(m.id); setEditText(m.text) }
  const saveEdit = (id: string) => {
    setMemories(prev => prev.map(m => m.id === id ? { ...m, text: editText } : m))
    setEditingId(null)
  }
  const remove = (id: string) => setMemories(prev => prev.filter(m => m.id !== id))

  const cats: FilterCat[] = ['all', 'preferences', 'goals', 'spending', 'context']

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">AI Memory</p>
          <p className="font-body text-[10px] text-text-muted">What Fina knows about you</p>
        </div>
        <button onClick={onPrivacySettings}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold hover:bg-surface-hi transition-all"
          style={{ border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1l1 2.5h2.5L7 5.5l1 2.5L6 6.5 3.5 8l1-2.5L2 4h2.5L6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          Privacy
        </button>
      </div>

      {/* Info banner */}
      <div className="mx-5 mb-3 px-4 py-3 rounded-[--radius-xl] flex items-start gap-3 shrink-0"
        style={{ background: 'rgba(0,102,255,0.07)', border: '1px solid rgba(0,102,255,0.2)' }}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
          <circle cx="7" cy="7" r="5.5" stroke="#AFC5FF" strokeWidth="1.1" />
          <path d="M7 5v4M7 3.5v.5" stroke="#AFC5FF" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        <p className="font-body text-[11px] text-text-muted leading-relaxed">
          These are the things Fina has learned to give you better advice. You can edit or delete any item at any time.
        </p>
      </div>

      {/* Category filter */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {cats.map(c => {
            const cfg = c !== 'all' ? CAT_CONFIG[c] : null
            const active = filter === c
            const color = cfg?.color ?? '#AFC5FF'
            return (
              <button key={c} onClick={() => setFilter(c)}
                className="shrink-0 h-7 px-3 rounded-full font-body text-[10px] font-semibold flex items-center gap-1.5 transition-all duration-[150ms]"
                style={{ background: active ? `${color}18` : 'rgba(175,197,255,0.06)', border: `1px solid ${active ? `${color}40` : 'rgba(175,197,255,0.1)'}`, color: active ? color : 'rgba(175,197,255,0.4)' }}>
                {cfg && <span style={{ color }}>{cfg.icon}</span>}
                {c === 'all' ? 'All' : cfg?.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Memory items */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-2.5" style={{ scrollbarWidth: 'none' }}>
        {filtered.map(m => {
          const cfg = CAT_CONFIG[m.category]
          const isEditing = editingId === m.id
          return (
            <div key={m.id} className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.02)', border: `1px solid ${isEditing ? `${cfg.color}35` : 'rgba(175,197,255,0.09)'}` }}>
              {/* Category badge row */}
              <div className="flex items-center gap-2 px-4 pt-3 pb-1.5">
                <span className="h-5 px-2 rounded-full font-body text-[8px] font-bold flex items-center gap-1"
                  style={{ background: `${cfg.color}14`, color: cfg.color, border: `1px solid ${cfg.color}28` }}>
                  <span style={{ color: cfg.color }}>{cfg.icon}</span>
                  {cfg.label}
                </span>
                <p className="font-body text-[9px] text-text-muted ml-auto">{m.learnedAt} · {m.source}</p>
              </div>

              {/* Content */}
              <div className="px-4 pb-2">
                {isEditing ? (
                  <textarea
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    className="w-full bg-transparent font-body text-sm text-text outline-none resize-none leading-relaxed py-1"
                    style={{ borderBottom: `1px solid ${cfg.color}40` }}
                    rows={2}
                    autoFocus
                  />
                ) : (
                  <p className="font-body text-sm text-text leading-relaxed">{m.text}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5 px-4 pb-3">
                {isEditing ? (
                  <>
                    <button onClick={() => saveEdit(m.id)}
                      className="h-7 px-3 rounded-full font-body text-[10px] font-semibold"
                      style={{ background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}35` }}>
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)}
                      className="h-7 px-3 rounded-full font-body text-[10px]"
                      style={{ color: 'rgba(175,197,255,0.4)' }}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => startEdit(m)}
                      className="flex items-center gap-1 h-7 px-2.5 rounded-full font-body text-[10px] font-semibold transition-all hover:bg-surface-hi"
                      style={{ color: 'rgba(175,197,255,0.5)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7 1.5l2 2-5.5 5.5H2v-1.5L7 1.5Z" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round" />
                      </svg>
                      Edit
                    </button>
                    <button onClick={() => remove(m.id)}
                      className="flex items-center gap-1 h-7 px-2.5 rounded-full font-body text-[10px] font-semibold transition-all hover:bg-surface-hi"
                      style={{ color: 'rgba(255,77,90,0.6)' }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 3h7M4 3V2h2v1M3.5 3l.5 5.5h2l.5-5.5" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-2">
            <p className="text-3xl">🧠</p>
            <p className="font-body text-sm text-text-muted">No items in this category</p>
          </div>
        )}

        {/* Clear all CTA */}
        {memories.length > 0 && (
          <button onClick={() => setMemories([])}
            className="mt-2 w-full h-11 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)', color: 'rgba(255,77,90,0.7)' }}>
            Clear All Memory
          </button>
        )}
      </div>
    </div>
  )
}
