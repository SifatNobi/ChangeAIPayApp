FIX THREE THINGS AND ADD TWO NEW SCREENS IN THE EXISTING CHANGEAIPAY APP DESIGN WITHOUT REDESIGNING OR BREAKING ANYTHING THAT IS ALREADY CORRECT.

IMPORTANT:
Preserve the current UI, layout, navigation structure, components, spacing, typography, colors, interactions, cards, icons, and screens wherever they are already correct.

DO NOT randomly redesign the app.
DO NOT replace working screens with new designs.
DO NOT change the established visual language.
DO NOT remove existing functionality.
DO NOT modify screens unnecessarily.

==================================================
1. FIX THE SEND / REQUEST / ADD MONEY NAVIGATION
==================================================

Review the current navigation behavior for these primary actions:

- Send
- Request
- Add Money

The current behavior takes the user into broader/dedicated screens such as:
- Send → Payments Hub
- Request → Receive screen
- Add Money → Add Money screen

Keep the dedicated screens if they are already part of the existing product architecture, BUT make sure each CTA opens directly into the correct actionable state instead of feeling like the user is being redirected to an unrelated generic hub.

Required behavior:

SEND:
When the user taps "Send", open the Send Money experience directly.
The user should immediately understand that they are sending money and should be able to begin selecting/entering the recipient.
Do not make the user search through another hub to find Send.

REQUEST:
When the user taps "Request", open the Request Money experience directly.
The user should immediately see the relevant request flow and be able to enter/select the person and amount.

ADD MONEY:
When the user taps "Add Money", open the Add Money experience directly.
The user should immediately see the available funding/add-money action.

If the existing Payments Hub, Receive, or Add Money screens already contain these experiences, reuse those existing screens/components and simply open them in the correct state.

Do NOT create duplicate screens unnecessarily.

The goal is:
CTA → correct action immediately.

Not:
CTA → unrelated/general hub → user searches for action.

Preserve back navigation so the user can naturally return to the previous screen.

==================================================
2. REMOVE THE FLOATING RIGHT-SIDE QUICK-ACTION TOGGLE
==================================================

There is currently a floating circular toggle on the right side of the Home screen that, when tapped, expands into a vertical panel showing Send / Scan QR / AI / Alerts.

This floating toggle and its expanded panel must be REMOVED ENTIRELY from the app.

Required behavior:
- Remove the floating toggle button itself from Home.
- Remove the expanded panel/menu that appears when it is tapped.
- Do NOT replace it with a new floating element, a different toggle style, or any alternative floating quick-action mechanism. This feature is being removed, not redesigned or repositioned.

Do not lose functionality — every action that lived inside this menu already has an existing, correct home elsewhere in the app:
- Send → already accessible via the Payments Hub / Pay tab.
- Scan QR → already accessible via the Payments Hub / QR flow.
- AI → already accessible via the center floating Fina button in the bottom nav.
- Alerts → already accessible via the notification bell icon already present in the Home header.

Confirm after removal that:
- Home returns to its correct existing layout with no leftover empty space, orphaned container, or visual gap where the toggle used to sit.
- No dead reference, broken animation, or leftover interaction state remains from the removed toggle.
- Nothing else on Home was altered as a result of this removal.

==================================================
3. ADD SYSTEM UPDATE (BACKGROUND OTA) SCREEN — NEW
==================================================

This is a new addition, not a redesign of the existing Update Required screen (02). Update Required is a separate, blocking "please update via App Store" gate and must remain completely untouched. This new screen is a different state entirely: a non-blocking background update-download overlay.

New screen: System Update Overlay
- A centered glassmorphism card overlay matching the app's existing card/modal visual system (rounded corners, blue glow, gradient progress bar) — triggerable from any screen when a background update becomes available, not tied to a specific existing screen number.
- Small label line above the heading — use real, sensible copy (e.g., something like "Keeping things running smoothly"), not placeholder text.
- Heading: "System Update"
- Supporting subtitle line explaining what's happening — use real, sensible copy (e.g., something like "We're installing your update in the background. This will only take a moment."), not placeholder text.
- Gradient progress bar with a "Progress" label and a percentage counter that genuinely updates over time — not a frozen static number.
- "Restart Now" button: shows a downloading/disabled state until the update finishes, then becomes active. Tapping it applies the update.

IMPORTANT: do not reproduce any garbled or nonsensical placeholder text from a reference design. Every text line on this screen must be real, coherent, on-brand copy.

==================================================
4. ADD VOICE MODE TO AINA (MERCHANT) — PARITY WITH FINA (NEW)
==================================================

This is a new addition, not a redesign of the existing Aina Chat screen. Aina Chat stays exactly as it is in every way except for the two small entry points described below.

CONTEXT / THE GAP:
Fina (consumer AI) already has a full Voice Mode experience: a mic icon in the chat header, a mic icon in the input bar, and a dedicated full-screen Voice Mode state — centered glowing avatar, "Listening..." status, an animated waveform, a live call timer, and a bottom control row (mic toggle / end-call / switch-to-text / menu), with Text and Transcript toggles at the top.

Aina (merchant AI) currently has no equivalent — her chat screen is text-only, with no voice entry point and no voice interface at all. This creates an inconsistent capability gap between the two assistants even though they are meant to feel like the same underlying AI system with a different persona layer on top.

REQUIRED BEHAVIOR:
Give Aina the exact same voice capability Fina already has — same mechanics, same layout, same states — with only the persona layer swapped.

Add to the existing Aina Chat screen:
- A mic icon in the header, in the same position/treatment as Fina Chat's header mic icon.
- A mic icon in the input bar, in the same position/treatment as Fina's input-bar mic icon.
- Tapping either opens the new Aina Voice Mode screen below.

New screen: Aina Voice Mode
- The direct merchant-side counterpart of Fina's existing Voice Mode screen — reuse that exact same layout, structure, and interaction pattern:
  - Top bar: Text toggle (left) / mode label (center) / Transcript toggle (right), same as Fina's.
  - Center: Aina's existing avatar asset in the same glowing circular treatment Fina's Voice Mode uses, "Aina" as the name label, and a status line reading "Listening..." (or "Speaking..." while responding) — same states Fina's Voice Mode already has.
  - Live call timer, same position/format as Fina's (e.g. 00:01, counting up).
  - Animated waveform using the existing Pulse motif — this is a permitted Pulse use per the established motif rules (Voice Mode waveform is already on the approved list).
  - Bottom control row: mic toggle, red end-call button (center, returns to Aina Chat), switch-to-text, and menu — same positions/behavior as Fina's row.
- Functional requirements: the waveform genuinely animates while listening, the timer genuinely counts up, Listening/Speaking states genuinely transition, Text and Transcript toggles genuinely switch modes, and the end-call button genuinely returns to Aina Chat. No static/frozen elements.

BRAND DIFFERENTIATION TO PRESERVE (do not let this become a Fina reskin):
- Use Aina's own exact existing avatar asset — never Fina's asset, never a redrawn or AI-generated substitute.
- Use Aina's established Accent-glow treatment (merchant) — not Fina's Primary Gradient glow (consumer) — for the avatar ring, waveform, and any accent elements on this screen.
- Name label reads "Aina", never "Fina".
- Status/subtitle framing stays merchant-appropriate (consistent with Aina Chat's existing "Business AI" framing), not Fina's consumer "AI Financial Assistant" framing.

SCREEN PLACEMENT:
Add as the next available screen number directly adjacent to the existing Aina Chat block, so it lives with Aina's other AI screens the same way Fina's Voice Mode lives with hers.

DO NOT:
- Give Aina a different voice/assistant personality than her existing chat persona.
- Reuse or reference Fina's asset, glow color, or copy anywhere on this screen.
- Invent a new waveform style — reuse the existing Pulse motif exactly as implemented on Fina's Voice Mode.
- Change anything on the existing Aina Chat screen beyond adding the two mic entry points.
- Alter Fina's Voice Mode screen in any way — it is the reference, not something being modified.

Preserve back/close navigation so the merchant can naturally return to Aina Chat.

==================================================
5. FINA + AINA VISUAL CONSISTENCY SYSTEM
==================================================

Now perform a careful consistency pass across the ENTIRE EXISTING APP, including the new Aina Voice Mode screen added above.

The app already has Fina and Aina visual assets/images.

Use the existing Fina and Aina images as the SINGLE SOURCE OF TRUTH.

IMPORTANT:
Do NOT redraw them.
Do NOT replace them with AI-generated alternatives.
Do NOT create random variants.
Do NOT change their facial appearance, proportions, colors, clothing, style, or visual identity.
Do NOT distort, stretch, crop incorrectly, or modify the source artwork.

Use the exact existing Fina and Aina assets wherever they are intended to appear.

==================================================
6. APPLY FINA AND AINA CONSISTENTLY
==================================================

Audit EVERY existing screen and EVERY newly created/modified screen, including Aina Voice Mode.

Where Fina or Aina is already correctly placed:
KEEP IT EXACTLY AS IT IS.

Do not touch correct implementations.

Where Fina or Aina is missing but the existing design system clearly calls for the assistant/avatar:
add the correct existing asset using the established visual treatment.

Where the wrong Fina/Aina image, wrong variant, placeholder, generic avatar, inconsistent crop, or inconsistent styling is being used:
replace ONLY that incorrect implementation with the correct existing asset.

Maintain consistent:
- image source
- aspect ratio
- sizing
- positioning
- border radius
- corner treatment
- shadows
- background treatment
- spacing
- alignment
- visual hierarchy
- animation treatment where applicable

Fina and Aina should feel like the same persistent AI assistant system throughout ChangeAIPay — including now, in voice form, on equal footing.

==================================================
7. DO NOT RUIN EXISTING CORRECT SCREENS
==================================================

This is extremely important.

Before modifying any screen, compare it against the existing design.

If Fina/Aina is already accurate:
DO NOTHING.

If a screen already looks correct:
DO NOT redesign it just for the sake of consistency.

Only make the minimum changes required to achieve Fina/Aina asset consistency (and, on Aina Chat specifically, the two voice entry points described in Section 4).

Preserve all existing:
- navigation
- buttons
- cards
- forms
- tabs
- headers
- footers
- bottom navigation
- spacing
- typography
- colors
- component hierarchy
- interactions
- states
- animations

==================================================
8. NEW SCREENS MUST FOLLOW THE SAME SYSTEM
==================================================

Any new or modified screen created as part of this task — including the System Update Overlay and the new Aina Voice Mode screen — must use the same existing ChangeAIPay design system.

Do not invent a separate visual language.

Fina and Aina must use the exact same established assets and treatment as the rest of the application. On Aina Voice Mode specifically, this means Aina's own asset and Accent glow, mirrored from Fina's Voice Mode pattern rather than copied wholesale.

If an AI assistant interaction appears on a new screen, use the appropriate Fina/Aina asset consistently with the existing product logic.

==================================================
9. FINAL QUALITY CHECK
==================================================

After making the changes, inspect the entire application screen-by-screen.

Verify:

✓ Send opens directly into the Send Money action
✓ Request opens directly into the Request Money action
✓ Add Money opens directly into the Add Money action
✓ The floating right-side quick-action toggle and its panel are completely removed from Home
✓ No replacement floating element was introduced in its place
✓ Home's layout has no leftover gap or orphaned container from the removal
✓ Send, Scan QR, AI, and Alerts remain reachable through their existing correct locations
✓ System Update overlay exists, uses real/coherent copy (no garbled placeholder text), and its progress bar and Restart Now button are genuinely functional, not static
✓ System Update overlay is distinct from and does not alter the existing Update Required (02) screen
✓ Aina Chat has header + input-bar mic entry points, matching Fina Chat's positions/treatment
✓ Aina Voice Mode screen exists and genuinely mirrors Fina Voice Mode's layout, states, timer, waveform, and control row
✓ Aina Voice Mode uses Aina's own existing asset and Accent-glow treatment — never Fina's asset or glow color
✓ Aina Voice Mode's waveform, timer, and Listening/Speaking states are genuinely functional, not static
✓ Fina Voice Mode was not altered in any way while building Aina Voice Mode
✓ No unnecessary duplicate screens were created
✓ Existing correct screens remain unchanged
✓ Existing navigation is preserved
✓ Fina uses the correct existing asset everywhere it appears
✓ Aina uses the correct existing asset everywhere it appears
✓ No incorrect avatars/placeholders remain where Fina/Aina should be used
✓ No Fina/Aina image is stretched or distorted
✓ Image proportions remain correct
✓ Fina/Aina sizing is visually consistent
✓ Fina/Aina positioning is consistent
✓ Existing correct implementations were NOT altered
✓ New screens match the existing ChangeAIPay design system
✓ No unrelated UI changes were introduced

MOST IMPORTANT RULE:

This is a targeted UX + consistency correction with two new screen additions, NOT a redesign.

Make the smallest possible changes necessary to fix the navigation, remove the unwanted floating quick-action toggle, add the System Update overlay with real copy, give Aina voice parity with Fina, and establish accurate, consistent Fina/Aina usage while preserving everything that is already correct.