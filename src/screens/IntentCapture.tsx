import { useState } from 'react'

export type UserIntent = 'remittance' | 'split' | 'business' | 'save'

interface IntentOption {
  id: UserIntent
  label: string
  sublabel: string
  icon: React.ReactNode
  color: string
}

const OPTIONS: IntentOption[] = [
  {
    id: 'remittance',
    label: 'Send money abroad',
    sublabel: 'International transfers at real exchange rates',
    color: '#3FE7FF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 8h18M3 16h18" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: 'split',
    label: 'Split bills with friends',
    sublabel: 'Settle shared expenses instantly',
    color: '#0066FF',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 19c0-3 2-5 5-5h8c3 0 5 2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12v7M9.5 16l2.5-3 2.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'business',
    label: 'Run a business',
    sublabel: 'Accept payments, invoices, and payouts',
    color: '#F5B700',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="9" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 9V6a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 14v2M9 14h6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'save',
    label: 'Save toward a goal',
    sublabel: 'Build your financial future with smart goals',
    color: '#22C55E',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 3l2 2-2 2M18 5H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

interface IntentCaptureProps {
  onSelect?: (intent: UserIntent) => void
  onSkip?: () => void
  onBack?: () => void
}

export default function IntentCapture({ onSelect, onSkip, onBack }: IntentCaptureProps) {
  const [selected, setSelected] = useState<UserIntent | null>(null)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-2 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted">Step 2 of 3</p>
          <p className="font-display text-base font-extrabold text-text leading-tight">What brings you here?</p>
        </div>
        <button onClick={onSkip} className="font-body text-xs font-semibold text-text-muted active:opacity-70 px-2 py-1">
          Skip
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 mx-5 rounded-full overflow-hidden" style={{ background: 'rgba(175,197,255,0.1)' }}>
        <div className="h-full rounded-full transition-all" style={{ width: '40%', background: 'var(--gradient-primary)' }} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4 mt-5" style={{ scrollbarWidth: 'none' }}>
        <p className="font-body text-sm text-text-muted -mt-1">
          We'll personalize your experience based on your answer. You can always change this later.
        </p>

        <div className="flex flex-col gap-3">
          {OPTIONS.map(opt => (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className="w-full text-left flex items-center gap-4 px-4 py-4 rounded-[--radius-2xl] transition-all active:scale-[0.98]"
              style={{
                background: selected === opt.id ? `${opt.color}0F` : 'rgba(175,197,255,0.03)',
                border: `1.5px solid ${selected === opt.id ? `${opt.color}50` : 'rgba(175,197,255,0.1)'}`,
                boxShadow: selected === opt.id ? `0 4px 24px ${opt.color}18` : 'none',
              }}
            >
              <div
                className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                style={{ background: `${opt.color}15`, color: opt.color }}
              >
                {opt.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body text-sm font-bold text-text">{opt.label}</p>
                <p className="font-body text-xs text-text-muted mt-0.5">{opt.sublabel}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                style={{
                  borderColor: selected === opt.id ? opt.color : 'rgba(175,197,255,0.25)',
                  background: selected === opt.id ? opt.color : 'transparent',
                }}
              >
                {selected === opt.id && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => selected ? onSelect?.(selected) : onSkip?.()}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-2"
          style={{
            background: selected ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)',
            color: selected ? 'white' : 'rgba(175,197,255,0.4)',
            boxShadow: selected ? '0 4px 24px rgba(0,102,255,0.35)' : 'none',
          }}
        >
          {selected ? "Continue →" : "Select an option"}
        </button>
      </div>
    </div>
  )
}
