import { useState } from 'react'

type FeedbackArea = 'overall' | 'payments' | 'ai' | 'design' | 'performance' | 'security' | 'onboarding' | 'other'

const AREAS: { key: FeedbackArea; label: string; icon: React.ReactNode; color: string; bg: string }[] = [
  {
    key: 'overall', label: 'Overall app', color: '#4D9FFF', bg: 'rgba(0,102,255,0.07)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="1.5" y="1.5" width="13" height="13" rx="3" stroke="#4D9FFF" strokeWidth="1.1" /><path d="M4.5 8.5l2 2 5-5" stroke="#4D9FFF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    key: 'payments', label: 'Payments & transfers', color: '#22C55E', bg: 'rgba(34,197,94,0.06)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1.5 4h13v8H1.5V4z" stroke="#22C55E" strokeWidth="1.1" strokeLinejoin="round" /><path d="M1.5 7h13" stroke="#22C55E" strokeWidth="1.1" /></svg>,
  },
  {
    key: 'ai', label: 'Fina / Aina AI', color: '#9945FF', bg: 'rgba(153,69,255,0.06)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13z" stroke="#9945FF" strokeWidth="1.1" /><path d="M5 7h6M5 9.5h4" stroke="#9945FF" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
  {
    key: 'design', label: 'Design & usability', color: '#3FE7FF', bg: 'rgba(63,231,255,0.06)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#3FE7FF" strokeWidth="1.1" /><path d="M5 8l2 2 4-4" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    key: 'performance', label: 'Speed & performance', color: '#FF9F43', bg: 'rgba(255,159,67,0.06)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v3M2 8H5M11 8h3M8 14v-3M4.4 4.4l2.1 2.1M9.5 9.5l2.1 2.1M11.6 4.4l-2.1 2.1M6.5 9.5l-2.1 2.1" stroke="#FF9F43" strokeWidth="1.1" strokeLinecap="round" /></svg>,
  },
  {
    key: 'security', label: 'Security & privacy', color: '#F5B700', bg: 'rgba(245,183,0,0.06)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5L2 4v5c0 3.5 2.5 5.5 6 6.5 3.5-1 6-3 6-6.5V4L8 1.5z" stroke="#F5B700" strokeWidth="1.1" strokeLinejoin="round" /></svg>,
  },
  {
    key: 'onboarding', label: 'Onboarding & setup', color: '#BF8FFF', bg: 'rgba(153,69,255,0.05)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M8 4l4 4-4 4" stroke="#BF8FFF" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    key: 'other', label: 'Something else', color: 'rgba(175,197,255,0.6)', bg: 'rgba(175,197,255,0.05)',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="8" r="1.2" fill="rgba(175,197,255,0.5)" /><circle cx="8" cy="8" r="1.2" fill="rgba(175,197,255,0.5)" /><circle cx="11" cy="8" r="1.2" fill="rgba(175,197,255,0.5)" /></svg>,
  },
]

type SentimentType = 'positive' | 'neutral' | 'critical'

interface FeedbackProps {
  onBack?: () => void
  onSubmitted?: () => void
}

export default function Feedback({ onBack, onSubmitted }: FeedbackProps) {
  const [area, setArea] = useState<FeedbackArea | null>(null)
  const [rating, setRating] = useState<number | null>(null)
  const [sentiment, setSentiment] = useState<SentimentType | null>(null)
  const [comment, setComment] = useState('')
  const [includeAccount, setIncludeAccount] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const areaCfg = AREAS.find(a => a.key === area)
  const canSubmit = area !== null && rating !== null && !submitting

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setTimeout(() => onSubmitted?.(), 1500)
    }, 1200)
  }

  if (submitted) {
    return (
      <div className="flex flex-col bg-bg items-center justify-center" style={{ minHeight: 785 }}>
        <div className="flex flex-col items-center gap-4 px-8 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(34,197,94,0.1)', border: '1.5px solid rgba(34,197,94,0.25)', boxShadow: '0 0 32px rgba(34,197,94,0.1)' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 14l6 6 12-12" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="font-display text-2xl font-extrabold text-text tracking-tight">Thank you</p>
            <p className="font-body text-sm text-text-muted mt-2 leading-relaxed">
              Your feedback helps us improve ChangeAIPay for everyone.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Share Feedback</p>
          <p className="font-body text-[10px] text-text-muted">Help us make ChangeAIPay better</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Distinction from ticket */}
        <div className="flex items-start gap-3 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(0,102,255,0.04)', border: '1px solid rgba(0,102,255,0.12)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <circle cx="8" cy="8" r="6.5" stroke="#4D9FFF" strokeWidth="1" />
            <path d="M8 5.5v1M8 8v3" stroke="#4D9FFF" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            This is for general app feedback — suggestions, impressions, feature ideas. If you have a problem to report, use{' '}
            <span style={{ color: '#4D9FFF' }}>Submit a Ticket</span> instead.
          </p>
        </div>

        {/* What area */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2.5">What are you giving feedback on? <span style={{ color: '#F87171' }}>*</span></p>
          <div className="grid grid-cols-2 gap-2">
            {AREAS.map(a => (
              <button key={a.key} onClick={() => setArea(a.key)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[--radius-xl] text-left transition-all"
                style={{
                  background: area === a.key ? a.bg : 'rgba(175,197,255,0.03)',
                  border: `1px solid ${area === a.key ? `${a.color}30` : 'rgba(175,197,255,0.09)'}`,
                }}>
                <div className="w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0"
                  style={{ background: `${a.color}12` }}>
                  {a.icon}
                </div>
                <p className="font-body text-xs leading-tight"
                  style={{ color: area === a.key ? a.color : 'rgba(175,197,255,0.6)' }}>
                  {a.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2.5">
            How would you rate {area ? `the ${areaCfg?.label.toLowerCase()}` : 'this'} experience? <span style={{ color: '#F87171' }}>*</span>
          </p>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} onClick={() => setRating(n)}
                className="flex-1 h-12 flex flex-col items-center justify-center gap-1 rounded-[--radius-xl] transition-all"
                style={{
                  background: rating !== null && n <= rating ? 'rgba(245,183,0,0.09)' : 'rgba(175,197,255,0.03)',
                  border: `1px solid ${rating !== null && n <= rating ? 'rgba(245,183,0,0.22)' : 'rgba(175,197,255,0.08)'}`,
                }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2l1.8 5.4H17L12 11l2 5.4L9 13l-5 3.4 2-5.4-5-3.6h6.2L9 2z"
                    stroke={rating !== null && n <= rating ? '#F5B700' : 'rgba(175,197,255,0.2)'}
                    fill={rating !== null && n <= rating ? 'rgba(245,183,0,0.65)' : 'none'}
                    strokeWidth="1" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-[9px]"
                  style={{ color: rating !== null && n <= rating ? '#F5B700' : 'rgba(175,197,255,0.25)' }}>
                  {n}
                </p>
              </button>
            ))}
          </div>
          {rating !== null && (
            <p className="font-body text-[10px] text-center mt-2" style={{ color: 'rgba(175,197,255,0.5)' }}>
              {['Terrible', 'Poor', 'OK', 'Good', 'Excellent'][rating - 1]}
            </p>
          )}
        </div>

        {/* Sentiment quick pick */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2.5">What best describes your feedback?</p>
          <div className="flex gap-2">
            {[
              { key: 'positive' as SentimentType, label: 'Praise', icon: '✦', color: '#22C55E', bg: 'rgba(34,197,94,0.08)' },
              { key: 'neutral' as SentimentType, label: 'Suggestion', icon: '◈', color: '#4D9FFF', bg: 'rgba(0,102,255,0.08)' },
              { key: 'critical' as SentimentType, label: 'Criticism', icon: '▾', color: '#F87171', bg: 'rgba(239,68,68,0.08)' },
            ].map(s => (
              <button key={s.key} onClick={() => setSentiment(s.key)}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-[--radius-xl] transition-all font-body text-xs font-semibold"
                style={{
                  background: sentiment === s.key ? s.bg : 'rgba(175,197,255,0.03)',
                  color: sentiment === s.key ? s.color : 'rgba(175,197,255,0.4)',
                  border: `1px solid ${sentiment === s.key ? `${s.color}30` : 'rgba(175,197,255,0.09)'}`,
                }}>
                <span style={{ fontSize: 10 }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-body text-xs font-semibold text-text">Your thoughts <span className="font-normal text-text-muted">(optional)</span></p>
            <p className="font-body text-[10px] text-text-muted">{comment.length}/500</p>
          </div>
          <textarea
            className="w-full bg-transparent font-body text-sm text-text placeholder-text-muted outline-none px-4 py-3 rounded-[--radius-xl] resize-none"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: '1px solid rgba(175,197,255,0.1)',
              minHeight: 100,
            }}
            placeholder="Tell us what you love, what could be better, or what you'd like to see..."
            value={comment}
            onChange={e => setComment(e.target.value.slice(0, 500))}
          />
        </div>

        {/* Include account context */}
        <button onClick={() => setIncludeAccount(v => !v)}
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] w-full text-left"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="w-11 h-6 rounded-full relative shrink-0 transition-colors"
            style={{ background: includeAccount ? 'rgba(0,102,255,0.5)' : 'rgba(175,197,255,0.1)', border: `1px solid ${includeAccount ? 'rgba(0,102,255,0.6)' : 'rgba(175,197,255,0.15)'}` }}>
            <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all duration-200"
              style={{ left: includeAccount ? 'calc(100% - 22px)' : '2px', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body text-xs font-semibold text-text">Include account context</p>
            <p className="font-body text-[10px] text-text-muted">Attach your plan tier and usage data to help our team understand your experience</p>
          </div>
        </button>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: canSubmit ? 'linear-gradient(135deg, #0066FF, #4D9FFF)' : 'rgba(175,197,255,0.08)',
            color: canSubmit ? 'white' : 'rgba(175,197,255,0.3)',
            boxShadow: canSubmit ? '0 4px 16px rgba(0,102,255,0.25)' : 'none',
          }}>
          {submitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : 'Submit feedback'}
        </button>

        <p className="font-body text-[10px] text-center text-text-muted">
          Feedback is anonymous unless you choose to include account context. We read every submission.
        </p>
      </div>
    </div>
  )
}
