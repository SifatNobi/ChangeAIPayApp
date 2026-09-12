import logoImg from '@/imports/logo.png.jpeg'

interface AppReviewRequestProps {
  onRate?: () => void
  onDismiss?: () => void
  triggerContext?: string
}

export default function AppReviewRequest({
  onRate,
  onDismiss,
  triggerContext = 'goal reached',
}: AppReviewRequestProps) {
  const contextLabel: Record<string, string> = {
    'goal reached': "You just hit your savings goal",
    'payment sent': 'Your payment was sent instantly',
    'kyc approved': 'Your identity was verified',
    'default': 'After a positive moment',
  }
  const contextText = contextLabel[triggerContext] ?? contextLabel['default']

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 45% at 50% 40%, rgba(153,69,255,0.07) 0%, transparent 65%)' }} />

      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 relative z-10">

        {/* Context pill */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E' }} />
          <p className="font-body text-[10px] font-semibold" style={{ color: '#22C55E' }}>{contextText}</p>
        </div>

        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 rounded-[28px] blur-xl"
            style={{ background: 'rgba(153,69,255,0.2)', transform: 'scale(1.2)' }} />
          <img src={logoImg} alt="ChangeAIPay" className="w-20 h-20 rounded-[28px] relative z-10"
            style={{ boxShadow: '0 0 28px rgba(153,69,255,0.3)' }} />
        </div>

        {/* Copy */}
        <div className="text-center flex flex-col gap-2.5 max-w-[270px]">
          <p className="font-display text-2xl font-extrabold text-text tracking-tight">
            Enjoying ChangeAIPay?
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            A quick rating helps others find us — and helps us keep making things better for you. It only takes a moment.
          </p>
        </div>

        {/* Star preview (decorative) */}
        <div className="flex gap-2">
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 5l2.9 6.3 6.8.9-5 5 1.2 6.8L16 21l-5.9 3 1.2-6.8-5-5 6.8-.9z"
                fill={i <= 4 ? 'rgba(245,183,0,0.85)' : 'rgba(175,197,255,0.12)'}
                stroke={i <= 4 ? 'rgba(245,183,0,0.4)' : 'rgba(175,197,255,0.2)'}
                strokeWidth="1"
              />
            </svg>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3 w-full max-w-[300px]">
          <button
            onClick={onRate}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 20px rgba(0,102,255,0.25)' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2l1.8 3.8 4.2.5-3.1 3 .7 4.2L8 11.5l-3.6 2-.7-4.2L.5 6.3l4.2-.5z" fill="white" />
            </svg>
            Rate the app
          </button>
          <button
            onClick={onDismiss}
            className="w-full h-11 font-body text-sm transition-all active:scale-[0.98]"
            style={{ color: 'rgba(175,197,255,0.4)', background: 'transparent', border: 'none' }}>
            Not now
          </button>
        </div>

        {/* Fine print */}
        <p className="font-body text-[9px] text-center" style={{ color: 'rgba(175,197,255,0.25)' }}>
          We'll never ask again if you choose not now
        </p>
      </div>
    </div>
  )
}
