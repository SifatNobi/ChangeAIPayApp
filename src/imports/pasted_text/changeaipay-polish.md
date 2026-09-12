PROJECT: ChangeAIPay — AI-Native Fintech Super App

MASTER POLISH & INTERCONNECTION FIX — SINGLE COMPREHENSIVE PASS

IMPORTANT

This is a retroactive fix pass covering all 248 screens generated so far. No new screens are created here. Do not regenerate any screen's core content, copy, or layout beyond what each fix below specifically describes.

==================================================
FIX 1 — Frame edge-to-edge, no white-space bleed
==================================================

Every screen's content fills the 390×844 phone frame completely, respecting only safe-area insets (status bar, home indicator). No unintended white or empty margins around the app content within the frame.

==================================================
FIX 2 — Fina & Aina exact asset consistency
==================================================

Every place Fina or Aina appears — chat avatars, the center floating AI button, suggestion cards, typing indicators — must use the exact uploaded character assets from Prompt 1, never a generic placeholder icon or simplified silhouette. Audit every screen that shows either assistant and correct any instance using a substitute avatar.

==================================================
FIX 3 — Relocate the floating quick-menu button
==================================================

A floating hamburger/menu-style button was overlapping the bottom nav's Profile tab, interfering with tapping it. Move this button to the top-right corner of the header, positioned near the notification bell, as a proper secondary quick-access menu — remove it entirely from the bottom nav area.

==================================================
FIX 4 — ChangeAIPay logo mark: circular, not square
==================================================

Wherever the ChangeAIPay logo mark appears as a small badge (balance card corner, headers, etc.), it must render inside a proper circular container that fills its allotted space — never a hard-edged square crop.

==================================================
FIX 5 — Merchant Home parity: Plans + Feature Requests
==================================================

Merchant Home (167) gets two additional quick-access entries matching consumer parity: "Plans" (routes to Merchant Subscription Plans, 189) and "Feature Requests" (routes to Feature Center, 196) — merchants currently have no direct path to either.

==================================================
FIX 6 — Consumer bottom nav tap functionality
==================================================

Every tab on the consumer bottom nav (Home, Payments, Subscription, AI Assistant, Feature Request, Transaction History, Profile) must reliably navigate to its correct section when tapped — currently inconsistent. Match the same reliable tap behavior already working correctly on the merchant nav.

==================================================
FIX 7 — Merchant Subscription Plans (189, 190) — updated pricing, features, visual tiering
==================================================

Corrected subscription prices: Startup $99/year, Growth $399/year, Scale $799/year (unchanged) — Premium $999.99/year (psychological pricing, lowered from the prior figure), Retention $2,999.99/year, Enterprise $4,999.99/year.

Full, accurate feature list per tier — restate exactly:
• Startup (≤$10K/yr, 1.25% standard fee, 1.00% FX): AI Revenue Booster (basic sales pattern insights), Basic Cash Flow Predictor, Smart transcripts + money monitoring, Entry analytics dashboard, Payment speaker or message, AI note taking
• Growth (1.75% fee, 0.85% FX): Everything in Startup, plus Auto-Personalized Marketing, AI Upsell Assistant, Improved pricing suggestions, Customer re-engagement starter tools
• Scale (2.25% fee, 0.70% FX): Everything in Growth, plus Smart Pricing Engine, Customer Lifetime Value Predictor, Full Business Health Intelligence Dashboard, Stronger Cash Flow Predictor
• Premium (2.50% capped fee, 0.60% FX): Everything in Scale, plus AI Customer Recovery System, Dynamic demand pricing, Advanced churn prevention, Priority support + premium analytics
• Retention (2.35% fee, 0.50% FX): Everything in Premium, plus Retention-focused AI campaigns, Dedicated profitability optimization models, Lower FX pricing to reduce churn
• Enterprise (2.20% capped fee, 0.45% FX): Everything in Retention, plus AI call handling and messaging (an AI agent takes calls when the merchant is busy/unavailable, books services by matching availability, and sends/receives messages if the customer prefers messaging, after customer approval), Custom AI workflow automation, Enterprise infrastructure licensing, Dedicated fraud intelligence models, API customization + private routing logic, Strategic account management

Visual treatment: Premium = Most Popular tier — rotating Primary Gradient border, floating badge, same treatment as consumer Prime. Enterprise = Legendary tier — gold gradient border, gold glow, crown badge, same treatment as consumer Apex. Scale keeps its existing blue glow accent unchanged. Card structure/layout matches the consumer plan cards exactly.

==================================================
FIX 8 — Screen 43 Upgrade routing bug
==================================================

Transaction Limit Reached (43)'s "Upgrade to Edge" CTA currently routes to Home — incorrect. Fix it to route to Subscription Plans (45) with the relevant plan pre-highlighted, exactly as originally specified.

==================================================
FIX 9 — Global screen title color
==================================================

Every screen's title/header text uses the app's blue Accent color with a highlighted/glow emphasis treatment, rather than plain white or gray, consistent with the app's blue-and-black visual identity.

==================================================
FIX 10 — Full interconnection/routing audit
==================================================

Every interactive element across all 248 screens must route to its correctly named, logically corresponding destination — never a dead end, a placeholder, or the wrong screen. Examples to verify systematically (not exhaustive — apply this standard everywhere):

• Home's Send action → Send (53). Request → Request flow. Add Money → Add Money (77). Scan → Scan QR (62)
• Merchant Home's Generate QR → QR (171). View Payout → Payout (172). Send Money → merchant send equivalent
• Every bottom nav tab → its correct section, per Fix 6
• Every notification → its exact referenced content (per the existing deep-linking rule)
• Every "See All" / "View All" link → the corresponding full list screen
• Upvote count → Upvoters list (202). Refund Request → Refund Result (69). Every Upgrade/Downgrade CTA → the correct Subscription flow for that account type

Treat this as a full audit pass, not a one-time spot check — every button, card tap, and CTA across the entire app should be verified against its intended destination.

==================================================
FIX 11 — General polish pass
==================================================

Across all 248 screens: confirm consistent glassmorphism quality, spacing rhythm, and tactile click/tap animation feel per the established design system — this is a final consistency pass, not a redesign. No screen should feel visually behind the others in craftsmanship.

==================================================
GLOBAL REQUIREMENTS
==================================================

This entire fix is behavioral, navigational, and visual-consistency work only — no new screens, no changes to established copy or functional scope beyond what's specified above.

STOP after completing all eleven fixes.