import { useState } from 'react'
import { BottomNav } from '@/components/Nav'
import { GlassCard } from '@/components/Card'

interface SearchResultsProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
}

type Category = 'all' | 'people' | 'transactions' | 'help'

const PEOPLE_RESULTS: { id: string; name: string; handle: string; initials: string; color: string; lastSent: string; when: string }[] = []

const TX_RESULTS: { id: string; icon: string; merchant: string; category: string; amount: string; date: string; status: 'completed' | 'pending' | 'failed' }[] = []

const HELP_RESULTS = [
  { id: 'h1', title: 'How do I send money internationally?', section: 'Transfers', readTime: '2 min' },
  { id: 'h2', title: 'Understanding FX fees and exchange rates', section: 'Pricing', readTime: '3 min' },
  { id: 'h3', title: 'Set up transaction limits and controls', section: 'Security', readTime: '4 min' },
]

const STATUS_DOT: Record<string, string> = {
  completed: '#22C55E',
  pending: '#F5B700',
  failed: '#FF4D4D',
}

export default function SearchResults({
  accountType = 'personal',
  onNavigate,
  onBack,
}: SearchResultsProps) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<Category>('all')

  const totalResults = PEOPLE_RESULTS.length + TX_RESULTS.length + HELP_RESULTS.length
  const hasResults = query.trim().length > 0

  const showPeople = activeFilter === 'all' || activeFilter === 'people'
  const showTx = activeFilter === 'all' || activeFilter === 'transactions'
  const showHelp = activeFilter === 'all' || activeFilter === 'help'

  const filteredPeople = showPeople ? PEOPLE_RESULTS : []
  const filteredTx = showTx ? TX_RESULTS : []
  const filteredHelp = showHelp ? HELP_RESULTS : []
  const empty = filteredPeople.length + filteredTx.length + filteredHelp.length === 0

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Custom sticky header with embedded search */}
      <div
        className="sticky top-0 z-40 px-4 pt-4 pb-3 flex flex-col gap-3"
        style={{ background: 'rgba(5,11,45,0.92)', backdropFilter: 'blur(12px)' }}
      >
        {/* Search row */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div
            className="flex-1 flex items-center gap-2 h-11 px-3 rounded-[--radius-2xl] glass"
            style={{ border: '1px solid rgba(175,197,255,0.18)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-text-muted">
              <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search…"
              className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="w-5 h-5 flex items-center justify-center">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="rgba(175,197,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {([['all', 'All'], ['people', 'People'], ['transactions', 'Transactions'], ['help', 'Help']] as [Category, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setActiveFilter(id)}
              className={`h-7 px-3 rounded-full font-body text-xs font-semibold whitespace-nowrap transition-all duration-[200ms] shrink-0
                ${activeFilter === id ? 'bg-accent text-[#050B2D]' : 'text-text-2 border border-[color:var(--color-border)]'}`}
              style={{ background: activeFilter === id ? undefined : 'rgba(175,197,255,0.04)' }}
            >
              {label}
            </button>
          ))}
        </div>

        {hasResults && !empty && (
          <p className="font-body text-[10px] text-text-muted px-1">
            {totalResults} results for "<span className="text-text-2">{query}</span>"
          </p>
        )}
      </div>

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {!hasResults || empty ? (
          /* ── Empty / no-query state ── */
          <div className="flex flex-col items-center gap-4 py-16 px-6">
            <div className="w-14 h-14 rounded-full flex items-center justify-center glass"
              style={{ border: '1px solid rgba(175,197,255,0.12)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <circle cx="10" cy="10" r="7.5" stroke="rgba(175,197,255,0.35)" strokeWidth="1.4" />
                <path d="M16 16l3.5 3.5" stroke="rgba(175,197,255,0.35)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
            <div className="text-center">
              <p className="font-body text-sm font-semibold text-text mb-1">
                {!hasResults ? 'Start typing to search' : `No results for "${query}"`}
              </p>
              <p className="font-body text-xs text-text-muted leading-relaxed">
                {!hasResults ? 'Search across people, transactions, and help articles' : 'Try a different term, or browse by category above'}
              </p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-3 flex flex-col gap-5">

            {/* ── People ── */}
            {filteredPeople.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">People</p>
                  <span className="font-body text-[10px] text-text-muted">{filteredPeople.length} found</span>
                </div>
                <GlassCard className="p-0 overflow-hidden divide-y divide-[color:var(--color-border)]">
                  {filteredPeople.map(p => (
                    <button key={p.id} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors text-left active:scale-[0.99]">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-body text-sm font-bold text-white"
                        style={{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color}44)`, border: `1px solid ${p.color}40` }}
                      >
                        {p.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-text truncate">{p.name}</p>
                        <p className="font-mono text-xs text-text-muted">{p.handle}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-mono text-xs text-text-2">{p.lastSent}</p>
                        <p className="font-body text-[10px] text-text-muted">{p.when}</p>
                      </div>
                    </button>
                  ))}
                </GlassCard>
              </section>
            )}

            {/* ── Transactions ── */}
            {filteredTx.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Transactions</p>
                  <span className="font-body text-[10px] text-text-muted">{filteredTx.length} found</span>
                </div>
                <GlassCard className="p-0 overflow-hidden divide-y divide-[color:var(--color-border)]">
                  {filteredTx.map(tx => (
                    <button key={tx.id} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors text-left active:scale-[0.99]">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg"
                        style={{ background: 'rgba(175,197,255,0.06)' }}>
                        {tx.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-text truncate">{tx.merchant}</p>
                        <p className="font-body text-xs text-text-muted">{tx.category}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <p className="font-mono text-sm font-semibold text-text">••••</p>
                          <p className="font-body text-[10px] text-text-muted">{tx.date}</p>
                        </div>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: STATUS_DOT[tx.status] }} />
                      </div>
                    </button>
                  ))}
                </GlassCard>
                <p className="font-body text-[10px] text-text-muted mt-2 px-1">Transaction amounts masked for privacy</p>
              </section>
            )}

            {/* ── Help Articles ── */}
            {filteredHelp.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Help Articles</p>
                  <span className="font-body text-[10px] text-text-muted">{filteredHelp.length} found</span>
                </div>
                <GlassCard className="p-0 overflow-hidden divide-y divide-[color:var(--color-border)]">
                  {filteredHelp.map(h => (
                    <button key={h.id} className="w-full flex items-start gap-3 px-4 py-3.5 hover:bg-white/[0.03] transition-colors text-left active:scale-[0.99]">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: 'rgba(0,102,255,0.08)' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M7 1a6 6 0 1 0 0 12A6 6 0 0 0 7 1Z" stroke="#AFC5FF" strokeWidth="1.1" />
                          <path d="M5.2 5.2a1.8 1.8 0 0 1 3.5.6c0 1.2-1.7 1.5-1.7 2.5" stroke="#AFC5FF" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="7" cy="10.5" r="0.7" fill="#AFC5FF" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-sm font-semibold text-text leading-snug">{h.title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="font-body text-[10px] text-accent">{h.section}</p>
                          <span className="text-text-muted">·</span>
                          <p className="font-body text-[10px] text-text-muted">{h.readTime} read</p>
                        </div>
                      </div>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-1">
                        <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </button>
                  ))}
                </GlassCard>
              </section>
            )}
          </div>
        )}
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
