import { GlassCard, TransactionRow } from '@/components/Card'

interface LinkedBankDetailProps {
  bankName?: string
  bankAbbr?: string
  bankColor?: string
  accountType?: 'Checking' | 'Savings'
  maskedAccount?: string
  balance?: string
  lastSynced?: string
  onAddMoney?: () => void
  onWithdraw?: () => void
  onUnlink?: () => void
  onBack?: () => void
}

const RECENT_TX = [
  { id: '1', merchant: 'Add Money',   category: 'From Chase Checking', amount: '+$200.00', positive: true,  date: 'Today'  },
  { id: '2', merchant: 'Withdrawal',  category: 'To Chase Checking',   amount: '-$50.00',  positive: false, date: 'Mon'    },
  { id: '3', merchant: 'Add Money',   category: 'From Chase Checking', amount: '+$100.00', positive: true,  date: 'Aug 20' },
]

export default function LinkedBankDetail({
  bankName = 'Chase',
  bankAbbr = 'JP',
  bankColor = '#117ACA',
  accountType = 'Checking',
  maskedAccount = '••••4821',
  balance = '$3,241.80',
  lastSynced = '2 min ago',
  onAddMoney,
  onWithdraw,
  onUnlink,
  onBack,
}: LinkedBankDetailProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-body text-sm font-semibold text-text">Linked Account</p>
        <div className="w-11" />
      </div>

      <div className="overflow-y-auto px-5 pb-28 flex flex-col gap-5 pt-2" style={{ scrollbarWidth: 'none' }}>
        {/* Bank identity card */}
        <div
          className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-4"
          style={{
            background: `linear-gradient(135deg, ${bankColor}1A, rgba(5,11,45,0.98))`,
            border: `1px solid ${bankColor}40`,
            boxShadow: `0 8px 32px ${bankColor}1A`,
          }}
        >
          {/* Top row */}
          <div className="flex items-center gap-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center font-body font-bold text-white shrink-0"
              style={{ background: bankColor, fontSize: 15, boxShadow: `0 4px 16px ${bankColor}55` }}
            >
              {bankAbbr}
            </div>
            <div className="flex-1">
              <p className="font-display text-lg font-extrabold text-text leading-tight">{bankName}</p>
              <p className="font-body text-xs text-text-muted">{accountType} Account</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                <p className="font-body text-xs text-success font-semibold">Connected</p>
              </div>
            </div>
          </div>

          {/* Account row */}
          <div
            className="flex items-center justify-between px-3 py-2.5 rounded-[--radius-lg]"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <p className="font-body text-xs text-white/50">Account</p>
            <p className="font-mono text-sm font-semibold text-white">{maskedAccount}</p>
          </div>

          {/* Balance row */}
          <div className="flex flex-col gap-0.5">
            <p className="font-body text-xs text-white/40 uppercase tracking-wider">Bank balance</p>
            <p className="font-display text-3xl font-extrabold text-white tracking-tight">{balance}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 1v5M3 4l2 2 2-2" stroke="rgba(175,197,255,0.5)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="5" cy="8.5" r="0.7" fill="rgba(175,197,255,0.4)" />
              </svg>
              <p className="font-body text-[10px] text-white/40">Last synced {lastSynced}</p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex gap-3">
          <button
            onClick={onAddMoney}
            className="flex-1 h-14 rounded-[--radius-2xl] flex flex-col items-center justify-center gap-1 transition-all duration-[180ms] active:scale-[0.96]"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 20px rgba(0,102,255,0.25)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9h12" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p className="font-body text-xs font-semibold text-white">Add Money</p>
          </button>
          <button
            onClick={onWithdraw}
            className="flex-1 h-14 rounded-[--radius-2xl] flex flex-col items-center justify-center gap-1 transition-all duration-[180ms] active:scale-[0.96]"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3v12M3 9h12" stroke="rgba(175,197,255,0.7)" strokeWidth="1.8" strokeLinecap="round"
                style={{ transform: 'rotate(45deg)', transformOrigin: '9px 9px' }} />
              <path d="M3 9h12" stroke="rgba(175,197,255,0.7)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M9 3v12" stroke="rgba(175,197,255,0.7)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <p className="font-body text-xs font-semibold text-text-2">Withdraw</p>
          </button>
        </div>

        {/* Details */}
        <GlassCard>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Account details</p>
          {[
            { label: 'Institution',     value: bankName },
            { label: 'Account type',   value: accountType },
            { label: 'Account number', value: maskedAccount },
            { label: 'Balance sync',   value: 'Every 4 hours' },
            { label: 'Add money fee',  value: 'Free' },
            { label: 'Withdrawal fee', value: 'Free up to $400/mo' },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between py-1.5">
              <p className="font-body text-xs text-text-muted">{row.label}</p>
              <p className={`font-body text-sm ${row.label.includes('fee') ? 'text-success font-semibold' : 'text-text-2'}`}>{row.value}</p>
            </div>
          ))}
        </GlassCard>

        {/* Recent activity */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Recent activity</p>
          <div className="flex flex-col gap-2">
            {RECENT_TX.map(tx => (
              <TransactionRow
                key={tx.id}
                icon={
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    {tx.positive
                      ? <path d="M8 3v10M3 8h10" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
                      : <path d="M3 8h10" stroke="rgba(175,197,255,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    }
                  </svg>
                }
                merchant={tx.merchant}
                category={tx.category}
                amount={tx.amount}
                date={tx.date}
                positive={tx.positive}
              />
            ))}
          </div>
        </div>

        {/* Unlink */}
        <button
          onClick={onUnlink}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.98]"
          style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)', color: '#FF4D5A' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 9H3a3 3 0 0 1 0-6h2M9 5h2a3 3 0 0 1 0 6H9M4.5 7h5" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M2 2l10 10" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          Unlink {bankName}
        </button>
      </div>
    </div>
  )
}
