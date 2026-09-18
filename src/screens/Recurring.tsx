import { useState } from 'react'

interface RecurringProps {
  onManage?: (id: string) => void
  onBack?: () => void
}

interface RecurringItem {
  id: string
  merchant: string
  category: string
  frequency: string
  nextDate: string
  nextDateMs: number
  amount: string
  amountNum: number
  status: 'active' | 'paused'
  icon: React.ReactNode
  iconBg: string
}

const RECURRING_ITEMS: RecurringItem[] = []

function HeroNextPayment({ item }: { item: RecurringItem }) {
  return (
    <div
      className="rounded-[--radius-2xl] overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, rgba(0,25,80,0.95) 0%, rgba(5,11,45,0.98) 100%)',
        border: '1px solid rgba(0,102,255,0.22)',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 30% 0%, rgba(0,102,255,0.14) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 px-5 py-5 flex flex-col gap-4">
        {/* Label */}
        <div className="flex items-center justify-between">
          <p className="font-body text-[10px] font-bold uppercase tracking-widest text-text-muted">
            Next up
          </p>
          <div
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22C55E' }} />
            <p className="font-body text-[9px] font-bold uppercase tracking-widest" style={{ color: '#22C55E' }}>Active</p>
          </div>
        </div>

        {/* Main row: icon-dial + amount + info */}
        <div className="flex items-center gap-4">
          {/* Circular icon-dial */}
          <div className="relative shrink-0">
            {/* Outer ring dial */}
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none" className="absolute inset-0">
              <circle cx="34" cy="34" r="30" stroke="rgba(0,102,255,0.15)" strokeWidth="1" />
              <circle cx="34" cy="34" r="30" stroke="url(#dialGrad)" strokeWidth="2"
                strokeDasharray="157 188" strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
              <defs>
                <linearGradient id="dialGrad" x1="0" y1="0" x2="68" y2="68" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#3FE7FF" />
                  <stop offset="1" stopColor="#0066FF" />
                </linearGradient>
              </defs>
            </svg>
            {/* Icon container */}
            <div
              className="w-[68px] h-[68px] rounded-full flex items-center justify-center"
              style={{ background: item.iconBg, border: '1px solid rgba(175,197,255,0.1)' }}
            >
              {item.icon}
            </div>
          </div>

          {/* Amount + merchant */}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <p
              className="font-display font-extrabold leading-none tracking-tighter"
              style={{
                fontSize: 36,
                background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(175,197,255,0.75) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {item.amount}
            </p>
            <p className="font-body text-sm font-semibold text-text">{item.merchant}</p>
            <p className="font-body text-[10px] text-text-muted">{item.frequency} subscription</p>
          </div>
        </div>

        {/* Date chip */}
        <div
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-[--radius-xl] self-start"
          style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)' }}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="rgba(63,231,255,0.6)" strokeWidth="1" />
            <path d="M4 1v2M9 1v2M1 5h11" stroke="rgba(63,231,255,0.6)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs font-semibold" style={{ color: '#3FE7FF' }}>
            Due {item.nextDate}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Recurring({ onManage, onBack }: RecurringProps) {
  const [items, setItems] = useState<RecurringItem[]>([])

  const activeItems = items.filter(i => i.status === 'active')
  const pausedItems = items.filter(i => i.status === 'paused')
  const totalMonthly = activeItems.reduce((sum, i) => sum + i.amountNum, 0)

  // Earliest upcoming active item
  const heroItem = activeItems.reduce<RecurringItem | null>(
    (prev, cur) => (!prev || cur.nextDateMs < prev.nextDateMs ? cur : prev),
    null
  )

  const toggleStatus = (id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, status: i.status === 'active' ? 'paused' : 'active' } : i))
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Recurring</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Hero next payment */}
        {heroItem && <HeroNextPayment item={heroItem} />}

        {/* Monthly summary strip */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          <div>
            <p className="font-body text-[10px] text-text-muted">Active monthly total</p>
            <p
              className="font-display text-xl font-extrabold tracking-tighter"
              style={{
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              ${totalMonthly.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <p className="font-body text-xs text-text-muted">{activeItems.length} active</p>
            <p className="font-body text-xs text-text-muted">{pausedItems.length} paused</p>
          </div>
        </div>

        {/* Active list */}
        {activeItems.length > 0 && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">All active</p>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              {activeItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="px-4 py-3.5 flex items-center gap-3"
                  style={{ borderTop: idx > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: item.iconBg, border: '1px solid rgba(175,197,255,0.1)' }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-text">{item.merchant}</p>
                    <p className="font-body text-xs text-text-muted">{item.frequency} · Next {item.nextDate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <p className="font-body text-sm font-semibold text-text-2">{item.amount}</p>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => toggleStatus(item.id)}
                        className="h-6 px-2 rounded-full font-body text-[10px] font-semibold transition-all duration-[180ms]"
                        style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.25)', color: '#F5B700' }}
                      >
                        Pause
                      </button>
                      <button
                        onClick={() => onManage?.(item.id)}
                        className="h-6 px-2 rounded-full font-body text-[10px] font-semibold transition-all duration-[180ms]"
                        style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.15)', color: 'rgba(175,197,255,0.6)' }}
                      >
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Paused list */}
        {pausedItems.length > 0 && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Paused</p>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.07)' }}
            >
              {pausedItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="px-4 py-3.5 flex items-center gap-3 opacity-60"
                  style={{ borderTop: idx > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.08)' }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-text">{item.merchant}</p>
                    <p className="font-body text-xs text-text-muted">Paused · {item.frequency}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <p className="font-body text-sm font-semibold text-text-2">{item.amount}</p>
                    <button
                      onClick={() => toggleStatus(item.id)}
                      className="h-6 px-2 rounded-full font-body text-[10px] font-semibold transition-all duration-[180ms]"
                      style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', color: '#22C55E' }}
                    >
                      Resume
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
