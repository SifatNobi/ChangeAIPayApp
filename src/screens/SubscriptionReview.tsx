import { useState, type ReactNode } from 'react'

const BRAND_ICONS: Record<string, ReactNode> = {
  Netflix: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 3v12l3.5-9.5L12 15V3" stroke="#E50914" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Spotify: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="#1DB954" strokeWidth="1.3" />
      <path d="M5.5 7.5c2 -.7 5 -.5 7 .5" stroke="#1DB954" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6 10c1.6-.5 4-.4 5.5.4" stroke="#1DB954" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6.5 12.5c1.2-.3 3 -.3 4.5.3" stroke="#1DB954" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  'Adobe CC': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 13.5L6.5 3 9 9" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 13.5L11.5 3 9 9" stroke="#FF0000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 10.5h9" stroke="#FF0000" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  ),
  Headspace: (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="8" r="4.5" stroke="#FF7843" strokeWidth="1.3" />
      <path d="M4.5 12.5c0 2.5 9 2.5 9 0" stroke="#FF7843" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  ),
  'Gym Membership': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="7.5" width="3" height="3" rx="1" stroke="#9945FF" strokeWidth="1.2" />
      <rect x="13.5" y="7.5" width="3" height="3" rx="1" stroke="#9945FF" strokeWidth="1.2" />
      <path d="M4.5 9h9" stroke="#9945FF" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="5.5" y="5.5" width="2" height="7" rx="1" stroke="#9945FF" strokeWidth="1.2" />
      <rect x="10.5" y="5.5" width="2" height="7" rx="1" stroke="#9945FF" strokeWidth="1.2" />
    </svg>
  ),
  'Duolingo Plus': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <ellipse cx="9" cy="8.5" rx="5.5" ry="6" stroke="#58CC02" strokeWidth="1.3" />
      <path d="M6.5 8.5l2 2 3-3" stroke="#58CC02" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="15.5" r="1.2" fill="#58CC02" />
    </svg>
  ),
  'iCloud 200GB': (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M5 12.5a3 3 0 0 1 0-6 3.5 3.5 0 0 1 7 .5 2.5 2.5 0 0 1 0 5H5Z" stroke="#3FE7FF" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  ),
}

type SubStatus = 'active' | 'flagged' | 'reviewed'

interface Subscription {
  id: string
  name: string
  amount: number
  frequency: 'monthly' | 'annual'
  lastUsed: string
  daysSinceUsed: number
  category: string
  color: string
  status: SubStatus
  finaNote: string
}

const INITIAL_SUBS: Subscription[] = [
  { id: 's1',  name: 'Netflix',       amount: 15.99, frequency: 'monthly', lastUsed: 'Today',   daysSinceUsed: 0,   category: 'Entertainment', color: '#E50914', status: 'active',   finaNote: "Used 4× this week — well worth it." },
  { id: 's2',  name: 'Spotify',       amount: 10.99, frequency: 'monthly', lastUsed: 'Aug 30',  daysSinceUsed: 1,   category: 'Music',         color: '#1DB954', status: 'active',   finaNote: "Daily use detected. Good value." },
  { id: 's3',  name: 'Adobe CC',      amount: 54.99, frequency: 'monthly', lastUsed: 'Aug 15',  daysSinceUsed: 16,  category: 'Productivity',  color: '#FF0000', status: 'flagged',  finaNote: "16 days since last use. Consider pausing." },
  { id: 's4',  name: 'Headspace',     amount: 12.99, frequency: 'monthly', lastUsed: 'Jun 3',   daysSinceUsed: 89,  category: 'Health',        color: '#FF7843', status: 'flagged',  finaNote: "No activity in 89 days. Possibly forgotten." },
  { id: 's5',  name: 'Gym Membership',amount: 49.99, frequency: 'monthly', lastUsed: 'Aug 28',  daysSinceUsed: 3,   category: 'Health',        color: '#9945FF', status: 'active',   finaNote: "Visited 8× this month — great habit!" },
  { id: 's6',  name: 'Duolingo Plus', amount: 6.99,  frequency: 'monthly', lastUsed: 'May 20',  daysSinceUsed: 103, category: 'Education',     color: '#58CC02', status: 'flagged',  finaNote: "103 days since last use. Free tier exists." },
  { id: 's7',  name: 'iCloud 200GB',  amount: 2.99,  frequency: 'monthly', lastUsed: 'Today',   daysSinceUsed: 0,   category: 'Storage',       color: '#3FE7FF', status: 'active',   finaNote: "Essential storage — keep it." },
]

type FilterTab = 'all' | 'flagged' | 'active'

interface SubscriptionReviewProps {
  onBack?: () => void
  onOpenRecurring?: () => void
}

export default function SubscriptionReview({ onBack, onOpenRecurring }: SubscriptionReviewProps) {
  const [subs, setSubs] = useState<Subscription[]>(INITIAL_SUBS)
  const [filter, setFilter] = useState<FilterTab>('all')
  const [remindIds, setRemindIds] = useState<Set<string>>(new Set())

  const update = (id: string, patch: Partial<Subscription>) => {
    setSubs(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))
  }

  const setReminder = (id: string) => {
    setRemindIds(prev => { const n = new Set(prev); n.add(id); return n })
    update(id, { status: 'reviewed' })
  }

  const markReviewed = (id: string) => update(id, { status: 'reviewed' })

  const filtered = filter === 'all' ? subs : subs.filter(s => s.status === filter)
  const flaggedCount = subs.filter(s => s.status === 'flagged').length
  const monthlyTotal = subs.reduce((t, s) => t + (s.frequency === 'monthly' ? s.amount : s.amount / 12), 0)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Subscription Review</p>
          <p className="font-body text-[10px] text-text-muted">Fina detected {subs.length} recurring charges</p>
        </div>
        <button onClick={onOpenRecurring}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold hover:bg-surface-hi transition-all"
          style={{ border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}>
          Manage
        </button>
      </div>

      {/* Summary tiles */}
      <div className="px-5 pb-3 flex gap-3 shrink-0">
        <div className="flex-1 flex flex-col gap-0.5 py-3 px-4 rounded-[--radius-2xl]"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}>
          <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">Monthly total</p>
          <p className="font-display text-xl font-extrabold" style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            ${monthlyTotal.toFixed(2)}
          </p>
        </div>
        {flaggedCount > 0 && (
          <div className="flex-1 flex flex-col gap-0.5 py-3 px-4 rounded-[--radius-2xl]"
            style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)' }}>
            <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">Flagged</p>
            <p className="font-display text-xl font-extrabold" style={{ color: '#FF4D5A' }}>{flaggedCount} subs</p>
          </div>
        )}
      </div>

      {/* Filter tabs */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex gap-2">
          {(['all', 'flagged', 'active'] as FilterTab[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className="flex-1 h-8 rounded-full font-body text-[11px] font-semibold capitalize transition-all duration-[150ms]"
              style={{
                background: filter === f ? (f === 'flagged' ? 'rgba(255,77,90,0.15)' : 'rgba(0,102,255,0.18)') : 'rgba(175,197,255,0.05)',
                border: `1px solid ${filter === f ? (f === 'flagged' ? 'rgba(255,77,90,0.35)' : 'rgba(0,102,255,0.35)') : 'rgba(175,197,255,0.1)'}`,
                color: filter === f ? (f === 'flagged' ? '#FF4D5A' : '#AFC5FF') : 'rgba(175,197,255,0.4)',
              }}>
              {f === 'all' ? 'All' : f === 'flagged' ? `Flagged (${flaggedCount})` : 'Active'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {filtered.map(sub => {
          const hasReminder = remindIds.has(sub.id)
          return (
            <div key={sub.id} className="rounded-[--radius-2xl] overflow-hidden"
              style={{
                background: sub.status === 'flagged' ? 'rgba(255,77,90,0.04)' : 'rgba(175,197,255,0.02)',
                border: `1px solid ${sub.status === 'flagged' ? 'rgba(255,77,90,0.18)' : sub.status === 'reviewed' ? 'rgba(34,197,94,0.18)' : 'rgba(175,197,255,0.09)'}`,
              }}>
              {/* Top row */}
              <div className="flex items-center gap-3 px-4 pt-4 pb-2">
                {/* Icon */}
                <div className="w-10 h-10 rounded-[--radius-xl] flex items-center justify-center shrink-0 font-display text-base font-extrabold"
                  style={{ background: `${sub.color}18`, border: `1px solid ${sub.color}30`, color: sub.color }}>
                  {BRAND_ICONS[sub.name] ?? sub.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm font-semibold text-text truncate">{sub.name}</p>
                    {sub.status === 'flagged' && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 1L1 9h8L5 1Z" stroke="#FF4D5A" strokeWidth="0.9" strokeLinejoin="round" />
                        <path d="M5 4v2.5" stroke="#FF4D5A" strokeWidth="0.9" strokeLinecap="round" />
                      </svg>
                    )}
                    {sub.status === 'reviewed' && (
                      <span className="h-4 px-1.5 rounded-full font-body text-[8px] font-bold flex items-center"
                        style={{ background: 'rgba(34,197,94,0.12)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.25)' }}>
                        Reviewed
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[10px] text-text-muted">
                    {sub.category} · {sub.frequency === 'monthly' ? '/mo' : '/yr'} · Last used {sub.lastUsed}
                  </p>
                </div>
                <p className="font-display text-base font-extrabold shrink-0" style={{ color: sub.status === 'flagged' ? '#FF4D5A' : sub.color }}>
                  ${sub.amount}
                </p>
              </div>

              {/* Fina note */}
              <div className="mx-4 mb-3 px-3 py-2 rounded-[--radius-xl]"
                style={{ background: sub.status === 'flagged' ? 'rgba(255,77,90,0.06)' : 'rgba(175,197,255,0.04)', border: `1px solid ${sub.status === 'flagged' ? 'rgba(255,77,90,0.12)' : 'rgba(175,197,255,0.07)'}` }}>
                <p className="font-body text-[11px] leading-relaxed" style={{ color: 'rgba(175,197,255,0.55)' }}>
                  {sub.finaNote}
                </p>
              </div>

              {/* Actions — only for flagged/unreviewed */}
              {sub.status === 'flagged' && (
                <div className="flex gap-2 px-4 pb-4">
                  <button
                    onClick={() => setReminder(sub.id)}
                    className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
                    style={{ background: hasReminder ? 'rgba(245,183,0,0.12)' : 'rgba(245,183,0,0.08)', border: `1px solid ${hasReminder ? 'rgba(245,183,0,0.35)' : 'rgba(245,183,0,0.2)'}`, color: '#F5B700' }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M5.5 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM5.5 3.5v2l1.5 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                      <path d="M3 9.5l1-1M8 9.5l-1-1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                    {hasReminder ? 'Reminder set' : 'Set Reminder'}
                  </button>
                  <button
                    onClick={() => markReviewed(sub.id)}
                    className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
                    style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Mark Reviewed
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
