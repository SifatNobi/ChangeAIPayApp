type FailReason = 'ownership' | 'unsupported' | 'mismatch'

interface VerificationFailedProps {
  reason?: FailReason
  bankName?: string
  onRetry?: () => void
  onTryDifferent?: () => void
  onCancel?: () => void
}

const REASONS = {
  ownership: {
    headline: "Couldn't verify account ownership",
    detail: "The credentials you provided couldn't be matched to the account details on file. This can happen if your bank uses multi-factor authentication or if the account is new.",
    suggestion: "Try using your most recent bank login, or switch to manual routing + account number entry.",
  },
  unsupported: {
    headline: "Bank not fully supported",
    detail: "This bank is listed as supported, but your specific account type or region isn't currently available for automated linking.",
    suggestion: "Use manual entry (routing + account number) to link this account instead.",
  },
  mismatch: {
    headline: "Account details didn't match",
    detail: "The account number and routing number you entered don't correspond to a valid account at this institution.",
    suggestion: "Double-check your account number (found on a check or in your bank's app) and the 9-digit routing number.",
  },
}

export default function VerificationFailed({
  reason = 'ownership',
  bankName = 'Chase',
  onRetry,
  onTryDifferent,
  onCancel,
}: VerificationFailedProps) {
  const r = REASONS[reason]

  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 w-full">
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center"
          style={{ background: 'rgba(255,77,90,0.07)', border: '2px solid rgba(255,77,90,0.2)', boxShadow: '0 0 32px rgba(255,77,90,0.08)' }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            <rect x="4" y="10" width="30" height="20" rx="3" stroke="#FF4D5A" strokeWidth="1.4" />
            <path d="M4 18h30" stroke="#FF4D5A" strokeWidth="1.3" />
            <circle cx="28" cy="28" r="7" fill="#050B2D" stroke="#FF4D5A" strokeWidth="1.3" />
            <path d="M25 28h6M28 25v6" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" style={{ transform: 'rotate(45deg)', transformOrigin: '28px 28px' }} />
          </svg>
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">Verification Failed</h1>
          <p className="font-body text-sm text-text-muted">{bankName}</p>
        </div>

        {/* Reason card */}
        <div
          className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(255,77,90,0.05)', border: '1px solid rgba(255,77,90,0.18)' }}
        >
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#FF4D5A" strokeWidth="1" />
              <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#FF4D5A" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="6" cy="8.2" r="0.55" fill="#FF4D5A" />
            </svg>
            <p className="font-body text-xs font-semibold text-error">{r.headline}</p>
          </div>
          <p className="font-body text-sm text-text-2 leading-relaxed">{r.detail}</p>
        </div>

        {/* Suggestion */}
        <div
          className="w-full px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs text-text-muted mb-1">What to try</p>
          <p className="font-body text-sm text-text-2 leading-relaxed">{r.suggestion}</p>
        </div>

        {/* No charge note */}
        <div className="flex items-center gap-2 px-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L1 3v3.8C1 9.7 3 11.5 6 12c3-.5 5-2.3 5-5.2V3L6 1Z"
              stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted">No changes were made to your account. Your balance is unaffected.</p>
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
          Try Again
        </button>
        <button
          onClick={onTryDifferent}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          Try a Different Bank / Method
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
