import { useState } from 'react'

interface InviteFriendsProps {
  userName?: string
  referralCode?: string
  circleCount?: number
  nextMilestone?: number
  onBack?: () => void
  onViewCircle?: () => void
  onViewTerms?: () => void
}

const SHARE_CHANNELS = [
  {
    id: 'message',
    label: 'Message',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M2 3C2 2.4 2.4 2 3 2h12c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H10l-3 3-1.5-3H3c-.6 0-1-.4-1-1V3Z" stroke="#3FE7FF" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
    color: '#3FE7FF',
  },
  {
    id: 'email',
    label: 'Email',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="4" width="14" height="10" rx="1.5" stroke="#0066FF" strokeWidth="1.2" />
        <path d="M2 6l7 5 7-5" stroke="#0066FF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    color: '#0066FF',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="7" r="3" stroke="#9945FF" strokeWidth="1.2" />
        <path d="M3 16c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="#9945FF" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      </svg>
    ),
    color: '#9945FF',
  },
  {
    id: 'qr',
    label: 'QR Code',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <rect x="2" y="2" width="6" height="6" rx="1" stroke="#FC7E2F" strokeWidth="1.2" />
        <rect x="10" y="2" width="6" height="6" rx="1" stroke="#FC7E2F" strokeWidth="1.2" />
        <rect x="2" y="10" width="6" height="6" rx="1" stroke="#FC7E2F" strokeWidth="1.2" />
        <path d="M10 10h2v2h-2zM12 12h2v2h-2zM10 14h2v2h-2zM14 10h2v2h-2z" fill="#FC7E2F" />
      </svg>
    ),
    color: '#FC7E2F',
  },
]

function MiniQR({ seed }: { seed: string }) {
  const size = 9
  const seedCell = (s: string, i: number) => {
    let h = 0
    for (let j = 0; j < s.length; j++) h = (Math.imul(31, h) + s.charCodeAt(j)) | 0
    return ((h ^ (h >> 13) ^ i * 2654435761) & 1) === 1
  }
  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, width: 72, height: 72 }}>
      {Array.from({ length: size * size }, (_, i) => (
        <div key={i} className="rounded-[1px]"
          style={{ background: seedCell(seed, i) ? 'rgba(175,197,255,0.85)' : 'transparent' }} />
      ))}
    </div>
  )
}

export default function InviteFriends({
  userName = 'Maya', referralCode = '', circleCount = 0, nextMilestone = 0,
  onBack, onViewCircle, onViewTerms,
}: InviteFriendsProps) {
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const link = `changeaipay.com/join/${referralCode.toLowerCase()}`

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Spread the Change</p>
          <p className="font-body text-[10px] text-text-muted">Build your Change Circle</p>
        </div>
        <button onClick={onViewCircle}
          className="h-8 px-3 rounded-full font-body text-xs font-semibold transition-all"
          style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.25)', color: '#3FE7FF' }}>
          My Circle · {circleCount}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Personal invite card */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-3"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.25)' }}>
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-[16px] flex items-center justify-center font-display text-lg font-extrabold text-white shrink-0"
              style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 18px rgba(63,231,255,0.3)' }}>
              {userName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-display text-sm font-extrabold text-white leading-snug">
                "{userName} thinks you should experience ChangeAIPay"
              </p>
              <p className="font-body text-[11px] text-text-muted mt-1 leading-relaxed">
                Not a discount code. Not a cash bonus. A genuine invite into a smarter way to move money.
              </p>
            </div>
          </div>
          {/* Progress to next milestone */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1">
              <div className="flex justify-between mb-1.5">
                <p className="font-body text-[10px] text-text-muted">{circleCount} active</p>
                <p className="font-body text-[10px] text-text-muted">{nextMilestone} to next milestone</p>
              </div>
              <div className="h-1.5 w-full rounded-full" style={{ background: 'rgba(175,197,255,0.1)' }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${Math.min((circleCount / nextMilestone) * 100, 100)}%`, background: 'var(--gradient-primary)' }} />
              </div>
            </div>
            <button onClick={onViewCircle}
              className="font-body text-[10px] font-semibold shrink-0" style={{ color: '#3FE7FF' }}>
              View Circle →
            </button>
          </div>
        </div>

        {/* What your circle gains */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">What your Circle gains</p>
          <div className="flex flex-col gap-2">
            {[
              { emoji: '⚡', label: 'Circle Momentum',   sub: 'Every active connection lifts your Momentum score' },
              { emoji: '🏅', label: 'Status Milestones', sub: 'Unlock tiers from First Spark to Legend' },
              { emoji: '💎', label: 'Change Rewards',    sub: 'Earn Change for Boosts, Premium days, and more' },
              { emoji: '🎁', label: 'Milestone Surprises',sub: "Fina's deterministic rewards tied to your streaks" },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
                <span className="text-lg shrink-0">{item.emoji}</span>
                <div>
                  <p className="font-body text-xs font-semibold text-text">{item.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Share channels */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Share your invite</p>
          <div className="grid grid-cols-4 gap-2.5">
            {SHARE_CHANNELS.map(ch => (
              <button key={ch.id} onClick={() => {
                const msg = `Join ChangeAIPay with my invite code ${referralCode} — send money for free!`
                if (ch.id === 'message') { window.open(`sms:?body=${encodeURIComponent(msg)}`) }
                else if (ch.id === 'email') { window.open(`mailto:?subject=${encodeURIComponent("You're invited to ChangeAIPay")}&body=${encodeURIComponent(msg)}`) }
                else if (ch.id === 'contacts') {
                  const nav = navigator as unknown as { contacts?: { select: (p: string[], o: object) => Promise<unknown> } }
                  if (nav.contacts?.select) {
                    nav.contacts.select(['name', 'email', 'tel'], { multiple: false }).catch(() => {})
                  } else { window.open(`mailto:?subject=${encodeURIComponent("You're invited to ChangeAIPay")}&body=${encodeURIComponent(msg)}`) }
                }
                else if (ch.id === 'qr') {
                  if (navigator.share) { navigator.share({ title: "ChangeAIPay invite", text: msg }).catch(() => {}) }
                  else { setShowQR(p => !p) }
                }
              }}
                className="flex flex-col items-center gap-2 py-3.5 rounded-[--radius-xl] transition-all active:scale-[0.95]"
                style={{ background: `${ch.color}0D`, border: `1px solid ${ch.color}2A` }}>
                {ch.icon}
                <p className="font-body text-[10px] font-semibold" style={{ color: ch.color }}>{ch.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* QR panel */}
        {showQR && (
          <div className="flex flex-col items-center gap-4 px-5 py-5 rounded-[--radius-2xl] animate-fade-in"
            style={{ background: 'rgba(252,126,47,0.06)', border: '1px solid rgba(252,126,47,0.22)' }}>
            <div className="p-3 rounded-[--radius-xl]" style={{ background: 'rgba(5,11,45,0.9)', border: '1px solid rgba(175,197,255,0.1)' }}>
              <MiniQR seed={referralCode} />
            </div>
            <div className="text-center">
              <p className="font-mono text-sm font-bold text-text tracking-widest">{referralCode}</p>
              <p className="font-body text-[10px] text-text-muted mt-0.5">Scan to join Maya's Change Circle</p>
            </div>
          </div>
        )}

        {/* Copy link */}
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
          <div className="flex-1 min-w-0">
            <p className="font-body text-[10px] text-text-muted mb-0.5">Your invite link</p>
            <p className="font-mono text-xs text-text truncate">{link}</p>
          </div>
          <button onClick={handleCopy}
            className="h-9 px-3.5 rounded-[--radius-xl] font-body text-xs font-semibold shrink-0 transition-all"
            style={{ background: copied ? 'rgba(34,197,94,0.1)' : 'rgba(175,197,255,0.08)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.18)'}`, color: copied ? '#22C55E' : 'rgba(175,197,255,0.75)' }}>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        <button onClick={onViewTerms}
          className="font-body text-[10px] text-center text-text-muted underline underline-offset-2 active:opacity-70">
          Eligibility & Terms — Active Connection criteria
        </button>
      </div>
    </div>
  )
}
