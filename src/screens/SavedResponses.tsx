import { useState } from 'react'

interface SavedItem {
  id: string
  text: string
  savedAt: string
  context: string
  convoId: string
  tag?: string
  tagColor?: string
}

const SAVED: SavedItem[] = []

interface SavedResponsesProps {
  onOpenConvo?: (convoId: string) => void
  onBack?: () => void
}

export default function SavedResponses({ onOpenConvo, onBack }: SavedResponsesProps) {
  const [saved, setSaved] = useState<SavedItem[]>([])
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const tags = ['All', ...Array.from(new Set(SAVED.map(s => s.tag).filter(Boolean)))] as string[]
  const filtered = activeFilter === 'All' ? saved : saved.filter(s => s.tag === activeFilter)

  const remove = (id: string) => setSaved(prev => prev.filter(s => s.id !== id))

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Saved from Fina</p>
        <span className="h-6 px-2.5 rounded-full font-body text-xs font-bold flex items-center"
          style={{ background: 'rgba(63,231,255,0.12)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.25)' }}>
          {saved.length}
        </span>
      </div>

      {/* Filter chips */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {tags.map(t => (
            <button key={t} onClick={() => setActiveFilter(t)}
              className="shrink-0 h-7 px-3 rounded-full font-body text-[10px] font-semibold transition-all duration-[150ms]"
              style={{
                background: activeFilter === t ? 'rgba(0,102,255,0.18)' : 'rgba(175,197,255,0.06)',
                border: `1px solid ${activeFilter === t ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.1)'}`,
                color: activeFilter === t ? '#AFC5FF' : 'rgba(175,197,255,0.4)',
              }}>
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-4xl">🔖</p>
            <p className="font-body text-sm text-text-muted">No saved responses yet</p>
            <p className="font-body text-xs text-text-muted text-center px-8">Bookmark Fina's insights from any chat to find them here</p>
          </div>
        )}

        {filtered.map(item => (
          <div key={item.id}
            className="rounded-[--radius-2xl] overflow-hidden flex flex-col"
            style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.09)' }}>
            {/* Top: tag + date + remove */}
            <div className="flex items-center gap-2 px-4 pt-3 pb-2">
              {item.tag && (
                <span className="h-5 px-2 rounded-full font-body text-[9px] font-bold flex items-center"
                  style={{ background: `${item.tagColor}15`, color: item.tagColor, border: `1px solid ${item.tagColor}30` }}>
                  {item.tag}
                </span>
              )}
              <p className="font-body text-[9px] text-text-muted ml-auto">{item.savedAt}</p>
              <button onClick={() => remove(item.id)}
                className="w-6 h-6 flex items-center justify-center rounded-full transition-all hover:bg-surface-hi">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Message text — styled like a Fina bubble */}
            <div className="mx-4 mb-3 px-4 py-3 rounded-[4px_16px_16px_16px]"
              style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.22)' }}>
              <p className="font-body text-sm text-text leading-relaxed">{item.text}</p>
            </div>

            {/* Context + Open link */}
            <div className="flex items-center gap-2 px-4 pb-3">
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'var(--gradient-primary)' }}>
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                  <circle cx="3.5" cy="2" r="1.1" fill="white" />
                  <path d="M1 5.8C1 4.4 2.1 3.3 3.5 3.3s2.5 1.1 2.5 2.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                </svg>
              </div>
              <p className="font-body text-[10px] text-text-muted flex-1 truncate">{item.context}</p>
              <button onClick={() => onOpenConvo?.(item.convoId)}
                className="flex items-center gap-1 font-body text-[10px] font-semibold transition-all"
                style={{ color: '#3FE7FF' }}>
                Open chat
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M3.5 2l3 3-3 3" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
