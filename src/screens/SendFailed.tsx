interface SendFailedProps {
  reason?: 'insufficient_funds' | 'network_error' | 'recipient_issue' | 'fraud_hold'
  amount?: string
  recipientName?: string
  onRetry?: () => void
  onSupport?: () => void
  onCancel?: () => void
}

const REASONS = {
  insufficient_funds: {
    title: 'Insufficient Funds',
    body: "Your available balance doesn't cover this transfer. Top up your wallet and try again.",
    suggestion: 'Add money to your wallet',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="3" y="8" width="26" height="18" rx="3" stroke="#FF4D4D" strokeWidth="1.5" />
        <path d="M3 14h26" stroke="#FF4D4D" strokeWidth="1.4" />
        <circle cx="22" cy="21" r="3" fill="rgba(255,77,77,0.15)" stroke="#FF4D4D" strokeWidth="1.2" />
        <line x1="22" y1="19.5" x2="22" y2="21" stroke="#FF4D4D" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="22" cy="22.8" r="0.5" fill="#FF4D4D" />
      </svg>
    ),
  },
  network_error: {
    title: 'Network Error',
    body: "We couldn't reach our servers right now. Your payment was not processed and no funds were moved.",
    suggestion: 'Check your connection and retry',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 10C8.5 7.5 12 6 16 6s7.5 1.5 10 4" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
        <path d="M9 14c2-2 4.3-3 7-3s5 1 7 3" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.65" />
        <path d="M12 18c1-1 2.3-1.5 4-1.5s3 .5 4 1.5" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="5" y1="5" x2="27" y2="27" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  recipient_issue: {
    title: 'Recipient Account Issue',
    body: "The recipient's account couldn't accept this payment. This may be a temporary restriction on their end.",
    suggestion: 'Ask them to check their account, or try a different method',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="13" r="5" stroke="#FF4D4D" strokeWidth="1.5" />
        <path d="M6 28c0-5.5 4.5-9 10-9s10 3.5 10 9" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
        <line x1="22" y1="6" x2="28" y2="12" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="28" y1="6" x2="22" y2="12" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  fraud_hold: {
    title: 'Fraud Protection Hold',
    body: "Our fraud detection flagged this transfer for review. This is a precautionary measure to protect your account.",
    suggestion: 'Contact support to verify your identity and release the hold',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 3L4 8v11c0 7 5 12 12 13 7-1 12-6 12-13V8L16 3Z"
          stroke="#FF4D4D" strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="16" y1="11" x2="16" y2="18" stroke="#FF4D4D" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="22" r="1.5" fill="#FF4D4D" />
      </svg>
    ),
  },
}

export default function SendFailed({
  reason = 'network_error',
  amount = '$50.00',
  recipientName = 'Alex Johnson',
  onRetry,
  onSupport,
  onCancel,
}: SendFailedProps) {
  const r = REASONS[reason]

  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 w-full">
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: 'rgba(255,77,77,0.07)',
            border: '2px solid rgba(255,77,77,0.2)',
            boxShadow: '0 0 32px rgba(255,77,77,0.1)',
          }}
        >
          {r.icon}
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">{r.title}</h1>
          <p className="font-body text-sm text-text-2 leading-relaxed px-2">{r.body}</p>
        </div>

        {/* Reassurance */}
        <div
          className="w-full flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="#22C55E" strokeWidth="1.3" />
            <path d="M6.5 10l2.5 2.5 4.5-5" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-sm text-success font-medium">
            Your funds were <span className="font-bold">not deducted</span>. No money left your account.
          </p>
        </div>

        {/* Suggestion */}
        <div
          className="w-full px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs text-text-muted mb-0.5">What to do next</p>
          <p className="font-body text-sm text-text-2">{r.suggestion}</p>
        </div>

        {/* Transfer details */}
        <div className="w-full flex flex-col gap-1.5">
          {[
            { label: 'Attempted amount', value: amount },
            { label: 'Recipient', value: recipientName },
            { label: 'Funds deducted', value: 'No' },
          ].map(d => (
            <div key={d.label} className="flex items-center justify-between px-1">
              <p className="font-body text-xs text-text-muted">{d.label}</p>
              <p className={`font-mono text-xs ${d.label === 'Funds deducted' ? 'text-success' : 'text-text-2'}`}>{d.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3 pb-10">
        {reason !== 'fraud_hold' && (
          <button
            onClick={onRetry}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M11.5 2A5.5 5.5 0 0 0 1.5 6.5M1.5 11A5.5 5.5 0 0 0 11.5 6.5"
                stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M11.5 2v3H8.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Try Again
          </button>
        )}
        <button
          onClick={onSupport}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.98]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          Contact Support
        </button>
        <button
          onClick={onCancel}
          className="w-full h-10 font-body text-sm text-text-muted flex items-center justify-center transition-colors hover:text-text"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
