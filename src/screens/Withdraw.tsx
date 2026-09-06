import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

type Speed = 'instant' | 'standard'

interface LinkedBank {
  id: string
  name: string
  abbr: string
  color: string
  maskedAccount: string
  accountType: string
}

interface WithdrawProps {
  linkedBanks?: LinkedBank[]
  walletBalance?: number
  monthlyWithdrawn?: number
  freeAllowance?: number
  onConfirm?: (amount: string, bankId: string, speed: Speed) => void
  onLimitReached?: () => void
  onBack?: () => void
}

const DEFAULT_BANKS: LinkedBank[] = [
  { id: 'chase',   name: 'Chase',    abbr: 'JP', color: '#117ACA', maskedAccount: '••••4821', accountType: 'Checking' },
  { id: 'ally',    name: 'Ally Bank', abbr: 'AL', color: '#5A16D5', maskedAccount: '••••7303', accountType: 'Savings'  },
]

const QUICK_AMOUNTS = ['50', '100', '200', '500']

export default function Withdraw({
  linkedBanks = DEFAULT_BANKS,
  walletBalance = 1842.35,
  monthlyWithdrawn = 220,
  freeAllowance = 400,
  onConfirm,
  onLimitReached,
  onBack,
}: WithdrawProps) {
  const [amount, setAmount] = useState('')
  const [selectedBank, setSelectedBank] = useState(linkedBanks[0]?.id ?? '')
  const [speed, setSpeed] = useState<Speed>('standard')

  const numVal = parseFloat(amount) || 0
  const remaining = Math.max(0, freeAllowance - monthlyWithdrawn)
  const overLimit = numVal > remaining
  const fee = overLimit ? (numVal - remaining) * 0.015 : 0
  const total = numVal + fee
  const canConfirm = numVal > 0 && numVal <= walletBalance && selectedBank

  const handleConfirm = () => {
    if (!canConfirm) return
    if (overLimit) { onLimitReached?.(); return }
    onConfirm?.(amount, selectedBank, speed)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title="Withdraw" onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Amount display */}
        <div
          className="flex flex-col items-center gap-2 px-5 py-6 rounded-[--radius-2xl]"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <p className="font-body text-xs text-white/40 uppercase tracking-wider">Withdraw amount</p>
          <div className="flex items-baseline gap-1">
            <span className="font-body text-2xl text-white/40 font-semibold">$</span>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-transparent font-display font-extrabold text-white tracking-tight outline-none text-center"
              style={{ fontSize: amount.length > 6 ? 36 : 48, width: Math.max(120, amount.length * 30) }}
            />
          </div>
          <p className="font-body text-xs text-white/30">Available: ${walletBalance.toFixed(2)}</p>
          {/* Quick amounts */}
          <div className="flex gap-2 mt-1">
            {QUICK_AMOUNTS.map(q => (
              <button
                key={q}
                onClick={() => setAmount(q)}
                className="h-7 px-3 rounded-full font-body text-xs font-semibold transition-all duration-[150ms] active:scale-[0.92]"
                style={{
                  background: amount === q ? 'rgba(63,231,255,0.15)' : 'rgba(255,255,255,0.06)',
                  border: `1px solid ${amount === q ? 'rgba(63,231,255,0.35)' : 'rgba(255,255,255,0.1)'}`,
                  color: amount === q ? '#3FE7FF' : 'rgba(255,255,255,0.5)',
                }}
              >
                ${q}
              </button>
            ))}
          </div>
        </div>

        {/* Bank selector */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">To</p>
          {linkedBanks.map(bank => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] w-full text-left transition-all duration-[200ms]"
              style={{
                background: selectedBank === bank.id ? `${bank.color}12` : 'rgba(175,197,255,0.03)',
                border: `1px solid ${selectedBank === bank.id ? `${bank.color}40` : 'rgba(175,197,255,0.1)'}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-body font-bold text-white shrink-0"
                style={{ background: bank.color, fontSize: 11 }}
              >
                {bank.abbr}
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">{bank.name}</p>
                <p className="font-body text-xs text-text-muted">{bank.accountType} · {bank.maskedAccount}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all duration-[200ms]"
                style={{
                  background: selectedBank === bank.id ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.06)',
                  border: `1.5px solid ${selectedBank === bank.id ? 'transparent' : 'rgba(175,197,255,0.2)'}`,
                }}
              >
                {selectedBank === bank.id && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2.5 4-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Transfer speed */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Transfer speed</p>
          {([
            { id: 'instant', label: 'Instant', sub: 'Arrives in seconds', time: '< 30s', note: 'May require fee' },
            { id: 'standard', label: 'Standard', sub: '1–3 business days', time: '1–3 days', note: 'Free' },
          ] as const).map(opt => (
            <button
              key={opt.id}
              onClick={() => setSpeed(opt.id)}
              className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] w-full text-left transition-all duration-[200ms]"
              style={{
                background: speed === opt.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.03)',
                border: `1px solid ${speed === opt.id ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
              }}
            >
              <div className="flex-1">
                <p className={`font-body text-sm font-semibold ${speed === opt.id ? 'text-text' : 'text-text-2'}`}>{opt.label}</p>
                <p className="font-body text-xs text-text-muted">{opt.sub}</p>
              </div>
              <p className={`font-mono text-xs mr-2 ${opt.note === 'Free' ? 'text-success' : 'text-text-muted'}`}>{opt.note}</p>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-[200ms]"
                style={{
                  background: speed === opt.id ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.06)',
                  border: `1.5px solid ${speed === opt.id ? 'transparent' : 'rgba(175,197,255,0.2)'}`,
                }}
              >
                {speed === opt.id && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2.5 4-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Fee preview */}
        {numVal > 0 && (
          <div
            className="px-4 py-4 rounded-[--radius-xl] flex flex-col gap-2 animate-fade-in"
            style={{
              background: overLimit ? 'rgba(245,183,0,0.05)' : 'rgba(34,197,94,0.05)',
              border: `1px solid ${overLimit ? 'rgba(245,183,0,0.2)' : 'rgba(34,197,94,0.18)'}`,
            }}
          >
            <div className="flex justify-between">
              <p className="font-body text-xs text-text-muted">Monthly free allowance</p>
              <p className="font-mono text-xs text-text-2">${remaining.toFixed(2)} remaining</p>
            </div>
            <div className="flex justify-between">
              <p className="font-body text-xs text-text-muted">Fee</p>
              <p className={`font-mono text-xs font-semibold ${overLimit ? 'text-warning' : 'text-success'}`}>
                {overLimit ? `$${fee.toFixed(2)} (~1.5%)` : 'Free'}
              </p>
            </div>
            {overLimit && (
              <div className="flex justify-between border-t border-[color:var(--color-border)] pt-2">
                <p className="font-body text-xs font-semibold text-text">Total</p>
                <p className="font-mono text-sm font-bold text-text">${total.toFixed(2)}</p>
              </div>
            )}
            {overLimit && (
              <p className="font-body text-[10px] text-text-muted">
                ${(numVal - remaining).toFixed(2)} is over your free allowance · a 1.5% fee applies to the excess only.
                <button onClick={onLimitReached} className="text-accent ml-1 underline">See full breakdown</button>
              </p>
            )}
          </div>
        )}

        {numVal > walletBalance && (
          <p className="font-body text-xs text-error animate-fade-in">Amount exceeds your available balance of ${walletBalance.toFixed(2)}</p>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-8">
        <button
          disabled={!canConfirm}
          onClick={handleConfirm}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--gradient-primary)' }}
        >
          {overLimit ? 'Continue with fee' : 'Confirm Withdrawal'}
        </button>
      </div>
    </div>
  )
}
