import { useState } from 'react'
import { type Goal, type FundingMethod, GOAL_EMOJIS, FUNDING_LABELS } from '@/data/goals'

interface EditGoalProps {
  goal?: Goal
  onSave?: (updated: Partial<Goal>) => void
  onBack?: () => void
}

const DEFAULT_GOAL: Goal = {
  id: 'g1', name: 'Emergency Fund', emoji: '🛡️',
  targetAmount: 5000, currentAmount: 2450,
  fundingMethod: 'paycheck', color: '#3FE7FF',
  targetDate: '2026-12-31', createdAt: 'Feb 2026',
}

const FUNDING_OPTIONS: { id: FundingMethod; icon: React.ReactNode }[] = [
  { id: 'manual',    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v10M3 7h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> },
  { id: 'roundup',   icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 11l3-3 2 2 4-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
  { id: 'paycheck',  icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="5" width="10" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.2" /><path d="M5 5V4a2 2 0 0 1 4 0v1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /></svg> },
  { id: 'recurring', icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 3.5A5 5 0 0 0 2 7M3 10.5A5 5 0 0 0 12 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><path d="M11 1v2.5H8.5M3 13v-2.5H5.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg> },
]

export default function EditGoal({ goal = DEFAULT_GOAL, onSave, onBack }: EditGoalProps) {
  const [name, setName] = useState(goal.name)
  const [emoji, setEmoji] = useState(goal.emoji)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [targetAmount, setTargetAmount] = useState(String(goal.targetAmount))
  const [targetDate, setTargetDate] = useState(goal.targetDate ?? '')
  const [fundingMethod, setFundingMethod] = useState<FundingMethod>(goal.fundingMethod)

  const isValid = name.trim().length > 0 && parseFloat(targetAmount) >= (goal.currentAmount)
  const belowCurrent = parseFloat(targetAmount) > 0 && parseFloat(targetAmount) < goal.currentAmount

  const handleSave = () => {
    if (!isValid) return
    onSave?.({ name: name.trim(), emoji, targetAmount: parseFloat(targetAmount), targetDate, fundingMethod })
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Edit Goal</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Name + emoji */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Goal Name</p>
          <div className="flex items-center gap-3 px-3.5 py-3 rounded-[--radius-2xl]"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.13)' }}>
            <button
              onClick={() => setShowEmojiPicker(p => !p)}
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl shrink-0"
              style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              {emoji}
            </button>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="flex-1 bg-transparent font-body text-sm text-text outline-none"
              maxLength={40}
            />
          </div>
          {showEmojiPicker && (
            <div className="mt-2 p-3 rounded-[--radius-2xl] flex flex-wrap gap-2"
              style={{ background: 'rgba(13,26,74,0.98)', border: '1px solid rgba(175,197,255,0.15)' }}>
              {GOAL_EMOJIS.map(e => (
                <button key={e} onClick={() => { setEmoji(e); setShowEmojiPicker(false) }}
                  className="text-xl w-10 h-10 flex items-center justify-center rounded-xl"
                  style={{ background: emoji === e ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.06)', border: `1px solid ${emoji === e ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.1)'}` }}>
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Target amount */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Target Amount</p>
          <div className="flex items-center gap-2 h-14 px-4 rounded-[--radius-2xl]"
            style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: `1px solid ${belowCurrent ? 'rgba(245,87,0,0.4)' : 'rgba(0,102,255,0.18)'}` }}>
            <span className="font-display text-2xl font-extrabold text-text-muted">$</span>
            <input
              type="number"
              inputMode="decimal"
              value={targetAmount}
              onChange={e => setTargetAmount(e.target.value)}
              className="flex-1 bg-transparent font-display text-2xl font-extrabold text-[#AFC5FF] outline-none"
            />
          </div>
          {belowCurrent && (
            <p className="font-body text-[11px] mt-1.5 px-1" style={{ color: '#F55700' }}>
              Target must be at least ${goal.currentAmount.toLocaleString()} (current balance)
            </p>
          )}
          <p className="font-body text-[10px] text-text-muted mt-1 px-1">
            Currently saved: ${goal.currentAmount.toLocaleString()}
          </p>
        </div>

        {/* Target date */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Target Date <span className="font-normal lowercase tracking-normal">(optional)</span>
          </p>
          <input
            type="date"
            value={targetDate}
            onChange={e => setTargetDate(e.target.value)}
            className="w-full h-12 rounded-[--radius-xl] px-4 font-body text-sm text-text outline-none"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
          />
        </div>

        {/* Funding method */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Funding Method</p>
          <div className="flex gap-2">
            {FUNDING_OPTIONS.map(opt => {
              const active = fundingMethod === opt.id
              return (
                <button key={opt.id} onClick={() => setFundingMethod(opt.id)}
                  className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-[--radius-xl] transition-all duration-[150ms]"
                  style={{ background: active ? 'rgba(0,102,255,0.12)' : 'rgba(175,197,255,0.04)', border: `1px solid ${active ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.1)'}`, color: active ? '#AFC5FF' : 'rgba(175,197,255,0.35)' }}>
                  {opt.icon}
                  <p className="font-body text-[9px] font-semibold leading-tight text-center">{FUNDING_LABELS[opt.id].split(' ')[0]}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Save / Cancel */}
        <div className="flex flex-col gap-3 mt-auto">
          <button onClick={handleSave} disabled={!isValid}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-35"
            style={{ background: 'var(--gradient-primary)' }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Save Changes
          </button>
          <button onClick={onBack}
            className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)', color: 'rgba(175,197,255,0.6)' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
