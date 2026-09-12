import { useState } from 'react'
import { GOALS } from '@/data/goals'

interface AutoSaveHistoryProps {
  onBack?: () => void
}

type EventKind = 'roundup' | 'paycheck'

interface AutoEvent {
  id: string
  kind: EventKind
  date: string
  amount: number
  description: string
  goalId?: string
  bucketLabel?: string
}

const EVENTS: AutoEvent[] = []

const KIND_CONFIG: Record<EventKind, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  roundup: {
    label: 'Round-Up',
    color: '#3FE7FF',
    bg: 'rgba(63,231,255,0.1)',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1.5 9l3-3 2 2 4-5" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  paycheck: {
    label: 'Paycheck',
    color: '#9945FF',
    bg: 'rgba(153,69,255,0.1)',
    icon: (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <rect x="1" y="4" width="10" height="7" rx="1.2" stroke="#9945FF" strokeWidth="1.1" />
        <path d="M4 4V3a2 2 0 0 1 4 0v1" stroke="#9945FF" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M1 7h10" stroke="#9945FF" strokeWidth="1.1" />
      </svg>
    ),
  },
}

type FilterKind = 'all' | EventKind

export default function AutoSaveHistory({ onBack }: AutoSaveHistoryProps) {
  const [filter, setFilter] = useState<FilterKind>('all')

  const filtered = filter === 'all' ? EVENTS : EVENTS.filter(e => e.kind === filter)
  const totalRoundup = EVENTS.filter(e => e.kind === 'roundup').reduce((s, e) => s + e.amount, 0)
  const totalPaycheck = EVENTS.filter(e => e.kind === 'paycheck').reduce((s, e) => s + e.amount, 0)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Auto Save History</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Summary tiles */}
        <div className="flex gap-3">
          <div className="flex-1 flex flex-col gap-1 py-3.5 px-4 rounded-[--radius-2xl]"
            style={{ background: 'rgba(63,231,255,0.06)', border: '1px solid rgba(63,231,255,0.2)' }}>
            <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">Round-up (Aug)</p>
            <p className="font-display text-lg font-extrabold" style={{ color: '#3FE7FF' }}>+${totalRoundup.toFixed(2)}</p>
            <p className="font-body text-[10px] text-text-muted">{EVENTS.filter(e => e.kind === 'roundup').length} sweeps</p>
          </div>
          <div className="flex-1 flex flex-col gap-1 py-3.5 px-4 rounded-[--radius-2xl]"
            style={{ background: 'rgba(153,69,255,0.06)', border: '1px solid rgba(153,69,255,0.2)' }}>
            <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">Paycheck (Aug)</p>
            <p className="font-display text-lg font-extrabold" style={{ color: '#9945FF' }}>+${totalPaycheck.toLocaleString()}</p>
            <p className="font-body text-[10px] text-text-muted">{EVENTS.filter(e => e.kind === 'paycheck').length} allocations</p>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2">
          {(['all', 'roundup', 'paycheck'] as FilterKind[]).map(f => {
            const active = filter === f
            const label = f === 'all' ? 'All' : KIND_CONFIG[f].label
            const color = f !== 'all' ? KIND_CONFIG[f].color : '#AFC5FF'
            return (
              <button key={f} onClick={() => setFilter(f)}
                className="h-8 px-3.5 rounded-full font-body text-xs font-semibold transition-all duration-[150ms]"
                style={{ background: active ? `${color}18` : 'rgba(175,197,255,0.06)', border: `1px solid ${active ? `${color}45` : 'rgba(175,197,255,0.1)'}`, color: active ? color : 'rgba(175,197,255,0.4)' }}>
                {label}
              </button>
            )
          })}
        </div>

        {/* Events list */}
        <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
          {filtered.map((ev, i) => {
            const cfg = KIND_CONFIG[ev.kind]
            const goal = ev.goalId ? GOALS.find(g => g.id === ev.goalId) : null
            return (
              <div key={ev.id} className="flex items-center gap-3 px-4 py-3.5"
                style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                {/* Icon badge */}
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}>
                  {cfg.icon}
                </div>
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-body text-sm font-semibold text-text truncate">{ev.description}</p>
                    <span className="h-4 px-1.5 rounded-full font-body text-[8px] font-bold flex items-center shrink-0"
                      style={{ background: `${cfg.color}18`, color: cfg.color, border: `1px solid ${cfg.color}30` }}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="font-body text-[10px] text-text-muted truncate">
                    {ev.date}
                    {goal ? ` · → ${goal.emoji} ${goal.name}` : ''}
                    {ev.bucketLabel ? ` · ${ev.bucketLabel}` : ''}
                  </p>
                </div>
                {/* Amount */}
                <p className="font-body text-sm font-bold shrink-0" style={{ color: cfg.color }}>
                  +{ev.amount < 10 ? `$${ev.amount.toFixed(2)}` : `$${ev.amount.toLocaleString()}`}
                </p>
              </div>
            )
          })}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 gap-2">
              <p className="text-3xl">📭</p>
              <p className="font-body text-sm text-text-muted">No events yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
