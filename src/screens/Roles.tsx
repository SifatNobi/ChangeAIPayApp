import { useState } from 'react'

type RoleLevel = 'Owner' | 'Admin' | 'Staff'

interface Permission {
  label: string
  owner: boolean
  admin: boolean
  staff: boolean
}

const PERMISSIONS: Permission[] = [
  { label: 'View dashboard & analytics', owner: true, admin: true, staff: true },
  { label: 'Process payments & invoices', owner: true, admin: true, staff: true },
  { label: 'View transaction history', owner: true, admin: true, staff: true },
  { label: 'Generate QR codes', owner: true, admin: true, staff: true },
  { label: 'Create & send invoices', owner: true, admin: true, staff: false },
  { label: 'Initiate payouts', owner: true, admin: true, staff: false },
  { label: 'View revenue reports', owner: true, admin: true, staff: false },
  { label: 'Manage team members', owner: true, admin: false, staff: false },
  { label: 'Assign roles', owner: true, admin: false, staff: false },
  { label: 'Edit business settings', owner: true, admin: false, staff: false },
  { label: 'Access security settings', owner: true, admin: false, staff: false },
  { label: 'Delete business account', owner: true, admin: false, staff: false },
]

const ROLE_CFG: Record<RoleLevel, { color: string; bg: string; border: string; desc: string }> = {
  Owner: {
    color: '#F5B700',
    bg: 'rgba(245,183,0,0.07)',
    border: 'rgba(245,183,0,0.2)',
    desc: 'Full control over all settings, team, and finances. Only one Owner per account.',
  },
  Admin: {
    color: '#0066FF',
    bg: 'rgba(0,102,255,0.07)',
    border: 'rgba(0,102,255,0.2)',
    desc: 'Can manage payments, payouts, reports, and invoices. Cannot manage team or settings.',
  },
  Staff: {
    color: 'rgba(175,197,255,0.7)',
    bg: 'rgba(175,197,255,0.05)',
    border: 'rgba(175,197,255,0.15)',
    desc: 'View and process payments only. No financial actions or account access.',
  },
}

interface RolesProps {
  onBack?: () => void
}

export default function Roles({ onBack }: RolesProps) {
  const [activeRole, setActiveRole] = useState<RoleLevel>('Admin')

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Roles &amp; Permissions</p>
          <p className="font-body text-[10px] text-text-muted">What each role can do</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Role selector tabs */}
        <div className="flex gap-2">
          {(['Owner', 'Admin', 'Staff'] as RoleLevel[]).map(role => {
            const cfg = ROLE_CFG[role]
            const isActive = activeRole === role
            return (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className="flex-1 h-11 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                style={{
                  background: isActive ? cfg.bg : 'rgba(175,197,255,0.03)',
                  color: isActive ? cfg.color : 'rgba(175,197,255,0.4)',
                  border: `1px solid ${isActive ? cfg.border : 'rgba(175,197,255,0.09)'}`,
                }}
              >
                {role}
              </button>
            )
          })}
        </div>

        {/* Role description card */}
        {(['Owner', 'Admin', 'Staff'] as RoleLevel[]).map(role => {
          if (role !== activeRole) return null
          const cfg = ROLE_CFG[role]
          return (
            <div key={role}
              className="px-4 py-4 rounded-[--radius-xl]"
              style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full" style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.color}80` }} />
                <p className="font-body text-sm font-bold" style={{ color: cfg.color }}>{role}</p>
              </div>
              <p className="font-body text-xs text-text-muted leading-relaxed">{cfg.desc}</p>
            </div>
          )
        })}

        {/* Permissions table */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Permissions for {activeRole}
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {PERMISSIONS.map((perm, i) => {
              const hasAccess = perm[activeRole.toLowerCase() as 'owner' | 'admin' | 'staff']
              return (
                <div key={i}
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ borderBottom: i < PERMISSIONS.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: hasAccess ? 'rgba(34,197,94,0.12)' : 'rgba(175,197,255,0.06)',
                    }}>
                    {hasAccess ? (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5 3.5-4" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M2 2l4 4M6 2L2 6" stroke="rgba(175,197,255,0.25)" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                  <p className="font-body text-xs flex-1"
                    style={{ color: hasAccess ? 'var(--color-text)' : 'rgba(175,197,255,0.3)' }}>
                    {perm.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* All roles comparison summary */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Quick comparison
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2.5"
              style={{ borderBottom: '1px solid rgba(175,197,255,0.07)', background: 'rgba(175,197,255,0.04)' }}>
              <p className="flex-1 font-body text-[10px] text-text-muted">Permission</p>
              {(['Owner', 'Admin', 'Staff'] as RoleLevel[]).map(r => (
                <p key={r} className="w-12 text-center font-body text-[10px] font-semibold"
                  style={{ color: ROLE_CFG[r].color }}>
                  {r}
                </p>
              ))}
            </div>
            {[
              { label: 'Full access', owner: true, admin: false, staff: false },
              { label: 'Payouts', owner: true, admin: true, staff: false },
              { label: 'Payments', owner: true, admin: true, staff: true },
              { label: 'View only', owner: true, admin: true, staff: true },
            ].map((row, i, arr) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2.5"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                <p className="flex-1 font-body text-xs text-text-muted">{row.label}</p>
                {(['owner', 'admin', 'staff'] as const).map(k => (
                  <div key={k} className="w-12 flex justify-center">
                    {row[k] ? (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(34,197,94,0.12)' }}>
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2 3-3.5" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(175,197,255,0.05)' }}>
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
                          <path d="M1.5 1.5l3 3M4.5 1.5l-3 3" stroke="rgba(175,197,255,0.25)" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
