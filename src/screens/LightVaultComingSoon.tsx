import { useState } from 'react'
import lightVaultImg from '@/imports/lightvault.jpeg'

interface LightVaultComingSoonProps {
  onNotify?: () => void
  onBack?: () => void
}

function GlobeAccent() {
  return (
    <svg
      width="340" height="340"
      viewBox="0 0 340 340"
      fill="none"
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{ opacity: 0.15 }}
    >
      <circle cx="170" cy="170" r="152" stroke="rgba(63,231,255,0.35)" strokeWidth="0.7" />
      <circle cx="170" cy="170" r="120" stroke="rgba(0,102,255,0.45)" strokeWidth="0.6" strokeDasharray="5 4" />
      <circle cx="170" cy="170" r="88" stroke="rgba(63,231,255,0.3)" strokeWidth="0.6" />
      <ellipse cx="170" cy="170" rx="152" ry="60" stroke="rgba(63,231,255,0.22)" strokeWidth="0.6" />
      <ellipse cx="170" cy="170" rx="152" ry="30" stroke="rgba(63,231,255,0.18)" strokeWidth="0.5" />
      <line x1="18" y1="170" x2="322" y2="170" stroke="rgba(63,231,255,0.25)" strokeWidth="0.6" />
      <line x1="170" y1="18" x2="170" y2="322" stroke="rgba(63,231,255,0.18)" strokeWidth="0.5" />
      <ellipse cx="170" cy="170" rx="152" ry="52" stroke="rgba(0,102,255,0.18)" strokeWidth="0.5"
        transform="rotate(60 170 170)" />
      {[
        [85,120],[100,112],[115,124],[78,136],[70,130],
        [205,108],[220,115],[236,122],[224,135],[215,128],
        [148,192],[160,200],[174,196],[165,208],
        [242,162],[258,155],[268,170],
      ].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.6" fill="rgba(63,231,255,0.45)" />
      ))}
    </svg>
  )
}

export default function LightVaultComingSoon({ onNotify, onBack }: LightVaultComingSoonProps) {
  const [notified, setNotified] = useState(false)
  const [notifying, setNotifying] = useState(false)

  const handleNotify = () => {
    if (notifying || notified) return
    setNotifying(true)
    setTimeout(() => {
      setNotifying(false)
      setNotified(true)
      onNotify?.()
    }, 800)
  }

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Deep navy ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 25%, rgba(0,40,120,0.28) 0%, rgba(0,20,70,0.14) 50%, transparent 80%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,50,160,0.1), transparent)' }} />

      {/* Globe accent */}
      <div className="absolute inset-0 flex items-start justify-center pt-12 pointer-events-none">
        <GlobeAccent />
      </div>

      {/* Back */}
      <div className="relative z-10 px-5 pt-4 pb-0 flex items-center">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Hero vault image */}
      <div className="relative z-10 flex items-center justify-center px-8 pt-4 pb-0">
        <div className="relative w-full max-w-[280px]">
          <div className="absolute inset-2 rounded-2xl blur-3xl"
            style={{ background: 'rgba(0,70,200,0.5)', transform: 'translateY(16px) scale(0.9)' }} />
          <img
            src={lightVaultImg}
            alt="LightVault — merchant-grade secure settlement hardware by ChangeAIPay"
            className="relative z-10 w-full rounded-2xl"
            style={{ boxShadow: '0 28px 72px rgba(0,50,180,0.55), 0 0 0 1px rgba(63,231,255,0.08)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-5 pb-10 gap-4">

        {/* Coming Soon badge */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style={{ background: 'rgba(63,231,255,0.07)', border: '1px solid rgba(63,231,255,0.18)' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#3FE7FF', boxShadow: '0 0 6px #3FE7FF' }} />
            <p className="font-body text-[10px] font-bold uppercase tracking-widest" style={{ color: '#3FE7FF' }}>Coming Soon · Merchant</p>
          </div>
        </div>

        {/* Name + tagline */}
        <div className="text-center flex flex-col gap-2">
          <p
            className="font-display text-3xl font-extrabold tracking-tight"
            style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(63,231,255,0.85) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            LightVault
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed max-w-[260px] mx-auto">
            Enterprise-grade settlement security, built for businesses that operate at the speed of AI.
          </p>
        </div>

        {/* Feature teaser */}
        <div className="flex flex-col gap-2">
          {[
            { icon: '🔐', text: 'Hardware-secured vault for high-value settlement flows' },
            { icon: '🌍', text: 'Global merchant coverage — one device, every market' },
            { icon: '⚡', text: 'Real-time settlement with cryptographic audit trail' },
          ].map(item => (
            <div key={item.icon} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
              <span className="text-base shrink-0">{item.icon}</span>
              <p className="font-body text-[11px] text-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Merchant context note */}
        <div className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(245,183,0,0.04)', border: '1px solid rgba(245,183,0,0.12)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <path d="M7 2v4M7 8.5v.5" stroke="rgba(245,183,0,0.7)" strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="7" cy="7" r="5.5" stroke="rgba(245,183,0,0.4)" strokeWidth="1.1" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            LightVault is exclusively for merchant accounts. Join the waitlist from your merchant dashboard.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-auto">
          {notified ? (
            <div className="w-full h-14 rounded-[--radius-2xl] flex items-center justify-center gap-2"
              style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8l4 4 6-6" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>{"You're on the waitlist"}</p>
            </div>
          ) : (
            <button
              onClick={handleNotify}
              disabled={notifying}
              className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, rgba(0,60,180,0.95) 0%, rgba(0,100,220,0.85) 100%)', boxShadow: '0 4px 24px rgba(0,70,200,0.4)' }}>
              {notifying ? (
                <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                  <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                    <path d="M7.5 2C7.5 2 3.5 4 3.5 8.5v2H2v1h11v-1h-1.5v-2c0-4.5-4-6.5-4-6.5z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
                    <path d="M5.5 11.5a2 2 0 004 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  Notify me when available
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
