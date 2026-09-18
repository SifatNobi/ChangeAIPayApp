import logoSrc from '@/imports/logo.png.jpeg'
import { type Transaction } from '@/data/transactions'

interface ReceiptProps {
  transaction?: Transaction
  onShare?: () => void
  onBack?: () => void
}

const DEFAULT_TX: Transaction = {
  id: '', type: 'sent', merchant: '', counterpartyHandle: '',
  category: 'Transfer', amount: '$0.00', amountNum: 0, positive: false,
  status: 'completed', date: '', time: '', dateGroup: 'Today',
  transactionId: '', fee: 'Free', note: '',
}

export default function Receipt({
  transaction = DEFAULT_TX,
  onShare,
  onBack,
}: ReceiptProps) {
  const typeLabel = { sent: 'Payment Sent', received: 'Payment Received', refund: 'Refund', topup: 'Funds Added', withdrawal: 'Withdrawal' }[transaction.type] ?? 'Transaction'

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-body text-sm font-semibold text-text">Receipt</p>
        <button
          onClick={onShare}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold text-accent transition-all duration-[180ms] hover:bg-surface-hi"
          style={{ border: '1px solid rgba(63,231,255,0.25)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 1l3 3-3 3M11 4H5a3 3 0 0 0-3 3v1" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Share
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Receipt card */}
        <div
          className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          {/* Header band */}
          <div
            className="px-6 py-5 flex flex-col items-center gap-3"
            style={{ background: 'linear-gradient(180deg, rgba(0,102,255,0.15) 0%, transparent 100%)', borderBottom: '1px dashed rgba(175,197,255,0.15)' }}
          >
            <div className="flex items-center gap-2">
              <img src={logoSrc} alt="ChangeAIPay" className="w-7 h-7 object-contain" />
              <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">ChangeAIPay</p>
            </div>
            <p className="font-body text-xs text-text-muted">{typeLabel}</p>
            <p
              className="font-display text-4xl font-extrabold tracking-tighter"
              style={{
                background: transaction.positive ? 'linear-gradient(135deg,#22C55E,#4ade80)' : 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}
            >
              {transaction.positive ? '+' : ''}{transaction.amount}
            </p>

            {/* Status */}
            <div
              className="flex items-center gap-1.5 h-6 px-3 rounded-full"
              style={{
                background: transaction.status === 'completed' ? 'rgba(34,197,94,0.1)' : 'rgba(245,183,0,0.1)',
                border: `1px solid ${transaction.status === 'completed' ? 'rgba(34,197,94,0.25)' : 'rgba(245,183,0,0.25)'}`,
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: transaction.status === 'completed' ? '#22C55E' : '#F5B700' }} />
              <p className="font-body text-xs font-semibold" style={{ color: transaction.status === 'completed' ? '#22C55E' : '#F5B700' }}>
                {transaction.status === 'completed' ? 'Completed' : 'Pending'}
              </p>
            </div>
          </div>

          {/* Detail rows */}
          <div className="px-6 py-5 flex flex-col gap-3">
            {[
              { label: 'From / To',  value: transaction.merchant },
              { label: 'Handle',     value: transaction.counterpartyHandle ?? '—', mono: true },
              { label: 'Date',       value: transaction.date },
              { label: 'Time',       value: transaction.time },
              { label: 'Category',   value: transaction.category },
              { label: 'Fee',        value: transaction.fee ?? 'Free', green: true },
            ].map(row => (
              <div key={row.label} className="flex items-center justify-between">
                <p className="font-body text-xs text-text-muted">{row.label}</p>
                <p className={`text-sm ${row.mono ? 'font-mono text-accent' : 'font-body'} ${row.green ? 'text-success font-semibold' : 'text-text-2'}`}>
                  {row.value}
                </p>
              </div>
            ))}

            {transaction.note && (
              <div className="flex items-start justify-between gap-3">
                <p className="font-body text-xs text-text-muted shrink-0">Note</p>
                <p className="font-body text-sm text-text-2 text-right italic">"{transaction.note}"</p>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-dashed border-[color:var(--color-border)] my-1" />

            {/* Transaction ID */}
            <div className="flex items-center justify-between">
              <p className="font-body text-xs text-text-muted">Transaction ID</p>
              <p className="font-mono text-xs text-text-muted tracking-wide">{transaction.transactionId}</p>
            </div>
          </div>

          {/* Footer with logo + disclaimer */}
          <div
            className="px-6 py-4 flex flex-col items-center gap-1.5"
            style={{ borderTop: '1px dashed rgba(175,197,255,0.12)', background: 'rgba(175,197,255,0.02)' }}
          >
            <div className="flex items-center gap-1.5 opacity-40">
              <img src={logoSrc} alt="" className="w-3.5 h-3.5 object-contain" />
              <p className="font-body text-[10px] text-text-muted">ChangeAIPay Ltd · Authorised payment institution</p>
            </div>
            <p className="font-mono text-[9px] text-text-muted opacity-30 text-center">
              This receipt is generated automatically. Keep for your records.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onShare}
            className="flex-1 h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10 1l3 3-3 3M13 4H6a4 4 0 0 0-4 4v1" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Share Receipt
          </button>
          <button
            onClick={onBack}
            className="h-14 w-14 rounded-[--radius-2xl] flex items-center justify-center transition-all duration-[180ms] active:scale-[0.94]"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            aria-label="Download"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 11v2a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M8 2v8M5 7l3 3 3-3" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
