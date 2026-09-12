import { useState, useEffect } from 'react'
import Pulse from '@/components/Pulse'
import { type ReviewOrder } from './CryptoReview'

interface CryptoSuccessProps {
  order?: ReviewOrder
  updatedPortfolioValue?: number
  onDone?: () => void
  onViewPortfolio?: () => void
}

const DEFAULT_ORDER: ReviewOrder = {
  symbol: 'BTC', name: 'Bitcoin', color: '#F7931A',
  amountUSD: 100, amountCrypto: 0.001602, price: 62410,
  providerId: 'liquidity-a', providerName: 'LiquidX',
  fee: 0.15, totalUSD: 100.15,
}

export default function CryptoSuccess({
  order = DEFAULT_ORDER,
  updatedPortfolioValue = 2946.58,
  onDone,
  onViewPortfolio,
}: CryptoSuccessProps) {
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)

  // Pulse fires at 120ms — payment-completing family (same logic as Screens 57, 66)
  useEffect(() => {
    const t1 = setTimeout(() => { setCircleScale(1); setPulseTrigger(true) }, 120)
    const t2 = setTimeout(() => setCheckVisible(true), 480)
    const t3 = setTimeout(() => setDetailVisible(true), 760)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="flex flex-col items-center bg-bg" style={{ minHeight: 785 }}>
      {/* Pulse layer */}
      <div className="absolute inset-x-0 top-24 flex items-center justify-center pointer-events-none z-0">
        <Pulse trigger={pulseTrigger} width={320} height={50} color="#3FE7FF" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pt-16 pb-8 w-full flex-1">
        {/* Success circle */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-[500ms]"
          style={{
            transform: `scale(${circleScale})`,
            background: `linear-gradient(135deg, ${order.color}cc, ${order.color}66)`,
            boxShadow: circleScale === 1
              ? `0 0 0 16px ${order.color}14, 0 0 0 32px ${order.color}08`
              : 'none',
          }}
        >
          {checkVisible && (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-fade-in">
              <path d="M8 20l8 9 16-18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 42, strokeDashoffset: 0, animation: 'dash-in 0.4s ease forwards' }} />
            </svg>
          )}
        </div>

        <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-1">Purchase Complete!</h1>
        <p className="font-body text-sm text-text-muted mb-6 text-center">
          {order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} {order.symbol} added to your portfolio
        </p>

        {/* Detail card */}
        {detailVisible && (
          <div
            className="w-full rounded-[--radius-2xl] p-5 flex flex-col gap-3 animate-fade-in mb-4"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            {/* Asset row */}
            <div className="flex items-center gap-3 pb-3 border-b border-[color:var(--color-border)]">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-extrabold shrink-0"
                style={{ background: order.color + '20', border: `1px solid ${order.color}40`, color: order.color }}
              >
                {order.symbol.slice(0, 1)}
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-text">{order.name}</p>
                <p className="font-body text-xs text-text-muted">via {order.providerName}</p>
              </div>
            </div>

            {/* Detail rows */}
            {[
              { label: 'Purchased',   value: `${order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} ${order.symbol}` },
              { label: 'Paid',        value: `$${order.amountUSD.toFixed(2)}` },
              { label: 'Price at buy',value: `$${order.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}` },
              { label: 'Fee',         value: order.fee === 0 ? 'Free' : `$${order.fee.toFixed(2)}`, green: order.fee === 0 },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <p className="font-body text-xs text-text-muted">{r.label}</p>
                <p className="font-mono text-xs" style={{ color: r.green ? '#22C55E' : 'rgba(175,197,255,0.7)' }}>{r.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Updated portfolio value */}
        {detailVisible && (
          <div
            className="w-full rounded-[--radius-2xl] px-4 py-4 flex items-center justify-between mb-6 animate-fade-in"
            style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
          >
            <div>
              <p className="font-body text-xs text-text-muted mb-0.5">Portfolio value</p>
              <p
                className="font-display text-2xl font-extrabold tracking-tight"
                style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                ${updatedPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="flex items-center gap-1.5 h-7 px-3 rounded-full" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M2 6l2-4 2 4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-xs font-semibold text-success">Updated</p>
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Actions */}
        {detailVisible && (
          <div className="w-full flex flex-col gap-3 animate-fade-in">
            <button
              onClick={onViewPortfolio}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" />
                <path d="M4.5 7h5M7 4.5v5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" style={{ transform: 'rotate(45deg)', transformOrigin: '7px 7px' }} />
                <path d="M7 4.5v5M4.5 7h5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              View Portfolio
            </button>
            <button
              onClick={onDone}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all duration-[200ms] active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
