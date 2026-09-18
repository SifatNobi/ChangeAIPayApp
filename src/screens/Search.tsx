import { useState, useRef } from 'react'
import { BottomNav } from '@/components/Nav'
import { Chip } from '@/components/Card'

interface SearchProps {
  accountType?: 'personal' | 'business'
  onNavigate: (tab: string) => void
  onBack?: () => void
}

const RECENT_SEARCHES: string[] = []
const CATEGORIES = ['Payments', 'Transactions', 'Contacts', 'Cards', 'Subscriptions', 'Transfers']
const FILTERS = ['All', 'Sent', 'Received', 'Pending', 'Failed']

const MOCK_RESULTS: { icon: string; title: string; subtitle: string; amount: string; date: string; type: string }[] = []

function SearchResultRow({
  icon, title, subtitle, amount, date, masked,
}: { icon: string; title: string; subtitle: string; amount: string; date: string; masked?: boolean }) {
  const displayAmount = masked ? '••••' : amount
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-hi transition-colors text-left">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-lg"
        style={{ background: 'rgba(175,197,255,0.06)' }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-semibold text-text truncate">{title}</p>
        <p className="font-body text-xs text-text-muted truncate">{subtitle}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="font-mono text-sm font-semibold text-text">{displayAmount}</p>
        {date && <p className="font-body text-[10px] text-text-muted">{date}</p>}
      </div>
    </button>
  )
}

export default function Search({ accountType = 'personal', onNavigate, onBack }: SearchProps) {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [recentList, setRecentList] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const hasQuery = query.trim().length > 0
  const results = hasQuery
    ? MOCK_RESULTS.filter(r => r.title.toLowerCase().includes(query.toLowerCase()))
    : []

  const clearAll = () => setRecentList([])
  const removeRecent = (term: string) => setRecentList(l => l.filter(t => t !== term))
  const applyRecent = (term: string) => { setQuery(term); inputRef.current?.focus() }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Search header */}
      <div
        className="flex items-center gap-3 px-4 pt-4 pb-3 sticky top-0 z-40"
        style={{ background: 'var(--color-bg)', backdropFilter: 'blur(8px)' }}
      >
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4l-5 5 5 5" stroke="var(--color-text)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="flex-1 flex items-center gap-2 h-11 px-3 rounded-[--radius-2xl]"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 text-text-muted">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search transactions, contacts…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
          />
          {hasQuery && (
            <button
              onClick={() => setQuery('')}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
              style={{ background: 'rgba(175,197,255,0.1)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 2l6 6M8 2l-6 6" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto pb-24 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Filter chips */}
        <div className="flex gap-2 px-4 mb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`h-8 px-3 rounded-full font-body text-xs font-semibold whitespace-nowrap transition-colors
                ${activeFilter === f ? 'bg-accent text-[#050B2D]' : 'bg-surface text-text-2 border border-[color:var(--color-border)]'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* === Empty state (no query) === */}
        {!hasQuery && (
          <div className="flex flex-col gap-6 px-4">
            {/* Recent searches */}
            {recentList.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Recent</p>
                  <button
                    onClick={clearAll}
                    className="font-body text-xs text-accent min-h-[44px] flex items-center"
                  >
                    Clear All
                  </button>
                </div>
                <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden divide-y divide-[color:var(--color-border)]">
                  {recentList.map(term => (
                    <div key={term} className="flex items-center gap-3 px-4 py-3.5">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text-muted shrink-0">
                        <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
                        <path d="M7 4v3.5l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <button
                        onClick={() => applyRecent(term)}
                        className="flex-1 font-body text-sm text-text-2 text-left hover:text-text transition-colors"
                      >
                        {term}
                      </button>
                      <button
                        onClick={() => removeRecent(term)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
                      >
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 2l6 6M8 2l-6 6" stroke="rgba(175,197,255,0.35)" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Category suggestions */}
            <div>
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Browse</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setQuery(cat)}
                    className="h-12 px-4 rounded-[--radius-xl] flex items-center gap-2 font-body text-sm text-text-2 transition-colors hover:text-text hover:bg-surface-hi"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5.5" stroke="#AFC5FF" strokeOpacity="0.4" strokeWidth="1.1" />
                      <circle cx="7" cy="7" r="2" fill="#AFC5FF" fillOpacity="0.35" />
                    </svg>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* === Results state === */}
        {hasQuery && (
          <div className="flex flex-col gap-4 px-4">
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-4 py-16">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" />
                    <path d="M17 17l4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8 11h6M11 8v6" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="font-body text-sm font-semibold text-text mb-1">No results for "{query}"</p>
                  <p className="font-body text-xs text-text-muted">Try a different keyword or browse by category</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <p className="font-body text-xs text-text-muted">{results.length} result{results.length !== 1 ? 's' : ''}</p>
                  <Chip label="Masked" variant="info" />
                </div>
                <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden divide-y divide-[color:var(--color-border)]">
                  {results.map((r, i) => (
                    <SearchResultRow key={i} {...r} masked />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <BottomNav active="home" accountType={accountType} onChange={tab => onNavigate(tab)} />
    </div>
  )
}
