import { useState, useEffect } from 'react'
import Pulse from '@/components/Pulse'

interface SendSuccessProps {
  recipientName?: string
  recipientHandle?: string
  recipientInitials?: string
  recipientColor?: string
  amount?: string
  currency?: string
  fee?: string
  eta?: string
  transactionId?: string
  onShareReceipt?: () => void
  onAddFavorite?: () => void
  onDone?: () => void
}

const REACTIONS = ['🎉','❤️','🙏','👏','😊','🔥']

export default function SendSuccess({
  recipientName = 'Alex Johnson',
  recipientHandle = '@alexj',
  recipientInitials = 'AJ',
  recipientColor = '#0066FF',
  amount = '50.00',
  currency = 'USD',
  fee = 'Free',
  eta = 'Instant',
  transactionId = 'TXN-2026-0088AF',
  onShareReceipt,
  onAddFavorite,
  onDone,
}: SendSuccessProps) {
  const [pulseTrigger, setPulseTrigger] = useState(false)
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [receiptVisible, setReceiptVisible] = useState(false)
  const [sentReaction, setSentReaction] = useState<string | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => { setCircleScale(1); setPulseTrigger(true) }, 120)
    const t2 = setTimeout(() => setCheckVisible(true), 480)
    const t3 = setTimeout(() => setReceiptVisible(true), 780)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const handleReaction = (emoji: string) => {
    setSentReaction(emoji)
  }

  const currSym = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'

  return (
    <div className="flex flex-col items-center bg-bg" style={{ minHeight: 785 }}>
      {/* Pulse layer — payment success trigger */}
      <div className="absolute inset-x-0 top-24 flex items-center justify-center pointer-events-none z-0">
        <Pulse trigger={pulseTrigger} width={320} height={50} color="#3FE7FF" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-5 pt-16 pb-8 w-full flex-1">
        {/* Success circle */}
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

        <h1 className="font-display text-2xl font-extrabold text-text tracking-tight mb-1">Payment Sent!</h1>
        <p className="font-body text-sm text-text-muted mb-6 text-center">
          {currSym}{amount} delivered to {recipientName}
        </p>

        {/* Receipt card */}
        {receiptVisible && (
          <div
            className="w-full rounded-[--radius-2xl] p-5 flex flex-col gap-3 animate-fade-in mb-5"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            <div className="flex items-center gap-3 pb-3 border-b border-[color:var(--color-border)]">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${recipientColor}cc, ${recipientColor}44)` }}
              >
                {recipientInitials}
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-text">{recipientName}</p>
                <p className="font-mono text-xs text-text-muted">{recipientHandle}</p>
              </div>
            </div>
            {[
              { label: 'Amount', value: `${currSym}${amount}` },
              { label: 'Fee',    value: fee },
              { label: 'Arrived', value: eta },
              { label: 'Ref',    value: transactionId },
            ].map(r => (
              <div key={r.label} className="flex items-center justify-between">
                <p className="font-body text-xs text-text-muted">{r.label}</p>
                <p className={`font-mono text-xs ${r.label === 'Fee' && fee === 'Free' ? 'text-success' : 'text-text-2'}`}>{r.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Private reaction */}
        {receiptVisible && (
          <div
            className="w-full rounded-[--radius-xl] p-4 flex flex-col gap-3 mb-5 animate-fade-in"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
          >
            <div className="flex items-center gap-2">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1L1 3.2v4C1 9.5 2.8 11 5.5 11 8.2 11 10 9.5 10 7.2V3.2L5.5 1Z"
                  stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-[10px] text-text-muted">
                Send a private reaction — only {recipientName.split(' ')[0]} can see this
              </p>
            </div>
            {sentReaction ? (
              <div className="flex items-center justify-center gap-2 py-2 animate-fade-in">
                <span className="text-2xl">{sentReaction}</span>
                <p className="font-body text-sm text-text-2">Sent privately to {recipientName.split(' ')[0]}</p>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-1">
                {REACTIONS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className="text-xl h-11 flex-1 rounded-[--radius-lg] flex items-center justify-center transition-all duration-[150ms] active:scale-[0.85] hover:bg-surface-hi"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex-1" />

        {/* Actions */}
        {receiptVisible && (
          <div className="w-full flex flex-col gap-3 animate-fade-in">
            <div className="flex gap-3">
              <button
                onClick={onShareReceipt}
                className="flex-1 h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.97]"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M9 1l3 3-3 3M12 4H5a3 3 0 0 0-3 3v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Share Receipt
              </button>
              <button
                onClick={() => { setIsFavorite(true); onAddFavorite?.() }}
                className="h-12 w-12 rounded-[--radius-2xl] flex items-center justify-center transition-all duration-[180ms] active:scale-[0.94]"
                style={{
                  background: isFavorite ? 'rgba(245,183,0,0.15)' : 'var(--color-surface)',
                  border: `1px solid ${isFavorite ? 'rgba(245,183,0,0.3)' : 'var(--color-border)'}`,
                }}
                aria-label="Add to favorites"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2l2 4.5h5l-4 3 1.5 5L8 12l-4.5 2.5 1.5-5-4-3H6L8 2Z"
                    stroke={isFavorite ? '#F5B700' : 'rgba(175,197,255,0.5)'}
                    strokeWidth="1.2"
                    fill={isFavorite ? '#F5B700' : 'none'}
                    strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <button
              onClick={onDone}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
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
