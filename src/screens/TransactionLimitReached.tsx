import { useState } from 'react'

interface TransactionLimitReachedProps {
  usedAmount?: number
  limitAmount?: number
  transferType?: 'off-network' | 'cross-border'
  onContinueWithFee?: () => void
  onUpgrade?: () => void
  onDismiss?: () => void
}

export default function TransactionLimitReached({
  usedAmount = 400,
  limitAmount = 400,
  transferType = 'off-network',
  onContinueWithFee,
  onUpgrade,
  onDismiss,
}: TransactionLimitReachedProps) {
  const [confirmed, setConfirmed] = useState(false)
  const pct = Math.min(100, Math.round((usedAmount / limitAmount) * 100))
  const isCrossBorder = transferType === 'cross-border'
  const feeRate = isCrossBorder ? '1.75%' : '1.5%'
  const feeLabel = isCrossBorder ? 'Cross-border standard fee' : 'Off-network standard fee'
  const exampleAmount = 100
  const feeAmount = isCrossBorder ? '1.75' : '1.50'

  return (
    <div
      className="absolute inset-0 z-50 flex items-end"
      style={{ background: 'rgba(5,11,45,0.85)', backdropFilter: 'blur(12px)' }}
    >
      <div
        className="w-full flex flex-col px-5 pt-6 pb-10 gap-5"
        style={{
          background: 'linear-gradient(180deg, #0D1A4A 0%, #050B2D 100%)',
          borderRadius: '28px 28px 0 0',
          border: '1px solid rgba(175,197,255,0.12)',
          borderBottom: 'none',
        }}
      >
        {/* Drag handle */}
        <div className="mx-auto w-10 h-1 rounded-full -mt-2 mb-1" style={{ background: 'rgba(175,197,255,0.2)' }} />

        {/* Icon */}
        <div className="flex justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1.5px solid rgba(175,197,255,0.14)' }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="2" y="6" width="24" height="16" rx="3" stroke="#AFC5FF" strokeWidth="1.4" />
              <path d="M2 12h24" stroke="#AFC5FF" strokeWidth="1.4" />
              <path d="M6 17h6M18 17h4" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Title + explanation */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="font-display text-xl font-extrabold text-text tracking-tight">
            Free Allowance Used
          </h2>
          <p className="font-body text-sm text-text-2 leading-relaxed px-1">
            You've used your $400/mo free {isCrossBorder ? 'cross-border' : 'off-network'} allowance. You can keep sending — a standard fee applies.
          </p>
        </div>

        {/* Usage bar */}
        <div
          className="rounded-[--radius-xl] p-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div className="flex items-center justify-between">
            <p className="font-body text-xs text-text-muted">Allowance used this month</p>
            <p className="font-mono text-xs font-semibold text-text">{pct}%</p>
          </div>
          <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(175,197,255,0.08)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: pct >= 100 ? 'rgba(175,197,255,0.4)' : 'var(--gradient-primary)' }}
            />
          </div>
          <div className="flex justify-between">
            <p className="font-mono text-sm font-semibold text-text">${usedAmount.toFixed(0)}</p>
            <p className="font-mono text-sm text-text-muted">of ${limitAmount}/mo free</p>
          </div>
          <p className="font-body text-[10px] text-text-muted">Resets September 1, 2026 · In-app transfers remain free</p>
        </div>

        {/* Fee disclosure — prominent, clear */}
        <div
          className="rounded-[--radius-xl] p-4 flex flex-col gap-3"
          style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <p className="font-body text-xs font-semibold text-accent uppercase tracking-wider">{feeLabel}</p>
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-text-2">Fee rate</p>
            <p className="font-mono text-sm font-semibold text-text">{feeRate}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-body text-xs text-text-muted">e.g. on $100</p>
            <p className="font-mono text-xs text-text-muted">${feeAmount} fee</p>
          </div>
          <div
            className="flex items-center gap-2 pt-2 border-t border-[color:var(--color-border)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#AFC5FF" strokeOpacity="0.5" strokeWidth="1" />
              <path d="M6 4v3M6 8.5v.5" stroke="#AFC5FF" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[10px] text-text-muted">
              ChangeAIPay-to-ChangeAIPay transfers are always free, regardless of volume.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          {confirmed ? (
            <div
              className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
              style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)' }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Standard fee applied — continuing</span>
            </div>
          ) : (
            <button
              onClick={() => { setConfirmed(true); setTimeout(() => onContinueWithFee?.(), 900) }}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Continue with {feeRate} fee
            </button>
          )}
          <button
            onClick={onUpgrade}
            className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-colors hover:bg-surface-hi active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.15)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1l1.5 3.5h4l-3 2.5 1 4L6 9l-3.5 2 1-4-3-2.5h4L6 1Z" stroke="#AFC5FF" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            <span className="text-text-2">Upgrade to Edge — higher free allowance</span>
          </button>
          <button
            onClick={onDismiss}
            className="w-full h-10 font-body text-sm text-text-muted flex items-center justify-center transition-colors hover:text-text"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
