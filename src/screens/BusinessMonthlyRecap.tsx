import { useState, useMemo } from 'react'

interface BusinessMonthlyRecapProps {
  businessName?: string
  month?: string
  revenueThisMonth?: number
  revenueLastMonth?: number
  topCategory?: { label: string; amount: number; color: string } | null
  totalTransactions?: number
  payoutsThisMonth?: number
  milestonesReached?: string[]
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

function growthPct(current: number, prev: number): number | null {
  if (prev === 0) return null
  return ((current - prev) / prev) * 100
}

export default function BusinessMonthlyRecap({
  businessName = 'Your Business',
  month,
  revenueThisMonth = 0,
  revenueLastMonth = 0,
  topCategory = null,
  totalTransactions = 0,
  payoutsThisMonth = 0,
  milestonesReached = [],
  onBack,
}: BusinessMonthlyRecapProps) {
  const [shared, setShared] = useState(false)

  const monthLabel = month ?? getMonthLabel()
  const hasData = revenueThisMonth > 0 || totalTransactions > 0

  const growth = growthPct(revenueThisMonth, revenueLastMonth)
  const growthPositive = growth !== null && growth >= 0

  const highlights = useMemo(() => {
    const h: { emoji: string; label: string; value: string; color: string }[] = []
    if (revenueThisMonth > 0) {
      h.push({ emoji: '💰', label: 'Revenue this month', value: `$${fmt(revenueThisMonth)}`, color: '#22C55E' })
    }
    if (growth !== null) {
      h.push({ emoji: growthPositive ? '📈' : '📉', label: 'vs last month', value: `${growthPositive ? '+' : ''}${growth.toFixed(1)}%`, color: growthPositive ? '#22C55E' : '#F87171' })
    }
    if (topCategory && topCategory.amount > 0) {
      h.push({ emoji: '🏷️', label: 'Top revenue category', value: `${topCategory.label} · $${fmt(topCategory.amount)}`, color: topCategory.color })
    }
    if (totalTransactions > 0) {
      h.push({ emoji: '📋', label: 'Transactions processed', value: String(totalTransactions), color: '#3FE7FF' })
    }
    if (payoutsThisMonth > 0) {
      h.push({ emoji: '🏦', label: 'Paid out to bank', value: `$${fmt(payoutsThisMonth)}`, color: '#0066FF' })
    }
    milestonesReached.forEach(m => {
      h.push({ emoji: '🎖️', label: 'Milestone reached', value: m, color: '#F5B700' })
    })
    return h
  }, [revenueThisMonth, growth, growthPositive, topCategory, totalTransactions, payoutsThisMonth, milestonesReached])

  const handleShare = async () => {
    const text = hasData
      ? `${businessName} on ChangeAIPay — ${monthLabel}: $${fmt(revenueThisMonth)} revenue${growth !== null ? `, ${growthPositive ? '+' : ''}${growth.toFixed(1)}% vs last month` : ''}${topCategory ? `, top category: ${topCategory.label}` : ''}. #ChangeAIPay`
      : `Running my business with ChangeAIPay. #ChangeAIPay`
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Business Recap</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {!hasData ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="8" width="20" height="14" rx="2.5" stroke="rgba(175,197,255,0.25)" strokeWidth="1.4" />
                <path d="M4 12h20M9 16h2M14 16h2M19 16h2" stroke="rgba(175,197,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text mb-1">No business activity yet</p>
              <p className="font-body text-xs text-text-muted leading-relaxed px-6">
                Your {monthLabel} recap will show real revenue, growth vs last month, and your top category — once payments start coming in.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Recap card visual */}
            <div className="rounded-[--radius-2xl] overflow-hidden relative"
              style={{ background: 'linear-gradient(145deg, rgba(0,20,60,0.97), rgba(5,11,45,0.98))', border: '1.5px solid rgba(0,102,255,0.3)', boxShadow: '0 0 40px rgba(0,102,255,0.12)' }}>
              <div className="h-1 w-full" style={{ background: 'var(--gradient-primary)' }} />
              <div className="px-5 pt-4 pb-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-body text-[10px] text-text-muted uppercase tracking-wider">{monthLabel}</p>
                    <p className="font-display text-xl font-extrabold text-gradient-primary leading-tight">{businessName}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(0,102,255,0.12)', border: '1px solid rgba(0,102,255,0.25)' }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <rect x="2" y="5" width="14" height="10" rx="2" stroke="#0066FF" strokeWidth="1.3" />
                      <path d="M5 5V4a4 4 0 0 1 8 0v1" stroke="#0066FF" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Revenue hero */}
                <div className="rounded-[--radius-xl] px-4 py-3 mb-4"
                  style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <p className="font-body text-[9px] text-text-muted uppercase tracking-wider mb-0.5">Revenue This Month</p>
                  <div className="flex items-end gap-2">
                    <p className="font-display text-2xl font-extrabold" style={{ color: '#22C55E' }}>${fmt(revenueThisMonth)}</p>
                    {growth !== null && (
                      <p className="font-body text-xs font-semibold pb-0.5" style={{ color: growthPositive ? '#22C55E' : '#F87171' }}>
                        {growthPositive ? '▲' : '▼'} {Math.abs(growth).toFixed(1)}%
                      </p>
                    )}
                  </div>
                  {growth !== null && (
                    <p className="font-body text-[10px] text-text-muted mt-0.5">
                      {growthPositive ? 'Up' : 'Down'} from ${fmt(revenueLastMonth)} last month
                    </p>
                  )}
                </div>

                {/* Highlights */}
                <div className="flex flex-col gap-2.5">
                  {highlights.slice(0, 4).map((h, i) => (
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

                <div className="flex items-center gap-1.5 mt-4 pt-3"
                  style={{ borderTop: '1px solid rgba(175,197,255,0.08)' }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: 'var(--gradient-primary)' }} />
                  <p className="font-body text-[9px] text-text-muted">ChangeAIPay Business</p>
                </div>
              </div>
            </div>

            {milestonesReached.length > 0 && (
              <div className="rounded-[--radius-xl] px-4 py-3.5"
                style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.2)' }}>
                <p className="font-body text-xs font-semibold text-text mb-2">Milestones Reached</p>
                {milestonesReached.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 mb-1">
                    <span className="text-sm">🎖️</span>
                    <p className="font-body text-xs text-text-muted">{m}</p>
                  </div>
                ))}
              </div>
            )}

            <p className="font-body text-[10px] text-text-muted text-center px-4 leading-relaxed">
              All figures reflect your actual transaction and payout records — nothing is estimated.
            </p>
          </>
        )}

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
              Share This Recap
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
