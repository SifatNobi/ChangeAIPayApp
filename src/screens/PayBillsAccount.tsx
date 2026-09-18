import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import { type Biller } from './PayBillsHub'

interface PayBillsAccountProps {
  biller?: Biller
  onContinue?: (accountNumber: string) => void
  onBack?: () => void
}

export default function PayBillsAccount({ biller, onContinue, onBack }: PayBillsAccountProps) {
  const [accountNumber, setAccountNumber] = useState('')

  const isValid = accountNumber.trim().length >= 4

  const name = biller?.name ?? 'Biller'
  const color = biller?.color ?? '#0066FF'

  return (
    <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
      <AuthHeader title="Account Details" onBack={onBack} step={1} totalSteps={3} />

      <div className="mt-6 flex flex-col gap-5">
        {/* Biller card */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
            style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}>
            {biller?.icon}
          </div>
          <div>
            <p className="font-body text-sm font-bold text-text">{name}</p>
            <p className="font-body text-xs text-text-muted">{biller?.category}</p>
          </div>
        </div>

        {/* Account number */}
        <div>
          <p className="font-body text-sm font-semibold text-text mb-2">Account / Reference number</p>
          <input
            type="text"
            inputMode="numeric"
            placeholder="e.g. 1234567890"
            value={accountNumber}
            onChange={e => setAccountNumber(e.target.value)}
            className="w-full h-13 px-4 rounded-[--radius-xl] font-mono text-base text-text outline-none transition-colors"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: `1px solid ${accountNumber && !isValid ? 'rgba(255,77,90,0.5)' : isValid ? 'rgba(34,197,94,0.35)' : 'rgba(175,197,255,0.15)'}`,
            }}
          />
          <p className="font-body text-[10px] text-text-muted mt-1.5">
            Find this on your bill or in the {name} app under "My Account"
          </p>
        </div>

        {/* Info note */}
        <div
          className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-2.5"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" />
            <line x1="6.5" y1="4" x2="6.5" y2="7" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="6.5" cy="9.5" r="0.7" fill="rgba(175,197,255,0.4)" />
          </svg>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            Payments are processed within 1–2 business days and will appear on your {name} account statement.
          </p>
        </div>

        <button
          onClick={() => isValid && onContinue?.(accountNumber)}
          disabled={!isValid}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center transition-all active:scale-[0.98]"
          style={{
            background: isValid ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)',
            color: isValid ? 'white' : 'rgba(175,197,255,0.3)',
            boxShadow: isValid ? '0 4px 24px rgba(0,102,255,0.35)' : 'none',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
