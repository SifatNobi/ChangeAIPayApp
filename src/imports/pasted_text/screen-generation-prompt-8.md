PROJECT: ChangeAIPay — AI-Native Fintech Super App

SCREEN GENERATION — PROMPT 8

IMPORTANT

Continue from Prompt 1 (foundation) and all previously generated screens (01–51). Do NOT recreate any tokens, components, the Pulse signature, or any prior screen.

STANDING RULE (permanent): fixed 390×844 iPhone portrait frame, native status bar in-frame, minimum 44×44pt touch targets. Rich glassmorphism and tactile click/press feedback throughout — Pulse and the typography contrast remain the signature differentiators underneath.

BRAND RULE (permanent): NEVER use a Visa, Mastercard, or any card-network logo anywhere in this app. Wherever a card-like affordance, balance card, or payment visual needs a mark, use the official uploaded ChangeAIPay logo — or no card-brand mark at all.

Pulse plays legitimately on Screen 57 (payment success). Screens 58 (Failed) and 59 (Pending) do NOT use Pulse.

==================================================
PART A — RETROACTIVE FIXES (do not regenerate or change anything else on these screens)
==================================================

FIX 1 — Card-network logo sweep (Screens 01–51)
Check every screen from 01 through 51 for a Visa, Mastercard, or any card-network logo on any balance card, payment method display, or checkout element. Replace each instance with the official uploaded ChangeAIPay logo — or remove the brand mark entirely if that reads cleaner.

FIX 2 — Progress header percentage (Standard Progress Header component + Screens 27–31)
Change the calculation from (current step − 1) ÷ total to current step ÷ total: Step 1 of 5 = 20%, Step 2 = 40%, Step 3 = 60%, Step 4 = 80%, Step 5 = 100%. Fix at the component level, confirmed across Screens 27–31.

FIX 3 — Floating action navbar smoothness (every screen using the bottom nav)
The bottom navigation must behave as a genuinely floating action navbar: floating above content, not docked or flush. Confirm smooth show/hide behavior and spring-based icon transitions — no jank.

FIX 4 — Transaction Limit Reached (Screen 43) rebuilt: no more hard block
Replace "Monthly Limit Reached — Upgrade to continue sending" entirely:
• In-app ChangeAIPay-to-ChangeAIPay transfers (Nano-to-Nano) are ALWAYS free, never blocked, regardless of volume.
• Past $400/month on transfers leaving the ChangeAIPay network (bank, another payment app, etc.), continue at ~1.5% — never blocked.
• Past $400/month cross-border, continue at ~1.75% — never blocked.
• Both rates disclosed inline before confirming.
Screen 43 becomes: plain explanation of the allowance used, the applicable continue-at-fee rate, and two CTAs — "Continue with standard fee" and "Upgrade to Edge."

FIX 5 — Balance card top-right icon cluster (Screens 38, 39)
Separate the overlapping top-right icons (balance-visibility toggle, ChangeAIPay logo mark, additional icon) into individually spaced 44×44pt tap targets — no overlapping circular badges, standard fintech-app spacing.

FIX 6 — AI Suggestions Widget (Screen 48) made one-tap actionable
Currently a passive suggestion card. Upgrade so each of Fina's suggestions carries a direct one-tap action — e.g. "Move $50 to avoid a low-balance dip," "Flag this recurring charge" — resolved in place, not just a link into chat. Matches how leading AI-native fintech products now surface proactive actions rather than requiring a conversation.

Layout, copy, and every other element on these screens stays exactly as already generated except what's described in each fix above.

==================================================
PART B — GENERATE THESE NEW SCREENS
==================================================

SCREEN 52
Payments Hub
• Central entry point: Send, Request, Add Money, Split Bill, Pay Bills action tiles
• Recent contacts / quick-send row
• Recent payment activity preview list
• Search bar entry point

--------------------------------------------------

SCREEN 53
Send
• Choose recipient method: ChangeAIPay contact, phone number, email, bank account (domestic/international)
• Routes to Contact Picker or a manual entry form depending on selection

--------------------------------------------------

SCREEN 54
Contact Picker
• Searchable contact list (synced or manually added), recent recipients section
• Add New Recipient option
• Verified/unverified badge per contact

--------------------------------------------------

SCREEN 55
Amount
• Numeric keypad entry, currency selector for cross-border sends
• Real-time fee/FX preview
• Over the $400/mo off-network or cross-border allowance routes to the rebuilt Transaction Limit Reached (43) — in-app sends never trigger this
• Optional note field, Continue button

--------------------------------------------------

SCREEN 56
Confirmation
• Full review: recipient, amount, fee, total, estimated arrival time
• Requires biometric or PIN re-authentication before finalizing
• Edit links back to prior steps
• Confirm & Send button

--------------------------------------------------

SCREEN 57
Success
• Pulse plays here — payment completing successfully
• Standard success system layered with Pulse: checkmark, transaction receipt summary
• Share Receipt, Done actions
• Option to add recipient to favorites
• Private reaction: recipient can send a quick reaction/"Thanks!" back to the sender — visible ONLY to the two parties involved, never a public feed or activity stream. This is a deliberate contrast to Venmo's public-by-default model.

--------------------------------------------------

SCREEN 58
Failed
• Clear, specific reason: insufficient funds, network error, recipient account issue, fraud hold
• Retry, Contact Support, Cancel actions
• Explicit reassurance that funds were not deducted
• No Pulse

--------------------------------------------------

SCREEN 59
Pending
• States why plainly (bank settlement time, cross-border compliance check, first-time large-transfer review)
• Estimated completion time, Notify Me toggle
• No Pulse

--------------------------------------------------

SCREEN 60
Receive
• Generate a payment request: shareable link, QR code preview
• Requested amount + optional note
• Share via contact, message, or copy link
• Shareable @handle: each user has a unique handle (e.g. @mayapatel) that generates a personal receive link — a privacy-safe growth loop, revealing a handle rather than any account identifier
• Any card/balance visual uses the ChangeAIPay logo per the brand rule — no card-network mark

==================================================
GLOBAL REQUIREMENTS
==================================================

Reuse only components/tokens from Prompt 1. Full Auto Layout, accessibility, and prototyping for every new screen.

Do NOT generate any additional screens beyond Part A's fixes and Screens 52–60.

STOP after completing Part A and Screen 60.