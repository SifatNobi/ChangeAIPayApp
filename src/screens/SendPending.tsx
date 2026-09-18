import { useState } from 'react'

interface SendPendingProps {
  reason?: 'bank_settlement' | 'cross_border_compliance' | 'large_transfer_review'
  recipientName?: string
  amount?: string
  currency?: string
  estimatedTime?: string
  onNotifyToggle?: (enabled: boolean) => void
  onViewReceipt?: () => void
  onDone?: () => void
}

const REASONS = {
  bank_settlement: {
    label: 'Bank settlement time',
    explanation: 'Bank transfers between financial institutions settle in batches. Your payment is queued and will complete during the next settlement window.',
    estimatedDefault: '1–2 business days',
    steps: [
      { label: 'Payment initiated', done: true },
      { label: 'Sent to recipient bank', done: true },
      { label: 'Bank processing', done: false, active: true },
      { label: 'Settlement complete', done: false },
    ],
  },
  cross_border_compliance: {
    label: 'Cross-border compliance check',
    explanation: 'International transfers are reviewed to comply with anti-money laundering regulations. This is a standard check applied to all cross-border payments.',
    estimatedDefault: '1–4 business days',
    steps: [
      { label: 'Payment initiated', done: true },
      { label: 'Compliance screening', done: true },
      { label: 'Regulatory review', done: false, active: true },
      { label: 'Funds released', done: false },
    ],
  },
  large_transfer_review: {
    label: 'First-time large transfer review',
    explanation: "Because this is your first large transfer, our system automatically flags it for a brief security review. This only happens once — future transfers will be faster.",
    estimatedDefault: '2–24 hours',
    steps: [
      { label: 'Payment received', done: true },
      { label: 'Security review', done: false, active: true },
      { label: 'Approval', done: false },
      { label: 'Delivered to recipient', done: false },
    ],
  },
}

export default function SendPending({
  reason = 'bank_settlement',
  recipientName = 'Alex Johnson',
  amount = '$200.00',
  currency = 'GBP',
  estimatedTime,
  onNotifyToggle,
  onViewReceipt,
  onDone,
}: SendPendingProps) {
  const [notifyEnabled, setNotifyEnabled] = useState(true)
  const r = REASONS[reason]
  const eta = estimatedTime ?? r.estimatedDefault

  const handleToggle = () => {
    const next = !notifyEnabled
    setNotifyEnabled(next)
    onNotifyToggle?.(next)
  }

  return (
    <div className="flex flex-col bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col gap-5 pt-12 pb-6">
        {/* Pending icon */}
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
            style={{
              background: 'rgba(245,183,0,0.08)',
              border: '2px solid rgba(245,183,0,0.25)',
              boxShadow: '0 0 32px rgba(245,183,0,0.1)',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="14" stroke="#F5B700" strokeWidth="1.5" />
              <path d="M18 10v8.5l5 3" stroke="#F5B700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {/* Rotating ring */}
            <svg
              width="84" height="84" viewBox="0 0 84 84"
              className="absolute inset-0 -m-0.5"
              style={{ animation: 'spin 3s linear infinite' }}
            >
              <circle cx="42" cy="42" r="40"
                stroke="#F5B700" strokeWidth="1.5" strokeOpacity="0.3" fill="none"
                strokeDasharray="40 212" strokeLinecap="round"
                transform="rotate(-90 42 42)" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">Payment Pending</h1>
          <p className="font-body text-sm text-text-2">
            {amount} to <span className="font-semibold text-text">{recipientName}</span> is on its way
          </p>
        </div>

        {/* Reason card */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl] flex flex-col gap-3"
          style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.18)' }}
        >
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#F5B700" strokeWidth="1" />
              <line x1="6" y1="4" x2="6" y2="6.5" stroke="#F5B700" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="6" cy="8.5" r="0.6" fill="#F5B700" />
            </svg>
            <p className="font-body text-xs font-semibold text-warning">{r.label}</p>
          </div>
          <p className="font-body text-sm text-text-2 leading-relaxed">{r.explanation}</p>
          <div className="flex items-center justify-between pt-2 border-t border-[color:var(--color-border)]">
            <p className="font-body text-xs text-text-muted">Estimated completion</p>
            <p className="font-mono text-xs font-semibold text-text">{eta}</p>
          </div>
        </div>

        {/* Progress steps */}
        <div className="flex flex-col gap-3 px-1">
          {r.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-[300ms]"
                style={{
                  background: step.done
                    ? 'rgba(34,197,94,0.15)'
                    : step.active
                    ? 'rgba(245,183,0,0.12)'
                    : 'rgba(175,197,255,0.05)',
                  border: `1.5px solid ${step.done ? 'rgba(34,197,94,0.4)' : step.active ? 'rgba(245,183,0,0.35)' : 'rgba(175,197,255,0.12)'}`,
                }}
              >
                {step.done ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 3.5-4" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : step.active ? (
                  <div className="w-2 h-2 rounded-full bg-warning" style={{ animation: 'pulse 1.5s ease-in-out infinite' }} />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
                )}
              </div>
              {i < r.steps.length - 1 && (
                <div
                  className="absolute h-3 w-px"
                  style={{
                    background: step.done ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.1)',
                    marginLeft: 13,
                    marginTop: 28,
                  }}
                />
              )}
              <p className={`font-body text-sm ${step.done ? 'text-success' : step.active ? 'text-warning font-semibold' : 'text-text-muted'}`}>
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Notify toggle */}
        <div
          className="flex items-center justify-between px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div className="flex flex-col gap-0.5">
            <p className="font-body text-sm font-semibold text-text">Notify me when done</p>
            <p className="font-body text-xs text-text-muted">Push notification when payment lands</p>
          </div>
          <button
            onClick={handleToggle}
            className="relative w-11 h-6 rounded-full transition-all duration-[250ms] focus-ring"
            style={{
              background: notifyEnabled ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.1)',
              border: `1px solid ${notifyEnabled ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.15)'}`,
            }}
            role="switch"
            aria-checked={notifyEnabled}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-[250ms]"
              style={{ left: notifyEnabled ? 'calc(100% - 22px)' : 2, boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
            />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pb-10">
        <button
          onClick={onViewReceipt}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.98]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          View Receipt
        </button>
        <button
          onClick={onDone}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Done
        </button>
      </div>
    </div>
  )
}
