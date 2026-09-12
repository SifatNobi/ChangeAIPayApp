import { useState } from 'react'

interface SupportProps {
  onBack?: () => void
  onChat?: () => void
}

const TOPICS = [
  'Payment issue',
  'Account access',
  'Identity verification',
  'Crypto question',
  'Goals / savings',
  'Suspicious activity',
  'Billing / subscription',
  'Feature request',
  'Other',
]

export default function Support({ onBack, onChat }: SupportProps) {
  const [selectedTopic, setSelectedTopic] = useState('')
  const [chatStarted, setChatStarted] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)

  const handleStartChat = () => {
    setChatStarted(true)
    onChat?.()
  }

  const handleSendEmail = () => {
    setSendingEmail(true)
    setTimeout(() => { setSendingEmail(false); setEmailSent(true) }, 1200)
  }

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-3 shrink-0">
        <button onClick={onBack} className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-surface-hi transition-colors shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1">
          <p className="font-display text-base font-extrabold text-gradient-primary tracking-tight">Support</p>
          <p className="font-body text-[10px] text-text-muted">We typically respond within 2 hours</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Live chat CTA */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(0,30,80,0.9), rgba(13,26,74,0.98))', border: '1px solid rgba(0,102,255,0.25)' }}>
          <div className="px-5 py-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--gradient-primary)', boxShadow: '0 0 16px rgba(63,231,255,0.35)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M2 3.5C2 2.7 2.7 2 3.5 2h11c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5H11l-3 3-3-3H3.5C2.7 13 2 12.3 2 11.5v-8Z" fill="white" fillOpacity=".9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full flex items-center justify-center" style={{ background: '#22C55E' }}>
                  <span className="w-2 h-2 rounded-full bg-white" />
                </span>
              </div>
              <div className="flex-1">
                <p className="font-display text-sm font-extrabold text-white">Live Chat</p>
                <p className="font-body text-[10px]" style={{ color: '#22C55E' }}>Online now · avg. 3 min wait</p>
              </div>
            </div>
            <p className="font-body text-xs text-text-muted leading-relaxed">
              Chat with a real support agent. Best for urgent account issues and payment problems.
            </p>
            <button onClick={handleStartChat}
              className="w-full h-12 rounded-[--radius-xl] font-body text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{ background: 'var(--gradient-primary)' }}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <path d="M1.5 3C1.5 2.2 2.2 1.5 3 1.5h9c.8 0 1.5.7 1.5 1.5v7c0 .8-.7 1.5-1.5 1.5H9L7.5 13.5 6 11.5H3c-.8 0-1.5-.7-1.5-1.5V3Z" fill="white" fillOpacity="0.85" />
              </svg>
              Start Live Chat
            </button>
          </div>
        </div>

        {/* Topic selector */}
        <div>
          <p className="font-body text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">What do you need help with?</p>
          <div className="flex flex-wrap gap-2">
            {TOPICS.map(t => (
              <button key={t} onClick={() => setSelectedTopic(t === selectedTopic ? '' : t)}
                className="h-8 px-3.5 rounded-full font-body text-xs font-semibold transition-all"
                style={{ background: selectedTopic === t ? 'rgba(0,102,255,0.14)' : 'rgba(175,197,255,0.06)', border: `1px solid ${selectedTopic === t ? 'rgba(0,102,255,0.4)' : 'rgba(175,197,255,0.12)'}`, color: selectedTopic === t ? '#7CAFFF' : 'rgba(175,197,255,0.55)' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(63,231,255,0.1)', border: '1px solid rgba(63,231,255,0.22)' }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke="#3FE7FF" strokeWidth="1.1" />
                  <path d="M1.5 5.5l6.5 4.5L14.5 5.5" stroke="#3FE7FF" strokeWidth="1.1" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-text">Email Support</p>
                <p className="font-body text-[10px] text-text-muted">support@changeaipay.com</p>
              </div>
            </div>
            {emailSent ? (
              <div className="flex items-center gap-2 h-10 px-3.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3.5 3.5 5.5-5.5" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <p className="font-body text-xs font-semibold" style={{ color: '#22C55E' }}>Email drafted — your mail app will open</p>
              </div>
            ) : (
              <button onClick={handleSendEmail} disabled={sendingEmail}
                className="w-full h-10 rounded-[--radius-xl] font-body text-xs font-semibold transition-all active:scale-[0.97] disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ background: 'rgba(63,231,255,0.08)', border: '1px solid rgba(63,231,255,0.2)', color: '#3FE7FF' }}>
                {sendingEmail ? <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="rgba(63,231,255,0.2)" strokeWidth="1.3" /><path d="M6.5 1.5a5 5 0 0 1 5 5" stroke="#3FE7FF" strokeWidth="1.3" strokeLinecap="round" /></svg> : 'Send Email'}
              </button>
            )}
          </div>
        </div>

        {/* Phone */}
        <div className="rounded-[--radius-2xl] overflow-hidden"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(153,69,255,0.1)', border: '1px solid rgba(153,69,255,0.22)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3.5 2.5c.3-.3.8-.3 1.1 0l2.1 2.1c.3.3.3.8 0 1.1L5.5 6.9c.8 1.5 2.1 2.8 3.6 3.6l1.2-1.2c.3-.3.8-.3 1.1 0l2.1 2.1c.3.3.3.8 0 1.1l-1 1C10 15 5 13 2.5 8L1.5 5c-.3-.8.1-1.3.6-1.7l1.4-1Z" stroke="#9945FF" strokeWidth="1.1" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold text-text">Phone Support</p>
              <p className="font-body text-[10px] text-text-muted">1-800-CHANGE-AI · Mon–Fri, 9am–6pm ET</p>
            </div>
            <a href="tel:+18002426243"
              className="h-9 px-3.5 rounded-[--radius-xl] flex items-center font-body text-xs font-semibold transition-all"
              style={{ background: 'rgba(153,69,255,0.1)', border: '1px solid rgba(153,69,255,0.25)', color: '#9945FF' }}>
              Call
            </a>
          </div>
        </div>

        {/* Response time notice */}
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <circle cx="6.5" cy="6.5" r="5" stroke="rgba(175,197,255,0.3)" strokeWidth="1" />
            <path d="M6.5 4v2.5l1.5 1.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-[10px] text-text-muted">Chat: ~3 min · Email: 4–8 hours · Phone: business hours only</p>
        </div>
      </div>
    </div>
  )
}
