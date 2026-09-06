import { useState } from 'react'

type EmergencySeverity = 'critical' | 'advisory'
type NoticeType = 'security' | 'outage' | 'breach' | 'regulatory' | 'maintenance'

interface EmergencyItem {
  id: string
  type: NoticeType
  severity: EmergencySeverity
  title: string
  lead: string
  bodyParagraphs: string[]
  actionRequired?: string
  acknowledgeLabel: string
  timestamp: string
  requiresAcknowledge: boolean
}

const TYPE_CFG: Record<NoticeType, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
  security: {
    label: 'Security Notice',
    color: '#F5B700',
    bg: 'rgba(245,183,0,0.07)',
    border: 'rgba(245,183,0,0.22)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2L3 6v7c0 4 3.5 7.5 8 9 4.5-1.5 8-5 8-9V6L11 2z" stroke="#F5B700" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M11 9v4M11 15v.5" stroke="#F5B700" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  outage: {
    label: 'Service Disruption',
    color: '#F87171',
    bg: 'rgba(239,68,68,0.06)',
    border: 'rgba(239,68,68,0.18)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="#F87171" strokeWidth="1.4" />
        <path d="M11 7v4M11 13v2" stroke="#F87171" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  breach: {
    label: 'Security Alert',
    color: '#FF9F43',
    bg: 'rgba(255,159,67,0.06)',
    border: 'rgba(255,159,67,0.2)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 2.5L2 18.5h18L11 2.5z" stroke="#FF9F43" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M11 9v4M11 15v.5" stroke="#FF9F43" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  regulatory: {
    label: 'Regulatory Notice',
    color: '#4D9FFF',
    bg: 'rgba(0,102,255,0.06)',
    border: 'rgba(0,102,255,0.18)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 3h14v16H4V3z" stroke="#4D9FFF" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M7 8h8M7 12h8M7 16h4" stroke="#4D9FFF" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  maintenance: {
    label: 'Urgent Maintenance',
    color: 'rgba(175,197,255,0.75)',
    bg: 'rgba(175,197,255,0.05)',
    border: 'rgba(175,197,255,0.16)',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.4" />
        <path d="M11 6v5.5l3.5 2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
}

const NOTICES: Record<string, EmergencyItem> = {
  'security-email': {
    id: 'security-email',
    type: 'security',
    severity: 'critical',
    title: 'Unusual account access detected',
    lead: 'We blocked a login attempt to your account from an unrecognized device.',
    bodyParagraphs: [
      'On September 3 at 6:41 AM PT, an attempt was made to log into your account from a device and location we do not recognize. We blocked the attempt and your account remains secure.',
      "If this was you — perhaps a new device or an unusual location — you can approve the access from the Security section in your profile settings.",
      "If this was not you, no immediate action is required beyond acknowledging this notice. Changing your password as a precaution is always a good idea.",
    ],
    actionRequired: 'Review in Security settings',
    acknowledgeLabel: 'I understand — my account is safe',
    timestamp: 'Sep 3, 2026 · 6:43 AM PT',
    requiresAcknowledge: true,
  },
  'service-advisory': {
    id: 'service-advisory',
    type: 'outage',
    severity: 'advisory',
    title: 'Crypto withdrawals temporarily paused',
    lead: "We've temporarily paused crypto withdrawal processing while we address a routing issue.",
    bodyParagraphs: [
      'Crypto withdrawals initiated between 11:30 PM–1:00 AM PT on September 2 may be delayed. All other services — payments, transfers, and account access — are unaffected.',
      'Pending withdrawals will process automatically once the issue is resolved. No action is needed on your part.',
    ],
    acknowledgeLabel: 'Got it',
    timestamp: 'Sep 3, 2026 · 1:04 AM PT',
    requiresAcknowledge: false,
  },
}

interface EmergencyNoticeProps {
  onAcknowledge?: () => void
  onAction?: () => void
  noticeId?: string
}

export default function EmergencyNotice({
  onAcknowledge,
  onAction,
  noticeId = 'security-email',
}: EmergencyNoticeProps) {
  const notice = NOTICES[noticeId] ?? NOTICES['security-email']
  const cfg = TYPE_CFG[notice.type]
  const [acknowledged, setAcknowledged] = useState(false)
  const [acknowledging, setAcknowledging] = useState(false)

  const isCritical = notice.severity === 'critical'

  const handleAcknowledge = () => {
    setAcknowledging(true)
    setTimeout(() => {
      setAcknowledged(true)
      setTimeout(() => onAcknowledge?.(), 1000)
    }, 800)
  }

  if (acknowledged) {
    return (
      <div className="flex flex-col items-center justify-center bg-bg px-8" style={{ minHeight: 785 }}>
        <div className="w-16 h-16 rounded-[20px] flex items-center justify-center mb-4"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M5 13l6 6 10-10" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-body text-sm font-semibold text-text text-center">Acknowledged</p>
        <p className="font-body text-xs text-text-muted text-center mt-1">Returning you to the app.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>

      {/* Status bar spacer — no standard back button for critical persistent notices */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3 shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }} />
          <span className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
            {cfg.label}
          </span>
        </div>
        {/* Only show dismiss X if not critical */}
        {!isCritical && (
          <button onClick={onAcknowledge}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Severity strip for critical */}
        {isCritical && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <div className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}` }} />
            <p className="font-body text-[10px] font-semibold flex-1" style={{ color: cfg.color }}>
              Please read and acknowledge this notice before continuing.
            </p>
          </div>
        )}

        {/* Hero notice card */}
        <div
          className="px-5 py-6 rounded-[--radius-2xl]"
          style={{
            background: `linear-gradient(135deg, ${cfg.bg} 0%, rgba(0,5,25,0.7) 100%)`,
            border: `1px solid ${cfg.border}`,
            boxShadow: isCritical ? `0 0 32px ${cfg.color}25` : 'none',
          }}
        >
          <div className="mb-4">{cfg.icon}</div>
          <p className="font-display text-xl font-extrabold text-text leading-tight mb-2">
            {notice.title}
          </p>
          <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(175,197,255,0.85)' }}>
            {notice.lead}
          </p>
          <p className="font-body text-[10px] mt-3" style={{ color: 'rgba(175,197,255,0.35)' }}>
            {notice.timestamp}
          </p>
        </div>

        {/* Body paragraphs */}
        <div className="flex flex-col gap-4">
          {notice.bodyParagraphs.map((para, i) => (
            <p key={i} className="font-body text-sm text-text-muted leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        {/* Action row (if applicable) */}
        {notice.actionRequired && (
          <button
            onClick={onAction}
            className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] w-full text-left"
            style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
          >
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-text">Recommended action</p>
              <p className="font-body text-xs text-text-muted mt-0.5">{notice.actionRequired}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke={cfg.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* What we did / did not do */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
          <div className="px-4 py-2.5"
            style={{ borderBottom: '1px solid rgba(175,197,255,0.07)', background: 'rgba(175,197,255,0.04)' }}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Our response
            </p>
          </div>
          {[
            { icon: '✓', text: 'Blocked the unauthorized action automatically', color: '#22C55E' },
            { icon: '✓', text: 'Your funds and data have not been accessed', color: '#22C55E' },
            { icon: '✓', text: 'Security team has been notified', color: '#22C55E' },
            { icon: '○', text: 'No action required unless specified above', color: 'rgba(175,197,255,0.45)' },
          ].map((item, i, arr) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
              <span className="font-mono text-xs shrink-0 w-4" style={{ color: item.color }}>{item.icon}</span>
              <p className="font-body text-xs" style={{ color: item.color === '#22C55E' ? 'var(--color-text)' : 'rgba(175,197,255,0.5)' }}>
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Acknowledge button */}
        <button
          onClick={handleAcknowledge}
          disabled={acknowledging}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: acknowledging
              ? cfg.bg
              : isCritical
                ? `linear-gradient(135deg, ${cfg.color}cc, ${cfg.color}88)`
                : 'rgba(175,197,255,0.08)',
            color: isCritical ? (acknowledging ? cfg.color : '#0A0F1E') : 'rgba(175,197,255,0.8)',
            border: isCritical ? 'none' : '1px solid rgba(175,197,255,0.14)',
          }}
        >
          {acknowledging ? (
            <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
              style={{ borderColor: `${cfg.color}40`, borderTopColor: cfg.color }} />
          ) : notice.acknowledgeLabel}
        </button>

        {/* Contact support */}
        <p className="font-body text-[10px] text-center text-text-muted">
          Questions?{' '}
          <button className="underline" style={{ color: 'rgba(175,197,255,0.5)' }}>
            Contact ChangeAIPay support
          </button>
        </p>
      </div>
    </div>
  )
}
