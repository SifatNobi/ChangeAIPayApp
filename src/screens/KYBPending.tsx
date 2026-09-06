import { useState } from 'react'

interface KYBPendingProps {
  businessName?: string
  submittedAt?: string
  onContinue?: () => void
  onNotifyToggle?: (on: boolean) => void
}

export default function KYBPending({
  businessName = 'Your Business',
  submittedAt = 'Sep 1, 2026 at 2:14 PM',
  onContinue, onNotifyToggle,
}: KYBPendingProps) {
  const [notifyOn, setNotifyOn] = useState(true)

  const handleNotify = () => {
    const next = !notifyOn
    setNotifyOn(next)
    onNotifyToggle?.(next)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex-1 flex flex-col px-5 pb-8 pt-6 gap-6" style={{ scrollbarWidth: 'none' }}>

        {/* Illustration area */}
        <div className="flex flex-col items-center gap-3 pt-4">
          {/* Animated processing rings */}
          <div className="relative" style={{ width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" className="absolute inset-0">
              <circle cx="60" cy="60" r="52" stroke="rgba(0,102,255,0.12)" strokeWidth="2" fill="none" strokeDasharray="6 6" />
              <circle cx="60" cy="60" r="38" stroke="rgba(63,231,255,0.08)" strokeWidth="1.5" fill="none" />
            </svg>
            {/* Aina badge */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 flex items-center justify-center font-display text-3xl font-extrabold text-white"
              style={{ background: 'linear-gradient(135deg, #0066FF, #3FE7FF)', borderRadius: '26px 26px 26px 8px', boxShadow: '0 0 32px rgba(0,102,255,0.45)' }}>
              A
            </div>
            {/* Orbit dots */}
            {[0, 120, 240].map((deg, i) => {
              const r = 52
              const rad = (deg * Math.PI) / 180
              const x = 60 + r * Math.cos(rad)
              const y = 60 + r * Math.sin(rad)
              return (
                <div key={i} className="absolute w-2 h-2 rounded-full"
                  style={{ left: x - 4, top: y - 4, background: '#3FE7FF', opacity: 0.4 + i * 0.2, boxShadow: '0 0 6px rgba(63,231,255,0.5)' }} />
              )
            })}
          </div>
          <div className="text-center">
            <p className="font-display text-xl font-extrabold text-text">Under Review</p>
            <p className="font-body text-sm text-text-muted mt-1">{businessName}</p>
          </div>
        </div>

        {/* Submission confirmation */}
        <div className="rounded-[--radius-2xl] px-5 py-4 flex flex-col gap-3"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1.5px solid rgba(34,197,94,0.25)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[12px] flex items-center justify-center shrink-0"
              style={{ background: 'rgba(34,197,94,0.12)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-body text-xs font-semibold text-text">Submitted successfully</p>
              <p className="font-body text-[10px] text-text-muted">{submittedAt}</p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">What happens next</p>
          {[
            { step: 1, label: 'Document review',       sub: 'Automated checks on document quality and consistency',  done: true,  active: false },
            { step: 2, label: 'Business registry check', sub: 'Cross-referencing with state and federal registries', done: false, active: true  },
            { step: 3, label: 'Beneficial ownership',  sub: 'Verifying stakeholder information and ID documents',    done: false, active: false },
            { step: 4, label: 'Final approval',         sub: 'Compliance team review and merchant account activation', done: false, active: false },
          ].map(s => (
            <div key={s.step} className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: s.active ? 'rgba(0,102,255,0.07)' : 'rgba(175,197,255,0.02)', border: `1px solid ${s.active ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.07)'}` }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: s.done ? 'rgba(34,197,94,0.15)' : s.active ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.07)' }}>
                {s.done
                  ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 4-4" stroke="#22C55E" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  : s.active
                    ? <div className="w-2 h-2 rounded-full bg-[#3FE7FF] animate-pulse" />
                    : <p className="font-mono text-[9px]" style={{ color: 'rgba(175,197,255,0.3)' }}>{s.step}</p>
                }
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-text">{s.label}</p>
                <p className="font-body text-[10px] text-text-muted">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Estimated time */}
        <div className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.06)', border: '1px solid rgba(245,183,0,0.2)' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 mt-0.5">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="#F5B700" strokeWidth="1" />
            <path d="M6.5 4v3l1.5 1.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div>
            <p className="font-body text-xs font-semibold text-text">Estimated: 1–3 business days</p>
            <p className="font-body text-[10px] text-text-muted mt-0.5">Complex cases may take up to 5 business days. You can continue using the app — merchant features will activate automatically once verified.</p>
          </div>
        </div>

        {/* Notify toggle */}
        <div className="flex items-center gap-3 px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">Notify me at each stage</p>
            <p className="font-body text-[10px] text-text-muted">Push notification at every review milestone</p>
          </div>
          <button onClick={handleNotify}
            className="relative shrink-0 transition-all"
            style={{ width: 44, height: 24, borderRadius: 12, background: notifyOn ? 'var(--color-accent)' : 'rgba(175,197,255,0.15)' }}>
            <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
              style={{ left: notifyOn ? 'calc(100% - 22px)' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
          </button>
        </div>

        <button onClick={onContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)' }}>
          Continue to App
        </button>
      </div>
    </div>
  )
}
