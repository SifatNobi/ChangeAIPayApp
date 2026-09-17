PROJECT: ChangeAIPay — Real-World Trust & Safety Gaps (NEW SCREENS)

IMPORTANT
Do NOT redesign the application. Everything below is additive only, using the exact existing visual system. Every screen must be fully functional, not a static mockup. Every screen must show a genuine, clean empty state for a brand-new account with no history — never fabricated/mock data of any kind.

==================================================
1. CONDUCT / QUALITY COMPLAINT (extends the existing Payment Dispute Center)
==================================================

Real pain point: a customer receives a torn/damaged note or experiences rude/inappropriate behavior during an in-person transaction, and today has no way to flag it or warn others — and merchants face the same problem with bad customers, with no recourse either.

Do NOT build a public accusation wall. Extend the existing Dispute Center (File a Dispute / Respond to Dispute / Dispute Status) with a second complaint type alongside the existing payment-amount dispute:

- On File a Dispute (reached from Transaction Detail 81, consumer or merchant side), add a category selector: "Payment Issue" (existing) or "Conduct/Quality Issue" (new) — the latter covers damaged currency received in person, inappropriate language, or other conduct problems.
- Conduct complaints require description text and allow optional photo/video evidence upload, stored privately for review — never displayed publicly, never attached to a public profile.
- Respond to Dispute (the other party's screen) gets the matching conduct-complaint view, with the same right-of-reply the payment-dispute flow already has.
- Dispute Status stays private to the two parties and ChangeAIPay support only.
- No facial recognition or identity-matching is ever run against uploaded photos/video — this is evidence for human review only.

==================================================
2. TRUST PROFILE — SHOWN BEFORE SENDING MONEY
==================================================

Real pain point: users routinely send money to strangers (marketplace sellers, new contacts) with no way to gauge if the recipient is trustworthy.

New element on Contact Picker (54) and any recipient-confirmation step: a Trust Profile summary — account age ("Verified member since [date]"), KYC-verified badge, and an aggregate conduct signal built ONLY from complaints that have been resolved through the process in Fix 1 (e.g., "No resolved conduct issues" or "X resolved issues in the past 12 months"). Never shows individual complaint content, evidence, or the identity of who filed it. For a brand-new or clean account, this must show a neutral "No conduct history" state — never a fabricated positive score.

Do not describe this score as "AI-verified" or imply predictive fraud detection — it is a factual count of resolved cases, stated plainly.

==================================================
3. MISTAKEN PAYMENT RECOVERY REQUEST
==================================================

Real pain point: sending to the wrong handle/contact with no way to get it back — one of the most common P2P-payment complaints that exist.

New screen reached from Transaction Detail (81): "Sent to the wrong person?" — lets the sender submit a formal request for the recipient to voluntarily return a payment sent in error. The recipient gets a notification with a one-tap "Return Funds" action. This is explicitly NOT a forced reversal — ChangeAIPay cannot unilaterally pull funds from another user's account — and the screen's copy must say so clearly. Status tracker: Requested / Returned / Declined.

==================================================
4. WHY WAS THIS FLAGGED? (Consumer-side transparency)
==================================================

Real pain point: accounts/transactions get frozen with a generic "suspicious activity" message and no path to a human, no explanation — one of the most common fintech complaints that exists.

Extend the existing Risk & Fraud Center pattern (currently merchant-only) to consumers: when a consumer transaction or account gets held, a new screen shows the specific reason (not a generic message) and a clear appeal path with a stated response-time commitment, reached from a notification when a hold occurs.

==================================================
5. NEW-RECIPIENT CAUTION MOMENT (not a new screen — a state addition)
==================================================

Real pain point: scam payments to first-time recipients, especially large amounts.

Within the existing Send (53) / Amount (55) flow: when a user sends a first-time, unusually large payment to a brand-new recipient, show a brief non-blocking caution moment ("First time sending to this person — take a moment to confirm you know them") with the Trust Profile from Fix 2 surfaced inline, before final confirmation. Does not block or delay the payment — purely an awareness nudge.

==================================================
EXPLICITLY NOT BUILT — AND WHY
==================================================

- A public wall of accusations with photos/names of accused merchants or customers: real defamation, harassment, and right-of-publicity risk regardless of whether the underlying claim is true — resolved-complaint aggregation into the Trust Profile achieves the same protective goal without that liability.
- Facial recognition or identity-matching on uploaded evidence: this would be a BIPA-style biometric-consent problem on top of everything else — evidence stays for human review only.
- Forced payment reversal for mistaken payments: ChangeAIPay cannot unilaterally move funds out of another user's account without their authorization — the recovery request is voluntary by design.
- Predictive AI fraud scoring on the Trust Profile: an unproven "AI risk score" claim is exactly the kind of capability claim that gets companies sued (see the AI-overclaiming item in your legal-risk checklist) — the Trust Profile stays a plain factual count.

==================================================
LEGAL/COMPLIANCE CROSS-CHECK
==================================================

- Photo/video evidence uploads (Fix 1) need the same content takedown-request path already required elsewhere for public uploads, plus encrypted storage and access controls — flag the actual encryption/access-control implementation as a backend/OpenCode task, not Figma scope.
- No public display of evidence means no additional age-gating or alt-text burden beyond what's already required app-wide.
- Trust Profile copy must avoid "AI-powered" language per the existing AI-capability copy audit rule already in place.

==================================================
GLOBAL REQUIREMENTS
==================================================

Test the Conduct Complaint flow end-to-end (File → Respond → Status) with realistic but clearly-marked test data, not fabricated production-looking numbers. Confirm Trust Profile shows a genuine empty/neutral state for a brand-new account and updates correctly only after a complaint is actually resolved. Confirm the Mistaken Payment Recovery Request never auto-completes a return without the recipient's explicit action. Confirm nothing here alters any existing screen beyond what's explicitly specified.

STOP after all items are built, integrated, and verified.