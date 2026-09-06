import { useState } from 'react'
import { type Goal, GOALS } from '@/data/goals'

interface DeleteGoalProps {
  goal?: Goal
  otherGoals?: Goal[]
  onConfirm?: (disposition: 'balance' | 'goal', targetGoalId?: string) => void
  onCancel?: () => void
}

const DEFAULT_GOAL: Goal = {
  id: 'g3', name: 'New MacBook', emoji: '💻',
  targetAmount: 1800, currentAmount: 1200,
  fundingMethod: 'recurring', color: '#9945FF',
  targetDate: '2026-10-01', createdAt: 'Jun 2026',
}

export default function DeleteGoal({ goal = DEFAULT_GOAL, otherGoals, onConfirm, onCancel }: DeleteGoalProps) {
  const others = otherGoals ?? GOALS.filter(g => g.id !== goal.id)
  const [disposition, setDisposition] = useState<'balance' | 'goal'>('balance')
  const [targetGoalId, setTargetGoalId] = useState<string>(others[0]?.id ?? '')
  const [spinning, setSpinning] = useState(false)

  const hasFunds = goal.currentAmount > 0

  const handleConfirm = () => {
    if (spinning) return
    setSpinning(true)
    setTimeout(() => {
      onConfirm?.(disposition, disposition === 'goal' ? targetGoalId : undefined)
      setSpinning(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onCancel} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Delete Goal</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Goal card summary */}
        <div className="rounded-[--radius-2xl] px-4 py-4 flex items-center gap-4"
          style={{ background: 'rgba(175,197,255,0.03)', border: `1px solid ${goal.color}30` }}>
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl"
            style={{ background: `${goal.color}12`, border: `1px solid ${goal.color}30` }}>
            {goal.emoji}
          </div>
          <div className="flex-1">
            <p className="font-body text-sm font-semibold text-text">{goal.name}</p>
            <p className="font-body text-xs text-text-muted">${goal.currentAmount.toLocaleString()} saved · ${goal.targetAmount.toLocaleString()} target</p>
          </div>
          <p className="font-display text-lg font-extrabold" style={{ color: goal.color }}>
            {Math.round((goal.currentAmount / goal.targetAmount) * 100)}%
          </p>
        </div>

        {/* Warning */}
        <div className="rounded-[--radius-xl] px-4 py-3.5 flex items-start gap-3"
          style={{ background: 'rgba(245,87,0,0.06)', border: '1px solid rgba(245,87,0,0.25)' }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-0.5 shrink-0">
            <path d="M8 2L1.5 13h13L8 2Z" stroke="#F55700" strokeWidth="1.2" strokeLinejoin="round" />
            <path d="M8 6v3.5" stroke="#F55700" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="8" cy="11.5" r="0.6" fill="#F55700" />
          </svg>
          <p className="font-body text-xs text-text-2 leading-relaxed">
            Deleting this goal is permanent and cannot be undone. Any active automatic contributions will be stopped immediately.
          </p>
        </div>

        {/* Funds disposition — only shown if there are funds */}
        {hasFunds && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
              What should we do with your ${goal.currentAmount.toLocaleString()}?
            </p>
            <div className="flex flex-col gap-2">
              {/* Back to balance */}
              <button onClick={() => setDisposition('balance')}
                className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all duration-[150ms]"
                style={{ background: disposition === 'balance' ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)', border: `1px solid ${disposition === 'balance' ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: disposition === 'balance' ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.06)', border: `1px solid ${disposition === 'balance' ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}` }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1.5" y="4.5" width="13" height="9" rx="2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                    <path d="M4 4.5V3a1.5 1.5 0 0 1 3 0v1.5M9 4.5V3a1.5 1.5 0 0 1 3 0v1.5M1.5 8.5h13" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">Return to main balance</p>
                  <p className="font-body text-[10px] text-text-muted">Available instantly in your ChangeAIPay wallet</p>
                </div>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: disposition === 'balance' ? '#0066FF' : 'rgba(175,197,255,0.3)' }}>
                  {disposition === 'balance' && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                </div>
              </button>

              {/* Move to another goal */}
              {others.length > 0 && (
                <button onClick={() => setDisposition('goal')}
                  className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all duration-[150ms]"
                  style={{ background: disposition === 'goal' ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)', border: `1px solid ${disposition === 'goal' ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: disposition === 'goal' ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.06)', border: `1px solid ${disposition === 'goal' ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}` }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="5.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                      <circle cx="8" cy="8" r="2.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" />
                      <circle cx="8" cy="8" r="0.75" fill="rgba(175,197,255,0.6)" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold text-text">Move to another goal</p>
                    <p className="font-body text-[10px] text-text-muted">Keep the momentum going</p>
                  </div>
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{ borderColor: disposition === 'goal' ? '#0066FF' : 'rgba(175,197,255,0.3)' }}>
                    {disposition === 'goal' && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                  </div>
                </button>
              )}
            </div>

            {/* Goal selector when "move to goal" chosen */}
            {disposition === 'goal' && others.length > 0 && (
              <div className="mt-3 rounded-[--radius-xl] overflow-hidden"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}>
                {others.map((g, i) => (
                  <button key={g.id} onClick={() => setTargetGoalId(g.id)}
                    className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all duration-[120ms]"
                    style={{ background: targetGoalId === g.id ? 'rgba(0,102,255,0.08)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                    <span className="text-lg">{g.emoji}</span>
                    <div className="flex-1">
                      <p className="font-body text-sm font-semibold text-text">{g.name}</p>
                      <p className="font-body text-[10px] text-text-muted">${g.currentAmount.toLocaleString()} saved</p>
                    </div>
                    <div className="w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                      style={{ borderColor: targetGoalId === g.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}>
                      {targetGoalId === g.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3 mt-auto">
          <button onClick={handleConfirm} disabled={spinning}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            style={{ background: 'linear-gradient(135deg, #C00020, #7A0010)' }}>
            {spinning ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
                <path d="M9 2a7 7 0 0 1 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 4h10M5 4V2.5A.5.5 0 0 1 5.5 2h3a.5.5 0 0 1 .5.5V4M4.5 4l.5 7.5h4l.5-7.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete Goal
              </>
            )}
          </button>
          <button onClick={onCancel}
            className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)', color: 'rgba(175,197,255,0.6)' }}>
            Keep Goal
          </button>
        </div>
      </div>
    </div>
  )
}
