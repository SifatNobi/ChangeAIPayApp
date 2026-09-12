interface NotFoundProps {
  onHome?: () => void
  path?: string
}

export default function NotFound({ onHome, path }: NotFoundProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 gap-6" style={{ minHeight: 480 }}>
      {/* Large 404 */}
      <div className="relative flex flex-col items-center">
        <p
          className="font-display font-extrabold select-none"
          style={{
            fontSize: 96,
            lineHeight: 1,
            background: 'linear-gradient(135deg, rgba(175,197,255,0.12) 0%, rgba(175,197,255,0.04) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.04em',
          }}
        >
          404
        </p>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div
            className="w-16 h-16 rounded-[18px] flex items-center justify-center"
            style={{
              background: 'rgba(175,197,255,0.04)',
              border: '1px solid rgba(175,197,255,0.1)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M14 4L4 14h4v10h12V14h4L14 4z" stroke="rgba(175,197,255,0.4)" strokeWidth="1.3" strokeLinejoin="round" />
              <path d="M11 24v-6h6v6" stroke="rgba(175,197,255,0.3)" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Copy */}
      <div className="text-center flex flex-col gap-2 max-w-[260px]">
        <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Page not found</p>
        <p className="font-body text-sm text-text-muted leading-relaxed">
          This link may have expired or moved. Head back home and you'll find everything you need.
        </p>
        {path && (
          <p className="font-mono text-[10px] mt-0.5" style={{ color: 'rgba(175,197,255,0.25)' }}>
            {path}
          </p>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onHome}
        className="w-full max-w-[260px] h-12 rounded-[--radius-xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
        style={{
          background: 'linear-gradient(135deg, rgba(0,102,255,0.25) 0%, rgba(77,159,255,0.12) 100%)',
          color: '#4D9FFF',
          border: '1px solid rgba(0,102,255,0.3)',
          boxShadow: '0 4px 16px rgba(0,102,255,0.12)',
        }}
      >
        Back to Home
      </button>
    </div>
  )
}
