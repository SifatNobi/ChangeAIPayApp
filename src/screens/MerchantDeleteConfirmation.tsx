import { useState } from 'react'

type AuthMethod = 'pin' | 'biometric'
type ConfirmState = 'idle' | 'authenticating' | 'deleting' | 'error'

interface MerchantDeleteConfirmationProps {
  onBack?: () => void
  onDeleted?: () => void
  businessName?: string
}

export default function MerchantDeleteConfirmation({
  onBack,
  onDeleted,
  businessName = 'Apex Studio LLC',
}: MerchantDeleteConfirmationProps) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>('pin')
  const [pin, setPin] = useState('')
  const [confirmState, setConfirmState] = useState<ConfirmState>('idle')
  const [biometricSent, setBiometricSent] = useState(false)

  const handlePinDigit = (d: string) => {
    if (pin.length >= 6) return
    const next = pin + d
    setPin(next)
    if (next.length === 6) {
      setTimeout(() => triggerDelete(), 300)
    }
  }

  const handleBiometric = () => {
    setBiometricSent(true)
    setConfirmState('authenticating')
    setTimeout(() => triggerDelete(), 1600)
  }

  const triggerDelete = () => {
    setConfirmState('deleting')
    setTimeout(() => {
      onDeleted?.()
    }, 2200)
  }

  const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} disabled={confirmState === 'deleting'}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Confirm Deletion</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-6" style={{ scrollbarWidth: 'none' }}>

        {/* Final warning */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl] text-center"
          style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.18)' }}
        >
          <div className="w-14 h-14 rounded-[18px] flex items-center justify-center mx-auto mb-3"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#F87171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10 11v5M14 11v5" stroke="#F87171" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-body text-sm font-bold text-text mb-1">This cannot be undone</p>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            You are permanently deleting <span className="text-text font-semibold">{businessName}</span>.
            All data and access will be removed.
          </p>
        </div>

        {/* Auth method toggle */}
        {confirmState === 'idle' && (
          <>
            <div className="flex gap-2">
              {(['pin', 'biometric'] as AuthMethod[]).map(m => (
                <button key={m} onClick={() => setAuthMethod(m)}
                  className="flex-1 h-10 rounded-full font-body text-xs font-semibold transition-all"
                  style={{
                    background: authMethod === m ? 'rgba(239,68,68,0.1)' : 'rgba(175,197,255,0.04)',
                    color: authMethod === m ? '#F87171' : 'rgba(175,197,255,0.4)',
                    border: `1px solid ${authMethod === m ? 'rgba(239,68,68,0.25)' : 'rgba(175,197,255,0.09)'}`,
                  }}>
                  {m === 'pin' ? 'Enter PIN' : 'Use Biometrics'}
                </button>
              ))}
            </div>

            {authMethod === 'pin' && (
              <>
                {/* PIN dots */}
                <div className="flex justify-center gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i}
                      className="w-3.5 h-3.5 rounded-full transition-all"
                      style={{
                        background: i < pin.length ? '#F87171' : 'rgba(175,197,255,0.15)',
                        boxShadow: i < pin.length ? '0 0 8px rgba(239,68,68,0.5)' : 'none',
                        transform: i < pin.length ? 'scale(1.15)' : 'scale(1)',
                      }}
                    />
                  ))}
                </div>

                <p className="font-body text-xs text-center text-text-muted">Enter your 6-digit PIN to confirm deletion</p>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3 px-6">
                  {KEYPAD.map((key, i) => (
                    <button key={i}
                      disabled={!key}
                      onClick={() => {
                        if (key === '⌫') setPin(p => p.slice(0, -1))
                        else if (key) handlePinDigit(key)
                      }}
                      className="h-14 rounded-[--radius-xl] font-display text-lg font-bold transition-all active:scale-95"
                      style={{
                        background: key ? 'rgba(175,197,255,0.05)' : 'transparent',
                        color: key === '⌫' ? 'rgba(175,197,255,0.5)' : 'var(--color-text)',
                        border: key ? '1px solid rgba(175,197,255,0.09)' : 'none',
                      }}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </>
            )}

            {authMethod === 'biometric' && (
              <div className="flex flex-col items-center gap-4 py-4">
                <button
                  onClick={handleBiometric}
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-95"
                  style={{
                    background: 'rgba(239,68,68,0.08)',
                    border: '2px solid rgba(239,68,68,0.25)',
                    boxShadow: '0 0 30px rgba(239,68,68,0.1)',
                  }}>
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M18 8C12.477 8 8 12.477 8 18s4.477 10 10 10 10-4.477 10-10S23.523 8 18 8z" stroke="#F87171" strokeWidth="1.5" />
                    <path d="M13 18c0-2.761 2.239-5 5-5s5 2.239 5 5" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="2" fill="#F87171" />
                    <path d="M10 14C8.343 15.657 8 16.779 8 18M26 14c1.657 1.657 2 2.779 2 4" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
                <p className="font-body text-xs text-text-muted text-center">
                  Tap to use Face ID to confirm the permanent deletion of <span className="text-text">{businessName}</span>.
                </p>
              </div>
            )}
          </>
        )}

        {/* Authenticating */}
        {confirmState === 'authenticating' && (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.2)' }}>
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: 'rgba(239,68,68,0.3)', borderTopColor: '#F87171' }} />
            </div>
            <p className="font-body text-sm text-text-muted">Verifying identity...</p>
          </div>
        )}

        {/* Deleting */}
        {confirmState === 'deleting' && (
          <div className="flex flex-col items-center gap-5 py-8">
            <div className="w-16 h-16 rounded-[18px] flex items-center justify-center"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
              <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin"
                style={{ borderColor: 'rgba(239,68,68,0.25)', borderTopColor: '#F87171' }} />
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text">Deleting account...</p>
              <p className="font-body text-xs text-text-muted mt-1">This may take a moment. Do not close the app.</p>
            </div>
          </div>
        )}

        {/* Cancel button */}
        {confirmState === 'idle' && (
          <button onClick={onBack}
            className="w-full h-11 font-body text-sm text-text-muted rounded-[--radius-xl] transition-colors hover:text-text">
            Cancel — keep {businessName}
          </button>
        )}
      </div>
    </div>
  )
}
