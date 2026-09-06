interface RemoveBankProps {
  bankName?: string
  bankAbbr?: string
  bankColor?: string
  maskedAccount?: string
  pendingTransfers?: number
  onConfirmUnlink?: () => void
  onCancel?: () => void
}

export default function RemoveBank({
  bankName = 'Chase',
  bankAbbr = 'JP',
  bankColor = '#117ACA',
  maskedAccount = '••••4821',
  pendingTransfers = 0,
  onConfirmUnlink,
  onCancel,
}: RemoveBankProps) {
  return (
    <div className="flex flex-col items-center bg-bg px-5" style={{ minHeight: 785 }}>
      {/* Dim overlay feel — bottom sheet style */}
      <div className="flex-1 flex flex-col items-center justify-end pb-4 w-full">
        <div
          className="w-full rounded-[--radius-2xl] flex flex-col overflow-hidden"
          style={{ background: 'rgba(13,26,74,0.98)', border: '1px solid rgba(175,197,255,0.15)', backdropFilter: 'blur(24px)' }}
        >
          {/* Drag handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full" style={{ background: 'rgba(175,197,255,0.2)' }} />
          </div>

          {/* Bank identity */}
          <div className="px-5 pt-4 pb-4 flex items-center gap-3 border-b border-[color:var(--color-border)]">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center font-body font-bold text-white shrink-0"
              style={{ background: bankColor, fontSize: 13, boxShadow: `0 4px 12px ${bankColor}55` }}
            >
              {bankAbbr}
            </div>
            <div>
              <p className="font-body text-base font-semibold text-text">{bankName}</p>
              <p className="font-body text-xs text-text-muted">{maskedAccount}</p>
            </div>
          </div>

          <div className="px-5 pt-5 pb-6 flex flex-col gap-4">
            {/* Warning headline */}
            <div className="text-center flex flex-col gap-1">
              <p className="font-display text-xl font-extrabold text-text tracking-tight">Unlink this bank?</p>
              <p className="font-body text-sm text-text-muted">This will remove the connection between {bankName} and your ChangeAIPay wallet.</p>
            </div>

            {/* What happens */}
            <div
              className="flex flex-col gap-2.5 px-4 py-4 rounded-[--radius-xl]"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
            >
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">What this does</p>
              {[
                { icon: '✓', ok: true,  text: 'Your ChangeAIPay balance is unaffected' },
                { icon: '✓', ok: true,  text: 'Transaction history is preserved' },
                { icon: '✗', ok: false, text: "You won't be able to add money from this bank" },
                { icon: '✗', ok: false, text: 'Withdrawal to this bank will be unavailable' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className={`font-mono text-xs font-bold shrink-0 mt-0.5 ${item.ok ? 'text-success' : 'text-text-muted'}`}>
                    {item.icon}
                  </span>
                  <p className={`font-body text-sm ${item.ok ? 'text-text-2' : 'text-text-muted'}`}>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Pending transfers warning */}
            {pendingTransfers > 0 && (
              <div
                className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(245,183,0,0.07)', border: '1px solid rgba(245,183,0,0.25)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 shrink-0">
                  <path d="M7 1L1 12h12L7 1Z" stroke="#F5B700" strokeWidth="1.2" strokeLinejoin="round" />
                  <line x1="7" y1="6" x2="7" y2="9" stroke="#F5B700" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="7" cy="10.5" r="0.7" fill="#F5B700" />
                </svg>
                <p className="font-body text-sm text-warning leading-relaxed">
                  You have <span className="font-bold">{pendingTransfers} pending transfer{pendingTransfers > 1 ? 's' : ''}</span> tied to this bank.
                  Unlinking now may delay settlement. We recommend waiting for them to complete first.
                </p>
              </div>
            )}

            {/* Re-link note */}
            <p className="font-body text-xs text-text-muted text-center">
              You can always re-link this bank later from the wallet settings.
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-1">
              <button
                onClick={onConfirmUnlink}
                className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-[200ms] active:scale-[0.98]"
                style={{ background: 'rgba(255,77,90,0.12)', border: '1px solid rgba(255,77,90,0.35)', color: '#FF4D5A' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 9H3a3 3 0 0 1 0-6h2M9 5h2a3 3 0 0 1 0 6H9M5 7h4" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
                  <path d="M2 2l10 10" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                Confirm Unlink
              </button>
              <button
                onClick={onCancel}
                className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 flex items-center justify-center transition-all duration-[180ms] active:scale-[0.98]"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              >
                Cancel — Keep Linked
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
