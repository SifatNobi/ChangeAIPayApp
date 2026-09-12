import { useState, useEffect } from 'react'
import Pulse from '@/components/Pulse'
import { type SellConfirmationOrder } from './CryptoSellConfirmation'

interface CryptoSellSuccessProps {
  order?: SellConfirmationOrder
  updatedPortfolioValue?: number
  updatedBalance?: number
  onDone?: () => void
  onViewPortfolio?: () => void
}

const DEFAULT_ORDER: SellConfirmationOrder = {
  symbol: 'BTC', name: 'Bitcoin', color: '#F7931A',
  amountCrypto: 0.006, amountUSD: 374.46, price: 62410,
  availableCrypto: 0.012, fee: 0, proceeds: 374.46,
}

export default function CryptoSellSuccess({
  order = DEFAULT_ORDER,
  updatedPortfolioValue = 2472.12,
  updatedBalance = 1622.96,
  onDone,
  onViewPortfolio,
}: CryptoSellSuccessProps) {
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [detailVisible, setDetailVisible] = useState(false)

  // Pulse fires at 120ms — payment-completing family (same as Screens 57, 66, 95)
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
        <Pulse trigger={pulseTrigger} width={320} height={50} color="#22C55E" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pt-16 pb-8 w-full flex-1">
        {/* Success circle — green for received funds */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-6 transition-all duration-[500ms]"
          style={{
            transform: `scale(${circleScale})`,
            background: 'linear-gradient(135deg, #00AA6C, #22C55E)',
            boxShadow: circleScale === 1 ? '0 0 0 16px rgba(34,197,94,0.08), 0 0 0 32px rgba(34,197,94,0.04)' : 'none',
          }}
        >
          {checkVisible && (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-fade-in">
              <path d="M8 20l8 9 16-18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                style={{ strokeDasharray: 42, strokeDashoffset: 0, animation: 'dash-in 0.4s ease forwards' }} />
            </svg>
          )}
        </div>

        <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-1">Sale Complete!</h1>
        <p className="font-body text-sm text-text-muted mb-6 text-center">
          {order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} {order.symbol} sold for{' '}
          <span className="text-success font-semibold">
            +${order.proceeds.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </p>

        {/* Detail card */}
        {detailVisible && (
          <div
            className="w-full rounded-[--radius-2xl] p-5 flex flex-col gap-3 animate-fade-in mb-4"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-[color:var(--color-border)]">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-extrabold shrink-0"
                style={{ background: order.color + '20', border: `1px solid ${order.color}40`, color: order.color }}
              >
                {order.symbol.slice(0, 1)}
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-text">{order.name} sold</p>
                <p className="font-mono text-xs text-text-muted">{order.amountCrypto.toFixed(6).replace(/\.?0+$/, '')} {order.symbol}</p>
              </div>
            </div>

            {[
              { label: 'Sale price', value: `$${order.price.toLocaleString('en-US', { maximumFractionDigits: 0 })} / ${order.symbol}` },
              { label: 'Fee',        value: order.fee === 0 ? 'Free' : `$${order.fee.toFixed(2)}`, green: order.fee === 0 },
              { label: 'Credited to',value: 'ChangeAIPay Balance' },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <p className="font-body text-xs text-text-muted">{r.label}</p>
                <p className="font-mono text-xs" style={{ color: r.green ? '#22C55E' : 'rgba(175,197,255,0.7)' }}>{r.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Updated balances */}
        {detailVisible && (
          <div className="w-full grid grid-cols-2 gap-3 mb-6 animate-fade-in">
            <div
              className="rounded-[--radius-xl] px-3 py-3.5 flex flex-col gap-1"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <p className="font-body text-[10px] text-text-muted">Portfolio</p>
              <p
                className="font-display text-base font-extrabold tracking-tight"
                style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
              >
                ${updatedPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div
              className="rounded-[--radius-xl] px-3 py-3.5 flex flex-col gap-1"
              style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)' }}
            >
              <p className="font-body text-[10px] text-text-muted">Balance</p>
              <p className="font-display text-base font-extrabold tracking-tight text-success">
                ${updatedBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
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
