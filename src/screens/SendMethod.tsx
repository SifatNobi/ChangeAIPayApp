import AuthHeader from '@/components/AuthHeader'

interface SendMethodProps {
  onChangeAPay?: () => void
  onPhone?: () => void
  onEmail?: () => void
  onBankDomestic?: () => void
  onBankInternational?: () => void
  onBack?: () => void
}

const METHODS = [
  {
    id: 'changeaipay',
    label: 'ChangeAIPay contact',
    sub: 'Instant · free · no fees',
    badge: 'Instant',
    badgeColor: '#22C55E',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="8" r="3.5" stroke="#3FE7FF" strokeWidth="1.4" />
        <path d="M3 18c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke="#3FE7FF" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'phone',
    label: 'Phone number',
    sub: 'Send to any mobile number',
    badge: null,
    badgeColor: '',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5.5" y="2" width="9" height="16" rx="2" stroke="#AFC5FF" strokeWidth="1.4" />
        <circle cx="10" cy="15" r="1" fill="#AFC5FF" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email address',
    sub: 'Recipient gets a claim link',
    badge: null,
    badgeColor: '',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2.5" y="5" width="15" height="11" rx="2" stroke="#AFC5FF" strokeWidth="1.4" />
        <path d="M2.5 7l7.5 5.5L17.5 7" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'bank-domestic',
    label: 'Bank account (Domestic)',
    sub: '1–2 business days · standard fee may apply',
    badge: null,
    badgeColor: '',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 8l7-5 7 5H3Z" stroke="#AFC5FF" strokeWidth="1.3" strokeLinejoin="round" />
        <rect x="5" y="8" width="3" height="7" stroke="#AFC5FF" strokeWidth="1.2" />
        <rect x="8.5" y="8" width="3" height="7" stroke="#AFC5FF" strokeWidth="1.2" />
        <rect x="12" y="8" width="3" height="7" stroke="#AFC5FF" strokeWidth="1.2" />
        <line x1="2.5" y1="15" x2="17.5" y2="15" stroke="#AFC5FF" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'bank-international',
    label: 'Bank account (International)',
    sub: '1–4 business days · FX fee applies',
    badge: 'FX fee',
    badgeColor: '#F5B700',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="7.5" stroke="#AFC5FF" strokeWidth="1.3" />
        <ellipse cx="10" cy="10" rx="3.5" ry="7.5" stroke="#AFC5FF" strokeWidth="1.1" />
        <line x1="2.5" y1="10" x2="17.5" y2="10" stroke="#AFC5FF" strokeWidth="1.1" />
        <line x1="10" y1="2.5" x2="10" y2="17.5" stroke="#AFC5FF" strokeWidth="1.1" />
      </svg>
    ),
  },
]

const handlers: Record<string, ((props: SendMethodProps) => void) | undefined> = {
  changeaipay: p => p.onChangeAPay?.(),
  phone: p => p.onPhone?.(),
  email: p => p.onEmail?.(),
  'bank-domestic': p => p.onBankDomestic?.(),
  'bank-international': p => p.onBankInternational?.(),
}

export default function SendMethod(props: SendMethodProps) {
  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title="Send Money" onBack={props.onBack} />
      </div>

      <div className="overflow-y-auto pb-8 flex-1 px-5 mt-4 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        <p className="font-body text-sm text-text-muted mb-1">How would you like to send?</p>

        {METHODS.map((m, i) => (
          <button
            key={m.id}
            onClick={() => handlers[m.id]?.(props)}
            className="w-full flex items-center gap-4 px-4 py-4 rounded-[--radius-2xl] text-left transition-all duration-[180ms] active:scale-[0.98] hover:brightness-105 focus-ring"
            style={{
              background: i === 0
                ? 'linear-gradient(135deg, rgba(0,50,100,0.8), rgba(0,102,255,0.15))'
                : 'rgba(175,197,255,0.04)',
              border: i === 0
                ? '1px solid rgba(63,231,255,0.25)'
                : '1px solid rgba(175,197,255,0.1)',
              boxShadow: i === 0 ? '0 4px 20px rgba(0,102,255,0.15)' : 'none',
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: i === 0 ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.06)' }}
            >
              {m.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`font-body text-sm font-semibold ${i === 0 ? 'text-text' : 'text-text-2'}`}>{m.label}</p>
                {m.badge && (
                  <span
                    className="px-1.5 h-4 rounded-sm font-body text-[9px] font-bold uppercase tracking-wide inline-flex items-center"
                    style={{ background: `${m.badgeColor}18`, color: m.badgeColor, border: `1px solid ${m.badgeColor}30` }}
                  >
                    {m.badge}
                  </span>
                )}
              </div>
              <p className="font-body text-xs text-text-muted mt-0.5">{m.sub}</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        ))}

        {/* In-app free notice */}
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-[--radius-xl] mt-1"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#22C55E" strokeWidth="1" />
            <path d="M3.5 6l2 2 3-3" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-success">ChangeAIPay-to-ChangeAIPay transfers are always free</p>
        </div>
      </div>
    </div>
  )
}
