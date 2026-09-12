PROJECT: ChangeAIPay — Payment-Platform Parity Additions (NEW SCREENS)

IMPORTANT
The existing ChangeAIPay app already has its UI, design system, screens, navigation, and architecture defined. Do not redesign, reposition, or change the existing product. Everything below is additive only — new screens using the exact existing visual system, fully functional (not static mockups), connected properly into existing navigation, using realistic demo data where backend data is unavailable.

==================================================
GROUP 1 — PAYMENT LINKS (3 new screens)
==================================================

Entry point: add a "Payment Links" option inside the existing Merchant Payments Hub, alongside Invoice/QR/Payout — do not alter the hub's existing layout beyond adding this option.

1. Payment Links Hub — list of created links with status (Active/Expired/Completed) and total collected per link. Tappable into Link Detail.
2. Create Payment Link — set a fixed amount or allow the customer to enter their own; optional description; one-time-use or reusable; optional expiration date.
3. Payment Link Detail — shows the generated link/QR with a copy button and native share-sheet option, stats (views, completions, total collected), and a Deactivate control.

==================================================
GROUP 2 — PAYOUT SETTINGS (1 new screen)
==================================================

Entry point: Merchant Profile/Settings, plus a "Manage Payout Settings" link from the existing Payout action screen.

4. Payout Settings — payout schedule (Instant/Daily/Weekly/Manual), default payout bank account (reuse existing Linked Bank Detail data), and a payout history shortcut linking to existing Transaction History.

==================================================
GROUP 3 — MERCHANT RISK & FRAUD CENTER (2 new screens)
==================================================

Entry point: new card on Merchant Home or a section within Business Health.

5. Risk & Fraud Center — list of flagged/held transactions with risk reason and severity, filterable by status.
6. Flagged Transaction Detail — full transaction detail plus an AI-generated risk explanation (same visual pattern as the existing Aina AI insights), with Approve and Block actions.

==================================================
GROUP 4 — PAYMENT DISPUTE CENTER (3 new screens)
==================================================

Entry point: "File a Dispute" action on the existing consumer Transaction Detail screen; "Disputes" entry within the Merchant Payments Hub for the merchant side.

7. File a Dispute (consumer) — reason selection, description field, optional evidence upload, submit.
8. Respond to Dispute (merchant) — shows the consumer's claim, lets the merchant submit their response/evidence.
9. Dispute Status — shared status view (Under Review / Resolved) with a simple timeline, shown to both parties.

==================================================
GROUP 5 — DEVELOPER & API SETTINGS (1 new screen, Enterprise-tier only)
==================================================

Entry point: Merchant Profile/Settings, visible only to Enterprise-tier merchant accounts.

10. Developer & API Settings — generate/revoke API keys, configure webhook endpoint URLs with a "Send test event" action, sandbox/live mode toggle.

==================================================
GROUP 6 — MERCHANT STATEMENTS (1 new screen)
==================================================

Entry point: Merchant Profile/Settings, parity placement with the existing consumer Statements screen.

11. Merchant Statements — monthly statement list, each downloadable as PDF, matching the existing consumer Statements pattern.

==================================================
GROUP 7 — RECURRING BILLING (4 new screens)
==================================================

Entry point (merchant): add a "Recurring Billing" option inside the existing Merchant Payments Hub, alongside Invoice/QR/Payout/Payment Links.
Entry point (consumer): add a "My Subscriptions" option to the existing Payments Hub — distinct from the existing AI-detected Subscription Review (120), which tracks external subscriptions like Netflix. This screen is specifically for subscriptions billed directly through ChangeAIPay.

12. Recurring Billing Hub (merchant) — list of active billing plans (plan name, price, frequency, active subscriber count, status). Tappable into Billing Plan Detail.
13. Create Billing Plan (merchant) — plan name/description, price, billing frequency (Weekly/Monthly/Yearly), optional trial period.
14. Billing Plan Detail (merchant) — plan info plus a subscriber list; each subscriber shows next charge date and payment history. Edit, Pause, and Cancel Plan actions.
15. My ChangeAIPay Subscriptions (consumer) — list of active recurring charges to ChangeAIPay merchants, each showing merchant name, price, next charge date, and a Cancel Subscription action that actually stops future charges.

==================================================
GLOBAL REQUIREMENTS
==================================================

- Gate Group 5 behind Enterprise-tier accounts only.
- Every filter, button, and status state must be genuinely functional — test each one, not just visually present.
- Cancel Subscription on the consumer side (Group 7, Screen 15) must be reflected immediately in the merchant's Billing Plan Detail subscriber list (Screen 14).
- Use realistic demo data throughout since no live backend exists yet.
- Do not alter, remove, reposition, or rebrand any existing screen, nav item, or flow anywhere else in the app.
- Confirm every new screen's tappable elements route correctly — zero dead ends.

STOP after all 15 screens are built, integrated, and verified.