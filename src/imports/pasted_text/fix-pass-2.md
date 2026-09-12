PROJECT: ChangeAIPay — AI-Native Fintech Super App

DEFINITIVE FIX PASS #2 — LOGO, NAV STATE, ONBOARDING ORDER, QUICK ACTIONS, NEW REMITTANCE SCREEN

IMPORTANT

Verify every fix actually works before considering it complete — several of these were reported as fixed previously and were not. Do not regenerate any screen's core content beyond what each fix specifies.

==================================================
FIX 1 — LOGO IS STILL A SQUARE (reported twice now)
==================================================

Wherever the ChangeAIPay logo mark appears in a circular badge context (Home header, balance card corner, etc.), the logo asset itself is rendering as a square icon sitting inside a circular glow — the square must become a true circle. The logo's own container/crop/mask must be circular, filling the circular badge completely, with no visible square edges or corners anywhere behind or around it. This applies everywhere the small badge-style logo appears, not just Home.

==================================================
FIX 2 — BOTTOM NAV ACTIVE-TAB STATE IS WRONG
==================================================

The bottom nav's highlighted/active tab does not update to match the currently displayed screen — e.g. viewing Subscription Plans still shows "Home" highlighted. Fix: the active tab indicator must dynamically reflect whichever section the user is currently in, updating immediately on every navigation, for both consumer and merchant nav.

==================================================
FIX 3 — MERCHANT BOTTOM NAV MISSING PLANS & REQUESTS
==================================================

Plans and Feature Requests currently exist only as Quick Action tiles on Merchant Home — they are missing from the merchant bottom navigation bar itself. Add both as actual nav tab items alongside Home, Payments, Insights, and Profile, with the center Aina button unchanged. Each must independently navigate correctly (Plans → Merchant Subscription Plans, Requests → Feature Center) and correctly reflect active state per Fix 2.

==================================================
FIX 4 — ONBOARDING ORDER: COMPARISON SCREENS SHOWN TOO EARLY
==================================================

Screens 247 ("The Real Cost of 'Free' Apps") and 248 ("The Real Cost of Payment Processing") are currently appearing before the user has chosen Personal or Business on Account Type Selection (08) — this is wrong. Fix the flow order:

Welcome (06) → Account Type Selection (08) → [branch based on selection] → 247 if Personal was selected, 248 if Business was selected → continues into Create Account (09) for Personal, or KYB Introduction (159) for Business.

Neither 247 nor 248 should ever appear before the user has made this choice — each is a targeted follow-up justifying the choice they just made, not a generic screen shown to everyone upfront.

==================================================
FIX 5 — ACCOUNT TYPE SELECTION: MISSING BUSINESS CTA
==================================================

The Personal card has a clear "Start as Personal →" button. The Business Account card has no equivalent — only a chevron. Add a matching "Start as Business →" button to the Business card, same visual treatment as Personal's. Per Fix 4, Personal's CTA routes into Screen 247, Business's CTA routes into Screen 248.

==================================================
FIX 6 — QUICK ACTIONS: MOVE TO A RIGHT-SIDE FLOATING TOGGLE
==================================================

Send/Request/Add Money/Scan currently sit as a static horizontal row below the balance card on Home, taking up vertical space. Replace this with a floating expandable quick-action toggle positioned on the right side of the screen: a single beautiful, eye-catching circular toggle button that, when tapped, reveals the four actions as a compact expanding menu (speed-dial style) rather than a permanent horizontal row. Collapses back to the single toggle when an action is selected or when tapped again. Apply the same established glassmorphism/glow treatment as the rest of the design system.

==================================================
FIX 7 — NEW SCREEN: "Sending Money Home Shouldn't Cost This Much" (Remittance)
==================================================

A new screen reached as a follow-up after the consumer path (after Screen 247, before or alongside continuing into Create Account) — specifically addressing international remittances, distinct from general P2P sending. Does not renumber anything; place as the next available screen number.

Headline: direct and specific to remittances — e.g. "Sending money to family abroad? Here's what it's really costing you."

Comparison, real researched rates, remittance-specific providers (not the general P2P apps already covered in 247):
• Bank wire transfer — typically ~$45 flat fee plus a hidden exchange-rate markup on top
• Western Union — often 3–4%+ all-in cost, higher on many corridors
• MoneyGram — FX markup can exceed 2%, plus fees ranging up to $16+ depending on method
• Wise — genuinely competitive, starting around 0.43% on some corridors — shown honestly, not dismissed, since overclaiming against a real competitor would undercut the app's own credibility
• ChangeAIPay — ~1.45% baseline, lower on paid tiers — the clear, defensible advantage here is against Western Union, MoneyGram, and bank wires specifically, which is how most people actually send remittances today

Interactive annual savings breakdown: user selects a typical remittance amount and frequency (e.g. "$500, monthly"), sees a clear projected annual cost under each provider vs. ChangeAIPay, with the annual dollar difference shown as the headline number — loud and clear, not buried in percentages.

Disclaimer: "Estimates based on publicly available provider rate data as of [date]. Actual costs vary by corridor, amount, and payment method."

Primary CTA: continues into the next onboarding step.

==================================================
GLOBAL REQUIREMENTS
==================================================

Verify Fixes 1–3 are functionally confirmed working (not just visually applied) before considering this pass complete. Fixes 4–7 are flow, layout, and new-screen work respectively.

STOP after all seven fixes are applied and verified.