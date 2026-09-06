interface AuthHeaderProps {
  title?: string
  onBack?: () => void
  rightSlot?: React.ReactNode
  step?: number
  totalSteps?: number
}

export default function AuthHeader({ title, onBack, rightSlot, step, totalSteps }: AuthHeaderProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between h-12">
        {onBack ? (
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-[--radius-md] text-text-2 hover:text-text hover:bg-surface transition-all focus-ring"
            aria-label="Go back"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12 5L7 10l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : (
          <div className="w-10" />
        )}
        {title && (
          <p className="font-body text-base font-semibold text-text">{title}</p>
        )}
        {rightSlot ? rightSlot : <div className="w-10" />}
      </div>

      {step !== undefined && totalSteps !== undefined && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs text-text-muted">
              Step {step} of {totalSteps}
            </p>
            <p className="font-mono text-xs text-text-muted">
              {Math.round((step / totalSteps) * 100)}%
            </p>
          </div>
          <div className="h-1 rounded-full bg-surface-hi overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-[400ms] ease-out"
              style={{
                width: `${(step / totalSteps) * 100}%`,
                background: 'var(--gradient-primary)',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
