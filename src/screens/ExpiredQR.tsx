interface ExpiredQRProps {
  senderName?: string
  onRequestFresh?: () => void
  onGoBack?: () => void
}

export default function ExpiredQR({
  senderName = 'Alex Johnson',
  onRequestFresh,
  onGoBack,
}: ExpiredQRProps) {
  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 w-full">
        {/* Icon */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center relative"
          style={{
            background: 'rgba(245,183,0,0.06)',
            border: '2px solid rgba(245,183,0,0.22)',
            boxShadow: '0 0 28px rgba(245,183,0,0.08)',
          }}
        >
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
            {/* Clock */}
            <circle cx="19" cy="19" r="13" stroke="#F5B700" strokeWidth="1.5" />
            <path d="M19 11v8.5l5.5 3" stroke="#F5B700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Small QR marks */}
            <rect x="4" y="4" width="6" height="6" rx="1" stroke="rgba(245,183,0,0.4)" strokeWidth="1" />
            <rect x="28" y="4" width="6" height="6" rx="1" stroke="rgba(245,183,0,0.4)" strokeWidth="1" />
          </svg>
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">
            QR Code Expired
          </h1>
          <p className="font-body text-sm text-text-2 leading-relaxed px-3">
            This payment code is no longer valid. QR codes expire after a short window to keep your account secure.
          </p>
        </div>

        {/* Detail card */}
        <div
          className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.18)' }}
        >
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#F5B700" strokeWidth="1" />
              <line x1="6" y1="3.5" x2="6" y2="6.5" stroke="#F5B700" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="6" cy="8.2" r="0.55" fill="#F5B700" />
            </svg>
            <p className="font-body text-xs font-semibold text-warning">Why do codes expire?</p>
          </div>
          <p className="font-body text-sm text-text-2 leading-relaxed">
            QR codes expire after 15 minutes to prevent replay attacks — someone saving a code screenshot and paying later without your knowledge.
          </p>
        </div>

        {/* What to do */}
        <div
          className="w-full rounded-[--radius-xl] px-4 py-3.5"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs text-text-muted mb-1.5">What to do next</p>
          <p className="font-body text-sm text-text-2">
            Ask <span className="font-semibold text-text">{senderName}</span> to generate a fresh QR code, or send them your handle to pay directly.
          </p>
        </div>

        {/* Safety note */}
        <div className="flex items-center gap-2 px-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L1 3v3.8C1 9.7 3 11.5 6 12c3-.5 5-2.3 5-5.2V3L6 1Z" stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted">No payment was made. Your balance is unchanged.</p>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3 pb-10">
        <button
          onClick={onRequestFresh}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M12 2A5.5 5.5 0 0 0 2 6.5M2 12a5.5 5.5 0 0 0 10-4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M12 2v3H9" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Request a Fresh Code
        </button>
        <button
          onClick={onGoBack}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center transition-all duration-[180ms] active:scale-[0.98]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          Go Back
        </button>
      </div>
    </div>
  )
}
