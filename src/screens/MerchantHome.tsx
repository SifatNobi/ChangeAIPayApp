import { useState } from 'react'
import { MerchantBottomNav, type MerchantNavItem } from '@/components/Nav'
import logoSrc from '@/imports/logo.png.jpeg'
import ainaSrc from '@/imports/Aina.png.jpeg'

interface MerchantHomeProps {
  businessName?: string
  onNavigate?: (item: MerchantNavItem) => void
  onNotifications?: () => void
  onCreateInvoice?: () => void
  onGenerateQR?: () => void
  onViewPayout?: () => void
  onSendMoney?: () => void
  onTransactionDetail?: (id: string) => void
  onSeeAllTransactions?: () => void
  onPlans?: () => void
  onFeatureRequests?: () => void
  onInstitutionalPayments?: () => void
  onRiskFraud?: () => void
  isEnterprise?: boolean
}

const QUICK_ACTIONS = [
  {
    id: 'invoice',
    label: 'Create\nInvoice',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="2" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 7h8M7 11h8M7 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: '#0066FF',
    bg: 'rgba(0,102,255,0.12)',
  },
  {
    id: 'qr',
    label: 'Generate\nQR',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2.5" y="2.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12.5" y="2.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2.5" y="12.5" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 13h2v2h-2zM17 13v2h2v-2h-2zM13 17h2M17 17h2v2h-4v-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#9945FF',
    bg: 'rgba(153,69,255,0.12)',
  },
  {
    id: 'payout',
    label: 'View\nPayout',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 4v14M6 9l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 18h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.12)',
  },
  {
    id: 'send',
    label: 'Send\nMoney',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 11h14M12 5l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: '#3FE7FF',
    bg: 'rgba(63,231,255,0.12)',
  },
  {
    id: 'plans',
    label: 'Plans',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2.5l2 5.5h5.5l-4.5 3.5 1.5 5.5L11 14l-4.5 3 1.5-5.5L3.5 8H9l2-5.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    color: '#F5B700',
    bg: 'rgba(245,183,0,0.1)',
  },
  {
    id: 'requests',
    label: 'Feature\nRequests',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 4v14M4 11h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    color: '#3FE7FF',
    bg: 'rgba(63,231,255,0.08)',
  },
]

const RECENT_TXS: { id: string; customer: string; type: string; amount: string; time: string; initials: string; color: string }[] = []

export default function MerchantHome({
  businessName = '',
  onNavigate,
  onNotifications,
  onCreateInvoice,
  onGenerateQR,
  onViewPayout,
  onSendMoney,
  onTransactionDetail,
  onSeeAllTransactions,
  onPlans,
  onFeatureRequests,
  onInstitutionalPayments,
  onRiskFraud,
  isEnterprise = false,
}: MerchantHomeProps) {
  const [activeNav, setActiveNav] = useState<MerchantNavItem>('home')

  const handleNav = (item: MerchantNavItem) => {
    setActiveNav(item)
    onNavigate?.(item)
  }

  const handleAction = (id: string) => {
    if (id === 'invoice') onCreateInvoice?.()
    else if (id === 'qr') onGenerateQR?.()
    else if (id === 'payout') onViewPayout?.()
    else if (id === 'send') onSendMoney?.()
    else if (id === 'plans') onPlans?.()
    else if (id === 'requests') onFeatureRequests?.()
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 flex items-center justify-center" style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}>
              <img src={logoSrc} alt="ChangeAIPay" className="w-full h-full object-cover" />
            </div>
          <div>
            <p className="font-body text-[10px] text-text-muted leading-none">Merchant</p>
            <p className="font-display text-sm font-extrabold text-text leading-tight">{businessName}</p>
          </div>
        </div>
        <button
          onClick={onNotifications}
          className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
          aria-label="Notifications"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2.5A5.5 5.5 0 0 0 4.5 8v2.5L3 13h14l-1.5-2.5V8A5.5 5.5 0 0 0 10 2.5Z" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 13v.5a2 2 0 0 0 4 0V13" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#F5B700]" />
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto px-5 pb-28 flex flex-col gap-5"
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Revenue snapshot card */}
        <div
          className="rounded-[--radius-2xl] px-5 pt-5 pb-4"
          style={{
            background: 'linear-gradient(135deg, rgba(0,40,100,0.95) 0%, rgba(13,26,74,0.98) 100%)',
            border: '1px solid rgba(0,102,255,0.25)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted mb-1">Today's Revenue</p>
              <p className="font-display text-3xl font-extrabold text-white leading-none">$0.00</p>
              <div className="flex items-center gap-1.5 mt-1.5">
                <span
                  className="font-body text-xs font-semibold"
                  style={{ color: '#22C55E' }}
                >
                  +0.0%
                </span>
                <span className="font-body text-[10px] text-text-muted">vs yesterday</span>
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-full font-body text-[10px] font-semibold"
              style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)' }}
            >
              0 payments
            </div>
          </div>

          {/* Mini bar chart */}
          <div className="flex items-end gap-1.5 h-10">
            {[0, 0, 0, 0, 0, 0, 0].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background: i === 6
                    ? 'linear-gradient(to top, #0066FF, #3FE7FF)'
                    : 'rgba(175,197,255,0.12)',
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <p key={i} className="flex-1 text-center font-body text-[9px] text-text-muted"
                style={{ color: i === 6 ? 'rgba(63,231,255,0.8)' : undefined }}>
                {d}
              </p>
            ))}
          </div>

          {/* Stat row */}
          <div className="flex gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(175,197,255,0.1)' }}>
            {[
              { label: 'This Week', value: '$0.00' },
              { label: 'This Month', value: '$0.00' },
              { label: 'Pending', value: '$0.00' },
            ].map(stat => (
              <div key={stat.label} className="flex-1 text-center">
                <p className="font-display text-sm font-bold text-white">{stat.value}</p>
                <p className="font-body text-[9px] text-text-muted mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Quick Actions</p>
          <div className="grid grid-cols-3 gap-3">
            {QUICK_ACTIONS.map(action => (
              <button
                key={action.id}
                onClick={() => handleAction(action.id)}
                className="flex flex-col items-center gap-2 transition-all active:scale-95"
              >
                <div
                  className="w-14 h-14 rounded-[18px] flex items-center justify-center"
                  style={{
                    background: action.bg,
                    border: `1px solid ${action.color}30`,
                    color: action.color,
                    boxShadow: `0 4px 12px ${action.color}20`,
                  }}
                >
                  {action.icon}
                </div>
                <p
                  className="font-body text-[10px] font-medium text-center leading-tight whitespace-pre-line"
                  style={{ color: 'rgba(175,197,255,0.7)' }}
                >
                  {action.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Recent Activity</p>
            <button onClick={onSeeAllTransactions} className="font-body text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
              See all
            </button>
          </div>
          <div
            className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
          >
            {RECENT_TXS.map((tx, i) => (
              <button
                key={tx.id}
                onClick={() => onTransactionDetail?.(tx.id)}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface/50"
                style={{ borderBottom: i < RECENT_TXS.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-display text-xs font-bold text-white shrink-0"
                  style={{ background: `${tx.color}22`, color: tx.color, border: `1px solid ${tx.color}40` }}
                >
                  {tx.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs font-semibold text-text truncate">{tx.customer}</p>
                  <p className="font-body text-[10px] text-text-muted">{tx.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <p
                    className="font-mono text-xs font-semibold"
                    style={{ color: tx.amount.startsWith('+') ? '#22C55E' : 'rgba(175,197,255,0.6)' }}
                  >
                    {tx.amount}
                  </p>
                  <p className="font-body text-[10px] text-text-muted">{tx.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Enterprise: Institutional Payments entry card */}
        {isEnterprise && (
          <button
            onClick={onInstitutionalPayments}
            className="w-full text-left rounded-[--radius-2xl] px-5 py-4 flex items-center gap-4 transition-all active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, rgba(0,20,60,0.96) 0%, rgba(0,40,100,0.92) 100%)',
              border: '1px solid rgba(0,102,255,0.35)',
              boxShadow: '0 4px 24px rgba(0,102,255,0.18)',
            }}
          >
            <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,102,255,0.15)', border: '1px solid rgba(0,102,255,0.35)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <rect x="2" y="6" width="18" height="13" rx="2" stroke="#3FE7FF" strokeWidth="1.4" />
                <path d="M7 6V4a4 4 0 0 1 8 0v2" stroke="#3FE7FF" strokeWidth="1.4" strokeLinecap="round" />
                <path d="M7 12h8M7 15.5h5" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-display text-sm font-extrabold text-white">Institutional Payments</p>
                <span className="h-4 px-1.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider"
                  style={{ background: 'rgba(63,231,255,0.15)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.3)' }}>
                  Enterprise
                </span>
              </div>
              <p className="font-body text-[11px] text-text-muted">Capital markets settlement &amp; counterparty tools</p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 4l4 4-4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Risk & Fraud Center entry card */}
        <button
          onClick={onRiskFraud}
          className="w-full text-left rounded-[--radius-2xl] px-5 py-4 flex items-center gap-4 transition-all active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, rgba(60,5,10,0.95) 0%, rgba(40,0,8,0.98) 100%)',
            border: '1px solid rgba(255,77,90,0.25)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <div className="w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0"
            style={{ background: 'rgba(255,77,90,0.12)', border: '1px solid rgba(255,77,90,0.3)' }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 4l-8 14h16L11 4Z" stroke="#FF4D5A" strokeWidth="1.4" strokeLinejoin="round" />
              <path d="M11 10v3M11 15.5v.5" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display text-sm font-extrabold text-white mb-0.5">Risk &amp; Fraud Center</p>
            <p className="font-body text-[11px] text-text-muted"></p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4l4 4-4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Aina suggestion card */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex items-start gap-3"
          style={{
            background: 'linear-gradient(135deg, rgba(0,30,80,0.92) 0%, rgba(13,26,74,0.98) 100%)',
            border: '1px solid rgba(0,102,255,0.22)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}
        >
          <img
            src={ainaSrc}
            alt="Aina"
            className="w-10 h-10 rounded-[13px] object-cover shrink-0"
            style={{ border: '1.5px solid rgba(0,102,255,0.5)', boxShadow: '0 0 12px rgba(0,102,255,0.35)' }}
          />
          <div className="flex-1">
            <p className="font-body text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: '#3FE7FF' }}>
              Aina Insight
            </p>
            <p className="font-body text-xs text-text-muted leading-relaxed">
            </p>
            <button
              className="mt-2 font-body text-xs font-semibold"
              style={{ color: 'var(--color-accent)' }}
            >
              Schedule payout →
            </button>
          </div>
        </div>
      </div>

      <MerchantBottomNav active={activeNav} onChange={handleNav} />
    </div>
  )
}
