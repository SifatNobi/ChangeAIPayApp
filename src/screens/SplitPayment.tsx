import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

interface Participant {
  id: string
  name: string
  initials: string
  color: string
  handle: string
  customAmount?: string
  customPct?: string
}

interface SplitPaymentProps {
  onSendRequests?: (total: string, participants: Participant[], method: SplitMethod) => void
  onBack?: () => void
  onAddContact?: () => void
}

type SplitMethod = 'equal' | 'custom' | 'percentage'

const PRESET_CONTACTS: Participant[] = []

const METHOD_LABELS: Record<SplitMethod, string> = {
  equal: 'Equal',
  custom: 'Custom',
  percentage: 'By %',
}

export default function SplitPayment({ onSendRequests, onBack, onAddContact }: SplitPaymentProps) {
  const [total, setTotal] = useState('')
  const [participants, setParticipants] = useState<Participant[]>([])
  const [method, setMethod] = useState<SplitMethod>('equal')
  const [showContacts, setShowContacts] = useState(false)
  const [customAmounts, setCustomAmounts] = useState<Record<string, string>>({})
  const [customPcts, setCustomPcts] = useState<Record<string, string>>({})

  const totalNum = parseFloat(total) || 0
  const n = participants.length

  const getShare = (p: Participant): number => {
    if (method === 'equal') return n > 0 ? totalNum / n : 0
    if (method === 'custom') return parseFloat(customAmounts[p.id] || '0')
    if (method === 'percentage') {
      const pct = parseFloat(customPcts[p.id] || '0')
      return (pct / 100) * totalNum
    }
    return 0
  }

  const totalAssigned =
    method === 'equal' ? totalNum :
    method === 'custom' ? participants.reduce((s, p) => s + parseFloat(customAmounts[p.id] || '0'), 0) :
    participants.reduce((s, p) => {
      const pct = parseFloat(customPcts[p.id] || '0')
      return s + (pct / 100) * totalNum
    }, 0)

  const remainingPct = method === 'percentage'
    ? 100 - participants.reduce((s, p) => s + parseFloat(customPcts[p.id] || '0'), 0)
    : null

  const removeParticipant = (id: string) =>
    setParticipants(ps => ps.filter(p => p.id !== id))

  const addParticipant = (p: Participant) => {
    if (!participants.find(x => x.id === p.id)) setParticipants(ps => [...ps, p])
    setShowContacts(false)
  }

  const isValid = n >= 1 && totalNum > 0 &&
    (method === 'equal' ||
     (method === 'custom' && Math.abs(totalAssigned - totalNum) < 0.01) ||
     (method === 'percentage' && Math.abs(totalAssigned - totalNum) < 0.01))

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title="Split Payment" onBack={onBack} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Total amount */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl] flex flex-col gap-2"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(5,11,45,0.98))', border: '1px solid rgba(0,102,255,0.2)' }}
        >
          <p className="font-body text-xs text-white/50 uppercase tracking-wider">Total to split</p>
          <div className="flex items-center gap-2">
            <span className="font-body text-lg text-white/60">$</span>
            <input
              type="number"
              value={total}
              onChange={e => setTotal(e.target.value)}
              className="flex-1 bg-transparent font-display text-4xl font-extrabold text-white tracking-tight outline-none"
              placeholder="0.00"
              step="0.01"
              min="0"
            />
          </div>
        </div>

        {/* Participants */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">
              Participants ({n})
            </p>
            <button
              onClick={() => setShowContacts(s => !s)}
              className="flex items-center gap-1.5 h-8 px-3 rounded-full font-body text-xs font-semibold text-accent transition-all duration-[180ms]"
              style={{ background: 'rgba(0,102,255,0.1)', border: '1px solid rgba(0,102,255,0.25)' }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 1v9M1 5.5h9" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              Add
            </button>
          </div>

          {/* Contact picker dropdown */}
          {showContacts && (
            <div
              className="rounded-[--radius-xl] overflow-hidden flex flex-col"
              style={{ background: 'rgba(13,26,74,0.98)', border: '1px solid rgba(175,197,255,0.15)' }}
            >
              {PRESET_CONTACTS.filter(c => !participants.find(p => p.id === c.id)).map(c => (
                <button
                  key={c.id}
                  onClick={() => addParticipant(c)}
                  className="flex items-center gap-3 h-12 px-4 transition-colors hover:bg-surface-hi"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-body text-xs font-bold text-white shrink-0"
                    style={{ background: `linear-gradient(135deg, ${c.color}cc, ${c.color}44)` }}
                  >{c.initials}</div>
                  <div className="flex-1 text-left">
                    <p className="font-body text-sm text-text">{c.name}</p>
                    <p className="font-mono text-xs text-text-muted">{c.handle}</p>
                  </div>
                </button>
              ))}
              <button
                onClick={() => { setShowContacts(false); onAddContact?.() }}
                className="flex items-center gap-2 h-12 px-4 border-t border-[color:var(--color-border)] font-body text-xs text-accent hover:bg-surface-hi"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M5.5 1v9M1 5.5h9" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Add from contacts…
              </button>
            </div>
          )}

          {participants.map(p => (
            <div
              key={p.id}
              className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-body text-xs font-bold text-white shrink-0"
                style={{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color}44)` }}
              >{p.initials}</div>
              <div className="flex-1">
                <p className="font-body text-sm font-semibold text-text">{p.name}</p>
                {method === 'equal' && (
                  <p className="font-mono text-xs text-success">${getShare(p).toFixed(2)}</p>
                )}
              </div>

              {method === 'custom' && (
                <div className="flex items-center gap-1">
                  <span className="font-body text-sm text-text-muted">$</span>
                  <input
                    type="number"
                    value={customAmounts[p.id] ?? ''}
                    onChange={e => setCustomAmounts(a => ({ ...a, [p.id]: e.target.value }))}
                    placeholder="0.00"
                    className="w-20 bg-transparent font-mono text-sm text-text outline-none text-right"
                    style={{ borderBottom: '1px solid rgba(175,197,255,0.25)' }}
                  />
                </div>
              )}

              {method === 'percentage' && (
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    value={customPcts[p.id] ?? ''}
                    onChange={e => setCustomPcts(a => ({ ...a, [p.id]: e.target.value }))}
                    placeholder="0"
                    className="w-14 bg-transparent font-mono text-sm text-text outline-none text-right"
                    style={{ borderBottom: '1px solid rgba(175,197,255,0.25)' }}
                  />
                  <span className="font-body text-sm text-text-muted">%</span>
                  <span className="font-mono text-xs text-text-muted ml-1">(${getShare(p).toFixed(2)})</span>
                </div>
              )}

              <button
                onClick={() => removeParticipant(p.id)}
                className="w-7 h-7 flex items-center justify-center rounded-full ml-1 transition-colors hover:bg-error/10"
                aria-label={`Remove ${p.name}`}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 2l8 8M10 2l-8 8" stroke="rgba(175,197,255,0.35)" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Split method */}
        <div className="flex flex-col gap-2">
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Split method</p>
          <div className="flex gap-2">
            {(['equal', 'custom', 'percentage'] as SplitMethod[]).map(m => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className="flex-1 h-10 rounded-[--radius-xl] font-body text-sm font-semibold transition-all duration-[200ms]"
                style={{
                  background: method === m ? 'rgba(0,102,255,0.2)' : 'rgba(175,197,255,0.04)',
                  color: method === m ? '#AFC5FF' : 'rgba(175,197,255,0.45)',
                  border: `1px solid ${method === m ? 'rgba(0,102,255,0.35)' : 'rgba(175,197,255,0.1)'}`,
                }}
              >
                {METHOD_LABELS[m]}
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl] flex flex-col gap-2"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">Request preview</p>
          {participants.map(p => (
            <div key={p.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full flex items-center justify-center font-body text-[9px] font-bold text-white shrink-0"
                  style={{ background: `linear-gradient(135deg, ${p.color}cc, ${p.color}44)` }}
                >{p.initials}</div>
                <p className="font-body text-sm text-text-2">{p.name.split(' ')[0]}</p>
              </div>
              <p className="font-mono text-sm font-semibold text-text">${getShare(p).toFixed(2)}</p>
            </div>
          ))}
          <div className="flex justify-between border-t border-[color:var(--color-border)] pt-2 mt-1">
            <p className="font-body text-xs text-text-muted">Total assigned</p>
            <p className={`font-mono text-sm font-bold ${isValid ? 'text-success' : 'text-warning'}`}>
              ${totalAssigned.toFixed(2)} / ${totalNum.toFixed(2)}
            </p>
          </div>
          {remainingPct !== null && remainingPct > 0.01 && (
            <p className="font-body text-xs text-warning">Unassigned: {remainingPct.toFixed(1)}%</p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 pb-8">
        <button
          disabled={!isValid}
          onClick={() => onSendRequests?.(total, participants, method)}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'var(--gradient-primary)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M9 4l3 3-3 3" stroke="white" strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Send {n > 0 ? `${n} Request${n > 1 ? 's' : ''}` : 'Requests'}
        </button>
      </div>
    </div>
  )
}
