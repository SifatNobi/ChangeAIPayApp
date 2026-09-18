import { useState } from 'react'

interface Convo {
  id: string
  preview: string
  date: string
  group: string
  msgCount: number
  tag?: string
  tagColor?: string
}

const CONVOS: Convo[] = []

interface ChatHistoryProps {
  onResume?: (id: string) => void
  onBack?: () => void
}

export default function ChatHistory({ onResume, onBack }: ChatHistoryProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? CONVOS.filter(c => c.preview.toLowerCase().includes(query.toLowerCase()) || (c.tag?.toLowerCase().includes(query.toLowerCase())))
    : CONVOS

  const groups = [...new Set(filtered.map(c => c.group))]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Fina History</p>
      </div>

      {/* Search */}
      <div className="px-5 pb-4 shrink-0">
        <div className="flex items-center gap-2 h-11 px-3.5 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M9.5 9.5l2.5 2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search conversations…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="w-5 h-5 flex items-center justify-center rounded-full" style={{ background: 'rgba(175,197,255,0.12)' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 1.5l5 5M6.5 1.5l-5 5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-1" style={{ scrollbarWidth: 'none' }}>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-4xl">🔍</p>
            <p className="font-body text-sm text-text-muted">No conversations matched</p>
          </div>
        )}

        {groups.map(group => (
          <div key={group}>
            <p className="font-body text-[10px] font-semibold text-text-muted uppercase tracking-widest pt-4 pb-2">{group}</p>
            <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.08)' }}>
              {filtered.filter(c => c.group === group).map((convo, i, arr) => (
                <button
                  key={convo.id}
                  onClick={() => onResume?.(convo.id)}
                  className="w-full flex items-start gap-3 px-4 py-4 text-left transition-all duration-[150ms] hover:bg-surface-hi active:scale-[0.99]"
                  style={{ background: 'rgba(175,197,255,0.02)', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
                >
                  {/* Fina dot */}
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 8px rgba(63,231,255,0.3)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="3.5" r="1.8" fill="white" />
                      <path d="M2 10.5C2 8.3 3.8 6.5 6 6.5s4 1.8 4 4" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {convo.tag && (
                        <span className="h-4 px-1.5 rounded-full font-body text-[8px] font-bold flex items-center shrink-0"
                          style={{ background: `${convo.tagColor}18`, color: convo.tagColor, border: `1px solid ${convo.tagColor}30` }}>
                          {convo.tag}
                        </span>
                      )}
                      <p className="font-body text-[10px] text-text-muted ml-auto shrink-0">{convo.date}</p>
                    </div>
                    <p className="font-body text-sm font-semibold text-text leading-snug line-clamp-2">{convo.preview}</p>
                    <p className="font-body text-[10px] text-text-muted mt-1">{convo.msgCount} messages</p>
                  </div>

                  {/* Resume chevron */}
                  <div className="shrink-0 flex items-center mt-2">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
