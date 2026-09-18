import { useState } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { GlassCard } from '@/components/Card'
import { AIAvatar } from '@/components/AI'

interface AISuggestionsWidgetProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotifications?: () => void
  onOpenChat?: () => void
}

type Suggestion = {
  id: string
  title: string
  body: string
  tag: string
  tagColor: string
  primaryAction: { label: string; confirmLabel: string; successMsg: string }
  secondaryLabel?: string
  urgency: 'low' | 'medium' | 'high'
}

const SUGGESTIONS: Suggestion[] = []

const URGENCY_DOT: Record<Suggestion['urgency'], string> = {
  high: '#FF4D4D',
  medium: '#F5B700',
  low: '#22C55E',
}

const persona = 'fina' as const

function SuggestionDeck({
  suggestions,
  onAct,
  onDismiss,
  onSeeMore,
}: {
  suggestions: Suggestion[]
  onAct: (id: string) => void
  onDismiss: (id: string) => void
  onSeeMore: () => void
}) {
  const [index, setIndex] = useState(0)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [resolvedId, setResolvedId] = useState<string | null>(null)
  const [pressedAction, setPressedAction] = useState(false)
  const [pressedSecondary, setPressedSecondary] = useState(false)

  const visible = suggestions.filter(s => !dismissed.has(s.id))
  const current = visible[index]

  const handleDismiss = () => {
    if (!current) return
    setDismissed(d => new Set([...d, current.id]))
    setResolvedId(null)
    setIndex(i => Math.min(i, visible.length - 2))
    onDismiss(current.id)
  }

  const handlePrimaryAction = () => {
    if (!current) return
    setResolvedId(current.id)
    onAct(current.id)
    // Auto-dismiss after 2.4s
    setTimeout(() => {
      setDismissed(d => new Set([...d, current.id]))
      setResolvedId(null)
      setIndex(i => Math.min(i, visible.length - 2))
    }, 2400)
  }

  const handleNext = () => setIndex(i => Math.min(i + 1, visible.length - 1))
  const handlePrev = () => setIndex(i => Math.max(i - 1, 0))

  if (!current) {
    return (
      <GlassCard className="flex flex-col items-center gap-3 py-8">
        <div className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.15)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10l4 4 8-8" stroke="#3FE7FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-body text-sm font-semibold text-text">All caught up!</p>
        <p className="font-body text-xs text-text-muted text-center">Fina will surface new insights as your spending evolves.</p>
      </GlassCard>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Stack preview — ghost cards behind active */}
      <div className="relative" style={{ perspective: 1000 }}>
        {visible.slice(index + 1, index + 3).reverse().map((_, ghostI) => (
          <div
            key={ghostI}
            className="absolute inset-x-0 rounded-[--radius-2xl]"
            style={{
              height: 8,
              bottom: -(ghostI + 1) * 6,
              background: 'rgba(175,197,255,0.06)',
              border: '1px solid rgba(175,197,255,0.08)',
              borderRadius: 20,
              transform: `scaleX(${1 - (ghostI + 1) * 0.04})`,
              transformOrigin: 'bottom',
            }}
          />
        ))}

        {/* Active card */}
        <GlassCard className="flex flex-col gap-4 relative z-10 animate-fade-in">
          {/* Header row */}
          <div className="flex items-start gap-3">
            <AIAvatar persona={persona} size={38} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <div
                  className="px-2 h-5 rounded-full inline-flex items-center"
                  style={{ background: current.tagColor, border: `1px solid ${current.tagColor.replace('0.1', '0.3').replace('0.12', '0.3').replace('0.15', '0.4')}` }}
                >
                  <span className="font-body text-[9px] font-bold text-text-2 uppercase tracking-wider">{current.tag}</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: URGENCY_DOT[current.urgency] }} />
              </div>
              <p className="font-body text-sm font-semibold text-text leading-snug">{current.title}</p>
            </div>
            <button
              onClick={handleDismiss}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0 -mt-1 -mr-1"
            >
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="rgba(175,197,255,0.4)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <p className="font-body text-sm text-text-2 leading-relaxed">{current.body}</p>

          {/* Resolved in-place confirmation */}
          {resolvedId === current.id ? (
            <div
              className="rounded-[--radius-xl] p-3 flex items-start gap-3 animate-fade-in"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(34,197,94,0.15)' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3 3.5 6-6" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-body text-xs font-semibold text-success">{current.primaryAction.confirmLabel}</p>
                <p className="font-body text-xs text-text-muted mt-0.5 leading-relaxed">{current.primaryAction.successMsg}</p>
              </div>
            </div>
          ) : (
            /* One-tap action CTAs */
            <div className="flex flex-col gap-2">
              <button
                onPointerDown={() => setPressedAction(true)}
                onPointerUp={() => setPressedAction(false)}
                onPointerLeave={() => setPressedAction(false)}
                onClick={handlePrimaryAction}
                className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[150ms]"
                style={{
                  background: 'var(--gradient-primary)',
                  transform: pressedAction ? 'scale(0.97)' : 'scale(1)',
                  boxShadow: pressedAction ? 'none' : '0 4px 16px rgba(0,102,255,0.25)',
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 2v8M2 6l4 4 4-4" stroke="white" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {current.primaryAction.label}
              </button>
              {current.secondaryLabel && (
                <button
                  onPointerDown={() => setPressedSecondary(true)}
                  onPointerUp={() => setPressedSecondary(false)}
                  onPointerLeave={() => setPressedSecondary(false)}
                  onClick={handleDismiss}
                  className="w-full h-10 rounded-[--radius-xl] font-body text-xs font-semibold text-text-muted flex items-center justify-center transition-all duration-[150ms]"
                  style={{
                    transform: pressedSecondary ? 'scale(0.97)' : 'scale(1)',
                    background: 'rgba(175,197,255,0.05)',
                    border: '1px solid rgba(175,197,255,0.1)',
                  }}
                >
                  {current.secondaryLabel}
                </button>
              )}
            </div>
          )}
        </GlassCard>
      </div>

      {/* Pagination dots + arrows */}
      <div className="flex items-center justify-between px-1">
        <button
          onClick={handlePrev}
          disabled={index === 0}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi disabled:opacity-25"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 3l-4 4 4 4" stroke="var(--color-text-2)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          {visible.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)}
              className="transition-all duration-[250ms]"
              style={{
                width: i === index ? 16 : 5,
                height: 5,
                borderRadius: 2.5,
                background: i === index ? 'var(--color-accent)' : 'rgba(175,197,255,0.2)',
              }}
            />
          ))}
        </div>
        <button
          onClick={index < visible.length - 1 ? handleNext : onSeeMore}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="var(--color-text-2)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* See all link */}
      <button
        onClick={onSeeMore}
        className="font-body text-xs font-semibold text-accent text-center py-1 hover:underline underline-offset-2"
      >
        See all {visible.length} suggestions →
      </button>
    </div>
  )
}

export default function AISuggestionsWidget({
  accountType = 'personal',
  onNavigate,
  onBack,
  onNotifications,
  onOpenChat,
}: AISuggestionsWidgetProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={0} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Header */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex items-center gap-2.5">
            <AIAvatar persona="fina" size={34} />
            <div>
              <h1 className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Fina Suggestions</h1>
              <p className="font-body text-[10px] text-text-muted">AI-powered · updates daily</p>
            </div>
          </div>
          <div className="flex-1" />
          <button
            onClick={onOpenChat}
            className="h-8 px-3 rounded-full font-body text-xs font-semibold text-accent transition-colors hover:bg-surface-hi"
            style={{ border: '1px solid rgba(0,102,255,0.3)' }}
          >
            Open Chat
          </button>
        </div>

        <div className="px-5 flex flex-col gap-4">
          <SuggestionDeck
            suggestions={SUGGESTIONS}
            onAct={id => { console.log('act', id) }}
            onDismiss={id => { console.log('dismiss', id) }}
            onSeeMore={() => onOpenChat?.()}
          />
        </div>
      </div>

      <BottomNav active="ai" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
