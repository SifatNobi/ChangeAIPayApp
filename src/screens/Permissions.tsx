interface PermissionsProps {
  onComplete: () => void
  onBack: () => void
}

/* ── Illustrations (reused from original Screen 07) ─────────────── */
function NotifIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="24" fill="rgba(0,102,255,0.12)" stroke="rgba(0,102,255,0.25)" strokeWidth="1" />
      <path d="M28 12v2.5M20 22A8 8 0 0 1 36 22v7l3 4H25l-5 0 3-4V22Z"
        stroke="rgba(63,231,255,0.75)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.5 36a4.5 4.5 0 0 0 9 0" stroke="rgba(63,231,255,0.5)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="38" cy="17" r="4.5" fill="#FF4D5A" />
    </svg>
  )
}

function CameraIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="24" fill="rgba(63,231,255,0.08)" stroke="rgba(63,231,255,0.22)" strokeWidth="1" />
      <rect x="14" y="20" width="28" height="20" rx="4" stroke="rgba(63,231,255,0.7)" strokeWidth="1.4" />
      <path d="M38 20v-3.5l5 3.5" stroke="rgba(63,231,255,0.4)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="28" cy="30" r="6" stroke="rgba(63,231,255,0.6)" strokeWidth="1.4" />
      <circle cx="28" cy="30" r="2.5" fill="rgba(63,231,255,0.25)" />
    </svg>
  )
}

function ContactsIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="24" fill="rgba(153,69,255,0.08)" stroke="rgba(153,69,255,0.22)" strokeWidth="1" />
      <circle cx="23" cy="23" r="5" stroke="rgba(63,231,255,0.65)" strokeWidth="1.4" fill="rgba(63,231,255,0.08)" />
      <path d="M13 40c0-5.5 4.5-10 10-10" stroke="rgba(63,231,255,0.4)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="34" cy="24" r="4.5" stroke="rgba(175,197,255,0.5)" strokeWidth="1.4" fill="rgba(175,197,255,0.06)" />
      <path d="M43 40c0-5.5-4-9.5-9-9.5" stroke="rgba(175,197,255,0.3)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="43" cy="38" r="4" fill="rgba(0,102,255,0.18)" stroke="rgba(0,102,255,0.45)" strokeWidth="1" />
      <path d="M40.5 38h5M43 35.5v5" stroke="#3FE7FF" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

function LocationIllustration() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <circle cx="28" cy="28" r="24" fill="rgba(0,102,255,0.10)" stroke="rgba(0,102,255,0.22)" strokeWidth="1" />
      <circle cx="28" cy="26" r="11" stroke="rgba(0,102,255,0.2)" strokeWidth="1" />
      <circle cx="28" cy="26" r="17" stroke="rgba(0,102,255,0.12)" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M28 14c-4.4 0-8 3.6-8 8 0 6 8 15 8 15s8-9 8-15c0-4.4-3.6-8-8-8Z"
        fill="rgba(0,102,255,0.12)" stroke="rgba(63,231,255,0.65)" strokeWidth="1.4" />
      <circle cx="28" cy="22" r="2.5" fill="rgba(63,231,255,0.55)" />
    </svg>
  )
}

const CONTEXTUAL_PERMISSIONS = [
  {
    id: 'camera',
    label: 'Camera',
    trigger: 'First time you open Scan QR or reach ID Capture during KYC',
    screens: '62 · 29',
    illustration: <CameraIllustration />,
    privacy: 'Camera is only accessed when you initiate document scanning or KYC verification. Never accessed in the background.',
    accentColor: 'rgba(63,231,255,0.7)',
    accentBg: 'rgba(63,231,255,0.06)',
    accentBorder: 'rgba(63,231,255,0.15)',
  },
  {
    id: 'contacts',
    label: 'Contacts',
    trigger: 'First time you open Contact Picker to send money',
    screens: '54',
    illustration: <ContactsIllustration />,
    privacy: 'Contacts are stored locally and never uploaded to our servers. Matching is done on-device.',
    accentColor: 'rgba(153,69,255,0.7)',
    accentBg: 'rgba(153,69,255,0.06)',
    accentBorder: 'rgba(153,69,255,0.18)',
  },
  {
    id: 'location',
    label: 'Location',
    trigger: 'First time you use a location-dependent feature',
    screens: '—',
    illustration: <LocationIllustration />,
    privacy: 'Precise location is never stored. Approximate location only, to detect unusual account activity.',
    accentColor: 'rgba(0,102,255,0.7)',
    accentBg: 'rgba(0,102,255,0.06)',
    accentBorder: 'rgba(0,102,255,0.18)',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    trigger: 'Immediately after your first successful payment',
    screens: '57',
    illustration: <NotifIllustration />,
    privacy: "We only send what matters — payment confirmations, security alerts, and Fina's financial insights. No spam, ever.",
    accentColor: 'rgba(245,183,0,0.7)',
    accentBg: 'rgba(245,183,0,0.06)',
    accentBorder: 'rgba(245,183,0,0.18)',
  },
]

export default function Permissions({ onComplete, onBack }: PermissionsProps) {
  return (
    <div className="flex flex-col bg-bg relative overflow-hidden" style={{ minHeight: 785 }}>

      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-0 shrink-0">
        <button
          onClick={onBack}
          className="w-11 h-11 flex items-center justify-center rounded-full shrink-0"
          style={{ background: 'rgba(175,197,255,0.06)', border: '1px solid rgba(175,197,255,0.1)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15l-5-5 5-5" stroke="rgba(175,197,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex-1" />
        {/* Retired badge */}
        <div
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(245,183,0,0.07)', border: '1px solid rgba(245,183,0,0.2)' }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#F5B700' }} />
          <p className="font-body text-[9px] font-bold uppercase tracking-widest" style={{ color: '#F5B700' }}>
            07 · Retired
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5" style={{ scrollbarWidth: 'none' }}>

        {/* Title */}
        <div className="pt-4 flex flex-col gap-2">
          <p className="font-display text-xl font-extrabold text-text tracking-tight">
            Permissions on Demand
          </p>
          <p className="font-body text-sm text-text-muted leading-relaxed">
            Permissions are no longer requested upfront during onboarding. Each one triggers automatically the moment you first use the feature that needs it.
          </p>
        </div>

        {/* Rule callout */}
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-[--radius-xl]"
          style={{ background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.18)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
            <path d="M8 2L3 4v5c0 3.5 2.5 5.5 5 6 2.5-.5 5-2.5 5-6V4L8 2Z"
              stroke="#22C55E" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M5.5 8l2 2 3-3" stroke="#22C55E" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="font-body text-xs text-text-muted leading-relaxed">
            <span className="font-semibold text-text">Biometrics</span> is unaffected — Screen 13 (Enable Biometrics) stays as account-security setup during onboarding.
          </p>
        </div>

        {/* Permission cards */}
        <div className="flex flex-col gap-3">
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Contextual triggers
          </p>
          {CONTEXTUAL_PERMISSIONS.map(perm => (
            <div
              key={perm.id}
              className="rounded-[--radius-2xl] overflow-hidden"
              style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}
            >
              {/* Top row */}
              <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div
                  className="w-14 h-14 rounded-[16px] flex items-center justify-center shrink-0"
                  style={{ background: perm.accentBg, border: `1px solid ${perm.accentBorder}` }}
                >
                  {perm.illustration}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body text-sm font-bold text-text">{perm.label}</p>
                  <p className="font-body text-[10px] text-text-muted leading-relaxed mt-0.5">
                    {perm.trigger}
                  </p>
                </div>
              </div>
              {/* Trigger location */}
              <div
                className="mx-4 mb-3 flex items-center gap-2 px-3 py-2 rounded-[--radius-xl]"
                style={{ background: perm.accentBg, border: `1px solid ${perm.accentBorder}` }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <rect x="1" y="1" width="8" height="8" rx="1.5" stroke={perm.accentColor} strokeWidth="1" />
                  <path d="M3 1v1.5M7 1v1.5M1 4h8" stroke={perm.accentColor} strokeWidth="1" strokeLinecap="round" />
                </svg>
                <p className="font-body text-[9px]" style={{ color: perm.accentColor }}>
                  Screen {perm.screens}
                </p>
              </div>
              {/* Privacy note */}
              <div
                className="mx-4 mb-4 flex items-start gap-2 px-3 py-2.5 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.08)' }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 mt-0.5">
                  <path d="M6 1.5L1.5 3v4c0 2.6 1.9 4.1 4.5 4.5 2.6-.4 4.5-1.9 4.5-4.5V3L6 1.5Z"
                    stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinejoin="round" />
                  <path d="M4 6l1.5 1.5 2.5-2.5" stroke="rgba(175,197,255,0.4)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-body text-[9px] text-text-muted leading-relaxed">{perm.privacy}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* CTA */}
      <div className="px-5 pb-10 shrink-0">
        <button
          onClick={onComplete}
          className="w-full h-14 rounded-[--radius-2xl] font-body text-sm font-semibold text-white flex items-center justify-center transition-all active:scale-[0.98]"
          style={{ background: 'var(--gradient-primary)', boxShadow: '0 4px 20px rgba(0,102,255,0.25)' }}
        >
          Got it
        </button>
      </div>
    </div>
  )
}
