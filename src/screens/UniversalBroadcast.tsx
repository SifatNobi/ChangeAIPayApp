import { useState } from 'react'

type BroadcastType = 'feature' | 'update' | 'security' | 'promo' | 'maintenance' | 'policy'

interface BroadcastMessage {
  id: string
  type: BroadcastType
  title: string
  preview: string
  date: string
  isRead: boolean
  isPersistent?: boolean
  audience?: 'all' | 'consumer' | 'merchant'
}

const TYPE_CFG: Record<BroadcastType, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  feature: {
    label: 'New Feature',
    color: '#3FE7FF',
    bg: 'rgba(63,231,255,0.08)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5L7 1z" stroke="#3FE7FF" strokeWidth="1" strokeLinejoin="round" />
      </svg>
    ),
  },
  update: {
    label: 'App Update',
    color: '#4D9FFF',
    bg: 'rgba(0,102,255,0.08)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="#4D9FFF" strokeWidth="1" />
        <path d="M7 4v3.5l2 1.5" stroke="#4D9FFF" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  security: {
    label: 'Security',
    color: '#F5B700',
    bg: 'rgba(245,183,0,0.08)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5L2 3.5V7c0 2.5 2 4.5 5 5.5 3-1 5-3 5-5.5V3.5L7 1.5z" stroke="#F5B700" strokeWidth="1" strokeLinejoin="round" />
        <path d="M7 5v2.5M7 9v.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  promo: {
    label: 'Promotional',
    color: '#9945FF',
    bg: 'rgba(153,69,255,0.08)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 7.5L7 2l5 5.5-5 5L2 7.5z" stroke="#9945FF" strokeWidth="1" strokeLinejoin="round" />
        <circle cx="7" cy="7.5" r="1.5" fill="#9945FF" />
      </svg>
    ),
  },
  maintenance: {
    label: 'Maintenance',
    color: 'rgba(175,197,255,0.7)',
    bg: 'rgba(175,197,255,0.06)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="5.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1" />
        <path d="M4 7h6M7 4v6" stroke="rgba(175,197,255,0.6)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  policy: {
    label: 'Policy Update',
    color: 'rgba(175,197,255,0.6)',
    bg: 'rgba(175,197,255,0.05)',
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M3 2h8v10H3V2z" stroke="rgba(175,197,255,0.6)" strokeWidth="1" strokeLinejoin="round" />
        <path d="M5 5h4M5 7h4M5 9h2" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
}

const MESSAGES: BroadcastMessage[] = [
  {
    id: '1', type: 'security', title: 'Action required: Verify your recovery email',
    preview: 'Your recovery email on file has not been verified. Verify it now to ensure uninterrupted account access.',
    date: 'Today, 9:04 AM', isRead: false, isPersistent: true, audience: 'all',
  },
  {
    id: '2', type: 'feature', title: 'Introducing Aina for Business',
    preview: 'Meet Aina — your AI financial partner for business accounts. Revenue insights, cash flow analysis, and proactive recommendations.',
    date: 'Today, 8:00 AM', isRead: false, audience: 'merchant',
  },
  {
    id: '3', type: 'update', title: 'App update 4.3.0 available',
    preview: 'Faster payments, improved Fina chat accuracy, and a redesigned transaction search. Update when ready.',
    date: 'Yesterday', isRead: false, audience: 'all',
  },
  {
    id: '4', type: 'promo', title: 'Three months of Prime — on us',
    preview: "You've been a ChangeAIPay member for over a year. Here's three months of Prime, complimentary.",
    date: 'Sep 1', isRead: true, audience: 'consumer',
  },
  {
    id: '5', type: 'maintenance', title: 'Scheduled maintenance — Sunday 2–4 AM PT',
    preview: 'Payment processing will be briefly unavailable during maintenance. Scheduled payments will not be affected.',
    date: 'Aug 30', isRead: true, audience: 'all',
  },
  {
    id: '6', type: 'feature', title: 'Savings goals now support milestones',
    preview: 'Break any goal into monthly milestones. Fina will track your progress and nudge you if you fall behind.',
    date: 'Aug 28', isRead: true, audience: 'consumer',
  },
  {
    id: '7', type: 'policy', title: 'Updated Privacy Policy — effective Dec 1, 2026',
    preview: "We've updated how we handle data for AI personalization features. No data is sold. Full details inside.",
    date: 'Aug 25', isRead: true, audience: 'all',
  },
  {
    id: '8', type: 'promo', title: 'Scale plan — first 30 days free',
    preview: 'Start processing at $0 platform fee with a 30-day Scale plan trial for new business accounts.',
    date: 'Aug 22', isRead: true, audience: 'merchant',
  },
]

type FilterKey = 'all' | 'unread' | 'updates' | 'promos'
const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'updates', label: 'Updates' },
  { key: 'promos', label: 'Offers' },
]

interface UniversalBroadcastProps {
  onBack?: () => void
  onOpenMessage?: (id: string) => void
}

export default function UniversalBroadcast({ onBack, onOpenMessage }: UniversalBroadcastProps) {
  const [messages, setMessages] = useState<BroadcastMessage[]>(MESSAGES)
  const [filter, setFilter] = useState<FilterKey>('all')

  const unreadCount = messages.filter(m => !m.isRead).length

  const markAllRead = () => setMessages(prev => prev.map(m => ({ ...m, isRead: true })))
  const markRead = (id: string) => setMessages(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m))

  const filtered = messages.filter(m => {
    if (filter === 'unread') return !m.isRead
    if (filter === 'updates') return m.type === 'feature' || m.type === 'update' || m.type === 'maintenance' || m.type === 'policy'
    if (filter === 'promos') return m.type === 'promo'
    return true
  })

  const today = filtered.filter(m => m.date.startsWith('Today'))
  const thisWeek = filtered.filter(m => !m.date.startsWith('Today') && m.date !== 'Yesterday' && !m.date.startsWith('Aug') && !m.date.startsWith('Sep') || m.date === 'Yesterday')
  const earlier = filtered.filter(m => m.date.startsWith('Aug') || (m.date.startsWith('Sep') && !m.date.startsWith('Today')))

  const groups: { label: string; items: BroadcastMessage[] }[] = [
    { label: 'Today', items: today },
    { label: 'This week', items: thisWeek },
    { label: 'Earlier', items: earlier },
  ].filter(g => g.items.length > 0)

  const handleOpen = (msg: BroadcastMessage) => {
    markRead(msg.id)
    onOpenMessage?.(msg.id)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Updates</p>
          {unreadCount > 0 && (
            <p className="font-body text-[10px] text-text-muted">{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead}
            className="font-body text-xs font-semibold transition-colors"
            style={{ color: 'rgba(175,197,255,0.5)' }}>
            Mark all read
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="px-5 pb-3 flex gap-2 shrink-0">
        {FILTERS.map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className="px-3 h-7 rounded-full font-body text-xs font-semibold transition-all"
            style={{
              background: filter === f.key ? 'rgba(175,197,255,0.1)' : 'rgba(175,197,255,0.04)',
              color: filter === f.key ? 'var(--color-text)' : 'rgba(175,197,255,0.45)',
              border: `1px solid ${filter === f.key ? 'rgba(175,197,255,0.18)' : 'rgba(175,197,255,0.09)'}`,
            }}>
            {f.label}
            {f.key === 'unread' && unreadCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full font-mono text-[9px]"
                style={{ background: 'rgba(0,102,255,0.15)', color: '#4D9FFF' }}>
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-14 h-14 rounded-[18px] flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M11 2a9 9 0 1 1 0 18A9 9 0 0 1 11 2z" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" />
                <path d="M11 7v4M11 13v2" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-body text-sm text-text-muted">Nothing here</p>
          </div>
        ) : (
          groups.map(group => (
            <div key={group.label}>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
                {group.label}
              </p>
              <div className="rounded-[--radius-2xl] overflow-hidden"
                style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
                {group.items.map((msg, i) => {
                  const cfg = TYPE_CFG[msg.type]
                  return (
                    <button key={msg.id}
                      onClick={() => handleOpen(msg)}
                      className="w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-surface/50"
                      style={{ borderBottom: i < group.items.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>

                      {/* Type icon */}
                      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: cfg.bg, border: `1px solid ${cfg.color}22` }}>
                        {cfg.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="px-1.5 py-0.5 rounded-full font-body text-[9px] font-semibold shrink-0"
                            style={{ background: cfg.bg, color: cfg.color }}>
                            {cfg.label}
                          </span>
                          {msg.isPersistent && (
                            <span className="px-1.5 py-0.5 rounded-full font-body text-[9px] font-semibold"
                              style={{ background: 'rgba(245,183,0,0.1)', color: '#F5B700' }}>
                              Action needed
                            </span>
                          )}
                        </div>
                        <p className={`font-body text-xs leading-snug ${msg.isRead ? 'text-text-muted' : 'text-text font-semibold'}`}>
                          {msg.title}
                        </p>
                        <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed line-clamp-2">
                          {msg.preview}
                        </p>
                        <p className="font-body text-[10px] mt-1.5" style={{ color: 'rgba(175,197,255,0.35)' }}>
                          {msg.date}
                        </p>
                      </div>

                      {/* Unread dot */}
                      {!msg.isRead && (
                        <div className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                          style={{ background: '#4D9FFF', boxShadow: '0 0 6px rgba(0,102,255,0.5)' }} />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
