import { useEffect, useState } from 'react'

type VerifyMethod = 'instant' | 'micro_deposit'

interface VerificationPendingProps {
  method?: VerifyMethod
  bankName?: string
  bankAbbr?: string
  bankColor?: string
  onContinue?: () => void
  onCancel?: () => void
}

export default function VerificationPending({
  method = 'instant',
  bankName = 'Chase',
  bankAbbr = 'JP',
  bankColor = '#117ACA',
  onContinue,
  onCancel,
}: VerificationPendingProps) {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  const STEPS_INSTANT = [
    'Establishing secure connection…',
    'Authenticating with your bank…',
    'Verifying account ownership…',
    'Fetching account details…',
  ]

  useEffect(() => {
    if (method !== 'instant') return
    const interval = setInterval(() => {
      setStep(s => {
        if (s >= STEPS_INSTANT.length - 1) {
          clearInterval(interval)
          setTimeout(() => setDone(true), 400)
          return s
        }
        return s + 1
      })
    }, 900)
    return () => clearInterval(interval)
  }, [method])

  useEffect(() => {
    if (done) setTimeout(() => onContinue?.(), 600)
  }, [done])

  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-12 w-full">

        {/* Bank logo animated */}
        <div className="relative flex items-center justify-center">
          {/* Pulsing outer rings */}
          {!done && (
            <>
              <div className="absolute w-24 h-24 rounded-full"
                style={{ background: `${bankColor}0A`, border: `1px solid ${bankColor}22`, animation: 'pulse 2s ease-in-out infinite' }} />
              <div className="absolute w-20 h-20 rounded-full"
                style={{ background: `${bankColor}0F`, border: `1px solid ${bankColor}30`, animation: 'pulse 2s ease-in-out 0.3s infinite' }} />
            </>
          )}
          <div
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center font-body font-bold text-white z-10"
            style={{ background: bankColor, fontSize: 16, boxShadow: done ? `0 0 24px ${bankColor}60` : `0 4px 16px ${bankColor}44` }}
          >
            {done
              ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12l4 5 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              : bankAbbr
            }
          </div>
        </div>

        {/* Headline */}
        <div className="text-center flex flex-col gap-1">
          <h1 className="font-display text-2xl font-extrabold text-text tracking-tight">
            {done ? 'Verified!' : method === 'instant' ? 'Verifying your account' : 'Deposits on their way'}
          </h1>
          <p className="font-body text-sm text-text-muted">
            {done ? `${bankName} is ready to connect.` : bankName}
          </p>
        </div>

        {/* Instant: step progress */}
        {method === 'instant' && !done && (
          <div className="w-full flex flex-col gap-2.5">
            {STEPS_INSTANT.map((s, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-[300ms]"
                  style={{
                    background: i < step ? 'rgba(34,197,94,0.15)' : i === step ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.05)',
                    border: `1.5px solid ${i < step ? 'rgba(34,197,94,0.4)' : i === step ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.12)'}`,
                  }}
                >
                  {i < step
                    ? <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1 4l2 2.5 4-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : i === step
                      ? <div className="w-2 h-2 rounded-full" style={{ background: '#3FE7FF', animation: 'pulse 1s ease-in-out infinite' }} />
                      : null
                  }
                </div>
                <p className={`font-body text-sm transition-colors duration-[300ms] ${i <= step ? 'text-text-2' : 'text-text-muted'}`}>{s}</p>
              </div>
            ))}
          </div>
        )}

        {/* Micro-deposit explanation */}
        {method === 'micro_deposit' && (
          <div className="w-full flex flex-col gap-4 animate-fade-in">
            <div
              className="w-full rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
              style={{ background: 'rgba(63,231,255,0.04)', border: '1px solid rgba(63,231,255,0.15)' }}
            >
              <p className="font-body text-xs font-semibold text-accent">How micro-deposit verification works</p>
              {[
                { n: '1', text: 'We send two small deposits (each under $1) to your bank account.' },
                { n: '2', text: 'Within 1–3 business days, check your bank statement for two small amounts from ChangeAIPay.' },
                { n: '3', text: "Return here and enter both amounts exactly — this confirms you own the account." },
              ].map(step => (
                <div key={step.n} className="flex items-start gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold"
                    style={{ background: 'rgba(63,231,255,0.12)', border: '1px solid rgba(63,231,255,0.25)', color: '#3FE7FF' }}
                  >
                    {step.n}
                  </div>
                  <p className="font-body text-sm text-text-2 leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>

            <div
              className="flex items-center justify-between px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <p className="font-body text-xs text-text-muted">Estimated time</p>
              <p className="font-mono text-xs font-semibold text-text">1–3 business days</p>
            </div>

            <div className="flex items-center gap-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" />
                <line x1="6" y1="4" x2="6" y2="6.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                <circle cx="6" cy="8.2" r="0.55" fill="rgba(175,197,255,0.4)" />
              </svg>
              <p className="font-body text-[10px] text-text-muted">The deposits will be withdrawn once verification is complete — your balance won't change net.</p>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="w-full flex flex-col gap-3 pb-10">
        {method === 'micro_deposit' && (
          <button
            onClick={onContinue}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all duration-[200ms] active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)' }}
          >
            Got it — I'll check back
          </button>
        )}
        <button
          onClick={onCancel}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-muted flex items-center justify-center transition-all duration-[180ms] active:scale-[0.98]"
          style={{ background: 'transparent' }}
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
