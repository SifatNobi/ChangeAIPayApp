import { useState, useMemo } from 'react'

export interface SellOrder {
  symbol: string
  name: string
  color: string
  amountCrypto: number
  amountUSD: number
  price: number
  availableCrypto: number
  zeroFee?: boolean
}

interface CryptoSellProps {
  onContinue?: (order: SellOrder) => void
  onBack?: () => void
}

const HOLDINGS = [
  { symbol: 'XNO', name: 'Nano',     price:     0.17, change: +1.05, color: '#3FE7FF', colorDim: 'rgba(63,231,255,0.12)',  holding: 50,     holdingValue: 8.50,   zeroFee: true  },
  { symbol: 'BTC', name: 'Bitcoin',  price: 62410.00, change: +2.34, color: '#F7931A', colorDim: 'rgba(247,147,26,0.12)',  holding: 0.012,  holdingValue: 748.92, zeroFee: false },
  { symbol: 'ETH', name: 'Ethereum', price:  3282.00, change: -1.12, color: '#627EEA', colorDim: 'rgba(98,126,234,0.12)',  holding: 0.45,   holdingValue: 1476.90,zeroFee: false },
  { symbol: 'SOL', name: 'Solana',   price:   147.80, change: +5.61, color: '#9945FF', colorDim: 'rgba(153,69,255,0.12)',  holding: 4.2,    holdingValue: 620.76, zeroFee: false },
]

export default function CryptoSell({ onContinue, onBack }: CryptoSellProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [inputMode, setInputMode] = useState<'crypto' | 'usd'>('crypto')
  const [rawInput, setRawInput] = useState('')

  const asset = HOLDINGS[selectedIdx]

  const { amountCrypto, amountUSD } = useMemo(() => {
    const val = parseFloat(rawInput) || 0
    if (inputMode === 'crypto') {
      return { amountCrypto: val, amountUSD: val * asset.price }
    } else {
      return { amountCrypto: val / asset.price, amountUSD: val }
    }
  }, [rawInput, inputMode, asset.price])

  const isValid = amountCrypto > 0 && amountCrypto <= asset.holding
  const exceeds = amountCrypto > asset.holding && rawInput !== ''

  const handleMax = () => {
    setInputMode('crypto')
    setRawInput(asset.holding.toString())
  }

  const handlePct = (pct: number) => {
    setInputMode('crypto')
    setRawInput((asset.holding * pct).toFixed(6).replace(/\.?0+$/, ''))
  }

  const toggleMode = () => {
    setInputMode(m => {
      if (m === 'crypto') {
        setRawInput(amountUSD > 0 ? amountUSD.toFixed(2) : '')
        return 'usd'
      } else {
        setRawInput(amountCrypto > 0 ? amountCrypto.toFixed(6).replace(/\.?0+$/, '') : '')
        return 'crypto'
      }
    })
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Sell Crypto</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Asset selector — holdings only */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Select Asset to Sell</p>
          <div className="flex flex-col gap-2">
            {HOLDINGS.map((h, i) => (
              <button
                key={h.symbol}
                onClick={() => { setSelectedIdx(i); setRawInput('') }}
                className="flex items-center gap-3 h-16 px-4 rounded-[--radius-2xl] transition-all duration-[180ms] active:scale-[0.99]"
                style={{
                  background: selectedIdx === i ? h.colorDim : 'rgba(175,197,255,0.03)',
                  border: `1.5px solid ${selectedIdx === i ? h.color + '50' : 'rgba(175,197,255,0.09)'}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-display text-sm font-extrabold shrink-0"
                  style={{ background: h.colorDim, border: `1px solid ${h.color}40`, color: h.color }}
                >
                  {h.symbol.slice(0, 1)}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-body text-sm font-semibold text-text">{h.name}</p>
                  <p className="font-body text-xs text-text-muted">
                    {h.holding} {h.symbol} · ${h.price.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-0.5 shrink-0">
                  <p className="font-body text-sm font-semibold text-text-2">
                    ${h.holdingValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="font-body text-[10px]" style={{ color: h.change >= 0 ? '#22C55E' : '#FF4D5A' }}>
                    {h.change >= 0 ? '+' : ''}{h.change.toFixed(2)}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live price */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
            <p className="font-body text-xs text-text-muted">Live price</p>
          </div>
          <p className="font-body text-sm font-semibold text-text">
            ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / {asset.symbol}
          </p>
        </div>

        {/* Amount entry */}
        <div
          className="rounded-[--radius-2xl] px-5 py-5 flex flex-col items-center gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.18)' }}
        >
          <button
            onClick={toggleMode}
            className="flex items-center gap-1.5 h-7 px-3 rounded-full font-body text-xs font-semibold transition-all duration-[180ms]"
            style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 4l3-3 3 3M8 7l-3 3-3-3" stroke="#AFC5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Enter in {inputMode === 'crypto' ? 'USD' : asset.symbol}
          </button>

          <div className="flex items-baseline gap-1">
            {inputMode === 'usd' && <span className="font-display text-3xl font-extrabold text-text-muted">$</span>}
            <input
              type="number"
              inputMode="decimal"
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
              placeholder="0"
              className="bg-transparent font-display text-5xl font-extrabold text-center tracking-tighter outline-none w-48 placeholder:text-text-muted"
              style={{ color: exceeds ? '#FF4D5A' : isValid ? '#AFC5FF' : 'rgba(175,197,255,0.3)' }}
            />
            {inputMode === 'crypto' && <span className="font-display text-2xl font-extrabold text-text-muted">{asset.symbol}</span>}
          </div>

          <p className="font-body text-sm text-text-muted">
            {inputMode === 'crypto'
              ? `≈ $${amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
              : `≈ ${amountCrypto.toFixed(6).replace(/\.?0+$/, '')} ${asset.symbol}`
            }
          </p>

          {exceeds && (
            <p className="font-body text-xs text-[#FF4D5A]">Exceeds available balance</p>
          )}
        </div>

        {/* Percentage shortcuts */}
        <div className="flex gap-2">
          {[0.25, 0.5, 0.75, 1].map(pct => (
            <button
              key={pct}
              onClick={() => pct === 1 ? handleMax() : handlePct(pct)}
              className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold transition-all duration-[180ms]"
              style={{
                background: 'rgba(175,197,255,0.05)',
                border: '1px solid rgba(175,197,255,0.1)',
                color: 'rgba(175,197,255,0.55)',
              }}
            >
              {pct === 1 ? 'Max' : `${pct * 100}%`}
            </button>
          ))}
        </div>

        {/* Available balance */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}
        >
          <p className="font-body text-xs text-text-muted">Available</p>
          <div className="flex items-center gap-2">
            <p className="font-mono text-xs font-semibold text-text-2">{asset.holding} {asset.symbol}</p>
            <span className="text-text-muted">·</span>
            <p className="font-body text-xs text-text-muted">
              ${asset.holdingValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => isValid && onContinue?.({ symbol: asset.symbol, name: asset.name, color: asset.color, amountCrypto, amountUSD, price: asset.price, availableCrypto: asset.holding, zeroFee: asset.zeroFee })}
          disabled={!isValid}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-35"
          style={{ background: 'linear-gradient(135deg,#0066FF,#3FE7FF)' }}
        >
          Continue to Review
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
