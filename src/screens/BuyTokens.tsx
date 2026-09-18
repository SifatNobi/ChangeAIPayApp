import { useState } from 'react'

interface BuyTokensProps {
  onBack?: () => void
  onPurchased?: (pack: { tokens: number; price: string }) => void
}

const PACKS = [
  { id: 'small', tokens: 25000, price: '$2.99', priceRaw: 2.99, perK: '$0.12 / 1k' },
  { id: 'medium', tokens: 100000, price: '$9.99', priceRaw: 9.99, perK: '$0.10 / 1k', best: true },
  { id: 'large', tokens: 500000, price: '$39.99', priceRaw: 39.99, perK: '$0.08 / 1k' },
]

function fmtTokens(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(0) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return String(n)
}

export default function BuyTokens({ onBack, onPurchased }: BuyTokensProps) {
  const [selected, setSelected] = useState<string>('medium')

  const selectedPack = PACKS.find(p => p.id === selected) ?? PACKS[1]

  function handlePurchase() {
    onPurchased?.({ tokens: selectedPack.tokens, price: selectedPack.price })
  }

  return (
    <div
      className="relative flex flex-col w-[390px] h-[844px] overflow-hidden"
      style={{ background: 'rgba(5,11,45,1)', fontFamily: 'var(--font-body, sans-serif)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(245,183,0,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex items-center gap-3 px-5 pt-14 pb-4">
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 14L6 9l5-5" stroke="rgba(175,197,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="font-display text-base font-bold text-white">Buy AI Tokens</h1>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto px-5 pb-6">
        <p className="font-body text-xs mb-5" style={{ color: 'rgba(175,197,255,0.5)' }}>
          Select a token pack to top up your balance.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {PACKS.map(pack => {
            const isSelected = selected === pack.id
            return (
              <button
                key={pack.id}
                onClick={() => setSelected(pack.id)}
                className="w-full text-left rounded-[--radius-2xl] px-4 py-4 flex items-center gap-4 transition-all active:scale-[0.99]"
                style={{
                  background: isSelected ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.04)',
                  border: isSelected ? '1.5px solid rgba(63,231,255,0.35)' : '1px solid rgba(175,197,255,0.1)',
                  boxShadow: isSelected ? '0 0 20px rgba(63,231,255,0.06)' : 'none',
                }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all"
                  style={{
                    border: isSelected ? '2px solid #3FE7FF' : '2px solid rgba(175,197,255,0.3)',
                    background: isSelected ? 'rgba(63,231,255,0.15)' : 'transparent',
                  }}
                >
                  {isSelected && (
                    <div className="w-2 h-2 rounded-full" style={{ background: '#3FE7FF' }} />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-display text-lg font-extrabold text-white">
                      {fmtTokens(pack.tokens)}
                      <span className="font-body text-xs font-normal ml-1" style={{ color: 'rgba(175,197,255,0.5)' }}>tokens</span>
                    </p>
                    {pack.best && (
                      <span
                        className="h-5 px-2 rounded-full font-body text-[9px] font-bold flex items-center"
                        style={{ background: 'rgba(245,183,0,0.15)', color: '#F5B700', border: '1px solid rgba(245,183,0,0.3)' }}
                      >
                        Best value
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs" style={{ color: 'rgba(175,197,255,0.4)' }}>{pack.perK}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className="font-display text-xl font-extrabold text-white">{pack.price}</p>
                </div>
              </button>
            )
          })}
        </div>

        <div
          className="rounded-[--radius-2xl] px-4 py-3 mb-2"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.08)' }}
        >
          <p className="font-body text-xs text-center leading-relaxed" style={{ color: 'rgba(175,197,255,0.4)' }}>
            Purchased tokens carry over month to month. No expiry.
          </p>
        </div>
      </div>

      <div className="relative z-10 px-5 pb-8">
        <button
          onClick={handlePurchase}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white"
          style={{ background: 'var(--gradient-primary, linear-gradient(135deg, #0066FF 0%, #3FE7FF 100%))' }}
        >
          Buy {fmtTokens(selectedPack.tokens)} tokens for {selectedPack.price}
        </button>
      </div>
    </div>
  )
}
