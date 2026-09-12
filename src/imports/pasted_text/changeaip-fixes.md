PROJECT: ChangeAIPay — Multi-Fix Pass: QR Scanner, Dashboard, Pay Bills, Plan Consistency, Native Sharing, Billing Logic, Subscription Icons

IMPORTANT
Verify every fix actually functions end-to-end before considering it complete, not just visually. Do not regenerate any screen's core content beyond what each fix specifies.

==================================================
FIX 1 — QR SCANNER (Scan QR, Screen 62): CAMERA FEED NOT RENDERING
==================================================

The scan frame renders but the live camera feed behind it is blank/black — it never actually shows what the camera sees, so no QR code can be decoded. Fix: bind a real live camera preview to the frame, and actively decode any QR code that enters frame in real time (not just display the frame graphic). If camera permission has not been granted, do not show a blank camera view — show the existing contextual permission-request screen instead, and only enter the live-scan state once permission is confirmed.

==================================================
FIX 2 — DASHBOARD CUSTOMIZATION (Screen 50): HIDE TOGGLES NON-FUNCTIONAL
==================================================

The screen shows a "Visible / Hidden" legend, but every toggle is on and toggling one off does not actually remove that widget from Home — the control is visual only, not wired to real state. Fix: toggling a widget off must immediately hide it from Home (and persist that choice across sessions), toggling it back on must restore it in its prior position, and "Save Layout" must commit the actual visible/hidden set — not just the toggle's visual position.

==================================================
FIX 3 — PAY BILLS (Home, Screen 38): DEAD QUICK ACTION — BUILD THE MISSING FLOW
==================================================

Tapping "Pay Bills" currently does nothing — no screen, no flow. This is a shipped-looking tile pointing at nothing. Build the missing flow as new screens, matching the existing Payments visual system (glassmorphism, Standard Progress Header, Pulse motif only on the final success state):
1. Pay Bills Hub — search/browse billers by category (Utilities, Phone, Internet, Insurance, etc.)
2. Biller Selection + Account Number entry — select a biller, enter the account/reference number tied to that bill
3. Amount entry — same numeric keypad pattern as Payments Amount (55)
4. Review & Confirm — same pattern as Payments Confirmation (56), showing biller, account number, amount, fee, total
5. Success/Failed/Pending — reuse the existing Payment Success/Failed/Pending pattern (57-59), same Pulse treatment on Success only
Wire the Pay Bills tile on Home to route into this flow.

==================================================
FIX 4 — CONSUMER PLAN CONSISTENCY SWEEP: APEX COLOR + EDGE PRICE
==================================================

Two issues found in Compare Plans (137), sweep across every screen where these tiers appear (Subscription Plans 45, Checkout 138, Billing History 141, Upgrade/Downgrade 139-140):
(a) Apex is currently rendering in purple/violet. Per the established brand rule, Apex must always use the Legendary gold treatment (gold color box, gold-toned tier details/text) — never purple. Prime keeps its Recommended blue treatment; Edge keeps its cyan/teal treatment.
(b) Edge is displaying as $9.99/mo. The correct price is $24.99/mo. Correct this everywhere Edge pricing appears, and verify the International Sends and FX-fee rows for Edge correctly reflect FX-free on the first $1,500/mo with 0.95% overage beyond that — not a flat +1.75% matching the Free tier.

==================================================
FIX 5 — SHARE ACTIONS MUST DEEP-LINK TO REAL APPS (Invite Friends, Screen 143-144; apply sitewide)
==================================================

On the Share Your Invite screen, the Message, Email, Contacts, and QR Code buttons currently do nothing when tapped. Fix each to trigger a real native action:
— Message: opens the native SMS/messaging app with the invite link pre-filled in a new message
— Email: opens the device's default mail client (e.g., Gmail on Android, Mail on iOS) with subject and body pre-filled, invite link included
— Contacts: opens the native contact picker so the user can select a recipient to send the invite to
— QR Code: opens the QR card in a full-screen shareable view with a native share-sheet option (save/share as image)
Apply this same real-app-linking logic to every other screen in the app with an equivalent action — Share Receipt (83), Contact Support (210), Export (84), and any other "share/email/message/contact" button — none of these should be a dead tap target.

==================================================
FIX 6 — SUBSCRIPTION BILLING: REMOVE PRORATION, FLAT CHARGE, APPLY TO EVERY PAID TIER
==================================================

The Confirm Upgrade screen currently shows a prorated charge ("$12.50 today, 15 days remaining in cycle") before the full $64.99/mo begins. This is wrong for every paid plan, consumer and merchant. Correct logic:
— On upgrade, the full flat monthly price for the selected tier charges immediately in full (no proration, no partial-cycle math).
— The next renewal date is exactly one month from the purchase date (not tied to a preset billing-cycle day).
Apply this to Consumer Checkout (138) for Edge/Prime/Apex and Merchant Checkout (191) for every flat-annual merchant tier. Remove any "prorated charge today" language and "days remaining in cycle" copy from all of these screens — replace with a simple "Charged today: $X.XX · Renews [purchase date + 1 month]" line.

==================================================
FIX 7 — SUBSCRIPTION TRACKER: REAL BRAND ICONS, NOT PLACEHOLDERS
==================================================

On Subscription Review (120), detected recurring subscriptions (Netflix, Spotify, and any other tracked service) currently show generic placeholder icons instead of each service's real, recognizable brand icon. Source correct official icon assets for each detected service (use a maintained brand-icon set for accurate, current logos) so a user can visually recognize their subscriptions at a glance, matching how established finance-tracking apps display these.

==================================================
GLOBAL REQUIREMENTS
==================================================

Test Fix 1 with an actual QR code end-to-end (not just visual frame). Test Fix 2 by toggling a widget off and confirming Home actually reflects the change. Test Fix 3's full flow start to finish. Test Fix 6 with at least two different tier upgrades to confirm no proration math appears anywhere. Do a full pass across every other screen for any remaining dead buttons, wrong tier colors, or placeholder icons not explicitly listed above, and fix those too.

==================================================
FIX 8 — FULL APP AUDIT: ANY REMAINING DEAD BUTTONS, WRONG COLORS, OR PLACEHOLDER ICONS
==================================================

Beyond the seven fixes above, perform a full screen-by-screen pass across all 248+ screens (consumer and merchant) and check for:
— Any tappable element that does not lead anywhere (dead buttons, missing routes)
— Any tier-color inconsistency (Free/Edge/Prime/Apex or Merchant tiers) that doesn't match the established color treatment for that tier
— Any remaining placeholder icon, avatar, or logo standing in for a real asset (subscription logos, bank logos, contact avatars, etc.)
— Any hardcoded/static value that should be reading from live state (following the same pattern as the earlier Amount-not-persisting bug)

List every issue found before fixing, then fix each one using the same visual system already established — do not introduce new patterns.

STOP after all fixes are applied and verified.