import { useState } from 'react'

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

interface CashData {
  net: string
  totalIn: string
  totalOut: string
  netPositive: boolean
  change: string
  labels: string[]
  inValues: number[]
  outValues: number[]
  peakInLabel: string
  peakInValue: string
  secondary: string
}

const CASH_DATA: Record<Period, CashData> = {
  'Week': {
    net: '$0.00', totalIn: '$0.00', totalOut: '$0.00', netPositive: true,
    change: '+0.0%',
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    inValues:  [0, 0, 0, 0, 0, 0, 0],
    outValues: [0, 0, 0, 0, 0, 0, 0],
    peakInLabel: 'Sunday', peakInValue: '$0.00',
    secondary: 'Net cash flow · This week',
  },
  'Month': {
    net: '$0.00', totalIn: '$0.00', totalOut: '$0.00', netPositive: true,
    change: '+0.0%',
    labels: ['W1', 'W2', 'W3', 'W4'],
    inValues:  [0, 0, 0, 0],
    outValues: [0, 0, 0, 0],
    peakInLabel: 'Week 4', peakInValue: '$0.00',
    secondary: 'Net cash flow · August 2026',
  },
  '3M': {
    net: '$0.00', totalIn: '$0.00', totalOut: '$0.00', netPositive: true,
    change: '+0.0%',
    labels: ['Jul', 'Aug', 'Sep'],
    inValues:  [0, 0, 0],
    outValues: [0, 0, 0],
    peakInLabel: 'September', peakInValue: '$0.00',
    secondary: 'Net cash flow · Jul – Sep',
  },
}

function CashChart({ d }: { d: CashData }) {
  const svgW = 320
  const svgH = 140
  const topPad = 44
  const bottomPad = 22
  const leftPad = 10
  const rightPad = 10
  const chartW = svgW - leftPad - rightPad
  const chartH = svgH - topPad - bottomPad

  const n = d.labels.length
  const allVals = [...d.inValues, ...d.outValues]
  const minV = Math.min(...allVals) * 0.9
  const maxV = Math.max(...allVals) * 1.05
  const range = maxV - minV || 1

  const mapY = (v: number) => topPad + chartH - ((v - minV) / range) * chartH

  const inPts  = d.inValues.map((v, i)  => ({ x: leftPad + (i / (n - 1)) * chartW, y: mapY(v) }))
  const outPts = d.outValues.map((v, i) => ({ x: leftPad + (i / (n - 1)) * chartW, y: mapY(v) }))

  const peakInIdx = d.inValues.indexOf(Math.max(...d.inValues))
  const peak = inPts[peakInIdx]

  const inLine  = smoothLine(inPts)
  const outLine = smoothLine(outPts)

  const inArea  = inLine  + ` L ${inPts[n-1].x.toFixed(1)},${(topPad+chartH).toFixed(1)} L ${inPts[0].x.toFixed(1)},${(topPad+chartH).toFixed(1)} Z`
  const outArea = outLine + ` L ${outPts[n-1].x.toFixed(1)},${(topPad+chartH).toFixed(1)} L ${outPts[0].x.toFixed(1)},${(topPad+chartH).toFixed(1)} Z`

  const tooltipW = 80
  const tooltipH = 30
  const tooltipX = Math.max(2, Math.min(peak.x - tooltipW / 2, svgW - tooltipW - 2))
  const tooltipY = peak.y - tooltipH - 14

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height={svgH} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="cf-inGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cf-outGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F87171" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
        </linearGradient>
        <filter id="cf-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="cf-clip">
          <rect x={leftPad} y={topPad} width={chartW} height={chartH} />
        </clipPath>
      </defs>

      {/* Area fills */}
      <path d={outArea} fill="url(#cf-outGrad)" clipPath="url(#cf-clip)" />
      <path d={inArea}  fill="url(#cf-inGrad)"  clipPath="url(#cf-clip)" />

      {/* Lines */}
      <path d={outLine} stroke="rgba(248,113,113,0.3)" strokeWidth="1.5" fill="none" clipPath="url(#cf-clip)" />
      <path d={inLine}  stroke="rgba(34,197,94,0.35)"  strokeWidth="1.5" fill="none" clipPath="url(#cf-clip)" />

      {/* Peak connector */}
      <line
        x1={peak.x.toFixed(1)} y1={(peak.y - 7).toFixed(1)}
        x2={peak.x.toFixed(1)} y2={(tooltipY + tooltipH).toFixed(1)}
        stroke="rgba(63,231,255,0.35)" strokeWidth="1" strokeDasharray="3 3"
      />

      {/* Tooltip */}
      <rect x={tooltipX} y={tooltipY} width={tooltipW} height={tooltipH} rx="8"
        fill="rgba(13,26,74,0.96)" stroke="rgba(34,197,94,0.4)" strokeWidth="0.75" />
      <text x={tooltipX + tooltipW / 2} y={tooltipY + 11} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" fill="#22C55E">
        {d.peakInValue}
      </text>
      <text x={tooltipX + tooltipW / 2} y={tooltipY + 23} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="rgba(175,197,255,0.55)">
        {d.peakInLabel}
      </text>

      {/* Peak glow */}
      <g filter="url(#cf-glow)">
        <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="8" fill="rgba(34,197,94,0.2)" />
      </g>
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="5"   fill="rgba(34,197,94,0.3)" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="3.5" fill="#22C55E" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="1.5" fill="white" />

      {/* X labels */}
      {d.labels.map((lbl, i) => (
        <text key={i}
          x={(leftPad + (i / (n - 1)) * chartW).toFixed(1)} y={svgH - 4}
          textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="9"
          fill={i === peakInIdx ? 'rgba(34,197,94,0.8)' : 'rgba(175,197,255,0.35)'}>
          {lbl}
        </text>
      ))}
    </svg>
  )
}

interface CashFlowProps {
  onBack?: () => void
  onViewPayout?: () => void
}

export default function CashFlow({ onBack, onViewPayout }: CashFlowProps) {
  const [period, setPeriod] = useState<Period>('Week')
  const d = CASH_DATA[period]

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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Cash Flow</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* ── Hero chart card ── */}
        <div
          className="rounded-[--radius-2xl] px-5 pt-5 pb-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,60,0.97) 0%, rgba(5,15,40,0.99) 100%)',
            border: '1px solid rgba(34,197,94,0.15)',
            boxShadow: '0 0 60px rgba(34,197,94,0.08), 0 8px 40px rgba(0,0,0,0.45)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 100%, rgba(34,197,94,0.07) 0%, transparent 70%)' }} />

          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2 relative">
            {d.secondary}
          </p>

          <div className="flex items-end gap-3 mb-1 relative">
            <p className="font-display text-4xl font-extrabold text-white leading-none"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              {d.net}
            </p>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full mb-1"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 7l3-4 3 4" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[11px] font-bold" style={{ color: '#22C55E' }}>{d.change}</span>
            </div>
          </div>

          <p className="font-body text-xs text-text-muted mb-4 relative">
            Net position · money in minus money out
          </p>

          {/* Period toggle */}
          <div className="flex gap-1.5 mb-4 relative">
            {(['Week', 'Month', '3M'] as Period[]).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                className="px-3 h-7 rounded-full font-body text-xs font-semibold transition-all"
                style={{
                  background: period === p ? 'rgba(34,197,94,0.2)' : 'rgba(175,197,255,0.06)',
                  color: period === p ? '#22C55E' : 'rgba(175,197,255,0.45)',
                  border: `1px solid ${period === p ? 'rgba(34,197,94,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}>
                {p}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-3 relative">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded-full" style={{ background: '#22C55E' }} />
              <p className="font-body text-[10px] text-text-muted">Money in</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-1.5 rounded-full" style={{ background: '#F87171' }} />
              <p className="font-body text-[10px] text-text-muted">Money out</p>
            </div>
          </div>

          <CashChart d={d} />
        </div>

        {/* In / Out / Net summary */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Total In', value: d.totalIn, color: '#22C55E', bg: 'rgba(34,197,94,0.06)', border: 'rgba(34,197,94,0.18)' },
            { label: 'Total Out', value: d.totalOut, color: '#F87171', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.18)' },
            { label: 'Net', value: d.net, color: '#3FE7FF', bg: 'rgba(63,231,255,0.06)', border: 'rgba(63,231,255,0.18)' },
          ].map(stat => (
            <div key={stat.label}
              className="px-3 py-3 rounded-[--radius-xl] text-center"
              style={{ background: stat.bg, border: `1px solid ${stat.border}` }}>
              <p className="font-mono text-sm font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="font-body text-[9px] text-text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Per-period breakdown */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Breakdown</p>
          <div
            className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
          >
            {d.labels.map((lbl, i) => {
              const netVal = d.inValues[i] - d.outValues[i]
              return (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < d.labels.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <p className="font-body text-xs text-text-muted w-10 shrink-0">{lbl}</p>
                  <div className="flex-1 flex flex-col gap-1">
                    {/* In bar */}
                    <div className="h-1 rounded-full" style={{ background: 'rgba(34,197,94,0.08)' }}>
                      <div className="h-full rounded-full"
                        style={{
                          width: `${(d.inValues[i] / Math.max(...d.inValues)) * 100}%`,
                          background: 'rgba(34,197,94,0.5)',
                        }} />
                    </div>
                    {/* Out bar */}
                    <div className="h-1 rounded-full" style={{ background: 'rgba(248,113,113,0.08)' }}>
                      <div className="h-full rounded-full"
                        style={{
                          width: `${(d.outValues[i] / Math.max(...d.inValues)) * 100}%`,
                          background: 'rgba(248,113,113,0.45)',
                        }} />
                    </div>
                  </div>
                  <p className="font-mono text-xs font-semibold w-16 text-right shrink-0"
                    style={{ color: netVal >= 0 ? '#22C55E' : '#F87171' }}>
                    +${netVal.toLocaleString()}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Payout context */}
        <button
          onClick={onViewPayout}
          className="flex items-center justify-between px-4 py-4 rounded-[--radius-xl] w-full text-left transition-all active:scale-[0.99]"
          style={{ background: 'rgba(0,102,255,0.05)', border: '1px solid rgba(0,102,255,0.18)' }}
        >
          <div>
            <p className="font-body text-sm font-semibold text-text">Payout Schedule</p>
            <p className="font-body text-xs text-text-muted">
              Next payout: Wed Sep 3 · {d.totalIn} available
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
