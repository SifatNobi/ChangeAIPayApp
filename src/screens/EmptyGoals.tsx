interface EmptyGoalsProps {
  onCreateGoal?: () => void
}

export default function EmptyGoals({ onCreateGoal }: EmptyGoalsProps) {
  const EXAMPLES = [
    { label: "Emergency fund", icon: "🛡️", color: '#22C55E', glow: 'rgba(34,197,94,0.2)' },
    { label: "Dream holiday", icon: "✈️", color: '#4D9FFF', glow: 'rgba(77,159,255,0.2)' },
    { label: "New laptop", icon: "💻", color: '#9945FF', glow: 'rgba(153,69,255,0.2)' },
  ]

  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 gap-6" style={{ minHeight: 480 }}>
      {/* Illustration */}
      <div
        className="w-24 h-24 rounded-[28px] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(153,69,255,0.1) 0%, rgba(77,159,255,0.06) 100%)',
          border: '1px solid rgba(153,69,255,0.22)',
          boxShadow: '0 0 32px rgba(153,69,255,0.15)',
        }}
      >
        <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
          <circle cx="21" cy="21" r="13" stroke="rgba(153,69,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="21" cy="21" r="8" stroke="rgba(153,69,255,0.6)" strokeWidth="1.4" />
          <circle cx="21" cy="21" r="3" fill="rgba(153,69,255,0.5)" />
          <path d="M21 8v3M21 31v3M8 21h3M31 21h3" stroke="rgba(153,69,255,0.35)" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-2 max-w-[260px]">
        <p className="font-display text-lg font-extrabold text-gradient-primary tracking-tight">Set your first goal</p>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          Goals help you save with purpose. Create one and track your progress toward what matters most.
        </p>
      </div>

      {/* Example goal chips */}
      <div className="flex gap-2">
        {EXAMPLES.map(ex => (
          <button
            key={ex.label}
            onClick={onCreateGoal}
            className="flex flex-col items-center gap-1.5 px-3 py-3 rounded-[--radius-xl] transition-all active:scale-[0.97]"
            style={{
              background: `rgba(0,0,0,0.2)`,
              border: `1px solid rgba(175,197,255,0.1)`,
              boxShadow: `0 0 12px ${ex.glow}`,
              minWidth: 76,
            }}
          >
            <span className="text-xl leading-none">{ex.icon}</span>
            <span className="font-body text-[10px] text-text-muted text-center leading-tight">{ex.label}</span>
          </button>
        ))}
      </div>

      {/* Primary CTA */}
      <button
        onClick={onCreateGoal}
        className="w-full max-w-[260px] h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
        style={{
          background: 'linear-gradient(135deg, rgba(153,69,255,0.28) 0%, rgba(77,159,255,0.14) 100%)',
          color: '#9945FF',
          border: '1px solid rgba(153,69,255,0.3)',
          boxShadow: '0 4px 16px rgba(153,69,255,0.15)',
        }}
      >
        Create a goal
      </button>
    </div>
  )
}
