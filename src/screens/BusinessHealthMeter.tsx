interface BusinessHealthMeterProps {
  score?: number | null
  revenueScore?: number | null
  cashFlowScore?: number | null
  payoutScore?: number | null
  onBack?: () => void
}

function scoreColor(s: number): string {
  if (s >= 80) return '#22C55E'
  if (s >= 50) return '#F5B700'
  return '#FF4D6A'
}

function scoreBg(s: number): string {
  if (s >= 80) return 'rgba(34,197,94,0.12)'
  if (s >= 50) return 'rgba(245,183,0,0.12)'
  return 'rgba(255,77,106,0.12)'
}

function scoreBorder(s: number): string {
  if (s >= 80) return 'rgba(34,197,94,0.25)'
  if (s >= 50) return 'rgba(245,183,0,0.25)'
  return 'rgba(255,77,106,0.25)'
}

function scoreLabel(s: number): string {
  if (s >= 80) return 'Strong'
  if (s >= 50) return 'Developing'
  return 'Needs Attention'
}

function ArcGauge({ score }: { score: number }) {
  const size = 200
  const cx = 100
  const cy = 108
  const r = 72
  const startAngle = 210
  const endAngle = -30
  const totalDeg = 240

  function polarToXY(deg: number) {
    const rad = (deg * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  const trackStart = polarToXY(startAngle)
  const trackEnd = polarToXY(endAngle)
  const trackPath = `M ${trackStart.x.toFixed(2)},${trackStart.y.toFixed(2)} A ${r} ${r} 0 1 1 ${trackEnd.x.toFixed(2)},${trackEnd.y.toFixed(2)}`

  const fillDeg = startAngle - (score / 100) * totalDeg
  const fillEnd = polarToXY(fillDeg)
  const largeArc = (score / 100) * totalDeg > 180 ? 1 : 0
  const fillPath = `M ${trackStart.x.toFixed(2)},${trackStart.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${fillEnd.x.toFixed(2)},${fillEnd.y.toFixed(2)}`

  const color = scoreColor(score)

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="bhm-arcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <filter id="bhm-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <path d={trackPath} fill="none" stroke="rgba(175,197,255,0.08)" strokeWidth="10" strokeLinecap="round" />
      {score > 0 && (
        <path d={fillPath} fill="none" stroke="url(#bhm-arcGrad)" strokeWidth="10" strokeLinecap="round" filter="url(#bhm-glow)" />
      )}
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Hanken Grotesk', sans-serif" fontSize="40" fontWeight="800" fill={color}>
        {score}
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="11" fill="rgba(175,197,255,0.4)">
        out of 100
      </text>
      <text x={cx} y={cy + 34} textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="600" fill={color}>
        {scoreLabel(score)}
      </text>
    </svg>
  )
}

function FactorCard({ label, value, icon }: { label: string; value: number | null; icon: React.ReactNode }) {
  return (
    <div
      className="rounded-2xl px-4 py-4 flex items-center gap-4"
      style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.09)' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs text-white font-semibold mb-0.5">{label}</p>
        {value === null || value === undefined ? (
          <p className="font-body text-[11px]" style={{ color: 'rgba(175,197,255,0.4)' }}>Not enough data</p>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(175,197,255,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${value}%`, background: scoreColor(value), transition: 'width 0.6s ease' }}
              />
            </div>
            <span className="font-mono text-xs font-bold shrink-0" style={{ color: scoreColor(value) }}>{value}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BusinessHealthMeter({
  score = null,
  revenueScore = null,
  cashFlowScore = null,
  payoutScore = null,
  onBack,
}: BusinessHealthMeterProps) {
  const hasScore = score !== null && score !== undefined

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(0,102,255,0.07) 0%, transparent 70%)' }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="rgba(175,197,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-display text-base font-bold text-white">Business Health Score</h1>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-4">
        {!hasScore ? (
          /* ── Empty state ── */
          <div className="flex-1 flex items-center justify-center">
            <div
              className="w-full rounded-[--radius-2xl] p-8 flex flex-col items-center text-center"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
                style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <circle cx="18" cy="18" r="14" stroke="rgba(175,197,255,0.25)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M18 10v8l4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-display text-lg font-bold text-white mb-2">Not enough data yet</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(175,197,255,0.5)', maxWidth: 260 }}>
                Add transactions, goals, and assets to generate your score.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* ── Gauge ── */}
            <div
              className="rounded-[--radius-2xl] flex flex-col items-center pt-6 pb-4"
              style={{
                background: scoreBg(score as number),
                border: `1.5px solid ${scoreBorder(score as number)}`,
              }}
            >
              <ArcGauge score={score as number} />
            </div>

            {/* ── Factor breakdown ── */}
            <p className="font-body text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: 'rgba(175,197,255,0.4)' }}>
              Score Breakdown
            </p>

            <FactorCard
              label="Revenue Growth"
              value={revenueScore ?? null}
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 14l3.5-5 3 2 3.5-5L16 3" stroke="rgba(175,197,255,0.45)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 3h4v4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <FactorCard
              label="Cash Flow Health"
              value={cashFlowScore ?? null}
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" />
                  <path d="M9 6v3.5l2.5 1.5" stroke="rgba(175,197,255,0.45)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <FactorCard
              label="Payout Reliability"
              value={payoutScore ?? null}
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 9l4 4 8-8" stroke="rgba(175,197,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </>
        )}

        {/* Disclaimer */}
        <div
          className="rounded-[--radius-2xl] px-4 py-3 mt-auto"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.07)' }}
        >
          <p className="font-body text-[10px] text-center leading-relaxed" style={{ color: 'rgba(175,197,255,0.3)' }}>
            Score is computed from your actual app data — never a default or placeholder
          </p>
        </div>
      </div>
    </div>
  )
}
