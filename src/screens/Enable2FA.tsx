import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'
import Button from '@/components/Button'
import { TextInput } from '@/components/Input'

interface Enable2FAProps {
  onEnable: () => void
  onSkip: () => void
  onBack: () => void
}

type Method = 'authenticator' | 'sms'

/* Backup codes — 8 codes, XXXX-XXXX format */
const BACKUP_CODES = Array.from({ length: 8 }, (_, i) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seg = (n: number) => Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  return `${seg(4)}-${seg(4)}`
})

/* Minimal QR placeholder */
function QRPlaceholder() {
  return (
    <div className="w-32 h-32 rounded-[--radius-xl] bg-white p-2.5 mx-auto">
      <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-px">
        {Array.from({ length: 64 }).map((_, i) => {
          const r = Math.floor(i / 8), c = i % 8
          const corner = (r < 3 && c < 3) || (r < 3 && c > 4) || (r > 4 && c < 3)
          return (
            <div
              key={i}
              className="rounded-[1px]"
              style={{ backgroundColor: corner || Math.random() > 0.45 ? '#050B2D' : 'transparent' }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default function Enable2FA({ onEnable, onSkip, onBack }: Enable2FAProps) {
  const [method, setMethod] = useState<Method>('authenticator')
  const [codesVisible, setCodesVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')

  const handleCopy = () => {
    navigator.clipboard.writeText(BACKUP_CODES.join('\n')).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEnable = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    onEnable()
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      <div className="px-5 pt-4">
        <AuthHeader onBack={onBack} title="Two-Factor Authentication" step={5} totalSteps={5} />
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-6">
        <p className="font-body text-sm text-text-2 mb-6 leading-relaxed">
          Add an extra layer of security. Even if someone gets your password, they cannot access your account without this second factor.
        </p>

        {/* Method selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {([
            { id: 'authenticator', label: 'Authenticator App', sub: 'Recommended', icon: '🔑' },
            { id: 'sms', label: 'SMS Code', sub: 'Less secure', icon: '💬' },
          ] as const).map(m => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`p-4 rounded-[--radius-xl] border text-left transition-all duration-[250ms] focus-ring
                ${method === m.id
                  ? 'border-accent/40 bg-primary/8'
                  : 'border-[color:var(--color-border)] bg-surface hover:border-primary/25'
                }`}
            >
              <span className="text-2xl block mb-2">{m.icon}</span>
              <p className="font-body text-sm font-semibold text-text">{m.label}</p>
              <p className={`font-body text-xs mt-0.5 ${m.id === 'authenticator' ? 'text-success' : 'text-text-muted'}`}>
                {m.sub}
              </p>
            </button>
          ))}
        </div>

        {/* Method details */}
        {method === 'authenticator' ? (
          <div className="flex flex-col gap-5">
            <div className="rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] p-5 flex flex-col gap-5">
              <div>
                <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-4">
                  Step 1 — Scan this QR code
                </p>
                <QRPlaceholder />
                <p className="font-body text-xs text-text-muted text-center mt-3">
                  Use Google Authenticator, Authy, or 1Password
                </p>
              </div>
              <div className="border-t border-[color:var(--color-border)] pt-4">
                <p className="font-body text-xs text-text-muted uppercase tracking-widest mb-2">
                  Or enter this key manually
                </p>
                <div className="flex items-center gap-2 bg-bg rounded-[--radius-lg] px-3 py-2 border border-[color:var(--color-border)]">
                  <p className="font-mono text-xs text-accent flex-1 tracking-widest">
                    JBSW Y3DP EHPK 3PXP
                  </p>
                  <button onClick={handleCopy} className="font-body text-xs text-text-muted hover:text-text-2 transition-colors">
                    {copied ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <p className="font-body text-xs text-text-muted text-center leading-relaxed">
              Step 2 — After scanning, enter the 6-digit code from your authenticator app to verify setup.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <TextInput
              label="Phone number for SMS codes"
              placeholder="+1 555 000 0000"
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
            <div className="rounded-[--radius-xl] bg-warning/8 border border-warning/20 px-4 py-3">
              <p className="font-body text-xs text-warning leading-relaxed">
                SMS codes are less secure than authenticator apps. SIM-swap attacks can compromise SMS-based 2FA.
              </p>
            </div>
          </div>
        )}

        {/* Backup codes */}
        <div className="mt-6 rounded-[--radius-2xl] bg-surface border border-[color:var(--color-border)] overflow-hidden">
          <button
            onClick={() => setCodesVisible(v => !v)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-surface-hi transition-colors"
          >
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-warning">
                <rect x="3" y="2" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 6h6M6 9h6M6 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="font-body text-sm font-semibold text-text">Backup Codes</p>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`text-text-muted transition-transform duration-[250ms] ${codesVisible ? 'rotate-180' : ''}`}
            >
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {codesVisible && (
            <div className="px-5 pb-5 animate-fade-in border-t border-[color:var(--color-border)]">
              <p className="font-body text-xs text-text-muted mt-4 mb-3 leading-relaxed">
                Save these codes somewhere safe. Each can be used once if you lose access to your 2FA method.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {BACKUP_CODES.map(code => (
                  <div key={code} className="bg-bg rounded-[--radius-md] px-3 py-2 text-center border border-[color:var(--color-border)]">
                    <p className="font-mono text-xs text-accent tracking-wider">{code}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? '✓ Copied' : 'Copy All'}
                </Button>
                <Button variant="ghost" size="sm">
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Security recommendation */}
        <div className="mt-4 rounded-[--radius-xl] bg-primary/6 border border-primary/15 px-4 py-3">
          <p className="font-body text-xs text-text-2 leading-relaxed">
            <span className="font-semibold text-accent">Recommended: </span>
            Store backup codes in a password manager. Never share them — ChangeAIPay will never ask for them.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="px-5 pb-[max(env(safe-area-inset-bottom,0px),24px)] pt-4 border-t border-[color:var(--color-border)] bg-bg flex flex-col gap-3">
        <Button variant="primary" fullWidth loading={loading} onClick={handleEnable}>
          Enable Two-Factor Authentication
        </Button>
        <Button variant="ghost" fullWidth onClick={onSkip}>
          Skip for Now
        </Button>
      </div>
    </div>
  )
}
