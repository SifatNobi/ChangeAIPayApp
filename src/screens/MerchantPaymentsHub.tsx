import { useState } from 'react'
import { MerchantBottomNav, type MerchantNavItem } from '@/components/Nav'

type PaymentMethod = 'invoice' | 'qr' | 'request' | 'paymentLinks' | 'recurringBilling' | 'disputes'

interface MerchantPaymentsHubProps {
  onNavigate?: (item: MerchantNavItem) => void
  onCreateInvoice?: () => void
  onGenerateQR?: () => void
  onRequestPayment?: () => void
  onPaymentLinks?: () => void
  onRecurringBilling?: () => void
  onDisputes?: () => void
  onBack?: () => void
}

const METHODS: { id: PaymentMethod; label: string; sub: string; color: string; bg: string; icon: React.ReactNode }[] = [
  {
    id: 'invoice',
    label: 'Create Invoice',
    sub: 'Itemized bill — email or link delivery, auto-reminders',
    color: '#0066FF',
    bg: 'linear-gradient(135deg, rgba(0,40,100,0.95), rgba(13,26,74,0.98))',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="4" y="3" width="18" height="20" rx="3" stroke="#0066FF" strokeWidth="1.5" />
        <path d="M9 9h8M9 13h8M9 17h5" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'qr',
    label: 'Generate QR Code',
    sub: 'Fixed or open amount — display, share, or print',
    color: '#9945FF',
    bg: 'linear-gradient(135deg, rgba(50,10,100,0.92), rgba(30,10,70,0.98))',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#9945FF" strokeWidth="1.5" />
        <rect x="15" y="3" width="8" height="8" rx="1.5" stroke="#9945FF" strokeWidth="1.5" />
        <rect x="3" y="15" width="8" height="8" rx="1.5" stroke="#9945FF" strokeWidth="1.5" />
        <path d="M15 15h3v3h-3zM20 15v3h3v-3h-3zM15 21h3M20 21h3v2h-5v-2" stroke="#9945FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'request',
    label: 'Request Payment',
    sub: 'Quick request with amount — send to anyone by link',
    color: '#3FE7FF',
    bg: 'linear-gradient(135deg, rgba(0,50,80,0.92), rgba(0,30,60,0.98))',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="9" stroke="#3FE7FF" strokeWidth="1.5" />
        <path d="M13 8v5l3.5 2" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'paymentLinks',
    label: 'Payment Links',
    sub: 'Shareable links — fixed or open amount, one-time or reusable',
    color: '#22C55E',
    bg: 'linear-gradient(135deg, rgba(0,60,30,0.92), rgba(0,40,20,0.98))',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M10.5 15.5l5-5M8 14l-1.5 1.5a3.5 3.5 0 0 0 4.95 4.95L13 19M13 7l1.5-1.5a3.5 3.5 0 0 1 4.95 4.95L18 12" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'recurringBilling',
    label: 'Recurring Billing',
    sub: 'Subscription plans — weekly, monthly, or yearly billing',
    color: '#F5B700',
    bg: 'linear-gradient(135deg, rgba(60,40,0,0.92), rgba(40,28,0,0.98))',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 4v4M13 18v4M4 13h4M18 13h4" stroke="#F5B700" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="13" cy="13" r="6" stroke="#F5B700" strokeWidth="1.5" />
        <path d="M11 11h2.5v2.5" stroke="#F5B700" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'disputes',
    label: 'Disputes',
    sub: 'Respond to customer disputes and chargebacks',
    color: '#FF4D5A',
    bg: 'linear-gradient(135deg, rgba(70,10,15,0.92), rgba(50,5,10,0.98))',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M13 8v6M13 17v1" stroke="#FF4D5A" strokeWidth="2" strokeLinecap="round" />
        <path d="M12.134 4.5l-9 15.588A1 1 0 0 0 4 21.5h18a1 1 0 0 0 .866-1.5l-9-15.588a1 1 0 0 0-1.732 0Z" stroke="#FF4D5A" strokeWidth="1.5" />
      </svg>
    ),
  },
]

const RECENT_PAYMENTS: { id: string; label: string; customer: string; amount: string; status: string; statusColor: string; time: string }[] = []

export default function MerchantPaymentsHub({
  onNavigate,
  onCreateInvoice,
  onGenerateQR,
  onRequestPayment,
  onPaymentLinks,
  onRecurringBilling,
  onDisputes,
  onBack,
}: MerchantPaymentsHubProps) {
  const [activeNav, setActiveNav] = useState<MerchantNavItem>('payments')

  const handleNav = (item: MerchantNavItem) => {
    setActiveNav(item)
    onNavigate?.(item)
  }

  const handleMethod = (id: PaymentMethod) => {
    if (id === 'invoice') onCreateInvoice?.()
    else if (id === 'qr') onGenerateQR?.()
    else if (id === 'request') onRequestPayment?.()
    else if (id === 'paymentLinks') onPaymentLinks?.()
    else if (id === 'recurringBilling') onRecurringBilling?.()
    else if (id === 'disputes') onDisputes?.()
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Payments</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Summary strip */}
        <div className="flex gap-3">
          {[
            { label: "Today's In", value: '$0', color: '#22C55E' },
            { label: 'Pending', value: '$0', color: '#F5B700' },
            { label: 'Overdue', value: '$0', color: 'rgba(175,197,255,0.5)' },
          ].map(stat => (
            <div
              key={stat.label}
              className="flex-1 px-3 py-3 rounded-[--radius-xl] text-center"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              <p className="font-display text-base font-extrabold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="font-body text-[9px] text-text-muted mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Accept payment methods */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Accept Payment</p>
          <div className="flex flex-col gap-3">
            {METHODS.map(method => (
              <button
                key={method.id}
                onClick={() => handleMethod(method.id)}
                className="flex items-center gap-4 px-5 py-4 rounded-[--radius-2xl] text-left transition-all active:scale-[0.98]"
                style={{
                  background: method.bg,
                  border: `1px solid ${method.color}28`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.2), 0 0 0 0.5px ${method.color}18`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0"
                  style={{ background: `${method.color}18`, border: `1px solid ${method.color}30` }}
                >
                  {method.icon}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{method.label}</p>
                  <p className="font-body text-[10px] text-text-muted leading-snug mt-0.5">{method.sub}</p>
                </div>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Recent payment activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Recent Payments</p>
            <button className="font-body text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>View all</button>
          </div>
          <div
            className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
          >
            {RECENT_PAYMENTS.map((p, i) => (
              <div
                key={p.id}
                className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderBottom: i < RECENT_PAYMENTS.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-body text-xs font-semibold text-text">{p.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{p.customer} · {p.time}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono text-xs font-semibold text-text">{p.amount}</p>
                  <p
                    className="font-body text-[10px] font-semibold capitalize"
                    style={{ color: p.statusColor }}
                  >
                    {p.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MerchantBottomNav active={activeNav} onChange={handleNav} />
    </div>
  )
}
