import { useState } from 'react'

interface DataCategory {
  id: string
  label: string
  description: string
  required: boolean
  enabled: boolean
  icon: React.ReactNode
}

const INITIAL_CATEGORIES: DataCategory[] = [
  {
    id: 'transactions',
    label: 'Transaction History',
    description: "Used to analyze spending patterns and answer financial questions about your activity.",
    required: false,
    enabled: true,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.1" /><path d="M1 6.5h12" stroke="currentColor" strokeWidth="1.1" /></svg>,
  },
  {
    id: 'balance',
    label: 'Account Balance',
    description: "Lets Fina answer balance queries and give accurate financial advice.",
    required: false,
    enabled: true,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10V7l5-5 5 5v3" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /><rect x="4.5" y="7" width="3" height="3" rx=".5" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    id: 'goals',
    label: 'Goals & Auto Save',
    description: "Enables personalized guidance on reaching your savings targets.",
    required: false,
    enabled: true,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.1" /><circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.1" /><circle cx="7" cy="7" r="0.75" fill="currentColor" /></svg>,
  },
  {
    id: 'crypto',
    label: 'Crypto Portfolio',
    description: "Allows Fina to include your investment holdings in financial health assessments.",
    required: false,
    enabled: true,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 4H13l-3.5 2.5 1.5 4L7 9l-4 2.5 1.5-4L1 5h4.5L7 1Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" /></svg>,
  },
  {
    id: 'profile',
    label: 'Profile & Preferences',
    description: "Helps Fina tailor tone, format, and complexity of its responses to your style.",
    required: false,
    enabled: true,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="4.5" r="2.5" stroke="currentColor" strokeWidth="1.1" /><path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none" /></svg>,
  },
  {
    id: 'voice',
    label: 'Voice Transcripts',
    description: "Stored temporarily to improve response accuracy in voice conversations. Never shared.",
    required: false,
    enabled: false,
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="5" y="1.5" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.1" /><path d="M2.5 7A4.5 4.5 0 0 0 11.5 7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /><line x1="7" y1="11.5" x2="7" y2="12.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
]

type Retention = '7d' | '30d' | '90d' | 'forever'

interface AIPrivacyProps {
  onBack?: () => void
  onMemory?: () => void
}

export default function AIPrivacy({ onBack, onMemory }: AIPrivacyProps) {
  const [cats, setCats] = useState<DataCategory[]>(INITIAL_CATEGORIES)
  const [retention, setRetention] = useState<Retention>('30d')
  const [trainingConsent, setTrainingConsent] = useState(false)

  const toggle = (id: string) => {
    setCats(prev => prev.map(c => c.id === id && !c.required ? { ...c, enabled: !c.enabled } : c))
  }

  const RETENTION_OPTIONS: { id: Retention; label: string; sub: string }[] = [
    { id: '7d',     label: '7 days',    sub: 'Shortest — conversations auto-delete weekly' },
    { id: '30d',    label: '30 days',   sub: 'Recommended for most users' },
    { id: '90d',    label: '90 days',   sub: 'Longer history for richer context' },
    { id: 'forever',label: 'Forever',   sub: "We keep your history until you delete it" },
  ]

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">AI Privacy</p>
          <p className="font-body text-[10px] text-text-muted">Control what Fina can access</p>
        </div>
        <button onClick={onMemory}
          className="flex items-center gap-1.5 h-9 px-3 rounded-full font-body text-xs font-semibold hover:bg-surface-hi transition-all"
          style={{ border: '1px solid rgba(175,197,255,0.15)', color: '#AFC5FF' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
            <path d="M4 5c0-1.1.9-2 2-2s2 .9 2 2-2 3-2 3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            <circle cx="6" cy="9.5" r="0.5" fill="currentColor" />
          </svg>
          Memory
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Data access toggles */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Data Access</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {cats.map((cat, i) => (
              <div key={cat.id} className="flex items-start gap-3 px-4 py-3.5"
                style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: cat.enabled ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.05)', border: `1px solid ${cat.enabled ? 'rgba(63,231,255,0.25)' : 'rgba(175,197,255,0.1)'}`, color: cat.enabled ? '#3FE7FF' : 'rgba(175,197,255,0.3)' }}>
                  {cat.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-body text-sm font-semibold text-text">{cat.label}</p>
                    {cat.required && (
                      <span className="h-4 px-1.5 rounded-full font-body text-[8px] font-bold"
                        style={{ background: 'rgba(175,197,255,0.1)', color: 'rgba(175,197,255,0.4)' }}>
                        Required
                      </span>
                    )}
                  </div>
                  <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed">{cat.description}</p>
                </div>
                <button
                  onClick={() => toggle(cat.id)}
                  disabled={cat.required}
                  className="relative w-11 h-6 rounded-full transition-all duration-[200ms] shrink-0 mt-1 disabled:opacity-40"
                  style={{ background: cat.enabled ? '#3FE7FF' : 'rgba(175,197,255,0.15)', boxShadow: cat.enabled ? '0 0 8px rgba(63,231,255,0.35)' : 'none' }}>
                  <div className="absolute top-0.5 h-5 w-5 rounded-full transition-all duration-[200ms]"
                    style={{ left: cat.enabled ? 'calc(100% - 22px)' : '2px', background: cat.enabled ? '#050B2D' : 'white' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Conversation retention */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Conversation Retention</p>
          <div className="flex flex-col gap-2">
            {RETENTION_OPTIONS.map(r => (
              <button key={r.id} onClick={() => setRetention(r.id)}
                className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all duration-[150ms]"
                style={{ background: retention === r.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)', border: `1px solid ${retention === r.id ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}` }}>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{r.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{r.sub}</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: retention === r.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}>
                  {retention === r.id && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Model improvement consent */}
        <div className="rounded-[--radius-2xl] px-4 py-4 flex items-start gap-3"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text mb-0.5">Help improve Fina</p>
            <p className="font-body text-[11px] text-text-muted leading-relaxed">
              Allow anonymized, de-identified conversations to be used to improve Fina's financial reasoning. Your personal data and account details are never shared.
            </p>
          </div>
          <button
            onClick={() => setTrainingConsent(p => !p)}
            className="relative w-11 h-6 rounded-full transition-all duration-[200ms] shrink-0 mt-0.5"
            style={{ background: trainingConsent ? '#0066FF' : 'rgba(175,197,255,0.15)', boxShadow: trainingConsent ? '0 0 8px rgba(0,102,255,0.4)' : 'none' }}>
            <div className="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all duration-[200ms]"
              style={{ left: trainingConsent ? 'calc(100% - 22px)' : '2px' }} />
          </button>
        </div>

        {/* Delete all data */}
        <button
          className="w-full h-12 rounded-[--radius-2xl] font-body text-xs font-semibold transition-all active:scale-[0.98]"
          style={{ background: 'rgba(255,77,90,0.06)', border: '1px solid rgba(255,77,90,0.2)', color: 'rgba(255,77,90,0.7)' }}>
          Delete All Fina Data & Conversations
        </button>

        {/* Legal note */}
        <p className="font-body text-[10px] text-text-muted leading-relaxed text-center px-4">
          Data is stored on secure, encrypted servers. We never sell your financial data to third parties. See our Privacy Policy for full details.
        </p>
      </div>
    </div>
  )
}
