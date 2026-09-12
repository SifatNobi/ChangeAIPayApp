import { useState } from 'react'

type Range = '1W' | '1M' | '3M'
type View  = 'category' | 'merchant'

interface SpendingInsightsProps {
  onBack?: () => void
  onOpenBudget?: () => void
}

// Chart helpers
const W = 330, H = 110, PAD = { t: 12, r: 10, b: 22, l: 10 }

function buildPath(pts: number[]) {
  const cw = W - PAD.l - PAD.r
  const ch = H - PAD.t - PAD.b
  const xs = pts.map((_, i) => PAD.l + (i / (pts.length - 1)) * cw)
  const ys = pts.map(v => PAD.t + (1 - v) * ch)
  let d = `M ${xs[0]} ${ys[0]}`
  for (let i = 1; i < xs.length; i++) {
    const cp = (xs[i] + xs[i - 1]) / 2
    d += ` C ${cp} ${ys[i - 1]}, ${cp} ${ys[i]}, ${xs[i]} ${ys[i]}`
  }
  const area = `${d} L ${xs[xs.length - 1]} ${H - PAD.b} L ${xs[0]} ${H - PAD.b} Z`
  return { d, area, xs, ys }
}

const SPENDING_PTS: Record<Range, number[]> = {
  '1W': [0, 0, 0, 0, 0, 0, 0],
  '1M': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  '3M': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
}

const DAY_LABELS:   string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const MONTH_LABELS: string[] = ['Aug 1', 'Aug 8', 'Aug 15', 'Aug 22', 'Aug 29']
const Q_LABELS:     string[] = ['Jun', 'Jul', 'Aug']

const RANGE_LABELS: Record<Range, string[]> = {
  '1W': DAY_LABELS,
  '1M': MONTH_LABELS,
  '3M': Q_LABELS,
}

const RANGE_SPEND: Record<Range, number> = { '1W': 0, '1M': 0, '3M': 0 }
const RANGE_VS: Record<Range, { label: string; pct: number; up: boolean }> = {
  '1W': { label: 'vs prev week',    pct: 0, up: true  },
  '1M': { label: 'vs last month',   pct: 0, up: false },
  '3M': { label: 'vs last quarter', pct: 0, up: true  },
}

const CATEGORIES: { label: string; amount: number; pct: number; color: string; prev: number; flag: boolean }[] = []

const MERCHANTS: { name: string; amount: number; visits: number; category: string; color: string; flag: boolean }[] = []

export default function SpendingInsights({ onBack, onOpenBudget }: SpendingInsightsProps) {
  const [range, setRange] = useState<Range>('1M')
  const [view,  setView]  = useState<View>('category')

  const pts = SPENDING_PTS[range]
  const { d: linePath, area, xs, ys } = buildPath(pts)
  const hlIdx = Math.floor(pts.length * 0.72)
  const hlX = xs[hlIdx], hlY = ys[hlIdx]
  const labels = RANGE_LABELS[range]
  const totalSpend = RANGE_SPEND[range]
  const vs = RANGE_VS[range]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Spending Insights</p>
        <button onClick={onOpenBudget}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold hover:bg-surface-hi transition-all"
          style={{ border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}>
          Budget
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Chart */}
        <div className="rounded-[--radius-2xl] overflow-hidden relative"
          style={{ background: 'linear-gradient(160deg, rgba(0,30,80,0.92) 0%, rgba(5,11,45,0.98) 100%)', border: '1px solid rgba(0,102,255,0.2)', boxShadow: '0 0 30px rgba(0,102,255,0.07)' }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 70%, rgba(245,183,0,0.05) 0%, transparent 70%)' }} />
          <div className="px-4 pt-4 pb-3 flex flex-col gap-3 relative">
            {/* Range chips + total */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-2xl font-extrabold tracking-tighter"
                  style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  ${totalSpend.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d={vs.up ? 'M1 6l2.5-4 3 4' : 'M1 2l2.5 4 3-4'} stroke={vs.up ? '#FF4D5A' : '#22C55E'} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-body text-[10px]" style={{ color: vs.up ? '#FF4D5A' : '#22C55E' }}>
                    {vs.pct}% {vs.label}
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5">
                {(['1W', '1M', '3M'] as Range[]).map(r => (
                  <button key={r} onClick={() => setRange(r)}
                    className="h-6 px-2.5 rounded-full font-body text-[10px] font-semibold transition-all duration-[180ms]"
                    style={{ background: range === r ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.06)', border: `1px solid ${range === r ? 'rgba(0,102,255,0.5)' : 'rgba(175,197,255,0.12)'}`, color: range === r ? '#AFC5FF' : 'rgba(175,197,255,0.4)' }}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            {/* SVG chart */}
            <div style={{ height: H }}>
              <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="siGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5B700" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#F5B700" stopOpacity="0" />
                  </linearGradient>
                  <filter id="siGlow"><feGaussianBlur stdDeviation="2.5" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                </defs>
                <path d={area} fill="url(#siGrad)" />
                <path d={linePath} stroke="#F5B700" strokeWidth="2.5" strokeOpacity="0.25" fill="none" filter="url(#siGlow)" />
                <path d={linePath} stroke="#F5B700" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <line x1={hlX} y1={hlY} x2={hlX} y2={H - PAD.b} stroke="rgba(245,183,0,0.25)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={hlX} cy={hlY} r="6" fill="rgba(245,183,0,0.15)" />
                <circle cx={hlX} cy={hlY} r="3.5" fill="#0b1120" stroke="#F5B700" strokeWidth="1.5" />
                <circle cx={hlX} cy={hlY} r="1.5" fill="#F5B700" />
                <g transform={`translate(${Math.min(hlX - 44, W - 88)}, ${Math.max(hlY - 32, PAD.t)})`}>
                  <rect rx="5" ry="5" width="88" height="24" fill="rgba(13,26,74,0.95)" stroke="rgba(245,183,0,0.4)" strokeWidth="0.75" />
                  <text x="7" y="10" fontFamily="monospace" fontSize="8" fill="#F5B700" fontWeight="600">$0</text>
                  <text x="7" y="19" fontFamily="sans-serif" fontSize="7" fill="rgba(175,197,255,0.5)">Food · 0%</text>
                </g>
                {labels.map((l, i) => (
                  <text key={l} x={xs[Math.round(i * (pts.length - 1) / (labels.length - 1))]} y={H - 4} textAnchor="middle" fontFamily="sans-serif" fontSize="7" fill="rgba(175,197,255,0.25)">{l}</text>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Notable spike callout */}
        <div className="rounded-[--radius-xl] px-4 py-3.5 flex items-start gap-3"
          style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
            <path d="M7 1.5L1 12h12L7 1.5Z" stroke="#FF4D5A" strokeWidth="1" strokeLinejoin="round" />
            <path d="M7 5.5v3.5" stroke="#FF4D5A" strokeWidth="1" strokeLinecap="round" />
            <circle cx="7" cy="10.5" r="0.6" fill="#FF4D5A" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold text-text mb-0.5">Unusual increase: Food &amp; Dining</p>
            <p className="font-body text-[11px] text-text-muted leading-relaxed">
              {""}
            </p>
          </div>
        </div>

        {/* View toggle */}
        <div className="flex gap-2 p-1 rounded-[--radius-xl]" style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
          {(['category', 'merchant'] as View[]).map(v => (
            <button key={v} onClick={() => setView(v)}
              className="flex-1 h-9 rounded-[--radius-lg] font-body text-xs font-semibold capitalize transition-all duration-[180ms]"
              style={{ background: view === v ? 'rgba(0,102,255,0.25)' : 'transparent', border: `1px solid ${view === v ? 'rgba(0,102,255,0.4)' : 'transparent'}`, color: view === v ? '#AFC5FF' : 'rgba(175,197,255,0.4)' }}>
              {v === 'category' ? 'By Category' : 'By Merchant'}
            </button>
          ))}
        </div>

        {/* Category view */}
        {view === 'category' && (
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {CATEGORIES.map((cat, i) => {
              const delta = cat.amount - cat.prev
              return (
                <div key={cat.label} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color, boxShadow: `0 0 5px ${cat.color}80` }} />
                  <p className="font-body text-sm font-semibold text-text flex-1">{cat.label}</p>
                  {cat.flag && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1.5L1 10h10L6 1.5Z" stroke="#FF4D5A" strokeWidth="1" strokeLinejoin="round" />
                      <path d="M6 4.5v2.5" stroke="#FF4D5A" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  )}
                  <div className="flex flex-col items-end gap-0.5">
                    <p className="font-body text-sm font-bold" style={{ color: cat.color }}>${cat.amount}</p>
                    <p className="font-body text-[9px]" style={{ color: delta > 0 ? '#FF4D5A' : '#22C55E' }}>
                      {delta > 0 ? '+' : ''}{delta} vs prev
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Merchant view */}
        {view === 'merchant' && (
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {MERCHANTS.map((m, i) => (
              <div key={m.name} className="flex items-center gap-3 px-4 py-3.5"
                style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-body text-xs font-bold"
                  style={{ background: `${m.color}18`, border: `1px solid ${m.color}30`, color: m.color }}>
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="font-body text-sm font-semibold text-text truncate">{m.name}</p>
                    {m.flag && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1L1 8.5h8L5 1Z" stroke="#FF4D5A" strokeWidth="0.9" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <p className="font-body text-[10px] text-text-muted">{m.category} · {m.visits} visits</p>
                </div>
                <p className="font-body text-sm font-bold" style={{ color: m.color }}>${m.amount}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
