import { useState } from 'react'

interface DeleteConfirmationProps {
  onConfirm?: () => void
  onCancel?: () => void
}

export default function DeleteConfirmation({ onConfirm, onCancel }: DeleteConfirmationProps) {
  const [authMode, setAuthMode] = useState<'password' | 'biometric'>('password')
  const [password, setPassword] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState(false)
  const [verified, setVerified] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [typedConfirm, setTypedConfirm] = useState('')

  const confirmPhrase = 'DELETE'
  const phraseMatch = typedConfirm === confirmPhrase

  const handleVerify = () => {
    if (!password) return
    setVerifying(true)
    setVerifyError(false)
    setTimeout(() => {
      setVerifying(false)
      if (password.length >= 4) {
        setVerified(true)
      } else {
        setVerifyError(true)
      }
    }, 1000)
  }

  const handleBiometric = () => {
    setVerifying(true)
    setTimeout(() => {
      setVerifying(false)
      setVerified(true)
    }, 1200)
  }

  const handleDelete = () => {
    setDeleting(true)
    setTimeout(() => {
      setDeleting(false)
      onConfirm?.()
    }, 1800)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onCancel} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="font-display text-base font-extrabold text-gradient-primary flex-1 tracking-tight">Confirm Deletion</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Warning banner */}
        <div className="rounded-[--radius-2xl] px-5 py-5 flex flex-col gap-2.5"
          style={{ background: 'rgba(255,77,90,0.07)', border: '1.5px solid rgba(255,77,90,0.3)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,77,90,0.15)' }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L1.5 15.5h15L9 2Z" stroke="#FF4D5A" strokeWidth="1.3" strokeLinejoin="round" />
                <path d="M9 7v4" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
                <circle cx="9" cy="13" r="0.8" fill="#FF4D5A" />
              </svg>
            </div>
            <div>
              <p className="font-display text-sm font-extrabold" style={{ color: '#FF4D5A' }}>This cannot be undone</p>
              <p className="font-body text-[10px] text-text-muted">Deletion is permanent and irreversible</p>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pl-1">
            {[
              'All personal data deleted within 30 days',
              'All active sessions signed out immediately',
              'Linked bank accounts will be disconnected',
              'Account cannot be recovered after confirmation',
            ].map(line => (
              <div key={line} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: '#FF4D5A' }} />
                <p className="font-body text-[11px] text-text-muted">{line}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Auth step */}
        {!verified ? (
          <div>
            <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Verify Your Identity</p>
            {/* Auth mode toggle */}
            <div className="flex gap-2 mb-4">
              {(['password', 'biometric'] as const).map(mode => (
                <button key={mode} onClick={() => { setAuthMode(mode); setVerifyError(false) }}
                  className="flex-1 h-9 rounded-full font-body text-xs font-semibold capitalize transition-all"
                  style={{ background: authMode === mode ? 'rgba(255,77,90,0.12)' : 'rgba(175,197,255,0.06)', border: `1px solid ${authMode === mode ? 'rgba(255,77,90,0.35)' : 'rgba(175,197,255,0.12)'}`, color: authMode === mode ? '#FF4D5A' : 'rgba(175,197,255,0.5)' }}>
                  {mode === 'biometric' ? 'Face ID' : 'Password'}
                </button>
              ))}
            </div>

            {authMode === 'password' ? (
              <div className="flex flex-col gap-3">
                <input type="password" value={password} onChange={e => { setPassword(e.target.value); setVerifyError(false) }}
                  placeholder="Enter your password"
                  className="h-12 px-4 rounded-[--radius-xl] font-body text-sm text-text outline-none"
                  style={{ background: 'rgba(175,197,255,0.05)', border: `1px solid ${verifyError ? 'rgba(255,77,90,0.5)' : 'rgba(175,197,255,0.12)'}` }} />
                {verifyError && <p className="font-body text-[10px]" style={{ color: '#FF4D5A' }}>Incorrect password. Please try again.</p>}
                <button onClick={handleVerify} disabled={!password || verifying}
                  className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all disabled:opacity-40"
                  style={{ background: 'rgba(255,77,90,0.1)', border: '1px solid rgba(255,77,90,0.35)', color: '#FF4D5A' }}>
                  {verifying ? <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="rgba(255,77,90,0.25)" strokeWidth="1.5" /><path d="M8 2a6 6 0 0 1 6 6" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" /></svg> : 'Verify'}
                </button>
              </div>
            ) : (
              <button onClick={handleBiometric} disabled={verifying}
                className="w-full h-14 rounded-[--radius-xl] font-body text-sm font-semibold flex items-center justify-center gap-3 transition-all disabled:opacity-40"
                style={{ background: 'rgba(255,77,90,0.08)', border: '1px solid rgba(255,77,90,0.3)', color: '#FF4D5A' }}>
                {verifying ? (
                  <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="rgba(255,77,90,0.2)" strokeWidth="1.5" /><path d="M9 2a7 7 0 0 1 7 7" stroke="#FF4D5A" strokeWidth="1.5" strokeLinecap="round" /></svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 8C4 4.7 7.1 2 11 2s7 2.7 7 6" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
                    <circle cx="11" cy="11" r="3.5" stroke="#FF4D5A" strokeWidth="1.3" />
                    <path d="M6 16.5c1.2 2 2.8 3 5 3s3.8-1 5-3" stroke="#FF4D5A" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                )}
                {verifying ? 'Scanning…' : 'Authenticate with Face ID'}
              </button>
            )}
          </div>
        ) : (
          /* Confirmation step */
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-[--radius-xl]"
              style={{ background: 'rgba(34,197,94,0.07)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3.5 3.5 6.5-6.5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>Identity verified</p>
            </div>

            <div>
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Final Confirmation</p>
              <p className="font-body text-xs text-text-muted mb-3">
                Type <span className="font-mono font-bold text-text">{confirmPhrase}</span> to permanently delete your account.
              </p>
              <input value={typedConfirm} onChange={e => setTypedConfirm(e.target.value.toUpperCase())}
                placeholder={confirmPhrase}
                className="w-full h-12 px-4 rounded-[--radius-xl] font-mono text-sm outline-none tracking-[0.15em]"
                style={{ background: 'rgba(175,197,255,0.05)', border: `1.5px solid ${phraseMatch ? 'rgba(255,77,90,0.5)' : 'rgba(175,197,255,0.12)'}`, color: phraseMatch ? '#FF4D5A' : 'var(--color-text)' }} />
            </div>
          </div>
        )}

        {verified && (
          <button onClick={handleDelete} disabled={!phraseMatch || deleting}
            className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-extrabold flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-30"
            style={{ background: phraseMatch ? 'rgba(255,77,90,0.15)' : 'rgba(175,197,255,0.04)', border: `1.5px solid ${phraseMatch ? 'rgba(255,77,90,0.5)' : 'rgba(175,197,255,0.1)'}`, color: phraseMatch ? '#FF4D5A' : 'rgba(175,197,255,0.3)' }}>
            {deleting ? (
              <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="rgba(255,77,90,0.25)" strokeWidth="2" /><path d="M9 2a7 7 0 0 1 7 7" stroke="#FF4D5A" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : 'Permanently Delete Account'}
          </button>
        )}

        <button onClick={onCancel}
          className="w-full h-12 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-muted transition-all"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.09)' }}>
          Cancel — Keep My Account
        </button>
      </div>
    </div>
  )
}
