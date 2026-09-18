import { useState } from 'react'

/* ── Smooth Catmull-Rom → cubic bezier ─────────────────────────── */
function smoothLine(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`
  }
  return d
}

type Period = '24h' | 'Week' | 'Month' | '3M' | 'Year'

const PERIODS: Period[] = ['24h', 'Week', 'Month', '3M', 'Year']

interface PeriodData {
  total: string
  totalRaw: number
  change: string
  positive: boolean
  labels: string[]
  values: number[]
  peakLabel: string
  peakValue: string
  avgLabel: string
  avgValue: string
  bestLabel: string
}

const PERIOD_DATA: Record<Period, PeriodData> = {
  '24h': {
    total: '$0.00', totalRaw: 0,
    change: '+0.0%', positive: true,
    labels: ['6a', '8a', '10a', '12p', '2p', '4p', '6p', '8p'],
    values: [0, 0, 0, 0, 0, 0, 0, 0],
    peakLabel: '12:00 PM', peakValue: '$0.00',
    avgLabel: '$0/hr', avgValue: '$0 avg/hr',
    bestLabel: 'Best hour: —',
  },
  'Week': {
    total: '$0.00', totalRaw: 0,
    change: '+0.0%', positive: true,
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [0, 0, 0, 0, 0, 0, 0],
    peakLabel: '—', peakValue: '$0.00',
    avgLabel: '$0/day', avgValue: '$0 avg/day',
    bestLabel: 'Best day: —',
  },
  'Month': {
    total: '$0.00', totalRaw: 0,
    change: '+0.0%', positive: true,
    labels: ['W1', 'W2', 'W3', 'W4'],
    values: [0, 0, 0, 0],
    peakLabel: '—', peakValue: '$0.00',
    avgLabel: '$0/wk', avgValue: '$0 avg/wk',
    bestLabel: 'Best week: —',
  },
  '3M': {
    total: '$0.00', totalRaw: 0,
    change: '+0.0%', positive: true,
    labels: ['Jul', 'Aug', 'Sep'],
    values: [0, 0, 0],
    peakLabel: '—', peakValue: '$0.00',
    avgLabel: '$0/mo', avgValue: '$0 avg/mo',
    bestLabel: 'Best month: —',
  },
  'Year': {
    total: '$0.00', totalRaw: 0,
    change: '+0.0%', positive: true,
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    values: [0, 0, 0, 0],
    peakLabel: '—', peakValue: '$0.00',
    avgLabel: '$0/qtr', avgValue: '$0 avg/qtr',
    bestLabel: 'Best quarter: —',
  },
}

/* ── RevenueChart ─────────────────────────────────────────────── */
function RevenueChart({ data, peakIdx }: { data: PeriodData; peakIdx: number }) {
  const svgW = 320
  const svgH = 130
  const topPad = 40
  const bottomPad = 22
  const leftPad = 10
  const rightPad = 10
  const chartW = svgW - leftPad - rightPad
  const chartH = svgH - topPad - bottomPad

  const vals = data.values
  const n = vals.length
  const minV = Math.min(...vals)
  const maxV = Math.max(...vals)
  const range = maxV - minV || 1

  const pts = vals.map((v, i) => ({
    x: leftPad + (i / (n - 1)) * chartW,
    y: topPad + chartH - ((v - minV) / range) * chartH,
  }))

  const peak = pts[peakIdx]
  const linePath = smoothLine(pts)
  const areaPath = linePath + ` L ${pts[n - 1].x.toFixed(1)},${(topPad + chartH).toFixed(1)} L ${pts[0].x.toFixed(1)},${(topPad + chartH).toFixed(1)} Z`

  const tooltipW = 78
  const tooltipH = 30
  const tooltipX = Math.max(2, Math.min(peak.x - tooltipW / 2, svgW - tooltipW - 2))
  const tooltipY = peak.y - tooltipH - 14

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height={svgH} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ro-areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.22" />
          <stop offset="80%" stopColor="#22C55E" stopOpacity="0.02" />
        </linearGradient>
        <filter id="ro-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="ro-clip">
          <rect x={leftPad} y={topPad} width={chartW} height={chartH} />
        </clipPath>
      </defs>

      {/* Area fill */}
      <path d={areaPath} fill="url(#ro-areaGrad)" clipPath="url(#ro-clip)" />

      {/* Muted baseline line */}
      <path d={linePath} stroke="rgba(34,197,94,0.25)" strokeWidth="1.5" fill="none" clipPath="url(#ro-clip)" />

      {/* Connector dashed line */}
      <line
        x1={peak.x.toFixed(1)} y1={(peak.y - 7).toFixed(1)}
        x2={peak.x.toFixed(1)} y2={(tooltipY + tooltipH).toFixed(1)}
        stroke="rgba(63,231,255,0.35)" strokeWidth="1" strokeDasharray="3 3"
      />

      {/* Tooltip box */}
      <rect
        x={tooltipX} y={tooltipY}
        width={tooltipW} height={tooltipH}
        rx="8"
        fill="rgba(13,26,74,0.96)"
        stroke="rgba(34,197,94,0.4)"
        strokeWidth="0.75"
      />
      <text
        x={tooltipX + tooltipW / 2} y={tooltipY + 11}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="11" fontWeight="700" fill="#22C55E"
      >
        {data.peakValue}
      </text>
      <text
        x={tooltipX + tooltipW / 2} y={tooltipY + 23}
        textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace"
        fontSize="8" fill="rgba(175,197,255,0.55)"
      >
        {data.peakLabel}
      </text>

      {/* Peak glow rings */}
      <g filter="url(#ro-glow)">
        <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="8" fill="rgba(34,197,94,0.15)" />
      </g>
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="5" fill="rgba(34,197,94,0.25)" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="3.5" fill="#22C55E" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="1.5" fill="white" />

      {/* X-axis labels */}
      {data.labels.map((lbl, i) => (
        <text
          key={i}
          x={(leftPad + (i / (n - 1)) * chartW).toFixed(1)}
          y={svgH - 4}
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="9"
          fill={i === peakIdx ? 'rgba(34,197,94,0.8)' : 'rgba(175,197,255,0.35)'}
        >
          {lbl}
        </text>
      ))}
    </svg>
  )
}

/* ── Screen ───────────────────────────────────────────────────── */
interface RevenueOverviewProps {
  onBack?: () => void
}

export default function RevenueOverview({ onBack }: RevenueOverviewProps) {
  const [period, setPeriod] = useState<Period>('Week')
  const d = PERIOD_DATA[period]
  const peakIdx = d.values.indexOf(Math.max(...d.values))

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Revenue</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* ── Hero chart card ── */}
        <div
          className="rounded-[--radius-2xl] px-5 pt-5 pb-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,40,80,0.97) 0%, rgba(10,26,60,0.99) 100%)',
            border: '1px solid rgba(34,197,94,0.18)',
            boxShadow: '0 0 60px rgba(34,197,94,0.12), 0 8px 40px rgba(0,0,0,0.45)',
          }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(34,197,94,0.08) 0%, transparent 70%)',
            }}
          />

          {/* Secondary summary line */}
          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2 relative">
            Total Revenue · {period === '24h' ? 'Today' : period === 'Week' ? 'This Week' : period === 'Month' ? 'This Month' : period === '3M' ? 'Last 3 Months' : 'This Year'}
          </p>

          {/* Hero figure */}
          <div className="flex items-end gap-3 mb-1 relative">
            <p
              className="font-display text-4xl font-extrabold text-white leading-none"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
            >
              {d.total}
            </p>
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full mb-1"
              style={{
                background: d.positive ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                border: `1px solid ${d.positive ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d={d.positive ? 'M2 7l3-4 3 4' : 'M2 3l3 4 3-4'}
                  stroke={d.positive ? '#22C55E' : '#F87171'}
                  strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <span
                className="font-mono text-[11px] font-bold"
                style={{ color: d.positive ? '#22C55E' : '#F87171' }}
              >
                {d.change}
              </span>
            </div>
          </div>

          {/* Period avg summary */}
          <p className="font-body text-xs text-text-muted mb-4 relative">
            {d.avgValue} · {d.bestLabel}
          </p>

          {/* Time period toggle */}
          <div className="flex gap-1.5 mb-4 relative">
            {PERIODS.map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="px-3 h-7 rounded-full font-body text-xs font-semibold transition-all"
                style={{
                  background: period === p ? 'rgba(34,197,94,0.2)' : 'rgba(175,197,255,0.06)',
                  color: period === p ? '#22C55E' : 'rgba(175,197,255,0.45)',
                  border: `1px solid ${period === p ? 'rgba(34,197,94,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="relative">
            <RevenueChart data={d} peakIdx={peakIdx} />
          </div>
        </div>

        {/* Period stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Total transactions', value: '0' },
            { label: 'Avg transaction', value: '$0' },
            { label: 'vs prior period', value: d.change, accent: d.positive ? '#22C55E' : '#F87171' },
            { label: 'Projected', value: '$0' },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              <p className="font-body text-[10px] text-text-muted mb-1">{stat.label}</p>
              <p
                className="font-mono text-base font-bold"
                style={{ color: stat.accent ?? 'var(--color-text)' }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Top days / breakdown */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Revenue Breakdown</p>
          <div
            className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
          >
            {d.labels.map((lbl, i) => {
              const val = d.values[i]
              const maxVal = Math.max(...d.values)
              const pct = (val / maxVal) * 100
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ borderBottom: i < d.labels.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
                >
                  <p className="font-body text-xs text-text-muted w-10 shrink-0">{lbl}</p>
                  <div className="flex-1 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.08)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${pct}%`,
                        background: i === peakIdx ? '#22C55E' : 'rgba(34,197,94,0.3)',
                        boxShadow: i === peakIdx ? '0 0 6px rgba(34,197,94,0.5)' : 'none',
                      }}
                    />
                  </div>
                  <p
                    className="font-mono text-xs font-semibold w-16 text-right shrink-0"
                    style={{ color: i === peakIdx ? '#22C55E' : 'rgba(175,197,255,0.6)' }}
                  >
                    ${val.toLocaleString()}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
