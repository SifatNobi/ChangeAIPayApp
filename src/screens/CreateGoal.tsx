import { useState } from 'react'
import { GOAL_EMOJIS, type FundingMethod, FUNDING_LABELS } from '@/data/goals'

interface CreateGoalProps {
  onSave?: (data: NewGoalData) => void
  onBack?: () => void
}

export interface NewGoalData {
  name: string
  emoji: string
  targetAmount: number
  targetDate: string
  fundingMethod: FundingMethod
  recurringAmount?: number
}

const FUNDING_OPTIONS: { id: FundingMethod; label: string; sub: string; icon: React.ReactNode }[] = [
  {
    id: 'manual',
    label: 'Manual',
    sub: "Add funds whenever you'd like",
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v12M4 8h8" stroke="rgba(175,197,255,0.6)" strokeWidth="1.4" strokeLinecap="round" /></svg>,
  },
  {
    id: 'roundup',
    label: 'Round-Up',
    sub: 'Spare change from every transaction',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 13l4-4 3 3 5-6" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
  {
    id: 'paycheck',
    label: 'Paycheck Split',
    sub: 'Auto-allocate from direct deposits',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="8" rx="1.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" /><path d="M6 5V4a2 2 0 0 1 4 0v1" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" /></svg>,
  },
  {
    id: 'recurring',
    label: 'Recurring',
    sub: 'Fixed amount on a schedule',
    icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13 4A6 6 0 0 0 2 7.5M3 12a6 6 0 0 0 11-3.5" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" /><path d="M13 1v3h-3M3 15v-3h3" stroke="rgba(175,197,255,0.6)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
]

export default function CreateGoal({ onSave, onBack }: CreateGoalProps) {
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState('🏠')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [targetAmount, setTargetAmount] = useState('')
  const [targetDate, setTargetDate] = useState('')
  const [fundingMethod, setFundingMethod] = useState<FundingMethod>('manual')
  const [recurringAmount, setRecurringAmount] = useState('')

  const isValid = name.trim().length > 0 && parseFloat(targetAmount) > 0

  const handleSave = () => {
    if (!isValid) return
    onSave?.({
      name: name.trim(),
      emoji,
      targetAmount: parseFloat(targetAmount),
      targetDate,
      fundingMethod,
      recurringAmount: recurringAmount ? parseFloat(recurringAmount) : undefined,
    })
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
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Create Goal</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Name + emoji */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Goal Name</p>
          <div
            className="flex items-center gap-3 px-3.5 py-3 rounded-[--radius-2xl]"
            style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.13)' }}
          >
            {/* Emoji button */}
            <button
              onClick={() => setShowEmojiPicker(p => !p)}
              className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl flex-shrink-0 transition-all"
              style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              {emoji}
            </button>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="e.g. Emergency Fund"
              className="flex-1 bg-transparent font-body text-sm text-text placeholder:text-text-muted outline-none"
              maxLength={40}
            />
          </div>

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div
              className="mt-2 p-3 rounded-[--radius-2xl] flex flex-wrap gap-2"
              style={{ background: 'rgba(13,26,74,0.98)', border: '1px solid rgba(175,197,255,0.15)' }}
            >
              {GOAL_EMOJIS.map(e => (
                <button
                  key={e}
                  onClick={() => { setEmoji(e); setShowEmojiPicker(false) }}
                  className="text-xl w-10 h-10 flex items-center justify-center rounded-xl transition-all"
                  style={{
                    background: emoji === e ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.06)',
                    border: `1px solid ${emoji === e ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.1)'}`,
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Target amount */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Target Amount</p>
          <div
            className="flex items-center gap-2 h-14 px-4 rounded-[--radius-2xl]"
            style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.18)' }}
          >
            <span className="font-display text-2xl font-extrabold text-text-muted">$</span>
            <input
              type="number"
              inputMode="decimal"
              value={targetAmount}
              onChange={e => setTargetAmount(e.target.value)}
              placeholder="0"
              className="flex-1 bg-transparent font-display text-2xl font-extrabold text-[#AFC5FF] outline-none placeholder:text-text-muted"
            />
          </div>
        </div>

        {/* Target date (optional) */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Target Date <span className="font-normal lowercase text-text-muted tracking-normal">(optional)</span>
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
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">How to Fund It</p>
          <div className="flex flex-col gap-2">
            {FUNDING_OPTIONS.map(opt => (
              <button
                key={opt.id}
                onClick={() => setFundingMethod(opt.id)}
                className="flex items-center gap-3 h-14 px-4 rounded-[--radius-xl] text-left transition-all duration-[180ms]"
                style={{
                  background: fundingMethod === opt.id ? 'rgba(0,102,255,0.1)' : 'rgba(175,197,255,0.04)',
                  border: `1px solid ${fundingMethod === opt.id ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: fundingMethod === opt.id ? 'rgba(0,102,255,0.15)' : 'rgba(175,197,255,0.06)',
                    border: `1px solid ${fundingMethod === opt.id ? 'rgba(0,102,255,0.3)' : 'rgba(175,197,255,0.1)'}`,
                  }}
                >
                  {opt.icon}
                </div>
                <div className="flex-1">
                  <p className="font-body text-sm font-semibold text-text">{opt.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{opt.sub}</p>
                </div>
                <div
                  className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: fundingMethod === opt.id ? '#0066FF' : 'rgba(175,197,255,0.3)' }}
                >
                  {fundingMethod === opt.id && <div className="w-2 h-2 rounded-full bg-[#0066FF]" />}
                </div>
              </button>
            ))}
          </div>

          {/* Recurring amount input */}
          {fundingMethod === 'recurring' && (
            <div
              className="flex items-center gap-2 h-12 px-4 rounded-[--radius-xl] mt-3"
              style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <span className="font-body text-sm text-text-muted">Weekly amount</span>
              <span className="font-body text-sm text-text-muted ml-auto">$</span>
              <input
                type="number"
                inputMode="decimal"
                value={recurringAmount}
                onChange={e => setRecurringAmount(e.target.value)}
                placeholder="0"
                className="w-20 bg-transparent font-body text-sm font-semibold text-[#AFC5FF] text-right outline-none placeholder:text-text-muted"
              />
            </div>
          )}
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          disabled={!isValid}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-35"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7l4 4 6-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Create Goal
        </button>
      </div>
    </div>
  )
}
