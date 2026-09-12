import { useState } from 'react'
import { type BuyOrder } from './CryptoBuy'

export interface ReviewOrder extends BuyOrder {
  providerId: string
  providerName: string
  fee: number
  totalUSD: number
}

interface CryptoReviewProps {
  order?: ReviewOrder
  onConfirm?: () => void
  onBack?: () => void
}

const DEFAULT_ORDER: ReviewOrder = {
  symbol: 'BTC', name: 'Bitcoin', color: '#F7931A',
  amountUSD: 100, amountCrypto: 0.001602, price: 62410,
  providerId: 'liquidity-a', providerName: 'LiquidX',
  fee: 0.15, totalUSD: 100.15,
}

export default function CryptoReview({ order = DEFAULT_ORDER, onConfirm, onBack }: CryptoReviewProps) {
  const [riskAcknowledged, setRiskAcknowledged] = useState(false)
  const [confirming, setConfirming] = useState(false)

  const handleConfirm = () => {
    if (!riskAcknowledged || confirming) return
    setConfirming(true)
    setTimeout(() => {
      setConfirming(false)
      onConfirm?.()
    }, 500)
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Review Order</p>
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
          <p className="font-body text-xs text-text-muted">Buying</p>
          <p
            className="font-display text-4xl font-extrabold tracking-tighter"
            style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            ${order.amountUSD.toFixed(2)}
          </p>
          <p className="font-mono text-sm text-text-muted">
            ≈ {order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} {order.symbol}
          </p>
        </div>

        {/* Order detail rows */}
        <div
          className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-2.5"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          {[
            { label: 'Asset',      value: `${order.name} (${order.symbol})`,                           mono: false },
            { label: 'Amount',     value: `$${order.amountUSD.toFixed(2)}`,                            mono: false },
            { label: 'Price',      value: `$${order.price.toLocaleString('en-US', { maximumFractionDigits: 0 })} / ${order.symbol}`, mono: false },
            { label: 'You receive',value: `${order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} ${order.symbol}`, mono: true },
            { label: 'Provider',   value: order.providerName,                                          mono: false },
            { label: 'Fee',        value: feeLabel, green: order.fee === 0 },
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

          {/* Total row — highlighted */}
          <div
            className="flex items-center justify-between pt-3 mt-1 border-t border-[color:var(--color-border)]"
          >
            <p className="font-body text-sm font-bold text-text">Total charged</p>
            <p className="font-body text-sm font-bold text-text">${order.totalUSD.toFixed(2)}</p>
          </div>
        </div>

        {/* Risk acknowledgement */}
        <button
          onClick={() => setRiskAcknowledged(p => !p)}
          className="flex items-start gap-3 w-full text-left px-4 py-4 rounded-[--radius-2xl] transition-all duration-[180ms] active:scale-[0.99]"
          style={{
            background: riskAcknowledged ? 'rgba(34,197,94,0.06)' : 'rgba(245,183,0,0.05)',
            border: `1.5px solid ${riskAcknowledged ? 'rgba(34,197,94,0.25)' : 'rgba(245,183,0,0.2)'}`,
          }}
        >
          {/* Checkbox */}
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all duration-[150ms]"
            style={{
              background: riskAcknowledged ? '#22C55E' : 'transparent',
              border: `1.5px solid ${riskAcknowledged ? '#22C55E' : 'rgba(245,183,0,0.5)'}`,
            }}
          >
            {riskAcknowledged && (
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div>
            <p className="font-body text-xs font-semibold text-text mb-1">I understand the risks</p>
            <p className="font-body text-[10px] text-text-muted leading-relaxed">
              Cryptocurrency investments are highly volatile. The value of {order.symbol} can go up or down significantly. I may lose some or all of my investment. This is not financial advice.
            </p>
          </div>
        </button>

        {/* Confirm */}
        <button
          onClick={handleConfirm}
          disabled={!riskAcknowledged || confirming}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-35"
          style={{ background: 'var(--gradient-primary)' }}
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
              Confirm & Buy {order.symbol}
            </>
          )}
        </button>

        {/* Legal footer */}
        <p className="font-body text-[9px] text-text-muted text-center leading-relaxed opacity-60">
          Executed via {order.providerName}. ChangeAIPay is not a financial adviser. Crypto assets are not covered by the Financial Services Compensation Scheme (FSCS).
        </p>
      </div>
    </div>
  )
}
