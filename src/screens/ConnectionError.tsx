interface ConnectionErrorProps {
  bankName?: string
  errorCode?: string
  onRetry?: () => void
  onSupport?: () => void
  onCancel?: () => void
}

export default function ConnectionError({
  bankName = 'Chase',
  errorCode = 'AGG_TIMEOUT_503',
  onRetry,
  onSupport,
  onCancel,
}: ConnectionErrorProps) {
  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 w-full">
        {/* Icon — network/signal loss */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: 'rgba(175,197,255,0.05)', border: '2px solid rgba(175,197,255,0.18)', boxShadow: '0 0 32px rgba(175,197,255,0.05)' }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M5 13C8.8 9.2 13.6 7 20 7s11.2 2.2 15 6" stroke="rgba(175,197,255,0.25)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M9 18c2.8-2.8 6.5-4.5 11-4.5s8.2 1.7 11 4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M13 23c1.8-1.8 4.2-3 7-3s5.2 1.2 7 3" stroke="rgba(175,197,255,0.6)" strokeWidth="1.8" strokeLinecap="round" />
            {/* Diagonal slash */}
            <path d="M6 6l28 28" stroke="#FF4D5A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">Connection Failed</h1>
          <p className="font-body text-sm text-text-2 leading-relaxed px-3">
            We couldn't reach {bankName}'s systems right now. This is a temporary technical issue — your account details weren't submitted.
          </p>
        </div>

        {/* Distinction card */}
        <div
          className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">What happened</p>
          {[
            { label: 'Your credentials', value: 'Not transmitted or stored' },
            { label: 'Your balance', value: 'Unchanged' },
            { label: 'Issue type', value: 'Aggregator timeout' },
            { label: 'Error code', value: errorCode },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between">
              <p className="font-body text-xs text-text-muted">{row.label}</p>
              <p className={`font-mono text-xs ${row.label === 'Error code' ? 'text-text-muted' : 'text-text-2'}`}>{row.value}</p>
            </div>
          ))}
        </div>

        {/* Try tips */}
        <div
          className="w-full px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs text-text-muted mb-2">Things to try</p>
          {[
            "Wait a few minutes and retry — bank APIs can have brief outages",
            "Try on a different network (Wi-Fi vs. cellular)",
            "If the issue persists, contact support and share the error code",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
              <span className="font-mono text-[10px] text-text-muted shrink-0 mt-0.5">{i + 1}.</span>
              <p className="font-body text-sm text-text-2">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3 pb-10">
        <button
          onClick={onRetry}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M11.5 2A5.5 5.5 0 0 0 1.5 6.5M1.5 11A5.5 5.5 0 0 0 11.5 6.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M11.5 2v3H8.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Retry Connection
        </button>
        <button
          onClick={onSupport}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          Contact Support
        </button>
        <button
          onClick={onCancel}
          className="w-full h-10 font-body text-sm text-text-muted flex items-center justify-center"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
