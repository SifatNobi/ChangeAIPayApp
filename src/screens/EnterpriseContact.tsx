import { useState } from 'react'
import { MERCHANT_TIERS } from '@/data/merchantTiers'

type ContactMethod = 'form' | 'call'
type FormState = 'idle' | 'sending' | 'sent'

interface EnterpriseContactProps {
  onBack?: () => void
  onSelfServe?: () => void
}

const ENTERPRISE_TIER = MERCHANT_TIERS.find(t => t.name === 'Enterprise')!

const CUSTOM_ITEMS = [
  { label: 'Volume-based fee negotiation', sub: 'Custom platform fee % for your transaction volume' },
  { label: 'Multi-entity account structure', sub: 'Manage multiple business entities under one account' },
  { label: 'Dedicated infrastructure', sub: 'Isolated processing environment and custom uptime SLA' },
  { label: 'Custom API & webhooks', sub: 'Bespoke integrations with your existing payment stack' },
  { label: 'White-label product options', sub: "Co-branded or fully white-labeled under your brand" },
  { label: 'Negotiated FX terms', sub: 'Reduced FX spread for high-volume currency conversions' },
]

export default function EnterpriseContact({ onBack, onSelfServe }: EnterpriseContactProps) {
  const [method, setMethod] = useState<ContactMethod>('form')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [volume, setVolume] = useState('')
  const [message, setMessage] = useState('')
  const [formState, setFormState] = useState<FormState>('idle')
  const [callTime, setCallTime] = useState<string | null>(null)

  const CALL_SLOTS = ['Tomorrow 9 AM PT', 'Tomorrow 1 PM PT', 'Tomorrow 3 PM PT', 'Thu 10 AM PT', 'Thu 2 PM PT', 'Fri 11 AM PT']

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return
    setFormState('sending')
    setTimeout(() => setFormState('sent'), 1400)
  }

  const allValid = name.trim() && email.trim() && (method === 'call' ? callTime : true)

  if (formState === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center bg-bg px-8" style={{ minHeight: 785 }}>
        <div className="w-20 h-20 rounded-[24px] flex items-center justify-center mb-5"
          style={{
            background: ENTERPRISE_TIER.bgColor,
            border: `1px solid ${ENTERPRISE_TIER.borderColor}`,
            boxShadow: `0 0 32px ${ENTERPRISE_TIER.glowColor}`,
          }}>
          {method === 'form' ? (
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M6 16l8 8 12-12" stroke={ENTERPRISE_TIER.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path d="M5 6h18v16H5V6z" stroke={ENTERPRISE_TIER.color} strokeWidth="1.5" strokeLinejoin="round" />
              <path d="M5 10l9 6 9-6" stroke={ENTERPRISE_TIER.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <p className="font-display text-xl font-extrabold text-text text-center mb-2">
          {method === 'form' ? 'Message sent' : 'Call scheduled'}
        </p>
        <p className="font-body text-sm text-text-muted text-center leading-relaxed mb-1">
          {method === 'form'
            ? "We'll respond within one business day to discuss your custom Enterprise terms."
            : `Your call is confirmed for ${callTime}. We'll send a calendar invite to ${email || 'your email'}.`}
        </p>
        <p className="font-body text-xs text-text-muted text-center mt-3 mb-8 leading-relaxed">
          In the meantime, you can{' '}
          <button onClick={onSelfServe} className="underline" style={{ color: ENTERPRISE_TIER.color }}>
            subscribe to Enterprise self-serve
          </button>{' '}
          at $3,299/yr and switch to custom terms once agreed.
        </p>
        <button onClick={onBack}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white transition-all"
          style={{ background: 'var(--gradient-primary)' }}>
          Back to dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Enterprise</p>
          <p className="font-body text-[10px] text-text-muted">Custom terms beyond the $3,299/yr package</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Context banner */}
        <div
          className="px-4 py-4 rounded-[--radius-2xl]"
          style={{
            background: `linear-gradient(135deg, ${ENTERPRISE_TIER.bgColor} 0%, rgba(0,10,40,0.7) 100%)`,
            border: `1px solid ${ENTERPRISE_TIER.borderColor}`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: ENTERPRISE_TIER.color, boxShadow: `0 0 6px ${ENTERPRISE_TIER.color}` }} />
            <p className="font-body text-[10px] font-bold uppercase tracking-wider" style={{ color: ENTERPRISE_TIER.color }}>
              Enterprise tier
            </p>
          </div>
          <p className="font-body text-xs text-text-muted leading-relaxed mb-3">
            The standard Enterprise package is{' '}
            <button onClick={onSelfServe}
              className="font-semibold underline"
              style={{ color: ENTERPRISE_TIER.color }}>
              self-serve at $3,299/yr
            </button>
            {' '}— subscribe directly, no contact needed. This form is for merchants who need terms beyond the standard package.
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {['$5M+ APV', '0.5% standard fee', '0% with subscription', `${ENTERPRISE_TIER.fxSpread}% FX spread`].map((tag, i) => (
              <span key={i} className="px-2 py-1 rounded-full font-body text-[10px]"
                style={{ background: ENTERPRISE_TIER.bgColor, color: ENTERPRISE_TIER.color, border: `1px solid ${ENTERPRISE_TIER.borderColor}` }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* What custom terms cover */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-2">
            What custom terms cover
          </p>
          <div className="rounded-[--radius-2xl] overflow-hidden"
            style={{ border: '1px solid rgba(175,197,255,0.09)', background: 'rgba(175,197,255,0.02)' }}>
            {CUSTOM_ITEMS.map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-3"
                style={{ borderBottom: i < CUSTOM_ITEMS.length - 1 ? '1px solid rgba(175,197,255,0.06)' : 'none' }}>
                <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                  style={{ background: ENTERPRISE_TIER.color, boxShadow: `0 0 4px ${ENTERPRISE_TIER.glowColor}` }} />
                <div>
                  <p className="font-body text-xs font-semibold text-text">{item.label}</p>
                  <p className="font-body text-[10px] text-text-muted mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Method toggle */}
        <div className="flex gap-2">
          {(['form', 'call'] as ContactMethod[]).map(m => (
            <button key={m} onClick={() => setMethod(m)}
              className="flex-1 h-10 rounded-full font-body text-xs font-semibold transition-all"
              style={{
                background: method === m ? ENTERPRISE_TIER.bgColor : 'rgba(175,197,255,0.04)',
                color: method === m ? ENTERPRISE_TIER.color : 'rgba(175,197,255,0.4)',
                border: `1px solid ${method === m ? ENTERPRISE_TIER.borderColor : 'rgba(175,197,255,0.09)'}`,
              }}>
              {m === 'form' ? 'Send a message' : 'Schedule a call'}
            </button>
          ))}
        </div>

        {/* Form fields */}
        <div className="flex flex-col gap-3">
          {[
            { label: 'Your name', value: name, set: setName, placeholder: 'Maya Patel', required: true },
            { label: 'Business email', value: email, set: setEmail, placeholder: 'maya@apexstudio.co', required: true },
            { label: 'Company', value: company, set: setCompany, placeholder: 'Apex Studio LLC', required: false },
            { label: 'Annual payment volume (approx.)', value: volume, set: setVolume, placeholder: 'e.g. $5M–$10M', required: false },
          ].map((field, i) => (
            <div key={i}>
              <p className="font-body text-[10px] font-semibold text-text-muted mb-1.5 pl-1">
                {field.label}{field.required ? ' *' : ''}
              </p>
              <input
                className="w-full font-body text-sm text-text placeholder-text-muted outline-none px-3 h-11 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)' }}
                placeholder={field.placeholder}
                value={field.value}
                onChange={e => field.set(e.target.value)}
              />
            </div>
          ))}

          {method === 'form' && (
            <div>
              <p className="font-body text-[10px] font-semibold text-text-muted mb-1.5 pl-1">What are you looking for?</p>
              <textarea
                className="w-full font-body text-sm text-text placeholder-text-muted outline-none px-3 py-3 rounded-[--radius-xl] resize-none"
                style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.12)', height: 90 }}
                placeholder="Describe the custom terms you need — volume pricing, multi-entity, white-label, etc."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>
          )}

          {method === 'call' && (
            <div>
              <p className="font-body text-[10px] font-semibold text-text-muted mb-2 pl-1">Available times *</p>
              <div className="grid grid-cols-2 gap-2">
                {CALL_SLOTS.map(slot => (
                  <button key={slot} onClick={() => setCallTime(slot)}
                    className="h-10 rounded-[--radius-xl] font-body text-xs font-semibold transition-all"
                    style={{
                      background: callTime === slot ? ENTERPRISE_TIER.bgColor : 'rgba(175,197,255,0.04)',
                      color: callTime === slot ? ENTERPRISE_TIER.color : 'rgba(175,197,255,0.5)',
                      border: `1px solid ${callTime === slot ? ENTERPRISE_TIER.borderColor : 'rgba(175,197,255,0.09)'}`,
                    }}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={!allValid || formState === 'sending'}
          className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{
            background: allValid ? `linear-gradient(135deg, ${ENTERPRISE_TIER.color}cc, ${ENTERPRISE_TIER.color}88)` : 'rgba(175,197,255,0.06)',
            color: allValid ? 'white' : 'rgba(175,197,255,0.3)',
            border: allValid ? 'none' : '1px solid rgba(175,197,255,0.09)',
          }}>
          {formState === 'sending' ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : method === 'form' ? 'Send message' : 'Book call'}
        </button>

        <button onClick={onSelfServe}
          className="w-full h-11 font-body text-sm rounded-[--radius-xl] transition-all"
          style={{ color: ENTERPRISE_TIER.color, border: `1px solid ${ENTERPRISE_TIER.borderColor}`, background: ENTERPRISE_TIER.bgColor }}>
          Or subscribe self-serve — $3,299/yr
        </button>
      </div>
    </div>
  )
}
