import { useState } from 'react'

interface Channel {
  id: string
  label: string
  sub: string
  badge?: string
  badgeColor?: string
  responseTime: string
  available: boolean
  icon: React.ReactNode
  color: string
  bg: string
}

const CHANNELS: Channel[] = [
  {
    id: 'chat',
    label: 'Live Chat',
    sub: 'Talk to Fina, then escalate to a human agent if needed',
    badge: 'Fastest',
    badgeColor: '#22C55E',
    responseTime: 'Usually under 2 minutes',
    available: true,
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.06)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M3 4h16v11H3V4z" stroke="#22C55E" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M7 19l4-4 4 4" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 9h8M7 12h5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ticket',
    label: 'Submit a Ticket',
    sub: 'For issues that need documentation or follow-up investigation',
    responseTime: 'First response within 24 hours',
    available: true,
    color: '#4D9FFF',
    bg: 'rgba(0,102,255,0.06)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 3h14v16H4V3z" stroke="#4D9FFF" strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M7 7h8M7 10.5h8M7 14h5" stroke="#4D9FFF" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email Support',
    sub: 'For non-urgent requests, formal complaints, or legal inquiries',
    responseTime: 'Response within 2 business days',
    available: true,
    color: '#9945FF',
    bg: 'rgba(153,69,255,0.06)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="2" y="5" width="18" height="13" rx="2" stroke="#9945FF" strokeWidth="1.3" />
        <path d="M2 7l9 6 9-6" stroke="#9945FF" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
]

const HOURS = [
  { day: 'Live Chat', hours: '24 hours, 7 days a week', note: 'AI available always; human agents Mon–Sun 6 AM–10 PM PT' },
  { day: 'Ticket support', hours: 'Mon–Fri, 9 AM–6 PM PT', note: 'Priority responses for account security issues' },
  { day: 'Email', hours: 'Mon–Fri, 9 AM–5 PM PT', note: '2 business day SLA; complex cases may take longer' },
]

interface ContactSupportProps {
  onBack?: () => void
  onLiveChat?: () => void
  onSubmitTicket?: () => void
  onFAQ?: () => void
}

export default function ContactSupport({ onBack, onLiveChat, onSubmitTicket }: ContactSupportProps) {
  const [expanded, setExpanded] = useState(false)

  const handleChannel = (id: string) => {
    if (id === 'chat') onLiveChat?.()
    if (id === 'ticket') onSubmitTicket?.()
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
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Contact Support</p>
          <p className="font-body text-[10px] text-text-muted">Choose how you want to reach us</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Status strip */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.14)' }}>
          <div className="w-2 h-2 rounded-full shrink-0"
            style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }} />
          <p className="font-body text-xs text-text-muted flex-1">Support is online · Typical wait &lt;2 min</p>
          <p className="font-body text-[10px] font-semibold" style={{ color: '#22C55E' }}>All channels open</p>
        </div>

        {/* Channels */}
        <div className="flex flex-col gap-3">
          {CHANNELS.map(ch => (
            <button key={ch.id} onClick={() => handleChannel(ch.id)}
              className="flex items-start gap-4 px-4 py-4 rounded-[--radius-2xl] text-left transition-all active:scale-[0.98]"
              style={{ background: ch.bg, border: `1px solid ${ch.color}20` }}>
              <div className="w-12 h-12 rounded-[--radius-xl] flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${ch.color}10`, border: `1px solid ${ch.color}25` }}>
                {ch.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-body text-sm font-semibold text-text">{ch.label}</p>
                  {ch.badge && (
                    <span className="px-1.5 py-0.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider"
                      style={{ background: `${ch.badgeColor}18`, color: ch.badgeColor }}>
                      {ch.badge}
                    </span>
                  )}
                </div>
                <p className="font-body text-[11px] text-text-muted leading-snug mb-1.5">{ch.sub}</p>
                <div className="flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke={ch.color} strokeWidth="0.9" />
                    <path d="M5 3v2.5l1.5 1" stroke={ch.color} strokeWidth="0.9" strokeLinecap="round" />
                  </svg>
                  <p className="font-body text-[10px]" style={{ color: ch.color }}>{ch.responseTime}</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-2">
                <path d="M6 4l4 4-4 4" stroke={ch.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          ))}
        </div>

        {/* Support hours */}
        <div>
          <button
            className="flex items-center gap-2 mb-3 w-full"
            onClick={() => setExpanded(v => !v)}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted flex-1 text-left">
              Support hours
            </p>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              <path d="M2.5 4.5l3.5 3 3.5-3" stroke="rgba(175,197,255,0.4)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {expanded && (
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
              {HOURS.map((h, i) => (
                <div key={i} className="px-4 py-3.5"
                  style={{ borderBottom: i < HOURS.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="font-body text-xs font-semibold text-text">{h.day}</p>
                    <p className="font-body text-xs text-text-muted">{h.hours}</p>
                  </div>
                  <p className="font-body text-[10px] text-text-muted leading-relaxed">{h.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Before you contact us */}
        <div className="px-4 py-4 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <p className="font-body text-xs font-semibold text-text mb-2">Before you reach out</p>
          <div className="flex flex-col gap-2">
            {[
              "Have your account email address ready",
              "Note the date and amount of any transaction in question",
              "Check the FAQ — most common issues are covered there",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: 'rgba(175,197,255,0.07)' }}>
                  <p className="font-mono text-[9px] font-bold" style={{ color: 'rgba(175,197,255,0.5)' }}>{i + 1}</p>
                </div>
                <p className="font-body text-xs text-text-muted leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
