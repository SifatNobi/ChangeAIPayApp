import { useState } from 'react'

type Category = 'payments' | 'security' | 'ai' | 'goals' | 'promo'

interface Toggle {
  id: string
  label: string
  sub: string
  defaultOn: boolean
  category: Category
}

const TOGGLES: Toggle[] = [
  // Payments
  { id: 'pay_sent',     label: 'Payment Sent',          sub: 'When you send money',                    category: 'payments', defaultOn: true  },
  { id: 'pay_received', label: 'Payment Received',      sub: 'When you receive money',                 category: 'payments', defaultOn: true  },
  { id: 'pay_fail',     label: 'Payment Failed',        sub: 'When a payment cannot be completed',     category: 'payments', defaultOn: true  },
  { id: 'recurring',   label: 'Recurring Payments',    sub: 'Reminders before scheduled transfers',   category: 'payments', defaultOn: true  },
  // Security
  { id: 'sec_login',   label: 'New Device Sign-in',    sub: 'When a new device accesses your account',category: 'security', defaultOn: true  },
  { id: 'sec_pw',      label: 'Password Changed',      sub: 'Confirmation after password updates',    category: 'security', defaultOn: true  },
  { id: 'sec_suspicious',label: 'Suspicious Activity', sub: 'Unusual logins or flagged transactions', category: 'security', defaultOn: true  },
  // AI
  { id: 'ai_insight',  label: 'Fina Insights',         sub: "When Fina notices something important",  category: 'ai',       defaultOn: true  },
  { id: 'ai_weekly',   label: 'Weekly Report',         sub: "Your financial week in review",          category: 'ai',       defaultOn: true  },
  { id: 'ai_budget',   label: 'Budget Alerts',         sub: 'When you approach or exceed a limit',    category: 'ai',       defaultOn: true  },
  // Goals
  { id: 'goal_mile',   label: 'Goal Milestones',       sub: 'When you hit 25%, 50%, 75%, 100%',       category: 'goals',    defaultOn: true  },
  { id: 'goal_nudge',  label: 'Goal Nudges',           sub: "Tips when you're falling behind",        category: 'goals',    defaultOn: false },
  { id: 'goal_autosave',label: 'AutoSave Activity',    sub: 'Round-up and paycheck split events',     category: 'goals',    defaultOn: false },
  // Promo
  { id: 'promo_offer', label: 'Special Offers',        sub: 'Exclusive perks and promotions',         category: 'promo',    defaultOn: false },
  { id: 'promo_news',  label: 'Product Updates',       sub: 'New features and announcements',         category: 'promo',    defaultOn: true  },
]

const CATEGORIES: { id: Category; label: string; color: string; icon: React.ReactNode }[] = [
  {
    id: 'payments', label: 'Payments', color: '#3FE7FF',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="10" height="7" rx="1.5" stroke="#3FE7FF" strokeWidth="1" /><path d="M1 5.5h10" stroke="#3FE7FF" strokeWidth="1" /></svg>,
  },
  {
    id: 'security', label: 'Security', color: '#9945FF',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l4.5 2v3C10.5 9 8.5 11 6 12 3.5 11 1.5 9 1.5 6V3L6 1Z" stroke="#9945FF" strokeWidth="1" strokeLinejoin="round" /></svg>,
  },
  {
    id: 'ai', label: 'Fina AI', color: '#0066FF',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="4" r="1.8" stroke="#0066FF" strokeWidth="1" /><path d="M1.5 11c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" stroke="#0066FF" strokeWidth="1" strokeLinecap="round" fill="none" /></svg>,
  },
  {
    id: 'goals', label: 'Goals', color: '#22C55E',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.5" stroke="#22C55E" strokeWidth="1" /><circle cx="6" cy="6" r="2.5" stroke="#22C55E" strokeWidth="1" /><circle cx="6" cy="6" r="0.8" fill="#22C55E" /></svg>,
  },
  {
    id: 'promo', label: 'Promotions', color: '#F5B700',
    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.3 2.7 3 .4-2.2 2.1.5 3L6 7.7l-2.6 1.5.5-3L1.7 4.1l3-.4L6 1Z" stroke="#F5B700" strokeWidth="1" strokeLinejoin="round" /></svg>,
  },
]

interface NotificationPreferencesProps {
  onBack?: () => void
}

export default function NotificationPreferences({ onBack }: NotificationPreferencesProps) {
  const initialState = Object.fromEntries(TOGGLES.map(t => [t.id, t.defaultOn]))
  const [states, setStates] = useState<Record<string, boolean>>(initialState)
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [saved, setSaved] = useState(false)

  const toggle = (id: string) => {
    setStates(prev => ({ ...prev, [id]: !prev[id] }))
    setSaved(false)
  }

  const toggleAll = (cat: Category, on: boolean) => {
    const ids = TOGGLES.filter(t => t.category === cat).map(t => t.id)
    setStates(prev => { const next = { ...prev }; ids.forEach(id => { next[id] = on }); return next })
    setSaved(false)
  }

  const handleSave = () => setSaved(true)

  const visible = TOGGLES.filter(t => activeCategory === 'all' || t.category === activeCategory)

  const groupedByCategory = CATEGORIES.map(c => ({
    ...c,
    items: visible.filter(t => t.category === c.id),
  })).filter(c => c.items.length > 0)

  const toggleStyle = (on: boolean, color = '#0066FF') => ({
    background: on ? color : 'rgba(175,197,255,0.15)',
    boxShadow: on ? `0 0 8px ${color}66` : 'none',
  })

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Notifications</p>
      </div>

      {/* Category filter chips */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {[{ id: 'all' as const, label: 'All' }, ...CATEGORIES.map(c => ({ id: c.id, label: c.label }))].map(chip => {
            const active = activeCategory === chip.id
            const cat = CATEGORIES.find(c => c.id === chip.id)
            return (
              <button key={chip.id} onClick={() => setActiveCategory(chip.id)}
                className="shrink-0 h-8 px-3.5 rounded-full font-body text-xs font-semibold whitespace-nowrap transition-all"
                style={{
                  background: active ? (cat ? `${cat.color}1A` : 'rgba(175,197,255,0.12)') : 'rgba(175,197,255,0.05)',
                  border: `1px solid ${active ? (cat ? `${cat.color}44` : 'rgba(175,197,255,0.3)') : 'rgba(175,197,255,0.1)'}`,
                  color: active ? (cat ? cat.color : 'rgba(175,197,255,0.9)') : 'rgba(175,197,255,0.5)',
                }}>
                {chip.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {groupedByCategory.map(cat => (
          <div key={cat.id}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg flex items-center justify-center"
                  style={{ background: `${cat.color}15` }}>
                  {cat.icon}
                </div>
                <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">{cat.label}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => toggleAll(cat.id, true)}
                  className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors"
                  style={{ color: cat.color, background: `${cat.color}12`, border: `1px solid ${cat.color}25` }}>
                  All on
                </button>
                <button onClick={() => toggleAll(cat.id, false)}
                  className="font-body text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: 'rgba(175,197,255,0.45)', background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
                  All off
                </button>
              </div>
            </div>
            <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
              {cat.items.map((t, i) => (
                <div key={t.id} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-text">{t.label}</p>
                    <p className="font-body text-[10px] text-text-muted">{t.sub}</p>
                  </div>
                  <button onClick={() => toggle(t.id)}
                    className="relative w-11 h-6 rounded-full transition-all duration-[200ms] shrink-0"
                    style={toggleStyle(states[t.id], cat.color)}>
                    <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-[200ms]"
                      style={{ left: states[t.id] ? 'calc(100% - 22px)' : '2px' }} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Save */}
        {saved ? (
          <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Preferences saved</p>
          </div>
        ) : (
          <button onClick={handleSave}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Save Preferences
          </button>
        )}
      </div>
    </div>
  )
}
