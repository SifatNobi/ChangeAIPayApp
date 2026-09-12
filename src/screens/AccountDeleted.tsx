import { useEffect, useState } from 'react'

interface AccountDeletedProps {
  onDone?: () => void
  accountType?: 'consumer' | 'merchant'
  email?: string
}

export default function AccountDeleted({
  onDone,
  accountType = 'consumer',
  email = 'maya@example.com',
}: AccountDeletedProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Subtle ambient — muted, respectful */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(175,197,255,0.04) 0%, transparent 70%)' }} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-7 relative z-10">

        {/* Icon */}
        <div
          className="transition-all duration-700"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.85)' }}
        >
          <div className="w-20 h-20 rounded-[28px] flex items-center justify-center"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: '1px solid rgba(175,197,255,0.12)',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="14" r="6" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" />
              <path d="M8 30c0-6 4-10 10-10s10 4 10 10" stroke="rgba(175,197,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="28" y1="8" x2="8" y2="28" stroke="rgba(175,197,255,0.25)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Copy */}
        <div
          className="text-center flex flex-col gap-2.5 transition-all duration-700 delay-150"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <p className="font-display text-2xl font-extrabold text-text tracking-tight">Account closed</p>
          <p className="font-body text-sm text-text-muted leading-relaxed max-w-[270px]">
            Your ChangeAIPay {accountType === 'merchant' ? 'merchant ' : ''}account has been permanently deleted. We're sorry to see you go.
          </p>
          <p className="font-mono text-[11px] mt-1" style={{ color: 'rgba(175,197,255,0.3)' }}>{email}</p>
        </div>

        {/* Info cards */}
        <div
          className="w-full flex flex-col gap-2.5 transition-all duration-500 delay-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {[
            {
              icon: '🗂️',
              title: 'Data handled as requested',
              sub: 'Your personal data has been processed per our deletion policy and applicable law.',
            },
            {
              icon: '💸',
              title: 'Remaining balance',
              sub: 'Any remaining balance was returned to your linked bank account within 5–10 business days.',
            },
            {
              icon: '🔒',
              title: 'Access permanently removed',
              sub: 'Your login credentials no longer work. All active sessions have been invalidated.',
            },
          ].map(item => (
            <div key={item.icon} className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
              <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <p className="font-body text-xs font-semibold text-text">{item.title}</p>
                <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Return note */}
        <div
          className="w-full px-4 py-3 rounded-[--radius-xl] text-center transition-all duration-500 delay-400"
          style={{
            opacity: visible ? 1 : 0,
            background: 'rgba(175,197,255,0.02)',
            border: '1px solid rgba(175,197,255,0.07)',
          }}
        >
          <p className="font-body text-[11px] text-text-muted leading-relaxed">
            Changed your mind in the future? You're always welcome to create a new account at{' '}
            <span className="text-text font-semibold">changeaipay.com</span>
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-10 relative z-10"
        style={{ opacity: visible ? 1 : 0, transition: 'opacity 500ms ease 600ms' }}>
        <button
          onClick={onDone}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: 'rgba(175,197,255,0.06)',
            color: 'rgba(175,197,255,0.7)',
            border: '1px solid rgba(175,197,255,0.12)',
          }}
        >
          Done
        </button>
      </div>
    </div>
  )
}
