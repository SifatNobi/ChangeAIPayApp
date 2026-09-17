import { useState, useMemo } from 'react'

interface GoalSummary {
  name: string
  savedThisMonth: number
  completed: boolean
}

interface CategorySpend {
  label: string
  amount: number
  color: string
}

interface MonthlyRecapCardProps {
  userName?: string
  month?: string
  goals?: GoalSummary[]
  topCategory?: CategorySpend | null
  totalSaved?: number
  totalSpent?: number
  activeConnections?: number
  onBack?: () => void
}

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function getMonthLabel() {
  const d = new Date()
  d.setMonth(d.getMonth() - 1)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export default function MonthlyRecapCard({
  userName = 'You',
  month,
  goals = [],
  topCategory = null,
  totalSaved = 0,
  totalSpent = 0,
  activeConnections = 0,
  onBack,
}: MonthlyRecapCardProps) {
  const [shared, setShared] = useState(false)

  const monthLabel = month ?? getMonthLabel()
  const completedGoals = goals.filter(g => g.completed)
  const totalGoalSaved = goals.reduce((s, g) => s + g.savedThisMonth, 0)
  const hasData = totalSaved > 0 || totalSpent > 0 || goals.length > 0

  const highlights = useMemo(() => {
    const h: { emoji: string; label: string; value: string; color: string }[] = []
    if (totalGoalSaved > 0) {
      h.push({ emoji: '🎯', label: 'Saved toward goals', value: `$${fmt(totalGoalSaved)}`, color: '#22C55E' })
    }
    if (completedGoals.length > 0) {
      h.push({ emoji: '🏆', label: completedGoals.length === 1 ? 'Goal completed' : `${completedGoals.length} goals completed`, value: completedGoals[0].name, color: '#F5B700' })
    }
    if (topCategory && topCategory.amount > 0) {
      h.push({ emoji: '📊', label: 'Top spending category', value: `${topCategory.label} · $${fmt(topCategory.amount)}`, color: topCategory.color })
    }
    if (activeConnections > 0) {
      h.push({ emoji: '🔗', label: 'Active Circle connections', value: String(activeConnections), color: '#3FE7FF' })
    }
    return h
  }, [totalGoalSaved, completedGoals, topCategory, activeConnections])

  const handleShare = async () => {
    const text = hasData
      ? `My ${monthLabel} on ChangeAIPay: saved $${fmt(totalGoalSaved)} toward goals${completedGoals.length > 0 ? `, completed ${completedGoals.length} goal${completedGoals.length !== 1 ? 's' : ''}` : ''}${topCategory ? `, top category: ${topCategory.label}` : ''}. #ChangeAIPay`
      : `Tracking my finances with ChangeAIPay. #ChangeAIPay`
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ text })
        setShared(true)
      } catch {
        setShared(false)
      }
    } else {
      setShared(true)
    }
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Monthly Recap</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {!hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke="rgba(175,197,255,0.25)" strokeWidth="1.4" />
                <path d="M14 9v5l3 3" stroke="rgba(175,197,255,0.3)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text mb-1">No activity yet</p>
              <p className="font-body text-xs text-text-muted leading-relaxed px-6">
                Your {monthLabel} recap will show real savings, spending highlights, and goals you genuinely completed — once you start transacting.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Recap card visual */}
            <div className="rounded-[--radius-2xl] overflow-hidden relative"
              style={{ background: 'linear-gradient(145deg, rgba(0,30,80,0.95), rgba(5,11,45,0.98))', border: '1.5px solid rgba(63,231,255,0.2)', boxShadow: '0 0 40px rgba(0,102,255,0.12)' }}>
              {/* Decorative top bar */}
              <div className="h-1 w-full" style={{ background: 'var(--gradient-primary)' }} />
              <div className="px-5 pt-4 pb-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">{monthLabel}</p>
                    <p className="font-display text-xl font-extrabold text-gradient-primary leading-tight">
                      {userName}&apos;s Recap
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.2)' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2l2 4 4.5.7-3.2 3.1.7 4.5L9 12.4l-4 2 .7-4.5L2.5 6.7l4.5-.7L9 2Z" stroke="#3FE7FF" strokeWidth="1.2" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {/* Top stats row */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-[--radius-xl] px-3 py-3"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
                    <p className="font-body text-[9px] text-text-muted uppercase tracking-wider mb-1">Total Saved</p>
                    <p className="font-display text-lg font-extrabold" style={{ color: '#22C55E' }}>${fmt(totalSaved)}</p>
                  </div>
                  <div className="rounded-[--radius-xl] px-3 py-3"
                    style={{ background: 'rgba(0,102,255,0.08)', border: '1px solid rgba(0,102,255,0.18)' }}>
                    <p className="font-body text-[9px] text-text-muted uppercase tracking-wider mb-1">Total Spent</p>
                    <p className="font-display text-lg font-extrabold" style={{ color: '#3FE7FF' }}>${fmt(totalSpent)}</p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-2.5">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-[10px] flex items-center justify-center text-base shrink-0"
                        style={{ background: `${h.color}12` }}>
                        {h.emoji}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-[10px] text-text-muted">{h.label}</p>
                        <p className="font-body text-xs font-semibold text-text truncate">{h.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ChangeAIPay watermark */}
                <div className="flex items-center gap-1.5 mt-4 pt-3"
                  style={{ borderTop: '1px solid rgba(175,197,255,0.08)' }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: 'var(--gradient-primary)' }} />
                  <p className="font-body text-[9px] text-text-muted">ChangeAIPay</p>
                </div>
              </div>
            </div>

            {/* Goal breakdown */}
            {goals.length > 0 && (
              <div className="rounded-[--radius-2xl] px-4 py-4"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                <p className="font-body text-xs font-semibold text-text mb-3">Goal Progress This Month</p>
                <div className="flex flex-col gap-2.5">
                  {goals.map((g, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: g.completed ? '#22C55E' : '#3FE7FF' }} />
                      <p className="font-body text-xs text-text flex-1 truncate">{g.name}</p>
                      <p className="font-mono text-xs font-semibold shrink-0" style={{ color: g.completed ? '#22C55E' : '#3FE7FF' }}>
                        +${fmt(g.savedThisMonth)}
                        {g.completed && <span className="ml-1 font-body text-[9px]">✓</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Integrity note */}
            <p className="font-body text-[10px] text-text-muted text-center px-4 leading-relaxed">
              All figures are computed from your actual activity this month — nothing is estimated or fabricated.
            </p>
          </>
        )}

        {/* Share button — always visible, sharing never gates anything */}
        <button
          onClick={handleShare}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
          style={{
            background: shared ? 'rgba(34,197,94,0.1)' : 'var(--gradient-primary)',
            border: shared ? '1px solid rgba(34,197,94,0.3)' : 'none',
            color: shared ? '#22C55E' : 'white',
          }}
        >
          {shared ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-7" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Shared!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 7.7l4.1 2.1M10 4.3 6 6.4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Share My Recap
            </>
          )}
        </button>
        <p className="font-body text-[10px] text-text-muted text-center -mt-2">
          Sharing is optional and never unlocks or gates any feature.
        </p>
      </div>
    </div>
  )
}
