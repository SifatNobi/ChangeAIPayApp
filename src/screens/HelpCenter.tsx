import { useState } from 'react'

type HelpCategory = {
  id: string
  label: string
  sub: string
  icon: React.ReactNode
  color: string
  bg: string
}

const CATEGORIES: HelpCategory[] = [
  {
    id: 'payments', label: 'Payments & Transfers', sub: '24 articles',
    color: '#4D9FFF', bg: 'rgba(0,102,255,0.07)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2 5h16v10H2V5z" stroke="#4D9FFF" strokeWidth="1.2" strokeLinejoin="round" /><path d="M2 9h16" stroke="#4D9FFF" strokeWidth="1.2" /></svg>,
  },
  {
    id: 'account', label: 'Account & Profile', sub: '18 articles',
    color: '#3FE7FF', bg: 'rgba(63,231,255,0.06)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="3.5" stroke="#3FE7FF" strokeWidth="1.2" /><path d="M3 18c0-4 3-6.5 7-6.5s7 2.5 7 6.5" stroke="#3FE7FF" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  },
  {
    id: 'security', label: 'Security & Privacy', sub: '15 articles',
    color: '#F5B700', bg: 'rgba(245,183,0,0.07)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 5.5V10c0 4 2.5 6.5 7 8 4.5-1.5 7-4 7-8V5.5L10 2z" stroke="#F5B700" strokeWidth="1.2" strokeLinejoin="round" /></svg>,
  },
  {
    id: 'kyc', label: 'Verification & KYC', sub: '12 articles',
    color: '#22C55E', bg: 'rgba(34,197,94,0.06)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#22C55E" strokeWidth="1.2" /><path d="M7 10l2 2 4-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    id: 'plans', label: 'Plans & Billing', sub: '10 articles',
    color: '#9945FF', bg: 'rgba(153,69,255,0.07)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6L13 12l2 6-5-3.5L5 18l2-6-5-4h6L10 2z" stroke="#9945FF" strokeWidth="1.2" strokeLinejoin="round" /></svg>,
  },
  {
    id: 'crypto', label: 'Crypto', sub: '9 articles',
    color: '#FF9F43', bg: 'rgba(255,159,67,0.06)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7.5" stroke="#FF9F43" strokeWidth="1.2" /><path d="M8 8h3a1.5 1.5 0 0 1 0 3H8v-3zM8 11h4a1.5 1.5 0 0 1 0 3H8v-3z" stroke="#FF9F43" strokeWidth="1" /></svg>,
  },
  {
    id: 'fina', label: 'Fina & Aina AI', sub: '8 articles',
    color: '#BF8FFF', bg: 'rgba(153,69,255,0.06)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 1 1 0 16A8 8 0 0 1 10 2z" stroke="#BF8FFF" strokeWidth="1.2" /><path d="M7 8h6M7 12h4" stroke="#BF8FFF" strokeWidth="1.2" strokeLinecap="round" /></svg>,
  },
  {
    id: 'merchant', label: 'Merchant & Business', sub: '20 articles',
    color: '#3FE7FF', bg: 'rgba(63,231,255,0.06)',
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 7l7-4 7 4v9H3V7z" stroke="#3FE7FF" strokeWidth="1.2" strokeLinejoin="round" /><path d="M8 16v-4h4v4" stroke="#3FE7FF" strokeWidth="1.2" strokeLinejoin="round" /></svg>,
  },
]

const POPULAR = [
  'How do I verify my identity (KYC)?',
  "Why was my payment declined?",
  'How do I link a bank account?',
  'Can I change my subscription plan?',
  "What is Nano and how does it work?",
]

interface HelpCenterProps {
  onBack?: () => void
  onSearch?: (q: string) => void
  onCategory?: (id: string) => void
  onFAQ?: () => void
  onContactSupport?: () => void
  onTickets?: () => void
}

export default function HelpCenter({ onBack, onCategory, onFAQ, onContactSupport, onTickets }: HelpCenterProps) {
  const [query, setQuery] = useState('')

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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Help Center</p>
      </div>

      {/* Search bar */}
      <div className="px-5 pb-4 shrink-0">
        <div className="flex items-center gap-3 h-11 px-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M11 11l3 3" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
            placeholder="Search the Help Center..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} className="shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 3l8 8M11 3l-8 8" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Quick actions */}
        <div className="flex gap-3">
          {[
            { label: 'FAQ', sub: 'Browse answers', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6" stroke="#4D9FFF" strokeWidth="1.2" />
                <path d="M8 5.5c0-1 .8-1.5 1.5-1 .7.5.7 1.5-.5 2S8 8 8 8" stroke="#4D9FFF" strokeWidth="1" strokeLinecap="round" />
                <circle cx="8" cy="10.5" r=".5" fill="#4D9FFF" />
              </svg>
            ), color: '#4D9FFF', onPress: onFAQ },
            { label: 'Contact', sub: 'Get help', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12v8H2V4z" stroke="#22C55E" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M2 5l6 4 6-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            ), color: '#22C55E', onPress: onContactSupport },
            { label: 'My Tickets', sub: 'Track issues', icon: (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 2h10v12H3V2z" stroke="#9945FF" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M5 6h6M5 9h4" stroke="#9945FF" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            ), color: '#9945FF', onPress: onTickets },
          ].map((item, i) => (
            <button key={i} onClick={item.onPress}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[--radius-xl] transition-all active:scale-[0.97]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${item.color}14` }}>
                {item.icon}
              </div>
              <p className="font-body text-xs font-semibold text-text">{item.label}</p>
              <p className="font-body text-[9px] text-text-muted">{item.sub}</p>
            </button>
          ))}
        </div>

        {/* System status */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.14)' }}>
          <div className="w-2 h-2 rounded-full shrink-0"
            style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
          <p className="font-body text-xs flex-1 text-text-muted">
            All systems operational &nbsp;·&nbsp; <span style={{ color: '#22C55E' }}>No known issues</span>
          </p>
          <button className="font-body text-[10px]" style={{ color: 'rgba(175,197,255,0.4)' }}>Status page</button>
        </div>

        {/* Popular questions */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Popular questions
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {POPULAR.map((q, i) => (
              <button key={i} onClick={onFAQ}
                className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface/50 transition-colors"
                style={{ borderBottom: i < POPULAR.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <circle cx="7" cy="7" r="5.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1" />
                  <path d="M7 4.5c0-.8.6-1.2 1.2-.8.6.4.6 1.2-.4 1.6S7 6.5 7 6.5" stroke="rgba(175,197,255,0.4)" strokeWidth="0.9" strokeLinecap="round" />
                  <circle cx="7" cy="8.5" r=".4" fill="rgba(175,197,255,0.4)" />
                </svg>
                <p className="font-body text-sm text-text flex-1">{q}</p>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                  <path d="M4 3l4 3-4 3" stroke="rgba(175,197,255,0.3)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Browse by category */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Browse by topic
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {CATEGORIES.map(cat => (
              <button key={cat.id} onClick={() => onCategory?.(cat.id)}
                className="flex items-center gap-3 px-3 py-3 rounded-[--radius-xl] text-left transition-all active:scale-[0.97]"
                style={{ background: cat.bg, border: `1px solid ${cat.color}22` }}>
                <div className="w-8 h-8 rounded-[9px] flex items-center justify-center shrink-0"
                  style={{ background: `${cat.color}12` }}>
                  {cat.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-body text-xs font-semibold text-text leading-snug">{cat.label}</p>
                  <p className="font-body text-[9px] text-text-muted">{cat.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
