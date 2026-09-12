import { useEffect, useState } from 'react'
import logoImg from '@/imports/logo.png.jpeg'

interface WhatsNewItem {
  emoji: string
  title: string
  sub: string
  isNew?: boolean
}

const WHATS_NEW: WhatsNewItem[] = [
  { emoji: '🤖', title: 'Fina got smarter',       sub: 'Improved spending insights and goal recommendations', isNew: true },
  { emoji: '⚡', title: 'Instant transfers',       sub: 'Domestic bank transfers now settle in seconds', isNew: true },
  { emoji: '🎯', title: 'Goal Planner',            sub: 'AI-powered savings planner with milestones', isNew: true },
  { emoji: '🌍', title: 'More currencies',         sub: '14 new display currencies added in Settings' },
  { emoji: '🔐', title: 'Enhanced security',       sub: 'Background AI monitors unusual account activity' },
]

interface WelcomeBackExtendedProps {
  onContinue?: () => void
  userName?: string
  daysAway?: number
  balanceChange?: string
  pendingItems?: number
}

export default function WelcomeBackExtended({
  onContinue,
  userName = 'Maya',
  daysAway = 47,
  balanceChange = '+$312.50',
  pendingItems = 2,
}: WelcomeBackExtendedProps) {
  const [visible, setVisible] = useState(false)
  const [itemsVisible, setItemsVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80)
    const t2 = setTimeout(() => setItemsVisible(true), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const weeksAway = Math.floor(daysAway / 7)
  const awayLabel = daysAway >= 7 ? `${weeksAway} week${weeksAway !== 1 ? 's' : ''}` : `${daysAway} days`

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 45% at 50% 0%, rgba(0,102,255,0.09) 0%, transparent 65%)' }} />

      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: 'none' }}>
        {/* Hero */}
        <div
          className="flex flex-col items-center pt-10 pb-6 gap-4 transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-[24px] blur-xl"
              style={{ background: 'rgba(0,102,255,0.25)', transform: 'scale(1.2)' }} />
            <img src={logoImg} alt="ChangeAIPay" className="w-16 h-16 rounded-[20px] relative z-10"
              style={{ boxShadow: '0 0 24px rgba(0,102,255,0.35)' }} />
          </div>
          <div className="text-center flex flex-col gap-1.5">
            <p className="font-body text-sm font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(63,231,255,0.65)' }}>Welcome back</p>
            <p className="font-display text-2xl font-extrabold text-text tracking-tight">{userName}</p>
            <p className="font-body text-sm text-text-muted">
              {"You've been away for "}
              <span className="text-text font-semibold">{awayLabel}</span>
              {". Here's what changed."}
            </p>
          </div>
        </div>

        {/* Catch-up cards */}
        <div
          className="flex gap-3 mb-5 transition-all duration-500"
          style={{ opacity: visible ? 1 : 0, transitionDelay: '150ms' }}
        >
          {[
            {
              label: 'Balance change',
              value: balanceChange,
              color: balanceChange.startsWith('+') ? '#22C55E' : '#F87171',
              icon: '💰',
            },
            {
              label: 'Pending items',
              value: String(pendingItems),
              color: pendingItems > 0 ? '#F5B700' : '#22C55E',
              icon: '📋',
            },
            {
              label: 'Away for',
              value: awayLabel,
              color: 'rgba(175,197,255,0.7)',
              icon: '📅',
            },
          ].map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5 py-3.5 rounded-[--radius-2xl]"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.09)' }}>
              <span className="text-sm">{s.icon}</span>
              <p className="font-mono text-xs font-bold" style={{ color: s.color }}>{s.value}</p>
              <p className="font-body text-[9px] text-text-muted text-center">{s.label}</p>
            </div>
          ))}
        </div>

        {/* What's new */}
        <div
          className="flex flex-col gap-3 transition-all duration-500"
          style={{ opacity: itemsVisible ? 1 : 0, transform: itemsVisible ? 'translateY(0)' : 'translateY(12px)' }}
        >
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            {"What's new since you left"}
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.01)' }}>
            {WHATS_NEW.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3.5"
                style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <span className="text-xl shrink-0">{item.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm font-semibold text-text truncate">{item.title}</p>
                    {item.isNew && (
                      <span className="px-1.5 py-0.5 rounded-full font-body text-[8px] font-bold shrink-0"
                        style={{ background: 'rgba(63,231,255,0.1)', color: '#3FE7FF', border: '1px solid rgba(63,231,255,0.2)' }}>
                        NEW
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[10px] text-text-muted truncate">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending nudge */}
        {pendingItems > 0 && (
          <div
            className="mt-4 flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] transition-all duration-500"
            style={{
              opacity: itemsVisible ? 1 : 0,
              background: 'rgba(245,183,0,0.05)',
              border: '1px solid rgba(245,183,0,0.15)',
            }}
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(245,183,0,0.12)', border: '1px solid rgba(245,183,0,0.2)' }}>
              <p className="font-mono text-[10px] font-bold" style={{ color: '#F5B700' }}>{pendingItems}</p>
            </div>
            <p className="font-body text-[11px] text-text-muted">
              You have <span className="text-text font-semibold">{pendingItems} pending item{pendingItems !== 1 ? 's' : ''}</span> waiting for your attention.
            </p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-10">
        <button
          onClick={onContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 20px rgba(0,102,255,0.25)' }}
        >
          Take me in
        </button>
      </div>
    </div>
  )
}
