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

type ReportPeriod = 'Monthly' | 'Quarterly'

interface ReportData {
  hero: string
  change: string
  positive: boolean
  secondary: string
  labels: string[]
  values: number[]
  peakLabel: string
  peakValue: string
  generated: string
  aiSummary: string
  metrics: { label: string; value: string; change: string; up: boolean }[]
}

const REPORT_DATA: Record<ReportPeriod, ReportData> = {
  'Monthly': {
    hero: '$0.00',
    change: '+0.0%',
    positive: true,
    secondary: 'Monthly Report · August 2026',
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
    values: [0, 0, 0, 0, 0],
    peakLabel: 'August', peakValue: '$0.00',
    generated: 'Generated Sep 1, 2026',
    aiSummary: '',
    metrics: [
      { label: 'Total revenue', value: '$0', change: '+0.0%', up: true },
      { label: 'Transactions', value: '0', change: '+0', up: true },
      { label: 'Avg transaction', value: '$0', change: '+$0', up: true },
      { label: 'New customers', value: '0', change: '+0', up: true },
    ],
  },
  'Quarterly': {
    hero: '$0.00',
    change: '+0.0%',
    positive: true,
    secondary: 'Quarterly Report · Q3 2026',
    labels: ['Q1', 'Q2', 'Q3'],
    values: [0, 0, 0],
    peakLabel: 'Q3 2026', peakValue: '$0.00',
    generated: 'Generated Sep 1, 2026',
    aiSummary: '',
    metrics: [
      { label: 'Q3 revenue', value: '$0', change: '+0.0%', up: true },
      { label: 'Total transactions', value: '0', change: '+0', up: true },
      { label: 'Avg transaction', value: '$0', change: '+$0', up: true },
      { label: 'New customers', value: '0', change: '+0', up: true },
    ],
  },
}

/* ── Report chart ─────────────────────────────────────────────── */
function ReportChart({ d }: { d: ReportData }) {
  const svgW = 320
  const svgH = 130
  const topPad = 40
  const bottomPad = 22
  const leftPad = 10
  const rightPad = 10
  const chartW = svgW - leftPad - rightPad
  const chartH = svgH - topPad - bottomPad
  const n = d.values.length
  const minV = Math.min(...d.values) * 0.92
  const maxV = Math.max(...d.values)
  const range = maxV - minV || 1

  const pts = d.values.map((v, i) => ({
    x: leftPad + (i / (n - 1)) * chartW,
    y: topPad + chartH - ((v - minV) / range) * chartH,
  }))

  const peakIdx = d.values.indexOf(maxV)
  const peak = pts[peakIdx]
  const linePath = smoothLine(pts)
  const areaPath = linePath + ` L ${pts[n - 1].x.toFixed(1)},${(topPad + chartH).toFixed(1)} L ${pts[0].x.toFixed(1)},${(topPad + chartH).toFixed(1)} Z`

  const tooltipW = 80
  const tooltipH = 30
  const tooltipX = Math.max(2, Math.min(peak.x - tooltipW / 2, svgW - tooltipW - 2))
  const tooltipY = peak.y - tooltipH - 14

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height={svgH} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="rr-areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9945FF" stopOpacity="0.2" />
          <stop offset="80%" stopColor="#9945FF" stopOpacity="0.02" />
        </linearGradient>
        <filter id="rr-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <clipPath id="rr-clip">
          <rect x={leftPad} y={topPad} width={chartW} height={chartH} />
        </clipPath>
      </defs>
      <path d={areaPath} fill="url(#rr-areaGrad)" clipPath="url(#rr-clip)" />
      <path d={linePath} stroke="rgba(153,69,255,0.3)" strokeWidth="1.5" fill="none" clipPath="url(#rr-clip)" />
      <line
        x1={peak.x.toFixed(1)} y1={(peak.y - 7).toFixed(1)}
        x2={peak.x.toFixed(1)} y2={(tooltipY + tooltipH).toFixed(1)}
        stroke="rgba(175,197,255,0.3)" strokeWidth="1" strokeDasharray="3 3"
      />
      <rect x={tooltipX} y={tooltipY} width={tooltipW} height={tooltipH} rx="8"
        fill="rgba(20,10,50,0.97)" stroke="rgba(153,69,255,0.4)" strokeWidth="0.75" />
      <text x={tooltipX + tooltipW / 2} y={tooltipY + 11} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="700" fill="#9945FF">
        {d.peakValue}
      </text>
      <text x={tooltipX + tooltipW / 2} y={tooltipY + 23} textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="8" fill="rgba(175,197,255,0.55)">
        {d.peakLabel}
      </text>
      <g filter="url(#rr-glow)">
        <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="8" fill="rgba(153,69,255,0.2)" />
      </g>
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="5" fill="rgba(153,69,255,0.3)" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="3.5" fill="#9945FF" />
      <circle cx={peak.x.toFixed(1)} cy={peak.y.toFixed(1)} r="1.5" fill="white" />
      {d.labels.map((lbl, i) => (
        <text key={i}
          x={(leftPad + (i / (n - 1)) * chartW).toFixed(1)} y={svgH - 4}
          textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="9"
          fill={i === peakIdx ? 'rgba(153,69,255,0.9)' : 'rgba(175,197,255,0.35)'}>
          {lbl}
        </text>
      ))}
    </svg>
  )
}

/* ── Screen ───────────────────────────────────────────────────── */
interface RevenueReportProps {
  onBack?: () => void
  onExport?: () => void
  onShare?: () => void
  onOpenAina?: () => void
}

export default function RevenueReport({ onBack, onExport, onShare, onOpenAina }: RevenueReportProps) {
  const [period, setPeriod] = useState<ReportPeriod>('Monthly')
  const [exportState, setExportState] = useState<'idle' | 'exporting' | 'done'>('idle')
  const d = REPORT_DATA[period]

  const handleExport = () => {
    setExportState('exporting')
    setTimeout(() => {
      setExportState('done')
      onExport?.()
      setTimeout(() => setExportState('idle'), 2000)
    }, 1400)
  }

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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Revenue Report</p>
        <button onClick={onShare}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="14" cy="4" r="2" stroke="rgba(175,197,255,0.55)" strokeWidth="1.3" />
            <circle cx="4" cy="9" r="2" stroke="rgba(175,197,255,0.55)" strokeWidth="1.3" />
            <circle cx="14" cy="14" r="2" stroke="rgba(175,197,255,0.55)" strokeWidth="1.3" />
            <path d="M6 8l6-3M6 10l6 3" stroke="rgba(175,197,255,0.45)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Period toggle */}
        <div
          className="flex p-1 rounded-[--radius-xl] gap-1"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          {(['Monthly', 'Quarterly'] as ReportPeriod[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className="flex-1 h-8 rounded-[--radius-lg] font-body text-xs font-semibold transition-all"
              style={{
                background: period === p ? 'rgba(153,69,255,0.15)' : 'transparent',
                color: period === p ? '#9945FF' : 'rgba(175,197,255,0.5)',
                border: period === p ? '1px solid rgba(153,69,255,0.3)' : '1px solid transparent',
              }}>
              {p}
            </button>
          ))}
        </div>

        {/* ── Hero chart card ── */}
        <div
          className="rounded-[--radius-2xl] px-5 pt-5 pb-4 relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(20,5,60,0.97) 0%, rgba(10,5,40,0.99) 100%)',
            border: '1px solid rgba(153,69,255,0.2)',
            boxShadow: '0 0 60px rgba(153,69,255,0.1), 0 8px 40px rgba(0,0,0,0.45)',
          }}
        >
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 100%, rgba(153,69,255,0.08) 0%, transparent 70%)' }} />

          <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-2 relative">
            {d.secondary}
          </p>

          <div className="flex items-end gap-3 mb-1 relative">
            <p className="font-display text-4xl font-extrabold text-white leading-none"
              style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
              {d.hero}
            </p>
            <div className="flex items-center gap-1 px-2 py-1 rounded-full mb-1"
              style={{ background: 'rgba(153,69,255,0.12)', border: '1px solid rgba(153,69,255,0.3)' }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 7l3-4 3 4" stroke="#9945FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono text-[11px] font-bold" style={{ color: '#9945FF' }}>{d.change}</span>
            </div>
          </div>

          <p className="font-body text-xs text-text-muted mb-4 relative">{d.generated}</p>

          <ReportChart d={d} />
        </div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-3">
          {d.metrics.map((m, i) => (
            <div key={i} className="px-4 py-3.5 rounded-[--radius-xl]"
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
                  {m.change}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Aina analysis */}
        <div className="rounded-[--radius-2xl] px-4 py-4 flex items-start gap-3"
          style={{
            background: 'linear-gradient(135deg, rgba(20,5,60,0.92) 0%, rgba(13,5,50,0.98) 100%)',
            border: '1px solid rgba(153,69,255,0.22)',
          }}>
          <img src={ainaSrc} alt="Aina"
            className="w-10 h-10 rounded-[13px] object-cover shrink-0"
            style={{ border: '1.5px solid rgba(153,69,255,0.5)', boxShadow: '0 0 12px rgba(153,69,255,0.35)' }} />
          <div className="flex-1">
            <p className="font-body text-[10px] font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#9945FF' }}>
              Aina Analysis
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">{d.aiSummary}</p>
            <button onClick={onOpenAina}
              className="mt-2 font-body text-xs font-semibold"
              style={{ color: 'rgba(153,69,255,0.8)' }}>
              Ask Aina a follow-up →
            </button>
          </div>
        </div>

        {/* Export / Share actions */}
        <div className="flex flex-col gap-3">
          <button onClick={handleExport}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: exportState === 'done' ? 'rgba(34,197,94,0.2)' : exportState === 'exporting' ? 'rgba(0,102,255,0.5)' : 'var(--gradient-primary)',
              border: exportState === 'done' ? '1px solid rgba(34,197,94,0.4)' : 'none',
              color: exportState === 'done' ? '#22C55E' : 'white',
            }}>
            {exportState === 'exporting' ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : exportState === 'done' ? (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7l4 4 6-6" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Report exported
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 3v6M4 7l3 3 3-3M2 11h10" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Export PDF
              </>
            )}
          </button>

          <div className="flex gap-3">
            <button onClick={onShare}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.7)' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="10.5" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
                <circle cx="2.5" cy="6.5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
                <circle cx="10.5" cy="10.5" r="1.5" stroke="currentColor" strokeWidth="1.1" />
                <path d="M4 5.8l5-2.3M4 7.2l5 2.3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
              Share
            </button>
            <button
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.7)' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 10.5l9-9M11 1.5v5M11 1.5H6" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
