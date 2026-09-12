PROJECT: ChangeAIPay — AI-Native Fintech Super App

UNIVERSAL FIX + SCREENS 247 & 248 + STYLE UPGRADES + PERMISSIONS CENTER FIX

IMPORTANT

Applies retroactively to all 246 screens, adds Screens 247 and 248, adds two style-only upgrades, adds a new in-app toolbar, and retires Screen 07's upfront permissions flow in favor of contextual triggers. Reuse only components/tokens from Prompt 1.

==================================================
UNIVERSAL INTERACTION RULES (permanent)
==================================================

1. An X always closes a modal or an entire flow. A left arrow always goes back exactly one screen.
2. Never show a blank screen while content loads — always a skeleton, spinner, or progress bar.
3. Any feed or list preserves the user's exact scroll position when they leave and return.
4. Tapping the currently active bottom nav tab scrolls that tab's content back to the top.
5. Scrollable feeds load their next batch before the user reaches the bottom.
6. Likes, saves, upvotes, and reactions update immediately, then sync in the background.
7. Every form auto-saves unfinished input so navigating back never erases it.
8. Permissions (notifications, camera, contacts, location) are requested ONLY at the moment the user tries to use the feature that needs it — never upfront, never bundled. See the specific fix below.
9. Every quick-action bottom sheet dismisses via swipe-down.
10. Every notification and shared link opens the exact content it references, never home as a fallback.
11. Swipe-left navigates back one screen. Swipe-down refreshes any scrollable list or feed.

==================================================
PERMISSIONS CENTER (SCREEN 07) — RETIRE, REPLACE WITH CONTEXTUAL TRIGGERS
==================================================

Screen 07 currently asks for Notifications, Camera, Contacts, and Location all upfront during onboarding. This violates Rule 8. RETIRE it as an upfront guided flow and replace with contextual requests:

• Camera → requested the first time the user opens Scan QR (62) or reaches ID Capture (29) during KYC
• Contacts → requested the first time the user opens Contact Picker (54)
• Location → requested the first time the user reaches a location-dependent feature
• Notifications → requested at a meaningful moment — e.g. immediately after the first Payment Success (57), not day one

Biometrics is unaffected — Screen 13 (Enable Biometrics) stays exactly as it is, since that's account-security setup during onboarding, not a feature-access permission covered by Rule 8. Each contextual permission request keeps Screen 07's original illustration/explanation/reassurance pattern, just triggered individually at the right moment. Do not renumber Screen 07 — it is retired, not replaced with a new number.

==================================================
STYLE UPGRADE — Recurring (87) & Scheduled (88)
==================================================

Visual treatment only, no functional change: give the next upcoming payment a hero focal treatment — an oversized dollar figure, the date, and a circular icon-dial for the merchant/service logo, rather than a flat list row.

==================================================
NEW — In-App Quick-Action Toolbar
==================================================

A right-edge swipe, while actively inside the app, reveals a compact vertical toolbar: Send, Scan QR, AI Assistant, Notifications. Swiping left or tapping outside dismisses it. This is strictly an in-app gesture — never system-wide or outside-app.

==================================================
NEW SCREEN 247 — "The Real Cost of 'Free' Apps" (consumer)
==================================================

Slots into onboarding right after Welcome (06), flowing into wherever the first contextual permission trigger naturally falls afterward — not into a dedicated Screen 07 stop, since that no longer exists as an upfront destination. Does not renumber anything. No Pulse — pre-account screen.

Headline: confident and direct — "Other apps take a cut every time you move your money. We don't." A statement, not a question.

Comparison, one loud clear stat per app, real published rates, kept simple:
• PayPal — up to 3.49% + fees on international or card-funded sends
• Venmo — 1.75% on instant cash-out, 3% on credit card sends
• Cash App — 0.5%–1.75% on instant transfer, 3% on credit card sends
• Rizon (stablecoin/crypto) — free between Rizon users, but network and conversion fees apply when spending or moving funds off-app
• ChangeAIPay — 0% domestic. ~1.45% cross-border (not claimed as 0% — stays honest, still dramatically lower than the others' stacked international costs)

Interactive calculator: reuse the amount-chip pattern from Welcome (06) — pick an amount, see a stark side-by-side of what a selected competitor takes vs. what ChangeAIPay takes. Competitor figure dimmed/struck-through style, ChangeAIPay's number bold and glowing.

Visual treatment: sharp Them-vs-Us layout — the one screen in the app allowed to feel confrontational rather than calm.

Minimal disclaimer: "Comparison based on publicly available fee schedules as of [date]. Rates vary by transaction type and provider terms."

Primary CTA: "See how much you keep." Routes onward into the consumer onboarding flow.

==================================================
NEW SCREEN 248 — "The Real Cost of Payment Processing" (merchant)
==================================================

Placed at the very start of merchant onboarding, right before KYB Introduction (159). Reached right after selecting "Business" on Account Type Selection (08). Does not renumber anything. No Pulse — pre-verification screen.

Headline: confident and decisive, matching Aina's analytical persona rather than 247's more visceral consumer tone — something like "Every processor takes its cut before you ever see the money. Here's the math."

Comparison, real published 2026 rates, one clear stat per processor:
• Stripe — 2.9% + $0.30 per online transaction
• Square — 2.6% + $0.15 in-person, up to 2.9% + $0.30 online
• PayPal Business — 2.99% + $0.49
• ChangeAIPay — as low as 1.25% pay-as-you-go (Startup tier — already cheaper than all three above before subscribing), or 0% platform fee once subscribed

Show both ChangeAIPay numbers honestly — the standard pay-as-you-go rate is a real differentiator on its own, separate from the subscription pitch.

Interactive calculator: reuse the same amount/volume-chip pattern and Them-vs-Us visual treatment as consumer's Screen 247, scaled to typical monthly business volume ($1K / $5K / $10K / $25K chips). Selected processor's take shown dimmed/struck-through, ChangeAIPay's number bold and glowing.

Minimal disclaimer: "Comparison based on publicly available processor fee schedules as of [date]. Rates vary by transaction type, volume, and account terms."

Primary CTA: "Let's get your business set up" — routes into KYB Introduction (159).

==================================================
GLOBAL REQUIREMENTS
==================================================

Full Auto Layout, accessibility, and prototyping for Screens 247 and 248, the new toolbar, and each contextual permission moment. All other fixes are behavioral/visual only — no layout changes beyond what's specified.

STOP after applying everything above.