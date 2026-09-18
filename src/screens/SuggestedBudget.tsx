import { useState } from 'react'

interface BudgetCategory {
  id: string
  label: string
  emoji: string
  color: string
  suggested: number
  current: number
  reason: string
  adjusted: number
}

const INITIAL_CATS: BudgetCategory[] = []

interface SuggestedBudgetProps {
  onAccept?: (cats: BudgetCategory[]) => void
  onBack?: () => void
}

export default function SuggestedBudget({ onAccept, onBack }: SuggestedBudgetProps) {
  const [cats, setCats] = useState<BudgetCategory[]>([])
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [accepted, setAccepted] = useState(false)
  const [applying, setApplying] = useState(false)

  const totalBudget = cats.reduce((s, c) => s + c.adjusted, 0)
  const income = 0
  const headroom = income - totalBudget

  const updateAdjusted = (id: string, val: number) => {
    setCats(prev => prev.map(c => c.id === id ? { ...c, adjusted: Math.max(0, val) } : c))
  }

  const handleAccept = () => {
    setApplying(true)
    setTimeout(() => { setApplying(false); setAccepted(true); onAccept?.(cats) }, 1200)
  }

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Suggested Budget</p>
          <p className="font-body text-[10px] text-text-muted">Personalised by Fina · Aug 2026</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Headroom summary */}
        <div className="rounded-[--radius-2xl] px-5 py-4 flex items-center justify-between"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.92), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}>
          <div>
            <p className="font-body text-xs text-text-muted mb-0.5">Monthly budget</p>
            <p className="font-display text-3xl font-extrabold tracking-tighter"
              style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ${totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1">
            <p className="font-body text-xs text-text-muted">of ${income.toLocaleString()} income</p>
            <p className="font-body text-xs font-semibold" style={{ color: headroom >= 0 ? '#22C55E' : '#FF4D5A' }}>
              {headroom >= 0 ? `$${headroom} unallocated` : `$${Math.abs(headroom)} over income`}
            </p>
          </div>
        </div>

        {/* Category list */}
        <div className="flex flex-col gap-2">
          {cats.map(cat => {
            const isExpanded = expandedId === cat.id
            const changed = cat.adjusted !== cat.suggested
            return (
              <div key={cat.id} className="rounded-[--radius-2xl] overflow-hidden transition-all duration-[200ms]"
                style={{ background: 'rgba(175,197,255,0.02)', border: `1px solid ${isExpanded ? `${cat.color}35` : 'rgba(175,197,255,0.09)'}` }}>
                {/* Row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="text-xl shrink-0">{cat.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-body text-sm font-semibold text-text">{cat.label}</p>
                      {changed && (
                        <span className="h-4 px-1.5 rounded-full font-body text-[8px] font-bold flex items-center shrink-0"
                          style={{ background: 'rgba(245,183,0,0.12)', color: '#F5B700', border: '1px solid rgba(245,183,0,0.25)' }}>
                          Adjusted
                        </span>
                      )}
                    </div>
                    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(175,197,255,0.08)' }}>
                      <div className="h-full rounded-full" style={{ width: `${Math.min((cat.current / cat.adjusted) * 100, 100)}%`, background: cat.color, boxShadow: `0 0 4px ${cat.color}50` }} />
                    </div>
                  </div>
                  <div className="flex flex-col items-end shrink-0">
                    <p className="font-display text-base font-extrabold" style={{ color: cat.color }}>${cat.adjusted}</p>
                    {cat.adjusted !== cat.suggested && (
                      <p className="font-body text-[9px] text-text-muted">was ${cat.suggested}</p>
                    )}
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={`shrink-0 transition-transform duration-[200ms] ${isExpanded ? 'rotate-180' : ''}`}>
                    <path d="M3.5 5.5l3.5 3.5 3.5-3.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Expanded: reason + stepper */}
                {isExpanded && (
                  <div className="px-4 pb-4 flex flex-col gap-3 border-t border-[rgba(175,197,255,0.07)]">
                    <p className="font-body text-[11px] text-text-muted leading-relaxed pt-2.5"
                      style={{ color: 'rgba(175,197,255,0.55)' }}>
                      {cat.reason}
                    </p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateAdjusted(cat.id, cat.adjusted - 10)}
                        className="w-10 h-10 rounded-[--radius-xl] flex items-center justify-center transition-all active:scale-[0.94]"
                        style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.14)' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" /></svg>
                      </button>
                      <div className="flex-1 flex items-center justify-center h-10 rounded-[--radius-xl]"
                        style={{ background: `${cat.color}10`, border: `1px solid ${cat.color}30` }}>
                        <span className="font-display text-lg font-extrabold" style={{ color: cat.color }}>${cat.adjusted}</span>
                      </div>
                      <button
                        onClick={() => updateAdjusted(cat.id, cat.adjusted + 10)}
                        className="w-10 h-10 rounded-[--radius-xl] flex items-center justify-center transition-all active:scale-[0.94]"
                        style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.14)' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2v8M2 6h8" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" /></svg>
                      </button>
                      <button
                        onClick={() => updateAdjusted(cat.id, cat.suggested)}
                        className="h-7 px-3 rounded-full font-body text-[10px] font-semibold transition-all"
                        style={{ color: 'rgba(175,197,255,0.4)', background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}>
                        Reset
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Accept / active state */}
        {accepted ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Budget Applied</p>
          </div>
        ) : (
          <button onClick={handleAccept} disabled={applying || headroom < 0}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
            style={{ background: 'var(--gradient-primary)' }}>
            {applying ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Accept Suggested Budget
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
