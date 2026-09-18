import { useState } from 'react'

type TxFilter = 'all' | 'payment' | 'payout' | 'refund'

interface MerchantTx {
  id: string
  type: 'payment' | 'payout' | 'refund'
  label: string
  sub: string
  amount: string
  date: string
  status: 'completed' | 'pending'
}

const ALL_TXS: MerchantTx[] = []

const FILTER_LABELS: { id: TxFilter; label: string }[] = [
  { id: 'all',     label: 'All' },
  { id: 'payment', label: 'Payments' },
  { id: 'payout',  label: 'Payouts' },
  { id: 'refund',  label: 'Refunds' },
]

const TYPE_CFG = {
  payment: {
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.12)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  payout: {
    color: '#0066FF',
    bg: 'rgba(0,102,255,0.12)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v8M5 7l3-4 3 4M3 13h10" stroke="#0066FF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  refund: {
    color: '#F87171',
    bg: 'rgba(239,68,68,0.12)',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 3v8M5 7l3 4 3-4M3 13h10" stroke="#F87171" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
}

interface MerchantTransactionHistoryProps {
  onBack?: () => void
  onSelectTx?: (id: string) => void
}

export default function MerchantTransactionHistory({ onBack, onSelectTx }: MerchantTransactionHistoryProps) {
  const [filter, setFilter] = useState<TxFilter>('all')
  const [search, setSearch] = useState('')

  const filtered = ALL_TXS.filter(tx => {
    const matchFilter = filter === 'all' || tx.type === filter
    const matchSearch = !search || tx.label.toLowerCase().includes(search.toLowerCase()) || tx.sub.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const dates = [...new Set(filtered.map(tx => tx.date))]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Transactions</p>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 5h12M5 9h8M7 13h4" stroke="rgba(175,197,255,0.6)" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Search */}
      <div className="px-5 mb-3 shrink-0">
        <div
          className="flex items-center gap-2.5 px-4 h-10 rounded-full"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M9.5 9.5l3 3" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
            placeholder="Search transactions…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-5 pb-3 shrink-0">
        {FILTER_LABELS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className="px-3.5 h-8 rounded-full font-body text-xs font-semibold transition-all"
            style={{
              background: filter === f.id ? 'var(--color-accent)' : 'rgba(175,197,255,0.06)',
              color: filter === f.id ? 'white' : 'rgba(175,197,255,0.55)',
              border: filter === f.id ? 'none' : '1px solid rgba(175,197,255,0.12)',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {dates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="18" stroke="rgba(175,197,255,0.15)" strokeWidth="1.5" />
              <path d="M13 20h14M20 13v14" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="font-body text-sm text-text-muted">No transactions found</p>
          </div>
        ) : (
          dates.map(date => {
            const group = filtered.filter(tx => tx.date === date)
            const groupTotal = group.reduce((acc, tx) => {
              const val = parseFloat(tx.amount.replace(/[^0-9.-]/g, ''))
              return acc + val
            }, 0)
            return (
              <div key={date}>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted">{date}</p>
                  <p
                    className="font-mono text-xs font-semibold"
                    style={{ color: groupTotal >= 0 ? 'rgba(34,197,94,0.7)' : 'rgba(248,113,113,0.7)' }}
                  >
                    {groupTotal >= 0 ? '+' : ''}{groupTotal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </p>
                </div>
                <div
                  className="rounded-[--radius-2xl] overflow-hidden"
                  style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
                >
                  {group.map((tx, i) => {
                    const cfg = TYPE_CFG[tx.type]
                    return (
                      <button
                        key={tx.id}
                        onClick={() => onSelectTx?.(tx.id)}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface/50"
                        style={{ borderBottom: i < group.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}
                      >
                        <div
                          className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
                          style={{ background: cfg.bg }}
                        >
                          {cfg.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-body text-xs font-semibold text-text">{tx.label}</p>
                          <p className="font-body text-[10px] text-text-muted truncate">{tx.sub}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p
                            className="font-mono text-xs font-semibold"
                            style={{ color: tx.amount.startsWith('+') ? '#22C55E' : tx.type === 'refund' ? '#F87171' : 'rgba(175,197,255,0.6)' }}
                          >
                            {tx.amount}
                          </p>
                          <p
                            className="font-body text-[9px] capitalize"
                            style={{ color: tx.status === 'completed' ? 'rgba(34,197,94,0.6)' : 'rgba(245,183,0,0.7)' }}
                          >
                            {tx.status}
                          </p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
