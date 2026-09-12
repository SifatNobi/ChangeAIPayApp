import { useState } from 'react'
import { Header, BottomNav } from '@/components/Nav'
import { GlassCard, Chip } from '@/components/Card'
import { InsightCard } from '@/components/AI'

interface SpendingInsightsPreviewProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotifications?: () => void
  onSeeFullReport?: () => void
}

type Period = 'week' | 'month'

const WEEKLY_BARS = [
  { day: 'Mon', amount: 0,  max: 80 },
  { day: 'Tue', amount: 0,  max: 80 },
  { day: 'Wed', amount: 0,  max: 80 },
  { day: 'Thu', amount: 0,  max: 80 },
  { day: 'Fri', amount: 0,  max: 80 },
  { day: 'Sat', amount: 0,  max: 80 },
  { day: 'Sun', amount: 0,  max: 80 },
]

const MONTHLY_BARS = [
  { day: 'Wk1', amount: 0, max: 280 },
  { day: 'Wk2', amount: 0, max: 280 },
  { day: 'Wk3', amount: 0, max: 280 },
  { day: 'Wk4', amount: 0, max: 280 },
]

const TOP_CATS: { name: string; pct: number; color: string; delta: number }[] = []

export default function SpendingInsightsPreview({
  accountType = 'personal',
  onNavigate,
  onBack,
  onNotifications,
  onSeeFullReport,
}: SpendingInsightsPreviewProps) {
  const [period, setPeriod] = useState<Period>('week')
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const bars = period === 'week' ? WEEKLY_BARS : MONTHLY_BARS
  const peakIndex = bars.reduce((maxI, b, i, arr) => b.amount > arr[maxI].amount ? i : maxI, 0)

  const weeklyTotal = WEEKLY_BARS.reduce((s, b) => s + b.amount, 0)
  const prevWeekTotal = 0
  const weekDelta = Math.round(((weeklyTotal - prevWeekTotal) / prevWeekTotal) * 100)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={0} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Back + title */}
        <div className="flex items-center gap-2 px-5 pt-3 pb-3">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div>
            <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Spending Insights</h1>
            <p className="font-body text-xs text-text-muted">Quick overview · tap for full report</p>
          </div>
        </div>

        <div className="px-5 flex flex-col gap-4">
          {/* Period toggle */}
          <div className="flex gap-1 p-1 rounded-[--radius-xl]" style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}>
            {(['week','month'] as Period[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="flex-1 h-8 rounded-[--radius-lg] font-body text-xs font-semibold transition-all duration-[250ms] capitalize"
                style={{
                  background: period === p ? 'rgba(0,102,255,0.25)' : 'transparent',
                  color: period === p ? 'white' : 'var(--color-text-muted)',
                  border: period === p ? '1px solid rgba(0,102,255,0.4)' : '1px solid transparent',
                }}
              >
                {p === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>

          {/* Highlight stat */}
          <GlassCard className="flex items-center justify-between">
            <div>
              <p className="font-body text-xs text-text-muted mb-0.5">Total Spent</p>
              <p className="font-display text-3xl font-extrabold text-text tracking-tight">
                ${period === 'week' ? weeklyTotal.toFixed(0) : '0'}
              </p>
              <p className="font-body text-xs text-text-muted mt-0.5">
                vs {period === 'week' ? 'last week' : 'last month'}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Chip
                label={`${weekDelta > 0 ? '+' : ''}${period === 'week' ? weekDelta : 0}%`}
                variant={weekDelta <= 0 ? 'success' : 'error'}
                dot
              />
              <p className="font-body text-[10px] text-text-muted text-right">
                {weekDelta <= 0 ? 'Under budget' : 'Over target'}
              </p>
            </div>
          </GlassCard>

          {/* Bar chart */}
          <GlassCard className="flex flex-col gap-4">
            <div className="flex items-end gap-1.5" style={{ height: 80 }}>
              {bars.map((b, i) => {
                const heightPct = b.amount / b.max
                const isPeak = i === peakIndex
                const isHovered = i === hoveredBar
                return (
                  <div
                    key={i}
                    className="flex-1 flex flex-col items-center gap-1 cursor-pointer"
                    onPointerEnter={() => setHoveredBar(i)}
                    onPointerLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div
                        className="absolute z-10 px-2 py-1 rounded-lg -translate-y-1 animate-fade-in"
                        style={{ background: 'rgba(13,26,74,0.95)', border: '1px solid rgba(175,197,255,0.2)', pointerEvents: 'none' }}
                      >
                        <p className="font-mono text-[10px] text-white">${b.amount}</p>
                      </div>
                    )}
                    <div
                      className="w-full rounded-t-md transition-all duration-[300ms]"
                      style={{
                        height: `${heightPct * 70}px`,
                        background: isPeak
                          ? 'var(--gradient-primary)'
                          : isHovered
                          ? 'rgba(63,231,255,0.4)'
                          : 'rgba(175,197,255,0.14)',
                        boxShadow: isPeak ? '0 0 8px rgba(0,102,255,0.4)' : 'none',
                        borderRadius: 4,
                      }}
                    />
                  </div>
                )
              })}
            </div>
            {/* Day labels */}
            <div className="flex gap-1.5">
              {bars.map((b, i) => (
                <p key={i} className={`flex-1 text-center font-body text-[9px] ${i === peakIndex ? 'text-accent font-semibold' : 'text-text-muted'}`}>
                  {b.day}
                </p>
              ))}
            </div>
            {/* Takeaway */}
            <div className="flex items-center gap-2 pt-1 border-t border-[color:var(--color-border)]">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <p className="font-body text-xs text-text-2 leading-snug">
                {period === 'week'
                  ? <><span className="font-semibold text-text">{bars[peakIndex].day}</span> was your highest spend day — dining out accounted for 64% of it.</>
                  : <><span className="font-semibold text-text">Week 3</span> peaked at $280 — a subscription renewal cluster.</>
                }
              </p>
            </div>
          </GlassCard>

          {/* Category breakdown */}
          <div>
            <p className="font-body text-sm font-semibold text-text mb-2">By Category</p>
            <GlassCard className="flex flex-col gap-3">
              {TOP_CATS.map(cat => (
                <div key={cat.name} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.color }} />
                  <p className="font-body text-xs text-text-2 w-[90px] truncate">{cat.name}</p>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.07)' }}>
                    <div className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${cat.pct}%`, background: cat.color }} />
                  </div>
                  <p className="font-mono text-[10px] text-text-2 w-7 text-right">{cat.pct}%</p>
                  <p className="font-body text-[10px] w-9 text-right"
                    style={{ color: cat.delta < 0 ? '#22C55E' : cat.delta > 0 ? '#FF4D4D' : 'var(--color-text-muted)' }}>
                    {cat.delta === 0 ? '—' : `${cat.delta > 0 ? '+' : ''}${cat.delta}%`}
                  </p>
                </div>
              ))}
            </GlassCard>
          </div>

          {/* AI insight */}
          <InsightCard
            persona="fina"
            title="Fina spotted a pattern"
            body="You spend 40% more on food on Thursdays. Consider meal-prepping mid-week to cut this by ~$25/month."
            action="Show me how"
          />

          {/* See Full Report CTA */}
          <button
            onClick={onSeeFullReport}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] hover:brightness-110"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 11h10M2 7.5h7M2 4h4" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <span className="text-white">See Full Report in AI Assistant</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 6h6M7 4l2 2-2 2" stroke="white" strokeOpacity="0.7" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
