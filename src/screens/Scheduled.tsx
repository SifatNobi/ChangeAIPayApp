interface ScheduledProps {
  onEdit?: (id: string) => void
  onCancel?: (id: string) => void
  onBack?: () => void
}

interface ScheduledPayment {
  id: string
  recipient: string
  handle?: string
  amount: string
  amountNum: number
  scheduledDate: string
  scheduledDateMs: number
  scheduledTime: string
  note?: string
  status: 'upcoming' | 'processing'
}

const SCHEDULED_PAYMENTS: ScheduledPayment[] = []

function StatusChip({ status }: { status: ScheduledPayment['status'] }) {
  const cfg = status === 'processing'
    ? { label: 'Processing', color: '#F5B700', bg: 'rgba(245,183,0,0.1)', border: 'rgba(245,183,0,0.25)' }
    : { label: 'Upcoming', color: '#3FE7FF', bg: 'rgba(63,231,255,0.08)', border: 'rgba(63,231,255,0.2)' }
  return (
    <div className="flex items-center gap-1 h-5 px-2 rounded-full" style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
      <div className="w-1 h-1 rounded-full" style={{ background: cfg.color }} />
      <p className="font-body text-[10px] font-semibold" style={{ color: cfg.color }}>{cfg.label}</p>
    </div>
  )
}

function getInitials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function HeroNextPayment({ payment, onEdit, onCancel }: {
  payment: ScheduledPayment
  onEdit?: (id: string) => void
  onCancel?: (id: string) => void
}) {
  const initials = getInitials(payment.recipient)

  return (
    <div
      className="rounded-[--radius-2xl] overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, rgba(0,25,80,0.95) 0%, rgba(5,11,45,0.98) 100%)',
        border: '1px solid rgba(63,231,255,0.18)',
      }}
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 55% at 25% 0%, rgba(63,231,255,0.10) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 px-5 pt-5 pb-4 flex flex-col gap-4">
        {/* Label + status */}
        <div className="flex items-center justify-between">
          <p className="font-body text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Next scheduled
          </p>
          <StatusChip status={payment.status} />
        </div>

        {/* Main: circular icon-dial + amount + recipient */}
        <div className="flex items-center gap-4">
          {/* Circular icon-dial */}
          <div className="relative shrink-0" style={{ width: 68, height: 68 }}>
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="absolute inset-0">
              <circle cx="34" cy="34" r="30" stroke="rgba(63,231,255,0.12)" strokeWidth="1" />
              <circle cx="34" cy="34" r="30" stroke="url(#schedDialGrad)" strokeWidth="2"
                strokeDasharray="170 188" strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
              <defs>
                <linearGradient id="schedDialGrad" x1="0" y1="0" x2="68" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3FE7FF" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
            {/* Avatar circle */}
            <div
              className="absolute inset-0 rounded-full flex items-center justify-center font-body text-sm font-extrabold text-white"
              style={{
                background: 'linear-gradient(135deg, rgba(0,102,255,0.65), rgba(63,231,255,0.35))',
                border: '1px solid rgba(63,231,255,0.15)',
              }}
            >
              {initials}
            </div>
          </div>

          {/* Amount + recipient */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p
              className="font-display font-extrabold leading-none tracking-tighter"
              style={{
                fontSize: 36,
                background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(175,197,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {payment.amount}
            </p>
            <p className="font-body text-sm font-semibold text-text">{payment.recipient}</p>
            {payment.handle && (
              <p className="font-mono text-xs text-text-muted">{payment.handle}</p>
            )}
          </div>
        </div>

        {/* Date/time + note chip row */}
        <div className="flex items-center gap-2 flex-wrap">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.2)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="1" y="1.5" width="10" height="9" rx="1.5" stroke="rgba(63,231,255,0.65)" strokeWidth="1" />
              <path d="M3.5 1v1.5M8.5 1v1.5M1 4h10" stroke="rgba(63,231,255,0.65)" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <p className="font-body text-xs font-semibold" style={{ color: '#3FE7FF' }}>
              {payment.scheduledDate} · {payment.scheduledTime}
            </p>
          </div>
          {payment.note && (
            <p
              className="font-body text-xs italic"
              style={{ color: 'rgba(175,197,255,0.4)' }}
            >
              "{payment.note}"
            </p>
          )}
        </div>

        {/* Inline actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit?.(payment.id)}
            disabled={payment.status === 'processing'}
            className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold text-text-muted flex items-center justify-center gap-1.5 transition-all duration-[180ms] disabled:opacity-30"
            style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.15)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7Z" stroke="rgba(175,197,255,0.5)" strokeWidth="1" strokeLinejoin="round" />
            </svg>
            Edit
          </button>
          <button
            onClick={() => onCancel?.(payment.id)}
            disabled={payment.status === 'processing'}
            className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-[180ms] disabled:opacity-30"
            style={{ background: 'rgba(255,77,90,0.08)', border: '1px solid rgba(255,77,90,0.2)', color: '#FF4D5A' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 3L3 9M3 3l6 6" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Scheduled({ onEdit, onCancel, onBack }: ScheduledProps) {
  // Next upcoming payment (earliest non-processing)
  const heroPayment = SCHEDULED_PAYMENTS
    .filter(p => p.status === 'upcoming')
    .reduce<ScheduledPayment | null>(
      (prev, cur) => (!prev || cur.scheduledDateMs < prev.scheduledDateMs ? cur : prev),
      null
    )

  // Remaining payments (not the hero)
  const restPayments = SCHEDULED_PAYMENTS.filter(p => p.id !== heroPayment?.id)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Scheduled</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Hero next payment */}
        {heroPayment && (
          <HeroNextPayment payment={heroPayment} onEdit={onEdit} onCancel={onCancel} />
        )}

        {/* Info banner */}
        <div
          className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
            <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1.1" />
            <path d="M7 4.5v3L8.5 9" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            Payments send automatically. Edit or cancel up to 1 hour before the scheduled time.
          </p>
        </div>

        {/* Remaining payments */}
        {restPayments.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
              Also scheduled
            </p>
            {restPayments.map(p => (
              <div
                key={p.id}
                className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
              >
                {/* Top row */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold text-white shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.7), rgba(63,231,255,0.4))' }}
                  >
                    {getInitials(p.recipient)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-text">{p.recipient}</p>
                    {p.handle && <p className="font-mono text-xs text-text-muted">{p.handle}</p>}
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <p className="font-body text-sm font-semibold text-text-2">{p.amount}</p>
                    <StatusChip status={p.status} />
                  </div>
                </div>

                {/* Date row */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-[--radius-xl]"
                  style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect x="1" y="1.5" width="10" height="9" rx="1.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" />
                    <path d="M3.5 1v1.5M8.5 1v1.5M1 4h10" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <p className="font-body text-xs text-text-muted flex-1">{p.scheduledDate} at {p.scheduledTime}</p>
                  {p.note && (
                    <p className="font-body text-xs text-text-muted italic truncate max-w-[110px]">"{p.note}"</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit?.(p.id)}
                    disabled={p.status === 'processing'}
                    className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold text-text-muted flex items-center justify-center gap-1.5 transition-all duration-[180ms] disabled:opacity-30"
                    style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7Z" stroke="rgba(175,197,255,0.5)" strokeWidth="1" strokeLinejoin="round" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => onCancel?.(p.id)}
                    disabled={p.status === 'processing'}
                    className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all duration-[180ms] disabled:opacity-30"
                    style={{ background: 'rgba(255,77,90,0.08)', border: '1px solid rgba(255,77,90,0.2)', color: '#FF4D5A' }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M9 3L3 9M3 3l6 6" stroke="#FF4D5A" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {SCHEDULED_PAYMENTS.length === 0 && (
          <div className="flex flex-col items-center gap-3 pt-16">
            <div
              className="w-16 h-16 rounded-[--radius-2xl] flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="3" y="4" width="20" height="18" rx="2.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" />
                <path d="M8 2v4M18 2v4M3 10h20" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-body text-sm font-semibold text-text-muted">No scheduled payments</p>
            <p className="font-body text-xs text-text-muted text-center">Payments you schedule will appear here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
