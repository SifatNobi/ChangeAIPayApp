import { useState } from 'react'

type MemberRole = 'Owner' | 'Admin' | 'Staff'
type MemberStatus = 'active' | 'pending'

interface TeamMember {
  id: string
  name: string
  email: string
  role: MemberRole
  status: MemberStatus
  isYou?: boolean
  initials: string
  color: string
  lastActive?: string
}

const ROLE_CFG: Record<MemberRole, { color: string; bg: string }> = {
  Owner: { color: '#F5B700', bg: 'rgba(245,183,0,0.1)' },
  Admin: { color: '#0066FF', bg: 'rgba(0,102,255,0.1)' },
  Staff: { color: 'rgba(175,197,255,0.6)', bg: 'rgba(175,197,255,0.08)' },
}

const INITIAL_MEMBERS: TeamMember[] = []

interface TeamMembersProps {
  onBack?: () => void
  onViewRoles?: () => void
}

export default function TeamMembers({ onBack, onViewRoles }: TeamMembersProps) {
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<MemberRole>('Staff')
  const [inviteSending, setInviteSending] = useState(false)
  const [inviteSent, setInviteSent] = useState(false)
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null)

  const handleInvite = () => {
    if (!inviteEmail.trim()) return
    setInviteSending(true)
    setTimeout(() => {
      setInviteSending(false)
      setInviteSent(true)
      const newMember: TeamMember = {
        id: Date.now().toString(),
        name: inviteEmail.split('@')[0],
        email: inviteEmail.trim(),
        role: inviteRole,
        status: 'pending',
        initials: inviteEmail.slice(0, 2).toUpperCase(),
        color: '#AFC5FF',
      }
      setMembers(prev => [...prev, newMember])
      setTimeout(() => {
        setInviteEmail('')
        setInviteRole('Staff')
        setInviteSent(false)
        setShowInvite(false)
      }, 1500)
    }, 1200)
  }

  const handleRemove = (id: string) => {
    setMembers(prev => prev.filter(m => m.id !== id))
    setConfirmRemove(null)
  }

  const active = members.filter(m => m.status === 'active')
  const pending = members.filter(m => m.status === 'pending')

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Team Members</p>
        <button
          onClick={() => setShowInvite(v => !v)}
          className="px-3 h-8 rounded-full font-body text-xs font-semibold transition-all"
          style={{
            background: showInvite ? 'rgba(0,102,255,0.15)' : 'var(--gradient-primary)',
            color: 'white',
          }}
        >
          + Invite
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Invite form */}
        {showInvite && (
          <div
            className="rounded-[--radius-2xl] px-4 py-4 flex flex-col gap-3"
            style={{ background: 'rgba(0,30,80,0.5)', border: '1px solid rgba(0,102,255,0.2)' }}
          >
            <p className="font-body text-xs font-semibold text-text">Invite a team member</p>
            <input
              className="w-full bg-transparent font-body text-sm text-text placeholder-text-muted outline-none px-3 h-10 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
              placeholder="Email address"
              value={inviteEmail}
              onChange={e => setInviteEmail(e.target.value)}
            />
            <div>
              <p className="font-body text-[10px] text-text-muted mb-2">Role</p>
              <div className="flex gap-2">
                {(['Admin', 'Staff'] as MemberRole[]).map(r => (
                  <button key={r} onClick={() => setInviteRole(r)}
                    className="flex-1 h-8 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                    style={{
                      background: inviteRole === r ? ROLE_CFG[r].bg : 'rgba(175,197,255,0.04)',
                      color: inviteRole === r ? ROLE_CFG[r].color : 'rgba(175,197,255,0.5)',
                      border: `1px solid ${inviteRole === r ? ROLE_CFG[r].color + '40' : 'rgba(175,197,255,0.1)'}`,
                    }}>
                    {r}
                  </button>
                ))}
                <button onClick={onViewRoles}
                  className="px-3 h-8 rounded-[--radius-xl] font-body text-[10px] transition-all"
                  style={{ color: 'rgba(175,197,255,0.4)', border: '1px solid rgba(175,197,255,0.08)' }}>
                  What's this?
                </button>
              </div>
            </div>
            <button
              onClick={handleInvite}
              disabled={!inviteEmail.trim() || inviteSending}
              className="w-full h-10 rounded-[--radius-xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all"
              style={{
                background: inviteSent ? 'rgba(34,197,94,0.15)' : inviteSending ? 'rgba(0,102,255,0.4)' : 'var(--gradient-primary)',
                color: inviteSent ? '#22C55E' : 'white',
                border: inviteSent ? '1px solid rgba(34,197,94,0.3)' : 'none',
              }}>
              {inviteSending ? (
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              ) : inviteSent ? (
                'Invite sent!'
              ) : 'Send Invite'}
            </button>
          </div>
        )}

        {/* Active members */}
        <div>
          <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
            Active · {active.length}
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {active.map((m, i) => (
              <div key={m.id}
                style={{ borderBottom: i < active.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                <div className="flex items-center gap-3 px-4 py-3.5">
                  <div className="relative shrink-0">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold text-white"
                      style={{ background: `${m.color}25`, border: `1.5px solid ${m.color}40`, color: m.color }}>
                      {m.initials}
                    </div>
                    {m.status === 'active' && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full"
                        style={{ background: '#22C55E', border: '1.5px solid var(--color-bg)' }} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-body text-xs font-semibold text-text">{m.name}</p>
                      {m.isYou && (
                        <span className="font-body text-[9px] text-text-muted">(you)</span>
                      )}
                    </div>
                    <p className="font-body text-[10px] text-text-muted truncate">{m.email}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-2 py-0.5 rounded-full font-body text-[10px] font-semibold"
                      style={{ background: ROLE_CFG[m.role].bg, color: ROLE_CFG[m.role].color }}>
                      {m.role}
                    </span>
                    {!m.isYou && (
                      <button
                        onClick={() => setConfirmRemove(m.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M3 7h8" stroke="rgba(175,197,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>

                {/* Confirm remove */}
                {confirmRemove === m.id && (
                  <div
                    className="mx-4 mb-3 px-3 py-3 rounded-[--radius-xl] flex items-center gap-3"
                    style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
                  >
                    <p className="font-body text-xs text-text flex-1">Remove {m.name}?</p>
                    <button onClick={() => handleRemove(m.id)}
                      className="px-3 h-7 rounded-full font-body text-xs font-semibold"
                      style={{ background: 'rgba(239,68,68,0.15)', color: '#F87171' }}>
                      Remove
                    </button>
                    <button onClick={() => setConfirmRemove(null)}
                      className="px-3 h-7 rounded-full font-body text-xs"
                      style={{ color: 'rgba(175,197,255,0.5)' }}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pending invites */}
        {pending.length > 0 && (
          <div>
            <p className="font-body text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
              Pending Invites · {pending.length}
            </p>
            <div className="rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(245,183,0,0.14)', background: 'rgba(245,183,0,0.03)' }}>
              {pending.map((m, i) => (
                <div key={m.id} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < pending.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-display text-sm font-bold shrink-0"
                    style={{ background: 'rgba(245,183,0,0.1)', color: '#F5B700', border: '1.5px solid rgba(245,183,0,0.2)' }}>
                    {m.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-xs font-semibold text-text-muted">{m.email}</p>
                    <p className="font-body text-[10px]" style={{ color: '#F5B700' }}>Invite pending</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full font-body text-[10px] font-semibold"
                    style={{ background: ROLE_CFG[m.role].bg, color: ROLE_CFG[m.role].color }}>
                    {m.role}
                  </span>
                  <button onClick={() => setMembers(prev => prev.filter(x => x.id !== m.id))}
                    className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-surface transition-colors ml-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3 3l6 6M9 3l-6 6" stroke="rgba(175,197,255,0.35)" strokeWidth="1.1" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Roles link */}
        <button onClick={onViewRoles}
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] w-full text-left"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="2" width="12" height="12" rx="3" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" />
            <path d="M5 6h6M5 9h4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <div className="flex-1">
            <p className="font-body text-sm font-medium text-text">Roles &amp; Permissions</p>
            <p className="font-body text-[10px] text-text-muted">Manage what each role can do</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
