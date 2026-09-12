import { useState } from 'react'
import AuthHeader from '@/components/AuthHeader'

interface Contact {
  id: string
  name: string
  handle: string
  initials: string
  color: string
  verified: boolean
  recent?: boolean
}

interface ContactPickerProps {
  onSelect?: (contact: Contact) => void
  onAddNew?: () => void
  onBack?: () => void
}

const CONTACTS: Contact[] = []

export default function ContactPicker({ onSelect, onAddNew, onBack }: ContactPickerProps) {
  const [query, setQuery] = useState('')

  const filtered = query.trim()
    ? CONTACTS.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.handle.toLowerCase().includes(query.toLowerCase())
      )
    : CONTACTS

  const recent = CONTACTS.filter(c => c.recent)
  const showRecent = !query.trim()

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      <div className="px-5 pt-4">
        <AuthHeader title="Choose Recipient" onBack={onBack} />
      </div>

      {/* Search */}
      <div className="px-5 mt-4 mb-3">
        <div
          className="flex items-center gap-2 h-11 px-4 rounded-[--radius-2xl]"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.12)' }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text-muted shrink-0">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M10 10l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Name, @handle, or phone…"
            className="flex-1 bg-transparent font-body text-sm text-text placeholder-text-muted outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="w-5 h-5 flex items-center justify-center">
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="rgba(175,197,255,0.4)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto pb-8 flex-1" style={{ scrollbarWidth: 'none' }}>
        {/* Add new */}
        <button
          onClick={onAddNew}
          className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-surface-hi transition-colors"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: 'rgba(0,102,255,0.1)', border: '1.5px dashed rgba(0,102,255,0.4)' }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 2v10M2 7h10" stroke="#0066FF" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-body text-sm font-semibold text-accent">Add New Recipient</p>
        </button>

        <div className="h-px mx-5" style={{ background: 'var(--color-border)' }} />

        {/* Recent section */}
        {showRecent && (
          <>
            <p className="font-body text-[10px] font-semibold text-text-muted uppercase tracking-wider px-5 pt-4 pb-2">Recent</p>
            {recent.map(c => <ContactRow key={c.id} contact={c} onSelect={() => onSelect?.(c)} />)}
            <p className="font-body text-[10px] font-semibold text-text-muted uppercase tracking-wider px-5 pt-4 pb-2">All Contacts</p>
          </>
        )}

        {/* Contacts list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 px-6">
            <p className="font-body text-sm text-text-muted text-center">No contacts found for "{query}"</p>
          </div>
        ) : (
          filtered.map(c => <ContactRow key={c.id} contact={c} onSelect={() => onSelect?.(c)} />)
        )}
      </div>
    </div>
  )
}

function ContactRow({ contact: c, onSelect }: { contact: Contact; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-surface-hi transition-colors active:scale-[0.99] text-left"
    >
      <div className="relative shrink-0">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-body text-sm font-bold text-white"
          style={{ background: `linear-gradient(135deg, ${c.color}cc, ${c.color}44)` }}
        >
          {c.initials}
        </div>
        {c.verified && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
            style={{ background: '#22C55E', border: '2px solid var(--color-bg)' }}
          >
            <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
              <path d="M1 3.5l2 2 3-3" stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-semibold text-text truncate">{c.name}</p>
        <div className="flex items-center gap-1.5">
          <p className="font-mono text-xs text-text-muted">{c.handle}</p>
          {!c.verified && (
            <span className="font-body text-[9px] text-warning">· Unverified</span>
          )}
        </div>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke="rgba(175,197,255,0.3)" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </button>
  )
}
