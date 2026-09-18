import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import { type Biller } from './PayBillsHub'

interface PayBillsAmountProps {
  biller?: Biller
  accountNumber?: string
  onContinue?: (amount: string) => void
  onBack?: () => void
}

const QUICK = ['25', '50', '100', '150', '200', '500']

export default function PayBillsAmount({ biller, onContinue, onBack }: PayBillsAmountProps) {
  const [raw, setRaw] = useState('')

  const display = raw === '' ? '0' : raw
  const numVal = parseFloat(raw) || 0
  const isValid = numVal >= 1 && numVal <= 10000

  const press = (k: string) => {
    if (k === '⌫') { setRaw(r => r.slice(0, -1)); return }
    if (k === '.' && raw.includes('.')) return
    if (k === '.' && raw === '') { setRaw('0.'); return }
    if (raw.split('.')[1]?.length >= 2) return
    if (raw === '0' && k !== '.') { setRaw(k); return }
    setRaw(r => r + k)
  }

  const color = biller?.color ?? '#0066FF'

  return (
    <div className="flex flex-col bg-bg min-h-screen">
      <div className="px-5 pt-4">
        <AuthHeader title="Enter Amount" onBack={onBack} step={2} totalSteps={3} />
      </div>

      <div className="flex-1 flex flex-col">
        {/* Amount display */}
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <p className="font-body text-xs text-text-muted uppercase tracking-wider">
            {biller?.name ?? 'Bill payment'}
          </p>
          <div className="flex items-start gap-1">
            <span className="font-display text-3xl font-bold text-text mt-2">$</span>
            <span className="font-display text-6xl font-extrabold text-text">{display}</span>
          </div>
          <p className="font-body text-[10px] text-text-muted">Min $1 · Max $10,000</p>
        </div>

        {/* Quick amounts */}
        <div className="flex gap-2 flex-wrap justify-center px-5 mb-4">
          {QUICK.map(q => (
            <button
              key={q}
              onClick={() => setRaw(q)}
              className="h-8 px-4 rounded-full font-body text-xs font-semibold transition-all active:scale-95"
              style={{
                background: raw === q ? `${color}20` : 'rgba(175,197,255,0.07)',
                color: raw === q ? color : 'rgba(175,197,255,0.6)',
                border: `1px solid ${raw === q ? `${color}40` : 'rgba(175,197,255,0.12)'}`,
              }}
            >
              ${q}
            </button>
          ))}
        </div>

        {/* Numpad */}
        <div className="px-6 grid grid-cols-3 gap-3">
          {['1','2','3','4','5','6','7','8','9','.','0','⌫'].map(k => (
            <button
              key={k}
              onClick={() => press(k)}
              className="h-16 rounded-[--radius-2xl] font-display text-xl font-bold text-text flex items-center justify-center transition-all active:scale-90"
              style={{ background: k === '⌫' ? 'rgba(255,77,90,0.08)' : 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.08)' }}
            >
              {k === '⌫'
                ? <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4H15a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H7L2 9l5-5z" stroke="rgba(255,77,90,0.7)" strokeWidth="1.2" strokeLinejoin="round" /><path d="M11 7l-4 4M7 7l4 4" stroke="rgba(255,77,90,0.7)" strokeWidth="1.2" strokeLinecap="round" /></svg>
                : k}
            </button>
          ))}
        </div>

        {/* Continue */}
        <div className="px-5 mt-5 pb-8">
          <button
            onClick={() => isValid && onContinue?.(numVal.toFixed(2))}
            disabled={!isValid}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center transition-all active:scale-[0.98]"
            style={{
              background: isValid ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)',
              color: isValid ? 'white' : 'rgba(175,197,255,0.3)',
              boxShadow: isValid ? '0 4px 24px rgba(0,102,255,0.35)' : 'none',
            }}
          >
            Review Payment
          </button>
        </div>
      </div>
    </div>
  )
}
