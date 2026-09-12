interface ProfileProps {
  name?: string
  handle?: string
  email?: string
  accountType?: 'personal' | 'business'
  kycStatus?: 'complete' | 'incomplete' | 'pending'
  onPersonalInfo?: () => void
  onSecurity?: () => void
  onDevices?: () => void
  onNotifications?: () => void
  onLanguage?: () => void
  onAISettings?: () => void
  onSubscription?: () => void
  onStatements?: () => void
  onTaxDocuments?: () => void
  onHelp?: () => void
  onSupport?: () => void
  onLogout?: () => void
  onDeleteAccount?: () => void
  onBack?: () => void
}

const AVATAR_INITIALS = (name: string) =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

interface Section {
  title: string
  items: SectionItem[]
}

interface SectionItem {
  id: string
  label: string
  sub?: string
  icon: React.ReactNode
  accent?: string
  danger?: boolean
  badge?: string
}

export default function Profile({
  name = '',
  handle = '',
  email = '',
  accountType = 'personal',
  kycStatus = 'complete',
  onPersonalInfo, onSecurity, onDevices, onNotifications, onLanguage,
  onAISettings, onSubscription, onStatements, onTaxDocuments,
  onHelp, onSupport, onLogout, onDeleteAccount, onBack,
}: ProfileProps) {
  const SECTIONS: Section[] = [
    {
      title: 'Account',
      items: [
        { id: 'personal',  label: 'Personal Information', sub: 'Name, email, address',       icon: iconUser(),         accent: '#3FE7FF' },
        { id: 'security',  label: 'Security',             sub: 'Password, PIN, biometrics',   icon: iconShield(),       accent: '#22C55E' },
        { id: 'devices',   label: 'Devices',              sub: 'Active sessions & sign-outs',icon: iconDevice(),       accent: '#9945FF' },
        { id: 'notifs',    label: 'Notifications',        sub: 'Alerts & preferences',        icon: iconBell(),         accent: '#F5B700' },
        { id: 'language',  label: 'Language',             sub: 'English (US)',                icon: iconGlobe(),        accent: '#FC7E2F' },
      ],
    },
    {
      title: 'Fina AI',
      items: [
        { id: 'ai',        label: 'AI Settings',          sub: 'Notifications, voice, memory',icon: iconAI(),          accent: '#3FE7FF' },
      ],
    },
    {
      title: 'Plan',
      items: [
        { id: 'plan',      label: 'Subscription',         sub: 'Free plan — upgrade anytime', icon: iconStar(),        accent: '#F5B700', badge: 'Free' },
      ],
    },
    {
      title: 'Documents',
      items: [
        { id: 'statements', label: 'Statements',          sub: 'Monthly account statements',  icon: iconDoc(),         accent: '#AFC5FF' },
        { id: 'tax',        label: 'Tax Documents',       sub: '1099s, forms, year-end docs', icon: iconTax(),         accent: '#AFC5FF' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: 'help',    label: 'Help Center',            sub: 'FAQs & guides',               icon: iconHelp(),        accent: '#3FE7FF' },
        { id: 'support', label: 'Contact Support',        sub: 'Chat or email',               icon: iconChat(),        accent: '#3FE7FF' },
      ],
    },
    {
      title: 'Session',
      items: [
        { id: 'logout', label: 'Log Out',                 icon: iconLogout(),                  danger: false, accent: 'rgba(175,197,255,0.5)' },
        { id: 'delete', label: 'Delete Account',          sub: 'Permanent — cannot be undone', icon: iconTrash(),      danger: true },
      ],
    },
  ]

  const onPress: Record<string, (() => void) | undefined> = {
    personal: onPersonalInfo, security: onSecurity, devices: onDevices,
    notifs: onNotifications, language: onLanguage, ai: onAISettings,
    plan: onSubscription, statements: onStatements, tax: onTaxDocuments,
    help: onHelp, support: onSupport, logout: onLogout, delete: onDeleteAccount,
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Profile</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Avatar hero card */}
        <div className="flex flex-col items-center gap-3 py-6 px-5 rounded-[--radius-2xl]"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.92), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}>
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-[24px] flex items-center justify-center font-display text-2xl font-extrabold text-white"
              style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 28px rgba(63,231,255,0.4)' }}>
              {AVATAR_INITIALS(name)}
            </div>
            {kycStatus === 'complete' && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: '#22C55E', border: '2px solid #050B2D' }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2 2.5 4-4" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>

          {/* Name & handle */}
          <div className="flex flex-col items-center gap-0.5">
            <p className="font-display text-xl font-extrabold text-text tracking-tight">{name}</p>
            <p className="font-body text-sm text-text-muted">{handle}</p>
            <p className="font-body text-xs text-text-muted">{email}</p>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2">
            <span className="h-6 px-3 rounded-full font-body text-xs font-semibold flex items-center gap-1"
              style={{ background: 'rgba(175,197,255,0.1)', border: '1px solid rgba(175,197,255,0.2)', color: '#AFC5FF' }}>
              {accountType === 'business' ? '🏢 Business' : '👤 Personal'}
            </span>
            {kycStatus === 'complete' && (
              <span className="h-6 px-3 rounded-full font-body text-xs font-semibold flex items-center gap-1"
                style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)', color: '#22C55E' }}>
                ✓ Verified
              </span>
            )}
            {kycStatus === 'incomplete' && (
              <span className="h-6 px-3 rounded-full font-body text-xs font-semibold flex items-center gap-1"
                style={{ background: 'rgba(245,183,0,0.12)', border: '1px solid rgba(245,183,0,0.25)', color: '#F5B700' }}>
                ! Verify now
              </span>
            )}
          </div>
        </div>

        {/* Sections */}
        {SECTIONS.map(section => (
          <div key={section.title}>
            <p className="font-body text-[10px] font-semibold text-text-muted uppercase tracking-widest mb-2.5">{section.title}</p>
            <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
              {section.items.map((item, i) => (
                <button
                  key={item.id}
                  onClick={onPress[item.id]}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-[150ms] hover:bg-surface-hi active:scale-[0.995]"
                  style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}
                >
                  {/* Icon tile */}
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: item.danger ? 'rgba(255,77,90,0.1)' : `${item.accent ?? '#AFC5FF'}14`, border: `1px solid ${item.danger ? 'rgba(255,77,90,0.22)' : `${item.accent ?? '#AFC5FF'}28`}`, color: item.danger ? '#FF4D5A' : (item.accent ?? '#AFC5FF') }}>
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-semibold" style={{ color: item.danger ? '#FF4D5A' : 'var(--color-text)' }}>{item.label}</p>
                    {item.sub && <p className="font-body text-[10px] text-text-muted truncate">{item.sub}</p>}
                  </div>

                  {item.badge && (
                    <span className="h-5 px-2 rounded-full font-body text-[9px] font-bold flex items-center shrink-0"
                      style={{ background: 'rgba(245,183,0,0.12)', color: '#F5B700', border: '1px solid rgba(245,183,0,0.25)' }}>
                      {item.badge}
                    </span>
                  )}

                  {!item.danger && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                      <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        <p className="font-body text-[10px] text-text-muted text-center">
          ChangeAIPay v2.4.1 · Made with care
        </p>
      </div>
    </div>
  )
}

// ── Icon helpers ──────────────────────────────────────────────────────
function iconUser() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.1" /><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none" /></svg>
}
function iconShield() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5l4.5 2v3.5c0 2.8-2 5.2-4.5 6-2.5-.8-4.5-3.2-4.5-6V3.5L7 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>
}
function iconDevice() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1.5" width="7" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.1" /><path d="M9 5.5h2a.5.5 0 0 1 .5.5v5.5a.5.5 0 0 1-.5.5H9" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
}
function iconBell() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5A3.5 3.5 0 0 0 3.5 5v2L2 8.5h10L10.5 7V5A3.5 3.5 0 0 0 7 1.5ZM5.5 8.5a1.5 1.5 0 0 0 3 0" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>
}
function iconGlobe() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" /><path d="M7 1.5C7 1.5 5 4 5 7s2 5.5 2 5.5M7 1.5C7 1.5 9 4 9 7s-2 5.5-2 5.5M1.5 7h11" stroke="currentColor" strokeWidth="1" /></svg>
}
function iconAI() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2" fill="currentColor" opacity="0.8" /><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none" /><path d="M10 1l.7 1.5L12 3l-1.3.5L10 5l-.7-1.5L8 3l1.3-.5L10 1Z" fill="currentColor" /></svg>
}
function iconStar() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.5l1.5 3.5H12l-2.8 2.2 1 3.3L7 8.5l-3.2 2 1-3.3L2 5h3.5L7 1.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>
}
function iconDoc() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2.5" y="1.5" width="9" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.1" /><path d="M5 5.5h4M5 7.5h4M5 9.5h2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
}
function iconTax() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="1.5" width="10" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.1" /><path d="M5 5.5h1.5M9 5.5h-.5M5 7.5h1.5M9 7.5h-.5M5 9.5h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>
}
function iconHelp() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" /><path d="M5.5 5.5a1.5 1.5 0 0 1 3 0c0 1-1.5 1.5-1.5 2.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /><circle cx="7" cy="10" r="0.6" fill="currentColor" /></svg>
}
function iconChat() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2.5h10a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5H5l-3 2V3a.5.5 0 0 1 .5-.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>
}
function iconLogout() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 4.5L12 7l-3 2.5M12 7H5.5M7 2H3a.5.5 0 0 0-.5.5v9A.5.5 0 0 0 3 12h4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
function iconTrash() {
  return <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 4h9M5 4V2.5h4V4M4 4l.5 7.5h5L10 4" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>
}
