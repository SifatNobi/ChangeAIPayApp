import { useState } from 'react'
import { GOALS, GOAL_EMOJIS, type FundingMethod } from '@/data/goals'

interface PlannerMessage {
  id: string
  role: 'fina' | 'user'
  text: string
  suggestion?: PlannerSuggestion
}

interface PlannerSuggestion {
  type: 'optimize' | 'create'
  headline: string
  bullets: string[]
  ctaLabel: string
  goalId?: string
  prefill?: {
    name: string
    emoji: string
    targetAmount: number
    targetDate: string
    fundingMethod: FundingMethod
    monthlyNeeded: number
  }
}

const INITIAL_MESSAGES: PlannerMessage[] = [
]

const QUICK_PROMPTS = [
  "Create a new goal",
  "What can I cut to save faster?",
  "Which goal should I focus on?",
  "Suggest a realistic timeline",
]

interface GoalPlannerProps {
  onCreateGoal?: (prefill?: PlannerSuggestion['prefill']) => void
  onEditGoal?: (goalId: string, prefill?: PlannerSuggestion['prefill']) => void
  onBack?: () => void
}

export default function GoalPlanner({ onCreateGoal, onEditGoal, onBack }: GoalPlannerProps) {
  const [messages, setMessages] = useState<PlannerMessage[]>([])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  const totalSaved   = GOALS.reduce((s, g) => s + g.currentAmount, 0)
  const totalTargets = GOALS.reduce((s, g) => s + g.targetAmount, 0)
  const overallPct   = Math.round((totalSaved / totalTargets) * 100)

  const sendMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages(prev => [...prev, { id: `u${Date.now()}`, role: 'user', text: trimmed }])
    setInput('')
    setThinking(true)
    setTimeout(() => {
      setThinking(false)
      const reply: PlannerMessage = {
        id: `f${Date.now()}`,
        role: 'fina',
        text: trimmed.toLowerCase().includes('new') || trimmed.toLowerCase().includes('create')
          ? "Great idea! Let's set up a new goal. I'll need a few details — you can fill them in, or let me suggest based on your spending."
          : "Based on your current pace, I'd suggest increasing your paycheck split by 7%. That closes the gap without touching your existing goals.",
        ...(trimmed.toLowerCase().includes('new') ? {
          suggestion: {
            type: 'create' as const,
            headline: 'Start a new goal with Fina',
            bullets: [
              'I can suggest an achievable target amount based on your income',
              'Round-Up or Paycheck Split recommended as your funding method',
              "I'll pre-fill the form with smart defaults",
            ],
            ctaLabel: 'Start Creating',
            prefill: {
              name: 'New Goal',
              emoji: '💰',
              targetAmount: 1000,
              targetDate: '2027-06-01',
              fundingMethod: 'roundup' as FundingMethod,
              monthlyNeeded: 84,
            },
          },
        } : {}),
      }
      setMessages(prev => [...prev, reply])
    }, 2000)
  }

  const handleSuggestionCTA = (s: PlannerSuggestion) => {
    if (s.type === 'create') {
      onCreateGoal?.(s.prefill)
    } else if (s.goalId) {
      onEditGoal?.(s.goalId, s.prefill)
    }
  }

  return (
    <div className="flex flex-col bg-bg" style={{ height: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0"
        style={{ borderBottom: '1px solid rgba(175,197,255,0.08)' }}>
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 12px rgba(63,231,255,0.4)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="4.5" r="2" fill="white" />
            <path d="M2 12c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="white" strokeWidth="1.1" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="font-display text-sm font-extrabold text-text">Goal Planner</p>
          <p className="font-body text-[10px] text-text-muted">Fina · {overallPct}% toward total targets</p>
        </div>
      </div>

      {/* Goals summary strip */}
      <div className="px-5 py-3 shrink-0">
        <div className="flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {GOALS.map(g => {
            const pct = Math.round((g.currentAmount / g.targetAmount) * 100)
            return (
              <div key={g.id} className="shrink-0 flex items-center gap-2 px-3 py-2 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.04)', border: `1px solid ${g.color}25` }}>
                <span className="text-sm">{g.emoji}</span>
                <div>
                  <p className="font-body text-[10px] font-semibold text-text leading-none">{g.name}</p>
                  <p className="font-body text-[9px] mt-0.5" style={{ color: g.color }}>{pct}%</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-3" style={{ scrollbarWidth: 'none' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex flex-col gap-1.5 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            {msg.role === 'fina' && (
              <div className="flex items-center gap-1.5 mb-0.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'var(--gradient-primary)' }}>
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="2.5" r="1.2" fill="white" />
                    <path d="M1 6.5C1 5 2.3 4 4 4s3 1 3 2.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" />
                  </svg>
                </div>
                <p className="font-body text-[10px] font-semibold" style={{ color: '#3FE7FF' }}>Fina</p>
              </div>
            )}
            <div className="max-w-[84%] px-4 py-3"
              style={{
                borderRadius: msg.role === 'fina' ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
                background: msg.role === 'fina' ? 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))' : 'var(--gradient-primary)',
                border: msg.role === 'fina' ? '1px solid rgba(0,102,255,0.25)' : 'none',
                boxShadow: msg.role === 'user' ? '0 4px 16px rgba(0,102,255,0.3)' : 'none',
              }}>
              <p className="font-body text-sm text-white leading-relaxed">{msg.text}</p>
            </div>

            {/* Suggestion card */}
            {msg.suggestion && (
              <div className="max-w-[90%] mt-1 rounded-[--radius-2xl] overflow-hidden"
                style={{ background: 'rgba(0,102,255,0.07)', border: '1px solid rgba(0,102,255,0.25)' }}>
                <div className="px-4 pt-3.5 pb-2">
                  <p className="font-display text-sm font-extrabold text-text mb-2">{msg.suggestion.headline}</p>
                  <ul className="flex flex-col gap-1.5">
                    {msg.suggestion.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: 'rgba(63,231,255,0.15)' }}>
                          <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                            <path d="M1.5 3.5l2 2 2.5-2.5" stroke="#3FE7FF" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="font-body text-[11px] text-text-muted leading-relaxed">{b}</p>
                      </li>
                    ))}
                  </ul>
                  {msg.suggestion.prefill && (
                    <div className="mt-2.5 flex items-center gap-2 px-3 py-2 rounded-[--radius-xl]"
                      style={{ background: 'rgba(63,231,255,0.07)', border: '1px solid rgba(63,231,255,0.15)' }}>
                      <p className="font-body text-[10px] text-text-muted flex-1">
                        Suggested: <span className="text-text font-semibold">{msg.suggestion.prefill.name}</span> by <span className="text-text font-semibold">{new Date(msg.suggestion.prefill.targetDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        <span style={{ color: '#3FE7FF' }}> · ${msg.suggestion.prefill.monthlyNeeded}/mo</span>
                      </p>
                    </div>
                  )}
                </div>
                <div className="px-4 pb-3.5">
                  <button onClick={() => handleSuggestionCTA(msg.suggestion!)}
                    className="w-full h-10 rounded-[--radius-xl] font-body text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.97]"
                    style={{ background: 'var(--gradient-primary)' }}>
                    {msg.suggestion.ctaLabel}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M4.5 3l3 3-3 3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {thinking && (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'var(--gradient-primary)' }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <circle cx="4" cy="2.5" r="1.2" fill="white" />
                <path d="M1 6.5C1 5 2.3 4 4 4s3 1 3 2.5" stroke="white" strokeWidth="0.8" strokeLinecap="round" fill="none" />
              </svg>
            </div>
            <div className="flex gap-1 px-3 py-2.5 rounded-[4px_14px_14px_14px]"
              style={{ background: 'rgba(0,30,80,0.9)', border: '1px solid rgba(0,102,255,0.2)' }}>
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-accent"
                  style={{ animation: `dots-typing 1.2s ease-in-out ${i * 0.18}s infinite` }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      <div className="px-4 pb-2 shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          {QUICK_PROMPTS.map(p => (
            <button key={p} onClick={() => sendMessage(p)}
              className="shrink-0 h-8 px-3 rounded-full font-body text-xs font-semibold whitespace-nowrap transition-all hover:border-[rgba(0,102,255,0.4)]"
              style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.14)', color: 'rgba(175,197,255,0.65)' }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-5 shrink-0">
        <div className="flex items-center gap-2 px-3 py-2 rounded-[--radius-2xl]"
          style={{ background: 'rgba(13,26,74,0.9)', border: '1px solid rgba(0,102,255,0.25)', backdropFilter: 'blur(20px)' }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') sendMessage(input) }}
            placeholder="Ask Fina about your goals…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none py-1"
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || thinking}
            className="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 transition-all disabled:opacity-30"
            style={{ background: input.trim() ? 'var(--gradient-primary)' : 'rgba(175,197,255,0.08)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1.5 7l5-5 5 5M6.5 2v10" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
