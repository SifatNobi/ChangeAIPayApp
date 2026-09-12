import { useState, useEffect } from 'react'

interface RetryLoadingProps {
  onRetry?: () => void
  onBack?: () => void
  label?: string
}

export default function RetryLoading({ onRetry, onBack, label = "Loading your data" }: RetryLoadingProps) {
  const [dots, setDots] = useState(1)

  useEffect(() => {
    const id = setInterval(() => setDots(d => (d % 3) + 1), 600)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 gap-6" style={{ minHeight: 480 }}>
      {/* Spinner ring */}
      <div className="relative w-20 h-20 flex items-center justify-center">
        <svg width="80" height="80" viewBox="0 0 80 80" className="absolute inset-0" style={{ animation: 'spin 2s linear infinite' }}>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
          <circle
            cx="40" cy="40" r="34"
            stroke="rgba(175,197,255,0.08)"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="40" cy="40" r="34"
            stroke="rgba(77,159,255,0.5)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="60 154"
            strokeLinecap="round"
          />
        </svg>
        <div
          className="w-12 h-12 rounded-[14px] flex items-center justify-center"
          style={{
            background: 'rgba(0,102,255,0.08)',
            border: '1px solid rgba(0,102,255,0.18)',
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M11 4v4M11 14v4M4 11h4M14 11h4" stroke="rgba(77,159,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="11" cy="11" r="3" stroke="rgba(77,159,255,0.5)" strokeWidth="1.3" />
          </svg>
        </div>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-2 max-w-[260px]">
        <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">
          {label}{"...".slice(0, dots)}
        </p>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          This is taking longer than expected. Your connection may be slow, or our servers might be momentarily busy.
        </p>
      </div>

      {/* Status hint */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-full"
        style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.15)' }}
      >
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#F5B700' }} />
        <p className="font-body text-[11px]" style={{ color: 'rgba(245,183,0,0.8)' }}>Waiting for a response</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 w-full max-w-[260px]">
        <button
          onClick={onRetry}
          className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, rgba(77,159,255,0.18) 0%, rgba(0,102,255,0.08) 100%)',
            color: '#4D9FFF',
            border: '1px solid rgba(0,102,255,0.25)',
          }}
        >
          Retry now
        </button>
        {onBack && (
          <button
            onClick={onBack}
            className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all"
            style={{
              background: 'rgba(175,197,255,0.04)',
              color: 'rgba(175,197,255,0.55)',
              border: '1px solid rgba(175,197,255,0.08)',
            }}
          >
            Go back
          </button>
        )}
      </div>
    </div>
  )
}
