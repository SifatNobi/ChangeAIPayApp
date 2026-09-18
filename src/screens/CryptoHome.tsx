import { useState } from 'react'
import { BottomNav } from '@/components/Nav'

interface CryptoHomeProps {
  accountType?: 'personal' | 'business'
  onNavigate?: (tab: string) => void
  onBuy?: (asset?: CryptoAsset) => void
  onSell?: (asset?: CryptoAsset) => void
  onBack?: () => void
}

interface CryptoAsset {
  symbol: string
  name: string
  holding: number
  holdingValue: number
  price: number
  change24h: number
  color: string
  colorDim: string
}

const ASSETS: CryptoAsset[] = []

const TOTAL_VALUE = ASSETS.reduce((s, a) => s + a.holdingValue, 0)

// Chart data points — normalised 0-1 within viewport
const CHART_POINTS_1D = [0.42,0.45,0.41,0.38,0.44,0.50,0.48,0.52,0.58,0.55,0.60,0.62,0.65,0.61,0.68,0.72,0.70,0.75,0.71,0.78]
const CHART_POINTS_1W = [0.55,0.48,0.52,0.45,0.60,0.70,0.78]
const CHART_POINTS_1M = [0.30,0.40,0.35,0.50,0.55,0.48,0.60,0.65,0.58,0.72,0.68,0.75,0.70,0.78,0.80,0.75,0.82,0.78,0.85,0.78,0.82,0.88,0.84,0.78,0.85,0.90,0.88,0.82,0.86,0.78]
const CHART_POINTS_1Y = [0.20,0.30,0.25,0.40,0.35,0.48,0.42,0.55,0.60,0.50,0.65,0.78]

const RANGE_DATA: Record<string, { pts: number[]; label: string; change: string; positive: boolean }> = {
  '1D': { pts: CHART_POINTS_1D, label: 'Aug 31',  change: '0.00%', positive: true  },
  '1W': { pts: CHART_POINTS_1W, label: 'Aug 25',  change: '0.00%', positive: true  },
  '1M': { pts: CHART_POINTS_1M, label: 'Aug 1',   change: '0.00%', positive: true  },
  '1Y': { pts: CHART_POINTS_1Y, label: 'Sep 2025',change: '0.00%', positive: true  },
}

const W = 330, H = 110
const PADDING = { t: 12, r: 10, b: 18, l: 10 }

function buildPath(pts: number[]) {
  const cw = W - PADDING.l - PADDING.r
  const ch = H - PADDING.t - PADDING.b
  const xs = pts.map((_, i) => PADDING.l + (i / (pts.length - 1)) * cw)
  const ys = pts.map(v => PADDING.t + (1 - v) * ch)
  let d = `M ${xs[0]} ${ys[0]}`
  for (let i = 1; i < xs.length; i++) {
    const cp = (xs[i] + xs[i - 1]) / 2
    d += ` C ${cp} ${ys[i - 1]}, ${cp} ${ys[i]}, ${xs[i]} ${ys[i]}`
  }
  return { d, xs, ys }
}

function buildAreaPath(pts: number[]) {
  const { d, xs, ys } = buildPath(pts)
  const bottom = PADDING.t + (H - PADDING.t - PADDING.b)
  return `${d} L ${xs[xs.length - 1]} ${bottom} L ${xs[0]} ${bottom} Z`
}

function MiniDot({ symbol, color }: { symbol: string; color: string }) {
  return (
    <div className="w-6 h-6 rounded-full flex items-center justify-center font-body text-[8px] font-bold"
      style={{ background: color, color: '#0b1120' }}>
      {symbol.slice(0, 1)}
    </div>
  )
}

export default function CryptoHome({
  accountType = 'personal',
  onNavigate,
  onBuy,
  onSell,
  onBack,
}: CryptoHomeProps) {
  const [range, setRange] = useState('1D')
  const [selectedAsset, setSelectedAsset] = useState<CryptoAsset | null>(null)

  const rd = RANGE_DATA[range]
  const { d: linePath, xs, ys } = buildPath(rd.pts)
  const areaPath = buildAreaPath(rd.pts)
  const hlIdx = Math.floor(rd.pts.length * 0.72)
  const hlX = xs[hlIdx]
  const hlY = ys[hlIdx]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Crypto</p>
          <p className="font-body text-[10px] text-text-muted">Investing portfolio</p>
        </div>
        <button className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors" aria-label="History">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="6.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" />
            <path d="M9 6v3.5l2.5 2" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Portfolio value */}
        <div className="flex flex-col items-center gap-0.5 py-2">
          <p className="font-body text-xs text-text-muted">Total Portfolio Value</p>
          <p
            className="font-display text-4xl font-extrabold tracking-tighter"
            style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            ${TOTAL_VALUE.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d={rd.positive ? 'M2 7l3-4 3 4' : 'M2 3l3 4 3-4'} stroke={rd.positive ? '#22C55E' : '#FF4D5A'} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-xs font-semibold" style={{ color: rd.positive ? '#22C55E' : '#FF4D5A' }}>
              {rd.change} ({range})
            </p>
          </div>
        </div>

        {/* Chart card */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden relative"
          style={{
            background: 'linear-gradient(160deg, rgba(0,30,80,0.92) 0%, rgba(5,11,45,0.98) 100%)',
            border: '1px solid rgba(0,102,255,0.2)',
            boxShadow: '0 0 40px rgba(0,102,255,0.08)',
          }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 70%, rgba(63,231,255,0.06) 0%, transparent 70%)' }} />

          <div className="px-4 pt-4 pb-2 flex flex-col gap-3 relative">
            {/* Range chips */}
            <div className="flex gap-1.5">
              {Object.keys(RANGE_DATA).map(r => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className="h-7 px-3 rounded-full font-body text-xs font-semibold transition-all duration-[180ms]"
                  style={{
                    background: range === r ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.06)',
                    border: `1px solid ${range === r ? 'rgba(0,102,255,0.5)' : 'rgba(175,197,255,0.12)'}`,
                    color: range === r ? '#AFC5FF' : 'rgba(175,197,255,0.4)',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* SVG chart */}
            <div className="relative" style={{ height: H }}>
              <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ overflow: 'visible' }}>
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3FE7FF" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#3FE7FF" stopOpacity="0.00" />
                  </linearGradient>
                  <filter id="chartGlow">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>

                {/* Area fill */}
                <path d={areaPath} fill="url(#chartGrad)" />

                {/* Glow line */}
                <path d={linePath} stroke="#3FE7FF" strokeWidth="2.5" strokeOpacity="0.25"
                  fill="none" strokeLinecap="round" filter="url(#chartGlow)" />

                {/* Main line */}
                <path d={linePath} stroke="#3FE7FF" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                {/* Vertical indicator from highlighted point */}
                <line x1={hlX} y1={hlY} x2={hlX} y2={H - PADDING.b}
                  stroke="rgba(63,231,255,0.25)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Highlighted data point — glowing dot */}
                <circle cx={hlX} cy={hlY} r="6" fill="rgba(63,231,255,0.15)" />
                <circle cx={hlX} cy={hlY} r="3.5" fill="#0b1120" stroke="#3FE7FF" strokeWidth="1.5" />
                <circle cx={hlX} cy={hlY} r="1.5" fill="#3FE7FF" />

                {/* Floating tooltip */}
                <g transform={`translate(${Math.min(hlX + 8, W - 90)}, ${Math.max(hlY - 34, PADDING.t)})`}>
                  <rect rx="6" ry="6" width="84" height="26" fill="rgba(13,26,74,0.95)" stroke="rgba(63,231,255,0.3)" strokeWidth="0.75" />
                  <text x="8" y="10.5" fontFamily="monospace" fontSize="8.5" fill="#3FE7FF" fontWeight="600">
                    ${(TOTAL_VALUE * 0.88).toFixed(2)}
                  </text>
                  <text x="8" y="20.5" fontFamily="sans-serif" fontSize="7.5" fill="rgba(175,197,255,0.55)">
                    {rd.label}
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Buy / Sell quick actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onBuy?.()}
            className="h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.97]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Buy
          </button>
          <button
            onClick={() => onSell?.()}
            className="h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.97]"
            style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10" stroke="#AFC5FF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Sell
          </button>
        </div>

        {/* Holdings */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Your Holdings</p>
          <div
            className="rounded-[--radius-2xl] overflow-hidden"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
          >
            {ASSETS.map((asset, i) => (
              <button
                key={asset.symbol}
                onClick={() => { setSelectedAsset(asset); onBuy?.(asset) }}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-hi active:bg-surface-hi transition-colors"
                style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
              >
                {/* Asset icon */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-body text-xs font-bold shrink-0"
                  style={{ background: asset.colorDim, border: `1px solid ${asset.color}40` }}
                >
                  <span style={{ color: asset.color }}>{asset.symbol.slice(0, 1)}</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <p className="font-body text-sm font-semibold text-text">{asset.name}</p>
                    {asset.symbol === 'XNO' && (
                      <span className="px-1.5 py-0.5 rounded-full font-body text-[8px] font-bold" style={{ background: 'rgba(63,231,255,0.12)', color: '#3FE7FF' }}>Zero Fee</span>
                    )}
                  </div>
                  <p className="font-body text-xs text-text-muted">
                    {asset.holding} {asset.symbol} · ${asset.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <p className="font-body text-sm font-semibold text-text-2">
                    ${asset.holdingValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <div className="flex items-center gap-0.5">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d={asset.change24h >= 0 ? 'M2 6l2-4 2 4' : 'M2 2l2 4 2-4'} stroke={asset.change24h >= 0 ? '#22C55E' : '#FF4D5A'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="font-body text-xs font-semibold" style={{ color: asset.change24h >= 0 ? '#22C55E' : '#FF4D5A' }}>
                      {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Risk disclosure */}
        <div
          className="flex items-start gap-2.5 px-3.5 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.15)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="mt-0.5 shrink-0">
            <path d="M6.5 1L12 11.5H1L6.5 1Z" stroke="#F5B700" strokeWidth="1.1" strokeLinejoin="round" />
            <path d="M6.5 5v3M6.5 9.2v.3" stroke="#F5B700" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Crypto assets are volatile and can lose value. Your capital is at risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>

      <BottomNav active="home" onChange={onNavigate} accountType={accountType} />
    </div>
  )
}
