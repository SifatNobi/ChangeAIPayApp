PROJECT: ChangeAIPay — Pricing System Fix + Financial Overview & Entity Expansion + Global Empty-State Pass + OTP & Globe Interaction Enhancements

IMPORTANT
Do NOT redesign the application. Do NOT change the existing visual identity, layout system, navigation, typography, component language, animations, colors, icons, or unrelated screens. Use the existing ChangeAIPay design exactly as source of truth. Everything net-new below is additive only.

DATA INTEGRITY RULE: every number in this prompt (prices, limits, allowances, FX rates, fees) is the exact canonical figure already established for ChangeAIPay — never invent, estimate, round, or substitute a different number from any other source, including any other reference document. The monthly/daily transfer limits in Part 1 Section 11 ($1,500/$750 Edge, $10,000/$2,500 Prime, $50,000/$10,000 Apex) are canonical and must be used exactly as given.

==================================================
PART 1 — PRICING / SUBSCRIPTION SYSTEM FIX
==================================================

--------------------------------------------------
1. PRIMARY PROBLEM TO FIX
--------------------------------------------------

The current Compare Plans screen incorrectly implies: Prime has unlimited/zero FX fees, Apex has unlimited transfers, Apex international transfers are completely free, "Zero FX fees" is a binary feature, the relationship between FX-free allowances and the post-allowance rate is unclear, and Free users aren't shown their temporary full-Free period vs. later Free Lite limitations. A live screenshot confirms this is currently live and wrong: Free shows "+1.75%" instead of 1.45%, Prime shows a flat "+0.5%" instead of its real allowance/rate, and Apex shows a bare "Free" instead of its real 0.58% post-allowance rate. Fix all of this without redesigning the screen.

--------------------------------------------------
2. OFFICIAL CUSTOMER PRICING MODEL
--------------------------------------------------

Free $0/month. Edge $24.99/month. Prime $39.99/month — Recommended. Apex $64.99/month. Keep the existing pricing hierarchy and visual treatment.

--------------------------------------------------
3. FREE PLAN — NEW ACCESS MODEL
--------------------------------------------------

Implement a Full Free → Free Lite lifecycle. Do not force subscription immediately. Month 1 and Month 2: Full Free access. Month 3 onward: Free Lite access. The user does not automatically become a paid subscriber and can remain on Free Lite indefinitely. Always show: current plan, current monthly transfer usage, remaining monthly limit, days/months remaining in Full Free, what changes when Free Lite begins, upgrade options. Do NOT create an automatic paid subscription. Do NOT charge without explicit subscription confirmation.

--------------------------------------------------
4. FULL FREE PLAN (first two months)
--------------------------------------------------

Price: $0/month. Features: AI Finance Chat (Basic), Send Money, Request Money, Basic Fraud Alerts, Smart Payment Transcripts, monthly transaction volume up to $400, FX fee 1.45%, monthly FX-free volume $0, basic wallet functionality. State clearly: "Your first 2 months include full Free access." Never describe this as "Free forever."

--------------------------------------------------
5. FREE LITE AFTER TWO MONTHS
--------------------------------------------------

Remains $0/month. Monthly transaction limit reduced to $100. Retains: Basic AI Finance Chat, Send & Request Money, Basic Fraud Alerts, Smart Payment Transcripts, basic wallet, Nano/XNO functionality. Do NOT disable the account, block existing balance access, or force payment merely because the two-month period ended. Show upgrade prompts when the user reaches the limit or attempts premium functionality. Example: "You're on Free Lite. Your monthly transfer limit is $100. Upgrade to Edge for up to $1,500/month and more powerful AI financial tools."

--------------------------------------------------
6. EDGE PLAN
--------------------------------------------------

Price $24.99/month. Everything in Free plus: Full AI Assistant, Fraud Protection, Smart Routing, Predictive Reminders, Spending Alerts, Payment Speaker or Message, AI Note Taking. Monthly transfer limit $1,500. Daily transfer limit $750. FX: first $1,500/month at 0% platform FX fee, then 0.95%. Do NOT display "Zero FX Fees" as a blanket permanent feature — display "0% FX fee up to $1,500/month" then "0.95% thereafter."

--------------------------------------------------
7. PRIME PLAN
--------------------------------------------------

Price $39.99/month. Shown as RECOMMENDED. Everything in Edge plus: AI Financial Autopilot, Smart Undo Payments, Social Payments Brain, Advanced Fraud Detection, Dynamic Budget Optimization. Monthly transfer limit $10,000. Daily transfer limit $2,500. FX: first $3,000/month at 0%, then 0.72%. Display "0% FX fee up to $3,000/month" then "0.72% thereafter." Do NOT show Prime as unlimited transfers or unlimited FX-free.

--------------------------------------------------
8. APEX PLAN
--------------------------------------------------

Price $64.99/month. Everything in Prime plus: Autonomous AI Payments, AI Negotiator, Life Event Mode, Priority Smart Routing, Booking + Pay Workflows. Monthly transfer limit $50,000 (do NOT display "Unlimited"). Daily transfer limit $10,000. FX: first $6,000/month at 0%, then 0.58%. Display "0% FX fee up to $6,000/month" then "0.58% thereafter." Add: "Need higher limits? Contact support / Enterprise." Do NOT claim unlimited transfers unless a real backend policy explicitly supports it. Do NOT ever display Apex's international transfers as "Free" — it has a real 0.58% rate above its allowance.

--------------------------------------------------
9. INTERNATIONAL SENDS — FX DISPLAY (CORRECTED)
--------------------------------------------------

Do NOT show "International sends — Free" as a blanket statement, and do NOT show a flat percentage with no allowance context. Use exactly these values — a live screenshot confirms the current screen shows the wrong numbers for Free, Prime, and Apex, so verify each one individually rather than assuming only one is broken:

Free: "0% FX allowance: $0" / "FX rate: 1.45%"
Edge: "0% FX up to $1,500/mo" / "0.95% thereafter"
Prime: "0% FX up to $3,000/mo" / "0.72% thereafter"
Apex: "0% FX up to $6,000/mo" / "0.58% thereafter"

Every paid tier still has a real FX fee once its allowance is exceeded — none of them are ever "Free" for international transfers above their allowance. Keep network/transaction fee, platform fee, and FX fee/spread clearly separate — never conflated.

--------------------------------------------------
10. NANO / XNO
--------------------------------------------------

Nano/XNO remains fee-free where applicable. Show "Nano (XNO) network fee: $0" plus "Nano transactions are always fee-free, regardless of plan." Do not imply the entire FX system is free because Nano settlement has no network fee. Nano stays an optional payment/settlement asset — never force crypto literacy on users. Subscription prices stay denominated in USD/EUR — never priced in XNO. If Nano is used to pay for a subscription, calculate the equivalent amount dynamically at checkout.

--------------------------------------------------
11. COMPARE PLANS SCREEN — CONTENT UPDATE
--------------------------------------------------

Fix the existing screen, do not redesign it. Keep dark navy background, blue visual hierarchy, cyan Edge, blue Prime, gold Apex, current card layout, accordion sections, typography, navigation.

HEADER: Free $0 / Edge $24.99 / Prime $39.99 RECOMMENDED / Apex $64.99.

TRANSFERS — Monthly limit: Free $400 during Full Free, $100 after Free Lite begins; Edge $1,500; Prime $10,000; Apex $50,000. Daily limit: Free $400 during Full Free (appropriate Free Lite restriction after); Edge $750; Prime $2,500; Apex $10,000. Domestic transfer fees: Free standard/applicable, Edge/Prime/Apex $0.

REMOVE THE MISLEADING "ZERO FX FEES" ROW: the existing binary ✓/✕ "Zero FX fees" row must NOT remain as a checkmark feature — this is confirmed live on the current screen and lets Prime/Apex appear to have unlimited free FX. Do NOT use ✓ or ✕ for FX-free status anywhere. Do NOT display "Zero FX fees" anywhere on this screen unless immediately qualified with the applicable monthly allowance. Replace that row's meaning with an allowance-based FX display using exactly:

Free: "0% FX allowance: $0" / "FX rate: 1.45%"
Edge: "0% FX up to $1,500/mo" / "0.95% thereafter"
Prime: "0% FX up to $3,000/mo" / "0.72% thereafter"
Apex: "0% FX up to $6,000/mo" / "0.58% thereafter"

International sends row: use the same corrected values above — never a blanket "Free," never a flat percentage without its allowance context. The purpose is to make it impossible for a customer to interpret Prime or Apex as having unlimited 0% FX. The existing visual structure, colors, typography, spacing, and comparison-table layout must remain unchanged — only the FX-related row content is being corrected.

CRYPTO — Buy & sell crypto per current product implementation. Crypto trading fee: Free 1.5%, Edge 1.0%, Prime 0.5%, Apex 0.25%. Nano/XNO trading fee: $0 on every tier. Keep "Nano trades are always fee-free, regardless of plan." Wallet deposit/withdraw: keep existing supported capability.

GOALS — Savings goals: Free up to 3, Edge up to 10, Prime unlimited, Apex unlimited. AutoSave round-ups: keep existing implementation.

--------------------------------------------------
12. SUBSCRIPTION PAYWALL LOGIC — SOFT PAYWALL
--------------------------------------------------

Never a hard paywall immediately after account creation. Journey: Sign up → KYC + phone verification → Full Free access → user experiences ChangeAIPay → Month 1 → Month 2 → Free Lite → user reaches a meaningful limit → upgrade prompt → Edge/Prime/Apex. Purpose: Discover → Trust → Use → Depend → Upgrade, never Sign up → Pay.

--------------------------------------------------
13. PAYWALL TRIGGERS
--------------------------------------------------

Show an upgrade prompt when the user: reaches their monthly transfer limit, tries to send more than their plan allows, tries to use a premium AI feature, attempts advanced fraud protection, attempts advanced smart routing, attempts AI Financial Autopilot, attempts Autonomous AI Payments, or attempts other premium features. The paywall must explain why. Example: "You're approaching your Free Lite limit. You've used $92 of your $100 monthly transfer allowance." Then: "Need more room?" with Edge/Prime/Apex options and their limits, CTA "Compare plans", secondary "Stay on Free Lite".

--------------------------------------------------
14. MONTHLY USAGE UI
--------------------------------------------------

Add a clean usage indicator (e.g. "$325 / $400 used, $75 remaining") scaled to whichever plan/limit applies. At 80% usage show a subtle warning ("You're using most of your monthly allowance"). At 100%, show the soft upgrade paywall.

--------------------------------------------------
15. FREE PLAN COUNTDOWN / STATUS
--------------------------------------------------

During the first two months, show a subtle, non-threatening status card: "Full Free Access — Month 1 of 2" (or "Month 2 of 2") with copy like "You're currently enjoying full Free access. After your second month, you'll move to Free Lite with a $100/month transfer limit. Upgrade anytime if you need more." At end of Month 2: "Your Full Free period has ended. You're now on Free Lite. $100/month transfer allowance. Your account and balance remain fully accessible." CTA: "Explore plans."

--------------------------------------------------
16. UPGRADE SCREEN
--------------------------------------------------

Make the value difference obvious using the existing visual system. Recommended emphasis on Prime with its real limits/features listed. Do not exaggerate or claim savings that can't be calculated from real user data.

--------------------------------------------------
17. PRICING LANGUAGE
--------------------------------------------------

Avoid "Unlimited" unless technically/financially supported. Avoid "Zero FX fees" when there's only a limited FX-free allowance. Prefer "0% FX up to $3,000/month, 0.72% thereafter" and "$1,500 monthly transfer limit" over vague wording.

--------------------------------------------------
18. BACKEND / DATA MODEL
--------------------------------------------------

If implementing functionality beyond visuals, create a subscription state model: plan (FREE|EDGE|PRIME|APEX), freeAccessPhase (FULL_FREE|FREE_LITE), freeStartDate, freeFullAccessEndDate, monthlyTransferLimit, dailyTransferLimit, monthlyTransferUsed, fxFreeMonthlyAllowance, fxVolumeUsed, subscriptionStatus (ACTIVE|CANCELLED|EXPIRED|NONE). Do NOT process real payments unless an existing payment backend is already connected. Do NOT create fake Stripe/RevenueCat/OAuth/analytics/payment integrations. If no backend exists, implement UI/state logic cleanly with clearly marked integration boundaries.

--------------------------------------------------
19. IMPORTANT BUSINESS RULE
--------------------------------------------------

Subscription is OPTIONAL. ChangeAIPay must remain usable without a paid subscription. Paid plans sell higher limits, lower FX costs, stronger AI, advanced automation/fraud protection, premium financial intelligence — never artificially disable essential access to force a subscription.

--------------------------------------------------
20. DESIGN CONSTRAINT
--------------------------------------------------

Do not change colors, typography, navigation, screen structure, create a new design language, introduce unnecessary cards, replace existing components, move unrelated sections, change AI character designs, change the logo, or change the dark navy aesthetic. Only fix pricing information, subscription logic, usage indicators, Free lifecycle, upgrade/paywall behavior, and directly related UI.

==================================================
PART 2 — ONBOARDING: COUNTRY, CURRENCY, TAX ID & BUSINESS DECLARATION
==================================================

Extend the existing Create Account (09) country/phone picker — do not replace or redesign it. In the same step or an immediately adjacent one, add:
- Preferred currency selection (tied to the country already selected)
- Tax ID number field (appropriately labeled per country — e.g. SSN/EIN-equivalent, VAT number, etc.)
- A "Do you have a business?" toggle — if yes, reveal a Business Tax ID field

This data feeds Part 3 below and is separate from full KYC/KYB, which continues to run exactly as already established.

==================================================
PART 3 — MULTI-ENTITY: BUSINESS ENTITIES FOR PERSONAL ACCOUNTS
==================================================

This is lightweight bookkeeping separation, NOT a duplicate full Merchant/Business account type — the existing Personal/Business account-type split and full KYB flow are untouched.

New screens:
1. Business Entities Hub (Personal account, reachable from Profile) — list of the user's declared business entities (name, Tax ID, simple running total), with an "Add Entity" action.
2. Create Business Entity — name, Tax ID, optional short description. On save, the entity gets its own simple ledger view (transactions the user tags to it) separate from personal transactions — not a separate subscription, not a separate KYB review.

==================================================
PART 4 — NET WORTH & FINANCIAL OVERVIEW MODULE (Consumer)
==================================================

New screens:
1. Net Worth Overview — aggregated Assets vs. Liabilities and total net worth, broken down by category (Cash/Bank, Crypto held via ChangeAIPay, manually-tracked Investments, Physical Assets, minus manually-tracked Debts/Liabilities). For a brand-new user with nothing logged, this MUST show a genuine empty state (see Part 7), never fabricated numbers.
2. Add Manual Asset/Liability — form to log an external holding: category (Cash, Bond/Fixed Income, Stock/ETF, Physical Asset, Debt), name, value or ticker+share count, and interest rate where applicable.
3. Investment Detail — for a logged fixed-income holding, shows accrued value over time (interest compounding, simple or compound per what the user specified); for a logged variable-income holding (stock/ETF), shows current market value via ticker lookup. Both are informational tracking only — ChangeAIPay is not executing trades or issuing these instruments.
4. Financial Calendar — unified calendar pulling from: Recurring Billing charge dates (from the existing Recurring Billing module), Subscription Review renewal dates, Goal deadlines, and manually-added reminders (e.g. tax filing dates).
5. Document Vault — camera-capture or upload storage for invoices, warranties, and receipts, reusing the existing camera-capture pattern already established for ID Capture.

==================================================
PART 5 — AI TOKEN USAGE
==================================================

New screens:
1. AI Token Usage — shows current token balance vs. the plan's monthly allotment, with usage history.
2. Buy Tokens — one-time top-up purchase of additional AI usage tokens, reusing the existing checkout/payment UI pattern.

==================================================
PART 6 — FINA/AINA CONVERSATIONAL ASSET LOGGING
==================================================

Extend Fina/Aina Chat's existing capability: when a user states a balance or asset in natural language (e.g. "I have $2,000 in my Chase checking and $500 cash"), the assistant should parse this, confirm back what it recorded, and log it as a Manual Asset entry (Part 4) reflected in Net Worth Overview. This is a chat-capability extension, not a new screen.

==================================================
PART 7 — GLOBAL MOCK-DATA-TO-EMPTY-STATE PASS
==================================================

Audit every screen in the entire app. Anywhere a screen currently shows hardcoded/mock demo data that does not reflect an actual user action, replace it with the correct canonical empty state (reusing patterns already established at Screens 223-232) rather than a fabricated populated view. This applies with particular emphasis to every new screen in Parts 3-5 above: a brand-new user has zero business entities, zero manual assets, zero investments, zero tokens purchased, zero calendar events beyond what already exists elsewhere — show that honestly. Additionally, specifically re-verify Compare Plans, Subscription Plans (45), and any Upgrade/Billing screen for any lingering incorrect/legacy figure (e.g. "+1.75%", "+0.5%", a bare "Free" used as an FX descriptor, or any binary Zero-FX-fees checkmark) — these are pricing-accuracy bugs, not just empty-state gaps, and must be corrected everywhere they appear, not only on the primary Compare Plans screen. Where a screen genuinely needs to demonstrate populated behavior for design purposes, that is a separate design-review exercise, not the default state a real user encounters.

==================================================
PART 8 — OTP / VERIFICATION-CODE ENTRY & SUCCESS ANIMATION
==================================================

Applies to OTP Verification (10) and any other numeric-code-verification screen in the app that follows the same pattern (e.g. Enable 2FA 14, New Device Verification 23) — for both consumer and merchant flows, since these sit in shared Auth infrastructure before the Personal/Business branch. Identify every such screen and apply consistently; do not assume only Screen 10 qualifies.

Required behavior:
1. Code-entry state: give the digit boxes a satisfying entrance animation as the screen appears, and have each box visually confirm (a distinct glow/fill state using the existing established color tokens — do not invent a new color) the instant its digit is entered.
2. Native SMS autofill: if the OS offers an autofill suggestion for an incoming SMS code, support it via the existing platform-native mechanism — do not fabricate a custom SMS-reading feature.
3. Success transition: on successful verification, transition into a distinct "Verified successfully" state — a checkmark icon with a brief radiating ring/particle animation around it, "Your number has been verified" copy, a small "Verified and secure" indicator, and a "Continue" CTA.
4. This is a bespoke success animation for this specific moment only. It is NOT the existing Pulse motif — Pulse remains reserved for balance refresh, AI thinking states, payment-success completions, the Fina/Aina typing indicator, and Voice Mode waveform only. Do not conflate the two or extend Pulse's scope.
5. Preserve all existing back navigation, resend-code timer, and countdown behavior already on these screens.

==================================================
PART 9 — ACCOUNT CREATION GLOBE: COUNTRY HIGHLIGHT ON SELECTION
==================================================

Applies to the existing animated globe/flag-chip country+phone picker already built on Create Account (09), and any other screen using the same globe component (check Localization/Regional Settings 233-236 and apply consistently if they reuse it).

Required behavior:
1. Default/idle state: the globe renders as a dotted sphere with no country highlighted. Confirm the dots render in the existing Accent blue — never white or gray.
2. Upon selecting a continent tab and country chip (or tapping a country directly on the globe, if that interaction already exists), that country's shape highlights/fills in solid Accent blue on the globe itself, visually distinct against the surrounding dotted pattern.
3. The highlight updates immediately and correctly if the user changes their selection.
4. Do not alter the continent-tab/country-chip list UI below the globe — only the globe's dot color and per-selection highlight behavior are in scope.

==================================================
EXPLICITLY NOT BUILT — AND WHY
==================================================

- Real bond or stock brokerage execution: Part 4's investment tracking is informational only — actually buying/selling securities is a securities-brokerage licensing decision, not a screen addition.
- Revolving credit/interest on ChangeAIPay's own card: the debt tracker in Part 4 only tracks externally-held debts a user manually logs — ChangeAIPay is not issuing credit.
- Full accounting-software-grade multi-entity P&L: Part 3 is lightweight bookkeeping separation, not a QuickBooks-equivalent system.
- Real-time market-data price feeds and AI web-search capability: these are backend/API integration work, not Figma-scope — flag the correct integration point and mark actual live data fetching as NOT FULLY VERIFIABLE IN FIGMA MAKE, consistent with how analytics and crash reporting have been handled throughout this project.

==================================================
GLOBAL REQUIREMENTS
==================================================

Test the Free → Free Lite lifecycle transition explicitly. Test at least one manual asset/liability entry end-to-end into Net Worth Overview. Test the OTP success animation end-to-end on every screen it was applied to. Test the globe highlight by selecting at least two different countries and confirming each highlights correctly. Search Compare Plans, Subscription Plans (45), and every Upgrade/Billing screen for any remaining incorrect FX figure or binary Zero-FX-fees checkmark and confirm zero instances remain. Confirm every new screen routes correctly and introduces zero dead ends. Confirm nothing in Parts 2-9 alters any existing screen beyond what's explicitly specified here.

STOP after all parts are built, integrated, and verified.