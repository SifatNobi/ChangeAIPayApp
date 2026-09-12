import { useState, useMemo, useRef } from 'react'
import { TRANSACTIONS, type Transaction } from '@/data/transactions'

interface TransactionSearchProps {
  onSelectTransaction?: (tx: Transaction) => void
  onBack?: () => void
}

const TYPE_LABELS: Record<string, string> = {
  sent: 'Sent', received: 'Received', refund: 'Refund', topup: 'Added', withdrawal: 'Withdrawn',
}

const STATUS_COLORS: Record<string, string> = {
  completed: '#22C55E', pending: '#F5B700', failed: '#FF4D5A',
}

const TX_ICONS: Record<string, React.ReactNode> = {
  sent:       <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12l10-10M12 2H5M12 2v7" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  received:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 2L2 12M2 12H9M2 12V5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  refund:     <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 2A5.5 5.5 0 0 0 1.5 6.5M1.5 11A5.5 5.5 0 0 0 11.5 6.5" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" /><path d="M1.5 2v3H4.5" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  topup:      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  withdrawal: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 9l5 3 5-3M2 6l5 3 5-3M7 2v1" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
}

export default function TransactionSearch({ onSelectTransaction, onBack }: TransactionSearchProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return TRANSACTIONS.filter(tx =>
      tx.merchant.toLowerCase().includes(q) ||
      tx.category.toLowerCase().includes(q) ||
      (tx.counterpartyHandle?.toLowerCase().includes(q)) ||
      tx.transactionId.toLowerCase().includes(q) ||
      tx.amount.includes(q)
    )
  }, [query])

  const hasQuery = query.trim().length > 0

  function highlight(text: string) {
    const q = query.trim()
    if (!q) return <span>{text}</span>
    const idx = text.toLowerCase().indexOf(q.toLowerCase())
    if (idx === -1) return <span>{text}</span>
    return (
      <span>
        {text.slice(0, idx)}
        <span className="text-accent">{text.slice(idx, idx + q.length)}</span>
        {text.slice(idx + q.length)}
      </span>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Search bar header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div
          className="flex-1 flex items-center gap-2.5 h-11 px-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)' }}
        >
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <circle cx="6.5" cy="6.5" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" />
            <path d="M10 10l3.5 3.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search transactions…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
          />
          {hasQuery && (
            <button onClick={() => setQuery('')} className="w-5 h-5 flex items-center justify-center rounded-full" style={{ background: 'rgba(175,197,255,0.12)' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 2l4 4M6 2L2 6" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-6" style={{ scrollbarWidth: 'none' }}>
        {/* Empty state — no query */}
        {!hasQuery && (
          <div className="flex flex-col items-center gap-3 pt-16">
            <div
              className="w-16 h-16 rounded-[--radius-2xl] flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <circle cx="11" cy="11" r="7" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" />
                <path d="M17 17l6 6" stroke="rgba(175,197,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <p className="font-body text-sm font-semibold text-text-muted">Search your transactions</p>
            <p className="font-body text-xs text-text-muted text-center leading-relaxed">
              Find by name, category, handle,<br />amount, or transaction ID.
            </p>
          </div>
        )}

        {/* Results */}
        {hasQuery && results.length > 0 && (
          <>
            <p className="font-body text-xs text-text-muted mb-3">{results.length} result{results.length !== 1 ? 's' : ''}</p>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              {results.map((tx, i) => (
                <button
                  key={tx.id}
                  onClick={() => onSelectTransaction?.(tx)}
                  className="w-full text-left flex items-center gap-3 px-4 py-3.5 hover:bg-surface-hi active:bg-surface-hi transition-colors"
                  style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.1)' }}
                  >
                    {TX_ICONS[tx.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold text-text truncate">{highlight(tx.merchant)}</p>
                    <p className="font-body text-xs text-text-muted">
                      {TYPE_LABELS[tx.type]} · {tx.date}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <p className={`font-body text-sm font-semibold ${tx.positive ? 'text-success' : 'text-text-2'}`}>
                      {tx.positive ? '+' : ''}{tx.amount}
                    </p>
                    <div
                      className="h-4 px-1.5 rounded-full flex items-center"
                      style={{ background: `${STATUS_COLORS[tx.status]}15` }}
                    >
                      <p className="font-body text-[10px] font-semibold capitalize" style={{ color: STATUS_COLORS[tx.status] }}>
                        {tx.status}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* No results */}
        {hasQuery && results.length === 0 && (
          <div className="flex flex-col items-center gap-3 pt-16">
            <div
              className="w-16 h-16 rounded-[--radius-2xl] flex items-center justify-center"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <circle cx="11" cy="11" r="7" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" />
                <path d="M17 17l6 6" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 11h6M11 8v6" stroke="rgba(175,197,255,0.2)" strokeWidth="1.2" strokeLinecap="round" style={{ transform: 'rotate(45deg)', transformOrigin: '11px 11px' }} />
              </svg>
            </div>
            <p className="font-body text-sm font-semibold text-text-muted">No results for "{query}"</p>
            <p className="font-body text-xs text-text-muted text-center">Try a different name, amount, or ID.</p>
          </div>
        )}
      </div>
    </div>
  )
}
