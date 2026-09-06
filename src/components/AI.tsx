import { type ReactNode } from 'react'
import { GlassCard } from './Card'
import { PulseDots } from './Pulse'
import finaSrc from '@/imports/Fina.png.jpeg'
import ainaSrc from '@/imports/Aina.png.jpeg'

type AIPersona = 'fina' | 'aina'

/* ── AI avatar ────────────────────────────────────────────────── */
export function AIAvatar({
  persona,
  size = 40,
  thinking = false,
}: {
  persona: AIPersona
  size?: number
  thinking?: boolean
}) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <img
        src={persona === 'fina' ? finaSrc : ainaSrc}
        alt={persona === 'fina' ? 'Fina, your personal finance AI' : 'Aina, your business finance AI'}
        className="w-full h-full object-cover rounded-full"
      />
      {thinking && (
        <div className="absolute -bottom-1 -right-1 bg-surface rounded-full px-1 py-0.5 border border-[color:var(--color-border)]">
          <PulseDots />
        </div>
      )}
    </div>
  )
}

/* ── Chat bubble ──────────────────────────────────────────────── */
interface BubbleProps {
  persona: AIPersona
  message: string
  isUser?: boolean
  timestamp?: string
}

export function ChatBubble({ persona, message, isUser = false, timestamp }: BubbleProps) {
  if (isUser) {
    return (
      <div className="flex justify-end gap-3 animate-float-up">
        <div className="max-w-[80%]">
          <div
            className="px-4 py-3 rounded-[--radius-xl] rounded-br-[--radius-sm] text-sm font-body text-white"
            style={{ background: 'var(--gradient-primary)' }}
          >
            {message}
          </div>
          {timestamp && (
            <p className="font-mono text-[10px] text-text-muted text-right mt-1">{timestamp}</p>
          )}
        </div>
      </div>
    )
  }

  /* Fina: rounded 16px bubbles — warm, approachable
     Aina: sharp bottom-left corner — professional, executive */
  const bubbleRadius =
    persona === 'fina'
      ? 'rounded-[--radius-xl] rounded-tl-[--radius-sm]'
      : 'rounded-[--radius-lg] rounded-bl-[2px]'

  return (
    <div className="flex items-start gap-3 animate-float-up">
      <AIAvatar persona={persona} size={32} />
      <div className="max-w-[80%]">
        <div
          className={`px-4 py-3 bg-surface border border-[color:var(--color-border)] text-sm font-body text-text-2 ${bubbleRadius}`}
        >
          {message}
        </div>
        {timestamp && (
          <p className="font-mono text-[10px] text-text-muted mt-1">{timestamp}</p>
        )}
      </div>
    </div>
  )
}

/* ── Typing / thinking indicator ─────────────────────────────── */
export function ThinkingIndicator({ persona }: { persona: AIPersona }) {
  return (
    <div className="flex items-center gap-3 animate-float-up">
      <AIAvatar persona={persona} size={32} thinking />
      <div className="px-4 py-3 bg-surface border border-[color:var(--color-border)] rounded-[--radius-xl] rounded-tl-[--radius-sm]">
        <PulseDots />
      </div>
    </div>
  )
}

/* ── AI Card — glass elevated surface ────────────────────────── */
interface AICardProps {
  persona: AIPersona
  greeting: string
  insight: string
  quickPrompts?: string[]
  onPrompt?: (prompt: string) => void
}

export function AICard({
  persona,
  greeting,
  insight,
  quickPrompts = [],
  onPrompt,
}: AICardProps) {
  const accentColor = persona === 'fina' ? '#3FE7FF' : '#0066FF'
  const name = persona === 'fina' ? 'Fina' : 'Aina'

  return (
    <GlassCard className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <AIAvatar persona={persona} size={44} />
        <div>
          <p className="font-body text-xs text-text-muted uppercase tracking-widest">{name}</p>
          <p className="font-body text-sm font-semibold text-text">{greeting}</p>
        </div>
      </div>

      <p className="font-body text-sm text-text-2 leading-relaxed">{insight}</p>

      {quickPrompts.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {quickPrompts.map(p => (
            <button
              key={p}
              onClick={() => onPrompt?.(p)}
              className="px-3 h-7 rounded-full border border-[color:var(--color-border)] font-body text-xs text-text-2 hover:text-text hover:border-accent/40 transition-all duration-[250ms]"
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </GlassCard>
  )
}

/* ── AI Insight card ─────────────────────────────────────────── */
interface InsightCardProps {
  persona: AIPersona
  title: string
  body: string
  action?: string
  onAction?: () => void
}

export function InsightCard({ persona, title, body, action, onAction }: InsightCardProps) {
  return (
    <div
      className="rounded-[--radius-xl] border p-4 flex flex-col gap-2"
      style={{
        borderColor: persona === 'fina' ? 'rgba(63,231,255,0.2)' : 'rgba(0,102,255,0.25)',
        background: persona === 'fina' ? 'rgba(63,231,255,0.04)' : 'rgba(0,102,255,0.06)',
      }}
    >
      <div className="flex items-center gap-2">
        <AIAvatar persona={persona} size={20} />
        <p className="font-body text-xs font-semibold text-text">{title}</p>
      </div>
      <p className="font-body text-xs text-text-2 leading-relaxed">{body}</p>
      {action && (
        <button
          onClick={onAction}
          className="self-start font-body text-xs font-semibold text-accent hover:underline underline-offset-2 mt-1"
        >
          {action} →
        </button>
      )}
    </div>
  )
}

/* ── Voice card ──────────────────────────────────────────────── */
export function VoiceCard({
  persona,
  listening = false,
  onToggle,
}: {
  persona: AIPersona
  listening?: boolean
  onToggle?: () => void
}) {
  return (
    <div className="flex flex-col items-center gap-5">
      <button
        onClick={onToggle}
        className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-[300ms]
          ${listening
            ? 'shadow-[0_0_0_8px_rgba(63,231,255,0.12),0_0_0_16px_rgba(63,231,255,0.05)]'
            : ''
          }`}
        style={{ background: 'var(--gradient-primary)' }}
        aria-label={listening ? 'Stop listening' : 'Start voice input'}
      >
        <AIAvatar persona={persona} size={64} />
      </button>
      <p className="font-body text-sm text-text-2">
        {listening ? 'Listening…' : `Tap to talk to ${persona === 'fina' ? 'Fina' : 'Aina'}`}
      </p>
      {listening && <PulseDots />}
    </div>
  )
}
