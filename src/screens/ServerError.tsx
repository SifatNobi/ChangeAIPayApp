import { useState } from 'react'
import Button from '@/components/Button'

interface ServerErrorProps {
  errorCode?: string
  onRetry?: () => void
  onSupport?: () => void
}

/* Server/cloud illustration — quiet, not alarming */
function ServerErrorIllustration() {
  return (
    <svg width="160" height="130" viewBox="0 0 160 130" fill="none" aria-hidden="true">
      {/* Background circle */}
      <circle cx="80" cy="68" r="48" fill="rgba(16,28,77,0.8)" stroke="rgba(175,197,255,0.08)" strokeWidth="1" />

      {/* Server rack — 3 units */}
      {[0, 20, 40].map((offset, i) => (
        <g key={i} transform={`translate(52, ${38 + offset})`}>
          <rect width="56" height="14" rx="4" fill="rgba(16,28,77,0.95)" stroke="rgba(175,197,255,0.2)" strokeWidth="1" />
          {/* Status LED */}
          <circle
            cx="8" cy="7" r="3"
            fill={i === 1 ? '#FF4D5A' : 'rgba(0,210,106,0.6)'}
          />
          {/* Drive slots */}
          <rect x="16" y="5" width="8" height="4" rx="1" fill="rgba(175,197,255,0.1)" />
          <rect x="26" y="5" width="8" height="4" rx="1" fill="rgba(175,197,255,0.1)" />
          <rect x="36" y="5" width="8" height="4" rx="1" fill={i === 1 ? 'rgba(255,77,90,0.2)' : 'rgba(175,197,255,0.1)'} />
        </g>
      ))}

      {/* Broken connection line */}
      <line x1="80" y1="108" x2="80" y2="118" stroke="rgba(255,77,90,0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M72 118 Q80 126 88 118" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Warning badge on middle server */}
      <circle cx="112" cy="52" r="10" fill="rgba(255,77,90,0.12)" stroke="rgba(255,77,90,0.3)" strokeWidth="1" />
      <path d="M112 47v5M112 55v1" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />

      {/* Subtle particles */}
      <circle cx="36" cy="44" r="1.5" fill="rgba(175,197,255,0.2)" />
      <circle cx="124" cy="90" r="1" fill="rgba(63,231,255,0.25)" />
    </svg>
  )
}

export default function ServerError({
  errorCode = '503',
  onRetry,
  onSupport,
}: ServerErrorProps) {
  const [retrying, setRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [showError, setShowError] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setShowError(false)
    setRetryCount(c => c + 1)
    setTimeout(() => {
      setRetrying(false)
      // After 2 retries, show a gentle "still trying" message
      if (retryCount >= 1) setShowError(true)
      onRetry?.()
    }, 1800)
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg px-6 py-12">
      <div className="flex flex-col items-center flex-1 justify-center gap-8">

        <ServerErrorIllustration />

        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs text-error/70 bg-error/8 border border-error/15 px-2 py-0.5 rounded-full">
              Error {errorCode}
            </span>
          </div>
          <h1 className="font-display text-2xl font-extrabold text-text">
            Something Went Wrong
          </h1>
          <p className="font-body text-sm text-text-2 max-w-xs leading-relaxed">
            Our servers hit a bump. This is temporary — your account and funds are not affected. Give us a moment to sort this out.
          </p>
        </div>

        {/* Status details */}
        <div className="w-full rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-text-2">Your funds</p>
            <p className="font-body text-sm font-semibold text-success">Safe & secure</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-text-2">Pending transactions</p>
            <p className="font-body text-sm text-text-2">Will process automatically</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-body text-sm text-text-2">Reference</p>
            <p className="font-mono text-xs text-text-muted">ERR-{errorCode}-{Date.now().toString(36).toUpperCase().slice(-6)}</p>
          </div>
        </div>

        {/* Retry feedback */}
        {retrying && (
          <div className="flex items-center gap-2 animate-fade-in">
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-primary border-t-transparent"
              style={{ animation: 'spin 0.9s linear infinite' }}
            />
            <p className="font-body text-xs text-text-2">Reconnecting to our servers…</p>
          </div>
        )}

        {showError && !retrying && (
          <div className="animate-fade-in animate-float-up text-center">
            <p className="font-body text-xs text-text-muted">
              Still not working? Our team is already on it. Contact support and we'll resolve this with you.
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 pt-6">
        <Button
          variant="primary"
          fullWidth
          loading={retrying}
          onClick={handleRetry}
        >
          {retrying ? 'Retrying…' : retryCount > 0 ? 'Try Again' : 'Retry'}
        </Button>
        <Button
          variant="ghost"
          fullWidth
          onClick={onSupport}
        >
          Contact Support
        </Button>
      </div>
    </div>
  )
}
