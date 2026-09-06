import { useEffect, useState } from 'react'

interface MaintenanceCompleteProps {
  onContinue?: () => void
  duration?: string
  completedAt?: string
  improvements?: string[]
}

const DEFAULT_IMPROVEMENTS = [
  'Faster payment processing — up to 40% speed improvement',
  'Enhanced AI response times for Fina and Aina',
  'Improved transaction reliability and uptime',
]

export default function MaintenanceComplete({
  onContinue,
  duration = '47 minutes',
  completedAt = '11:47 PM UTC',
  improvements = DEFAULT_IMPROVEMENTS,
}: MaintenanceCompleteProps) {
  const [visible, setVisible] = useState(false)
  const [dotsGreen, setDotsGreen] = useState(false)
  const [itemsVisible, setItemsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 60)
    const t2 = setTimeout(() => setDotsGreen(true), 400)
    const t3 = setTimeout(() => setItemsVisible(true), 700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const SERVICES = [
    'Payments', 'Account access', 'AI Assistants', 'Notifications', 'Card services',
  ]

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Ambient green glow — "we're back" */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(34,197,94,0.08) 0%, transparent 65%)' }} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 relative z-10">

        {/* Hero icon */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.8)' }}
        >
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: 'rgba(34,197,94,0.2)', transform: 'scale(1.3)' }} />
            <div className="w-24 h-24 rounded-[28px] flex items-center justify-center relative z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.06) 100%)',
                border: '1.5px solid rgba(34,197,94,0.35)',
                boxShadow: '0 0 32px rgba(34,197,94,0.25)',
              }}>
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="16" stroke="rgba(34,197,94,0.35)" strokeWidth="1.5" fill="none" />
                <path d="M13 22l7 7 11-11" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div
          className="text-center flex flex-col gap-2 transition-all duration-600 delay-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <p className="font-body text-sm font-semibold uppercase tracking-widest" style={{ color: 'rgba(34,197,94,0.75)' }}>
            All systems operational
          </p>
          <p className="font-display text-2xl font-extrabold text-text tracking-tight">{"We're back"}</p>
          <p className="font-body text-sm text-text-muted leading-relaxed max-w-[270px]">
            Scheduled maintenance is complete. Everything is running smoothly and ready to use.
          </p>
          <div className="flex items-center gap-4 justify-center mt-1">
            <p className="font-body text-[10px] text-text-muted">Duration: <span className="text-text font-semibold">{duration}</span></p>
            <p className="font-body text-[10px] text-text-muted">Completed: <span className="text-text font-semibold">{completedAt}</span></p>
          </div>
        </div>

        {/* Services all-green */}
        <div
          className="w-full rounded-[--radius-2xl] overflow-hidden transition-all duration-500 delay-300"
          style={{
            opacity: visible ? 1 : 0,
            background: 'rgba(175,197,255,0.02)',
            border: '1px solid rgba(175,197,255,0.09)',
          }}
        >
          <div className="px-4 py-3" style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">Service Status</p>
          </div>
          {SERVICES.map((name, i) => (
            <div key={name} className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
              <p className="font-body text-sm text-text">{name}</p>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: dotsGreen ? '#22C55E' : 'rgba(175,197,255,0.25)',
                    boxShadow: dotsGreen ? '0 0 6px rgba(34,197,94,0.6)' : 'none',
                    transitionDelay: `${i * 80}ms`,
                  }}
                />
                <span
                  className="font-body text-[10px] font-semibold transition-colors duration-300"
                  style={{ color: dotsGreen ? '#22C55E' : 'rgba(175,197,255,0.3)', transitionDelay: `${i * 80}ms` }}>
                  Operational
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* What improved */}
        <div
          className="w-full flex flex-col gap-2 transition-all duration-500"
          style={{ opacity: itemsVisible ? 1 : 0, transform: itemsVisible ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">What improved</p>
          {improvements.map((item, i) => (
            <div key={i} className="flex items-start gap-2.5 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.12)' }}>
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: 'rgba(34,197,94,0.12)' }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1.5 4l2 2 3-3.5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-body text-[11px] text-text-muted leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 relative z-10"
        style={{ opacity: itemsVisible ? 1 : 0, transition: 'opacity 400ms ease' }}>
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', boxShadow: '0 4px 20px rgba(34,197,94,0.3)' }}
        >
          Continue to App
        </button>
      </div>
    </div>
  )
}
