import { MerchantBottomNav, type MerchantNavItem } from '@/components/Nav'
import { useState } from 'react'

interface LinkRow {
  label: string
  sub?: string
  onPress: () => void
  badge?: string
  danger?: boolean
}

function NavSection({ title, rows }: { title: string; rows: LinkRow[] }) {
  return (
    <div>
      <p className="font-body text-[10px] font-semibold uppercase tracking-widest text-text-muted px-1 mb-2">
        {title}
      </p>
      <div
        className="rounded-[--radius-2xl] overflow-hidden"
        style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}
      >
        {rows.map((row, i) => (
          <button
            key={i}
            onClick={row.onPress}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface/50"
            style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
          >
            <div className="flex-1">
              <p
                className="font-body text-sm font-medium"
                style={{ color: row.danger ? '#F87171' : 'var(--color-text)' }}
              >
                {row.label}
              </p>
              {row.sub && (
                <p className="font-body text-[10px] text-text-muted mt-0.5">{row.sub}</p>
              )}
            </div>
            {row.badge && (
              <span
                className="px-2 py-0.5 rounded-full font-body text-[10px] font-semibold mr-1"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                {row.badge}
              </span>
            )}
            {!row.danger && (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

interface MerchantProfileProps {
  businessName?: string
  onNavigate?: (item: MerchantNavItem) => void
  onTeamMembers?: () => void
  onRoles?: () => void
  onSecurity?: () => void
  onSettings?: () => void
  onStatements?: () => void
  onPayoutSettings?: () => void
  onDeveloperSettings?: () => void
  onTaxDocuments?: () => void
  onHelp?: () => void
  onSupport?: () => void
  onDeleteAccount?: () => void
  onLogout?: () => void
  onAinaChat?: () => void
  isEnterprise?: boolean
}

export default function MerchantProfile({
  businessName = '',
  onNavigate,
  onTeamMembers,
  onRoles,
  onSecurity,
  onSettings,
  onStatements,
  onPayoutSettings,
  onDeveloperSettings,
  onTaxDocuments,
  onHelp,
  onSupport,
  onDeleteAccount,
  onLogout,
  onAinaChat,
  isEnterprise = false,
}: MerchantProfileProps) {
  const [activeNav, setActiveNav] = useState<MerchantNavItem>('profile')
  const initials = businessName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  const handleNav = (item: MerchantNavItem) => {
    setActiveNav(item)
    onNavigate?.(item)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: 'none' }}>

        {/* Business hero */}
        <div
          className="px-5 pt-6 pb-6 flex flex-col items-center gap-4"
          style={{
            background: 'linear-gradient(180deg, rgba(0,20,60,0.7) 0%, transparent 100%)',
            borderBottom: '1px solid rgba(175,197,255,0.08)',
          }}
        >
          <div className="relative">
            <div
              className="w-20 h-20 rounded-[22px] flex items-center justify-center font-display text-2xl font-extrabold text-white"
              style={{
                background: 'linear-gradient(135deg, #0066FF, #9945FF)',
                boxShadow: '0 0 0 3px rgba(0,102,255,0.15), 0 8px 24px rgba(0,102,255,0.35)',
              }}
            >
              {initials}
            </div>
            <div
              className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full font-body text-[9px] font-bold"
              style={{ background: 'rgba(34,197,94,0.9)', color: 'white', border: '1.5px solid var(--color-bg)' }}
            >
              ✓ KYB
            </div>
          </div>

          <div className="text-center">
            <p className="font-display text-xl font-extrabold text-text">{businessName}</p>
            <p className="font-body text-xs text-text-muted mt-0.5">@apexstudio · Merchant Business</p>
          </div>

          {/* Stats strip */}
          <div
            className="w-full flex gap-3 mt-1 px-2 py-3 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.09)' }}
          >
            {[
              { label: 'Monthly Rev', value: '$0' },
              { label: 'Transactions', value: '0' },
              { label: 'Team', value: '0 members' },
            ].map((s, i) => (
              <div key={i} className="flex-1 text-center">
                <p className="font-mono text-sm font-bold text-text">{s.value}</p>
                <p className="font-body text-[9px] text-text-muted mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={onAinaChat}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs font-semibold transition-all"
            style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)', color: '#3FE7FF' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z" stroke="#3FE7FF" strokeWidth="1" />
              <path d="M4 5h4M4 7h2" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" />
            </svg>
            Chat with Aina
          </button>
        </div>

        <div className="px-5 pt-5 flex flex-col gap-5">
          <NavSection title="Management" rows={[
            { label: 'Team Members', sub: '0 active members', onPress: () => onTeamMembers?.() },
            { label: 'Roles & Permissions', sub: 'Owner, Admin, Staff', onPress: () => onRoles?.() },
          ]} />

          <NavSection title="Account" rows={[
            { label: 'Security', sub: 'Password, PIN, 2FA, sessions', onPress: () => onSecurity?.() },
            { label: 'Settings', sub: 'Business hours, notifications', onPress: () => onSettings?.() },
          ]} />

          <NavSection title="Payments" rows={[
            { label: 'Payout Settings', sub: 'Schedule, bank account, history', onPress: () => onPayoutSettings?.() },
            ...(isEnterprise ? [{ label: 'Developer & API Settings', sub: 'API keys, webhooks, sandbox', onPress: () => onDeveloperSettings?.() }] : []),
          ]} />

          <NavSection title="Documents" rows={[
            { label: 'Statements', onPress: () => onStatements?.() },
            { label: 'Tax Documents', onPress: () => onTaxDocuments?.() },
          ]} />

          <NavSection title="Support" rows={[
            { label: 'Help', onPress: () => onHelp?.() },
            { label: 'Contact Support', onPress: () => onSupport?.() },
          ]} />

          <NavSection title="Account Actions" rows={[
            { label: 'Log out', onPress: () => onLogout?.(), danger: false },
            { label: 'Delete Business Account', onPress: () => onDeleteAccount?.(), danger: true },
          ]} />
        </div>
      </div>

      <MerchantBottomNav active={activeNav} onChange={handleNav} />
    </div>
  )
}
