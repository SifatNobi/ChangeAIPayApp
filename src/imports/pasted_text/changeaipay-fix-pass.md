PROJECT: ChangeAIPay — AI-Native Fintech Super App

DEFINITIVE FIX PASS — NAVIGATION, INTERCONNECTION, ASSETS, MERCHANT PLANS, POLISH

IMPORTANT

This supersedes all prior fix prompts on these topics — treat this as the single, complete instruction set. No new screens are created here. Verify every fix actually works before considering it complete, not just visually applied.

==================================================
PART A — CRITICAL: BOTTOM NAVIGATION IS BROKEN

The consumer bottom nav only works for 2 of 7 destinations. Wire up and individually verify all 7:

1. Home → Home screen
2. Payments → Payments Hub (keep working, don't break it)
3. Subscription → Subscription Plans screen
4. Center floating AI button (Fina) → Fina Chat screen
5. Feature Request → Feature Center screen
6. Transaction History → Transaction History screen
7. Profile → Profile screen

Tap-test each one individually and confirm the correct screen actually opens — not blank, not unresponsive. Also re-verify the merchant nav (Home, Payments, Insights, Profile, center Aina button) independently, even though reported working — confirm, don't assume.

==================================================
PART B — FULL INTERCONNECTION AUDIT, EVERY SCREEN

Every tappable element across the entire app must route to its correctly named destination:
• Every action button (Send, Request, Add Money, Scan, Generate QR, View Payout, etc.) opens its named screen
• Every list row (transaction, notification, feature request, goal, chat) opens that specific item's own detail screen
• Every "See All"/"View All" opens the corresponding full list
• Every back arrow/X/Cancel returns to the correct previous screen or closes the correct flow
• Every settings sub-item opens its own dedicated screen, not the parent again
• Screen 43's "Upgrade" CTA specifically must route to Subscription Plans, not Home (previously broken)

Verify every screen this way — not a sample, all of them.

==================================================
PART C — NO DEMO/PLACEHOLDER DATA

Remove any Lorem Ipsum, "John Doe," "Item 1/2/3" filler anywhere. Every screen shows realistic, contextually plausible sample content — real-sounding names, believable transaction amounts and merchants, plausible dates — consistent with the established design system, never generic filler.

==================================================
PART D — VISUAL & ASSET FIXES

• Frame fills edge-to-edge respecting only safe-area insets — no white-space bleed around the phone content
• Fina and Aina's exact uploaded character assets used everywhere either appears (chat avatars, center AI button, suggestion cards) — never a generic placeholder silhouette
• The floating hamburger/quick-menu button that was overlapping the Profile nav tap target is relocated to the top-right header corner, near the notification bell
• The ChangeAIPay logo mark is a true circle concentric with its underlying glow — never a rounded-square tile behind it
• Every screen's title/header text uses the app's blue Accent color with a highlighted/glow emphasis, not plain white/gray
• Scroll gestures are scoped strictly to content within the phone frame — they must never move or reposition the frame itself. (Separately, if the phone still appears small inside a white canvas margin specifically in Figma Make's editing view, check the tool's actual "Present"/share-link mode — that's a viewer setting, not something this prompt can control.)

==================================================
PART E — MERCHANT HOME PARITY

Merchant Home gains two entries matching consumer parity: "Plans" (routes to Merchant Subscription Plans) and "Feature Requests" (routes to Feature Center) — currently missing.

==================================================
PART F — MERCHANT SUBSCRIPTION PLANS

Merchant Subscription Plans must remain functional and connected to the existing established subscription-plan scope and screens. Do not remove, redesign, or alter the existing merchant subscription plan functionality, pricing, features, tier structure, or visual tiering. Ensure all merchant plan CTAs, cards, navigation, and upgrade actions route correctly to their corresponding existing screens and flows.

==================================================
PART G — GENERAL POLISH PASS

Across every screen: confirm consistent glassmorphism quality, spacing rhythm, and tactile click/tap animation feel per the established design system — a consistency pass, not a redesign. No screen should feel behind the others in craftsmanship.

==================================================
GLOBAL REQUIREMENTS

Verify Parts A and B are actually functional before considering this fix complete — this is the priority. Everything else is behavioral/visual consistency work. No new screens, no changes to established scope beyond what's specified here.

STOP after all parts are applied and Parts A/B are confirmed working.