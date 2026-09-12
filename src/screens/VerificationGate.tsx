interface VerificationGateProps {
  actionLabel?: string
  onVerify?: () => void
  onDismiss?: () => void
}

export default function VerificationGate({
  actionLabel = 'Send Money',
  onVerify,
  onDismiss,
}: VerificationGateProps) {
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

        {/* Shield illustration */}
        <div className="flex justify-center">
          <div
            className="w-20 h-20 rounded-3xl flex items-center justify-center"
            style={{ background: 'rgba(245,158,11,0.08)', border: '1.5px solid rgba(245,158,11,0.2)' }}
          >
            <svg width="36" height="40" viewBox="0 0 36 40" fill="none">
              <path
                d="M18 2L4 8v13C4 30 9.5 36 18 39c8.5-3 14-9 14-18V8L18 2Z"
                fill="rgba(245,158,11,0.12)"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <line x1="18" y1="14" x2="18" y2="22" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="18" cy="27" r="2" fill="#F59E0B" />
            </svg>
          </div>
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="font-display text-2xl font-extrabold text-text tracking-tight">
            Verification Required
          </h2>
          <p className="font-body text-sm text-text-2 leading-relaxed px-2">
            To <span className="font-semibold text-text">{actionLabel}</span>, we need to confirm your identity. This protects your account and complies with financial regulations.
          </p>
        </div>

        {/* What you'll need */}
        <div
          className="rounded-[--radius-xl] p-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">What you"ll need</p>
          {[
            { icon: '🪪', label: 'Government-issued photo ID' },
            { icon: '🤳', label: 'A short selfie video (15 sec)' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="text-base">{item.icon}</span>
              <p className="font-body text-sm text-text-2">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="flex gap-4">
          {[
            { value: '2 min', label: 'Avg. time' },
            { value: 'AES-256', label: 'Encrypted' },
            { value: 'Auto', label: 'Deleted in 30d' },
          ].map(b => (
            <div key={b.label} className="flex-1 flex flex-col items-center gap-0.5 text-center">
              <p className="font-display text-sm font-bold text-accent">{b.value}</p>
              <p className="font-body text-[10px] text-text-muted">{b.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 mt-1">
          <button
            onClick={onVerify}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 3.3v5C2 11 4 13 7 14c3-1 5-3 5-5.7V3.3L7 1Z"
                stroke="white" strokeWidth="1.2" strokeLinejoin="round" />
              <path d="M4.5 7l2 2 3-3.5" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Complete Verification
          </button>
          <button
            onClick={onDismiss}
            className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-medium text-text-muted flex items-center justify-center transition-colors hover:text-text"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  )
}
