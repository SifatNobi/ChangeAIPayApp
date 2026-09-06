import { useState } from 'react'

type SecurityTab = 'security' | 'sessions' | 'audit'

interface Session {
  id: string
  device: string
  location: string
  lastActive: string
  isCurrent: boolean
  platform: 'ios' | 'android' | 'web'
}

interface AuditEntry {
  id: string
  actor: string
  action: string
  detail: string
  time: string
  severity: 'normal' | 'warning'
}

const SESSIONS: Session[] = [
  { id: '1', device: 'iPhone 16 Pro', location: 'San Francisco, CA', lastActive: 'Now', isCurrent: true, platform: 'ios' },
  { id: '2', device: 'MacBook Pro', location: 'San Francisco, CA', lastActive: '3h ago', isCurrent: false, platform: 'web' },
  { id: '3', device: 'iPad Air', location: 'San Jose, CA', lastActive: 'Yesterday', isCurrent: false, platform: 'ios' },
]

const AUDIT: AuditEntry[] = [
  { id: '1', actor: 'Maya Patel (you)', action: 'Initiated payout', detail: '$2,400 to Chase ×4521', time: 'Today, 10:42 AM', severity: 'normal' },
  { id: '2', actor: 'James Kim', action: 'Sent invoice', detail: 'INV-0041 · $890', time: 'Today, 9:15 AM', severity: 'normal' },
  { id: '3', actor: 'James Kim', action: 'Exported report', detail: 'Q3 Revenue Report PDF', time: 'Yesterday, 4:03 PM', severity: 'normal' },
  { id: '4', actor: 'Sofia Cruz', action: 'Refund issued', detail: '$45 · TXN-7829', time: 'Yesterday, 1:30 PM', severity: 'warning' },
  { id: '5', actor: 'Maya Patel (you)', action: 'Added team member', detail: 'alex@example.com · Staff', time: 'Sep 1, 11:00 AM', severity: 'normal' },
  { id: '6', actor: 'James Kim', action: 'Changed payout schedule', detail: 'Weekly → Daily', time: 'Aug 31, 3:15 PM', severity: 'warning' },
]

interface ToggleRowProps {
  label: string
  sub?: string
  on: boolean
  onChange: (v: boolean) => void
}

function ToggleRow({ label, sub, on, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-3.5">
      <div className="flex-1">
        <p className="font-body text-sm font-medium text-text">{label}</p>
        {sub && <p className="font-body text-[10px] text-text-muted mt-0.5">{sub}</p>}
      </div>
      <button
        onClick={() => onChange(!on)}
        className="relative shrink-0 transition-all"
        style={{
          width: 44, height: 24, borderRadius: 12,
          background: on ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.1)',
          border: `1px solid ${on ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.15)'}`,
        }}
      >
        <div
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
          style={{ left: on ? 'calc(100% - 22px)' : '2px' }}
        />
      </button>
    </div>
  )
}

interface MerchantSecurityProps {
  onBack?: () => void
}

export default function MerchantSecurity({ onBack }: MerchantSecurityProps) {
  const [activeTab, setActiveTab] = useState<SecurityTab>('security')
  const [biometric, setBiometric] = useState(true)
  const [twoFa, setTwoFa] = useState(true)
  const [largePayoutApproval, setLargePayoutApproval] = useState(true)
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [sessions, setSessions] = useState<Session[]>(SESSIONS)
  const [revokingId, setRevokingId] = useState<string | null>(null)
  const [revokeConfirm, setRevokeConfirm] = useState<string | null>(null)

  const revokeSession = (id: string) => {
    setRevokingId(id)
    setTimeout(() => {
      setSessions(prev => prev.filter(s => s.id !== id))
      setRevokingId(null)
      setRevokeConfirm(null)
    }, 1000)
  }

  const TABS: { key: SecurityTab; label: string }[] = [
    { key: 'security', label: 'Security' },
    { key: 'sessions', label: 'Sessions' },
    { key: 'audit', label: 'Audit Log' },
  ]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Security</p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 px-5 pb-3 shrink-0">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className="flex-1 h-8 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
            style={{
              background: activeTab === tab.key ? 'rgba(175,197,255,0.1)' : 'transparent',
              color: activeTab === tab.key ? 'var(--color-text)' : 'rgba(175,197,255,0.4)',
              border: `1px solid ${activeTab === tab.key ? 'rgba(175,197,255,0.18)' : 'transparent'}`,
            }}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>

        {/* Security tab */}
        {activeTab === 'security' && (
          <>
            {/* Password */}
            <div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Login</p>
              <div className="rounded-[--radius-2xl] overflow-hidden"
                style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
                <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface/50 transition-colors"
                  style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-text">Change Password</p>
                    <p className="font-body text-[10px] text-text-muted mt-0.5">Last changed 90 days ago</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-surface/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-body text-sm font-medium text-text">Change PIN</p>
                    <p className="font-body text-[10px] text-text-muted mt-0.5">6-digit transaction PIN</p>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Auth toggles */}
            <div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Authentication</p>
              <div className="rounded-[--radius-2xl] overflow-hidden"
                style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
                <div style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
                  <ToggleRow label="Face ID / Biometrics" sub="Unlock and confirm payments" on={biometric} onChange={setBiometric} />
                </div>
                <ToggleRow label="Two-Factor Authentication" sub="SMS or authenticator app" on={twoFa} onChange={setTwoFa} />
              </div>
            </div>

            {/* Business controls */}
            <div>
              <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">Business Controls</p>
              <div className="rounded-[--radius-2xl] overflow-hidden"
                style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
                <div style={{ borderBottom: '1px solid rgba(175,197,255,0.07)' }}>
                  <ToggleRow
                    label="Large Payout Approval"
                    sub="Require owner approval for payouts over $5,000"
                    on={largePayoutApproval}
                    onChange={setLargePayoutApproval}
                  />
                </div>
                <ToggleRow label="Login Alerts" sub="Email on new device sign-ins" on={loginAlerts} onChange={setLoginAlerts} />
              </div>
              {largePayoutApproval && (
                <p className="font-body text-[10px] text-text-muted mt-2 px-1">
                  Payouts over $5,000 will require Owner confirmation before processing.
                </p>
              )}
            </div>
          </>
        )}

        {/* Sessions tab */}
        {activeTab === 'sessions' && (
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
              Active sessions · {sessions.length}
            </p>
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
              {sessions.map((s, i) => (
                <div key={s.id}
                  style={{ borderBottom: i < sessions.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.12)' }}>
                      {s.platform === 'web' ? (
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <rect x="2" y="3" width="12" height="8" rx="1.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                          <path d="M5 13h6M8 11v2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      ) : (
                        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                          <rect x="2" y="1" width="10" height="14" rx="2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                          <circle cx="7" cy="13" r="1" fill="rgba(175,197,255,0.4)" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-body text-xs font-semibold text-text">{s.device}</p>
                        {s.isCurrent && (
                          <span className="px-1.5 py-0.5 rounded-full font-body text-[9px] font-semibold"
                            style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
                            Current
                          </span>
                        )}
                      </div>
                      <p className="font-body text-[10px] text-text-muted">{s.location} · {s.lastActive}</p>
                    </div>
                    {!s.isCurrent && (
                      <button
                        onClick={() => setRevokeConfirm(revokeConfirm === s.id ? null : s.id)}
                        className="font-body text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all"
                        style={{ color: '#F87171', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
                        {revokingId === s.id ? '...' : 'Revoke'}
                      </button>
                    )}
                  </div>
                  {revokeConfirm === s.id && !s.isCurrent && (
                    <div className="mx-4 mb-3 px-3 py-2.5 rounded-[--radius-xl] flex items-center gap-2"
                      style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.18)' }}>
                      <p className="font-body text-xs text-text flex-1">Sign out from {s.device}?</p>
                      <button onClick={() => revokeSession(s.id)}
                        className="px-3 h-7 rounded-full font-body text-xs font-semibold"
                        style={{ background: 'rgba(239,68,68,0.15)', color: '#F87171' }}>
                        Confirm
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audit log tab */}
        {activeTab === 'audit' && (
          <div>
            <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
              Team Actions · Last 30 days
            </p>
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
              {AUDIT.map((entry, i) => (
                <div key={entry.id} className="flex gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < AUDIT.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{
                      background: entry.severity === 'warning' ? '#F5B700' : 'rgba(175,197,255,0.3)',
                      boxShadow: entry.severity === 'warning' ? '0 0 5px rgba(245,183,0,0.5)' : 'none',
                    }} />
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="font-body text-xs font-semibold text-text">{entry.action}</p>
                      {entry.severity === 'warning' && (
                        <span className="px-1.5 py-0.5 rounded-full font-body text-[9px]"
                          style={{ background: 'rgba(245,183,0,0.1)', color: '#F5B700' }}>
                          Review
                        </span>
                      )}
                    </div>
                    <p className="font-body text-[10px] text-text-muted">{entry.detail}</p>
                    <p className="font-body text-[10px] mt-0.5" style={{ color: 'rgba(175,197,255,0.35)' }}>
                      {entry.actor} · {entry.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
