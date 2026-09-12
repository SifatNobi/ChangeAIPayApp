interface EmptyTransactionsProps {
  onSendMoney?: () => void
  onRequestMoney?: () => void
  accountType?: 'consumer' | 'merchant'
}

export default function EmptyTransactions({ onSendMoney, onRequestMoney, accountType = 'consumer' }: EmptyTransactionsProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 gap-6" style={{ minHeight: 480 }}>
      {/* Illustration */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-24 h-24 rounded-[28px] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.1) 0%, rgba(77,159,255,0.06) 100%)',
            border: '1px solid rgba(0,102,255,0.2)',
            boxShadow: '0 0 32px rgba(0,102,255,0.15)',
          }}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="6" y="10" width="28" height="22" rx="4" stroke="rgba(77,159,255,0.6)" strokeWidth="1.5" />
            <path d="M6 16h28" stroke="rgba(77,159,255,0.6)" strokeWidth="1.5" />
            <path d="M12 24h6M12 28h4" stroke="rgba(77,159,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="28" cy="26" r="4" fill="rgba(77,159,255,0.12)" stroke="rgba(77,159,255,0.5)" strokeWidth="1.2" />
            <path d="M26.5 26h3M28 24.5v3" stroke="rgba(77,159,255,0.7)" strokeWidth="1" strokeLinecap="round" />
          </svg>
        </div>
        <div
          className="absolute -right-2 -top-2 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6l4 4 4-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-2 max-w-[260px]">
        <p className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">
          {accountType === 'merchant' ? "No payments yet" : "Your first transfer awaits"}
        </p>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          {accountType === 'merchant'
            ? "Transactions will appear here once customers start paying you. Share your payment link or QR code to get started."
            : "Send or request money to see your transaction history here. Your payments, requests, and transfers all land in one place."}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-[260px]">
        <button
          onClick={onSendMoney}
          className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, rgba(0,102,255,0.3) 0%, rgba(77,159,255,0.15) 100%)',
            color: '#4D9FFF',
            border: '1px solid rgba(0,102,255,0.35)',
            boxShadow: '0 4px 16px rgba(0,102,255,0.15)',
          }}
        >
          {accountType === 'merchant' ? "Share payment link" : "Send money"}
        </button>
        <button
          onClick={onRequestMoney}
          className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: 'rgba(175,197,255,0.05)',
            color: 'rgba(175,197,255,0.7)',
            border: '1px solid rgba(175,197,255,0.12)',
          }}
        >
          {accountType === 'merchant' ? "Create invoice" : "Request money"}
        </button>
      </div>
    </div>
  )
}
