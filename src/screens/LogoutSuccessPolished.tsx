import { useEffect, useState } from 'react'
import logoImg from '@/imports/logo.png.jpeg'

interface LogoutSuccessPolishedProps {
  onLogin?: () => void
  userName?: string
  memberSince?: string
  daysActive?: number
}

export default function LogoutSuccessPolished({
  onLogin,
  userName = 'Maya',
  memberSince = 'March 2025',
  daysActive = 184,
}: LogoutSuccessPolishedProps) {
  const [visible, setVisible] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setTimeout(() => setStatsVisible(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const hour = new Date().getHours()
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening'

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,102,255,0.1) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,40,120,0.08), transparent)' }} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-7 relative z-10">

        {/* Logo + farewell */}
        <div
          className="flex flex-col items-center gap-5 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          {/* Logo with glow */}
          <div className="relative">
            <div className="absolute inset-0 rounded-[24px] blur-xl"
              style={{ background: 'rgba(0,102,255,0.3)', transform: 'scale(1.15)' }} />
            <img
              src={logoImg}
              alt="ChangeAIPay"
              className="w-20 h-20 rounded-[24px] relative z-10"
              style={{ boxShadow: '0 0 32px rgba(0,102,255,0.4)' }}
            />
          </div>

          <div className="text-center flex flex-col gap-2">
            <p className="font-body text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(63,231,255,0.6)' }}>
              See you soon
            </p>
            <p className="font-display text-3xl font-extrabold text-text tracking-tight">
              Good {timeOfDay},{'\n'}{userName}
            </p>
            <p className="font-body text-sm text-text-muted leading-relaxed max-w-[260px]">
              You've been safely logged out. Your funds and scheduled payments continue running as usual.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div
          className="w-full flex gap-3 transition-all duration-500"
          style={{ opacity: statsVisible ? 1 : 0, transform: statsVisible ? 'translateY(0)' : 'translateY(12px)' }}
        >
          {[
            { label: 'Member since', value: memberSince },
            { label: 'Days active', value: String(daysActive) },
            { label: 'Security', value: 'Protected' },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 py-3 rounded-[--radius-2xl]"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <p className="font-mono text-xs font-bold text-text text-center leading-tight">{s.value}</p>
              <p className="font-body text-[9px] text-text-muted text-center">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Assurances */}
        <div
          className="w-full flex flex-col gap-2 transition-all duration-500"
          style={{ opacity: statsVisible ? 1 : 0, transitionDelay: '100ms' }}
        >
          {[
            { icon: '🔒', title: 'Session ended securely', sub: 'All active sessions on this device have been closed' },
            { icon: '🔄', title: 'Payments continue', sub: 'Recurring and scheduled transfers run normally' },
            { icon: '🌐', title: 'Your data is protected', sub: 'Account secured with end-to-end encryption' },
          ].map(item => (
            <div key={item.icon} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
              <span className="text-base shrink-0">{item.icon}</span>
              <div>
                <p className="font-body text-xs font-semibold text-text">{item.title}</p>
                <p className="font-body text-[10px] text-text-muted mt-0.5">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 relative z-10"
        style={{ opacity: statsVisible ? 1 : 0, transition: 'opacity 500ms ease 300ms' }}>
        <button
          onClick={onLogin}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 20px rgba(0,102,255,0.3)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3H3a1 1 0 00-1 1v8a1 1 0 001 1h3M11 5l3 3-3 3M14 8H7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Log Back In
        </button>
      </div>
    </div>
  )
}
