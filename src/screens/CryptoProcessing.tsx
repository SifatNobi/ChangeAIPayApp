import { useState, useEffect } from 'react'
import { type ReviewOrder } from './CryptoReview'

interface CryptoProcessingProps {
  order?: ReviewOrder
  onComplete?: () => void
  onError?: () => void
}

const DEFAULT_ORDER: ReviewOrder = {
  symbol: 'BTC', name: 'Bitcoin', color: '#F7931A',
  amountUSD: 100, amountCrypto: 0.001602, price: 62410,
  providerId: 'liquidity-a', providerName: 'LiquidX',
  fee: 0.15, totalUSD: 100.15,
}

const STEPS = [
  { id: 'routing',   label: 'Routing to provider',       duration: 800  },
  { id: 'locking',   label: 'Locking in rate',           duration: 1100 },
  { id: 'executing', label: 'Executing trade',           duration: 1200 },
  { id: 'settling',  label: 'Settling to your portfolio',duration: 900  },
]

export default function CryptoProcessing({ order = DEFAULT_ORDER, onComplete, onError }: CryptoProcessingProps) {
  const [stepIdx, setStepIdx] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let idx = 0
    let timeoutId: ReturnType<typeof setTimeout>

    const advance = () => {
      if (idx < STEPS.length - 1) {
        idx++
        setStepIdx(idx)
        timeoutId = setTimeout(advance, STEPS[idx].duration)
      } else {
        timeoutId = setTimeout(() => {
          setDone(true)
          setTimeout(() => onComplete?.(), 600)
        }, 600)
      }
    }

    timeoutId = setTimeout(advance, STEPS[0].duration)
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center bg-bg px-5" style={{ minHeight: 785 }}>
      {/* Central loader */}
      <div className="flex flex-col items-center gap-8 w-full">
        {/* Animated ring stack */}
        <div className="relative flex items-center justify-center" style={{ width: 120, height: 120 }}>
          {/* Outer pulse ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 120, height: 120,
              border: '1px solid rgba(0,102,255,0.2)',
              animation: 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
            }}
          />
          {/* Mid ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 96, height: 96,
              border: '1.5px solid rgba(63,231,255,0.15)',
              animation: 'spin 3s linear infinite',
            }}
          />
          {/* Spinner arc */}
          <svg width="80" height="80" viewBox="0 0 80 80" className="absolute" style={{ animation: 'spin 1.1s linear infinite' }}>
            <circle cx="40" cy="40" r="36" stroke="rgba(175,197,255,0.08)" strokeWidth="3" fill="none" />
            <circle cx="40" cy="40" r="36" stroke="url(#spinGrad)" strokeWidth="3" fill="none"
              strokeDasharray="60 165" strokeLinecap="round" />
            <defs>
              <linearGradient id="spinGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="100%" stopColor="#3FE7FF" />
              </linearGradient>
            </defs>
          </svg>
          {/* Asset icon center */}
          <div
            className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center font-display text-sm font-extrabold"
            style={{ background: order.color + '20', border: `1px solid ${order.color}40`, color: order.color }}
          >
            {order.symbol.slice(0, 1)}
          </div>
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-display text-xl font-extrabold text-text tracking-tight">Processing Order</p>
          <p className="font-body text-sm text-text-muted text-center">
            Buying ${order.amountUSD.toFixed(2)} of {order.name}
          </p>
        </div>

        {/* Step progress */}
        <div
          className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
        >
          {STEPS.map((step, i) => {
            const isActive = i === stepIdx && !done
            const isDone   = i < stepIdx || done

            return (
              <div key={step.id} className="flex items-center gap-3">
                {/* Step indicator */}
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all duration-[300ms]"
                  style={{
                    background: isDone
                      ? 'rgba(34,197,94,0.15)'
                      : isActive
                        ? 'rgba(0,102,255,0.15)'
                        : 'rgba(175,197,255,0.05)',
                    border: `1.5px solid ${isDone ? 'rgba(34,197,94,0.4)' : isActive ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.12)'}`,
                  }}
                >
                  {isDone ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2.5 4-4" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : isActive ? (
                    <div
                      className="w-2 h-2 rounded-full bg-[#0066FF]"
                      style={{ animation: 'pulse 1s ease-in-out infinite' }}
                    />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
                  )}
                </div>
                <p
                  className="font-body text-sm transition-all duration-[300ms]"
                  style={{
                    color: isDone ? '#22C55E' : isActive ? '#AFC5FF' : 'rgba(175,197,255,0.35)',
                    fontWeight: isActive ? 600 : 400,
                  }}
                >
                  {step.label}
                </p>
                {isActive && (
                  <div className="ml-auto flex gap-1">
                    {[0,1,2].map(j => (
                      <div key={j} className="w-1 h-1 rounded-full bg-[#0066FF]" style={{ animation: `dots-typing 1.2s ease-in-out ${j * 0.18}s infinite` }} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Provider note */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(175,197,255,0.3)', animation: 'pulse 2s ease-in-out infinite' }} />
          <p className="font-body text-xs text-text-muted">Via {order.providerName}</p>
        </div>
      </div>
    </div>
  )
}
