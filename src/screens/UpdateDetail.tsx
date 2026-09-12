import { useState } from 'react'

type BroadcastType = 'feature' | 'update' | 'security' | 'promo' | 'maintenance' | 'policy'

interface UpdateItem {
  id: string
  type: BroadcastType
  title: string
  subtitle?: string
  date: string
  bodyParagraphs: string[]
  cta?: { label: string; url?: string }
  links?: { label: string; url?: string }[]
  isPersistent?: boolean
  actionRequired?: boolean
}

const TYPE_CFG: Record<BroadcastType, { label: string; color: string; bg: string; border: string }> = {
  feature: { label: 'New Feature', color: '#3FE7FF', bg: 'rgba(63,231,255,0.06)', border: 'rgba(63,231,255,0.18)' },
  update: { label: 'App Update', color: '#4D9FFF', bg: 'rgba(0,102,255,0.06)', border: 'rgba(0,102,255,0.18)' },
  security: { label: 'Security Notice', color: '#F5B700', bg: 'rgba(245,183,0,0.06)', border: 'rgba(245,183,0,0.2)' },
  promo: { label: 'Promotional', color: '#9945FF', bg: 'rgba(153,69,255,0.06)', border: 'rgba(153,69,255,0.18)' },
  maintenance: { label: 'Maintenance', color: 'rgba(175,197,255,0.7)', bg: 'rgba(175,197,255,0.04)', border: 'rgba(175,197,255,0.14)' },
  policy: { label: 'Policy Update', color: 'rgba(175,197,255,0.6)', bg: 'rgba(175,197,255,0.04)', border: 'rgba(175,197,255,0.12)' },
}

const SAMPLE_UPDATE: UpdateItem = {
  id: '2',
  type: 'feature',
  title: 'Introducing Aina for Business',
  subtitle: 'Your AI financial partner for merchant accounts',
  date: 'September 2, 2026',
  bodyParagraphs: [
    "Meet Aina — ChangeAIPay's AI assistant built specifically for business accounts. While Fina helps individuals understand and optimize their personal finances, Aina is designed around the unique needs of running a business on ChangeAIPay.",
    "Aina analyzes your payment volume, revenue trends, cash flow patterns, and team activity to surface proactive insights before you need to look for them. You can ask Aina anything from \"How was my revenue this week?\" to \"Am I on track to hit my monthly target?\"",
    "Starting today, Aina is available in the Insights tab for all merchant accounts on Scale plan and above. Business accounts on Growth and Startup plans will see Aina in read-only preview mode.",
  ],
  cta: { label: 'Chat with Aina now' },
  links: [
    { label: 'Aina feature overview' },
    { label: 'How Aina uses your data' },
    { label: 'Aina privacy settings' },
  ],
}

const SECURITY_UPDATE: UpdateItem = {
  id: '1',
  type: 'security',
  title: 'Action required: Verify your recovery email',
  date: 'September 3, 2026',
  bodyParagraphs: [
    "The recovery email associated with your account has not been verified. Your primary email and account access are not affected.",
    "However, if you ever lose access to your primary email, a verified recovery email is how we can confirm your identity. Without it, account recovery may take significantly longer.",
    "This is not a security incident — your account is secure. We're asking you to verify the recovery email as a precautionary measure during our account verification update.",
  ],
  cta: { label: 'Verify recovery email now' },
  actionRequired: true,
  isPersistent: true,
}

const UPDATE_MAP: Record<string, UpdateItem> = {
  '1': SECURITY_UPDATE,
  '2': SAMPLE_UPDATE,
}

interface UpdateDetailProps {
  onBack?: () => void
  onCTA?: (id: string) => void
  messageId?: string
}

export default function UpdateDetail({ onBack, onCTA, messageId = '2' }: UpdateDetailProps) {
  const item = UPDATE_MAP[messageId] ?? SAMPLE_UPDATE
  const cfg = TYPE_CFG[item.type]
  const [ctaPressed, setCtaPressed] = useState(false)

  const handleCTA = () => {
    setCtaPressed(true)
    onCTA?.(item.id)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Update</p>
        {/* Share */}
        <button className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="14" cy="3" r="1.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" />
            <circle cx="4" cy="9" r="1.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" />
            <circle cx="14" cy="15" r="1.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" />
            <path d="M5.5 10l7 4M12.5 4l-7 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Type + date */}
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-wider"
            style={{ background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}>
            {cfg.label}
          </span>
          {item.actionRequired && (
            <span className="px-2.5 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-wider"
              style={{ background: 'rgba(245,183,0,0.08)', color: '#F5B700', border: '1px solid rgba(245,183,0,0.2)' }}>
              Action required
            </span>
          )}
          <p className="font-body text-[10px] text-text-muted ml-auto">{item.date}</p>
        </div>

        {/* Hero icon */}
        <div
          className="w-full py-8 rounded-[--radius-2xl] flex flex-col items-center justify-center gap-3"
          style={{
            background: `linear-gradient(135deg, ${cfg.bg} 0%, rgba(0,10,40,0.5) 100%)`,
            border: `1px solid ${cfg.border}`,
          }}
        >
          <div className="w-16 h-16 rounded-[20px] flex items-center justify-center"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, boxShadow: `0 0 24px ${cfg.color}30` }}>
            {item.type === 'feature' && (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3l2 6h6L17 13l2 6-5-3.5L9 19l2-6-5-4h6l2-6z" stroke={cfg.color} strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            )}
            {item.type === 'security' && (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L5 7v8c0 5 4 9 9 11 5-2 9-6 9-11V7L14 3z" stroke={cfg.color} strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M14 11v4M14 17v1" stroke={cfg.color} strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
            {item.type === 'update' && (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke={cfg.color} strokeWidth="1.4" />
                <path d="M14 8v7l4 2.5" stroke={cfg.color} strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
            {item.type === 'policy' && (
              <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                <path d="M4 2h16v24H4V2z" stroke={cfg.color} strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M8 9h8M8 13h8M8 17h5" stroke={cfg.color} strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            )}
            {item.type === 'maintenance' && (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke={cfg.color} strokeWidth="1.4" />
                <path d="M14 8v6M8 14h6" stroke={cfg.color} strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            )}
            {item.type === 'promo' && (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 4l2.5 8H24l-7 5 2.5 8-7-5-7 5 2.5-8-7-5h7.5L14 4z" stroke={cfg.color} strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="text-center px-4">
            <p className="font-display text-xl font-extrabold text-text leading-snug">{item.title}</p>
            {item.subtitle && (
              <p className="font-body text-sm text-text-muted mt-1">{item.subtitle}</p>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3">
          {item.bodyParagraphs.map((para, i) => (
            <p key={i} className="font-body text-sm text-text-muted leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* CTA */}
        {item.cta && (
          <button
            onClick={handleCTA}
            className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{
              background: ctaPressed
                ? 'rgba(34,197,94,0.15)'
                : `linear-gradient(135deg, ${cfg.color}bb, ${cfg.color}88)`,
              color: ctaPressed ? '#22C55E' : 'white',
              border: ctaPressed ? '1px solid rgba(34,197,94,0.25)' : 'none',
            }}
          >
            {ctaPressed ? 'Done' : item.cta.label}
          </button>
        )}

        {/* Related links */}
        {item.links && item.links.length > 0 && (
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
              Related
            </p>
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
              {item.links.map((link, i) => (
                <button key={i}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface/50 transition-colors"
                  style={{ borderBottom: i < item.links!.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke={cfg.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="font-body text-sm flex-1" style={{ color: cfg.color }}>{link.label}</p>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M5 2h5v5" stroke="rgba(175,197,255,0.3)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Timestamp footer */}
        <p className="font-body text-[10px] text-center text-text-muted">
          Sent by ChangeAIPay · {item.date}
        </p>
      </div>
    </div>
  )
}
