import { useState, useCallback } from 'react'
import logoSrc from '@/imports/logo.png.jpeg'

interface ReceiveProps {
  handle?: string
  displayName?: string
  avatarInitials?: string
  avatarColor?: string
  onBack?: () => void
  onDone?: () => void
}

const CURRENCIES = [
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺' },
]

function MiniQR({ value }: { value: string }) {
  const seed = value.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const pseudo = (i: number) => (((seed * 31 + i * 17) ^ (i * 7 + 13)) % 3) !== 0

  return (
    <div className="w-52 h-52 rounded-[20px] bg-white p-4 grid grid-cols-9 grid-rows-9 gap-[1.5px]">
      {Array.from({ length: 81 }).map((_, i) => {
        const row = Math.floor(i / 9)
        const col = i % 9
        const corner =
          (row < 4 && col < 4) ||
          (row < 4 && col >= 5) ||
          (row >= 5 && col < 4)
        const filled = corner || pseudo(i)
        return (
          <div
            key={i}
            className="rounded-[1.5px]"
            style={{ backgroundColor: filled ? '#050B2D' : 'transparent' }}
          />
        )
      })}
    </div>
  )
}

export default function Receive({
  handle = '@mayapatel',
  displayName = 'Maya Patel',
  avatarInitials = 'MP',
  avatarColor = '#0066FF',
  onBack,
  onDone,
}: ReceiveProps) {
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [currency, setCurrency] = useState(CURRENCIES[0])
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false)
  const [showAmountField, setShowAmountField] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'qr' | 'link'>('qr')

  const link = `changeaipay.app/${handle.replace('@', '')}${amount ? `?amount=${amount}&currency=${currency.code}` : ''}`

  const handleCopy = useCallback(() => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [])

  const numVal = parseFloat(amount) || 0

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-3">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full transition-colors hover:bg-surface-hi"
          aria-label="Back"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          <img src={logoSrc} alt="ChangeAIPay" className="w-5 h-5 object-contain" />
          <span className="font-body text-sm font-semibold text-text">Receive</span>
        </div>
        <button
          onClick={onDone}
          className="font-body text-sm font-semibold text-accent min-h-[44px] flex items-center"
        >
          Done
        </button>
      </div>

      <div className="overflow-y-auto flex-1 px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>
        {/* Profile row */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center font-body text-lg font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${avatarColor}cc, ${avatarColor}44)` }}
          >
            {avatarInitials}
          </div>
          <p className="font-body text-base font-semibold text-text">{displayName}</p>
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.2)' }}
          >
            <span className="font-mono text-sm font-semibold text-accent-secondary">{handle}</span>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4" stroke="#3FE7FF" strokeWidth="0.8" />
              <path d="M3 5l1.5 1.5 2.5-3" stroke="#3FE7FF" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Optional amount request */}
        {showAmountField ? (
          <div
            className="flex flex-col gap-3 px-4 py-4 rounded-[--radius-2xl]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.12)' }}
          >
            <div className="flex items-center justify-between">
              <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider">Request amount</p>
              <button
                onClick={() => { setShowAmountField(false); setAmount(''); setNote('') }}
                className="font-body text-xs text-error min-h-[44px] flex items-center"
              >
                Remove
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCurrencyPicker(true)}
                className="flex items-center gap-1.5 h-10 px-3 rounded-full shrink-0"
                style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.15)' }}
              >
                <span className="text-base">{currency.flag}</span>
                <span className="font-body text-sm font-semibold text-text-2">{currency.code}</span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 4l3 3 3-3" stroke="rgba(175,197,255,0.5)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 h-10 px-3 rounded-[--radius-xl] bg-transparent font-display text-lg font-bold text-text placeholder-text-muted outline-none"
                style={{ border: '1px solid rgba(175,197,255,0.15)' }}
              />
            </div>
            <input
              type="text"
              value={note}
              onChange={e => setNote(e.target.value)}
              maxLength={80}
              placeholder="What's it for? (optional)"
              className="h-10 px-3 rounded-[--radius-xl] bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
              style={{ border: '1px solid rgba(175,197,255,0.12)' }}
            />
            {numVal > 0 && (
              <div
                className="flex items-center gap-2 px-3 py-2 rounded-[--radius-lg]"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <circle cx="5.5" cy="5.5" r="4.5" stroke="#22C55E" strokeWidth="0.9" />
                  <path d="M3 5.5l1.8 1.8 3.2-3.6" stroke="#22C55E" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-xs text-success">
                  Requesting {currency.symbol}{parseFloat(amount).toFixed(2)} from payer
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setShowAmountField(true)}
            className="flex items-center justify-center gap-2 w-full h-11 rounded-[--radius-2xl] font-body text-sm font-semibold text-text-2 transition-all duration-[180ms] active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.04)', border: '1px dashed rgba(175,197,255,0.2)' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1v11M1 6.5h11" stroke="rgba(175,197,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Request a specific amount
          </button>
        )}

        {/* Tab toggle */}
        <div
          className="flex p-1 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          {(['qr', 'link'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 h-9 rounded-[--radius-xl] font-body text-sm font-semibold transition-all duration-[200ms]"
              style={{
                background: activeTab === tab ? 'rgba(0,102,255,0.2)' : 'transparent',
                color: activeTab === tab ? '#AFC5FF' : 'rgba(175,197,255,0.4)',
                border: activeTab === tab ? '1px solid rgba(0,102,255,0.3)' : '1px solid transparent',
              }}
            >
              {tab === 'qr' ? 'QR Code' : 'Share Link'}
            </button>
          ))}
        </div>

        {/* QR tab */}
        {activeTab === 'qr' && (
          <div
            className="flex flex-col items-center gap-4 px-4 py-6 rounded-[--radius-2xl]"
            style={{
              background: 'rgba(175,197,255,0.03)',
              border: '1px solid rgba(175,197,255,0.1)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <MiniQR value={`${handle}${amount ? `:${currency.code}:${amount}` : ''}`} />

            {/* Logo badge below QR */}
            <div className="flex items-center gap-2">
              <img src={logoSrc} alt="ChangeAIPay" className="w-4 h-4 object-contain opacity-60" />
              <p className="font-mono text-xs text-text-muted">changeaipay.app/{handle.replace('@', '')}</p>
            </div>

            {numVal > 0 && (
              <div className="flex items-center justify-center gap-1.5">
                <p className="font-display text-xl font-extrabold" style={{
                  background: 'var(--gradient-primary)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>
                  {currency.symbol}{parseFloat(amount).toFixed(2)}
                </p>
                {note && <p className="font-body text-sm text-text-muted">· {note}</p>}
              </div>
            )}

            <button
              className="flex items-center gap-2 h-11 px-5 rounded-full font-body text-sm font-semibold text-text transition-all duration-[180ms] active:scale-[0.96]"
              style={{ background: 'rgba(175,197,255,0.07)', border: '1px solid rgba(175,197,255,0.15)' }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M4 8L1.5 5.5 4 3" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 5.5h7A2.5 2.5 0 0 1 11 8v2" stroke="rgba(175,197,255,0.6)" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              Save QR Code
            </button>
          </div>
        )}

        {/* Share link tab */}
        {activeTab === 'link' && (
          <div className="flex flex-col gap-3">
            {/* Link pill */}
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-[--radius-2xl]"
              style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.12)' }}
            >
              <img src={logoSrc} alt="" className="w-4 h-4 object-contain shrink-0 opacity-50" />
              <p className="font-mono text-xs text-text-2 flex-1 truncate">{link}</p>
              <button
                onClick={handleCopy}
                className="h-7 px-2.5 rounded-full font-body text-xs font-semibold transition-all duration-[180ms] shrink-0"
                style={{
                  background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(175,197,255,0.1)',
                  border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(175,197,255,0.2)'}`,
                  color: copied ? '#22C55E' : 'rgba(175,197,255,0.8)',
                }}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Privacy note */}
            <div className="flex items-start gap-2 px-1">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="mt-0.5 shrink-0">
                <path d="M5.5 1L1 3v4C1 9.5 3 11 5.5 11 8 11 10 9.5 10 7V3L5.5 1Z"
                  stroke="rgba(175,197,255,0.3)" strokeWidth="0.9" strokeLinejoin="round" />
              </svg>
              <p className="font-body text-[10px] text-text-muted leading-relaxed">
                Your link shares your @handle only — no account number, balance, or personal data is ever exposed.
              </p>
            </div>

            {/* Share action grid */}
            <div className="grid grid-cols-3 gap-3">
              {[
                {
                  label: 'Contact',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="8" r="3.5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" />
                      <path d="M3 18c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  ),
                },
                {
                  label: 'Message',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 5h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5l-3 2V6a1 1 0 0 1 1-1Z"
                        stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  ),
                },
                {
                  label: 'More',
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M13 5a3 3 0 1 0 3 3 3 3 0 0 0-3-3M7 10a3 3 0 1 0-3-3 3 3 0 0 0 3 3M13 15a3 3 0 1 0 3-3 3 3 0 0 0-3 3M7 10l6 2.5M13 5l-6 2.5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  ),
                },
              ].map(action => (
                <button
                  key={action.label}
                  className="h-20 rounded-[--radius-2xl] flex flex-col items-center justify-center gap-2 transition-all duration-[180ms] active:scale-[0.93]"
                  style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}
                >
                  {action.icon}
                  <p className="font-body text-xs text-text-muted">{action.label}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ChangeAIPay in-app note */}
        <div
          className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.15)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="5.5" stroke="#22C55E" strokeWidth="1" />
            <path d="M4.5 7l2 2 3-3" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-2">
            ChangeAIPay-to-ChangeAIPay transfers are <span className="font-semibold text-success">always free</span>, instant, and private.
          </p>
        </div>
      </div>

      {/* Currency picker sheet */}
      {showCurrencyPicker && (
        <div
          className="absolute inset-0 z-50 flex items-end"
          style={{ background: 'rgba(5,11,45,0.85)' }}
          onClick={() => setShowCurrencyPicker(false)}
        >
          <div
            className="w-full px-5 pt-5 pb-10 flex flex-col gap-2"
            style={{ background: '#0D1A4A', borderRadius: '28px 28px 0 0', border: '1px solid rgba(175,197,255,0.12)', borderBottom: 'none' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 rounded-full mx-auto mb-3" style={{ background: 'rgba(175,197,255,0.2)' }} />
            <p className="font-body text-sm font-semibold text-text mb-2">Select Currency</p>
            {CURRENCIES.map(c => (
              <button
                key={c.code}
                onClick={() => { setCurrency(c); setShowCurrencyPicker(false) }}
                className="flex items-center gap-3 h-12 px-4 rounded-[--radius-xl] transition-colors"
                style={{
                  background: c.code === currency.code ? 'rgba(0,102,255,0.12)' : 'transparent',
                  border: c.code === currency.code ? '1px solid rgba(0,102,255,0.3)' : '1px solid transparent',
                }}
              >
                <span className="text-xl">{c.flag}</span>
                <span className="font-body text-sm font-semibold text-text flex-1 text-left">{c.code}</span>
                {c.code === currency.code && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7l3 3.5 6-6" stroke="#3FE7FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
