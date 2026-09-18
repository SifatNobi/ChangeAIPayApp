import { useState } from 'react'
import { Header, BottomNav } from '@/components/Nav'

interface Notification {
  id: string
  title: string
  body: string
  time: string
  group: 'today' | 'earlier'
  read: boolean
  type: 'payment' | 'security' | 'system' | 'promo'
}

interface NotificationsProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
  onNotificationDetail?: (id: string) => void
  onNotifications?: () => void
}

const INITIAL_NOTIFICATIONS: Notification[] = []

const TYPE_ICON: Record<Notification['type'], React.ReactNode> = {
  payment: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="4" width="14" height="9" rx="2" stroke="#3FE7FF" strokeWidth="1.2" />
      <path d="M5 8h2m2 0h2" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  security: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1L2 3.8v5C2 12 4.5 14 8 15c3.5-1 6-3 6-6.2V3.8L8 1Z"
        stroke="#F59E0B" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="8" y1="5" x2="8" y2="8" stroke="#F59E0B" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="10" r="0.8" fill="#F59E0B" />
    </svg>
  ),
  system: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="#AFC5FF" strokeWidth="1.2" />
      <line x1="8" y1="5" x2="8" y2="8.5" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.8" fill="#AFC5FF" />
    </svg>
  ),
  promo: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l2 4.5h5l-4 3 1.5 5L8 12l-4.5 2.5 1.5-5-4-3H5L8 2Z"
        stroke="#0066FF" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
}

const TYPE_BG: Record<Notification['type'], string> = {
  payment:  'rgba(63,231,255,0.08)',
  security: 'rgba(245,158,11,0.08)',
  system:   'rgba(175,197,255,0.06)',
  promo:    'rgba(0,102,255,0.08)',
}

export default function Notifications({
  accountType = 'personal',
  onNavigate,
  onBack,
  onNotificationDetail,
  onNotifications,
}: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())
  const [swipingId, setSwipingId] = useState<string | null>(null)

  const visible = notifications.filter(n => !dismissed.has(n.id))
  const unreadCount = visible.filter(n => !n.read).length

  const today   = visible.filter(n => n.group === 'today')
  const earlier = visible.filter(n => n.group === 'earlier')

  const markAllRead = () =>
    setNotifications(ns => ns.map(n => ({ ...n, read: true })))

  const dismiss = (id: string) =>
    setDismissed(s => new Set([...s, id]))

  const markRead = (id: string) =>
    setNotifications(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))

  function NotifRow({ n }: { n: Notification }) {
    const isSwiping = swipingId === n.id
    return (
      <button
        onClick={() => { markRead(n.id); onNotificationDetail?.(n.id) }}
        onPointerDown={() => setSwipingId(n.id)}
        onPointerUp={() => setSwipingId(null)}
        className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-hi active:bg-surface-hi relative"
        style={{ background: isSwiping ? 'rgba(255,77,77,0.06)' : undefined }}
      >
        {/* Unread dot */}
        {!n.read && (
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent" />
        )}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ background: TYPE_BG[n.type] }}
        >
          {TYPE_ICON[n.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <p className={`font-body text-sm truncate ${n.read ? 'font-medium text-text-2' : 'font-semibold text-text'}`}>
              {n.title}
            </p>
            <p className="font-body text-[10px] text-text-muted shrink-0">{n.time}</p>
          </div>
          <p className="font-body text-xs text-text-muted leading-relaxed line-clamp-2">{n.body}</p>
        </div>
        {/* Swipe-to-dismiss hint */}
        {isSwiping && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button
              onClick={e => { e.stopPropagation(); dismiss(n.id) }}
              className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(255,77,77,0.2)' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 3l6 6M9 3l-6 6" stroke="#FF4D4D" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        )}
      </button>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <Header notificationCount={unreadCount} onNotification={onNotifications} />

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Title row */}
        <div className="flex items-center justify-between px-5 pt-3 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Notifications</h1>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="font-body text-xs font-semibold text-accent px-2 py-1 min-h-[44px] flex items-center"
            >
              Mark all read
            </button>
          )}
        </div>

        {visible.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 px-6 py-20">
            <div className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4a8 8 0 0 1 8 8v3l2 3H4l2-3v-3a8 8 0 0 1 8-8Z"
                  stroke="rgba(175,197,255,0.3)" strokeWidth="1.4" />
                <path d="M11 22a3 3 0 0 0 6 0" stroke="rgba(175,197,255,0.3)" strokeWidth="1.4" />
              </svg>
            </div>
            <p className="font-body text-sm text-text-muted text-center">All caught up! No notifications.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {today.length > 0 && (
              <div>
                <p className="font-body text-xs font-semibold text-text-muted px-5 mb-1 uppercase tracking-wider">Today</p>
                <div className="bg-surface border-y border-[color:var(--color-border)] divide-y divide-[color:var(--color-border)]">
                  {today.map(n => <NotifRow key={n.id} n={n} />)}
                </div>
              </div>
            )}
            {earlier.length > 0 && (
              <div>
                <p className="font-body text-xs font-semibold text-text-muted px-5 mb-1 uppercase tracking-wider">Earlier</p>
                <div className="bg-surface border-y border-[color:var(--color-border)] divide-y divide-[color:var(--color-border)]">
                  {earlier.map(n => <NotifRow key={n.id} n={n} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
