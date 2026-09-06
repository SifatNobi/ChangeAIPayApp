import { useState } from 'react'

type TicketCategory = 'payments' | 'account' | 'security' | 'kyc' | 'plans' | 'crypto' | 'technical' | 'other'
type TicketPriority = 'low' | 'normal' | 'high' | 'urgent'

const CATEGORIES: { key: TicketCategory; label: string; color: string }[] = [
  { key: 'payments', label: 'Payments & Transfers', color: '#4D9FFF' },
  { key: 'account', label: 'Account & Profile', color: '#3FE7FF' },
  { key: 'security', label: 'Security Issue', color: '#F5B700' },
  { key: 'kyc', label: 'Verification / KYC', color: '#22C55E' },
  { key: 'plans', label: 'Plans & Billing', color: '#9945FF' },
  { key: 'crypto', label: 'Crypto', color: '#FF9F43' },
  { key: 'technical', label: 'Technical / App Bug', color: '#BF8FFF' },
  { key: 'other', label: 'Other', color: 'rgba(175,197,255,0.7)' },
]

const PRIORITIES: { key: TicketPriority; label: string; sub: string; color: string; bg: string }[] = [
  { key: 'low', label: 'Low', sub: 'General question', color: 'rgba(175,197,255,0.6)', bg: 'rgba(175,197,255,0.06)' },
  { key: 'normal', label: 'Normal', sub: 'Something not working', color: '#4D9FFF', bg: 'rgba(0,102,255,0.08)' },
  { key: 'high', label: 'High', sub: 'Affecting payments', color: '#FF9F43', bg: 'rgba(255,159,67,0.08)' },
  { key: 'urgent', label: 'Urgent', sub: 'Account or money at risk', color: '#F87171', bg: 'rgba(239,68,68,0.08)' },
]

interface SubmitTicketProps {
  onBack?: () => void
  onSubmitted?: (ticketId: string) => void
}

export default function SubmitTicket({ onBack, onSubmitted }: SubmitTicketProps) {
  const [category, setCategory] = useState<TicketCategory | null>(null)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<TicketPriority>('normal')
  const [attachments, setAttachments] = useState<string[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [showCategoryPicker, setShowCategoryPicker] = useState(false)

  const canSubmit = category && subject.trim().length >= 4 && description.trim().length >= 10 && !submitting

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitting(true)
    setTimeout(() => {
      const id = 'TKT-' + Math.floor(100000 + Math.random() * 900000)
      onSubmitted?.(id)
    }, 1800)
  }

  const addFakeAttachment = () => {
    if (attachments.length >= 3) return
    const names = ['screenshot_1.png', 'receipt.pdf', 'error_log.txt', 'bank_statement.pdf']
    setAttachments(prev => [...prev, names[prev.length % names.length]])
  }

  const catCfg = CATEGORIES.find(c => c.key === category)

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
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Submit a Ticket</p>
          <p className="font-body text-[10px] text-text-muted">First response within 24 hours</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Category */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2">Category <span style={{ color: '#F87171' }}>*</span></p>
          <button
            onClick={() => setShowCategoryPicker(v => !v)}
            className="w-full h-11 flex items-center gap-3 px-4 rounded-[--radius-xl] text-left transition-all"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: `1px solid ${category ? `${catCfg?.color}35` : 'rgba(175,197,255,0.12)'}`,
            }}>
            {category ? (
              <>
                <div className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: catCfg?.color, boxShadow: `0 0 5px ${catCfg?.color}80` }} />
                <p className="flex-1 font-body text-sm text-text">{catCfg?.label}</p>
              </>
            ) : (
              <p className="flex-1 font-body text-sm text-text-muted">Select a category</p>
            )}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              style={{ transform: showCategoryPicker ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
              <path d="M3 5l4 4 4-4" stroke="rgba(175,197,255,0.4)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {showCategoryPicker && (
            <div className="mt-2 rounded-[--radius-2xl] overflow-hidden"
              style={{ border: '1px solid rgba(175,197,255,0.1)', background: 'rgba(175,197,255,0.03)' }}>
              {CATEGORIES.map((cat, i) => (
                <button key={cat.key}
                  onClick={() => { setCategory(cat.key); setShowCategoryPicker(false) }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-surface/50 transition-colors"
                  style={{ borderBottom: i < CATEGORIES.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                  <div className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: cat.color }} />
                  <p className="flex-1 font-body text-sm text-text">{cat.label}</p>
                  {category === cat.key && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke={cat.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Subject */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2">Subject <span style={{ color: '#F87171' }}>*</span></p>
          <input
            className="w-full h-11 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none px-4 rounded-[--radius-xl]"
            style={{ background: 'rgba(175,197,255,0.05)', border: `1px solid ${subject.length >= 4 ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.12)'}` }}
            placeholder="Brief description of your issue"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            maxLength={100}
          />
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-body text-xs font-semibold text-text">Description <span style={{ color: '#F87171' }}>*</span></p>
            <p className="font-body text-[10px] text-text-muted">{description.length}/1000</p>
          </div>
          <textarea
            className="w-full bg-transparent font-body text-sm text-text placeholder-text-muted outline-none px-4 py-3 rounded-[--radius-xl] resize-none"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: `1px solid ${description.length >= 10 ? 'rgba(0,102,255,0.25)' : 'rgba(175,197,255,0.12)'}`,
              minHeight: 120,
            }}
            placeholder="Describe your issue in as much detail as possible. Include any error messages, transaction IDs, or dates that might help."
            value={description}
            onChange={e => setDescription(e.target.value.slice(0, 1000))}
          />
        </div>

        {/* Priority */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2">Priority</p>
          <div className="grid grid-cols-2 gap-2">
            {PRIORITIES.map(p => (
              <button key={p.key} onClick={() => setPriority(p.key)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-[--radius-xl] text-left transition-all"
                style={{
                  background: priority === p.key ? p.bg : 'rgba(175,197,255,0.03)',
                  border: `1px solid ${priority === p.key ? `${p.color}35` : 'rgba(175,197,255,0.09)'}`,
                }}>
                <div className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: p.color, opacity: priority === p.key ? 1 : 0.4 }} />
                <div className="min-w-0">
                  <p className="font-body text-xs font-semibold"
                    style={{ color: priority === p.key ? p.color : 'rgba(175,197,255,0.5)' }}>
                    {p.label}
                  </p>
                  <p className="font-body text-[9px] text-text-muted">{p.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Attachments */}
        <div>
          <p className="font-body text-xs font-semibold text-text mb-2">Attachments <span className="font-normal text-text-muted">(optional)</span></p>
          {attachments.length > 0 && (
            <div className="flex flex-col gap-2 mb-2">
              {attachments.map((file, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-[--radius-xl]"
                  style={{ background: 'rgba(0,102,255,0.06)', border: '1px solid rgba(0,102,255,0.15)' }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                    <path d="M3 2h8v10H3V2z" stroke="#4D9FFF" strokeWidth="1" strokeLinejoin="round" />
                    <path d="M5 5.5h4M5 8h2" stroke="#4D9FFF" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <p className="flex-1 font-body text-xs text-text truncate">{file}</p>
                  <button onClick={() => setAttachments(a => a.filter((_, j) => j !== i))}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          {attachments.length < 3 && (
            <button onClick={addFakeAttachment}
              className="flex items-center gap-2 px-3 h-10 rounded-[--radius-xl] transition-all"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px dashed rgba(175,197,255,0.15)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 3v8M3 7h8" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <p className="font-body text-xs text-text-muted">Add file or screenshot</p>
            </button>
          )}
        </div>

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
          ) : 'Submit Ticket'}
        </button>

        <p className="font-body text-[10px] text-center text-text-muted">
          You'll receive a confirmation email with your ticket number. First response within 24 hours.
        </p>
      </div>
    </div>
  )
}
