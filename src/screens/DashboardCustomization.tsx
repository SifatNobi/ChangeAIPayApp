import { useState, useRef } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { GlassCard } from '@/components/Card'

interface DashboardCustomizationProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotifications?: () => void
  onSave?: (config: CardConfig[]) => void
}

type CardConfig = {
  id: string
  label: string
  description: string
  visible: boolean
  fixed?: boolean
}

const DEFAULT_CARDS: CardConfig[] = [
  { id: 'wallet', label: 'Wallet Card', description: 'Balance, eye toggle, refresh', visible: true, fixed: true },
  { id: 'quickActions', label: 'Quick Actions', description: 'Send, Request, Add, Scan', visible: true },
  { id: 'fina', label: 'Fina AI Insight', description: 'Contextual AI suggestions', visible: true },
  { id: 'recentTx', label: 'Recent Transactions', description: 'Last 3–4 transactions', visible: true },
  { id: 'spendingInsights', label: 'Spending Insights', description: 'Compact chart + takeaway', visible: true },
  { id: 'kycNudge', label: 'Verification Nudge', description: 'KYC status badge', visible: false },
  { id: 'upgradeCard', label: 'Upgrade Teaser', description: 'Plan upgrade prompt', visible: false },
]

export default function DashboardCustomization({
  accountType = 'personal',
  onNavigate,
  onBack,
  onNotifications,
  onSave,
}: DashboardCustomizationProps) {
  const [cards, setCards] = useState<CardConfig[]>(DEFAULT_CARDS)
  const [saved, setSaved] = useState(false)
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const dragSrcIndex = useRef<number>(-1)

  const isDirty = JSON.stringify(cards) !== JSON.stringify(DEFAULT_CARDS)

  const toggleVisible = (id: string) => {
    setCards(c => c.map(card => card.id === id ? { ...card, visible: !card.visible } : card))
    setSaved(false)
  }

  const handleDragStart = (id: string, index: number) => {
    setDraggingId(id)
    dragSrcIndex.current = index
  }

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    setDragOverId(id)
  }

  const handleDrop = (targetId: string) => {
    const srcIndex = dragSrcIndex.current
    const targetIndex = cards.findIndex(c => c.id === targetId)
    if (srcIndex === targetIndex || srcIndex < 0) return
    const next = [...cards]
    const [moved] = next.splice(srcIndex, 1)
    next.splice(targetIndex, 0, moved)
    setCards(next)
    setDraggingId(null)
    setDragOverId(null)
    setSaved(false)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setDragOverId(null)
  }

  const handleSave = () => {
    // Persist hidden widget IDs to localStorage so Home can read them
    const hidden = cards.filter(c => !c.visible && !c.fixed).map(c => c.id)
    try { localStorage.setItem('cap_hidden_widgets', JSON.stringify(hidden)) } catch { /* quota */ }
    onSave?.(cards)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleReset = () => {
    setCards(DEFAULT_CARDS)
    setSaved(false)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={0} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Title */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-1">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Customise Home</h1>
            <p className="font-body text-xs text-text-muted">Drag to reorder · toggle to show/hide</p>
          </div>
        </div>

        <div className="px-5 py-3 flex flex-col gap-4">
          {/* Hint strip */}
          <div
            className="flex items-center gap-2 px-3 py-2.5 rounded-[--radius-xl]"
            style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.15)' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5.5" stroke="#AFC5FF" strokeWidth="1.1" />
              <line x1="6.5" y1="4" x2="6.5" y2="7" stroke="#AFC5FF" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="6.5" cy="9.5" r="0.7" fill="#AFC5FF" />
            </svg>
            <p className="font-body text-xs text-text-muted">
              Drag the <span className="font-semibold text-text-2">⠿</span> handle to reorder. Fixed cards can't be moved or hidden.
            </p>
          </div>

          {/* Cards list */}
          <GlassCard className="p-0 overflow-hidden divide-y divide-[color:var(--color-border)]">
            {cards.map((card, index) => {
              const isDragging = draggingId === card.id
              const isDragOver = dragOverId === card.id && !isDragging

              return (
                <div
                  key={card.id}
                  draggable={!card.fixed}
                  onDragStart={() => handleDragStart(card.id, index)}
                  onDragOver={e => !card.fixed && handleDragOver(e, card.id)}
                  onDrop={() => handleDrop(card.id)}
                  onDragEnd={handleDragEnd}
                  className="flex items-center gap-3 px-4 py-4 transition-all duration-[200ms]"
                  style={{
                    opacity: isDragging ? 0.4 : 1,
                    background: isDragOver
                      ? 'rgba(0,102,255,0.08)'
                      : card.fixed
                      ? 'rgba(175,197,255,0.02)'
                      : undefined,
                    borderLeft: isDragOver ? '2px solid var(--color-accent)' : '2px solid transparent',
                  }}
                >
                  {/* Drag handle */}
                  <div
                    className={`flex flex-col gap-0.5 w-6 h-6 items-center justify-center shrink-0 ${card.fixed ? 'opacity-20 cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                  >
                    {[0, 1, 2].map(i => (
                      <div key={i} className="flex gap-[3px]">
                        {[0, 1].map(j => (
                          <div key={j} className="w-1 h-1 rounded-full bg-text-muted" />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Label + description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-body text-sm font-semibold ${card.visible ? 'text-text' : 'text-text-muted'}`}>
                        {card.label}
                      </p>
                      {card.fixed && (
                        <span
                          className="px-1.5 h-4 rounded-sm inline-flex items-center font-body text-[9px] font-semibold uppercase tracking-wide"
                          style={{ background: 'rgba(175,197,255,0.1)', color: 'rgba(175,197,255,0.5)' }}
                        >
                          Fixed
                        </span>
                      )}
                    </div>
                    <p className="font-body text-xs text-text-muted mt-0.5 truncate">{card.description}</p>
                  </div>

                  {/* Toggle */}
                  <button
                    onClick={() => !card.fixed && toggleVisible(card.id)}
                    disabled={card.fixed}
                    className={`relative w-11 h-6 rounded-full transition-all duration-[250ms] shrink-0 focus-ring ${card.fixed ? 'cursor-default' : 'cursor-pointer'}`}
                    style={{
                      background: card.visible
                        ? card.fixed ? 'rgba(63,231,255,0.3)' : 'var(--gradient-primary)'
                        : 'rgba(175,197,255,0.1)',
                      border: `1px solid ${card.visible ? (card.fixed ? 'rgba(63,231,255,0.2)' : 'rgba(0,102,255,0.4)') : 'rgba(175,197,255,0.15)'}`,
                    }}
                    aria-label={`${card.visible ? 'Hide' : 'Show'} ${card.label}`}
                    role="switch"
                    aria-checked={card.visible}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-[250ms]"
                      style={{
                        left: card.visible ? 'calc(100% - 22px)' : 2,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                      }}
                    />
                  </button>
                </div>
              )
            })}
          </GlassCard>

          {/* Visibility legend */}
          <div className="flex items-center gap-4 px-1">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: 'var(--color-accent)' }} />
              <p className="font-body text-xs text-text-muted">Visible</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
              <p className="font-body text-xs text-text-muted">Hidden</p>
            </div>
            <div className="flex-1" />
            <p className="font-body text-xs text-text-muted">
              {cards.filter(c => c.visible).length} of {cards.length} shown
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleReset}
              disabled={!isDirty}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
              style={{
                background: saved ? 'rgba(34,197,94,0.15)' : 'var(--gradient-primary)',
                border: saved ? '1px solid rgba(34,197,94,0.3)' : 'none',
                color: saved ? '#22C55E' : 'white',
              }}
            >
              {saved ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3 6-6" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Saved
                </>
              ) : 'Save Layout'}
            </button>
          </div>
        </div>
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
