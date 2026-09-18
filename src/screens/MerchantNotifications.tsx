import { useState } from 'react'
import { MerchantBottomNav, type MerchantNavItem } from '@/components/Nav'

type NotifType = 'payment' | 'payout' | 'dispute' | 'verification'

interface MerchantNotif {
  id: string
  type: NotifType
  title: string
  body: string
  time: string
  read: boolean
  amount?: string
}

const INITIAL_NOTIFS: MerchantNotif[] = []

const TYPE_CONFIG: Record<NotifType, { color: string; bg: string; icon: React.ReactNode }> = {
  payment: {
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9l4 4 8-8" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  payout: {
    color: '#0066FF',
    bg: 'rgba(0,102,255,0.12)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 4v10M5 8l4-4 4 4" stroke="#0066FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  dispute: {
    color: '#F87171',
    bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L1.5 15h15L9 2z" stroke="#F87171" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 8v3M9 12.5v.5" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  verification: {
    color: '#9945FF',
    bg: 'rgba(153,69,255,0.12)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2l1.5 4.5H15l-4 2.5 1.5 4.5L9 11 5.5 13.5 7 9 3 6.5h4.5L9 2z" stroke="#9945FF" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
}

interface MerchantNotificationsProps {
  onNavigate?: (item: MerchantNavItem) => void
  onBack?: () => void
}

export default function MerchantNotifications({ onNavigate, onBack }: MerchantNotificationsProps) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS)
  const [activeNav, setActiveNav] = useState<MerchantNavItem>('home')

  const unread = notifs.filter(n => !n.read)
  const read = notifs.filter(n => n.read)

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))

  const handleNav = (item: MerchantNavItem) => {
    setActiveNav(item)
    onNavigate?.(item)
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Notifications</p>
        {unread.length > 0 && (
          <button
            onClick={markAllRead}
            className="font-body text-xs font-semibold"
            style={{ color: 'var(--color-accent)' }}
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-28 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Unread */}
        {unread.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">Unread</p>
              <span
                className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold"
                style={{ background: 'rgba(239,68,68,0.12)', color: '#F87171' }}
              >
                {unread.length}
              </span>
            </div>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)' }}
            >
              {unread.map((notif, i) => {
                const cfg = TYPE_CONFIG[notif.type]
                return (
                  <button
                    key={notif.id}
                    onClick={() => markRead(notif.id)}
                    className="w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-surface/50"
                    style={{
                      borderBottom: i < unread.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none',
                      background: 'rgba(0,102,255,0.03)',
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: cfg.bg }}
                    >
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-body text-xs font-semibold text-text">{notif.title}</p>
                        {notif.amount && (
                          <p
                            className="font-mono text-xs font-bold shrink-0"
                            style={{ color: notif.amount.startsWith('+') ? '#22C55E' : 'rgba(175,197,255,0.6)' }}
                          >
                            {notif.amount}
                          </p>
                        )}
                      </div>
                      <p className="font-body text-[10px] text-text-muted leading-relaxed mt-0.5">{notif.body}</p>
                      <p className="font-body text-[10px] mt-1.5" style={{ color: cfg.color }}>{notif.time}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: cfg.color }} />
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Earlier */}
        {read.length > 0 && (
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">Earlier</p>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.07)', background: 'rgba(175,197,255,0.01)' }}
            >
              {read.map((notif, i) => {
                const cfg = TYPE_CONFIG[notif.type]
                return (
                  <div
                    key={notif.id}
                    className="flex items-start gap-3 px-4 py-4"
                    style={{ borderBottom: i < read.length - 1 ? '1px solid rgba(175,197,255,0.05)' : 'none' }}
                  >
                    <div
                      className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0 mt-0.5 opacity-60"
                      style={{ background: cfg.bg }}
                    >
                      {cfg.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-body text-xs font-semibold text-text-muted">{notif.title}</p>
                        {notif.amount && (
                          <p className="font-mono text-xs text-text-muted shrink-0">{notif.amount}</p>
                        )}
                      </div>
                      <p className="font-body text-[10px] text-text-muted leading-relaxed mt-0.5 opacity-70">{notif.body}</p>
                      <p className="font-body text-[10px] text-text-muted mt-1">{notif.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <MerchantBottomNav active={activeNav} onChange={handleNav} />
    </div>
  )
}
