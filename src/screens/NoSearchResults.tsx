interface NoSearchResultsProps {
  query?: string
  onClear?: () => void
  suggestions?: string[]
}

const DEFAULT_SUGGESTIONS = ["Send money", "Goals", "Transaction history", "Cards", "Settings"]

export default function NoSearchResults({ query, onClear, suggestions = DEFAULT_SUGGESTIONS }: NoSearchResultsProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 gap-6" style={{ minHeight: 420 }}>
      {/* Illustration */}
      <div
        className="w-20 h-20 rounded-[24px] flex items-center justify-center relative"
        style={{
          background: 'rgba(175,197,255,0.04)',
          border: '1px solid rgba(175,197,255,0.1)',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="16" cy="16" r="9" stroke="rgba(175,197,255,0.45)" strokeWidth="1.5" />
          <path d="M23 23l5 5" stroke="rgba(175,197,255,0.45)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M13 16h6M16 13v6" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
          <path d="M12 12l8 8" stroke="rgba(175,197,255,0.25)" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
        <div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-1.5 max-w-[270px]">
        <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">
          {query ? `No results for "${query}"` : "Nothing found"}
        </p>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          Try different keywords, or check for typos. You can also browse these popular areas:
        </p>
      </div>

      {/* Suggestions */}
      <div className="flex flex-wrap gap-2 justify-center max-w-[280px]">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={onClear}
            className="px-3 h-8 rounded-full font-body text-[12px] font-medium transition-all active:scale-[0.97]"
            style={{
              background: 'rgba(175,197,255,0.05)',
              color: 'rgba(175,197,255,0.7)',
              border: '1px solid rgba(175,197,255,0.12)',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Clear */}
      <button
        onClick={onClear}
        className="h-11 px-8 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
        style={{
          background: 'rgba(175,197,255,0.05)',
          color: 'rgba(175,197,255,0.6)',
          border: '1px solid rgba(175,197,255,0.1)',
        }}
      >
        Clear search
      </button>
    </div>
  )
}
