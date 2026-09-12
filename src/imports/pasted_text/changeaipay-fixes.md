FIX TWO THINGS IN THE EXISTING CHANGEAIPAY APP DESIGN WITHOUT REDESIGNING OR BREAKING ANYTHING THAT IS ALREADY CORRECT.

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
2. FINA + AINA VISUAL CONSISTENCY SYSTEM
==================================================

Now perform a careful consistency pass across the ENTIRE EXISTING APP.

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
3. APPLY FINA AND AINA CONSISTENTLY
==================================================

Audit EVERY existing screen and EVERY newly created/modified screen.

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

Fina and Aina should feel like the same persistent AI assistant system throughout ChangeAIPay.

==================================================
4. DO NOT RUIN EXISTING CORRECT SCREENS
==================================================

This is extremely important.

Before modifying any screen, compare it against the existing design.

If Fina/Aina is already accurate:
DO NOTHING.

If a screen already looks correct:
DO NOT redesign it just for the sake of consistency.

Only make the minimum changes required to achieve Fina/Aina asset consistency.

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
5. NEW SCREENS MUST FOLLOW THE SAME SYSTEM
==================================================

Any new or modified screen created as part of this task must use the same existing ChangeAIPay design system.

Do not invent a separate visual language.

Fina and Aina must use the exact same established assets and treatment as the rest of the application.

If an AI assistant interaction appears on a new screen, use the appropriate Fina/Aina asset consistently with the existing product logic.

==================================================
6. FINAL QUALITY CHECK
==================================================

After making the changes, inspect the entire application screen-by-screen.

Verify:

✓ Send opens directly into the Send Money action
✓ Request opens directly into the Request Money action
✓ Add Money opens directly into the Add Money action
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

This is a targeted UX + consistency correction, NOT a redesign.

Make the smallest possible changes necessary to fix the navigation and establish accurate, consistent Fina/Aina usage while preserving everything that is already correct.