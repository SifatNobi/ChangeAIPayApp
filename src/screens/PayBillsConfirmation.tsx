import AuthHeader from '@/components/AuthHeader'
import { type Biller } from './PayBillsHub'

interface PayBillsConfirmationProps {
  biller?: Biller
  accountNumber?: string
  amount?: string
  onConfirm?: () => void
  onBack?: () => void
}

export default function PayBillsConfirmation({ biller, accountNumber, amount = '0.00', onConfirm, onBack }: PayBillsConfirmationProps) {
  const name = biller?.name ?? 'Biller'
  const color = biller?.color ?? '#0066FF'
  const numAmount = parseFloat(amount)
  const total = numAmount.toFixed(2)

  return (
    <div className="flex flex-col bg-bg min-h-screen px-5 pt-4 pb-10">
      <AuthHeader title="Review & Confirm" onBack={onBack} step={3} totalSteps={3} />

      <div className="mt-6 flex flex-col gap-4">
        {/* Amount hero */}
        <div
          className="rounded-[--radius-2xl] px-5 py-6 flex flex-col items-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(0,40,100,0.9) 0%, rgba(13,26,74,0.98) 100%)', border: '1px solid rgba(0,102,255,0.25)' }}
        >
          <p className="font-body text-xs text-text-muted uppercase tracking-wider">You are paying</p>
          <p className="font-display text-4xl font-extrabold text-white">${total}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: `${color}20`, color }}>
              {biller?.icon}
            </div>
            <p className="font-body text-sm text-text-2">{name}</p>
          </div>
        </div>

        {/* Details */}
        <div
          className="rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          {[
            { label: 'Biller', value: name },
            { label: 'Account number', value: accountNumber ?? '—' },
            { label: 'Amount', value: `$${amount}` },
            { label: 'Fee', value: 'Free', green: true },
            { label: 'Total deducted', value: `$${total}`, bold: true },
          ].map(r => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="font-body text-xs text-text-muted">{r.label}</span>
              <span className={`font-mono text-xs ${r.bold ? 'font-extrabold text-text' : r.green ? 'font-semibold text-[#22C55E]' : 'font-semibold text-text-2'}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>

        {/* Timing note */}
        <div
          className="rounded-[--radius-xl] px-4 py-3 flex items-start gap-2.5"
          style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.18)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#F5B700" strokeWidth="1.1" />
            <path d="M6.5 4v3l1.5 1.5" stroke="#F5B700" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            Bill payments process within <strong className="text-text-2">1–2 business days</strong> and post to your {name} account on the next statement cycle.
          </p>
        </div>

        <button
          onClick={onConfirm}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 24px rgba(0,102,255,0.35)' }}
        >
          Confirm Payment
        </button>
      </div>
    </div>
  )
}
