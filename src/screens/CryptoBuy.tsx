import { useState, useMemo } from 'react'

export interface BuyOrder {
  symbol: string
  name: string
  color: string
  amountUSD: number
  amountCrypto: number
  price: number
  zeroFee?: boolean
}

interface CryptoBuyProps {
  onContinue?: (order: BuyOrder) => void
  onBack?: () => void
  onNetworkTransparency?: () => void
}

const ASSETS = [
  { symbol: 'XNO', name: 'Nano',     price:     0.17, change: +1.05, color: '#3FE7FF', colorDim: 'rgba(63,231,255,0.12)', zeroFee: true,  recommended: true  },
  { symbol: 'BTC', name: 'Bitcoin',  price: 62410.00, change: +2.34, color: '#F7931A', colorDim: 'rgba(247,147,26,0.12)', zeroFee: false, recommended: false },
  { symbol: 'ETH', name: 'Ethereum', price:  3282.00, change: -1.12, color: '#627EEA', colorDim: 'rgba(98,126,234,0.12)', zeroFee: false, recommended: false },
  { symbol: 'SOL', name: 'Solana',   price:   147.80, change: +5.61, color: '#9945FF', colorDim: 'rgba(153,69,255,0.12)', zeroFee: false, recommended: false },
  { symbol: 'ADA', name: 'Cardano',  price:     0.42, change: +0.88, color: '#3CC8C8', colorDim: 'rgba(60,200,200,0.12)', zeroFee: false, recommended: false },
  { symbol: 'DOT', name: 'Polkadot', price:     5.82, change: -2.30, color: '#E6007A', colorDim: 'rgba(230,0,122,0.12)', zeroFee: false, recommended: false },
]

const QUICK_AMOUNTS = ['25', '50', '100', '250']

export default function CryptoBuy({ onContinue, onBack, onNetworkTransparency }: CryptoBuyProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [inputMode, setInputMode] = useState<'usd' | 'crypto'>('usd')
  const [rawInput, setRawInput] = useState('')

  const asset = ASSETS[selectedIdx]

  const { amountUSD, amountCrypto } = useMemo(() => {
    const val = parseFloat(rawInput) || 0
    if (inputMode === 'usd') {
      return { amountUSD: val, amountCrypto: val / asset.price }
    } else {
      return { amountUSD: val * asset.price, amountCrypto: val }
    }
  }, [rawInput, inputMode, asset.price])

  const isValid = amountUSD >= 1

  const handleQuick = (v: string) => {
    setInputMode('usd')
    setRawInput(v)
  }

  const toggleMode = () => {
    setInputMode(m => {
      if (m === 'usd') {
        setRawInput(amountCrypto > 0 ? amountCrypto.toFixed(6).replace(/\.?0+$/, '') : '')
        return 'crypto'
      } else {
        setRawInput(amountUSD > 0 ? amountUSD.toFixed(2) : '')
        return 'usd'
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Buy Crypto</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Asset selector */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Select Asset</p>
          <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {ASSETS.map((a, i) => (
              <button
                key={a.symbol}
                onClick={() => { setSelectedIdx(i); setRawInput('') }}
                className="flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-[--radius-xl] shrink-0 transition-all duration-[180ms]"
                style={{
                  background: selectedIdx === i ? a.colorDim : 'rgba(175,197,255,0.04)',
                  border: `1px solid ${selectedIdx === i ? a.color + '60' : 'rgba(175,197,255,0.1)'}`,
                  minWidth: 64,
                }}
              >
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold"
                    style={{ background: a.colorDim, border: `1px solid ${a.color}40` }}
                  >
                    <span style={{ color: a.color }}>{a.symbol.slice(0, 1)}</span>
                  </div>
                  {a.zeroFee && (
                    <div className="absolute -top-1.5 -right-1.5 px-1 rounded-full font-body text-[7px] font-bold leading-4"
                      style={{ background: 'rgba(63,231,255,0.9)', color: '#050B2D' }}>$0</div>
                  )}
                </div>
                <p className="font-body text-xs font-semibold text-text">{a.symbol}</p>
                {a.zeroFee ? (
                  <p className="font-body text-[8px] font-bold" style={{ color: '#3FE7FF' }}>$0 Fee</p>
                ) : (
                  <p className="font-body text-[9px]" style={{ color: a.change >= 0 ? '#22C55E' : '#FF4D5A' }}>
                    {a.change >= 0 ? '+' : ''}{a.change.toFixed(2)}%
                  </p>
                )}
                {a.recommended && (
                  <p className="font-body text-[7px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(63,231,255,0.12)', color: '#3FE7FF' }}>Recommended</p>
                )}
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
          {/* Toggle mode */}
          <button
            onClick={toggleMode}
            className="flex items-center gap-1.5 h-7 px-3 rounded-full font-body text-xs font-semibold transition-all duration-[180ms]"
            style={{ background: 'rgba(175,197,255,0.08)', border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}
          >
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2 4l3-3 3 3M8 7l-3 3-3-3" stroke="#AFC5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Enter in {inputMode === 'usd' ? asset.symbol : 'USD'}
          </button>

          {/* Input display */}
          <div className="flex items-baseline gap-1">
            {inputMode === 'usd' && <span className="font-display text-3xl font-extrabold text-text-muted">$</span>}
            <input
              type="number"
              inputMode="decimal"
              value={rawInput}
              onChange={e => setRawInput(e.target.value)}
              placeholder="0"
              className="bg-transparent font-display text-5xl font-extrabold text-center tracking-tighter outline-none w-48 placeholder:text-text-muted"
              style={{ color: isValid ? '#AFC5FF' : 'rgba(175,197,255,0.3)' }}
            />
            {inputMode === 'crypto' && <span className="font-display text-2xl font-extrabold text-text-muted">{asset.symbol}</span>}
          </div>

          {/* Secondary conversion */}
          <p className="font-body text-sm text-text-muted">
            {inputMode === 'usd'
              ? `≈ ${amountCrypto > 0 ? amountCrypto.toFixed(6).replace(/\.?0+$/, '') : '0'} ${asset.symbol}`
              : `≈ $${amountUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            }
          </p>
        </div>

        {/* Quick amounts */}
        <div className="flex gap-2">
          {QUICK_AMOUNTS.map(v => (
            <button
              key={v}
              onClick={() => handleQuick(v)}
              className="flex-1 h-9 rounded-[--radius-xl] font-body text-xs font-semibold text-text-muted transition-all duration-[180ms] hover:text-text"
              style={{
                background: rawInput === v && inputMode === 'usd' ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.05)',
                border: `1px solid ${rawInput === v && inputMode === 'usd' ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
              }}
            >
              ${v}
            </button>
          ))}
        </div>

        {/* Balance note */}
        <div className="flex items-center justify-between px-1">
          <p className="font-body text-xs text-text-muted">Available balance</p>
          <p className="font-body text-xs font-semibold text-text-2">$1,248.50</p>
        </div>

        {/* Nano zero-fee callout */}
        {asset.zeroFee && (
          <div className="flex items-center justify-between px-4 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.2)' }}>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 7l3 3 5-5" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-xs font-semibold" style={{ color: '#3FE7FF' }}>$0 trading fee — Nano is always free</p>
            </div>
            <button onClick={onNetworkTransparency}
              className="font-body text-[10px] font-semibold underline shrink-0"
              style={{ color: 'rgba(63,231,255,0.6)' }}>
              Why?
            </button>
          </div>
        )}

        {/* CTA */}
        <button
          onClick={() => isValid && onContinue?.({ symbol: asset.symbol, name: asset.name, color: asset.color, amountUSD, amountCrypto, price: asset.price, zeroFee: asset.zeroFee })}
          disabled={!isValid}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-35"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Continue to Compare Providers
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
