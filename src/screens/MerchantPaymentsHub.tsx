import { useState } from 'react'
import { MerchantBottomNav, type MerchantNavItem } from '@/components/Nav'

type PaymentMethod = 'invoice' | 'qr' | 'request'

interface MerchantPaymentsHubProps {
  onNavigate?: (item: MerchantNavItem) => void
  onCreateInvoice?: () => void
  onGenerateQR?: () => void
  onRequestPayment?: () => void
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
]

const RECENT_PAYMENTS = [
  { id: '1', label: 'Invoice #INV-084', customer: 'Office Supplies Co', amount: '$320.00', status: 'paid', statusColor: '#22C55E', time: '1h ago' },
  { id: '2', label: 'QR Payment', customer: 'J. Kim', amount: '$75.00', status: 'paid', statusColor: '#22C55E', time: '3h ago' },
  { id: '3', label: 'Invoice #INV-083', customer: 'Sunrise Café', amount: '$148.50', status: 'paid', statusColor: '#22C55E', time: 'Yesterday' },
  { id: '4', label: 'Invoice #INV-082', customer: 'Peak Media Ltd', amount: '$860.00', status: 'pending', statusColor: '#F5B700', time: '2 days ago' },
]

export default function MerchantPaymentsHub({
  onNavigate,
  onCreateInvoice,
  onGenerateQR,
  onRequestPayment,
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
            { label: "Today's In", value: '$543', color: '#22C55E' },
            { label: 'Pending', value: '$860', color: '#F5B700' },
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
