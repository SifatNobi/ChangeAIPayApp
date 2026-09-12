import { useState, useMemo } from 'react'

interface CryptoHistoryProps {
  onBack?: () => void
}

type TxKind = 'buy' | 'sell' | 'deposit' | 'withdraw'

interface CryptoTx {
  id: string
  kind: TxKind
  symbol: string
  name: string
  color: string
  amountCrypto: number
  amountUSD: number
  date: string
  time: string
  dateGroup: string
  status: 'completed' | 'pending' | 'failed'
}

const CRYPTO_TX: CryptoTx[] = []

const KIND_CONFIG: Record<TxKind, { label: string; labelColor: string; sign: string; signColor: string; icon: React.ReactNode }> = {
  buy:      { label: 'Buy',      labelColor: '#3FE7FF', sign: '-', signColor: 'rgba(175,197,255,0.7)', icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 11l9-9M11 2H5M11 2v6" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  sell:     { label: 'Sell',     labelColor: '#22C55E', sign: '+', signColor: '#22C55E', icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11 2L2 11M2 11H8M2 11V5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  deposit:  { label: 'Deposit',  labelColor: '#AFC5FF', sign: '+', signColor: '#AFC5FF', icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 2v7M4 6.5l2.5 2.5 2.5-2.5M2 11h9" stroke="#AFC5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  withdraw: { label: 'Withdraw', labelColor: 'rgba(175,197,255,0.5)', sign: '-', signColor: 'rgba(175,197,255,0.6)', icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 9V2M4 4.5L6.5 2l2.5 2.5M2 11h9" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
}

const STATUS_COLORS: Record<string, string> = { completed: '#22C55E', pending: '#F5B700', failed: '#FF4D5A' }

const ASSET_FILTERS = ['All', 'BTC', 'ETH', 'SOL']
const KIND_FILTERS = ['All', 'Buy', 'Sell', 'Deposit', 'Withdraw']

export default function CryptoHistory({ onBack }: CryptoHistoryProps) {
  const [assetFilter, setAssetFilter] = useState('All')
  const [kindFilter, setKindFilter] = useState('All')

  const filtered = useMemo(() => {
    return CRYPTO_TX.filter(tx => {
      if (assetFilter !== 'All' && tx.symbol !== assetFilter) return false
      if (kindFilter  !== 'All' && tx.kind !== kindFilter.toLowerCase()) return false
      return true
    })
  }, [assetFilter, kindFilter])

  const grouped = useMemo(() => {
    const m = new Map<string, CryptoTx[]>()
    for (const tx of filtered) {
      if (!m.has(tx.dateGroup)) m.set(tx.dateGroup, [])
      m.get(tx.dateGroup)!.push(tx)
    }
    return m
  }, [filtered])

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Crypto History</p>
      </div>

      {/* Asset filter row */}
      <div className="flex gap-2 px-5 mb-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {ASSET_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setAssetFilter(f)}
            className="h-7 px-3 rounded-full font-body text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-[180ms]"
            style={{
              background: assetFilter === f ? 'rgba(0,102,255,0.18)' : 'rgba(175,197,255,0.05)',
              border: `1px solid ${assetFilter === f ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.12)'}`,
              color: assetFilter === f ? '#AFC5FF' : 'rgba(175,197,255,0.45)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Kind filter row */}
      <div className="flex gap-2 px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        {KIND_FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setKindFilter(f)}
            className="h-7 px-3 rounded-full font-body text-xs font-semibold whitespace-nowrap shrink-0 transition-all duration-[180ms]"
            style={{
              background: kindFilter === f ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.04)',
              border: `1px solid ${kindFilter === f ? 'rgba(63,231,255,0.25)' : 'rgba(175,197,255,0.1)'}`,
              color: kindFilter === f ? '#3FE7FF' : 'rgba(175,197,255,0.4)',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Transaction list */}
      <div className="flex-1 overflow-y-auto px-5 pb-8" style={{ scrollbarWidth: 'none' }}>
        {[...grouped.entries()].map(([dateGroup, txs]) => (
          <div key={dateGroup} className="mb-5">
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">{dateGroup}</p>
            <div
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              {txs.map((tx, i) => {
                const cfg = KIND_CONFIG[tx.kind]
                return (
                  <div
                    key={tx.id}
                    className="flex items-center gap-3 px-4 py-3.5"
                    style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
                  >
                    {/* Asset + kind icon */}
                    <div className="relative shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-extrabold"
                        style={{ background: tx.color + '18', border: `1px solid ${tx.color}35`, color: tx.color }}
                      >
                        {tx.symbol.slice(0, 1)}
                      </div>
                      <div
                        className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: '#0b1120', border: `1px solid rgba(175,197,255,0.15)` }}
                      >
                        {cfg.icon}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm font-semibold text-text">{tx.name}</p>
                      <div className="flex items-center gap-1.5">
                        <p className="font-body text-xs font-semibold" style={{ color: cfg.labelColor }}>{cfg.label}</p>
                        <span className="text-text-muted text-xs">·</span>
                        <p className="font-body text-xs text-text-muted">{tx.time}</p>
                        {tx.status !== 'completed' && (
                          <>
                            <span className="text-text-muted text-xs">·</span>
                            <div
                              className="h-4 px-1.5 rounded-full flex items-center"
                              style={{ background: STATUS_COLORS[tx.status] + '15' }}
                            >
                              <p className="font-body text-[9px] font-semibold capitalize" style={{ color: STATUS_COLORS[tx.status] }}>
                                {tx.status}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                      <p className="font-body text-sm font-semibold" style={{ color: cfg.signColor }}>
                        {cfg.sign}${tx.amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <p className="font-mono text-[10px] text-text-muted">
                        {tx.amountCrypto.toFixed(5).replace(/\.?0+$/, '')} {tx.symbol}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-3 py-16">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" stroke="rgba(175,197,255,0.12)" strokeWidth="1.5" />
              <path d="M14 20h12" stroke="rgba(175,197,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="font-body text-sm text-text-muted">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  )
}
