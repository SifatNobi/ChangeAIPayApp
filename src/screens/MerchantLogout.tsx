import { useState } from 'react'

interface MerchantLogoutProps {
  onConfirm?: () => void
  onCancel?: () => void
  businessName?: string
}

export default function MerchantLogout({ onConfirm, onCancel, businessName = 'Apex Studio LLC' }: MerchantLogoutProps) {
  const [loggingOut, setLoggingOut] = useState(false)

  const handleConfirm = () => {
    setLoggingOut(true)
    setTimeout(() => {
      onConfirm?.()
    }, 1200)
  }

  return (
    <div
      className="flex flex-col items-center justify-center px-6"
      style={{ minHeight: 785, background: 'var(--color-bg)' }}
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-6"
        style={{
          background: 'rgba(175,197,255,0.06)',
          border: '1px solid rgba(175,197,255,0.12)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        }}
      >
        {loggingOut ? (
          <div className="w-9 h-9 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: 'rgba(175,197,255,0.2)', borderTopColor: 'rgba(175,197,255,0.7)' }} />
        ) : (
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M12 10H8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4" stroke="rgba(175,197,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 11l5 5-5 5M25 16H13" stroke="rgba(175,197,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Text */}
      <div className="text-center mb-8">
        <p className="font-display text-xl font-extrabold text-text mb-2">
          {loggingOut ? 'Signing out...' : 'Sign out?'}
        </p>
        <p className="font-body text-sm text-text-muted leading-relaxed max-w-[260px]">
          {loggingOut
            ? "Clearing your session."
            : `You'll be signed out of ${businessName}. Your data is saved and you can sign back in anytime.`}
        </p>
      </div>

      {/* Buttons */}
      {!loggingOut && (
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={handleConfirm}
            className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
            style={{
              background: 'rgba(175,197,255,0.1)',
              border: '1px solid rgba(175,197,255,0.18)',
              color: 'rgba(175,197,255,0.9)',
            }}
          >
            Sign Out
          </button>
          <button
            onClick={onCancel}
            className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            Stay signed in
          </button>
        </div>
      )}
    </div>
  )
}
