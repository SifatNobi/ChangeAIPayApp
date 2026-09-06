import { useState } from 'react'

type FAQCategory = 'all' | 'payments' | 'account' | 'security' | 'plans' | 'ai' | 'merchant'

interface FAQItem {
  id: string
  category: Exclude<FAQCategory, 'all'>
  q: string
  a: string
}

const CATEGORIES: { key: FAQCategory; label: string; color: string }[] = [
  { key: 'all', label: 'All', color: 'rgba(175,197,255,0.7)' },
  { key: 'payments', label: 'Payments', color: '#4D9FFF' },
  { key: 'account', label: 'Account', color: '#3FE7FF' },
  { key: 'security', label: 'Security', color: '#F5B700' },
  { key: 'plans', label: 'Plans', color: '#9945FF' },
  { key: 'ai', label: 'AI', color: '#BF8FFF' },
  { key: 'merchant', label: 'Merchant', color: '#22C55E' },
]

const FAQS: FAQItem[] = [
  {
    id: 'kyc-1', category: 'account',
    q: 'How do I verify my identity (KYC)?',
    a: "Go to Profile → Verification to start KYC. You'll need a government-issued ID (passport, driver's license, or national ID) and a brief selfie. Most verifications complete in under five minutes. If additional review is needed, the process can take up to 24 hours.",
  },
  {
    id: 'pay-1', category: 'payments',
    q: 'Why was my payment declined?',
    a: "Payments can be declined for several reasons: insufficient balance, a temporary hold from our fraud detection, an unsupported recipient, or your account spending limit. Check the transaction details screen for the specific reason. If the issue persists after 24 hours, contact support.",
  },
  {
    id: 'pay-2', category: 'payments',
    q: 'How long do transfers take?',
    a: "ChangeAIPay to ChangeAIPay transfers are instant. Transfers to external bank accounts typically take 1–2 business days for standard, or are available within minutes for Instant (subject to your plan and a small FX/network fee). International transfers may take up to 3 business days.",
  },
  {
    id: 'pay-3', category: 'payments',
    q: "What is the $400 monthly fee-free cap?",
    a: "Consumer accounts on the free tier can process up to $400 in payments per month with no platform fee. Transactions above that threshold incur a small percentage fee. You can upgrade to Prime or Premium to raise or remove this cap.",
  },
  {
    id: 'pay-4', category: 'payments',
    q: "What FX fees apply to international transfers?",
    a: "International transfers include an FX spread — the difference between the mid-market exchange rate and the rate ChangeAIPay applies. The spread is disclosed clearly before you confirm any transfer. It is separate from the platform fee and is not a hidden charge.",
  },
  {
    id: 'acc-1', category: 'account',
    q: 'How do I link a bank account?',
    a: "Go to Wallet → Linked Accounts → Add Bank. ChangeAIPay uses secure open banking connections. Enter your bank and authenticate through your bank's app or website. The link is read-only for balance checks; push transfers require a separate authorization each time.",
  },
  {
    id: 'acc-2', category: 'account',
    q: 'Can I have both a consumer and merchant account?',
    a: "Yes. You can switch between a personal consumer account and a business merchant account from the profile menu. Both share the same login but have separate balances, settings, and AI assistants (Fina for consumer, Aina for merchant).",
  },
  {
    id: 'sec-1', category: 'security',
    q: 'What should I do if I suspect unauthorized access?',
    a: "Lock your account immediately from Security → Lock Account, then contact our support team via Live Chat. We will review your account activity, invalidate all active sessions, and guide you through the account recovery process.",
  },
  {
    id: 'sec-2', category: 'security',
    q: 'How does biometric authentication work?',
    a: "ChangeAIPay uses your device's native biometrics (Face ID or fingerprint) to authenticate login and high-value transactions. The biometric data never leaves your device — we only receive a pass/fail signal from your device's secure enclave.",
  },
  {
    id: 'plan-1', category: 'plans',
    q: 'Can I change my subscription plan?',
    a: "Yes. You can upgrade or downgrade at any time. Upgrades take effect immediately and are prorated. Downgrades take effect at the end of your current billing cycle. Go to Profile → Subscription to manage your plan.",
  },
  {
    id: 'plan-2', category: 'plans',
    q: 'What happens if I cancel my subscription?',
    a: "Canceling returns you to the free tier at the end of your billing period. Your account, balance, and transaction history are not affected. Features exclusive to your previous plan will no longer be available, but no data is lost.",
  },
  {
    id: 'ai-1', category: 'ai',
    q: 'What can Fina help me with?',
    a: "Fina is your personal AI financial assistant. She can explain transactions, summarize your spending, set up savings goals, forecast your balance, provide personalized insights, and help you navigate the app. Fina learns your habits over time to give more relevant recommendations.",
  },
  {
    id: 'ai-2', category: 'ai',
    q: "What's the difference between Fina and Aina?",
    a: "Fina serves consumer accounts and focuses on personal finance — spending, savings, budgeting, and goals. Aina serves merchant business accounts and focuses on revenue, cash flow, payment volume, and business health. Both are AI assistants built by ChangeAIPay.",
  },
  {
    id: 'mer-1', category: 'merchant',
    q: 'How does merchant subscription pricing work?',
    a: "Without a subscription, merchants pay a standard platform fee on every transaction (percentage based on annual payment volume). Subscribing to a plan removes the per-transaction fee at your tier — you pay the annual fee instead. This makes subscriptions cost-effective once you cross a certain volume.",
  },
  {
    id: 'mer-2', category: 'merchant',
    q: "What is 'Annual Payment Volume' (APV)?",
    a: "APV is the total value of payments your business processes through ChangeAIPay per year. It determines which pricing tier you fall into. APV is not the same as your revenue — it's strictly the transaction volume flowing through our platform.",
  },
]

interface FAQProps {
  onBack?: () => void
  onContactSupport?: () => void
}

export default function FAQ({ onBack, onContactSupport }: FAQProps) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<FAQCategory>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [helpful, setHelpful] = useState<Record<string, boolean | null>>({})

  const visible = FAQS.filter(f => {
    const matchCat = category === 'all' || f.category === category
    const matchSearch = !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const grouped: Record<string, FAQItem[]> = {}
  visible.forEach(f => {
    const g = category === 'all' ? CATEGORIES.find(c => c.key === f.category)?.label ?? 'Other' : 'Results'
    if (!grouped[g]) grouped[g] = []
    grouped[g].push(f)
  })

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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">FAQ</p>
      </div>

      {/* Search */}
      <div className="px-5 pb-3 shrink-0">
        <div className="flex items-center gap-3 h-11 px-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" />
            <path d="M10 10l2.5 2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <input
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
            placeholder="Search frequently asked questions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Category filter scroll */}
      <div className="px-5 pb-4 shrink-0 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 min-w-max">
          {CATEGORIES.map(cat => {
            const isActive = category === cat.key
            return (
              <button key={cat.key} onClick={() => setCategory(cat.key)}
                className="px-3.5 h-8 rounded-full font-body text-xs font-semibold transition-all whitespace-nowrap"
                style={{
                  background: isActive ? `${cat.color}15` : 'rgba(175,197,255,0.04)',
                  color: isActive ? cat.color : 'rgba(175,197,255,0.45)',
                  border: `1px solid ${isActive ? `${cat.color}35` : 'rgba(175,197,255,0.09)'}`,
                }}>
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {visible.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="w-12 h-12 rounded-[--radius-xl] flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="8" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" />
                <path d="M10 7.5c0-.9.7-1.4 1.4-.9.6.4.6 1.4-.4 1.8S10 9.5 10 9.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                <circle cx="10" cy="12" r=".6" fill="rgba(175,197,255,0.4)" />
              </svg>
            </div>
            <p className="font-body text-sm text-text-muted text-center">No matching questions.</p>
            <button onClick={onContactSupport}
              className="font-body text-xs font-semibold"
              style={{ color: '#4D9FFF' }}>
              Contact support instead
            </button>
          </div>
        ) : (
          Object.entries(grouped).map(([groupLabel, items]) => (
            <div key={groupLabel}>
              {category === 'all' && (
                <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
                  {groupLabel}
                </p>
              )}
              <div className="rounded-[--radius-2xl] overflow-hidden"
                style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
                {items.map((item, i) => {
                  const isOpen = openId === item.id
                  return (
                    <div key={item.id}
                      style={{ borderBottom: i < items.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                      <button
                        onClick={() => setOpenId(isOpen ? null : item.id)}
                        className="w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-surface/30">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                          <circle cx="8" cy="8" r="6.5" stroke="rgba(175,197,255,0.2)" strokeWidth="1" />
                          <path d="M8 6c0-.8.6-1.2 1.2-.8.6.4.6 1.2-.4 1.6S8 8 8 8" stroke="rgba(175,197,255,0.5)" strokeWidth="0.9" strokeLinecap="round" />
                          <circle cx="8" cy="10" r=".5" fill="rgba(175,197,255,0.5)" />
                        </svg>
                        <p className="flex-1 font-body text-sm text-text leading-snug">{item.q}</p>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5"
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}>
                          <path d="M3 5l4 4 4-4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 flex flex-col gap-3"
                          style={{ borderTop: '1px solid rgba(175,197,255,0.06)' }}>
                          <p className="font-body text-xs text-text-muted leading-relaxed pt-3">{item.a}</p>
                          <div className="flex items-center gap-3">
                            <p className="font-body text-[10px] text-text-muted">Was this helpful?</p>
                            {[true, false].map(val => (
                              <button key={String(val)}
                                onClick={() => setHelpful(h => ({ ...h, [item.id]: val }))}
                                className="px-2.5 h-6 rounded-full font-body text-[10px] font-semibold transition-all"
                                style={{
                                  background: helpful[item.id] === val
                                    ? val ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)'
                                    : 'rgba(175,197,255,0.06)',
                                  color: helpful[item.id] === val
                                    ? val ? '#22C55E' : '#F87171'
                                    : 'rgba(175,197,255,0.4)',
                                  border: `1px solid ${helpful[item.id] === val ? (val ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.2)') : 'rgba(175,197,255,0.1)'}`,
                                }}>
                                {val ? 'Yes' : 'No'}
                              </button>
                            ))}
                            {helpful[item.id] === false && (
                              <button onClick={onContactSupport}
                                className="ml-auto font-body text-[10px] font-semibold"
                                style={{ color: '#4D9FFF' }}>
                                Contact support
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))
        )}

        {/* CTA */}
        {visible.length > 0 && (
          <button onClick={onContactSupport}
            className="flex items-center gap-3 px-4 py-4 rounded-[--radius-xl] w-full text-left transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(34,197,94,0.08)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12v8H2V4z" stroke="#22C55E" strokeWidth="1.2" strokeLinejoin="round" />
                <path d="M2 5l6 4 6-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-text">Still have questions?</p>
              <p className="font-body text-[10px] text-text-muted">Contact our support team</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
