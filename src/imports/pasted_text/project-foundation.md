PROJECT: ChangeAIPay — AI-Native Fintech Super App

UNIVERSAL FOUNDATION — PROMPT 1

IMPORTANT

This is the entire permanent master foundation of the ChangeAIPay project, replacing any prior version.

Generate ONLY what is described below: art direction, design tokens, reusable components, navigation/AI/security/pricing foundations, and interaction infrastructure.

Do NOT generate application screens. Do NOT generate user flows. Do NOT generate onboarding. Do NOT generate authentication screens. Do NOT generate pricing pages. Do NOT generate AI conversations.

Everything created here is permanent. Never recreate it in later prompts — only reuse it.

==================================================
PART 1 — UPLOADED ASSETS (locked, do not alter)
==================================================

Image 01 — Official ChangeAIPay Logo. Use exactly as uploaded. Never redraw, simplify, recolour, or change proportions. Splash → centred with the Pulse animation (see Part 2). Logged-in screens → top-left header. Empty states → subtle branded icon. Loading → softly animated.

Image 02 — Official ChangeAIPay Colour Palette. Literal source of truth for the hex values below.

Image 03 — Fina, Personal Account AI assistant. Warm, calm, human-first financial coach. Never appears in Merchant experiences.

Image 04 — Aina, Business Account AI assistant. Professional, analytical, executive. Never appears in Consumer experiences.

==================================================
PART 2 — ART DIRECTION & SIGNATURE (read first, applies to everything below)
==================================================

The problem to avoid: a dark-navy background with a bright blue-to-cyan glow and glassmorphism on every card is the single most common AI-design-tool default for fintech right now. It is not premium, it is generic. The palette below is staying (locked brand asset) — what changes is restraint in how it's used.

Signature element — Pulse: a living waveform/heartbeat line (not a static glow ring), taken literally from the parent brand "Beats of Change." Pulse appears ONLY in: balance updating/refreshing, Fina/Aina "thinking" before responding, a payment completing successfully, and once on the splash screen as the app's opening gesture. Nowhere else. This is the one visual idea the app is remembered by.

Glass/blur discipline: reserve glassmorphism for at most one or two genuinely elevated surfaces per screen (a bottom sheet, the AI card) — never as the default treatment for ordinary cards, buttons, or list rows. If most of a screen is glass, it has been overused.

Typography carries personality through contrast, not decoration — see Part 3 roles.

Layout: reject the symmetric grid-of-equal-cards default. Every screen has one clear focal element sized/placed differently from the rest, deliberate asymmetry, and whitespace used as a choice, not filler.

Emotional design: users should feel in control, safe, and financially confident — achieved through calm and clarity, not more glow or more motion.

==================================================
PART 3 — DESIGN TOKENS
==================================================

Colour Variables (generate hover/pressed/disabled/focused variants preserving this language):
Background #050B2D
Surface #101C4D
Primary #0066FF
Accent #3FE7FF
Primary Text #FFFFFF
Secondary Text #AFC5FF
Success #00D26A
Warning #F5B700
Error #FF4D5A
Primary Gradient #0066FF → #3FE7FF
Surface Gradient #050B2D → #101C4D
Legendary Gradient #F5B700 → #FFE29A (reserved exclusively for the Legendary/top pricing tier — its rarity is what makes it feel special; never reuse this gradient elsewhere)

Typography — deliberate roles, not a font list:
Hanken Grotesk (Bold/ExtraBold) — reserved for numbers that matter: balances, amounts, percentages, H1/H2/Display. Confident, used with restraint, never for paragraphs.
Inter (Regular/Medium/SemiBold) — everything read to understand rather than feel: body, labels, buttons, captions. Quiet, zero flourish.
JetBrains Mono — anything technically precise that should look verifiable: transaction IDs, timestamps, verification codes, currency values, exchange rates. Signals "this number is exact."
The gap between Hanken Grotesk's confidence and Inter's quietness is the personality — don't soften it.

Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128
Radius tokens: 8, 12, 16, 20, 24, 32, 40, Full
Also generate: border/stroke tokens, elevation/shadow tokens, blur tokens, opacity tokens, icon tokens, chart tokens — all following the restraint principle in Part 2, not the old "glow everything" instinct.

Grid: adaptive mobile grid, iOS + Android, safe areas, Dynamic Island, notches, gesture navigation, Auto Layout throughout.

==================================================
PART 4 — MOTION SYSTEM
==================================================

Duration 250–300ms, natural spring easing.

Reusable presets: Fade, Slide, Scale, Hero/Shared Element Transition, Touch Lift, Spring Press, Gradient Sweep, Counter Animation, Skeleton Shimmer, Success Burst, Error Shake, Confetti (success moments only), Animated Progress.

Pulse is a separate, protected motion signature — do not let it blend into or get replaced by generic glow-pulse effects on unrelated elements (see Part 2 for its exact trigger list).

==================================================
PART 5 — REUSABLE COMPONENTS
==================================================

Buttons: Primary, Secondary, Ghost, Text, Floating, Icon, Loading, Disabled
Inputs: Text, Password, OTP, PIN, Search, Dropdown, Date Picker, Segmented Control, Switch, Checkbox, Radio
Cards: Glass Card (used sparingly per Part 2), Wallet Card, AI Card, Analytics Card, Notification Card, Verification Card, Profile Card, Pricing Card Foundation — most cards should be a quiet flat/subtle-elevation treatment, NOT glass, by default
Dialogs, Bottom Sheets, Progress Bars, Status Chips, Charts, Tables, QR Components, Transaction Components, Verification Components, Toasts, Snackbars, Skeleton Loaders, Loading/Success/Error/Empty States

Component rules — every component must: use Auto Layout, use variables, support variants, accessibility, responsive layout, motion, interactive states, dark theme. Never duplicate a component.

==================================================
PART 6 — NAVIGATION, AI, VERIFICATION, SECURITY, PRICING
==================================================

Navigation — Header: logo top-left, notification bell top-right. Profile never appears in the header, only as a nav tab.
Bottom nav: floating, mostly-flat with restrained elevation (not heavy frosted glass by default), spring touch response, icon morph, ripple. Seven items in exact order: Home, Payments, Subscription, AI Assistant, Feature Request, Transaction History, Profile.
Center AI button: large floating circular button, Pulse animation (not generic glow-breathing), shows Fina for Personal accounts, Aina for Business accounts.

AI foundation — Fina: warm, rounded 16px bubbles, Primary Gradient accent used narrowly. Aina: professional, sharp bottom-left bubble, Accent colour used narrowly. Reusable: AI Cards, Suggestions, Quick Prompts, Voice Cards, Typing Indicator (uses Pulse), Thinking Animation (uses Pulse), Streaming Responses, AI Loading/Error/Success, Conversation/Insight/Recommendation Cards.

Verification foundation — Standard progress header (Step X of X, % complete, progress bar), Document Upload, Camera Overlay, Face Scan, Liveness Detection, Review Cards, Status: Pending/Approved/Rejected/Additional Info Required.

Security foundation — Password Strength Meter, OTP/PIN Inputs, Face ID, Fingerprint, 2FA, Backup Codes, Device Cards, Session Cards, Security Alerts, Encryption Trust Banner, Compliance Cards, Fraud/Risk Alerts.

Pricing foundation (card templates only, not screens) —
Consumer: FREE, EDGE, PRIME, APEX
Merchant: STARTUP, GROWTH, SCALE, PREMIUM, RETENTION, ENTERPRISE
Standard plan: quiet flat card, no glow.
Most Popular: rotating Primary Gradient border, floating badge — one deliberate moment of motion, not a template default.
Legendary/top tier: Legendary Gradient border + gold glow + crown badge — this stays rare and exclusive to this one tier (see Part 3).
Reusable elements: Price, Billing Period, Features, Upgrade CTA, Current Plan Badge, Feature Comparison, Usage Limits, Upgrade/Downgrade Flow, Subscription/Renewal/Cancellation Status.

==================================================
PART 7 — INTERACTION, STATES & PROTOTYPE ARCHITECTURE
==================================================

Prototype every future screen automatically: push navigation, modals, bottom sheets, nested/gesture navigation, swipe back, shared element transitions, context menus, long press, drag, pull-to-refresh, infinite scroll, search filtering.

Loading system: skeleton cards/lists (wallet, chart, profile, pricing, AI, transaction variants), shimmer, circular/linear/page/inline loaders, background sync indicator.

Success system: animated checkmark, confetti, wallet/payment/verification/subscription success, goal completed — reward the moment without overusing Pulse or confetti elsewhere.

Error system: validation, network, server, auth, payment failed, verification failed, upload failed, permission denied — calm, reassuring tone, always with a recovery action.

Empty states: transactions, notifications, goals, feature requests, messages, search, statements, support tickets — each should invite action, not feel unfinished.

==================================================
PART 8 — RESPONSIVE & ACCESSIBILITY
==================================================

Support iPhone SE through Pro Max, Android compact/standard/large, foldables, landscape, tablet-ready Auto Layout. One identical visual language across platforms — only status bar, keyboard, permission dialogs, biometric sheets, camera, and date picker use native system UI.

Accessibility: VoiceOver, TalkBack, Dynamic Type, Reduce Motion (Pulse and other motion must degrade gracefully), minimum touch targets, WCAG contrast, screen reader labels, accessible charts/tables/forms.

==================================================
SELF-CHECK BEFORE GENERATING
==================================================

Before producing output, briefly state: your glass/blur usage plan (where the 1–2 elevated surfaces per screen will be), where Pulse will and won't appear, and your typography role assignments. If any part of this plan could describe any other fintech app, revise it until it specifically describes ChangeAIPay.

==================================================
FINAL INSTRUCTIONS
==================================================

Generate ONLY the foundation described above — art direction, tokens, components, navigation/AI/security/pricing foundations, interaction infrastructure.

Do NOT generate application screens, flows, onboarding, authentication, pricing pages, or AI conversations.

STOP after completing the foundation.