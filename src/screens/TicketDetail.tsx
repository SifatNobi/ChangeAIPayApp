import { useState } from 'react'

type TicketStatus = 'open' | 'in_progress' | 'pending_user' | 'resolved' | 'closed'
type MessageSender = 'user' | 'agent' | 'system'

interface TicketMessage {
  id: string
  sender: MessageSender
  text: string
  agentName?: string
  time: string
  date: string
}

const STATUS_CFG: Record<TicketStatus, { label: string; color: string; bg: string; border: string }> = {
  open: { label: 'Open', color: '#4D9FFF', bg: 'rgba(0,102,255,0.08)', border: 'rgba(0,102,255,0.2)' },
  in_progress: { label: 'In Progress', color: '#F5B700', bg: 'rgba(245,183,0,0.08)', border: 'rgba(245,183,0,0.2)' },
  pending_user: { label: 'Awaiting you', color: '#FF9F43', bg: 'rgba(255,159,67,0.08)', border: 'rgba(255,159,67,0.2)' },
  resolved: { label: 'Resolved', color: '#22C55E', bg: 'rgba(34,197,94,0.08)', border: 'rgba(34,197,94,0.2)' },
  closed: { label: 'Closed', color: 'rgba(175,197,255,0.5)', bg: 'rgba(175,197,255,0.05)', border: 'rgba(175,197,255,0.12)' },
}

const INITIAL_MESSAGES: TicketMessage[] = []

interface TicketDetailProps {
  ticketId?: string
  onBack?: () => void
  onResolved?: () => void
}

export default function TicketDetail({ ticketId = '', onBack, onResolved }: TicketDetailProps) {
  const [messages, setMessages] = useState<TicketMessage[]>([])
  const [reply, setReply] = useState('')
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<TicketStatus>('pending_user')

  const statusCfg = STATUS_CFG[status]

  const sendReply = () => {
    if (!reply.trim() || sending) return
    setSending(true)
    const msg: TicketMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: reply.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      date: 'Today',
    }
    setMessages(prev => [...prev, msg])
    setReply('')
    setTimeout(() => {
      setSending(false)
      setStatus('in_progress')
      const ack: TicketMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: "Thanks for your reply. I've noted this and will follow up shortly. If the payment has completed successfully on your end, you can mark this ticket as resolved.",
        agentName: 'Jordan · Payments',
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        date: 'Today',
      }
      setMessages(prev => [...prev, ack])
    }, 2000)
  }

  const grouped: Record<string, TicketMessage[]> = {}
  messages.forEach(m => {
    if (!grouped[m.date]) grouped[m.date] = []
    grouped[m.date].push(m)
  })

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
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-display text-sm font-extrabold text-text tracking-tight">{ticketId}</p>
            <span className="px-2 py-0.5 rounded-full font-body text-[9px] font-bold uppercase tracking-wider shrink-0"
              style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.border}` }}>
              {statusCfg.label}
            </span>
          </div>
          <p className="font-body text-[10px] text-text-muted truncate">Payment declined — $250 transfer</p>
        </div>
      </div>

      {/* Ticket meta */}
      <div className="mx-5 mb-4 px-4 py-3 rounded-[--radius-xl] shrink-0"
        style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Category', value: 'Payments' },
            { label: 'Priority', value: 'High' },
            { label: 'Opened', value: 'Sep 1, 2026' },
            { label: 'Assigned to', value: 'Jordan · Payments' },
          ].map((f, i) => (
            <div key={i}>
              <p className="font-body text-[9px] text-text-muted uppercase tracking-wider">{f.label}</p>
              <p className="font-body text-xs text-text font-medium mt-0.5">{f.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto px-5 pb-4 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: 'rgba(175,197,255,0.08)' }} />
              <p className="font-body text-[9px] text-text-muted shrink-0">{date}</p>
              <div className="flex-1 h-px" style={{ background: 'rgba(175,197,255,0.08)' }} />
            </div>

            {msgs.map(msg => {
              if (msg.sender === 'system') {
                return (
                  <div key={msg.id} className="flex justify-center">
                    <div className="max-w-[85%] px-3 py-2 rounded-[--radius-xl]"
                      style={{ background: 'rgba(175,197,255,0.05)', border: '1px solid rgba(175,197,255,0.1)' }}>
                      <p className="font-body text-[10px] text-text-muted text-center leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                )
              }

              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[80%] flex flex-col gap-1 items-end">
                      <div className="px-4 py-3 rounded-[20px_20px_4px_20px]"
                        style={{ background: 'linear-gradient(135deg, #0066FF, #4D9FFF)', boxShadow: '0 2px 10px rgba(0,102,255,0.2)' }}>
                        <p className="font-body text-sm text-white leading-relaxed">{msg.text}</p>
                      </div>
                      <p className="font-body text-[9px] text-text-muted">{msg.time}</p>
                    </div>
                  </div>
                )
              }

              return (
                <div key={msg.id} className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: 'rgba(245,183,0,0.1)', border: '1px solid rgba(245,183,0,0.2)' }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="4.5" r="2" stroke="#F5B700" strokeWidth="1" />
                      <path d="M1.5 10.5c0-2 2-3.5 4.5-3.5s4.5 1.5 4.5 3.5" stroke="#F5B700" strokeWidth="1" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="flex-1 max-w-[78%] flex flex-col gap-1">
                    {msg.agentName && (
                      <p className="font-body text-[9px] font-semibold" style={{ color: '#F5B700' }}>{msg.agentName}</p>
                    )}
                    <div className="px-4 py-3 rounded-[4px_20px_20px_20px]"
                      style={{ background: 'rgba(245,183,0,0.05)', border: '1px solid rgba(245,183,0,0.14)' }}>
                      <p className="font-body text-sm text-text leading-relaxed">{msg.text}</p>
                    </div>
                    <p className="font-body text-[9px] text-text-muted">{msg.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        {/* Resolve prompt */}
        {status === 'pending_user' && (
          <button onClick={onResolved}
            className="flex items-center gap-3 px-4 py-3.5 rounded-[--radius-xl] w-full text-left transition-all active:scale-[0.97]"
            style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.2)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'rgba(34,197,94,0.1)' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7l4 4 6-7" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-body text-sm font-semibold" style={{ color: '#22C55E' }}>Mark as resolved</p>
              <p className="font-body text-[10px] text-text-muted">If your issue has been fixed, confirm it here</p>
            </div>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 3l4 4-4 4" stroke="rgba(34,197,94,0.5)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Reply box */}
      <div className="px-5 pb-6 pt-2 shrink-0"
        style={{ borderTop: '1px solid rgba(175,197,255,0.07)' }}>
        <div className="flex items-end gap-2">
          <textarea
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none px-4 py-3 rounded-[--radius-xl] resize-none"
            style={{
              background: 'rgba(175,197,255,0.05)',
              border: '1px solid rgba(175,197,255,0.12)',
              minHeight: 48,
              maxHeight: 96,
            }}
            placeholder="Add a reply..."
            value={reply}
            onChange={e => setReply(e.target.value)}
          />
          <button
            onClick={sendReply}
            disabled={!reply.trim() || sending}
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all mb-0.5"
            style={{
              background: reply.trim() && !sending ? 'linear-gradient(135deg, #0066FF, #4D9FFF)' : 'rgba(175,197,255,0.08)',
              opacity: reply.trim() && !sending ? 1 : 0.5,
            }}>
            {sending ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
