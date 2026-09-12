THIRTEENTH BATCH — FINAL PRODUCTION-READINESS + ONBOARDING CONVERSION CLOSE-OUT
(Figma Make — FIX & VERIFY pass only)

==================================================
MASTER RULE — READ BEFORE DOING ANYTHING
==================================================

This is a FINAL FIX + VERIFY + AUDIT pass.

DO NOT redesign, reposition, restyle, regenerate, replace, simplify, modernize, or
restructure any existing screen, navigation, component, asset, copy, layout, or flow
unless a requirement below explicitly requires that change.

All 246 existing base screens must retain their current UI/design system, copy,
layout, and navigation unless a fix below explicitly changes behavior. This
protection also extends to every screen added in the Institutional Payments,
Payment-Platform Parity, and Recurring Billing modules — they retain their built
state except where Part D explicitly requires a fix.

ADDITIVE/CORRECTIVE ONLY.

Do not create alternative versions of existing screens.

Do not "improve" screens that are already correct.

Do not regenerate screens unnecessarily.

Do not modify unrelated screens.

Work strictly in this order:

PART A → PART B → PART C → PART D → PART E → PART F → PART G → FINAL AUDIT REPORT

Several items below may have received fixes in earlier batches. NEVER assume that
an earlier fix was actually implemented. Inspect and test the current implementation
before marking anything complete.

==================================================
CRITICAL VERIFICATION RULE
==================================================

IMPLEMENTATION DOES NOT EQUAL VERIFICATION.

Never report something as verified merely because:
- a button exists,
- a screen looks correct,
- a route was created,
- mock data was inserted,
- a success message appeared,
- or code appears to contain the expected logic.

Test the actual behavior available inside Figma Make.

NEVER SIMULATE EXTERNAL FUNCTIONALITY AND THEN REPORT IT AS REAL.

Do not create fake:
- OAuth tokens
- RevenueCat entitlement responses
- App Store/Play Store purchase restoration
- native review dialogs
- push notification delivery
- analytics delivery
- crash reporting
- backend transaction settlement

If an external service cannot actually be executed in the Figma Make environment:

1. Preserve the correct integration point.
2. Verify everything that CAN genuinely be tested.
3. Do not fake the missing external response.
4. Clearly mark the affected portion as:
   "NOT FULLY VERIFIABLE IN FIGMA MAKE"

Use these final statuses:

VERIFIED
= The behavior was actually tested successfully in the available environment.

PARTIALLY VERIFIED
= The available UI/logic/integration path was tested, but an external dependency
could not be executed.

NOT FULLY VERIFIABLE IN FIGMA MAKE
= Verification requires external/native/backend infrastructure unavailable here.

Do NOT use "Fixed", "Done", "Working", or "Looks good" as a final verification status.

==================================================
APPROVED BRAND-ASSET PROTECTION
==================================================

Fina and Aina are APPROVED EXISTING BRAND ASSETS.

NEVER redraw, regenerate, approximate, replace, stylize, or substitute them.

Fina (consumer):
- Use the exact uploaded Fina character asset.
- Warm/rounded chat bubble.
- Primary Gradient glow.
- Maintain the existing approved appearance.

Aina (merchant):
- Use the exact uploaded Aina character asset.
- Professional/sharp chat bubble.
- Accent glow.
- Maintain the existing approved appearance.

If an existing Fina/Aina implementation is already correct:
DO NOT TOUCH IT.

Only correct instances that are actually inconsistent with the exact uploaded asset
or specified treatment.

==================================================
PART A — PRE-LAUNCH CHECKLIST, FINAL CLOSE-OUT
==================================================

Several of these had a fix issued in an earlier batch. Do not assume issued = built.
Re-verify each is actually live before marking it closed.

--------------------------------------------------
1. APPLE / GOOGLE SIGN IN
--------------------------------------------------

Confirm Apple Sign In and Google Sign In on:
- Welcome/Login

These must not be decorative buttons.

Required behavior:

Brand-new account:
OAuth success
→ Account Type Selection (08)
→ normal onboarding

Returning account:
OAuth success
→ Home (38)

Both Apple and Google must follow the same appropriate post-auth routing logic
as the existing email authentication flow.

Confirm real OAuth token exchange where the environment supports it.

If real provider authentication/token exchange cannot actually be executed in
Figma Make:
- Do not fake it.
- Verify the trigger and integration/routing path that can actually be tested.
- Mark external OAuth execution as NOT FULLY VERIFIABLE.

--------------------------------------------------
2. NATIVE APP STORE / PLAY STORE REVIEW PROMPT
--------------------------------------------------

Confirm native in-app review API integration at genuine win moments:

- First Payment Success (57)
- Goal Celebration (108)
- Milestone Reveal (147)

Requirements:
- Native platform review API only.
- No custom fake review modal.
- Never interrupt an incomplete flow.
- Respect OS/platform rate limiting.
- Do not trigger on every eligible win.
- Never fire more than once per eligible review window.

If native OS review execution cannot actually be tested:
- Preserve the correct native integration point.
- Verify trigger conditions and flow behavior that can be tested.
- Do not simulate a native review prompt.
- Mark external native execution as NOT FULLY VERIFIABLE.

--------------------------------------------------
3. PAYWALL AFTER VALUE
--------------------------------------------------

THIS IS ALREADY CORRECT.

DO NOT TOUCH.

Preserve:
- Screen 43 continue-at-fee model.
- Home upgrade nudge.
- Existing paywall/gating behavior.

The existing continue-at-fee model remains the ONLY gate.

Do not introduce another paywall.
Do not move the existing gate.

--------------------------------------------------
4. RESTORE PURCHASES
--------------------------------------------------

Confirm a real functional restore flow on:

CONSUMER:
- Checkout (138)
- Billing History (141)

MERCHANT:
- Checkout (191)
- Billing (194)

A visible "Restore Purchases" control must exist where required.

Requirements:
- Initiate the real RevenueCat/App Store/Play Store restore-entitlement flow.
- Re-check the actual entitlement state.
- Update access based on the returned entitlement state.
- Do not merely display a toast.
- Do not fake successful restoration.

If the external store/RevenueCat environment cannot be executed:
- Verify UI trigger.
- Verify loading state.
- Verify success/error handling.
- Verify entitlement integration point.
- Do not fabricate entitlement responses.
- Mark external entitlement verification as NOT FULLY VERIFIABLE.

--------------------------------------------------
5. EMPTY STATES — FULL APP AUDIT
--------------------------------------------------

Canonical empty-state patterns already exist in Screens 223–232.

DO NOT redesign them.

Verify that the appropriate canonical empty state is actually wired into:

- Transaction History (80)
- Search (44)
- Search (85)
- Notifications (40)
- Goals list
- AI Suggestions Widget (48)
- Recurring (87)
- Scheduled (88)
- Community (153–158)
- Customer Insights (176)
- Team Members (182)
- Feature Center (196)

For every applicable list/feed/search surface:

ZERO DATA:
→ correct canonical empty state

DATA EXISTS:
→ correct populated state

Requirements:
- Never show a blank screen for a legitimate zero-data state.
- Existing CTA buttons must route correctly.
- Do not replace canonical empty states with new designs.

--------------------------------------------------
6. CRASH REPORTING
--------------------------------------------------

Crash reporting is OUT OF FIGMA SCOPE.

DO NOT create:
- fake crash-reporting UI
- fake crash-reporting buttons
- fake crash-reporting modals
- decorative crash-reporting elements

Only identify/preserve the app-shell integration point.

Mark actual crash SDK execution as NOT FULLY VERIFIABLE IN FIGMA MAKE.

--------------------------------------------------
7. BASIC ANALYTICS
--------------------------------------------------

Analytics implementation is OUT OF FIGMA VISUAL SCOPE.

DO NOT create fake analytics functionality.

Verify/preserve the event-tracking integration points for:

- Account creation
- Onboarding completion
- First meaningful value
- First successful payment
- Time-to-first-value

The time-to-first-value event from the Eleventh Batch remains the reference event.

If actual analytics delivery cannot be tested:
mark external analytics delivery as NOT FULLY VERIFIABLE.

--------------------------------------------------
8. FEEDBACK / FEATURE REQUEST SYSTEM
--------------------------------------------------

Already built in Screens 196–203.

DO NOT redesign.

Verify the complete flow:

Submit
→ Detail
→ Comments
→ Upvote
→ Shipped

Every transition must resolve correctly.

No dead ends.
No blank screens.
No broken back navigation.

--------------------------------------------------
9. RE-ENGAGEMENT NOTIFICATIONS
--------------------------------------------------

Confirm per-user behavioral triggers for:

A. INACTIVITY
User has not opened the app for 7+ days.

B. UNFINISHED GOAL
Goal remains unfinished with no contribution for 14+ days.

C. ABANDONED TRANSACTION
User started the Amount/Confirmation flow but did not complete it.

D. MILESTONE PROXIMITY
Relevant milestone-proximity nudges tied to:
- Referral (143–152)
- Achievement Badges (155)

All behavioral notifications MUST respect Notification Preferences (127).

If a user has opted out of the applicable notification category:
the notification must not fire.

Do not confuse these with admin-initiated Broadcast/Promotional Campaigns (204–207).

If background push delivery cannot be executed in Figma Make:
- Verify trigger/state logic that can actually be tested.
- Verify preference gating.
- Do not fake push delivery.
- Mark external push execution as NOT FULLY VERIFIABLE.

--------------------------------------------------
10. STORY-DRIVEN SCREENSHOTS
--------------------------------------------------

Screenshots that tell a product story are a separate marketing/listing deliverable.

DO NOT build these into the application.

Flag this as a follow-up marketing/listing deliverable only.

==================================================
PART B — ONBOARDING CONVERSION AUDIT, FINAL CLOSE-OUT
==================================================

IMPORTANT:

Do NOT optimize onboarding simply by reducing screen count.

Each screen must justify itself through:

1. VALUE
2. PERSONALIZATION
3. QUALIFICATION

A screen that only explains, decorates, repeats, or delays without contributing to
one of those three categories is a candidate for removal.

--------------------------------------------------
1. VALUE FAST — DEFER KYC
--------------------------------------------------

KYC:
Screens 26–37

Verification Gate:
Screen 42

A brand-new Personal user MUST reach feature-limited Home (38) through:

Account Created (11)
→ PIN (12)
→ Biometrics (13)
→ 2FA (14)
→ Home (38)

There must be ZERO KYC screens between Account Created and feature-limited Home.

KYC must remain genuinely deferred behind Verification Gate (42).

--------------------------------------------------
2. PERSONALIZE WITH PURPOSE
--------------------------------------------------

Confirm the intent-capture question after Account Type Selection (08).

The answer MUST produce meaningful downstream state changes.

Verify that different intent answers affect:

- Dashboard Customization (50) pre-selected widgets.
- Matching stat surfaced on 247/248.
- Pre-highlighted plan on Subscription Plans (45).
- Matching plan emphasis on Compare Plans (137).

TEST WITH AT LEAST TWO DIFFERENT INTENT ANSWERS.

Example:
Intent A → record downstream state.
Intent B → record downstream state.

Confirm the downstream states genuinely differ.

If an intent question does NOT change anything meaningful downstream:
remove ONLY that redundant question.

Do not remove useful qualification or personalization.

--------------------------------------------------
3. FRICTION WITH INTENT
--------------------------------------------------

Confirm:
- Skip exists where appropriate.
- Continue exists where appropriate.
- Skip/Continue on 247/248 are functional.

No required onboarding step may exist purely to:
- explain the product
- add decoration
- repeat information
- increase screen count

--------------------------------------------------
4. EVERY SCREEN EARNS ITS PLACE
--------------------------------------------------

Run the complete 01–45 onboarding audit.

Classify every screen as exactly one of:

VALUE
PERSONALIZATION
QUALIFICATION
UNNECESSARY

For any screen classified as UNNECESSARY:

DO NOT immediately delete it.

First confirm that removing it will not break:
- routing
- qualification
- personalization
- first-value delivery
- authentication
- account setup
- downstream state

Only then remove it.

Explicitly verify:

- Loading Gateway (19)
- Welcome Back (20)
- What's New (21)

These must NEVER appear during first-run onboarding for a genuinely brand-new user.

--------------------------------------------------
5. TIME-TO-VALUE OVER SCREEN COUNT
--------------------------------------------------

Do NOT optimize toward "fewer screens."

The correct question is:

"Does this screen meaningfully improve value, personalization, or qualification?"

If YES:
preserve it.

If NO:
evaluate it for removal using the safety rules above.

Do not remove a useful screen simply because onboarding could technically be shorter.

--------------------------------------------------
6. FUTURE ONBOARDING STANDING CONSTRAINT
--------------------------------------------------

Preserve this as a project-wide rule for future onboarding-adjacent work:

"DEFAULT TO THE SHORTEST PATH.

Only add a new onboarding step if it demonstrably:
1. improves the user's first result,
2. deepens meaningful personalization, OR
3. qualifies a serious user.

Never add onboarding screens merely to explain, decorate, repeat, or increase feature
exposure."

Do not add any new onboarding screen during this batch unless explicitly required
by this specification.

--------------------------------------------------
7. BRAND-NEW USER SELF-AUDIT
--------------------------------------------------

Perform a complete screen-by-screen walkthrough for:

A. Brand-new Personal user
B. Brand-new Business user

At each step check:

- Is the next action obvious?
- Is the user delayed unnecessarily?
- Is the purpose clear?
- Is terminology understandable?
- Is information repeated?
- Is there a dead end?
- Is there an unexpected screen?
- Does the user reach meaningful value quickly?
- Does the selected intent produce the expected downstream personalization?

If a concrete problem is discovered:
fix ONLY that specific problem.

Do not redesign the screen.

==================================================
PART C — BRAND CONSISTENCY + NO MOCK DATA + INTERCONNECTION
==================================================

==================================================
BRAND ASSETS
==================================================

--------------------------------------------------
1. LOGO — REGRESSION CHECK
--------------------------------------------------

Every ChangeAIPay logo appearance must render as ONE TRUE CONCENTRIC CIRCLE.

NEVER:
- square tile behind glow
- rectangular background container
- inconsistent masking
- duplicated background shape

This has regressed twice previously.

Perform an explicit global inspection.

Do not redesign the logo.

--------------------------------------------------
2. FINA — CONSUMER GLOBAL SWEEP
--------------------------------------------------

Use the EXACT uploaded Fina character asset.

Verify consistency across:

- Center floating navigation button
- Fina Chat (111–116)
- AI Suggestions Widget (48)
- Typing indicator
- Voice Mode waveform
- AI empty states
- Any touched/new consumer AI surface

Requirements:
- Same approved character asset.
- Warm/rounded chat bubble.
- Primary Gradient glow.
- No generic avatar.
- No regenerated Fina.
- No alternate Fina illustration.

If already correct:
DO NOT MODIFY.

--------------------------------------------------
3. AINA — MERCHANT GLOBAL SWEEP
--------------------------------------------------

Use the EXACT uploaded Aina character asset.

Verify consistency across:

- Center floating navigation button
- Aina Chat (178–180)
- Aina Voice Mode (see Part C item 15)
- Merchant AI empty states
- Any touched/new merchant AI surface

Requirements:
- Same approved character asset.
- Professional/sharp bubble.
- Accent glow.
- No generic avatar.
- No regenerated Aina.
- No alternate Aina illustration.

If already correct:
DO NOT MODIFY.

--------------------------------------------------
4. CARD NETWORK LOGO SWEEP
--------------------------------------------------

Perform a global sweep across Screens 01–51 and all touched/new screens.

There must be NO:

- Visa logo
- Mastercard logo
- Any other card-network logo

This was previously flagged as unconfirmed.

If any unauthorized card-network logo exists:
remove ONLY the logo.

Do not redesign the surrounding screen.

==================================================
NO MOCK / FROZEN DATA
==================================================

--------------------------------------------------
5. SHARED TRANSACTION STATE
--------------------------------------------------

Apply the existing Enter Amount (55) → Review (56) fix rule to every remaining
transaction flow.

Each flow must use ONE shared transaction state.

Requirements:

- Amount is stored in shared state.
- Fee recalculates live.
- Total recalculates live.
- Review uses the current amount.
- Confirmation uses the same state.
- Success uses the same state.
- Receipt/detail uses the same state.
- No hardcoded placeholder values may override actual user input.

--------------------------------------------------
6. TWO-INPUT END-TO-END DATA TEST
--------------------------------------------------

Test every relevant money-, count-, or name-bearing flow using AT LEAST TWO
meaningfully different real inputs.

Previously passed flows:
- Payments
- Split
- Refund
- Add Money
- Withdraw
- Crypto Buy
- Crypto Sell
- Goals
- Merchant Invoice
- Merchant Payout
- Subscription Checkout

Do not unnecessarily alter these already-passed flows.

Extend verification to:

- Transaction History
- Transaction Detail
- Receipt
- Spending Insights
- Business Health
- Revenue Overview
- Cash Flow
- Institutional Payments

Use at least two different values.

Example:
Input A = 100
Input B = 500

Verify the resulting review/confirmation/success/detail/receipt or analytics state
reflects the correct corresponding input.

For name-bearing screens:
test at least two different names.

For count-bearing screens:
test at least two different quantities.

Where backend data is genuinely unavailable:
use clearly realistic demo data according to the existing project rule.

BUT:
demo data must still behave dynamically.

Never use a frozen/dummy value that ignores what the user actually entered or did.

==================================================
INTERCONNECTION
==================================================

--------------------------------------------------
7. ZERO DEAD ENDS
--------------------------------------------------

Every tappable element on every screen must either:

A. perform its intended action, OR
B. route to a real existing screen.

Audit:
- Navigation tabs
- Cards
- List rows
- CTAs
- Quick actions
- Buttons
- Relevant icons

No dead ends.
No blank destinations.
No fake destinations.

--------------------------------------------------
8. EXPLICIT ROUTING MAP
--------------------------------------------------

Re-verify the earlier routing map:

Send → 53
Request → 77
Add Money → 77
Scan → 62
Generate QR → 171
View Payout → 172

Do not redirect these to unrelated generic hubs when the specified destination
already exists.

--------------------------------------------------
9. BOTTOM NAVIGATION STATE
--------------------------------------------------

Confirm active-tab indicator updates correctly on:

- Every consumer screen.
- Every merchant screen.
- Institutional Payments module.
- Newly touched screens.

No stale indicator.
No incorrect highlighted tab.

--------------------------------------------------
10. UNIVERSAL INTERACTION RULES
--------------------------------------------------

Every new/touched screen must respect the existing interaction rules:

- X closes modal.
- Back arrow = exactly one screen back.
- No blank loading screens.
- Loading states resolve.
- Optimistic UI where already required.
- Swipe-down refresh where applicable.
- Existing interaction patterns remain consistent.
- No navigation loops.
- No dead ends.
- No broken CTAs.

Do not introduce unrelated new interaction patterns.

--------------------------------------------------
11. NANO ZERO-FEE CRYPTO SWEEP
--------------------------------------------------

Nano (XNO) is the app's native feeless settlement asset. On every crypto trading
surface, Nano must be treated as fee-exempt while all other supported crypto assets
keep their existing tiered trading fee (Compare Plans 137: Free 1.5%, Edge 1.0%,
Prime 0.5%, Apex 0.25%).

Required changes:

- Crypto Buy (91): Nano appears as a "Recommended" option in the asset list, with a
clearly visible "$0 Fee" badge distinct from other assets' fee display.

- Provider Comparison (92): Nano's fee line always shows $0, regardless of the
account's subscription tier.

- Review (93): fee/total recalculates live per the existing shared-state rule —
when Nano is the selected asset, fee = $0 and total = amount entered; when any
other asset is selected, fee follows the tiered percentage.

- Crypto Home (90): Nano's list entry carries a distinct "Zero Fee" badge or label
separate from other listed assets.

- Sell (96) and Sell Confirmation (97): the same zero-fee treatment applies
symmetrically when selling Nano.

- Compare Plans (137): add a one-line clarification beneath the existing "Crypto
trading fee" row — "Nano trades are always fee-free, regardless of plan" — so the
tiered percentages shown there aren't misread as applying uniformly to every asset
including Nano.

- Wallet Detail (39)'s existing "Powered by Nano" section: if a CTA to buy/add Nano
exists or is added there, it must route directly into Crypto Buy (91) with Nano
pre-selected — not into a generic crypto flow requiring the user to re-select it.

This is a real fee-accuracy issue, not a cosmetic one. Test with the shared-state
protocol already established: buy Nano ($0 fee shown/charged) and buy one other
asset (tiered fee shown/charged correctly) end-to-end, confirm both calculate
correctly and independently.

--------------------------------------------------
12. NETWORK TRANSPARENCY SCREEN — CONFIRM AND LIGHT CROSS-LINK
--------------------------------------------------

The existing Network Transparency screen (built under Security in the Nano
visibility batch) explains Open Representative Voting and states that ChangeAIPay
runs its own delegated nodes. This screen is correct as built and must NOT be
removed — it is the informational backing for the "Powered by Nano" trust
positioning, and becomes more relevant now that Nano's zero-fee status is being
surfaced more prominently on Crypto Buy/Sell.

Add exactly one small, optional cross-link: on the Crypto Buy (91) "$0 Fee" badge
for Nano, add a "Why is this free?" tap target that opens the Network Transparency
screen. This must be a secondary, dismissible link — never a required step, never
interrupting the buy flow. Do not duplicate or restate the transparency screen's
content elsewhere.

--------------------------------------------------
13. FLOATING QUICK-ACTION TOGGLE REMOVAL — CRITICAL, REPEAT FAILURE
--------------------------------------------------

THIS FIX HAS NOW FAILED ON MULTIPLE PREVIOUS ATTEMPTS DESPITE EXPLICIT
INSTRUCTION AND DIRECT SCREENSHOT EVIDENCE. Treat this as a debugging task, not
a repeat request.

The floating right-side quick-action toggle (a hamburger-style circular button,
whether or not its expanded Send/Scan QR/AI/Alerts panel is also present) must
be COMPLETELY REMOVED from Home and from every screen it appears on. It has
been confirmed still present via direct screenshot after at least two prior
removal attempts.

Required this time:
- Search the entire component tree for every instance of this floating toggle —
it may exist as a duplicated layer, a separate persistent overlay component
layered above the screen content, or a cached/orphaned instance outside the main
Home screen hierarchy, which would explain why prior removal attempts appeared
to work but did not actually take effect.
- Remove every instance found, not only the one visible on the primary Home
screen state.
- Do NOT replace it with any alternative floating element, in any form.
- Send and Scan QR remain reachable via the Payments Hub / Pay tab.
- AI remains reachable via the center floating Fina button.
- Alerts remain reachable via the notification bell icon in the Home header.

In the audit report, explicitly state WHERE the lingering instance(s) were
found and WHY previous removal attempts missed them. Do not mark this item
closed without that explanation — "removed" alone is not sufficient given the
repeat-failure history on this specific item.

--------------------------------------------------
14. SYSTEM UPDATE (BACKGROUND OTA) OVERLAY — CONFIRM
--------------------------------------------------

A new System Update overlay was added — a non-blocking background update-download
card, distinct from and not replacing the existing blocking Update Required (02)
screen. Verify:

- The overlay exists and is visually distinct from Update Required (02); Update
Required itself remains completely untouched.
- Both text lines (the small label above the heading, and the subtitle below it)
contain real, coherent, on-brand copy — confirm no garbled or nonsensical
placeholder text was carried over from any reference design.
- The progress bar and percentage counter genuinely update over time rather than
showing a frozen static number.
- The "Restart Now" button shows a disabled/downloading state until the update
completes, then becomes functionally active.
- The overlay uses the app's existing glassmorphism/glow card treatment — no new
visual style was invented for it.

--------------------------------------------------
15. AINA VOICE MODE — CONFIRM PARITY WITH FINA
--------------------------------------------------

Aina (merchant AI) previously lacked any Voice Mode entirely, while Fina (consumer
AI) already has a full Voice Mode screen (mic header icon, input-bar mic, full-
screen Listening state, waveform, call timer, Text/Transcript toggles, end-call
control row). A new Aina Voice Mode screen was added mirroring Fina's exact
layout/mechanics with only the persona layer swapped. Verify:

- Aina Voice Mode uses Aina's own existing character asset — never Fina's.
- Aina Voice Mode uses Aina's established Accent-glow treatment — never Fina's
Primary Gradient glow.
- The screen is labeled "Aina" with merchant-appropriate status framing.
- Only the two mic entry points (header icon, input-bar mic) were added to the
existing Aina Chat (178-180) screen — nothing else on Aina Chat changed.
- Fina's Voice Mode screen (part of 111-116) is completely untouched and
unaffected by this addition.

--------------------------------------------------
16. TRANSACTION LIMIT REACHED (43) — MISSING CONFIRMATION FEEDBACK
--------------------------------------------------

Tapping "Continue with 1.5% fee" on the Free Allowance Used / Transaction Limit
Reached screen (43) currently does nothing visible — no confirmation message, no
acknowledgment, no clear signal the choice was registered. Fix: tapping this
control must show a clear confirmation (a brief success state or toast
confirming the standard fee will now apply, or advancing directly into the
transaction flow it was gating) before the screen dismisses. The user must never
be left wondering whether their tap did anything.

--------------------------------------------------
17. ACCOUNT TYPE SELECTION (08) — BUSINESS CTA STYLING REGRESSION
--------------------------------------------------

This was already fixed once — an earlier batch added a matching "Start as
Business →" button using the same visual treatment as "Start as Personal." It
has regressed: "Start as Business" currently renders as an outlined/bordered
button while "Start as Personal" uses the filled blue gradient treatment. Fix
again and confirm this time: both buttons must use identical styling — same
blue gradient fill, same weight, same visual prominence. Neither account type
should look secondary to the other.

==================================================
PART D — NEW MODULE VERIFICATION (INSTITUTIONAL, PARITY, RECURRING BILLING)
==================================================

These modules were added after the original Part A/B/C scope was defined. Same
rule applies: do not assume issued = built. Verify each is actually live.

--------------------------------------------------
1. INSTITUTIONAL PAYMENTS MODULE
--------------------------------------------------

10 screens: Institutional Payments Dashboard, Capital Market Settlement Overview,
Trade Settlement Details, Settlement Monitoring, Settlement Exception Center,
Institutional Transaction History, Counterparty Details, AI Settlement Risk &
Insights, Settlement Timeline, Settlement Confirmation.

Verify:
- Entry point is a single conditional card on Merchant Home, visible ONLY to
Enterprise-tier accounts. Confirm non-Enterprise merchants never see it.
- The module's internal segmented tab bar is used for navigation between its own
10 screens — the existing main merchant bottom nav bar is untouched.
- The Nano-instant-settlement claim (T+0 vs. market-standard T+1/T+2) on Capital
Market Settlement Overview reflects actual demo data, not a static unverified claim.
- Settlement Confirmation uses the Pulse motif — confirm it does NOT appear on any
other screen in this module (Pending/Monitoring/Exception states must NOT use
Pulse, per the existing motif rule).
- Every tappable element across all 10 screens routes correctly — zero dead ends,
including AI Settlement Risk & Insights cards linking into the correct Trade/
Counterparty detail screens.

--------------------------------------------------
2. PAYMENT-PLATFORM PARITY MODULE (GROUPS 1–6)
--------------------------------------------------

11 screens: Payment Links (Hub/Create/Detail), Payout Settings, Risk & Fraud
Center (List/Detail), Payment Dispute Center (File/Respond/Status), Developer &
API Settings, Merchant Statements.

Verify:
- Payment Links, Payout Settings, Risk & Fraud Center, and Dispute Center entry
points were added to their specified existing locations (Merchant Payments Hub,
Merchant Profile/Settings, Merchant Home/Business Health, consumer Transaction
Detail) WITHOUT altering those screens' existing layouts beyond the one added
entry point.
- Developer & API Settings is visible ONLY to Enterprise-tier merchant accounts —
confirm no other tier can reach it.
- Payment Link Detail's copy/share controls use the same native share-sheet
behavior already established elsewhere in the app (not a new pattern).
- Dispute Status is genuinely shared/synced between the consumer and merchant view
of the same dispute — not two independently-tracked states.
- Merchant Statements PDFs reflect the same shared-transaction-state data as
Transaction History, not separately hardcoded figures.

--------------------------------------------------
3. RECURRING BILLING MODULE (GROUP 7)
--------------------------------------------------

4 screens: Recurring Billing Hub, Create Billing Plan, Billing Plan Detail, My
ChangeAIPay Subscriptions.

Verify:
- Cancel Subscription on the consumer-side My ChangeAIPay Subscriptions screen is
immediately reflected in the merchant's Billing Plan Detail subscriber list — test
this specific link directly, don't assume it from the two screens looking correct
independently.
- My ChangeAIPay Subscriptions is confirmed distinct from Subscription Review
(120) — the two must not merge, duplicate entries, or route into each other
incorrectly.
- Recurring Billing entry point was added to the Merchant Payments Hub without
disturbing the layout established by the Payment Links addition from the same hub.

==================================================
PART E — LEGAL/COMPLIANCE UI VERIFICATION
==================================================

These are UI-layer requirements only. The backend/infrastructure counterparts
(encryption at rest, SMS consent enforcement, pixel consent-blocking, COPPA
backend flow, email unsubscribe processing, DMCA takedown backend) are OUT OF
FIGMA SCOPE and must be verified in the separate OpenCode/backend pass — do not
attempt to fake or simulate them here.

--------------------------------------------------
1. BIOMETRIC CONSENT SCREEN (Enable Biometrics, 13)
--------------------------------------------------

Verify explicit consent copy exists before biometric capture: what is collected,
why, and how long it's retained, with a link to a published retention/deletion
policy. This must be a genuine consent step, not a generic "Enable" toggle.

--------------------------------------------------
2. AGE GATE AT SIGNUP (Create Account, 09)
--------------------------------------------------

Verify a neutral date-of-birth/age field exists during signup — neutral phrasing,
not a leading yes/no "are you 13+" question — and that it routes appropriately
if the entered age indicates a minor.

--------------------------------------------------
3. ACCESSIBILITY PASS (app-wide)
--------------------------------------------------

Verify every image has alt text, every interactive element has a visible focus
state, all text meets 4.5:1 contrast, and every modal is closable via a
keyboard-equivalent interaction, across the full app.

--------------------------------------------------
4. CHAT DISCLAIMER (Fina Chat 111-116, Aina Chat 178-180)
--------------------------------------------------

Verify a small, persistent "Confirm details with support" line exists beneath
both chat input areas — including Aina's, given the newly added Voice Mode
(Part C item 15) increases how often merchants will rely on Aina's spoken output.

--------------------------------------------------
5. AI-CAPABILITY COPY AUDIT
--------------------------------------------------

Verify AI-related marketing/plan copy (Subscription Plans 45, Compare Plans 137,
Apex tier's "autonomous AI"/"negotiator" language, AI Suggestions Widget 48, AI
Settlement Risk & Insights) no longer implies guaranteed accuracy or fully
autonomous financial decision-making, and instead uses accurate "assists with"
framing unless a specific claim is genuinely measured and provable.

==================================================
PART F — LEGAL/COMPLIANCE UI VERIFICATION, ROUND 2
==================================================

Additional legal-risk items beyond Part E. Same rule: these are UI-layer items
only; backend counterparts belong in the separate OpenCode pass.

--------------------------------------------------
1. AI-GENERATED CONTENT DISCLOSURE
--------------------------------------------------

Verify Fina Chat (111-116) and Aina Chat (178-180) each show a clear, brief
disclosure that the user is interacting with an AI assistant, shown at minimum
on first use.

--------------------------------------------------
2. COOKIE/TRACKING CONSENT BANNER — REJECT BUTTON
--------------------------------------------------

If any cookie or tracking consent banner exists (web or in-app), verify it has
a Reject option with equal visual prominence to Accept — not just an X, a
"manage preferences" link, or a smaller/de-emphasized reject control. This
extends the existing pixel-consent requirement from Part E.

--------------------------------------------------
3. REPORT BUTTON ON PUBLIC POSTS
--------------------------------------------------

Verify every public post/comment surface (Community 153-158, Feature Center
196-203 comments) has a visible Report control on each post/comment.

--------------------------------------------------
4. DARK-PATTERN COUNTDOWN AUDIT
--------------------------------------------------

Audit every countdown/urgency timer in the app (Referral Milestones 143-152,
Promotional Campaigns 204-207, any subscription upgrade nudge). Confirm each
reflects a real, fixed deadline. Remove or fix any countdown that silently
resets or does not correspond to an actual expiring offer.

--------------------------------------------------
5. CONTENT TAKEDOWN REQUEST OPTION
--------------------------------------------------

Verify any public-facing user-uploaded image (profile photos, Community posts)
has a "Report content" / "Request removal" option. The actual 48-hour removal
processing itself is a backend requirement — flag that portion as NOT FULLY
VERIFIABLE IN FIGMA MAKE.

==================================================
PART G — GLOBAL PRODUCTION-READINESS SWEEP
==================================================

This part exists because "every tappable element" and "no mock data" have so
far been enforced through named lists of specific screens (Part C items 5-7).
This sweep requires the SAME standard applied literally everywhere in the app,
with no screen exempted just because it wasn't individually named elsewhere in
this document.

--------------------------------------------------
1. EVERY BUTTON & SCREEN FUNCTIONALITY — FULL APP
--------------------------------------------------

Go through EVERY screen across the entire app — all 246 base screens, plus
Screens 247/248/the remittance screen, the Nano visibility screens, the
Institutional Payments module (10 screens), the Payment-Platform Parity module
(11 screens), the Recurring Billing module (4 screens), and any other screen
added in any prior batch. For each screen, confirm every button, tab, card,
list row, icon, toggle, and link performs its intended action or routes to a
real, correct destination. No screen is exempt because it wasn't individually
named elsewhere in this document.

Deliverable: produce a full screen-by-screen list. For each screen, state
either "All interactive elements verified functional" or list the specific
non-functional element found and the fix applied. Do not summarize this as a
single blanket statement for the whole app — a per-screen (or per logical
screen group) list is required.

--------------------------------------------------
2. EVERY SCREEN FREE OF MOCK/FROZEN DATA — FULL APP
--------------------------------------------------

Extend the no-mock-data rule (Part C items 5-6) beyond money-, count-, and
name-bearing transaction flows to EVERY screen in the app displaying any
dynamic value — including but not limited to: Achievement Badges (155)
progress, Referral/Change Circle (143-152) momentum stats, Community (153-158)
leaderboard rankings, AI Suggestions Widget (48) content, Spending Insights
charts, Financial Report (117) figures, Settlement volumes and counts across
the Institutional Payments module, Payment Links stats (views/completions),
Recurring Billing subscriber counts, and Merchant Statements figures.

Every one of these must reflect actual current state (or realistic, dynamically
behaving demo data where no backend exists yet) — never a static number that
never changes regardless of what the user does.

Deliverable: produce a full screen-by-screen list. For each screen bearing any
dynamic value, state either "Confirmed dynamic, not frozen" or list the
specific frozen/mock value found and the fix applied.

==================================================
MANDATORY FINAL VERIFICATION WALKTHROUGHS
==================================================

Before producing the audit report, perform these walkthroughs.

TEST A — BRAND-NEW PERSONAL USER

Start from Welcome.

Verify:
Account Created (11)
→ PIN (12)
→ Biometrics (13)
→ 2FA (14)
→ Home (38)

Confirm ZERO KYC screens appear before Home.

--------------------------------------------------

TEST B — BRAND-NEW BUSINESS USER

Start from Welcome.

Complete the current Business onboarding.

Verify:
- Qualification
- Personalization
- Routing
- First-value path
- No unnecessary delay

--------------------------------------------------

TEST C — RETURNING USER

Test normal login and, where executable, Apple/Google OAuth.

Verify returning users reach Home (38) without being incorrectly sent through
new-user onboarding.

--------------------------------------------------

TEST D — INTENT PERSONALIZATION

Use Intent A.

Record:
- Dashboard widgets
- 247/248 stat
- Subscription plan emphasis
- Compare Plans emphasis

Repeat with Intent B.

Confirm downstream state actually differs.

--------------------------------------------------

TEST E — TRANSACTION DATA

Use at least two different inputs for each applicable touched flow.

Example:
100
500

Verify:
Amount → Fee → Total → Review → Confirmation → Success → Receipt/Detail

remain consistent.

--------------------------------------------------

TEST F — EMPTY STATES

Force zero-data states on every specified empty-state surface.

Confirm the correct canonical empty state appears.

--------------------------------------------------

TEST G — ROUTING

Test every touched CTA plus:

Send → 53
Request → 77
Add Money → 77
Scan → 62
Generate QR → 171
View Payout → 172

Confirm no dead ends.

--------------------------------------------------

TEST H — BRAND CONSISTENCY

Explicitly inspect:
- Logo circle
- Fina
- Aina
- Card-network logo sweep

--------------------------------------------------

TEST I — NOTIFICATIONS

Test behavioral trigger conditions where executable.

Verify:
- 7-day inactivity
- 14-day unfinished goal
- abandoned transaction
- milestone proximity
- Notification Preferences opt-outs

Do not fake external push delivery.

--------------------------------------------------

TEST J — RESTORE PURCHASES

Test restore controls and entitlement handling where executable.

Do not fake store responses.

--------------------------------------------------

TEST K — NANO ZERO-FEE VERIFICATION

Buy Nano and confirm $0 fee is shown and charged at Provider Comparison, Review,
and Success.

Buy one other supported asset and confirm the correct tiered fee (per current
subscription tier) is shown and charged.

Confirm Compare Plans (137) displays the Nano fee-free clarification line.

Confirm the "Why is this free?" link on the Nano fee badge opens Network
Transparency correctly and returns cleanly via back navigation.

--------------------------------------------------

TEST L — NEW MODULE ROUTING

Enter the Institutional Payments module as an Enterprise-tier merchant account;
confirm every one of its 10 screens is reachable and its internal tab bar works
without affecting the main bottom nav. Attempt to reach it as a non-Enterprise
merchant and confirm it is not visible.

--------------------------------------------------

TEST M — RECURRING BILLING SYNC

Create a billing plan, simulate a subscriber, cancel that subscription from the
consumer's My ChangeAIPay Subscriptions screen, and confirm the merchant's
Billing Plan Detail subscriber list updates immediately without a manual refresh.

--------------------------------------------------

TEST N — QUICK-ACTION TOGGLE REMOVAL, FULL SWEEP

Check Home AND every other screen for any remaining instance of the floating
toggle, including any hidden/cached/duplicate component instances — not just
the primary Home state. Confirm zero instances remain anywhere in the app, and
document where any found instances were located and why they persisted.

--------------------------------------------------

TEST O — SYSTEM UPDATE OVERLAY

Trigger the System Update overlay and confirm the progress percentage actually
advances over time (not static). Confirm both text lines are real, coherent copy
(not placeholder gibberish). Confirm Restart Now is disabled until completion and
becomes active only then. Confirm Update Required (02) is completely unaffected
by this addition.

--------------------------------------------------

TEST P — AINA VOICE MODE PARITY

Open Aina Voice Mode via both entry points (header mic icon and input-bar mic)
on Aina Chat. Confirm it uses Aina's asset and Accent-glow treatment throughout
— never Fina's asset or Primary Gradient glow. Confirm Fina's own Voice Mode is
unaffected. Confirm Aina Chat itself has no other changes beyond the two mic
entry points.

--------------------------------------------------

TEST Q — LEGAL/COMPLIANCE UI CHECK

Confirm the biometric consent screen, age-gate field, chat disclaimers (Fina and
Aina), and at least three accessibility fixes (alt text, focus state, contrast)
are genuinely present and functional. Confirm AI-capability copy in at least two
locations (e.g. Compare Plans, Apex tier description) has been softened away
from guaranteed/autonomous claims. Mark any backend-dependent compliance item as
NOT FULLY VERIFIABLE IN FIGMA MAKE rather than attempting to simulate it.

--------------------------------------------------

TEST R — FREE ALLOWANCE CONFIRMATION

Trigger the Free Allowance Used / Transaction Limit Reached screen (43), tap
"Continue with 1.5% fee," and confirm a clear, visible confirmation appears
before the screen dismisses.

--------------------------------------------------

TEST S — ACCOUNT TYPE BUTTON PARITY

Open Account Type Selection (08) and confirm "Start as Personal" and "Start as
Business" use pixel-identical button styling — same fill, same gradient, same
weight, same prominence.

--------------------------------------------------

TEST T — LEGAL/COMPLIANCE ROUND 2

Confirm AI disclosure appears on first Fina/Aina chat use, confirm any consent
banner has an equal-prominence Reject button, confirm Report controls exist on
public posts, confirm no dark-pattern countdown timers remain, and confirm a
content takedown-request option exists on public image uploads.

--------------------------------------------------

TEST U — GLOBAL BUTTON SWEEP

Using the full screen-by-screen list produced in Part G item 1, spot-check at
least one interactive element on every distinct screen category in the app —
not just previously-flagged ones — and confirm it performs a real action.

--------------------------------------------------

TEST V — GLOBAL NO-MOCK-DATA SWEEP

Using the full screen-by-screen list produced in Part G item 2, spot-check at
least one dynamic value on every distinct screen category in the app and
confirm it reflects real/dynamic state rather than a frozen placeholder.

==================================================
DELIVERABLE — FINAL AUDIT REPORT
==================================================

Report ALL 32 TOP-LEVEL ITEMS:

PART A:
1–10

PART B:
1–7

PART D:
1–3

PART E:
1–5

PART F:
1–5

PART G:
1–2

For EVERY item report exactly:

A. CURRENT STATE BEFORE THIS PASS
B. EXACT FIX APPLIED, IF ANY
C. EXACT VERIFICATION PERFORMED
D. SCREENS TESTED
E. TEST INPUTS USED
F. FINAL STATUS

Do not write only:
"Fixed"
"Done"
"Working"
"Verified"
"Looks good"

Instead provide concrete evidence.

Example:

ITEM 4 — RESTORE PURCHASES

Current state before pass:
Restore Purchases control existed on Consumer Checkout but entitlement
restoration was not previously confirmed.

Exact fix:
Connected the control to the existing entitlement restoration integration point.

Verification:
Tested Consumer Checkout (138) and Billing History (141).
Verified control invocation, loading state, and entitlement-state handling
available in the environment.

Inputs:
Consumer entitlement state A / entitlement state B.

Final status:
PARTIALLY VERIFIED — UI and integration path verified, but live App Store/
Play Store entitlement response could not be executed in Figma Make.

==================================================
FINAL REPORT REQUIREMENTS
==================================================

Also provide a separate short section:

ALREADY CORRECT — NOT MODIFIED
List anything inspected and intentionally left untouched because it already
satisfied the requirement.

NOT FULLY VERIFIABLE
List every external integration that could not genuinely be tested.

REMAINING EXTERNAL INTEGRATION WORK
List only work that must happen outside Figma Make.

ONBOARDING CHANGES
List exactly which onboarding screens, if any, were removed or corrected and why.

ROUTING ISSUES FOUND
List every dead end or incorrect route discovered and the exact correction.

DATA TEST SUMMARY
List each flow tested and the two inputs used.

BRAND SWEEP SUMMARY
Explicitly state:
- Logo circle result
- Fina result
- Aina result
- Card-network-logo sweep result

NANO FEE SWEEP SUMMARY
Explicitly state:
- Nano zero-fee result (Buy/Sell, all surfaces)
- Tiered-fee result for the other asset tested
- Compare Plans clarification-line result
- "Why is this free?" cross-link result

NEW MODULE ROUTING SUMMARY
Explicitly state:
- Institutional Payments Enterprise-gating result
- Payment-Platform Parity entry-point integrity result (all 4 hub/settings
insertion points)
- Recurring Billing consumer-to-merchant sync result

TOGGLE REMOVAL SUMMARY — MANDATORY ROOT-CAUSE EXPLANATION
Explicitly state:
- Exactly where the lingering toggle instance(s) were found (component tree
location, layer name, or equivalent)
- Why previous removal attempts did not catch it
- Confirmation zero instances remain anywhere in the app after this pass
- Confirmation Send/Scan QR/AI/Alerts remain reachable via their existing
correct locations
Do not write this section as a simple restatement of "removed" — this item has
failed twice before and requires a real explanation this time.

SYSTEM UPDATE OVERLAY SUMMARY
Explicitly state:
- Confirmation the overlay is distinct from Update Required (02)
- Confirmation both text lines use real, coherent copy (no placeholder gibberish)
- Confirmation the progress bar and Restart Now button are genuinely functional

AINA VOICE MODE SUMMARY
Explicitly state:
- Confirmation Aina Voice Mode uses only Aina's asset/Accent-glow, never Fina's
- Confirmation Fina's Voice Mode is unaffected
- Confirmation Aina Chat has no changes beyond the two new mic entry points

LEGAL/COMPLIANCE UI SUMMARY
Explicitly state:
- Biometric consent screen result
- Age-gate field result
- Accessibility pass result (alt text/focus/contrast)
- Chat disclaimer result (both Fina and Aina)
- AI-capability copy audit result
- Any items marked NOT FULLY VERIFIABLE IN FIGMA MAKE, listed by name

FREE ALLOWANCE CONFIRMATION SUMMARY
Explicitly state:
- The confirmation shown after tapping "Continue with 1.5% fee"

ACCOUNT TYPE BUTTON PARITY SUMMARY
Explicitly state:
- Confirmation both CTAs on Account Type Selection now use identical styling

LEGAL/COMPLIANCE ROUND 2 SUMMARY
Explicitly state:
- AI disclosure result
- Cookie/tracking Reject-button result
- Report-button-on-posts result
- Dark-pattern countdown audit result
- Content takedown-request option result

GLOBAL PRODUCTION-READINESS SWEEP SUMMARY
Explicitly state:
- Total screens checked for button functionality, and total issues found/fixed
- Total screens checked for mock/frozen data, and total issues found/fixed
- Reference the full per-screen lists produced in Part G items 1 and 2

==================================================
PRODUCTION-READINESS FINAL DECLARATION
==================================================

State exactly one of the following, with reasoning:

PRODUCTION READY
= Every item in this report is VERIFIED, every Part G per-screen list shows no
outstanding issues, and no item is blocked on something other than an external
integration already flagged as NOT FULLY VERIFIABLE IN FIGMA MAKE.

PRODUCTION READY WITH NOTED EXTERNAL DEPENDENCIES
= All Figma-scope work is complete and verified; list every remaining external/
backend dependency that must be completed outside Figma Make before real launch.

NOT YET PRODUCTION READY
= List every specific blocking issue that remains, by item number, with what is
still required to close it.

This declaration must be a direct, explicit verdict — not implied by the rest
of the report.

==================================================
ABSOLUTE FINAL RULE
==================================================

DO NOT redesign.

DO NOT regenerate approved assets.

DO NOT disturb already-correct screens.

DO NOT create fake functionality.

DO NOT claim external integrations are real if they cannot actually be executed.

DO NOT claim verification without an actual test.

DO NOT stop after applying fixes.

This batch is complete ONLY after:

FIX → TEST → VERIFY → AUDIT REPORT

has been performed.

This is a FINAL FIX + VERIFY + PRODUCTION-AUDIT pass only.