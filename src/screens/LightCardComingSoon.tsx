import { useState } from 'react'
import lightCardImg from '@/imports/lightcard.jpeg'

interface LightCardComingSoonProps {
  onNotify?: () => void
  onBack?: () => void
}

function GlobeAccent() {
  return (
    <svg
      width="320" height="320"
      viewBox="0 0 320 320"
      fill="none"
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{ opacity: 0.18 }}
    >
      {/* Outer ring */}
      <circle cx="160" cy="160" r="140" stroke="rgba(63,231,255,0.4)" strokeWidth="0.8" />
      {/* Mid ring */}
      <circle cx="160" cy="160" r="110" stroke="rgba(0,102,255,0.5)" strokeWidth="0.7" strokeDasharray="6 4" />
      {/* Inner ring */}
      <circle cx="160" cy="160" r="78" stroke="rgba(63,231,255,0.3)" strokeWidth="0.6" />
      {/* Latitude lines */}
      <ellipse cx="160" cy="160" rx="140" ry="56" stroke="rgba(63,231,255,0.25)" strokeWidth="0.6" />
      <ellipse cx="160" cy="160" rx="140" ry="28" stroke="rgba(63,231,255,0.2)" strokeWidth="0.5" />
      {/* Equator */}
      <line x1="20" y1="160" x2="300" y2="160" stroke="rgba(63,231,255,0.3)" strokeWidth="0.6" />
      {/* Meridian */}
      <line x1="160" y1="20" x2="160" y2="300" stroke="rgba(63,231,255,0.2)" strokeWidth="0.5" />
      {/* Diagonal meridian */}
      <ellipse cx="160" cy="160" rx="140" ry="48" stroke="rgba(0,102,255,0.2)" strokeWidth="0.5"
        transform="rotate(45 160 160)" />
      {/* Dot grid — sparse continents suggestion */}
      {[
        [80,115],[95,108],[105,118],[75,130],[68,125],
        [195,100],[210,105],[225,112],[215,125],[205,118],
        [140,180],[150,188],[165,183],[155,195],
        [230,155],[245,148],[255,162],
      ].map(([cx,cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.8" fill="rgba(63,231,255,0.5)" />
      ))}
    </svg>
  )
}

export default function LightCardComingSoon({ onNotify, onBack }: LightCardComingSoonProps) {
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
      {/* Deep space ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,50,160,0.22) 0%, rgba(0,20,80,0.12) 50%, transparent 80%)' }} />
      {/* Blue floor glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,60,200,0.12), transparent)' }} />

      {/* Globe accent — behind the card */}
      <div className="absolute inset-0 flex items-start justify-center pt-16 pointer-events-none">
        <GlobeAccent />
      </div>

      {/* Back button */}
      <div className="relative z-10 px-5 pt-4 pb-0 flex items-center gap-3">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Hero card image */}
      <div className="relative z-10 flex items-center justify-center px-6 pt-4 pb-0">
        <div className="relative w-full max-w-[320px]">
          {/* Glow behind the card */}
          <div className="absolute inset-4 rounded-2xl blur-2xl"
            style={{ background: 'rgba(0,80,255,0.45)', transform: 'translateY(12px) scale(0.92)' }} />
          <img
            src={lightCardImg}
            alt="LightCard — a new kind of card by ChangeAIPay"
            className="relative z-10 w-full rounded-2xl"
            style={{ boxShadow: '0 24px 64px rgba(0,60,200,0.5), 0 0 0 1px rgba(63,231,255,0.1)' }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-6 pt-6 pb-10 gap-5">

        {/* Coming Soon badge */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full"
            style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.2)' }}>
            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#3FE7FF', boxShadow: '0 0 6px #3FE7FF' }} />
            <p className="font-body text-[10px] font-bold uppercase tracking-widest" style={{ color: '#3FE7FF' }}>Coming Soon</p>
          </div>
        </div>

        {/* Name + tagline */}
        <div className="text-center flex flex-col gap-2">
          <p
            className="font-display text-3xl font-extrabold tracking-tight"
            style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(63,231,255,0.9) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            LightCard
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed max-w-[260px] mx-auto">
            Built for everyone on Earth. One card, every currency, zero network logos.
          </p>
        </div>

        {/* Feature teaser */}
        <div className="flex flex-col gap-2">
          {[
            { icon: '🌍', text: 'Accepted wherever you are, in any currency' },
            { icon: '⚡', text: "Powered by ChangeAIPay's AI-native settlement rail" },
            { icon: '🔒', text: 'Physical security with digital-first intelligence' },
          ].map(item => (
            <div key={item.icon} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
              <span className="text-base shrink-0">{item.icon}</span>
              <p className="font-body text-[11px] text-text-muted">{item.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2.5 mt-auto">
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
              style={{ background: 'linear-gradient(135deg, rgba(0,80,255,0.9) 0%, rgba(0,120,255,0.8) 100%)', boxShadow: '0 4px 24px rgba(0,80,255,0.4)' }}>
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
                  Join the waitlist
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
