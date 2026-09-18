import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

interface SendAmountProps {
  recipientName?: string
  recipientHandle?: string
  recipientInitials?: string
  recipientColor?: string
  onContinue?: (amount: string, currency: string, note: string) => void
  onBack?: () => void
  onLimitReached?: () => void
}

type Currency = { code: string; symbol: string; flag: string; label: string }

const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', flag: '🇺🇸', label: 'US Dollar' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧', label: 'British Pound' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺', label: 'Euro' },
  { code: 'NGN', symbol: '₦', flag: '🇳🇬', label: 'Nigerian Naira' },
]

const FX_RATES: Record<string, number> = { USD: 1, GBP: 0.786, EUR: 0.917, NGN: 1540 }

export default function SendAmount({
  recipientName = 'Alex Johnson',
  recipientHandle = '@alexj',
  recipientInitials = 'AJ',
  recipientColor = '#0066FF',
  onContinue,
  onBack,
  onLimitReached,
}: SendAmountProps) {
  const [display, setDisplay] = useState('0')
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const [note, setNote] = useState('')
  const [showCurrencySheet, setShowCurrencySheet] = useState(false)
  const [showNote, setShowNote] = useState(false)

  const numVal = parseFloat(display.replace(/,/g, '')) || 0
  const isInApp = true
  const monthlyUsed = 220
  const FREE_LIMIT = 400
  const overLimit = !isInApp && monthlyUsed + numVal > FREE_LIMIT

  const feeRate = currency.code !== 'USD' ? 0.0175 : 0
  const fee = isInApp ? 0 : feeRate * numVal
  const total = numVal + fee

  const handleKey = (k: string) => {
    setDisplay(prev => {
      if (k === '⌫') return prev.length <= 1 ? '0' : prev.slice(0, -1)
      if (k === '.' && prev.includes('.')) return prev
      if (prev === '0' && k !== '.') return k
      if (prev.length >= 9) return prev
      return prev + k
    })
  }

  const handleContinue = () => {
    if (numVal <= 0) return
    if (overLimit) { onLimitReached?.(); return }
    onContinue?.(display, currency.code, note)
  }

  const KEYS = ['1','2','3','4','5','6','7','8','9','.','0','⌫']

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title="Enter Amount" onBack={onBack} step={2} totalSteps={4} />
      </div>

      {/* Recipient */}
      <div className="flex items-center gap-3 px-5 mt-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold text-white shrink-0"
          style={{ background: `linear-gradient(135deg, ${recipientColor}cc, ${recipientColor}44)` }}
        >
          {recipientInitials}
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-text">{recipientName}</p>
          <p className="font-mono text-xs text-text-muted">{recipientHandle}</p>
        </div>
        <div className="flex-1" />
        {/* Currency selector */}
        <button
          onClick={() => setShowCurrencySheet(true)}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full transition-colors hover:bg-surface-hi"
          style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.15)' }}
        >
          <span>{currency.flag}</span>
          <span className="font-body text-xs font-semibold text-text-2">{currency.code}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 4l3 3 3-3" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Big amount display */}
      <div className="flex flex-col items-center mt-6 mb-4 px-5">
        <p className="font-display font-extrabold tracking-tighter" style={{
          fontSize: display.length > 6 ? 48 : 64,
          lineHeight: 1,
          background: numVal > 0 ? 'var(--gradient-primary)' : 'none',
          WebkitBackgroundClip: numVal > 0 ? 'text' : undefined,
          WebkitTextFillColor: numVal > 0 ? 'transparent' : undefined,
          backgroundClip: numVal > 0 ? 'text' : undefined,
          color: numVal > 0 ? undefined : 'rgba(175,197,255,0.2)',
        }}>
          {currency.symbol}{display}
        </p>
        {currency.code !== 'USD' && numVal > 0 && (
          <p className="font-body text-xs text-text-muted mt-1">
            ≈ ${(numVal / FX_RATES[currency.code]).toFixed(2)} USD
          </p>
        )}
      </div>

      {/* Fee preview */}
      {numVal > 0 && (
        <div
          className="mx-5 px-4 py-2.5 rounded-[--radius-xl] flex flex-col gap-1 mb-3 animate-fade-in"
          style={{
            background: isInApp ? 'rgba(34,197,94,0.05)' : 'rgba(175,197,255,0.04)',
            border: `1px solid ${isInApp ? 'rgba(34,197,94,0.15)' : 'rgba(175,197,255,0.1)'}`,
          }}
        >
          <div className="flex justify-between">
            <p className="font-body text-xs text-text-muted">Amount</p>
            <p className="font-mono text-xs text-text-2">{currency.symbol}{numVal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-body text-xs text-text-muted">Fee</p>
            <p className={`font-mono text-xs ${isInApp ? 'text-success' : 'text-text-2'}`}>
              {isInApp ? 'Free (in-app)' : `${currency.symbol}${fee.toFixed(2)} (${(feeRate * 100).toFixed(2)}%)`}
            </p>
          </div>
          {!isInApp && (
            <div className="flex justify-between border-t border-[color:var(--color-border)] pt-1 mt-1">
              <p className="font-body text-xs font-semibold text-text">Total</p>
              <p className="font-mono text-xs font-semibold text-text">{currency.symbol}{total.toFixed(2)}</p>
            </div>
          )}
        </div>
      )}

      {/* Note field */}
      {showNote ? (
        <div className="mx-5 mb-3">
          <input
            autoFocus
            type="text"
            value={note}
            onChange={e => setNote(e.target.value)}
            maxLength={80}
            placeholder="Add a note (optional)"
            className="w-full h-10 px-4 rounded-[--radius-xl] bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
            style={{ border: '1px solid rgba(175,197,255,0.15)' }}
          />
        </div>
      ) : (
        <button
          onClick={() => setShowNote(true)}
          className="mx-5 mb-3 flex items-center gap-1.5 font-body text-xs text-text-muted hover:text-text-2 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M1 5.5h9M5.5 1v9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          Add a note
        </button>
      )}

      {/* Numpad */}
      <div className="flex-1 px-5 pb-5">
        <div className="grid grid-cols-3 gap-3">
          {KEYS.map(k => (
            <button
              key={k}
              onClick={() => handleKey(k)}
              className="h-14 rounded-[--radius-2xl] font-display text-xl font-bold text-text flex items-center justify-center transition-all duration-[120ms] active:scale-[0.93]"
              style={{
                background: k === '⌫' ? 'rgba(175,197,255,0.06)' : 'rgba(175,197,255,0.05)',
                border: '1px solid rgba(175,197,255,0.08)',
              }}
            >
              {k === '⌫' ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M13 5H7L3 9l4 4h6a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1Z" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" />
                  <path d="M11 7l-4 4M7 7l4 4" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              ) : k}
            </button>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={numVal <= 0}
          className="w-full h-14 mt-4 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {overLimit ? 'Continue with standard fee' : 'Continue'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M8 4l3 3-3 3" stroke="white" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Currency bottom sheet */}
      {showCurrencySheet && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(5,11,45,0.8)' }}
          onClick={() => setShowCurrencySheet(false)}
        >
          <div
            className="w-full px-5 pt-5 pb-10 flex flex-col gap-2"
            style={{ background: '#0D1A4A', borderRadius: '28px 28px 0 0', border: '1px solid rgba(175,197,255,0.12)', borderBottom: 'none' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-3" style={{ background: 'rgba(175,197,255,0.2)' }} />
            <p className="font-body text-sm font-semibold text-text mb-2">Select Currency</p>
            {CURRENCIES.map(c => (
              <button
                key={c.code}
                onClick={() => { setCurrency(c); setShowCurrencySheet(false) }}
                className="flex items-center gap-3 h-12 px-4 rounded-[--radius-xl] transition-colors hover:bg-surface-hi"
                style={{
                  background: c.code === currency.code ? 'rgba(0,102,255,0.12)' : 'transparent',
                  border: c.code === currency.code ? '1px solid rgba(0,102,255,0.3)' : '1px solid transparent',
                }}
              >
                <span className="text-xl">{c.flag}</span>
                <span className="font-body text-sm font-semibold text-text flex-1 text-left">{c.code}</span>
                <span className="font-body text-xs text-text-muted">{c.label}</span>
                {c.code === currency.code && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3.5 6-6" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
