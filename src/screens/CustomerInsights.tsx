import { useState } from 'react'

interface TopCustomer {
  id: string
  initials: string
  name: string
  visits: number
  totalSpent: string
  lastVisit: string
  color: string
}

const TOP_CUSTOMERS: TopCustomer[] = []

const FREQUENCY_BANDS: { label: string; count: number; pct: number; color: string }[] = []

interface CustomerInsightsProps {
  onBack?: () => void
}

export default function CustomerInsights({ onBack }: CustomerInsightsProps) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const repeatPct = 0
  const newPct = 0
  const totalCustomers = 0

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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Customer Insights</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Repeat vs New breakdown card */}
        <div
          className="rounded-[--radius-2xl] px-5 py-5"
          style={{
            background: 'linear-gradient(135deg, rgba(0,20,60,0.97) 0%, rgba(5,15,50,0.99) 100%)',
            border: '1px solid rgba(0,102,255,0.18)',
            boxShadow: '0 0 40px rgba(0,102,255,0.08), 0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-4">
            Customer Breakdown · This Month
          </p>

          <div className="flex items-center gap-6 mb-5">
            {/* Visual ring — SVG donut approximation */}
            <div className="relative shrink-0" style={{ width: 90, height: 90 }}>
              <svg width="90" height="90" viewBox="0 0 90 90">
                <circle cx="45" cy="45" r="36" fill="none" stroke="rgba(175,197,255,0.08)" strokeWidth="10" />
                {/* Repeat arc (68%) */}
                <circle cx="45" cy="45" r="36" fill="none"
                  stroke="#0066FF" strokeWidth="10"
                  strokeDasharray={`${(repeatPct / 100) * 2 * Math.PI * 36} ${2 * Math.PI * 36}`}
                  strokeDashoffset={2 * Math.PI * 36 * 0.25}
                  strokeLinecap="round"
                  style={{ filter: 'drop-shadow(0 0 6px rgba(0,102,255,0.5))' }}
                />
                {/* New arc (32%) */}
                <circle cx="45" cy="45" r="36" fill="none"
                  stroke="rgba(63,231,255,0.4)" strokeWidth="10"
                  strokeDasharray={`${(newPct / 100) * 2 * Math.PI * 36} ${2 * Math.PI * 36}`}
                  strokeDashoffset={-(2 * Math.PI * 36 * (repeatPct / 100 - 0.25))}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-display text-lg font-extrabold text-white leading-none"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                  {totalCustomers}
                </p>
                <p className="font-body text-[9px] text-text-muted">total</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0066FF', boxShadow: '0 0 6px rgba(0,102,255,0.6)' }} />
                  <p className="font-display text-2xl font-extrabold text-white leading-none"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    {repeatPct}%
                  </p>
                </div>
                <p className="font-body text-xs text-text-muted">Repeat customers</p>
                <p className="font-body text-[10px] font-semibold" style={{ color: '#22C55E' }}>↑ 0% vs last month</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(63,231,255,0.6)' }} />
                  <p className="font-display text-lg font-extrabold text-white leading-none"
                    style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                    {newPct}%
                  </p>
                </div>
                <p className="font-body text-xs text-text-muted">New customers</p>
                <p className="font-body text-[10px] text-text-muted">0 first-time buyers</p>
              </div>
            </div>
          </div>

          {/* Avg visits stat */}
          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: '1px solid rgba(175,197,255,0.1)' }}
          >
            <div>
              <p className="font-body text-[10px] text-text-muted">Avg visits per customer</p>
              <p className="font-mono text-base font-bold text-white">0 visits/mo</p>
            </div>
            <div className="text-right">
              <p className="font-body text-[10px] text-text-muted">Retention rate</p>
              <p className="font-mono text-base font-bold" style={{ color: '#22C55E' }}>0%</p>
            </div>
          </div>
        </div>

        {/* Top customers */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Top Customers by Spend</p>
          <div
            className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
          >
            {TOP_CUSTOMERS.map((cust, i) => (
              <button
                key={cust.id}
                onClick={() => setExpanded(expanded === cust.id ? null : cust.id)}
                className="w-full text-left"
                style={{ borderBottom: i < TOP_CUSTOMERS.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
              >
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-bold shrink-0"
                    style={{ background: `${cust.color}18`, color: cust.color, border: `1px solid ${cust.color}35` }}
                  >
                    {cust.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs font-semibold text-text truncate">{cust.name}</p>
                    <p className="font-body text-[10px] text-text-muted">{cust.visits} visits · Last: {cust.lastVisit}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-mono text-xs font-bold text-text">{cust.totalSpent}</p>
                    <svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      className="ml-auto transition-transform"
                      style={{ transform: expanded === cust.id ? 'rotate(90deg)' : 'rotate(0deg)' }}
                    >
                      <path d="M4.5 3l3 3-3 3" stroke="rgba(175,197,255,0.3)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>

                {expanded === cust.id && (
                  <div
                    className="px-4 pb-3"
                    style={{ borderTop: '1px solid rgba(175,197,255,0.06)' }}
                  >
                    <div className="flex gap-3 pt-3">
                      {[
                        { label: 'Avg per visit', value: `$${(parseInt(cust.totalSpent.replace(/\D/g, '')) / cust.visits).toFixed(0)}` },
                        { label: 'Total visits', value: cust.visits.toString() },
                        { label: 'Last purchase', value: cust.lastVisit },
                      ].map(stat => (
                        <div key={stat.label}
                          className="flex-1 px-2 py-2 rounded-[--radius-lg] text-center"
                          style={{ background: `${cust.color}0A`, border: `1px solid ${cust.color}18` }}>
                          <p className="font-mono text-xs font-bold text-text">{stat.value}</p>
                          <p className="font-body text-[9px] text-text-muted">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Customer frequency distribution */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Visit Frequency</p>
          <div
            className="rounded-[--radius-2xl] px-4 py-4"
            style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.09)' }}
          >
            {FREQUENCY_BANDS.map((band, i) => (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{ marginBottom: i < FREQUENCY_BANDS.length - 1 ? 12 : 0 }}
              >
                <p className="font-body text-[10px] text-text-muted w-16 shrink-0">{band.label}</p>
                <div className="flex-1 h-2 rounded-full" style={{ background: 'rgba(175,197,255,0.08)' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${band.pct}%`,
                      background: band.color,
                      boxShadow: band.color !== 'rgba(175,197,255,0.3)' ? `0 0 6px ${band.color}50` : 'none',
                    }}
                  />
                </div>
                <p className="font-mono text-[10px] text-text-muted w-10 text-right shrink-0">{band.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Summary note */}
        <div
          className="flex items-start gap-2.5 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.12)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6" cy="6" r="5" stroke="#3FE7FF" strokeWidth="1" />
            <path d="M6 5v3M6 3.5v.5" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Customer data reflects transactions processed through ChangeAIPay. Names and amounts are visible only to your merchant account.
          </p>
        </div>
      </div>
    </div>
  )
}
