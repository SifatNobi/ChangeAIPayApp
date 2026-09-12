import { useState } from 'react'
import { type SellOrder } from './CryptoSell'

export interface SellConfirmationOrder extends SellOrder {
  fee: number
  proceeds: number
}

interface CryptoSellConfirmationProps {
  order?: SellConfirmationOrder
  onConfirm?: () => void
  onBack?: () => void
}

const DEFAULT_ORDER: SellConfirmationOrder = {
  symbol: 'BTC', name: 'Bitcoin', color: '#F7931A',
  amountCrypto: 0.006, amountUSD: 374.46, price: 62410,
  availableCrypto: 0.012, fee: 0, proceeds: 374.46,
}

export default function CryptoSellConfirmation({ order = DEFAULT_ORDER, onConfirm, onBack }: CryptoSellConfirmationProps) {
  const [confirming, setConfirming] = useState(false)

  const handle = () => {
    if (confirming) return
    setConfirming(true)
    setTimeout(() => { setConfirming(false); onConfirm?.() }, 500)
  }

  const feeLabel = order.fee === 0 ? 'Free' : `$${order.fee.toFixed(2)}`

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Review Sale</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Amount hero */}
        <div
          className="rounded-[--radius-2xl] px-5 py-6 flex flex-col items-center gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-display text-sm font-extrabold mb-1"
            style={{ background: order.color + '20', border: `1px solid ${order.color}40`, color: order.color }}
          >
            {order.symbol.slice(0, 1)}
          </div>
          <p className="font-body text-xs text-text-muted">Selling</p>
          <p
            className="font-display text-4xl font-extrabold tracking-tighter"
            style={{ background: 'linear-gradient(135deg,#22C55E,#4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            +${order.proceeds.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="font-mono text-sm text-text-muted">
            {order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} {order.symbol}
          </p>
        </div>

        {/* Order detail rows */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-2.5"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          {[
            { label: 'Asset',        value: `${order.name} (${order.symbol})`, mono: false },
            { label: 'Selling',      value: `${order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} ${order.symbol}`, mono: true },
            { label: 'Price at sale',value: `$${order.price.toLocaleString('en-US', { maximumFractionDigits: 0 })} / ${order.symbol}`, mono: false },
            { label: 'Subtotal',     value: `$${order.amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, mono: false },
            { label: 'Fee',          value: feeLabel, green: order.fee === 0 },
          ].map(row => (
            <div key={row.label} className="flex items-center justify-between py-0.5">
              <p className="font-body text-xs text-text-muted">{row.label}</p>
              <p
                className={`text-sm ${row.mono ? 'font-mono' : 'font-body font-semibold'}`}
                style={{ color: row.green ? '#22C55E' : '#AFC5FF' }}
              >
                {row.value}
              </p>
            </div>
          ))}

          <div className="flex items-center justify-between pt-3 mt-1 border-t border-[color:var(--color-border)]">
            <p className="font-body text-sm font-bold text-text">You receive</p>
            <p className="font-body text-sm font-bold text-success">
              +${order.proceeds.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Destination */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
            <rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="#22C55E" strokeWidth="1.2" />
            <path d="M5 4V3a2 2 0 0 1 6 0v1" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div className="flex-1">
            <p className="font-body text-xs font-semibold text-text">Credited to ChangeAIPay Balance</p>
            <p className="font-body text-[10px] text-text-muted">Funds appear instantly after sale confirms</p>
          </div>
          <p className="font-body text-sm font-bold text-success">
            +${order.proceeds.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Confirm */}
        <button
          onClick={handle}
          disabled={confirming}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg,#0066FF,#3FE7FF)' }}
        >
          {confirming ? (
            <>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: 'spin 0.8s linear infinite' }}>
                <path d="M8 2a6 6 0 1 1-4.24 1.76" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Processing…
            </>
          ) : (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Confirm & Sell {order.symbol}
            </>
          )}
        </button>

        <p className="font-body text-[9px] text-text-muted text-center leading-relaxed opacity-60">
          Sale executes at market price. Actual proceeds may differ slightly from estimates due to price movement during execution. Not financial advice.
        </p>
      </div>
    </div>
  )
}
