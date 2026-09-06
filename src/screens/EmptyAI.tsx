interface EmptyAIProps {
  onStartChat?: () => void
  aiAssistant?: 'fina' | 'aina'
}

const FINA_STARTERS = [
  "What can I help you save for?",
  "How are you managing your spending lately?",
  "Want a quick health check on your finances?",
  "Any upcoming expenses I should know about?",
]

const AINA_STARTERS = [
  "Ready to review your recent transaction volume?",
  "Want a breakdown of your top revenue channels?",
  "Any upcoming cash-flow concerns I can model?",
  "Looking for insights on your customer retention?",
]

export default function EmptyAI({ onStartChat, aiAssistant = 'fina' }: EmptyAIProps) {
  const isFina = aiAssistant === 'fina'
  const name = isFina ? 'Fina' : 'Aina'
  const starters = isFina ? FINA_STARTERS : AINA_STARTERS
  const color = isFina ? '#4D9FFF' : '#9945FF'
  const glowColor = isFina ? 'rgba(77,159,255,0.25)' : 'rgba(153,69,255,0.3)'
  const bgColor = isFina ? 'rgba(0,102,255,0.08)' : 'rgba(153,69,255,0.08)'
  const borderColor = isFina ? 'rgba(0,102,255,0.2)' : 'rgba(153,69,255,0.22)'
  const tagline = isFina
    ? "Your personal finance companion"
    : "Your business intelligence partner"

  return (
    <div className="flex flex-col items-center justify-center px-5 py-12 gap-6" style={{ minHeight: 480 }}>
      {/* Avatar ring */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: bgColor,
            border: `1.5px solid ${borderColor}`,
            boxShadow: `0 0 0 6px ${isFina ? 'rgba(0,102,255,0.06)' : 'rgba(153,69,255,0.06)'}, 0 0 28px ${glowColor}`,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            {isFina ? (
              <>
                <circle cx="18" cy="14" r="6" stroke={color} strokeWidth="1.4" />
                <path d="M8 30c0-6 4-10 10-10s10 4 10 10" stroke={color} strokeWidth="1.4" strokeLinecap="round" />
                <path d="M15 13l2 2 4-4" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </>
            ) : (
              <>
                <rect x="7" y="7" width="22" height="22" rx="5" stroke={color} strokeWidth="1.4" />
                <path d="M12 18h12M12 13h8M12 23h6" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="26" cy="13" r="3" fill={bgColor} stroke={color} strokeWidth="1" />
                <path d="M25 13h2M26 12v2" stroke={color} strokeWidth="0.9" strokeLinecap="round" />
              </>
            )}
          </svg>
        </div>
        <div
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(34,197,94,0.3)' }}
        >
          <div className="w-2 h-2 rounded-full" style={{ background: '#22C55E', boxShadow: '0 0 6px #22C55E' }} />
        </div>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-1.5 max-w-[260px]">
        <p className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">{name} is ready</p>
        <p className="font-body text-[11px] font-semibold" style={{ color }}>{tagline}</p>
        <p className="font-body text-sm text-text-muted leading-relaxed mt-1">
          Start a conversation. Previous chats will appear here so you can pick up right where you left off.
        </p>
      </div>

      {/* Suggested starters */}
      <div className="w-full flex flex-col gap-2 max-w-[300px]">
        {starters.map((s, i) => (
          <button
            key={i}
            onClick={onStartChat}
            className="w-full text-left px-4 py-3 rounded-[--radius-xl] font-body text-[12px] transition-all active:scale-[0.98]"
            style={{
              background: 'rgba(175,197,255,0.03)',
              color: 'rgba(175,197,255,0.65)',
              border: '1px solid rgba(175,197,255,0.09)',
            }}
          >
            <span className="mr-1.5" style={{ color }}>→</span>
            {s}
          </button>
        ))}
      </div>

      {/* CTA */}
      <button
        onClick={onStartChat}
        className="w-full max-w-[300px] h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${isFina ? 'rgba(0,102,255,0.28)' : 'rgba(153,69,255,0.28)'} 0%, ${isFina ? 'rgba(77,159,255,0.14)' : 'rgba(153,69,255,0.14)'} 100%)`,
          color,
          border: `1px solid ${borderColor}`,
          boxShadow: `0 4px 16px ${isFina ? 'rgba(0,102,255,0.12)' : 'rgba(153,69,255,0.12)'}`,
        }}
      >
        Start a conversation
      </button>
    </div>
  )
}
