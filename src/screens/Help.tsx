import { useState } from 'react'

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

interface HelpCategory {
  id: string
  label: string
  icon: React.ReactNode
  color: string
  count: number
}

const CATEGORIES: HelpCategory[] = [
  { id: 'payments',  label: 'Payments',     color: '#3FE7FF', count: 12,
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="#3FE7FF" strokeWidth="1.1" /><path d="M1.5 7.5h13" stroke="#3FE7FF" strokeWidth="1.1" /></svg> },
  { id: 'security',  label: 'Security',     color: '#22C55E', count: 8,
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2l5.5 2.5v4C13.5 12 11 14.5 8 16 5 14.5 2.5 12 2.5 8.5v-4L8 2Z" stroke="#22C55E" strokeWidth="1.1" strokeLinejoin="round" /></svg> },
  { id: 'account',   label: 'Account',      color: '#0066FF', count: 10,
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#0066FF" strokeWidth="1.1" /><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#0066FF" strokeWidth="1.1" strokeLinecap="round" fill="none" /></svg> },
  { id: 'crypto',    label: 'Crypto',       color: '#F5B700', count: 9,
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#F5B700" strokeWidth="1.1" /><path d="M6 5.5h2.5a2 2 0 0 1 0 4H6v-4ZM6 9.5h3a2 2 0 0 1 0 4" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" /></svg> },
  { id: 'goals',     label: 'Goals',        color: '#9945FF', count: 7,
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#9945FF" strokeWidth="1.1" /><circle cx="8" cy="8" r="3.5" stroke="#9945FF" strokeWidth="1.1" /><circle cx="8" cy="8" r="1.2" fill="#9945FF" /></svg> },
  { id: 'billing',   label: 'Billing',      color: '#FC7E2F', count: 6,
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="#FC7E2F" strokeWidth="1.1" /><path d="M5 7.5h6M5 10h4" stroke="#FC7E2F" strokeWidth="1" strokeLinecap="round" /></svg> },
]

const FAQS: FAQ[] = [
  { id: 'f1', category: 'payments', question: 'How long do transfers take?', answer: 'ChangeAIPay transfers are typically instant via our Nano settlement rail. External bank transfers may take 1–2 business days depending on your bank.' },
  { id: 'f2', category: 'payments', question: 'What are the transfer limits?', answer: 'Free plan: $400/day, $1,500/month. Plus plan: $2,500/day. Pro plan: unlimited. Verified accounts may have higher limits.' },
  { id: 'f3', category: 'security', question: 'How do I reset my PIN?', answer: "Go to Profile > Security > Change PIN. You'll need to verify your identity via email or biometrics before setting a new PIN." },
  { id: 'f4', category: 'security', question: 'What should I do if I see suspicious activity?', answer: 'Immediately go to Profile > Security > Active Sessions and sign out all other devices. Then change your password and contact support.' },
  { id: 'f5', category: 'account',  question: 'How do I complete identity verification?', answer: 'Tap Verify in your profile or when prompted. The KYC process takes under 5 minutes and requires a government ID and a quick liveness check.' },
  { id: 'f6', category: 'crypto',   question: 'How is crypto taxed?', answer: 'Crypto trades may trigger capital gains/losses events. Your tax documents (Profile > Documents > Tax Documents) include a pre-generated gains/losses report.' },
  { id: 'f7', category: 'goals',    question: 'Can I have multiple goals?', answer: 'Yes — there is no limit to the number of saving goals you can create. Each goal has its own funding method and target.' },
]

const POPULAR = FAQS.slice(0, 4)

interface HelpProps {
  onBack?: () => void
  onCategory?: (category: string) => void
  onSupport?: () => void
}

export default function Help({ onBack, onSupport }: HelpProps) {
  const [query, setQuery] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const searchResults = query.trim().length > 1
    ? FAQS.filter(f => f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase()))
    : null

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Help Center</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Search */}
        <div className="flex items-center gap-2.5 px-4 h-12 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.13)' }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M11 11l2.5 2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input value={query} onChange={e => setQuery(e.target.value)}
            placeholder="Search help articles…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none" />
          {query && (
            <button onClick={() => setQuery('')}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 4l6 6M10 4l-6 6" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {searchResults ? (
          /* Search results */
          <div>
            <p className="font-body text-xs text-text-muted mb-3">{searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{query}"</p>
            <div className="flex flex-col gap-2">
              {searchResults.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-8">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="16" stroke="rgba(175,197,255,0.12)" strokeWidth="1.5" /><path d="M13 13l10 10M23 13L13 23" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  <p className="font-body text-sm text-text-muted">No results found</p>
                  <button onClick={onSupport} className="font-body text-xs font-semibold" style={{ color: '#3FE7FF' }}>Contact support instead</button>
                </div>
              ) : searchResults.map(faq => (
                <FAQItem key={faq.id} faq={faq} expanded={expandedId === faq.id} onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)} />
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* Categories grid */}
            <div>
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Browse by Topic</p>
              <div className="grid grid-cols-2 gap-2.5">
                {CATEGORIES.map(cat => (
                  <button key={cat.id}
                    className="flex items-center gap-3 px-3.5 py-3.5 rounded-[--radius-xl] text-left transition-all hover:opacity-90 active:scale-[0.97]"
                    style={{ background: `${cat.color}0C`, border: `1px solid ${cat.color}22` }}>
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${cat.color}15` }}>
                      {cat.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-body text-xs font-semibold text-text">{cat.label}</p>
                      <p className="font-body text-[9px] text-text-muted">{cat.count} articles</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular FAQs */}
            <div>
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Popular Questions</p>
              <div className="flex flex-col gap-2">
                {POPULAR.map(faq => (
                  <FAQItem key={faq.id} faq={faq} expanded={expandedId === faq.id} onToggle={() => setExpandedId(expandedId === faq.id ? null : faq.id)} />
                ))}
              </div>
            </div>

            {/* Still need help */}
            <div className="flex flex-col items-center gap-3 py-2">
              <p className="font-body text-sm text-text-muted">Still need help?</p>
              <button onClick={onSupport}
                className="h-12 px-8 rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all active:scale-[0.97]"
                style={{ background: 'var(--gradient-primary)' }}>
                Contact Support
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function FAQItem({ faq, expanded, onToggle }: { faq: FAQ; expanded: boolean; onToggle: () => void }) {
  const cat = CATEGORIES.find(c => c.id === faq.category)
  return (
    <div className="rounded-[--radius-xl] overflow-hidden transition-all"
      style={{ background: 'rgba(175,197,255,0.03)', border: `1px solid ${expanded ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.09)'}` }}>
      <button onClick={onToggle} className="flex items-center gap-3 px-4 py-3.5 w-full text-left">
        {cat && (
          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: cat.color }} />
        )}
        <p className="flex-1 font-body text-sm font-semibold text-text">{faq.question}</p>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="shrink-0 transition-transform duration-[200ms]"
          style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)' }}>
          <path d="M3 5l4 4 4-4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4 pt-1" style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}>
          <p className="font-body text-sm text-text-muted leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}
