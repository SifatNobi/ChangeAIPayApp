import { type Transaction } from '@/data/transactions'
import logoSrc from '@/imports/logo.png.jpeg'

interface TransactionDetailProps {
  transaction?: Transaction
  onViewReceipt?: () => void
  onShare?: () => void
  onRefund?: () => void
  onReport?: () => void
  onBack?: () => void
}

const STATUS_CONFIG = {
  completed: { label: 'Completed',  color: '#22C55E', bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)' },
  pending:   { label: 'Pending',    color: '#F5B700', bg: 'rgba(245,183,0,0.08)',  border: 'rgba(245,183,0,0.25)' },
  failed:    { label: 'Failed',     color: '#FF4D5A', bg: 'rgba(255,77,90,0.08)',  border: 'rgba(255,77,90,0.25)' },
}

const TYPE_LABELS: Record<string, string> = {
  sent: 'Sent', received: 'Received', refund: 'Refund', topup: 'Added', withdrawal: 'Withdrawn',
}

const DEFAULT_TX: Transaction = {
  id: 't1', type: 'sent', merchant: 'Alex Johnson', counterpartyHandle: '@alexj',
  category: 'Transfer', amount: '$50.00', amountNum: 50, positive: false,
  status: 'completed', date: 'Today', time: '10:42 AM', dateGroup: 'Today',
  transactionId: 'TXN-2026-0088AF', fee: 'Free', note: 'Lunch split',
}

export default function TransactionDetail({
  transaction = DEFAULT_TX,
  onViewReceipt,
  onShare,
  onRefund,
  onReport,
  onBack,
}: TransactionDetailProps) {
  const s = STATUS_CONFIG[transaction.status]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-body text-sm font-semibold text-text">Transaction Detail</p>
        <button onClick={onShare} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors" aria-label="Share">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M13 3l3 3-3 3M16 6H7a4 4 0 0 0-4 4v2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Amount hero */}
        <div
          className="rounded-[--radius-2xl] px-5 py-6 flex flex-col items-center gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          {/* Status chip */}
          <div
            className="flex items-center gap-1.5 h-6 px-3 rounded-full"
            style={{ background: s.bg, border: `1px solid ${s.border}` }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color, animation: transaction.status === 'pending' ? 'pulse 1.5s ease-in-out infinite' : 'none' }} />
            <p className="font-body text-xs font-semibold" style={{ color: s.color }}>{s.label}</p>
          </div>
          {/* Amount */}
          <p
            className="font-display text-5xl font-extrabold tracking-tighter"
            style={{
              background: transaction.positive ? 'linear-gradient(135deg,#22C55E,#4ade80)' : 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            {transaction.positive ? '+' : '-'}{transaction.amount}
          </p>
          {/* Type + counterparty */}
          <p className="font-body text-sm text-white/60">
            {TYPE_LABELS[transaction.type]}
            {transaction.counterpartyHandle
              ? <> · <span className="font-mono text-accent">{transaction.counterpartyHandle}</span></>
              : ` · ${transaction.merchant}`
            }
          </p>
          {/* Date/time */}
          <p className="font-body text-xs text-white/35">{transaction.date} at {transaction.time}</p>
        </div>

        {/* Counterparty row */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.8), rgba(63,231,255,0.4))' }}
          >
            {transaction.merchant.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">{transaction.merchant}</p>
            {transaction.counterpartyHandle && (
              <p className="font-mono text-xs text-text-muted">{transaction.counterpartyHandle}</p>
            )}
          </div>
          <p className="font-body text-xs text-text-muted">{transaction.category}</p>
        </div>

        {/* Detail rows */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-2"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          {[
            { label: 'Amount',         value: transaction.amount,         mono: false },
            { label: 'Fee',            value: transaction.fee ?? 'Free',   mono: false, green: true },
            { label: 'Date',           value: transaction.date,            mono: false },
            { label: 'Time',           value: transaction.time,            mono: false },
            { label: 'Category',       value: transaction.category,        mono: false },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between py-0.5">
              <p className="font-body text-xs text-text-muted">{row.label}</p>
              <p className={`text-sm ${row.mono ? 'font-mono' : 'font-body'} ${row.green ? 'text-success font-semibold' : 'text-text-2'}`}>
                {row.value}
              </p>
            </div>
          ))}
          {/* Transaction ID in JetBrains Mono */}
          <div className="flex items-center justify-between py-0.5 border-t border-[color:var(--color-border)] mt-1 pt-3">
            <p className="font-body text-xs text-text-muted">Transaction ID</p>
            <p className="font-mono text-xs text-text-muted tracking-wide">{transaction.transactionId}</p>
          </div>
        </div>

        {/* Note */}
        {transaction.note && (
          <div
            className="px-4 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <p className="font-body text-xs text-text-muted mb-1">Note</p>
            <p className="font-body text-sm text-text-2">"{transaction.note}"</p>
          </div>
        )}

        {/* ChangeAIPay logo watermark */}
        <div className="flex items-center gap-1.5 justify-center opacity-30">
          <img src={logoSrc} alt="ChangeAIPay" className="w-4 h-4 object-contain" />
          <p className="font-body text-xs text-text-muted">ChangeAIPay</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <button
              onClick={onViewReceipt}
              className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <rect x="2" y="1" width="9" height="11" rx="1.5" stroke="white" strokeWidth="1.1" />
                <path d="M4 4h5M4 6.5h5M4 9h3" stroke="white" strokeWidth="1" strokeLinecap="round" />
              </svg>
              View Receipt
            </button>
            <button
              onClick={onShare}
              className="h-12 w-12 rounded-[--radius-2xl] flex items-center justify-center transition-all duration-[180ms] active:scale-[0.94]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              aria-label="Share"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11 2l3 3-3 3M14 5H7a4 4 0 0 0-4 4v2" stroke="rgba(175,197,255,0.7)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Secondary actions */}
          {(transaction.type === 'sent' || transaction.type === 'topup') && transaction.status === 'completed' && (
            <button
              onClick={onRefund}
              className="w-full h-11 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.98]"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M11 2A5 5 0 0 0 2 6.5M2 11a5 5 0 0 0 9-4.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
                <path d="M2 2v3h3" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Request Refund
            </button>
          )}
          <button
            onClick={onReport}
            className="w-full h-10 font-body text-sm text-text-muted flex items-center justify-center transition-colors hover:text-text"
          >
            Report an Issue
          </button>
        </div>
      </div>
    </div>
  )
}
