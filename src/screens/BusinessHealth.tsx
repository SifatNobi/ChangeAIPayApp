import { useState } from 'react'
import ainaSrc from '@/imports/Aina.png.jpeg'

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

type Period = 'Week' | 'Month' | '3M'

interface PeriodData {
  revenue: string
  change: string
  positive: boolean
  labels: string[]
  values: number[]
  peakLabel: string
  peakValue: string
  secondary: string
}

const DATA: Record<Period, PeriodData> = {
  'Week': {
    revenue: '$0.00', change: '+0.0%', positive: true,
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [0, 0, 0, 0, 0, 0, 0],
    peakLabel: 'Sunday', peakValue: '$0.00',
    secondary: 'Revenue trend · This week',
  },
  'Month': {
    revenue: '$0.00', change: '+0.0%', positive: true,
    labels: ['W1', 'W2', 'W3', 'W4'],
    values: [0, 0, 0, 0],
    peakLabel: 'Week 4', peakValue: '$0.00',
    secondary: 'Revenue trend · August 2026',
  },
  '3M': {
    revenue: '$0.00', change: '+0.0%', positive: true,
    labels: ['Jul', 'Aug', 'Sep'],
    values: [0, 0, 0],
    peakLabel: 'September', peakValue: '$0.00',
    secondary: 'Revenue trend · Jul – Sep',
  },
}

function HealthChart({ d, peakIdx }: { d: PeriodData; peakIdx: number }) {
  const svgW = 320
  const svgH = 130
  const topPad = 40
  const bottomPad = 22
  const leftPad = 10
  const rightPad = 10
  const chartW = svgW - leftPad - rightPad
  const chartH = svgH - topPad - bottomPad

  const vals = d.values
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
        <linearGradient id="bh-areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0066FF" stopOpacity="0.25" />
          <stop offset="80%" stopColor="#0066FF" stopOpacity="0.02" />
        </linearGradient>
        <filter id="bh-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="bh-clip">
          <rect x={leftPad} y={topPad} width={chartW} height={chartH} />
        </clipPath>
      </defs>
      <path d={areaPath} fill="url(#bh-areaGrad)" clipPath="url(#bh-clip)" />
      <path d={linePath} stroke="rgba(0,102,255,0.3)" strokeWidth="1.5" fill="none" clipPath="url(#bh-clip)" />
      <line
        x1={peak.x.toFixed(1)} y1={(peak.y - 7).toFixed(1)}
        x2={peak.x.toFixed(1)} y2={(tooltipY + tooltipH).toFixed(1)}
        stroke="rgba(63,231,255,0.35)" strokeWidth="1" strokeDasharray="3 3"
      />
      <rect x={tooltipX} y={tooltipY} width={tooltipW} height={tooltipH} rx="8"
        fill="rgba(13,26,74,0.96)" stroke="rgba(0,102,255,0.4)" strokeWidth="0.75" />
      <text x={tooltipX + tooltipW / 2} y={tooltipY + 11} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" fill="#3FE7FF">
        {d.peakValue}
      </text>
      <text x={tooltipX + tooltipW / 2} y={tooltipY + 23} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="rgba(175,197,255,0.55)">
        {d.peakLabel}
      </text>
      <g filter="url(#bh-glow)">
        <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="8" fill="rgba(0,102,255,0.2)" />
      </g>
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="5" fill="rgba(0,102,255,0.3)" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="3.5" fill="#3FE7FF" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="1.5" fill="white" />
      {d.labels.map((lbl, i) => (
        <text key={i}
          x={(leftPad + (i / (n - 1)) * chartW).toFixed(1)} y={svgH - 4}
          textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="9"
          fill={i === peakIdx ? 'rgba(63,231,255,0.8)' : 'rgba(175,197,255,0.35)'}>
          {lbl}
        </text>
      ))}
    </svg>
  )
}

interface BusinessHealthProps {
  onBack?: () => void
  onViewRevenue?: () => void
}

export default function BusinessHealth({ onBack, onViewRevenue }: BusinessHealthProps) {
  const [period, setPeriod] = useState<Period>('Month')
  const d = DATA[period]
  const peakIdx = d.values.indexOf(Math.max(...d.values))

  const METRICS = [
    { label: 'Avg transaction', value: '$0.00', sub: '+$0 vs last month', up: true },
    { label: 'Repeat customers', value: '0%', sub: '+0% vs last month', up: true },
    { label: 'Active customers', value: '0', sub: '0 new this month', up: true },
    { label: 'Days with revenue', value: '0/30', sub: 'All business days', up: true },
  ]

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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Business Health</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* ── Hero chart card ── */}
        <div
          className="rounded-[--radius-2xl] px-5 pt-5 pb-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,20,60,0.97) 0%, rgba(0,10,40,0.99) 100%)',
            border: '1px solid rgba(0,102,255,0.2)',
            boxShadow: '0 0 60px rgba(0,102,255,0.12), 0 8px 40px rgba(0,0,0,0.45)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(0,102,255,0.1) 0%, transparent 70%)' }} />

          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2 relative">
            {d.secondary}
          </p>

          <div className="flex items-end gap-3 mb-1 relative">
            <p className="font-display text-4xl font-extrabold text-white leading-none"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              {d.revenue}
            </p>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full mb-1"
              style={{
                background: 'rgba(63,231,255,0.1)',
                border: '1px solid rgba(63,231,255,0.25)',
              }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 7l3-4 3 4" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[11px] font-bold" style={{ color: '#3FE7FF' }}>{d.change}</span>
            </div>
          </div>

          {/* One clear takeaway */}
          <div className="flex items-center gap-2 mb-4 relative">
            <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.8)' }} />
            <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>
              {""}
            </p>
          </div>

          {/* Period toggle */}
          <div className="flex gap-1.5 mb-4 relative">
            {(['Week', 'Month', '3M'] as Period[]).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className="px-3 h-7 rounded-full font-body text-xs font-semibold transition-all"
                style={{
                  background: period === p ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.06)',
                  color: period === p ? '#3FE7FF' : 'rgba(175,197,255,0.45)',
                  border: `1px solid ${period === p ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}>
                {p}
              </button>
            ))}
          </div>

          <HealthChart d={d} peakIdx={peakIdx} />
        </div>

        {/* Key metrics — 4 items, 2×2 grid */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Key Metrics</p>
          <div className="grid grid-cols-2 gap-3">
            {METRICS.map(m => (
              <div key={m.label}
                className="px-4 py-3.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                <p className="font-body text-[10px] text-text-muted mb-1">{m.label}</p>
                <p className="font-display text-xl font-extrabold text-text"
                  style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                  {m.value}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d={m.up ? 'M1.5 6.5l2-3 2 3' : 'M1.5 2.5l2 3 2-3'}
                      stroke={m.up ? '#22C55E' : '#F87171'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-body text-[9px]" style={{ color: m.up ? 'rgba(34,197,94,0.7)' : 'rgba(248,113,113,0.7)' }}>
                    {m.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View full revenue breakdown */}
        <button
          onClick={onViewRevenue}
          className="flex items-center justify-between w-full px-4 py-4 rounded-[--radius-xl] transition-all active:scale-[0.99]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div>
            <p className="font-body text-sm font-semibold text-text text-left">Revenue Overview</p>
            <p className="font-body text-xs text-text-muted">Time-period breakdown and trend analysis</p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Aina insight */}
        <div className="rounded-[--radius-2xl] px-4 py-4 flex items-start gap-3"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,80,0.92) 0%, rgba(13,26,74,0.98) 100%)',
            border: '1px solid rgba(0,102,255,0.22)',
          }}>
          <img src={ainaSrc} alt="Aina" className="w-10 h-10 rounded-[13px] object-cover shrink-0"
            style={{ border: '1.5px solid rgba(0,102,255,0.5)', boxShadow: '0 0 12px rgba(0,102,255,0.35)' }} />
          <div className="flex-1">
            <p className="font-body text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#3FE7FF' }}>
              Aina Insight
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              {""}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
