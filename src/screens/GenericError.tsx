interface GenericErrorProps {
  onRetry?: () => void
  onBack?: () => void
  errorCode?: string
  message?: string
}

export default function GenericError({
  onRetry,
  onBack,
  errorCode,
  message = "Something didn't go as planned. This is on us — please try again.",
}: GenericErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 gap-6" style={{ minHeight: 480 }}>
      {/* Illustration */}
      <div
        className="w-20 h-20 rounded-[24px] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(248,113,113,0.08) 0%, rgba(248,113,113,0.03) 100%)',
          border: '1px solid rgba(248,113,113,0.18)',
          boxShadow: '0 0 24px rgba(248,113,113,0.08)',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="12" stroke="rgba(248,113,113,0.5)" strokeWidth="1.5" />
          <path d="M18 11v9" stroke="rgba(248,113,113,0.7)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="18" cy="24" r="1.2" fill="rgba(248,113,113,0.7)" />
        </svg>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-2 max-w-[270px]">
        <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Something went wrong</p>
        <p className="font-body text-sm text-text-muted leading-relaxed">{message}</p>
        {errorCode && (
          <p className="font-mono text-[10px] mt-1" style={{ color: 'rgba(175,197,255,0.3)' }}>
            Ref: {errorCode}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 w-full max-w-[260px]">
        <button
          onClick={onRetry}
          className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, rgba(248,113,113,0.18) 0%, rgba(248,113,113,0.08) 100%)',
            color: '#F87171',
            border: '1px solid rgba(248,113,113,0.22)',
            boxShadow: '0 4px 14px rgba(248,113,113,0.08)',
          }}
        >
          Try again
        </button>
        {onBack && (
          <button
            onClick={onBack}
            className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{
              background: 'rgba(175,197,255,0.04)',
              color: 'rgba(175,197,255,0.6)',
              border: '1px solid rgba(175,197,255,0.09)',
            }}
          >
            Go back
          </button>
        )}
      </div>
    </div>
  )
}
