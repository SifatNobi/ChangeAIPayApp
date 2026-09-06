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

interface AddMoneyProps {
  linkedBanks?: LinkedBank[]
  onConfirm?: (amount: string, bankId: string, speed: Speed) => void
  onBack?: () => void
}

const DEFAULT_BANKS: LinkedBank[] = [
  { id: 'chase',   name: 'Chase',           abbr: 'JP', color: '#117ACA', maskedAccount: '••••4821', accountType: 'Checking' },
  { id: 'ally',    name: 'Ally Bank',        abbr: 'AL', color: '#5A16D5', maskedAccount: '••••7303', accountType: 'Savings'  },
]

const QUICK_AMOUNTS = ['50', '100', '200', '500']

export default function AddMoney({
  linkedBanks = DEFAULT_BANKS,
  onConfirm,
  onBack,
}: AddMoneyProps) {
  const [amount, setAmount] = useState('')
  const [selectedBank, setSelectedBank] = useState(linkedBanks[0]?.id ?? '')
  const [speed, setSpeed] = useState<Speed>('instant')

  const numVal = parseFloat(amount) || 0
  const canConfirm = numVal > 0 && selectedBank

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title="Add Money" onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-5 pb-4 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Amount display */}
        <div
          className="flex flex-col items-center gap-2 px-5 py-6 rounded-[--radius-2xl]"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <p className="font-body text-xs text-white/40 uppercase tracking-wider">Amount to add</p>
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
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">From</p>
          {linkedBanks.map(bank => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] w-full text-left transition-all duration-[200ms] active:scale-[0.99]"
              style={{
                background: selectedBank === bank.id ? `${bank.color}12` : 'rgba(175,197,255,0.03)',
                border: `1px solid ${selectedBank === bank.id ? `${bank.color}40` : 'rgba(175,197,255,0.1)'}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-body font-bold text-white shrink-0"
                style={{ background: bank.color, fontSize: 11, boxShadow: selectedBank === bank.id ? `0 2px 8px ${bank.color}44` : 'none' }}
              >
                {bank.abbr}
              </div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">{bank.name}</p>
                <p className="font-body text-xs text-text-muted">{bank.accountType} · {bank.maskedAccount}</p>
              </div>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-[200ms]"
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
            { id: 'instant', label: 'Instant', sub: 'Available in seconds', time: '< 30s' },
            { id: 'standard', label: 'Standard', sub: '1–3 business days', time: '1–3 days' },
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
              <p className="font-mono text-xs text-text-muted">{opt.time}</p>
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all duration-[200ms]"
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

        {/* Fee disclosure */}
        {numVal > 0 && (
          <div
            className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] animate-fade-in"
            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.18)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="#22C55E" strokeWidth="1" />
              <path d="M4.5 7l2 2 3-3" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-success">$0.00 fee</p>
              <p className="font-body text-xs text-text-muted">Adding money is always free — no conversion, no network fee</p>
            </div>
            <p className="font-display text-base font-extrabold text-success">${numVal.toFixed(2)}</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-8">
        <button
          disabled={!canConfirm}
          onClick={() => onConfirm?.(amount, selectedBank, speed)}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Add ${numVal > 0 ? numVal.toFixed(2) : '0.00'} to Wallet
        </button>
      </div>
    </div>
  )
}
