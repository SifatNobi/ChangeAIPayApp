import { useState, useEffect } from 'react'
import Pulse from '@/components/Pulse'

interface SplitEntry {
  name: string
  initials: string
  color: string
  handle: string
  amount: string
  status?: 'sent' | 'pending'
}

interface SplitSuccessProps {
  total?: string
  currency?: string
  entries?: SplitEntry[]
  onShare?: () => void
  onDone?: () => void
}

const DEFAULT_ENTRIES: SplitEntry[] = [
  { name: 'Alex Johnson', initials: 'AJ', color: '#0066FF', handle: '@alexj',       amount: '40.00', status: 'sent' },
  { name: 'Sarah Kim',    initials: 'SK', color: '#3FE7FF', handle: '@sarahk',      amount: '40.00', status: 'sent' },
  { name: 'Marcus Webb',  initials: 'MW', color: '#AFC5FF', handle: '@marcuswebb',  amount: '40.00', status: 'sent' },
]

export default function SplitSuccess({
  total = '120.00',
  currency = 'USD',
  entries = DEFAULT_ENTRIES,
  onShare,
  onDone,
}: SplitSuccessProps) {
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [contentVisible, setContentVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => { setCircleScale(1); setPulseTrigger(true) }, 120)
    const t2 = setTimeout(() => setCheckVisible(true), 480)
    const t3 = setTimeout(() => setContentVisible(true), 720)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const sym = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'

  return (
    <div className="flex flex-col items-center bg-bg" style={{ minHeight: 785 }}>
      {/* Pulse — payment-success family */}
      <div className="absolute inset-x-0 top-20 flex items-center justify-center pointer-events-none z-0">
        <Pulse trigger={pulseTrigger} width={320} height={50} color="#3FE7FF" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pt-14 pb-8 w-full flex-1">
        {/* Success circle */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-5 transition-all duration-[500ms]"
          style={{
            transform: `scale(${circleScale})`,
            background: 'linear-gradient(135deg, #00AA6C, #22C55E)',
            boxShadow: circleScale === 1
              ? '0 0 0 16px rgba(34,197,94,0.08), 0 0 0 32px rgba(34,197,94,0.04)'
              : 'none',
          }}
        >
          {checkVisible && (
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="animate-fade-in">
              <path d="M8 20l8 9 16-18" stroke="white" strokeWidth="3"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-1">Requests Sent!</h1>
        <p className="font-body text-sm text-text-muted text-center mb-6">
          {entries.length} payment request{entries.length !== 1 ? 's' : ''} sent · {sym}{total} total
        </p>

        {/* Participant summary card */}
        {contentVisible && (
          <div
            className="w-full rounded-[--radius-2xl] p-5 flex flex-col gap-3 animate-fade-in mb-5"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Who owes what</p>

            {entries.map((e, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${e.color}cc, ${e.color}44)` }}
                >
                  {e.initials}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{e.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-success" />
                    <p className="font-body text-[10px] text-success">Request sent</p>
                  </div>
                </div>
                <p className="font-mono text-sm font-semibold text-text">{sym}{e.amount}</p>
              </div>
            ))}

            <div className="flex items-center justify-between border-t border-[color:var(--color-border)] pt-3 mt-1">
              <p className="font-body text-xs text-text-muted">Total requested</p>
              <p className="font-mono text-sm font-bold text-text">{sym}{total}</p>
            </div>
          </div>
        )}

        {/* Info note */}
        {contentVisible && (
          <div
            className="w-full flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl] animate-fade-in mb-5"
            style={{ background: 'rgba(63,231,255,0.05)', border: '1px solid rgba(63,231,255,0.15)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
              <circle cx="7" cy="7" r="5.5" stroke="#3FE7FF" strokeWidth="1" />
              <line x1="7" y1="5" x2="7" y2="7.5" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" />
              <circle cx="7" cy="9.5" r="0.6" fill="#3FE7FF" />
            </svg>
            <p className="font-body text-xs text-text-2 leading-relaxed">
              Each person will be notified and can pay with one tap from their ChangeAIPay app. You'll be notified as each payment lands.
            </p>
          </div>
        )}

        <div className="flex-1" />

        {/* Actions */}
        {contentVisible && (
          <div className="w-full flex flex-col gap-3 animate-fade-in">
            <button
              onClick={onShare}
              className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M9 1l3 3-3 3M12 4H5a3 3 0 0 0-3 3v2"
                  stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Share Summary
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
