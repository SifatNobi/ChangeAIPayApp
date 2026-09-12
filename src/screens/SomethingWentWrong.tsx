interface SomethingWentWrongProps {
  onRetry?: () => void
  onContactSupport?: () => void
  onHome?: () => void
  errorId?: string
}

export default function SomethingWentWrong({ onRetry, onContactSupport, onHome, errorId }: SomethingWentWrongProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 gap-7">

        {/* Illustration */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-24 h-24 rounded-[28px] flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(153,69,255,0.1) 0%, rgba(248,113,113,0.06) 100%)',
              border: '1px solid rgba(153,69,255,0.2)',
              boxShadow: '0 0 40px rgba(153,69,255,0.12)',
            }}
          >
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <path
                d="M22 6L4 36h36L22 6z"
                stroke="rgba(153,69,255,0.55)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path d="M22 18v9" stroke="rgba(153,69,255,0.7)" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="22" cy="31" r="1.4" fill="rgba(153,69,255,0.7)" />
            </svg>
          </div>
          <div
            className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full font-mono text-[9px] font-bold"
            style={{ background: 'rgba(248,113,113,0.1)', color: '#F87171', border: '1px solid rgba(248,113,113,0.2)' }}
          >
            ERR
          </div>
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2 max-w-[270px]">
          <p className="font-display text-xl font-extrabold text-text tracking-tight">
            Something went wrong
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            An unexpected error occurred. Your data is safe. If this keeps happening, our support team can help.
          </p>
          {errorId && (
            <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(175,197,255,0.25)' }}>
              Error ID: {errorId}
            </p>
          )}
        </div>

        {/* Reassurance strip */}
        <div
          className="w-full max-w-[300px] px-4 py-3 rounded-[--radius-xl] flex items-center gap-3"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(34,197,94,0.1)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2a2.5 2.5 0 010 5A2.5 2.5 0 017 2z" stroke="#22C55E" strokeWidth="1.2" />
              <path d="M2 12c0-3 2-4 5-4s5 1 5 4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-body text-[11px] text-text-muted leading-snug">
            Your account and balance are unaffected by this error.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full max-w-[300px]">
          {onRetry && (
            <button
              onClick={onRetry}
              className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
              style={{
                background: 'linear-gradient(135deg, rgba(153,69,255,0.2) 0%, rgba(153,69,255,0.08) 100%)',
                color: '#9945FF',
                border: '1px solid rgba(153,69,255,0.25)',
                boxShadow: '0 4px 14px rgba(153,69,255,0.1)',
              }}
            >
              Try again
            </button>
          )}
          <button
            onClick={onContactSupport}
            className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{
              background: 'rgba(175,197,255,0.05)',
              color: 'rgba(175,197,255,0.7)',
              border: '1px solid rgba(175,197,255,0.12)',
            }}
          >
            Contact support
          </button>
          {onHome && (
            <button
              onClick={onHome}
              className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
              style={{
                background: 'transparent',
                color: 'rgba(175,197,255,0.45)',
                border: '1px solid rgba(175,197,255,0.07)',
              }}
            >
              Back to Home
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
