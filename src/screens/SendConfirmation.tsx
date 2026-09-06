import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

interface SendConfirmationProps {
  recipientName?: string
  recipientHandle?: string
  recipientInitials?: string
  recipientColor?: string
  amount?: string
  currency?: string
  fee?: string
  total?: string
  eta?: string
  note?: string
  onConfirm?: () => void
  onEditRecipient?: () => void
  onEditAmount?: () => void
  onBack?: () => void
}

type AuthState = 'idle' | 'biometric' | 'pin' | 'success'

const PIN_LENGTH = 6

export default function SendConfirmation({
  recipientName = 'Alex Johnson',
  recipientHandle = '@alexj',
  recipientInitials = 'AJ',
  recipientColor = '#0066FF',
  amount = '50.00',
  currency = 'USD',
  fee = 'Free',
  total = '$50.00',
  eta = 'Instant',
  note = '',
  onConfirm,
  onEditRecipient,
  onEditAmount,
  onBack,
}: SendConfirmationProps) {
  const [authState, setAuthState] = useState<AuthState>('idle')
  const [pinDigits, setPinDigits] = useState<string[]>([])
  const [pinError, setPinError] = useState(false)

  const handleConfirmTap = () => setAuthState('biometric')

  const handleBiometricSuccess = () => {
    setAuthState('success')
    setTimeout(() => onConfirm?.(), 400)
  }

  const handleUsePIN = () => setAuthState('pin')

  const handlePinKey = (k: string) => {
    if (k === '⌫') {
      setPinDigits(d => d.slice(0, -1))
      setPinError(false)
      return
    }
    const next = [...pinDigits, k].slice(0, PIN_LENGTH)
    setPinDigits(next)
    if (next.length === PIN_LENGTH) {
      setTimeout(() => {
        if (next.join('') === '123456') {
          setAuthState('success')
          setTimeout(() => onConfirm?.(), 400)
        } else {
          setPinError(true)
          setPinDigits([])
        }
      }, 200)
    }
  }

  const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫']

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title="Review & Confirm" onBack={onBack} step={3} totalSteps={4} />
      </div>

      <div className="overflow-y-auto pb-8 flex-1 px-5 mt-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Recipient row */}
        <div
          className="flex items-center gap-3 px-4 py-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center font-body text-sm font-bold text-white shrink-0"
            style={{ background: `linear-gradient(135deg, ${recipientColor}cc, ${recipientColor}44)` }}
          >
            {recipientInitials}
          </div>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">{recipientName}</p>
            <p className="font-mono text-xs text-text-muted">{recipientHandle}</p>
          </div>
          <button
            onClick={onEditRecipient}
            className="font-body text-xs font-semibold text-accent px-2 py-1 min-h-[44px] flex items-center"
          >
            Edit
          </button>
        </div>

        {/* Amount breakdown */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl] flex flex-col gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <div className="flex items-center justify-between">
            <p className="font-body text-xs text-white/50 uppercase tracking-wider">Amount</p>
            <button onClick={onEditAmount} className="font-body text-xs font-semibold text-accent min-h-[44px] flex items-center">Edit</button>
          </div>
          <p className="font-display text-4xl font-extrabold text-white tracking-tight">
            {currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '€'}{amount}
          </p>
          <div className="flex flex-col gap-1.5 border-t border-white/10 pt-3">
            {[
              { label: 'Fee', value: fee, green: fee === 'Free' },
              { label: 'Total deducted', value: total, bold: true },
              { label: 'Arrives', value: eta },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <p className="font-body text-xs text-white/50">{r.label}</p>
                <p className={`font-mono text-sm ${r.bold ? 'font-bold text-white' : r.green ? 'text-success' : 'text-white/80'}`}>{r.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        {note && (
          <div
            className="px-4 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <p className="font-body text-xs text-text-muted mb-0.5">Note</p>
            <p className="font-body text-sm text-text-2">"{note}"</p>
          </div>
        )}

        {/* Security note */}
        <div className="flex items-center gap-2 px-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L1.5 3v4.5C1.5 10 3.5 11.5 6 12c2.5-.5 4.5-2 4.5-4.5V3L6 1Z"
              stroke="rgba(175,197,255,0.35)" strokeWidth="1" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted">
            Authentication required before every transfer for your security.
          </p>
        </div>
      </div>

      {/* Confirm button / auth inline */}
      <div className="px-5 pb-8">
        {authState === 'idle' && (
          <button
            onClick={handleConfirmTap}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 6px 24px rgba(0,102,255,0.3)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 3.3v5C2 11 4 13 7 14c3-1 5-3 5-5.7V3.3L7 1Z" stroke="white" strokeWidth="1.2" />
              <path d="M4.5 7l2 2 3-3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Confirm & Send
          </button>
        )}

        {/* Biometric prompt */}
        {authState === 'biometric' && (
          <div className="flex flex-col items-center gap-4 animate-fade-in">
            <p className="font-body text-sm text-text-2 text-center">Authenticate to send</p>
            <button
              onClick={handleBiometricSuccess}
              className="w-20 h-20 rounded-full flex items-center justify-center transition-all duration-[200ms] active:scale-[0.9]"
              style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 0 8px rgba(0,102,255,0.12)' }}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 4a8 8 0 0 1 8 8v6a8 8 0 0 1-16 0v-6a8 8 0 0 1 8-8Z" stroke="white" strokeWidth="1.6" />
                <path d="M10 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="16" cy="18" r="2" fill="white" />
              </svg>
            </button>
            <button onClick={handleUsePIN} className="font-body text-xs text-accent hover:underline">Use PIN instead</button>
          </div>
        )}

        {/* PIN entry */}
        {authState === 'pin' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            <p className="font-body text-sm text-center text-text-2">Enter your 6-digit PIN</p>
            {pinError && (
              <p className="font-body text-xs text-error text-center animate-fade-in">Incorrect PIN — try again</p>
            )}
            <div className="flex items-center justify-center gap-3">
              {Array.from({ length: PIN_LENGTH }).map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 rounded-full transition-all duration-[150ms]"
                  style={{ background: i < pinDigits.length ? 'var(--color-accent)' : 'rgba(175,197,255,0.15)' }} />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {KEYS.map((k, i) => (
                <button key={i} onClick={() => k && handlePinKey(k)} disabled={!k}
                  className="h-12 rounded-[--radius-xl] font-display text-lg font-bold text-text flex items-center justify-center transition-all duration-[120ms] active:scale-[0.91] disabled:opacity-0"
                  style={{ background: k ? 'rgba(175,197,255,0.05)' : 'transparent', border: k ? '1px solid rgba(175,197,255,0.08)' : 'none' }}
                >
                  {k === '⌫' ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 4H6L2 8l4 4h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" /><path d="M9 6l-3 4M6 6l3 4" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" /></svg> : k}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
