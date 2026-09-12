import { useState, useMemo } from 'react'
import { TransactionRow } from '@/components/Card'
import { BottomNav } from '@/components/Nav'
import { TRANSACTIONS, type Transaction } from '@/data/transactions'

interface TransactionHistoryProps {
  accountType?: 'personal' | 'business'
  onNavigate?: (tab: string) => void
  onSelectTransaction?: (tx: Transaction) => void
  onSearch?: () => void
  onFilter?: () => void
  onExport?: () => void
  onBack?: () => void
}

const TX_ICONS: Record<string, React.ReactNode> = {
  sent:       <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12l10-10M12 2H5M12 2v7" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  received:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M12 2L2 12M2 12H9M2 12V5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  refund:     <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11.5 2A5.5 5.5 0 0 0 1.5 6.5M1.5 11A5.5 5.5 0 0 0 11.5 6.5" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" /><path d="M1.5 2v3H4.5" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  topup:      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  withdrawal: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M2 7h10" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" style={{ transform: 'rotate(45deg)', transformOrigin: '7px 7px' }} /><path d="M2 7h10" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" /></svg>,
}

function groupByDate(txs: Transaction[]) {
  const map = new Map<string, Transaction[]>()
  for (const tx of txs) {
    const group = tx.dateGroup
    if (!map.has(group)) map.set(group, [])
    map.get(group)!.push(tx)
  }
  return map
}

export default function TransactionHistory({
  accountType = 'personal',
  onNavigate,
  onSelectTransaction,
  onSearch,
  onFilter,
  onExport,
  onBack,
}: TransactionHistoryProps) {
  const [refreshing, setRefreshing] = useState(false)
  const [filterType, setFilterType] = useState<string>('All')

  const filtered = useMemo(() => {
    if (filterType === 'All') return TRANSACTIONS
    return TRANSACTIONS.filter(tx => {
      if (filterType === 'Sent')       return tx.type === 'sent'
      if (filterType === 'Received')   return tx.type === 'received' || tx.type === 'topup'
      if (filterType === 'Refunds')    return tx.type === 'refund'
      return true
    })
  }, [filterType])

  const grouped = useMemo(() => groupByDate(filtered), [filtered])

  const handleRefresh = () => {
    if (refreshing) return
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1400)
  }

  const FILTER_CHIPS = ['All', 'Sent', 'Received', 'Refunds']

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Transactions</p>
        <button
          onClick={onSearch}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
          aria-label="Search"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="8" cy="8" r="5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" />
            <path d="M12 12l4 4" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={onFilter}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
          aria-label="Filter"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M2 5h14M5 9h8M8 13h2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </button>
        <button
          onClick={onExport}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors"
          aria-label="Export"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 12v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M9 2v9M6 8l3 3 3-3" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 px-5 mb-3 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {FILTER_CHIPS.map(chip => (
          <button
            key={chip}
            onClick={() => setFilterType(chip)}
            className="h-8 px-3.5 rounded-full font-body text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-[200ms]"
            style={{
              background: filterType === chip ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.06)',
              border: `1px solid ${filterType === chip ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.12)'}`,
              color: filterType === chip ? '#AFC5FF' : 'rgba(175,197,255,0.5)',
            }}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Pull-to-refresh strip — reuses Screen 51 pattern */}
      <button
        onClick={handleRefresh}
        className="mx-5 mb-3 flex items-center justify-center gap-2 h-9 rounded-[--radius-xl] transition-all duration-[200ms]"
        style={{
          background: refreshing ? 'rgba(63,231,255,0.08)' : 'rgba(175,197,255,0.04)',
          border: `1px solid ${refreshing ? 'rgba(63,231,255,0.2)' : 'rgba(175,197,255,0.1)'}`,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }}>
          <path d="M10 2A4.5 4.5 0 0 0 1.5 5.5M1.5 10A4.5 4.5 0 0 0 10 5.5"
            stroke={refreshing ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.2" strokeLinecap="round" />
          <path d="M10 2v2.5H7.5" stroke={refreshing ? '#3FE7FF' : 'rgba(175,197,255,0.4)'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className={`font-body text-xs ${refreshing ? 'text-accent' : 'text-text-muted'}`}>
          {refreshing ? 'Refreshing…' : 'Pull to refresh'}
        </span>
      </button>

      {/* Transaction list */}
      <div className="flex-1 overflow-y-auto px-5 pb-28" style={{ scrollbarWidth: 'none' }}>
        {[...grouped.entries()].map(([dateGroup, txs]) => (
          <div key={dateGroup} className="mb-5">
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">{dateGroup}</p>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              {txs.map(tx => (
                <button
                  key={tx.id}
                  onClick={() => onSelectTransaction?.(tx)}
                  className="w-full text-left transition-colors hover:bg-surface-hi active:bg-surface-hi"
                >
                  <div className="px-4">
                    <TransactionRow
                      icon={
                        <div style={{ color: tx.positive ? '#22C55E' : 'rgba(175,197,255,0.7)' }}>
                          {TX_ICONS[tx.type]}
                        </div>
                      }
                      merchant={tx.merchant}
                      category={tx.category}
                      amount={tx.amount}
                      date={tx.time}
                      status={tx.status}
                      positive={tx.positive}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" stroke="rgba(175,197,255,0.15)" strokeWidth="1.5" />
              <path d="M14 20h12M20 14v12" stroke="rgba(175,197,255,0.2)" strokeWidth="1.5" strokeLinecap="round" style={{ transform: 'rotate(45deg)', transformOrigin: '20px 20px' }} />
            </svg>
            <p className="font-body text-sm text-text-muted">No {filterType.toLowerCase()} transactions</p>
          </div>
        )}
      </div>

      <BottomNav active="history" onChange={onNavigate} accountType={accountType} />
    </div>
  )
}
