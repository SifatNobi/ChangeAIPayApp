import { useState } from 'react'

const REASONS = [
  "I'm no longer using this business",
  "Switching to another platform",
  "Too many fees or costs",
  "Missing features I need",
  "Privacy concerns",
  "Other",
]

interface MerchantDeleteAccountProps {
  onBack?: () => void
  onContinue?: () => void
  businessName?: string
}

export default function MerchantDeleteAccount({ onBack, onContinue, businessName = 'Apex Studio LLC' }: MerchantDeleteAccountProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null)
  const [confirmChecked, setConfirmChecked] = useState(false)

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Delete Business Account</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Warning banner */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)' }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)' }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L1.5 15h15L9 2z" stroke="#F87171" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M9 8v4M9 13.5v.5" stroke="#F87171" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p className="font-body text-sm font-bold" style={{ color: '#F87171' }}>Permanent action</p>
              <p className="font-body text-xs text-text-muted mt-1 leading-relaxed">
                Deleting <span className="text-text font-semibold">{businessName}</span> cannot be undone. This affects your business account only — your personal ChangeAIPay account will remain active.
              </p>
            </div>
          </div>
        </div>

        {/* What happens */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            What happens when you delete
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {[
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 2h10v10H2z" stroke="#F5B700" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="M5 7l2 2 2-3" stroke="#F5B700" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                color: '#F5B700',
                title: 'Pending payouts must clear first',
                desc: 'Any outstanding payouts will be processed before deletion can proceed.',
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5" stroke="#F5B700" strokeWidth="1.1" />
                    <path d="M7 4v3.5l2.5 1.5" stroke="#F5B700" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                ),
                color: '#F5B700',
                title: 'Data retained for compliance',
                desc: 'Transaction records, invoices, and tax data are retained for up to 7 years as required by law.',
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="5" r="2" stroke="#F87171" strokeWidth="1.1" />
                    <path d="M2.5 12c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" stroke="#F87171" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                ),
                color: '#F87171',
                title: 'Team members lose access immediately',
                desc: 'All Admin and Staff members will be signed out and lose access to the account.',
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 3h8l-1 9H4L3 3z" stroke="#F87171" strokeWidth="1.1" strokeLinejoin="round" />
                    <path d="M5.5 3V2h3v1" stroke="#F87171" strokeWidth="1.1" strokeLinecap="round" />
                    <path d="M1.5 3h11" stroke="#F87171" strokeWidth="1.1" strokeLinecap="round" />
                  </svg>
                ),
                color: '#F87171',
                title: 'Business profile, QR codes & links deleted',
                desc: 'Your payment page, QR codes, and invoice links will stop working immediately.',
              },
            ].map((item, i, arr) => (
              <div key={i} className="flex gap-3 px-4 py-3.5"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${item.color}15` }}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs font-semibold text-text">{item.title}</p>
                  <p className="font-body text-[10px] text-text-muted mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reason selector */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">
            Reason for leaving <span style={{ color: 'rgba(175,197,255,0.3)' }}>(optional)</span>
          </p>
          <div className="flex flex-col gap-2">
            {REASONS.map(reason => (
              <button key={reason} onClick={() => setSelectedReason(selectedReason === reason ? null : reason)}
                className="flex items-center gap-3 px-4 py-3 rounded-[--radius-xl] text-left transition-all"
                style={{
                  background: selectedReason === reason ? 'rgba(239,68,68,0.06)' : 'rgba(175,197,255,0.03)',
                  border: `1px solid ${selectedReason === reason ? 'rgba(239,68,68,0.2)' : 'rgba(175,197,255,0.09)'}`,
                }}>
                <div className="w-4 h-4 rounded-full shrink-0 flex items-center justify-center"
                  style={{
                    background: selectedReason === reason ? 'rgba(239,68,68,0.2)' : 'rgba(175,197,255,0.08)',
                    border: `1.5px solid ${selectedReason === reason ? '#F87171' : 'rgba(175,197,255,0.2)'}`,
                  }}>
                  {selectedReason === reason && (
                    <div className="w-2 h-2 rounded-full" style={{ background: '#F87171' }} />
                  )}
                </div>
                <p className="font-body text-xs text-text">{reason}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Confirm checkbox */}
        <button
          onClick={() => setConfirmChecked(v => !v)}
          className="flex items-start gap-3 px-4 py-4 rounded-[--radius-xl] text-left transition-all w-full"
          style={{
            background: confirmChecked ? 'rgba(239,68,68,0.05)' : 'rgba(175,197,255,0.03)',
            border: `1px solid ${confirmChecked ? 'rgba(239,68,68,0.22)' : 'rgba(175,197,255,0.09)'}`,
          }}
        >
          <div className="w-5 h-5 rounded-[5px] shrink-0 mt-0.5 flex items-center justify-center transition-all"
            style={{
              background: confirmChecked ? 'rgba(239,68,68,0.2)' : 'rgba(175,197,255,0.06)',
              border: `1.5px solid ${confirmChecked ? '#F87171' : 'rgba(175,197,255,0.2)'}`,
            }}>
            {confirmChecked && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5 3.5-4" stroke="#F87171" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            I understand this will permanently delete <span className="text-text">{businessName}</span> and that team members will immediately lose access.
          </p>
        </button>

        {/* CTA */}
        <button
          onClick={onContinue}
          disabled={!confirmChecked}
          className="w-full h-13 rounded-[--radius-xl] font-body text-sm font-semibold text-white transition-all"
          style={{
            background: confirmChecked ? 'rgba(239,68,68,0.8)' : 'rgba(175,197,255,0.06)',
            color: confirmChecked ? 'white' : 'rgba(175,197,255,0.3)',
            border: `1px solid ${confirmChecked ? 'rgba(239,68,68,0.4)' : 'rgba(175,197,255,0.09)'}`,
            height: 52,
          }}
        >
          Continue to Confirm Deletion
        </button>

        <button onClick={onBack}
          className="w-full h-11 font-body text-sm text-text-muted rounded-[--radius-xl] transition-colors hover:text-text">
          Keep my account
        </button>
      </div>
    </div>
  )
}
