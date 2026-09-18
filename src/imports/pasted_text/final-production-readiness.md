```
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
Payment-Platform Parity, Recurring Billing, Pricing/Financial Overview, Trust &
Safety, Emergency Freeze, Smart Receipt Tracker, and Financial/Business Health
Meter modules — they retain their built state except where a Part below explicitly
requires a fix.

ADDITIVE/CORRECTIVE ONLY.

Do not create alternative versions of existing screens.

Do not "improve" screens that are already correct.

Do not regenerate screens unnecessarily.

Do not modify unrelated screens.

Work strictly in this order:

PART A → PART B → PART C → PART D → PART E → PART F → PART G → PART H → PART I → PART J → PART K → PART L → FINAL AUDIT REPORT

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

--------------------------------------------------
18. ACCOUNT TYPE SELECTION (08) — BUSINESS "+2 MORE" TAG NON-FUNCTIONAL
--------------------------------------------------

Tapping "+2 more" on the Business Account card currently does nothing — no
expansion, no reveal, no visible content change. Fix: tapping it must reveal
the two additional Business features it represents, using a simple inline
expansion or popover consistent with the existing card's visual system.
Confirm real content appears, not a static label that never resolves.

--------------------------------------------------
19. ACCOUNT TYPE SELECTION (08) — BUSINESS FEATURE LIST STYLING INCONSISTENCY
--------------------------------------------------

The Business Account card's feature list currently renders as unmarked
pill/chip tags, while the Personal card's feature list uses blue circular
checkmarks. Fix: apply the identical checkmark treatment (same icon, same
blue color, same spacing/layout) to the Business feature list so both cards
use one consistent pattern. Do not invent a new visual style for either card.

--------------------------------------------------
20. TWO-FACTOR VERIFICATION (14) — PHONE NUMBER MASKING
--------------------------------------------------

Confirm the phone number shown on Enable 2FA (14) when a code is sent is
partially masked (showing only enough digits to confirm it's the correct
number), consistent with the masking convention already established on OTP
Verification (10) (e.g., "+1 415 •••• 0142" style). Never display the full,
unmasked phone number on this screen.

--------------------------------------------------
21. LANGUAGE SELECTION (233) — FUNCTIONAL PROPAGATION, CONSUMER + MERCHANT
--------------------------------------------------

Language Selection already exists (233) — this is a functional verification
of existing infrastructure, not a new screen. Confirm it is reachable for
both consumer and merchant accounts, and that selecting a language actually
changes the app's displayed language app-wide — not just on the Language
Selection screen itself. Test with at least two different language selections
and confirm the change is reflected consistently across Home, Payments Hub,
and Profile/Settings for whichever account type was tested.

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
(11 screens), the Recurring Billing module (4 screens), the Pricing/Financial
Overview module (Part H), the Trust & Safety module (Part I), the Emergency
Account Freeze module (Part J), the Smart Receipt Tracker module (Part K), the
Financial/Business Health Meter module (Part L), and any other screen added in
any prior batch. For each screen, confirm every button, tab, card, list row,
icon, toggle, and link performs its intended action or routes to a real,
correct destination. No screen is exempt because it wasn't individually named
elsewhere in this document.

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
Recurring Billing subscriber counts, Merchant Statements figures, Net Worth
Overview totals, Business Entities balances, AI Token Usage counts, Trust
Profile scores, Receipt Dashboard category totals, and the Financial/Business
Health Meter score.

Every one of these must reflect actual current state (or realistic, dynamically
behaving demo data where no backend exists yet) — never a static number that
never changes regardless of what the user does.

Deliverable: produce a full screen-by-screen list. For each screen bearing any
dynamic value, state either "Confirmed dynamic, not frozen" or list the
specific frozen/mock value found and the fix applied.

==================================================
PART H — PRICING / FINANCIAL OVERVIEW MODULE VERIFICATION
==================================================

These screens were added after Part G was defined. Same rule applies: do not
assume issued = built. Verify each is actually live, and give NO-MOCK-DATA /
CLEAN-EMPTY-STATE special weight here — this module handles real money figures
and a brand-new user must never see a fabricated number.

--------------------------------------------------
1. FREE → FREE LITE LIFECYCLE
--------------------------------------------------

Verify a brand-new Free account genuinely shows "Full Free Access — Month 1 of
2," the usage indicator reflects real transaction activity (not a static
number), and the account correctly transitions to Free Lite behavior after the
real two-month period — not a cosmetic label with no underlying state change.
Confirm no automatic charge ever occurs at this transition.

--------------------------------------------------
2. ONBOARDING: COUNTRY, CURRENCY, TAX ID, BUSINESS DECLARATION
--------------------------------------------------

Verify the added currency selector, Tax ID field, and business toggle function
correctly and do not disrupt the existing Create Account (09) flow beyond
what was specified.

--------------------------------------------------
3. BUSINESS ENTITIES HUB (MULTI-ENTITY)
--------------------------------------------------

A brand-new Personal user has ZERO business entities. Confirm this shows the
canonical empty state, not a sample entity. Confirm creating a real entity
produces a genuinely separate ledger view, not a duplicate of the personal
transaction list.

--------------------------------------------------
4. NET WORTH & FINANCIAL OVERVIEW MODULE
--------------------------------------------------

A brand-new user has logged nothing. Confirm Net Worth Overview shows a
genuine empty state — explicitly NOT a $0.00 total presented as if it were a
calculated real result, and never a sample asset/liability. Confirm Add
Manual Asset/Liability, Investment Detail, Financial Calendar, and Document
Vault all function correctly once real data is actually entered, and that
Investment Detail's accrued-value calculation is genuinely computed from the
entered rate, not a frozen display number.

--------------------------------------------------
5. AI TOKEN USAGE
--------------------------------------------------

Confirm the token balance shown matches the account's real plan allotment (not
a placeholder number) and decreases with actual usage. Confirm Buy Tokens
completes a real top-up flow.

--------------------------------------------------
6. FINA/AINA CONVERSATIONAL ASSET LOGGING
--------------------------------------------------

Test with a real natural-language balance statement end-to-end and confirm it
produces an actual Manual Asset entry reflected in Net Worth Overview — not a
scripted chat response with no underlying data write.

--------------------------------------------------
7. OTP / VERIFICATION-CODE ENTRY & SUCCESS ANIMATION
--------------------------------------------------

Verify the entrance animation, per-digit confirmed-state glow, native SMS
autofill support, and the bespoke "Verified successfully" transition (checkmark
+ radiating ring, NOT the Pulse motif) function on OTP Verification (10) and
any other numeric-code screen sharing the pattern (Enable 2FA 14, New Device
Verification 23), consumer and merchant.

--------------------------------------------------
8. ACCOUNT CREATION GLOBE — COUNTRY HIGHLIGHT
--------------------------------------------------

Confirm the globe's idle state uses Accent blue dots (never white/gray) and
that selecting a country highlights/fills that country's shape in solid
Accent blue. Test with at least two different country selections and confirm
each highlights correctly and the previous selection's highlight clears.

--------------------------------------------------
9. VOICE/CHAT-INITIATED TRANSACTIONS
--------------------------------------------------

Extends the existing conversational-asset-logging capability (Item 6) to also
parse a transaction request stated in natural language or voice (e.g., "send
$50 to Alex"). Fina/Aina must route this into the existing Send (53)/Amount
(55)/Review (56) flow pre-filled with the parsed details — the transaction is
NEVER auto-executed from chat/voice alone. The user must still explicitly
confirm on the actual Review screen using the existing confirmation pattern,
exactly as if they had navigated there manually.

==================================================
PART I — TRUST & SAFETY MODULE VERIFICATION
==================================================

These screens were added after Part H. Verify each is actually live, with the
same no-mock-data/clean-empty-state emphasis — this module makes claims about
real people's conduct, so a fabricated number here is a real integrity issue,
not just a cosmetic one.

--------------------------------------------------
1. CONDUCT / QUALITY COMPLAINT
--------------------------------------------------

Verify the new "Conduct/Quality Issue" category on File a Dispute functions
end-to-end (File → Respond → Status), evidence upload stays private and is
never displayed publicly, and no facial recognition or identity-matching runs
against any uploaded photo/video.

--------------------------------------------------
2. TRUST PROFILE
--------------------------------------------------

A brand-new or clean account MUST show a neutral "No conduct history" state —
never a fabricated positive score, never a sample number. Confirm the signal
only updates after a complaint is genuinely resolved through the process in
Item 1, and confirm it never displays individual complaint content, evidence,
or the identity of who filed it. Confirm the copy never uses "AI-powered" or
"AI-verified" framing.

--------------------------------------------------
3. MISTAKEN PAYMENT RECOVERY REQUEST
--------------------------------------------------

Confirm this never auto-completes a fund return without the recipient's
explicit action, and that the status tracker (Requested/Returned/Declined)
reflects real state, not a static display.

--------------------------------------------------
4. WHY WAS THIS FLAGGED? (Consumer transparency)
--------------------------------------------------

Confirm this shows the specific, actual reason for a hold — never a generic
placeholder message — and that the appeal path is genuinely reachable with a
real stated response-time commitment.

--------------------------------------------------
5. NEW-RECIPIENT CAUTION MOMENT
--------------------------------------------------

Confirm this triggers only for genuine first-time, unusually-large payments to
a new recipient (not a static always-on banner), surfaces the real Trust
Profile inline, and never blocks or delays the actual payment.

==================================================
PART J — EMERGENCY ACCOUNT FREEZE (SECURITY)
==================================================

Real-world security gap, modeled on the "lock my card" pattern used by every
major neobank when a user suspects fraud or a lost/stolen device — but scoped
to ChangeAIPay's current live product, since the physical/virtual LightCard is
still Coming Soon. Do NOT assume this already exists — verify first; if an
equivalent freeze control already exists anywhere in Security (125), do not
duplicate it, only confirm and extend it to match the requirements below.

--------------------------------------------------
1. FREEZE MY ACCOUNT (Consumer)
--------------------------------------------------

Add a clearly visible "Freeze My Account" control within Security (125), plus
a quick-access link from Profile. Tapping it opens a confirmation screen
explaining exactly what freezing does — blocks outgoing transfers and Send
actions, does NOT block incoming money, does NOT block viewing balance or
transaction history. One-tap confirm freezes the account immediately. Once
frozen, a persistent, unmissable banner appears across Home and Payments Hub
for the duration of the freeze. Unfreezing requires the user to re-authenticate
(PIN or biometric) before outgoing activity resumes. Note in the copy that this
control will also cover the LightCard once that ships.

--------------------------------------------------
2. FREEZE MY BUSINESS ACCOUNT (Merchant)
--------------------------------------------------

Same control and behavior, reachable from Merchant Profile/Settings — blocks
outgoing payouts and merchant-initiated transfers, does not block incoming
customer payments or block viewing Business Health/Revenue data. Same
re-authentication requirement to unfreeze.

==================================================
PART K — SMART RECEIPT TRACKER (AI EXPENSE CAPTURE)
==================================================

Real-world pain point: manually organizing receipts for tax season or expense
tracking takes hours — sorting by category, entering vendor/amount/date by
hand, matching payment method. This closes that gap for both consumer and
merchant. Extends the existing Document Vault (Part H, Item 4's Net Worth
module) rather than duplicating it — Document Vault remains the general
warranty/invoice archive; this adds AI-assisted categorization and a dedicated
dashboard specifically for receipts.

--------------------------------------------------
1. SCAN & AUTO-CROP RECEIPT (Consumer + Merchant)
--------------------------------------------------

Camera capture screen reusing the existing camera-capture pattern already
established for ID Capture, extended with smart automatic edge-detection and
cropping specific to a receipt's rectangular shape — the user should not need
to manually adjust the crop in the normal case. A manual crop-adjust option
remains available as a fallback for a poor auto-detect result.

--------------------------------------------------
2. AI RECEIPT PROCESSING & REVIEW (Consumer + Merchant)
--------------------------------------------------

After capture, show a brief processing state (matching the existing
AI-processing pattern used elsewhere in the app) while the vendor name, date,
total amount, tax amount, suggested tax category (e.g. Meals, Travel, Office
Supplies, Personal, or a merchant-specific equivalent), and payment method are
extracted. Present all fields as editable on a Review screen before saving —
the user can correct any field the AI got wrong. Never save a receipt without
this confirmation step. The actual OCR/AI extraction computation cannot be
executed inside Figma Make — build the correct capture → processing →
editable-review flow, and mark the real extraction accuracy as NOT FULLY
VERIFIABLE IN FIGMA MAKE, consistent with how other AI/backend capabilities
have been handled throughout this project.

--------------------------------------------------
3. RECEIPT DASHBOARD (Consumer + Merchant)
--------------------------------------------------

New dedicated screen, reachable from Document Vault and from Net Worth
Overview (consumer) or Business Health (merchant). Lists every saved receipt
with vendor, date, total, and tax category at a glance. Filterable/sortable by
tax category, vendor, and date range, with a running total per category. A
brand-new account has zero receipts — this MUST show the canonical empty
state, never a sample receipt or a fabricated category total.

--------------------------------------------------
4. RECEIPT DETAIL (Consumer + Merchant)
--------------------------------------------------

Tapping a saved receipt shows the cropped image alongside all confirmed
fields, with Edit and Delete actions. Editing here updates the same record
shown on the Dashboard — no duplicate or orphaned copy.

==================================================
PART L — FINANCIAL / BUSINESS HEALTH METER
==================================================

New feature, genuinely absent from the current build — a single at-a-glance
0-100 health score, distinct from the existing detailed Net Worth Overview and
Business Health screens. CRITICAL: this must never show a fabricated or
default starting number — a brand-new account with insufficient real data
MUST show a clean "Not enough data yet" empty state, never any score at all,
until genuinely computable from real user data.

--------------------------------------------------
1. FINANCIAL HEALTH METER (Consumer)
--------------------------------------------------

New element on Net Worth Overview (or Home, as a compact widget) — a visual
gauge/meter showing a computed 0-100 score, derived only from real data
already captured elsewhere in the app (e.g., spending-vs-income patterns from
Spending Insights, Goal progress, Net Worth trend). Tapping it shows a brief
breakdown of what's contributing to the score. Until the account has enough
real transaction/Goal/asset history to compute a genuine score, show the
empty state instead — never a placeholder number like 50 or 70.

--------------------------------------------------
2. BUSINESS HEALTH SCORE METER (Merchant)
--------------------------------------------------

Same concept added to the existing Business Health (174) screen — a computed
0-100 score derived from real revenue/cash-flow data already shown there.
Same empty-state rule: no score until genuinely computable from real data.

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

--------------------------------------------------

TEST W — PRICING & FREE LIFECYCLE

Create a test account, verify Full Free status and usage indicator reflect
real activity, and confirm the Free Lite transition and soft-paywall triggers
function on real state rather than a cosmetic label.

--------------------------------------------------

TEST X — FINANCIAL OVERVIEW & MULTI-ENTITY

On a brand-new account, confirm Net Worth Overview and Business Entities Hub
both show genuine empty states. Add one real business entity and one real
manual asset, and confirm both flow through correctly with zero mock values
remaining anywhere in either module.

--------------------------------------------------

TEST Y — OTP & GLOBE INTERACTIONS

Trigger OTP Verification end-to-end and confirm the full entrance/confirm/
success-animation sequence. Select at least two different countries on the
Create Account globe and confirm each highlights correctly.

--------------------------------------------------

TEST Z — TRUST & SAFETY MODULE

On a brand-new account, confirm the Trust Profile shows a neutral empty state.
File one test Conduct/Quality Complaint end-to-end (File → Respond → Status)
and confirm evidence stays private throughout. Confirm the Mistaken Payment
Recovery Request cannot auto-complete without recipient action.

--------------------------------------------------

TEST AA — VOICE/CHAT TRANSACTION INITIATION

State a transaction request in natural language to Fina (e.g., "send $50 to
Alex") and confirm it routes into the existing Send/Amount/Review flow
pre-filled, and that no transaction executes without explicit confirmation on
Review.

--------------------------------------------------

TEST BB — EMERGENCY ACCOUNT FREEZE

Freeze a test consumer account and confirm outgoing transfers are blocked while
incoming/balance/history remain visible, and that the persistent frozen banner
appears. Unfreeze and confirm re-authentication is required. Repeat for a test
merchant account with Freeze My Business Account.

--------------------------------------------------

TEST CC — SMART RECEIPT TRACKER

Capture a test receipt end-to-end (scan → auto-crop → processing → review/edit
→ save) and confirm it appears correctly on the Receipt Dashboard with the
right category. Confirm a brand-new account shows the genuine empty state
before any receipt is added. Confirm this works identically for a merchant
account tracking a business expense.

--------------------------------------------------

TEST DD — ACCOUNT TYPE SELECTION BUSINESS CARD FIXES

Tap "+2 more" on the Business Account card and confirm the two additional
features are actually revealed. Confirm the Business card's feature list uses
the identical blue checkmark treatment as the Personal card.

--------------------------------------------------

TEST EE — 2FA PHONE MASKING

Trigger a code send on Enable 2FA (14) and confirm the displayed phone number
is partially masked, matching the masking convention already used on OTP
Verification (10) — never the full unmasked number.

--------------------------------------------------

TEST FF — LANGUAGE PROPAGATION

Select at least two different languages on Language Selection (233), once as a
consumer and once as a merchant, and confirm the app's displayed language
actually changes app-wide for each — not just on the Language Selection screen.

--------------------------------------------------

TEST GG — FINANCIAL / BUSINESS HEALTH METER

On a brand-new consumer account with no data, confirm the Financial Health
Meter shows the "Not enough data yet" empty state, never a placeholder score.
Add enough real data (transactions, a Goal) to make a genuine score
computable, and confirm a real score then appears. Repeat for the Business
Health Score Meter on a merchant account.

==================================================
DELIVERABLE — FINAL AUDIT REPORT
==================================================

Report ALL 54 TOP-LEVEL ITEMS:

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

PART H:
1–9

PART I:
1–5

PART J:
1–2

PART K:
1–4

PART L:
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

PRICING & FINANCIAL OVERVIEW SUMMARY
Explicitly state:
- Free → Free Lite lifecycle result, confirmed on real state not a label
- Business Entities Hub and Net Worth Overview empty-state results for a
brand-new account, explicitly confirming no fabricated figures
- AI Token Usage and conversational asset-logging results
- OTP animation and globe-highlight results
- Voice/chat-initiated transaction result, confirming it never bypasses Review

TRUST & SAFETY MODULE SUMMARY
Explicitly state:
- Trust Profile empty-state result for a brand-new account (must show neutral
"No conduct history," never a fabricated score)
- Conduct/Quality Complaint end-to-end result, with confirmation evidence
stayed private throughout
- Mistaken Payment Recovery and Why Was This Flagged? results

EMERGENCY FREEZE SUMMARY
Explicitly state:
- Confirmation of what Freeze blocks vs. does not block, for both consumer and
merchant
- Confirmation unfreeze requires re-authentication
- Confirmation no duplicate freeze control was created if one already existed

SMART RECEIPT TRACKER SUMMARY
Explicitly state:
- Scan/auto-crop result for both consumer and merchant
- Confirmation the AI extraction/review step never saves a receipt without
user confirmation
- Receipt Dashboard empty-state result for a brand-new account
- Confirmation of which portion, if any, was marked NOT FULLY VERIFIABLE IN
FIGMA MAKE (real OCR/AI extraction accuracy)

ACCOUNT TYPE SELECTION FIXES SUMMARY
Explicitly state:
- "+2 more" tag expansion result
- Business feature list checkmark-consistency result

2FA MASKING SUMMARY
Explicitly state:
- Confirmation the phone number shown on Enable 2FA is partially masked,
consistent with OTP Verification's existing masking convention

LANGUAGE PROPAGATION SUMMARY
Explicitly state:
- Confirmation Language Selection (233) is reachable for both consumer and
merchant
- Confirmation the selected language actually changes the app's displayed
language app-wide for both account types, with the two languages tested

FINANCIAL/BUSINESS HEALTH METER SUMMARY
Explicitly state:
- Empty-state result for a brand-new consumer account
- Real-score result once genuine data exists, for both consumer and merchant
- Confirmation no fabricated or default starting number was ever shown

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
```