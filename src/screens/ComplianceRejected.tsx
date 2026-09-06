// =============================================================================
// COMPLIANCE & LEGAL REVIEW REQUIRED BEFORE PRODUCTION USE
//
// The copy in this file is PLACEHOLDER WORDING written for design and
// prototyping purposes only. It has NOT been reviewed by a compliance officer,
// legal counsel, or regulatory specialist.
//
// Before this screen is deployed to any production or staging environment:
//   1. All body text and headings must be reviewed and approved by legal/compliance.
//   2. The exact reason codes, appeal timelines, and restriction language must
//      reflect applicable regulations (AML/CFT, FCA, FinCEN, etc.) for each
//      operating jurisdiction.
//   3. The appeal process URL, email address, and SLA windows are PLACEHOLDERS
//      and must be replaced with real, legally accurate information.
//   4. Account restriction vs. closure language must match what is contractually
//      and legally enforceable for the specific case type.
//
// DO NOT SHIP THIS SCREEN AS-IS. This notice must be removed by the engineering
// team only after sign-off from legal/compliance has been obtained and documented.
// =============================================================================

type RejectionOutcome = 'appeal_available' | 'restriction' | 'closure'

interface ComplianceRejectedProps {
  onAppeal?: () => void
  onContactSupport?: () => void
  onAcknowledge?: () => void
  caseRef?: string
  resolvedAt?: string
  outcome?: RejectionOutcome
}

const OUTCOME_CFG: Record<RejectionOutcome, {
  headline: string
  body: string
  restriction: string
  nextSteps: { label: string; detail: string }[]
}> = {
  appeal_available: {
    headline: 'Verification could not be completed',
    body: "After reviewing your submission, our compliance team was unable to verify the information provided. This does not necessarily mean a permanent restriction — you have the right to appeal this decision.",
    restriction: 'Certain account features remain limited while your appeal is pending.',
    nextSteps: [
      { label: 'Submit an appeal', detail: 'You have 30 days from today to formally appeal this decision. Provide any additional documentation that may not have been included in your original submission.' },
      { label: 'Contact support', detail: "Our compliance support team can explain what specific information was missing or insufficient, within the limits of what we're able to disclose." },
      { label: 'Keep your account', detail: "Your account balance and transaction history are preserved. You can still receive money during the appeal process." },
    ],
  },
  restriction: {
    headline: 'Account restricted',
    body: "Following our compliance review, your account has been restricted. Certain features are no longer available. We understand this is significant, and we want to provide you with clear next steps.",
    restriction: 'Payments, withdrawals, and crypto features are currently unavailable. You can still access your balance and transaction history.',
    nextSteps: [
      { label: 'Contact us to discuss', detail: 'You can contact our compliance team within 60 days to discuss your case. Provide reference number ' + 'CLR-XXXX' + ' in all correspondence.' },
      { label: 'Withdraw your balance', detail: 'Despite the restriction, you are entitled to withdraw any existing balance to a verified bank account. Contact support to arrange this.' },
      { label: 'Legal assistance', detail: 'If you believe this decision was made in error, you are entitled to seek independent legal advice.' },
    ],
  },
  closure: {
    headline: 'Account closure notice',
    body: "Following our compliance review, we are unable to continue providing services to your account. We recognize this is a serious outcome and provide the information below so you can take necessary action.",
    restriction: 'Your account will be closed in 30 days. During this period, outbound transfers to your verified bank account remain available.',
    nextSteps: [
      { label: 'Withdraw your funds', detail: 'Please transfer your remaining balance to a linked bank account within 30 days. After that period, funds will be held per our standard dormant account procedure.' },
      { label: 'Download your records', detail: 'You can export your full transaction history from Settings → Export Data at any time before closure.' },
      { label: 'Contact us', detail: 'If you believe this decision is in error, contact our compliance support team citing your case reference within 14 days.' },
    ],
  },
}

export default function ComplianceRejected({ onAppeal, onContactSupport, onAcknowledge, caseRef = 'CLR-20261021-4482', resolvedAt = 'Oct 26, 2026', outcome = 'appeal_available' }: ComplianceRejectedProps) {
  const cfg = OUTCOME_CFG[outcome]

  const accentColor = outcome === 'closure' ? '#F87171' : '#FF9F43'
  const accentBg = outcome === 'closure' ? 'rgba(239,68,68,0.06)' : 'rgba(255,159,67,0.06)'
  const accentBorder = outcome === 'closure' ? 'rgba(239,68,68,0.18)' : 'rgba(255,159,67,0.18)'

  return (
    <div className="flex flex-col bg-bg" style={{ minHeight: 785 }}>
      {/* No back button — this is a mandatory gate */}
      <div className="flex-1 overflow-y-auto px-5 pb-8 flex flex-col gap-5 pt-8" style={{ scrollbarWidth: 'none' }}>

        {/* PLACEHOLDER banner — visible in dev/design only */}
        <div className="flex items-start gap-2.5 px-3 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(153,69,255,0.06)', border: '1px dashed rgba(153,69,255,0.3)' }}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="shrink-0 mt-0.5">
            <path d="M6.5 1.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10z" stroke="#9945FF" strokeWidth="1" />
            <path d="M6.5 5v2.5M6.5 9v.5" stroke="#9945FF" strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-mono text-[9px] leading-relaxed" style={{ color: 'rgba(153,69,255,0.7)' }}>
            PLACEHOLDER — all copy requires compliance/legal review before production. See file header for details.
          </p>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center py-7 px-6 rounded-[--radius-2xl] text-center"
          style={{ background: accentBg, border: `1px solid ${accentBorder}` }}>
          <div className="w-18 h-18 rounded-full flex items-center justify-center mb-4"
            style={{
              background: `${accentColor}12`,
              border: `1.5px solid ${accentColor}30`,
              width: 72, height: 72,
            }}>
            {outcome === 'closure' ? (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M5 23L14 5l9 18H5z" stroke={accentColor} strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M14 13v4M14 19.5v.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <circle cx="14" cy="14" r="10" stroke={accentColor} strokeWidth="1.5" />
                <path d="M14 10v5M14 17.5v.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <p className="font-display text-xl font-extrabold text-text tracking-tight">{cfg.headline}</p>
          <p className="font-body text-sm text-text-muted mt-2 leading-relaxed">
            {cfg.body}
          </p>
          <div className="mt-4 flex items-center gap-2">
            <p className="font-body text-[10px] text-text-muted">Case: <span className="font-mono" style={{ color: accentColor }}>{caseRef}</span></p>
            <p className="font-body text-[10px] text-text-muted">· {resolvedAt}</p>
          </div>
        </div>

        {/* Restriction notice */}
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.04)', border: '1px solid rgba(175,197,255,0.1)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
            <circle cx="7" cy="7" r="5.5" stroke={accentColor} strokeWidth="1" />
            <path d="M7 5v2.5M7 9v.5" stroke={accentColor} strokeWidth="1" strokeLinecap="round" />
          </svg>
          <p className="font-body text-xs text-text-muted leading-relaxed">{cfg.restriction}</p>
        </div>

        {/* Next steps */}
        <div>
          <p className="font-body text-[10px] font-semibold uppercase tracking-wider text-text-muted mb-3">Your options</p>
          <div className="flex flex-col gap-2.5">
            {cfg.nextSteps.map((step, i) => (
              <div key={i} className="flex items-start gap-3 px-4 py-4 rounded-[--radius-xl]"
                style={{ background: 'rgba(175,197,255,0.03)', border: '1px solid rgba(175,197,255,0.09)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${accentColor}12` }}>
                  <p className="font-mono text-[9px] font-bold" style={{ color: accentColor }}>{i + 1}</p>
                </div>
                <div className="flex-1">
                  <p className="font-body text-xs font-semibold text-text mb-1">{step.label}</p>
                  <p className="font-body text-xs text-text-muted leading-relaxed">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Regulatory notice */}
        <div className="px-4 py-3 rounded-[--radius-xl]"
          style={{ background: 'rgba(175,197,255,0.02)', border: '1px solid rgba(175,197,255,0.07)' }}>
          <p className="font-body text-[10px] text-text-muted leading-relaxed">
            {/* PLACEHOLDER — jurisdiction-specific regulatory disclosure goes here */}
            ChangeAIPay is required by applicable law to conduct compliance reviews. We are unable to share all details of our review process. For regulatory complaints, you may contact the relevant financial authority in your jurisdiction. [PLACEHOLDER — replace with actual regulator and contact per jurisdiction]
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          {outcome === 'appeal_available' && (
            <button onClick={onAppeal}
              className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              style={{ background: `${accentColor}15`, color: accentColor, border: `1px solid ${accentColor}30` }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M11 9V5H7" stroke={accentColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M11 5L7 9l-4-4" stroke={accentColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Submit an appeal
            </button>
          )}
          <button onClick={onContactSupport}
            className="w-full h-[52px] rounded-[--radius-2xl] font-body text-sm font-semibold flex items-center justify-center transition-all active:scale-[0.98]"
            style={{ background: 'rgba(175,197,255,0.07)', color: 'rgba(175,197,255,0.7)', border: '1px solid rgba(175,197,255,0.12)' }}>
            Contact support
          </button>
          {outcome !== 'appeal_available' && (
            <button onClick={onAcknowledge}
              className="w-full h-11 font-body text-sm flex items-center justify-center transition-all"
              style={{ color: 'rgba(175,197,255,0.4)' }}>
              I understand
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
