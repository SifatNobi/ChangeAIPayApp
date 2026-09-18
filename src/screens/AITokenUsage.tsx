import { useState } from 'react'

interface AITokenUsageProps {
  onBack?: () => void
  onBuyTokens?: () => void
  plan?: 'free' | 'edge' | 'prime' | 'apex'
}

const PLAN_ALLOTMENTS: Record<string, number> = {
  free: 10000,
  edge: 50000,
  prime: 200000,
  apex: 500000,
}

const PLAN_LABELS: Record<string, string> = {
  free: 'Free',
  edge: 'Edge',
  prime: 'Prime',
  apex: 'Apex',
}

const PLAN_COLORS: Record<string, string> = {
  free: 'rgba(175,197,255,0.4)',
  edge: '#3FE7FF',
  prime: '#0066FF',
  apex: '#F5B700',
}

function fmtNum(n: number) {
  return n.toLocaleString('en-US')
}

export default function AITokenUsage({ onBack, onBuyTokens, plan = 'free' }: AITokenUsageProps) {
  const [used] = useState(0)
  const [purchased] = useState(0)

  const allotment = PLAN_ALLOTMENTS[plan] ?? 10000
  const pct = allotment > 0 ? Math.min((used / allotment) * 100, 100) : 0
  const planColor = PLAN_COLORS[plan] ?? PLAN_COLORS['free']

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(63,231,255,0.08) 0%, transparent 70%)' }}
      />

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
        <h1 className="font-display text-base font-bold text-white">AI Token Usage</h1>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6">
        <div className="flex items-center gap-2 mb-5">
          <span
            className="h-7 px-3 rounded-full font-body text-xs font-bold flex items-center"
            style={{
              background: planColor + '18',
              border: `1px solid ${planColor}40`,
              color: planColor,
            }}
          >
            {PLAN_LABELS[plan]} Plan
          </span>
        </div>

        <div
          className="rounded-[--radius-2xl] p-5 mb-4"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <div className="flex items-end justify-between mb-3">
            <div>
              <p className="font-body text-xs mb-1" style={{ color: 'rgba(175,197,255,0.5)' }}>Monthly Tokens</p>
              <p className="font-display text-2xl font-extrabold text-white">
                {fmtNum(used)}
                <span className="font-body text-sm font-normal ml-1" style={{ color: 'rgba(175,197,255,0.4)' }}>
                  / {fmtNum(allotment)}
                </span>
              </p>
            </div>
            <p className="font-display text-lg font-bold" style={{ color: pct > 80 ? '#FF4D6A' : '#3FE7FF' }}>
              {Math.round(pct)}%
            </p>
          </div>

          <div
            className="w-full h-3 rounded-full overflow-hidden"
            style={{ background: 'rgba(175,197,255,0.08)' }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: pct > 80
                  ? 'linear-gradient(90deg, #FF4D6A, #FF6B6B)'
                  : 'var(--gradient-primary, linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%))',
                boxShadow: pct > 0 ? '0 0 8px rgba(63,231,255,0.4)' : 'none',
                minWidth: pct > 0 ? 6 : 0,
              }}
            />
          </div>

          <p className="font-body text-xs mt-2" style={{ color: 'rgba(175,197,255,0.4)' }}>
            {fmtNum(allotment - used)} tokens remaining this month
          </p>
        </div>

        <div
          className="rounded-[--radius-2xl] p-4 mb-4 flex items-center justify-between"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
        >
          <div>
            <p className="font-body text-xs font-semibold text-white">Purchased tokens</p>
            <p className="font-display text-xl font-bold mt-0.5" style={{ color: '#F5B700' }}>
              {fmtNum(purchased)}
            </p>
          </div>
          <button
            onClick={onBuyTokens}
            className="h-9 px-4 rounded-full font-body text-xs font-semibold text-white"
            style={{ background: 'rgba(0,102,255,0.25)', border: '1px solid rgba(0,102,255,0.4)' }}
          >
            Buy more
          </button>
        </div>

        <div
          className="rounded-[--radius-2xl] p-4"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
        >
          <p className="font-body text-xs font-semibold mb-3" style={{ color: 'rgba(175,197,255,0.6)' }}>Usage History</p>
          <div className="flex flex-col items-center justify-center py-6 gap-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="20" width="5" height="8" rx="1.5" fill="rgba(175,197,255,0.15)" />
              <rect x="12" y="14" width="5" height="14" rx="1.5" fill="rgba(175,197,255,0.15)" />
              <rect x="20" y="8" width="5" height="20" rx="1.5" fill="rgba(175,197,255,0.15)" />
              <line x1="4" y1="28" x2="28" y2="28" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" />
            </svg>
            <p className="font-body text-xs" style={{ color: 'rgba(175,197,255,0.4)' }}>No usage recorded yet</p>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 mx-5 mb-8 px-4 py-3 rounded-[--radius-2xl]"
        style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
      >
        <p className="font-body text-[11px] text-center leading-relaxed" style={{ color: 'rgba(175,197,255,0.35)' }}>
          Tokens reset on the 1st of each month. Purchased tokens carry over.
        </p>
      </div>
    </div>
  )
}
