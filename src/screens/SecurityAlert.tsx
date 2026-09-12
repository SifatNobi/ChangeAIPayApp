import { useState } from 'react'

type AlertSeverity = 'info' | 'warning' | 'critical'

interface SecurityAlertProps {
  onInvestigate?: () => void
  onDismiss?: () => void
  onContactSupport?: () => void
  severity?: AlertSeverity
  title?: string
  description?: string
  detectedAt?: string
  location?: string
  device?: string
  actions?: string[]
  alertId?: string
}

const SEVERITY_CONFIG: Record<AlertSeverity, {
  label: string
  color: string
  glowColor: string
  bgColor: string
  borderColor: string
  headerBg: string
}> = {
  info: {
    label: 'Security Notice',
    color: '#4D9FFF',
    glowColor: 'rgba(0,102,255,0.2)',
    bgColor: 'rgba(0,102,255,0.06)',
    borderColor: 'rgba(0,102,255,0.2)',
    headerBg: 'rgba(0,102,255,0.08)',
  },
  warning: {
    label: 'Security Alert',
    color: '#F5B700',
    glowColor: 'rgba(245,183,0,0.2)',
    bgColor: 'rgba(245,183,0,0.06)',
    borderColor: 'rgba(245,183,0,0.22)',
    headerBg: 'rgba(245,183,0,0.07)',
  },
  critical: {
    label: 'Critical Alert',
    color: '#F87171',
    glowColor: 'rgba(248,113,113,0.2)',
    bgColor: 'rgba(248,113,113,0.06)',
    borderColor: 'rgba(248,113,113,0.22)',
    headerBg: 'rgba(248,113,113,0.08)',
  },
}

const DEFAULTS: Record<AlertSeverity, { title: string; description: string; actions: string[] }> = {
  info: {
    title: 'Password changed on another device',
    description: "Your account password was recently updated from a different device. If you made this change, no action is needed.",
    actions: ['Confirm this was you in account settings', 'Review recent security activity', 'Contact support if unexpected'],
  },
  warning: {
    title: 'Unusual login location detected',
    description: "A login was recorded from a location we don't recognize. If this was you, you can dismiss this alert. If not, secure your account now.",
    actions: ["If this wasn't you, change your password immediately", 'Review active sessions and sign out unknown devices', 'Enable two-factor authentication for extra protection'],
  },
  critical: {
    title: 'Account access attempt blocked',
    description: 'Multiple failed login attempts were detected on your account. We blocked the access and secured your session as a precaution.',
    actions: ['Change your password immediately', 'Review and remove any unrecognized devices', 'Enable two-factor authentication', 'Contact support if you need assistance'],
  },
}

export default function SecurityAlert({
  onInvestigate,
  onDismiss,
  onContactSupport,
  severity = 'warning',
  title,
  description,
  detectedAt = 'Sep 1, 2026 · 3:42 PM UTC',
  location = 'Amsterdam, Netherlands',
  device = 'Chrome on Windows 11',
  actions,
  alertId = 'SEC-2026-0901-A4',
}: SecurityAlertProps) {
  const [dismissed, setDismissed] = useState(false)
  const cfg = SEVERITY_CONFIG[severity]
  const defaults = DEFAULTS[severity]
  const displayTitle = title ?? defaults.title
  const displayDesc = description ?? defaults.description
  const displayActions = actions ?? defaults.actions

  if (dismissed) {
    return (
      <div className="flex flex-col bg-bg items-center justify-center px-6 gap-4" style={{ minHeight: 785 }}>
        <div className="w-16 h-16 rounded-[20px] flex items-center justify-center"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14l6 6 10-10" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <p className="font-display text-base font-extrabold text-text">Alert dismissed</p>
        <p className="font-body text-sm text-text-muted text-center max-w-[240px]">
          This security notice has been acknowledged and logged.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="px-5 pt-4 pb-3 shrink-0"
        style={{ background: cfg.headerBg, borderBottom: `1px solid ${cfg.borderColor}` }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0"
            style={{ background: cfg.bgColor, border: `1px solid ${cfg.borderColor}`, boxShadow: `0 0 12px ${cfg.glowColor}` }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 3l7 3v5c0 3.5-3 6.5-7 7-4-0.5-7-3.5-7-7V6z" stroke={cfg.color} strokeWidth="1.4" fill={cfg.bgColor} />
              {severity === 'critical' ? (
                <>
                  <path d="M9 7v4" stroke={cfg.color} strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="9" cy="12.5" r="0.8" fill={cfg.color} />
                </>
              ) : (
                <path d="M6.5 9l2 2 3.5-3.5" stroke={cfg.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ color: cfg.color }}>
                {cfg.label}
              </p>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cfg.color }} />
            </div>
            <p className="font-display text-sm font-extrabold text-text">{displayTitle}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Description */}
        <p className="font-body text-sm text-text-muted leading-relaxed">{displayDesc}</p>

        {/* Context card */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="px-4 py-2.5" style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">Alert details</p>
          </div>
          {[
            { label: 'Detected', value: detectedAt },
            { label: 'Location', value: location },
            { label: 'Device', value: device },
            { label: 'Alert ID', value: alertId, mono: true },
          ].map((row, i) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-3"
              style={{ borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
              <p className="font-body text-[11px] text-text-muted">{row.label}</p>
              <p className={`text-xs font-semibold text-text ${row.mono ? 'font-mono' : 'font-body'}`}>{row.value}</p>
            </div>
          ))}
        </div>

        {/* Recommended actions */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2.5">
            Recommended actions
          </p>
          <div className="flex flex-col gap-2">
            {displayActions.map((action, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
                style={{ background: cfg.bgColor, border: `1px solid ${cfg.borderColor}` }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold"
                  style={{ background: `${cfg.color}20`, color: cfg.color, border: `1px solid ${cfg.color}40` }}>
                  {i + 1}
                </div>
                <p className="font-body text-[11px] text-text-muted leading-relaxed">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support link for critical */}
        {severity === 'critical' && (
          <button onClick={onContactSupport}
            className="flex items-center gap-2 px-4 py-3 rounded-[--radius-xl] w-full text-left"
            style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="5.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" />
              <path d="M7 4.5v3M7 9.5v.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
            <p className="font-body text-[11px] font-semibold" style={{ color: 'rgba(175,197,255,0.6)' }}>
              Need help? Contact our security team
            </p>
          </button>
        )}
      </div>

      {/* CTAs */}
      <div className="px-5 pb-10 flex flex-col gap-2.5">
        <button onClick={onInvestigate}
          className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: `linear-gradient(135deg, ${cfg.bgColor}, rgba(0,0,0,0))`,
            color: cfg.color,
            border: `1px solid ${cfg.borderColor}`,
            boxShadow: `0 4px 16px ${cfg.glowColor}`,
          }}>
          Review security activity
        </button>
        <button
          onClick={() => { setDismissed(true); onDismiss?.() }}
          className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.04)', color: 'rgba(175,197,255,0.55)', border: '1px solid rgba(175,197,255,0.09)' }}>
          {severity === 'critical' ? 'Acknowledge' : "This was me — dismiss"}
        </button>
      </div>
    </div>
  )
}
