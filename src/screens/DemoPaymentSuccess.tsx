// DEMO ONLY — not wired to any real payment, blockchain, or transaction system.
// Safe to remove: delete this file and the demo cases in App.tsx.
import { useState, useEffect } from 'react'
import Pulse from '@/components/Pulse'

interface DemoPaymentSuccessProps {
  recipientName?: string
  amount?: string
  currency?: string
  onDone?: () => void
}

export default function DemoPaymentSuccess({
  recipientName = 'Demo Merchant',
  amount = '25.00',
  currency = 'USD',
  onDone,
}: DemoPaymentSuccessProps) {
  const [circleScale, setCircleScale] = useState(0)
  const [checkVisible, setCheckVisible] = useState(false)
  const [receiptVisible, setReceiptVisible] = useState(false)
  const [pulseTrigger, setPulseTrigger] = useState(false)

  const sym = currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$'

  useEffect(() => {
    const t1 = setTimeout(() => { setCircleScale(1); setPulseTrigger(true) }, 200)
    const t2 = setTimeout(() => setCheckVisible(true), 500)
    const t3 = setTimeout(() => setReceiptVisible(true), 800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* DEMO MODE banner */}
      <div
        className="flex items-center justify-center gap-2 py-2 shrink-0"
        style={{ background: 'rgba(245,183,0,0.12)', borderBottom: '1px solid rgba(245,183,0,0.25)' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M6 1.5L.5 11h11L6 1.5Z" stroke="#F5B700" strokeWidth="1" strokeLinejoin="round" />
          <line x1="6" y1="4.5" x2="6" y2="7.5" stroke="#F5B700" strokeWidth="0.9" strokeLinecap="round" />
          <circle cx="6" cy="9.2" r="0.55" fill="#F5B700" />
        </svg>
        <p className="font-body text-[11px] font-bold tracking-widest uppercase" style={{ color: '#F5B700' }}>
          DEMO MODE — No real money transferred
        </p>
      </div>

      {/* Success animation */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <div className="relative flex items-center justify-center">
          <Pulse trigger={pulseTrigger} color="rgba(63,231,255,0.25)" />
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(0,40,80,0.9) 0%, rgba(0,20,60,0.95) 100%)',
              border: '2px solid rgba(63,231,255,0.4)',
              boxShadow: '0 0 40px rgba(63,231,255,0.2)',
              transform: `scale(${circleScale})`,
            }}
          >
            {checkVisible && (
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M10 20l7 7 13-14"
                  stroke="#3FE7FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: 'dash 0.4s ease forwards' }}
                />
              </svg>
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="font-display text-2xl font-extrabold text-text mb-1">Test Payment Sent</p>
          <p className="font-body text-sm text-text-muted">
            Demo payment to <span className="text-text font-semibold">{recipientName}</span>
          </p>
        </div>

        {/* Receipt card */}
        <div
          className="w-full rounded-[--radius-2xl] overflow-hidden transition-all duration-500"
          style={{
            background: 'rgba(175,197,255,0.04)',
            border: '1px solid rgba(175,197,255,0.12)',
            opacity: receiptVisible ? 1 : 0,
            transform: receiptVisible ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          {[
            { label: 'Recipient',        value: recipientName },
            { label: 'Amount',           value: `${sym}${amount}` },
            { label: 'Transaction Fee',  value: '$0.00', green: true },
            { label: 'Total',            value: `${sym}${amount}`, bold: true },
            { label: 'Reference',        value: 'DEMO-PAYMENT', mono: true, muted: true },
            { label: 'Status',           value: 'Demo Complete', accent: true },
          ].map((row, i, arr) => (
            <div
              key={row.label}
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
            >
              <p className="font-body text-xs text-text-muted">{row.label}</p>
              <p
                className={`text-sm ${row.mono ? 'font-mono' : 'font-body'} ${row.bold ? 'font-bold text-text' : 'font-semibold'}`}
                style={{
                  color: row.green ? '#22C55E' : row.accent ? '#3FE7FF' : row.muted ? 'rgba(175,197,255,0.4)' : 'var(--color-text)',
                }}
              >
                {row.value}
              </p>
            </div>
          ))}

          {/* Zero fee callout */}
          <div
            className="mx-4 mb-4 mt-1 flex items-center gap-2 px-3 py-2 rounded-[--radius-xl]"
            style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.18)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="5" stroke="#22C55E" strokeWidth="1" />
              <path d="M3.5 6l2 2 3-3" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="font-body text-[10px] font-semibold" style={{ color: '#22C55E' }}>
              Zero Transaction Fee — $0.00 charged
            </p>
          </div>
        </div>

        <p
          className="font-body text-[10px] text-center leading-relaxed"
          style={{ color: 'rgba(175,197,255,0.3)' }}
        >
          This is a prototype demonstration. No real funds were transferred, no blockchain transaction occurred, and no real account was debited.
        </p>
      </div>

      {/* Done CTA */}
      <div className="px-5 pb-8 shrink-0">
        <button
          onClick={onDone}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-base font-bold transition-all active:scale-[0.98]"
          style={{
            background: 'var(--gradient-primary)',
            boxShadow: '0 4px 20px rgba(0,102,255,0.35)',
            color: '#fff',
          }}
        >
          Back to Payments
        </button>
      </div>
    </div>
  )
}
