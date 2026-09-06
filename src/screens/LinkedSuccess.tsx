import { useState, useEffect } from 'react'

interface LinkedSuccessProps {
  bankName?: string
  bankAbbr?: string
  bankColor?: string
  accountType?: string
  maskedAccount?: string
  onViewDetail?: () => void
  onHome?: () => void
}

export default function LinkedSuccess({
  bankName = 'Chase',
  bankAbbr = 'JP',
  bankColor = '#117ACA',
  accountType = 'Checking',
  maskedAccount = '••••4821',
  onViewDetail,
  onHome,
}: LinkedSuccessProps) {
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setCircleScale(1), 100)
    const t2 = setTimeout(() => setCheckVisible(true), 460)
    const t3 = setTimeout(() => setContentVisible(true), 700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 w-full">
        {/* Success circle — standard system, no Pulse */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-[500ms]"
          style={{
            transform: `scale(${circleScale})`,
            background: 'linear-gradient(135deg, #00AA6C, #22C55E)',
            boxShadow: circleScale === 1
              ? '0 0 0 16px rgba(34,197,94,0.08), 0 0 0 32px rgba(34,197,94,0.04)'
              : 'none',
          }}
        >
          {checkVisible && (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-fade-in">
              <path d="M8 20l8 9 16-18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Title */}
        <div className="text-center flex flex-col gap-1">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">Bank Linked!</h1>
          <p className="font-body text-sm text-text-muted">{bankName} is connected and ready to use</p>
        </div>

        {/* Account card */}
        {contentVisible && (
          <div
            className="w-full rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4 animate-fade-in"
            style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-body font-bold text-white shrink-0"
                style={{ background: bankColor, fontSize: 13, boxShadow: `0 4px 12px ${bankColor}44` }}
              >
                {bankAbbr}
              </div>
              <div className="flex-1">
                <p className="font-body text-base font-semibold text-text">{bankName}</p>
                <p className="font-body text-xs text-text-muted">{accountType} · {maskedAccount}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <p className="font-body text-xs text-success font-semibold">Active</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-2 border-t border-[color:var(--color-border)]">
              {[
                { label: 'Add Money', value: 'Available' },
                { label: 'Withdraw',  value: 'Available' },
                { label: 'Balance sync', value: 'On' },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between">
                  <p className="font-body text-xs text-text-muted">{row.label}</p>
                  <p className="font-body text-xs text-success font-semibold">{row.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's next nudge */}
        {contentVisible && (
          <div
            className="w-full px-4 py-3.5 rounded-[--radius-xl] flex items-center gap-3 animate-fade-in"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1" />
              <line x1="7" y1="5" x2="7" y2="7.5" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="7" cy="9.5" r="0.6" fill="#3FE7FF" />
            </svg>
            <p className="font-body text-xs text-text-2">Add money to your ChangeAIPay wallet instantly, or withdraw funds back to this bank at any time.</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {contentVisible && (
        <div className="w-full flex flex-col gap-3 pb-10 animate-fade-in">
          <button
            onClick={onViewDetail}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            View Linked Account
          </button>
          <button
            onClick={onHome}
            className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center transition-all duration-[180ms] active:scale-[0.97]"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            Back to Home
          </button>
        </div>
      )}
    </div>
  )
}
