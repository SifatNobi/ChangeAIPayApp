import { useState } from 'react'
import ainaSrc from '@/imports/Aina.png.jpeg'

type InsightSeverity = 'high' | 'medium' | 'low' | 'opportunity'
type InsightState = 'idle' | 'resolving' | 'resolved' | 'dismissed'

interface Insight {
  id: string
  severity: InsightSeverity
  category: string
  title: string
  body: string
  actionLabel: string
  resolvedLabel: string
  dismissLabel: string
}

const INSIGHTS: Insight[] = []

const SEVERITY_CFG: Record<InsightSeverity, {
  color: string; bg: string; border: string; dotGlow: string; label: string
}> = {
  high:        { color: '#F87171', bg: 'rgba(239,68,68,0.06)',    border: 'rgba(239,68,68,0.18)',    dotGlow: 'rgba(239,68,68,0.5)',    label: 'High priority' },
  medium:      { color: '#F5B700', bg: 'rgba(245,183,0,0.06)',    border: 'rgba(245,183,0,0.18)',    dotGlow: 'rgba(245,183,0,0.5)',    label: 'Review needed' },
  opportunity: { color: '#22C55E', bg: 'rgba(34,197,94,0.05)',    border: 'rgba(34,197,94,0.18)',    dotGlow: 'rgba(34,197,94,0.5)',    label: 'Opportunity' },
  low:         { color: '#3FE7FF', bg: 'rgba(63,231,255,0.05)',   border: 'rgba(63,231,255,0.15)',   dotGlow: 'rgba(63,231,255,0.45)',  label: 'FYI' },
}

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  'Revenue Alert': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2L1.5 13h13L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 7v3M8 11.5v.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  'Timing Opportunity': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 4.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  'Expense Flag': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 3h10l-1.5 5H4.5L3 3zM4.5 8l-1.5 5h9l-1.5-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  ),
  'Customer Retention': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="6" r="2.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M3 13c0-3 2.2-5 5-5s5 2 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  'Payout Timing': (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 3v7M5 7l3-4 3 4M3 13h10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
}

interface InsightCardProps {
  insight: Insight
  state: InsightState
  onAction: (id: string) => void
  onDismiss: (id: string) => void
}

function InsightCard({ insight, state, onAction, onDismiss }: InsightCardProps) {
  const cfg = SEVERITY_CFG[insight.severity]

  if (state === 'dismissed') return null

  return (
    <div
      className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3 transition-all"
      style={{
        background: state === 'resolved' ? 'rgba(34,197,94,0.04)' : cfg.bg,
        border: `1px solid ${state === 'resolved' ? 'rgba(34,197,94,0.22)' : cfg.border}`,
        opacity: state === 'resolved' ? 0.85 : 1,
      }}
    >
      {/* Category row */}
      <div className="flex items-center gap-2">
        <div
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: state === 'resolved' ? '#22C55E' : cfg.color, boxShadow: `0 0 5px ${cfg.dotGlow}` }}
        />
        <span
          className="flex items-center gap-1.5 font-body text-[10px] font-semibold uppercase tracking-wider"
          style={{ color: state === 'resolved' ? '#22C55E' : cfg.color }}
        >
          <span style={{ color: state === 'resolved' ? '#22C55E' : cfg.color }}>
            {CATEGORY_ICON[insight.category]}
          </span>
          {insight.category}
        </span>
        <span
          className="ml-auto px-2 py-0.5 rounded-full font-body text-[9px] font-semibold"
          style={{
            background: state === 'resolved' ? 'rgba(34,197,94,0.12)' : `${cfg.color}15`,
            color: state === 'resolved' ? '#22C55E' : cfg.color,
          }}
        >
          {state === 'resolved' ? 'Done' : cfg.label}
        </span>
      </div>

      {/* Content */}
      {state === 'resolved' ? (
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(34,197,94,0.15)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>
            {insight.resolvedLabel}
          </p>
        </div>
      ) : (
        <>
          <div>
            <p className="font-body text-sm font-semibold text-text mb-1">{insight.title}</p>
            <p className="font-body text-xs text-text-muted leading-relaxed">{insight.body}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onAction(insight.id)}
              disabled={state === 'resolving'}
              className="flex-1 h-10 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
              style={{
                background: state === 'resolving' ? `${cfg.color}25` : `${cfg.color}18`,
                border: `1px solid ${cfg.color}35`,
                color: cfg.color,
              }}
            >
              {state === 'resolving' ? (
                <div
                  className="w-3.5 h-3.5 rounded-full border-2 border-t-transparent animate-spin"
                  style={{ borderColor: `${cfg.color}40`, borderTopColor: cfg.color }}
                />
              ) : (
                insight.actionLabel
              )}
            </button>
            <button
              onClick={() => onDismiss(insight.id)}
              className="px-3 h-10 rounded-[--radius-xl] font-body text-xs transition-all"
              style={{ color: 'rgba(175,197,255,0.4)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              {insight.dismissLabel}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

interface BusinessInsightsProps {
  onBack?: () => void
  onOpenAina?: () => void
}

export default function BusinessInsights({ onBack, onOpenAina }: BusinessInsightsProps) {
  const [states, setStates] = useState<Record<string, InsightState>>(
    Object.fromEntries(INSIGHTS.map(i => [i.id, 'idle']))
  )

  const handleAction = (id: string) => {
    setStates(prev => ({ ...prev, [id]: 'resolving' }))
    setTimeout(() => {
      setStates(prev => ({ ...prev, [id]: 'resolved' }))
    }, 1200)
  }

  const handleDismiss = (id: string) => {
    setStates(prev => ({ ...prev, [id]: 'dismissed' }))
  }

  const activeCount = INSIGHTS.filter(i => states[i.id] === 'idle' || states[i.id] === 'resolving').length
  const resolvedCount = INSIGHTS.filter(i => states[i.id] === 'resolved').length

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Business Insights</p>
          <p className="font-body text-[10px] text-text-muted">
            {activeCount > 0 ? `${activeCount} insight${activeCount !== 1 ? 's' : ''} need attention` : 'All caught up'}
          </p>
        </div>
        {activeCount > 0 && (
          <div
            className="px-2.5 py-1 rounded-full font-mono text-xs font-bold"
            style={{ background: 'rgba(239,68,68,0.12)', color: '#F87171', border: '1px solid rgba(239,68,68,0.25)' }}
          >
            {activeCount}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Aina intro card */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,80,0.9) 0%, rgba(10,20,60,0.95) 100%)',
            border: '1px solid rgba(0,102,255,0.2)',
          }}
        >
          <img src={ainaSrc} alt="Aina"
            className="w-9 h-9 rounded-[11px] object-cover shrink-0"
            style={{ border: '1.5px solid rgba(0,102,255,0.5)', boxShadow: '0 0 10px rgba(0,102,255,0.3)' }} />
          <div className="flex-1">
            <p className="font-body text-xs font-semibold text-text">
              {activeCount > 0
                ? `I found ${activeCount} things worth your attention today.`
                : "Your business is looking healthy — nothing urgent right now."}
            </p>
            <p className="font-body text-[10px] text-text-muted mt-0.5">
              {resolvedCount > 0 ? `${resolvedCount} resolved · ` : ''}Updated just now
            </p>
          </div>
          <button onClick={onOpenAina}
            className="shrink-0 font-body text-xs font-semibold"
            style={{ color: 'var(--color-accent)' }}>
            Chat
          </button>
        </div>

        {/* Active insights */}
        {INSIGHTS.filter(i => states[i.id] !== 'dismissed').map(insight => (
          <InsightCard
            key={insight.id}
            insight={insight}
            state={states[insight.id]}
            onAction={handleAction}
            onDismiss={handleDismiss}
          />
        ))}

        {/* Empty state when all dismissed */}
        {INSIGHTS.every(i => states[i.id] === 'dismissed' || states[i.id] === 'resolved') && (
          <div className="flex flex-col items-center justify-center py-10 gap-4">
            <div
              className="w-16 h-16 rounded-[20px] flex items-center justify-center"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 14l7 7 11-11" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text">All caught up</p>
              <p className="font-body text-xs text-text-muted mt-1">New insights will appear here as Aina monitors your business.</p>
            </div>
            <button onClick={onOpenAina}
              className="px-4 h-10 rounded-full font-body text-xs font-semibold transition-all"
              style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--color-accent)', border: '1px solid rgba(0,102,255,0.2)' }}>
              Ask Aina anything
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
