PROJECT: ChangeAIPay — Combined Development Brief

These are two independent workstreams in the same app. Each has its own
scope and its own STOP condition. Completing one does not require or
block the other. Part A must not touch onboarding screens 01-45 or the
personal flow. Part B must not touch the merchant/Enterprise institutional
screens.

==================================================
PART A — INSTITUTIONAL PAYMENTS & CAPITAL MARKET SETTLEMENT MODULE (NEW ADDITION)
==================================================

IMPORTANT
The existing ChangeAIPay app already has its UI, design system, screens,
navigation, and architecture fully defined. Do NOT redesign, reposition,
rebrand, or change anything about the existing product — not the
mobile-frame rules, not the Pulse motif rules, not the bottom nav, not any
built screen. Everything below is ADDITIVE ONLY: 10 new screens using the
exact existing visual system (glassmorphism, Accent-color glowing headers,
Hanken Grotesk/Inter typography, 390×844 mobile frame, thumb-zone CTAs),
extending the Merchant (Aina) side for Enterprise-tier accounts
specifically. Every screen must be fully functional and interactive — real
filters, real search, real status states, real detail views, real demo
data — not static mockups.

ENTRY POINT — DO NOT MODIFY EXISTING NAV
Do not add anything to the existing merchant bottom nav bar (Home,
Payments, Insights, Profile, Plans, Requests) — that stays exactly as
built. Instead, add ONE new conditional card on Merchant Home, visible
only to Enterprise-tier subscribers: "Institutional Payments" (with a
brief one-line subtitle, e.g. "Capital markets settlement & counterparty
tools"). Tapping it opens Screen 1 below. All 10 new screens share their
own internal segmented tab bar (same pattern as the existing Payments
Hub's internal tabs) so users can move between them without ever touching
the main bottom nav.

SCREEN 1 — INSTITUTIONAL PAYMENTS DASHBOARD
Top-level hub for the module. KPI cards across the top: Total Settlement
Volume (rolling 30 days), Pending Settlements (count), Open Exceptions
(count), Active Counterparties (count), Settlement Success Rate (%).
Below that, a Recent Activity feed showing the last 5 settlement events
(trade ID, counterparty, status badge, timestamp). Quick-nav row into the
other 9 screens. Internal segmented tab bar anchored at the bottom of
this module.

SCREEN 2 — CAPITAL MARKET SETTLEMENT OVERVIEW
Breakdown by asset class: Equities, Fixed Income, FX, Digital Assets. For
each: volume, trade count, average settlement time, and % settled
instantly via the Nano rail vs. traditional correspondent/SWIFT rails —
this is a real differentiator worth surfacing here (ChangeAIPay's
underlying Nano settlement enables T+0 instant settlement where the
market standard is T+1/T+2). Include a settlement-volume trend chart over
time and a settlement-cycle indicator per asset class (T+0 Nano / T+1 /
T+2).

SCREEN 3 — TRADE SETTLEMENT DETAILS
Individual trade record view: Trade ID, Counterparty name,
Asset/Instrument, Quantity, Price, Trade Date, Settlement Date,
Settlement Method (Nano Instant / Correspondent Bank / SWIFT), DVP
(delivery-versus-payment) indicator, status badge
(Pending/Matched/Settled/Failed/Partial). Action buttons: View Timeline
(→ Screen 9), Flag Exception (→ Screen 5), Download Confirmation.

SCREEN 4 — SETTLEMENT MONITORING
Live, filterable status board. Filters: Status
(Pending/Matched/Settled/Failed/Partial), Asset Class, Counterparty, Date
Range. Search by Trade ID or Counterparty name. Each row shows a
live-updating status badge and is tappable into Trade Settlement Details
(Screen 3). Include sort options (newest first, by settlement date, by
counterparty).

SCREEN 5 — SETTLEMENT EXCEPTION CENTER
List of failed/at-risk settlements needing action. Each entry shows:
exception reason (Insufficient Securities, Mismatched Instructions,
Counterparty Default Risk, Late Confirmation), severity level, age of
exception, assigned resolver. Filters by severity/reason/age. Tapping an
entry opens a detail view with resolution actions: Retry Settlement,
Escalate, Contact Counterparty, Mark Resolved — each a real, working
action that updates the exception's status.

SCREEN 6 — INSTITUTIONAL TRANSACTION HISTORY
Full historical settlement ledger. Filterable by date range, counterparty,
asset class, status. Exportable (CSV/PDF), matching the existing Export
screen (84) pattern. Each row opens into Trade Settlement Details (Screen
3).

SCREEN 7 — COUNTERPARTY DETAILS
Counterparty profile: name/logo, relationship-since date, credit/risk
rating, settlement fail rate (%), active trade count, total volume
year-to-date, Standard Settlement Instructions (SSI) on file, recent
settlement history list. Action buttons: View All Trades (→ filtered
Screen 6), Flag for Review, Update SSI.

SCREEN 8 — AI SETTLEMENT RISK & INSIGHTS
Uses the same visual pattern as the existing AI Suggestions Widget (48) /
Financial Report (117), adapted for institutional risk. Proactive,
one-tap-actionable insights: predicted settlement-fail risk flags before
they happen, counterparty risk-score trend alerts, anomaly detection
(e.g., "Counterparty X's fail rate increased 15% this month"). Each
insight card links directly into the relevant Trade Settlement Details or
Counterparty Details screen.

SCREEN 9 — SETTLEMENT TIMELINE
Visual step-by-step lifecycle view for a single trade: Trade Executed →
Confirmed/Affirmed → Matched → Clearing → Settlement Initiated → Settled
(or Failed, with reason shown inline). Each step timestamped, current
step visually highlighted. Reached via the "View Timeline" button on
Trade Settlement Details (Screen 3).

SCREEN 10 — SETTLEMENT CONFIRMATION
Final confirmation screen shown when a settlement completes, or when an
authorized user approves/releases a settlement action from the Exception
Center. Shows Trade ID, amount, counterparty, settlement method,
timestamp, and a confirmation/reference number. Uses the Pulse motif here
— this qualifies as a payment-success completion under the existing rule
for where Pulse is allowed. Includes a "Download Confirmation Receipt"
action.

PART A — GLOBAL REQUIREMENTS
- Gate the entire module behind Enterprise-tier merchant accounts only —
  non-Enterprise merchants should never see the entry card.
- Use realistic demo data throughout (real-sounding counterparty names,
  trade IDs, dates, amounts) since no live backend exists yet.
- Every filter, search bar, status badge, and action button must be
  genuinely functional — test each one, not just visually present.
- Do not alter, remove, reposition, or rebrand any existing screen, nav
  item, or flow anywhere else in the app.
- After implementation, document the 10 new screens and their internal
  navigation map for future reference.

STOP after all 10 screens are built, integrated, and verified.

==================================================
PART B — ONBOARDING CONVERSION AUDIT & FIX
==================================================

IMPORTANT
Verify each fix functionally, not just visually. Do not regenerate
existing screen content beyond what each fix specifies.

FIX 1 — DEFER KYC BEHIND VERIFICATION GATE (PROGRESSIVE VERIFICATION)
Confirm and enforce: after Account Created(11) → Set PIN(12) →
Biometrics(13) → 2FA(14), a Personal user routes directly into a
feature-limited Home(38) — NOT into the KYC chain(26-37). Full KYC only
triggers via Verification Gate(42) the first time the user attempts to
send/receive money, add a bank account, or approaches the $400 threshold.
This turns a dozen screens of mandatory upfront friction into an
on-demand step reached only once the user has already invested time in
the app.

FIX 2 — SCREEN AUDIT: LABEL & CUT
Go through every screen in the onboarding chain (01-45) and label each
Value / Personalization / Qualification / Unnecessary. Remove or merge
anything landing in Unnecessary. Specifically confirm: Loading Gateway(19)
and Welcome Back Animation(20) never appear on a brand-new user's first
run (returning-user only); What's New(21) never interrupts a first-time
flow (existing-user only, post-update).

FIX 3 — ADD ONE INTENT-CAPTURE MOMENT BEFORE THE PAYWALL
Insert a single lightweight, skippable question right after Account Type
Selection(08), before 247/248: "What brings you to ChangeAIPay?" with a
few options (Send money abroad, Split bills with friends, Run a business,
Save toward a goal). The answer must change something downstream, not
just be collected: pre-select the relevant Dashboard Customization(50)
widgets, emphasize the matching stat on Screen 247/248, and pre-highlight
the most relevant plan when the user later reaches Subscription
Plans(45)/Compare Plans(137).

FIX 4 — CONFIRM SKIP PATHS ON 247/248
Verify both comparison screens (247 Personal, 248 Business) have a clear
Skip/Continue affordance so a user who's already decided isn't forced to
sit through them.

FIX 5 — INSTRUMENT TIME-TO-FIRST-VALUE
Add an analytics event marking when a brand-new user reaches their first
genuinely useful outcome (first successful Send, first Goal created, or
first linked bank account) and how long it took from account creation.
This is the metric that needs to exist before onboarding length can be
optimized against anything real. (Same integration point as the Basic
Analytics task already flagged as engineering work in an earlier pass.)

PART B — GLOBAL REQUIREMENTS
After Fixes 1-5, run the audit directly: go through the app end-to-end as
a brand-new user, note every point of boredom, confusion, or delay, and
fix the worst three before any further onboarding screens are added.

STOP after all fixes are verified.