interface InvalidQRProps {
  onTryAgain?: () => void
  onCancel?: () => void
}

export default function InvalidQR({ onTryAgain, onCancel }: InvalidQRProps) {
  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 w-full">
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{
            background: 'rgba(175,197,255,0.05)',
            border: '2px solid rgba(175,197,255,0.18)',
            boxShadow: '0 0 32px rgba(175,197,255,0.06)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            {/* QR outline with slash */}
            <rect x="5" y="5" width="12" height="12" rx="2" stroke="rgba(175,197,255,0.5)" strokeWidth="1.4" />
            <rect x="23" y="5" width="12" height="12" rx="2" stroke="rgba(175,197,255,0.5)" strokeWidth="1.4" />
            <rect x="5" y="23" width="12" height="12" rx="2" stroke="rgba(175,197,255,0.5)" strokeWidth="1.4" />
            <rect x="8" y="8" width="6" height="6" rx="0.5" fill="rgba(175,197,255,0.25)" />
            <rect x="26" y="8" width="6" height="6" rx="0.5" fill="rgba(175,197,255,0.25)" />
            <rect x="8" y="26" width="6" height="6" rx="0.5" fill="rgba(175,197,255,0.25)" />
            <path d="M23 23l12 12M35 23l-12 12" stroke="#FF4D5A" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">
            That code didn't work
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed px-3">
            The QR code you scanned isn't a ChangeAIPay payment code. It may be from a different app or service.
          </p>
        </div>

        {/* What might have happened */}
        <div
          className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Possible reasons</p>
          {[
            'The code belongs to a different payment app',
            "The image was blurry or partially obscured",
            "The code may have been printed incorrectly",
          ].map((reason, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-text-muted shrink-0 mt-1.5" />
              <p className="font-body text-sm text-text-2">{reason}</p>
            </div>
          ))}
        </div>

        {/* No shame note */}
        <div className="flex items-center gap-2 px-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" />
            <line x1="6" y1="4" x2="6" y2="6.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
            <circle cx="6" cy="8.2" r="0.55" fill="rgba(175,197,255,0.4)" />
          </svg>
          <p className="font-body text-[10px] text-text-muted">No payment was attempted. Your balance is unchanged.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3 pb-10">
        <button
          onClick={onTryAgain}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 4V2a1 1 0 0 1 1-1h2M10 1h2a1 1 0 0 1 1 1v2M13 10v2a1 1 0 0 1-1 1h-2M4 13H2a1 1 0 0 1-1-1v-2" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="7" cy="7" r="2.5" stroke="white" strokeWidth="1.2" />
          </svg>
          Try Scanning Again
        </button>
        <button
          onClick={onCancel}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center transition-all duration-[180ms] active:scale-[0.98]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
