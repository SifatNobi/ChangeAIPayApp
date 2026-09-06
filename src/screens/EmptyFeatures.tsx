interface EmptyFeaturesProps {
  onClearFilter?: () => void
  onRequestFeature?: () => void
  filterLabel?: string
}

export default function EmptyFeatures({ onClearFilter, onRequestFeature, filterLabel }: EmptyFeaturesProps) {
  const hasFilter = !!filterLabel

  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 gap-6" style={{ minHeight: 420 }}>
      {/* Illustration */}
      <div
        className="w-20 h-20 rounded-[24px] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(63,231,255,0.07) 0%, rgba(77,159,255,0.04) 100%)',
          border: '1px solid rgba(63,231,255,0.15)',
          boxShadow: '0 0 24px rgba(63,231,255,0.08)',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <rect x="7" y="9" width="22" height="18" rx="3" stroke="rgba(63,231,255,0.5)" strokeWidth="1.4" />
          <path d="M11 14h6M11 18h10M11 22h4" stroke="rgba(63,231,255,0.4)" strokeWidth="1.1" strokeLinecap="round" />
          <circle cx="27" cy="27" r="6" fill="rgba(10,15,30,1)" stroke="rgba(63,231,255,0.35)" strokeWidth="1.2" />
          <path d="M24.5 27h5M27 24.5v5" stroke="rgba(63,231,255,0.6)" strokeWidth="1.1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-2 max-w-[260px]">
        {hasFilter ? (
          <>
            <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">
              No results for "{filterLabel}"
            </p>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              No feature requests match that filter. Try a different category or clear it to see everything.
            </p>
          </>
        ) : (
          <>
            <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">No feature requests yet</p>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              Be the first to shape the roadmap. Submit an idea and the team will review it.
            </p>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2.5 w-full max-w-[260px]">
        {hasFilter && (
          <button
            onClick={onClearFilter}
            className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{
              background: 'rgba(63,231,255,0.06)',
              color: '#3FE7FF',
              border: '1px solid rgba(63,231,255,0.18)',
            }}
          >
            Clear filter
          </button>
        )}
        <button
          onClick={onRequestFeature}
          className="w-full h-11 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
          style={{
            background: hasFilter ? 'rgba(175,197,255,0.05)' : 'rgba(63,231,255,0.06)',
            color: hasFilter ? 'rgba(175,197,255,0.7)' : '#3FE7FF',
            border: hasFilter ? '1px solid rgba(175,197,255,0.12)' : '1px solid rgba(63,231,255,0.18)',
          }}
        >
          Request a feature
        </button>
      </div>
    </div>
  )
}
