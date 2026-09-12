import { useState } from 'react'
import { type BuyOrder } from './CryptoBuy'

interface CryptoProviderComparisonProps {
  order?: BuyOrder
  onSelect?: (providerId: string) => void
  onBack?: () => void
}

interface Provider {
  id: string
  name: string
  abbr: string
  color: string
  rate: number
  feeFlat: number
  feePct: number
  settlementTime: string
  youReceive: number
  tags: string[]
  bestFor: string
}

function buildProviders(order: BuyOrder): Provider[] {
  const base = order.amountCrypto
  return [
    {
      id: 'liquidity-a', name: 'LiquidX',     abbr: 'LX', color: '#3FE7FF',
      rate: order.price * 0.9985, feeFlat: 0,   feePct: 0.15,
      settlementTime: 'Instant', youReceive: base * 1.0002,
      tags: ['Best rate', 'Instant'],
      bestFor: 'Best rate & speed',
    },
    {
      id: 'liquidity-b', name: 'CoinRoute',   abbr: 'CR', color: '#AFC5FF',
      rate: order.price * 0.997,  feeFlat: 0.50, feePct: 0.10,
      settlementTime: '< 1 min', youReceive: base * 0.9998,
      tags: ['Low flat fee'],
      bestFor: 'Small amounts',
    },
    {
      id: 'liquidity-c', name: 'TradeNova',   abbr: 'TN', color: '#9945FF',
      rate: order.price * 0.995,  feeFlat: 0,   feePct: 0.25,
      settlementTime: '~2 min',  youReceive: base * 0.9990,
      tags: [],
      bestFor: 'Deep liquidity',
    },
  ]
}

function Badge({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span
      className="inline-flex h-5 px-2 rounded-full font-body text-[10px] font-semibold items-center"
      style={{
        background: highlight ? 'rgba(63,231,255,0.12)' : 'rgba(175,197,255,0.07)',
        border: `1px solid ${highlight ? 'rgba(63,231,255,0.3)' : 'rgba(175,197,255,0.15)'}`,
        color: highlight ? '#3FE7FF' : 'rgba(175,197,255,0.55)',
      }}
    >
      {label}
    </span>
  )
}

function ProviderRow({
  p, selected, onSelect, order,
}: { p: Provider; selected: boolean; onSelect: () => void; order: BuyOrder }) {
  const fee = p.feeFlat + (order.amountUSD * p.feePct / 100)
  const feeLabel = fee === 0 ? 'Free' : `$${fee.toFixed(2)}`
  const feeGreen = fee === 0

  return (
    <button
      onClick={onSelect}
      className="w-full text-left flex flex-col gap-3 px-4 py-4 rounded-[--radius-2xl] transition-all duration-[180ms] active:scale-[0.99]"
      style={{
        background: selected ? 'rgba(0,102,255,0.08)' : 'rgba(175,197,255,0.03)',
        border: `1.5px solid ${selected ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.09)'}`,
      }}
    >
      {/* Top row: provider identity + selection */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-xs font-extrabold shrink-0"
          style={{ background: p.color + '18', border: `1px solid ${p.color}35`, color: p.color }}
        >
          {p.abbr}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-body text-sm font-semibold text-text">{p.name}</p>
            {p.tags.map(t => <Badge key={t} label={t} highlight={t === 'Best rate' || t === 'Instant'} />)}
          </div>
          <p className="font-body text-[10px] text-text-muted">{p.bestFor}</p>
        </div>
        <div
          className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
          style={{ borderColor: selected ? '#0066FF' : 'rgba(175,197,255,0.3)' }}
        >
          {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#0066FF]" />}
        </div>
      </div>

      {/* Comparison grid */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Rate',      value: `$${p.rate.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}` },
          { label: 'Fee',       value: feeLabel, green: feeGreen },
          { label: 'Time',      value: p.settlementTime },
        ].map(cell => (
          <div
            key={cell.label}
            className="flex flex-col items-center gap-0.5 py-2 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
          >
            <p className="font-body text-[9px] text-text-muted uppercase tracking-wide">{cell.label}</p>
            <p className="font-body text-xs font-semibold" style={{ color: cell.green ? '#22C55E' : '#AFC5FF' }}>{cell.value}</p>
          </div>
        ))}
      </div>

      {/* You receive */}
      <div className="flex items-center justify-between">
        <p className="font-body text-xs text-text-muted">You receive</p>
        <p className="font-mono text-xs font-semibold text-text-2">
          {p.youReceive.toFixed(6).replace(/\.?0+$/, '')} {order.symbol}
        </p>
      </div>
    </button>
  )
}

export default function CryptoProviderComparison({ order, onSelect, onBack }: CryptoProviderComparisonProps) {
  const defaultOrder: BuyOrder = { symbol: 'BTC', name: 'Bitcoin', color: '#F7931A', amountUSD: 100, amountCrypto: 0.001602, price: 62410 }
  const o = order ?? defaultOrder
  const providers = buildProviders(o)
  const [selectedId, setSelectedId] = useState(providers[0].id)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Compare Providers</p>
          <p className="font-body text-xs text-text-muted">
            Buying {o.amountUSD > 0 ? `$${o.amountUSD.toFixed(2)}` : '—'} of {o.symbol}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {/* Order summary pill */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold shrink-0"
            style={{ background: o.color + '20', border: `1px solid ${o.color}40`, color: o.color }}
          >
            {o.symbol.slice(0, 1)}
          </div>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">{o.name}</p>
            <p className="font-body text-xs text-text-muted">${o.price.toLocaleString()} / {o.symbol}</p>
          </div>
          <p className="font-body text-sm font-semibold text-text-2">${o.amountUSD.toFixed(2)}</p>
        </div>

        {/* Provider list */}
        <div className="flex flex-col gap-3">
          {providers.map(p => (
            <ProviderRow key={p.id} p={p} selected={selectedId === p.id} onSelect={() => setSelectedId(p.id)} order={o} />
          ))}
        </div>

        {/* Rate disclaimer */}
        <div
          className="flex items-start gap-2 px-3.5 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="mt-0.5 shrink-0">
            <circle cx="6" cy="6" r="5" stroke="rgba(175,197,255,0.3)" strokeWidth="1" />
            <path d="M6 4v3M6 8.5v.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            Rates are live and may change before your order executes. Fees shown are estimates. Final amounts confirmed at checkout. ChangeAIPay routes through regulated liquidity providers — no proprietary settlement rail is used for investments.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={() => onSelect?.(selectedId)}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Continue with {providers.find(p => p.id === selectedId)?.name}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
