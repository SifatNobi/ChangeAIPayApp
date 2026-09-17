interface FinancialHealthMeterProps {
  score?: number | null
  spendingScore?: number | null
  goalScore?: number | null
  netWorthTrend?: 'up' | 'down' | 'flat' | null
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
  if (s >= 80) return 'Healthy'
  if (s >= 50) return 'Fair'
  return 'Needs Attention'
}

function ArcGauge({ score }: { score: number }) {
  const size = 200
  const cx = 100
  const cy = 108
  const r = 72
  // Arc spans from 210° to -30° (240° total)
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
        <linearGradient id="fhm-arcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor={color} />
        </linearGradient>
        <filter id="fhm-glow">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <path d={trackPath} fill="none" stroke="rgba(175,197,255,0.08)" strokeWidth="10" strokeLinecap="round" />
      {/* Fill */}
      {score > 0 && (
        <path d={fillPath} fill="none" stroke="url(#fhm-arcGrad)" strokeWidth="10" strokeLinecap="round" filter="url(#fhm-glow)" />
      )}
      {/* Score number */}
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="'Hanken Grotesk', sans-serif" fontSize="40" fontWeight="800" fill={color}>
        {score}
      </text>
      {/* /100 */}
      <text x={cx} y={cy + 16} textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="11" fill="rgba(175,197,255,0.4)">
        out of 100
      </text>
      {/* Label */}
      <text x={cx} y={cy + 34} textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="600" fill={color}>
        {scoreLabel(score)}
      </text>
    </svg>
  )
}

function FactorCard({ label, value, icon }: { label: string; value: number | null | string; icon: React.ReactNode }) {
  const hasData = value !== null && value !== undefined
  const numVal = typeof value === 'number' ? value : null

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
        {!hasData || numVal === null ? (
          <p className="font-body text-[11px]" style={{ color: 'rgba(175,197,255,0.4)' }}>Not enough data</p>
        ) : (
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(175,197,255,0.08)' }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${numVal}%`, background: scoreColor(numVal), transition: 'width 0.6s ease' }}
              />
            </div>
            <span className="font-mono text-xs font-bold shrink-0" style={{ color: scoreColor(numVal) }}>{numVal}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function TrendFactorCard({ trend }: { trend: 'up' | 'down' | 'flat' | null | undefined }) {
  const color = trend === 'up' ? '#22C55E' : trend === 'down' ? '#FF4D6A' : 'rgba(175,197,255,0.5)'
  const label = trend === 'up' ? 'Trending up' : trend === 'down' ? 'Trending down' : trend === 'flat' ? 'Flat' : null

  return (
    <div
      className="rounded-2xl px-4 py-4 flex items-center gap-4"
      style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.09)' }}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M2 13l4-5 3 2.5 4-6" stroke="rgba(175,197,255,0.45)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="15" cy="4.5" r="2" fill="rgba(175,197,255,0.25)" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-xs text-white font-semibold mb-0.5">Net Worth Trend</p>
        {!trend ? (
          <p className="font-body text-[11px]" style={{ color: 'rgba(175,197,255,0.4)' }}>Not enough data</p>
        ) : (
          <div className="flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              {trend === 'up' && <path d="M2 9L6 3l4 6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />}
              {trend === 'down' && <path d="M2 3L6 9l4-6" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />}
              {trend === 'flat' && <path d="M2 6h8" stroke={color} strokeWidth="1.4" strokeLinecap="round" />}
            </svg>
            <span className="font-body text-[11px] font-semibold" style={{ color }}>{label}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default function FinancialHealthMeter({
  score = null,
  spendingScore = null,
  goalScore = null,
  netWorthTrend = null,
  onBack,
}: FinancialHealthMeterProps) {
  const hasScore = score !== null && score !== undefined

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 45% at 50% 0%, rgba(34,197,94,0.07) 0%, transparent 70%)' }}
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
        <h1 className="font-display text-base font-bold text-white">Financial Health Score</h1>
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
                background: hasScore ? scoreBg(score as number) : 'rgba(175,197,255,0.04)',
                border: `1.5px solid ${hasScore ? scoreBorder(score as number) : 'rgba(175,197,255,0.09)'}`,
              }}
            >
              <ArcGauge score={score as number} />
            </div>

            {/* ── Factor breakdown ── */}
            <p className="font-body text-xs font-semibold uppercase tracking-wider mt-1" style={{ color: 'rgba(175,197,255,0.4)' }}>
              Score Breakdown
            </p>

            <FactorCard
              label="Spending vs. Income"
              value={spendingScore ?? null}
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="5" width="14" height="10" rx="2" stroke="rgba(175,197,255,0.45)" strokeWidth="1.3" />
                  <path d="M2 8h14" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" />
                  <circle cx="12.5" cy="11.5" r="1.5" fill="rgba(175,197,255,0.4)" />
                </svg>
              }
            />

            <FactorCard
              label="Goal Progress"
              value={goalScore ?? null}
              icon={
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" />
                  <circle cx="9" cy="9" r="4" stroke="rgba(175,197,255,0.25)" strokeWidth="1.3" />
                  <circle cx="9" cy="9" r="1.5" fill="rgba(175,197,255,0.5)" />
                </svg>
              }
            />

            <TrendFactorCard trend={netWorthTrend} />
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
