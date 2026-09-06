import { useState } from 'react'

const REASONS = [
  "I no longer need the app",
  "I found a better alternative",
  "Privacy concerns",
  "Too many fees or limits",
  "Poor customer support experience",
  "Technical issues",
  "Prefer not to say",
]

const BLOCKERS = [
  { icon: '💰', label: 'Pending balance', sub: 'Withdraw your balance before deletion' },
  { icon: '🎯', label: 'Active goals',    sub: '4 goals with saved funds need resolution' },
  { icon: '🔄', label: 'Recurring payments', sub: 'Cancel all scheduled transfers first' },
]

interface DeleteAccountProps {
  onBack?: () => void
  onContinue?: () => void
  hasPendingBalance?: boolean
  hasActiveGoals?: boolean
  hasRecurring?: boolean
}

export default function DeleteAccount({ onBack, onContinue, hasPendingBalance = false, hasActiveGoals = false, hasRecurring = false }: DeleteAccountProps) {
  const [selectedReason, setSelectedReason] = useState('')
  const [acknowledgedData, setAcknowledgedData] = useState(false)
  const [acknowledgedCompliance, setAcknowledgedCompliance] = useState(false)

  const blockers = [
    hasPendingBalance && BLOCKERS[0],
    hasActiveGoals    && BLOCKERS[1],
    hasRecurring      && BLOCKERS[2],
  ].filter(Boolean) as typeof BLOCKERS

  const hasBlockers = blockers.length > 0
  const canContinue = !hasBlockers && acknowledgedData && acknowledgedCompliance

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Delete Account</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Danger header */}
        <div className="flex flex-col items-center gap-3 pt-2 pb-1">
          <div className="w-16 h-16 rounded-[24px] flex items-center justify-center"
            style={{ background: 'rgba(255,77,90,0.1)', border: '2px solid rgba(255,77,90,0.3)' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 22.5L14 5.5l9 17H5Z" stroke="#FF4D5A" strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M14 11v5.5" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="14" cy="20" r="1" fill="#FF4D5A" />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-display text-base font-extrabold text-text">This action is permanent</p>
            <p className="font-body text-xs text-text-muted mt-1 leading-relaxed">Your account, transaction history, and linked data will be scheduled for deletion.</p>
          </div>
        </div>

        {/* Blockers */}
        {hasBlockers && (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Resolve Before Deleting</p>
            <div className="flex flex-col gap-2">
              {blockers.map(b => (
                <div key={b.label} className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                  style={{ background: 'rgba(255,77,90,0.05)', border: '1px solid rgba(255,77,90,0.2)' }}>
                  <span className="text-lg shrink-0">{b.icon}</span>
                  <div className="flex-1">
                    <p className="font-body text-sm font-semibold" style={{ color: '#FF4D5A' }}>{b.label}</p>
                    <p className="font-body text-[10px] text-text-muted">{b.sub}</p>
                  </div>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="rgba(255,77,90,0.5)" strokeWidth="1" /><path d="M6.5 4.5v2.5" stroke="rgba(255,77,90,0.7)" strokeWidth="1" strokeLinecap="round" /><circle cx="6.5" cy="9" r="0.5" fill="rgba(255,77,90,0.7)" /></svg>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What happens */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">What Happens When You Delete</p>
          <div className="rounded-[--radius-2xl] overflow-hidden" style={{ border: '1px solid rgba(175,197,255,0.09)' }}>
            {[
              { icon: '🔒', label: 'Account locked immediately', sub: 'You will be signed out of all devices' },
              { icon: '🗑️', label: 'Personal data deleted in 30 days', sub: 'Name, email, phone, and preferences' },
              { icon: '📋', label: 'Transaction records kept for 7 years', sub: 'Required by financial regulations' },
              { icon: '🪙', label: 'Crypto positions must be exited first', sub: 'Sell or withdraw all assets before deletion' },
              { icon: '📄', label: 'Tax documents retained for compliance', sub: 'Accessible on request for 7 years' },
            ].map((row, i) => (
              <div key={row.label} className="flex items-start gap-3 px-4 py-3.5"
                style={{ background: i % 2 === 0 ? 'rgba(175,197,255,0.02)' : 'transparent', borderTop: i > 0 ? '1px solid rgba(175,197,255,0.07)' : 'none' }}>
                <span className="text-base shrink-0 mt-0.5">{row.icon}</span>
                <div>
                  <p className="font-body text-xs font-semibold text-text">{row.label}</p>
                  <p className="font-body text-[10px] text-text-muted">{row.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reason selector */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Reason (Optional)</p>
          <div className="flex flex-col gap-1.5">
            {REASONS.map(r => (
              <button key={r} onClick={() => setSelectedReason(r === selectedReason ? '' : r)}
                className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] text-left transition-all"
                style={{ background: selectedReason === r ? 'rgba(255,77,90,0.07)' : 'rgba(175,197,255,0.03)', border: `1px solid ${selectedReason === r ? 'rgba(255,77,90,0.3)' : 'rgba(175,197,255,0.09)'}` }}>
                <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: selectedReason === r ? '#FF4D5A' : 'rgba(175,197,255,0.3)' }}>
                  {selectedReason === r && <div className="w-2 h-2 rounded-full bg-[#FF4D5A]" />}
                </div>
                <p className="font-body text-sm text-text">{r}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Acknowledgements */}
        <div className="flex flex-col gap-2.5">
          {[
            { id: 'data', checked: acknowledgedData, set: setAcknowledgedData, label: "I understand that my personal data will be deleted within 30 days, except records required for legal and regulatory compliance." },
            { id: 'comp', checked: acknowledgedCompliance, set: setAcknowledgedCompliance, label: "I understand that some transaction and tax records are retained for up to 7 years as required by applicable financial regulations." },
          ].map(item => (
            <button key={item.id} onClick={() => item.set(p => !p)}
              className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl] text-left transition-all"
              style={{ background: item.checked ? 'rgba(255,77,90,0.05)' : 'rgba(175,197,255,0.03)', border: `1px solid ${item.checked ? 'rgba(255,77,90,0.25)' : 'rgba(175,197,255,0.09)'}` }}>
              <div className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: item.checked ? 'rgba(255,77,90,0.2)' : 'rgba(175,197,255,0.08)', border: `1.5px solid ${item.checked ? '#FF4D5A' : 'rgba(175,197,255,0.25)'}` }}>
                {item.checked && <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
              </div>
              <p className="font-body text-[11px] text-text-muted leading-relaxed">{item.label}</p>
            </button>
          ))}
        </div>

        {/* Continue */}
        <button onClick={onContinue} disabled={!canContinue}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-30"
          style={{ background: 'rgba(255,77,90,0.1)', border: '1.5px solid rgba(255,77,90,0.4)', color: '#FF4D5A' }}>
          Continue to Delete Account
        </button>

        <button onClick={onBack}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-muted transition-all active:scale-[0.98]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
          Keep My Account
        </button>
      </div>
    </div>
  )
}
