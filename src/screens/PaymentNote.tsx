import { useState, useRef, useEffect } from 'react'

interface PaymentNoteProps {
  initialNote?: string
  recipientName?: string
  originScreen?: 'amount' | 'split'
  onSave?: (note: string) => void
  onBack?: () => void
}

const MAX_CHARS = 140

const EMOJI_ROWS = [
  ['🎉','❤️','🙏','👏','😊','🔥','💸','✅'],
  ['😂','🥳','💪','🤝','⚡','🌍','🍕','☕'],
  ['👍','💯','🎁','🏆','🌟','🚀','💎','🔑'],
]

export default function PaymentNote({
  initialNote = '',
  recipientName = 'Alex Johnson',
  originScreen = 'amount',
  onSave,
  onBack,
}: PaymentNoteProps) {
  const [note, setNote] = useState(initialNote)
  const [showEmoji, setShowEmoji] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const insertEmoji = (emoji: string) => {
    if (note.length >= MAX_CHARS) return
    const el = textareaRef.current
    if (!el) { setNote(n => (n + emoji).slice(0, MAX_CHARS)); return }
    const start = el.selectionStart ?? note.length
    const end = el.selectionEnd ?? note.length
    const next = (note.slice(0, start) + emoji + note.slice(end)).slice(0, MAX_CHARS)
    setNote(next)
    requestAnimationFrame(() => {
      el.focus()
      const pos = start + emoji.length
      el.setSelectionRange(pos, pos)
    })
  }

  const charsLeft = MAX_CHARS - note.length
  const pctFull = note.length / MAX_CHARS

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-4">
        <button
          onClick={onBack}
          className="h-11 px-3 flex items-center font-body text-sm font-semibold text-text-muted transition-colors hover:text-text"
        >
          Cancel
        </button>
        <p className="font-body text-sm font-semibold text-text">Add a note</p>
        <button
          onClick={() => onSave?.(note)}
          className="h-11 px-3 flex items-center font-body text-sm font-semibold transition-colors"
          style={{ color: note.trim() ? '#3FE7FF' : 'rgba(175,197,255,0.3)' }}
          disabled={!note.trim()}
        >
          Save
        </button>
      </div>

      {/* Recipient context */}
      <div className="mx-5 mb-4 flex items-center gap-2 px-3 py-2.5 rounded-[--radius-xl]"
        style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="4.5" r="2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" />
          <path d="M1.5 11c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
        </svg>
        <p className="font-body text-xs text-text-muted">
          Note for <span className="font-semibold text-text-2">{recipientName}</span>
          {originScreen === 'split' && <span className="text-text-muted"> · split payment</span>}
        </p>
      </div>

      {/* Text area */}
      <div className="mx-5 flex-1 relative">
        <textarea
          ref={textareaRef}
          value={note}
          onChange={e => setNote(e.target.value.slice(0, MAX_CHARS))}
          placeholder="What's this payment for?"
          className="w-full h-48 px-4 pt-4 pb-4 rounded-[--radius-2xl] bg-transparent font-body text-lg text-text placeholder-text-muted outline-none resize-none leading-relaxed"
          style={{ border: '1px solid rgba(175,197,255,0.15)' }}
        />

        {/* Character meter — circular arc */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="11" stroke="rgba(175,197,255,0.1)" strokeWidth="2.5" fill="none" />
            <circle
              cx="14" cy="14" r="11"
              stroke={charsLeft < 20 ? (charsLeft < 5 ? '#FF4D5A' : '#F5B700') : '#3FE7FF'}
              strokeWidth="2.5" fill="none"
              strokeDasharray={69.1}
              strokeDashoffset={69.1 * (1 - pctFull)}
              strokeLinecap="round"
              transform="rotate(-90 14 14)"
              style={{ transition: 'stroke-dashoffset 0.2s, stroke 0.3s' }}
            />
          </svg>
          {charsLeft <= 20 && (
            <span className={`font-mono text-xs ${charsLeft < 5 ? 'text-error' : 'text-warning'}`}>{charsLeft}</span>
          )}
        </div>
      </div>

      {/* Emoji bar */}
      <div className="mx-5 mt-4">
        <button
          onClick={() => setShowEmoji(s => !s)}
          className="flex items-center gap-2 h-9 px-3 rounded-full font-body text-xs font-semibold transition-all duration-[200ms] mb-3"
          style={{
            background: showEmoji ? 'rgba(63,231,255,0.1)' : 'rgba(175,197,255,0.05)',
            border: `1px solid ${showEmoji ? 'rgba(63,231,255,0.25)' : 'rgba(175,197,255,0.12)'}`,
            color: showEmoji ? '#3FE7FF' : 'rgba(175,197,255,0.5)',
          }}
        >
          <span className="text-base">😊</span>
          Quick emoji
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
            style={{ transform: showEmoji ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
          >
            <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </button>

        {showEmoji && (
          <div
            className="rounded-[--radius-2xl] p-3 flex flex-col gap-2 animate-fade-in mb-4"
            style={{ background: 'rgba(13,26,74,0.98)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            {EMOJI_ROWS.map((row, ri) => (
              <div key={ri} className="flex items-center justify-between">
                {row.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => insertEmoji(emoji)}
                    disabled={note.length >= MAX_CHARS}
                    className="w-10 h-10 flex items-center justify-center text-xl rounded-[--radius-lg] transition-all duration-[120ms] active:scale-[0.82] hover:bg-surface-hi disabled:opacity-30"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mx-5 mb-4">
        <p className="font-body text-xs text-text-muted leading-relaxed">
          The note is shared with the recipient. Keep it clear — "Rent May", "Dinner Thursday", "Splitting the bill".
        </p>
      </div>

      {/* Save CTA */}
      <div className="px-5 pb-8">
        <button
          onClick={() => onSave?.(note)}
          disabled={!note.trim()}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--gradient-primary)' }}
        >
          Save Note
        </button>
      </div>
    </div>
  )
}
