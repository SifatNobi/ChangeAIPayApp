import { useState } from 'react'
import logoImg from '@/imports/logo.png.jpeg'

interface RateAppProps {
  onSubmit?: (rating: number, comment: string) => void
  onBack?: () => void
  onSkip?: () => void
}

const STAR_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Love it!']
const STAR_PROMPTS: Record<number, string> = {
  1: "We're sorry to hear that. What can we improve?",
  2: "Thanks for being honest. What would make it better?",
  3: "Good to know. Any specific suggestions?",
  4: "Great to hear! Anything that could make it perfect?",
  5: "Amazing! What do you love most about ChangeAIPay?",
}

export default function RateApp({ onSubmit, onBack, onSkip }: RateAppProps) {
  const [hovered, setHovered] = useState(0)
  const [selected, setSelected] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const displayRating = hovered || selected
  const starColor = (i: number) => {
    const active = displayRating >= i
    if (!active) return 'rgba(175,197,255,0.12)'
    if (displayRating >= 4) return '#F5B700'
    if (displayRating === 3) return '#F5B700'
    return '#F87171'
  }

  const handleSubmit = () => {
    if (!selected || submitting) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      onSubmit?.(selected, comment)
    }, 900)
  }

  if (submitted) {
    return (
      <div className="flex flex-col bg-bg items-center justify-center px-6 gap-6" style={{ minHeight: 785 }}>
        <div className="relative">
          <div className="absolute inset-0 rounded-full blur-2xl"
            style={{ background: 'rgba(245,183,0,0.2)', transform: 'scale(1.4)' }} />
          <div className="w-20 h-20 rounded-[28px] flex items-center justify-center relative z-10"
            style={{ background: 'rgba(245,183,0,0.1)', border: '1.5px solid rgba(245,183,0,0.3)', boxShadow: '0 0 28px rgba(245,183,0,0.2)' }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 6l2.7 6.1 6.7.9-4.9 5 1.2 6.8L18 21.5l-5.7 3.3 1.2-6.8-4.9-5 6.7-.9z"
                fill="rgba(245,183,0,0.7)" stroke="rgba(245,183,0,0.5)" strokeWidth="1" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <div className="text-center flex flex-col gap-2">
          <p className="font-display text-xl font-extrabold text-text">Thank you!</p>
          <p className="font-body text-sm text-text-muted max-w-[240px] leading-relaxed">
            Your {selected === 5 ? 'kind words mean' : 'feedback means'} a lot to us. We read every review.
          </p>
        </div>
        <div className="flex gap-1.5">
          {[1,2,3,4,5].map(i => (
            <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l2 5.3 5.5.7-4 4.1 1 5.5-4.5-2.6L7.5 18l1-5.5-4-4.1 5.5-.7z"
                fill={i <= selected ? '#F5B700' : 'rgba(175,197,255,0.1)'}
                stroke={i <= selected ? 'rgba(245,183,0,0.5)' : 'rgba(175,197,255,0.15)'}
                strokeWidth="1" />
            </svg>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Rate ChangeAIPay</p>
          <p className="font-body text-[10px] text-text-muted">Your honest feedback shapes the app</p>
        </div>
        <button onClick={onSkip} className="font-body text-xs" style={{ color: 'rgba(175,197,255,0.4)' }}>Skip</button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-6" style={{ scrollbarWidth: 'none' }}>

        {/* Logo */}
        <div className="flex items-center gap-4 pt-4">
          <img src={logoImg} alt="ChangeAIPay" className="w-14 h-14 rounded-[18px]"
            style={{ boxShadow: '0 0 20px rgba(0,102,255,0.25)' }} />
          <div>
            <p className="font-display text-base font-extrabold text-text">ChangeAIPay</p>
            <p className="font-body text-[11px] text-text-muted">AI-Native Fintech</p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-3">
            {[1,2,3,4,5].map(i => (
              <button
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(0)}
                onClick={() => setSelected(i)}
                className="transition-all active:scale-90"
                style={{ transform: (hovered >= i || selected >= i) ? 'scale(1.15)' : 'scale(1)' }}
              >
                <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                  <path
                    d="M22 7l3 7.5 8 1.2-5.8 5.8 1.4 8L22 25l-8.6 4.5 1.4-8L9 15.7l8-1.2z"
                    fill={starColor(i)}
                    stroke={displayRating >= i ? (displayRating >= 4 ? 'rgba(245,183,0,0.5)' : 'rgba(248,113,113,0.4)') : 'rgba(175,197,255,0.2)'}
                    strokeWidth="1.2"
                    style={{
                      filter: displayRating >= i ? `drop-shadow(0 0 6px ${displayRating >= 4 ? 'rgba(245,183,0,0.4)' : 'rgba(248,113,113,0.3)'})` : 'none',
                      transition: 'all 0.15s ease',
                    }}
                  />
                </svg>
              </button>
            ))}
          </div>

          {/* Rating label */}
          <div className="h-7 flex items-center">
            {displayRating > 0 && (
              <p className="font-display text-base font-extrabold"
                style={{ color: displayRating >= 4 ? '#F5B700' : displayRating === 3 ? '#F5B700' : '#F87171' }}>
                {STAR_LABELS[displayRating]}
              </p>
            )}
          </div>
        </div>

        {/* Context prompt */}
        {selected > 0 && (
          <div className="flex flex-col gap-3">
            <p className="font-body text-sm text-text-muted text-center leading-relaxed px-4">
              {STAR_PROMPTS[selected]}
            </p>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Optional — share what's on your mind…"
              rows={4}
              className="w-full px-4 py-3 rounded-[--radius-xl] font-body text-sm text-text placeholder:text-text-muted outline-none resize-none"
              style={{
                background: 'rgba(175,197,255,0.04)',
                border: '1px solid rgba(175,197,255,0.12)',
                lineHeight: '1.6',
              }}
            />
            <p className="font-body text-[10px] text-right" style={{ color: 'rgba(175,197,255,0.3)' }}>
              {comment.length}/280
            </p>
          </div>
        )}

        {/* Store rating note */}
        {selected >= 4 && (
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-[--radius-xl]"
            style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.15)' }}>
            <span className="text-sm shrink-0">⭐</span>
            <p className="font-body text-[10px] text-text-muted leading-relaxed">
              Your in-app rating also prompts you to rate on the App Store or Google Play — every public review helps a lot.
            </p>
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="px-5 pb-10">
        <button
          onClick={handleSubmit}
          disabled={!selected || submitting}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-40"
          style={{ background: 'var(--gradient-primary)' }}>
          {submitting ? (
            <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
              <path d="M9 2a7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : selected ? `Submit ${STAR_LABELS[selected]} rating` : 'Select a rating'}
        </button>
      </div>
    </div>
  )
}
