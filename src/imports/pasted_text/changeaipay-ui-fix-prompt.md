CHANGEAIPAY — COMPLETE RESPONSIVE UI + NAVIGATION + LOGO + FINA FIX PROMPT

IMPORTANT:
You are fixing the EXISTING ChangeAIPay application/UI.

DO NOT redesign the product.
DO NOT replace the existing visual identity.
DO NOT randomly change colors, typography, spacing, layouts, gradients, cards, animations, or branding.

Use the existing ChangeAIPay design system and components wherever possible.

The uploaded screenshots are the visual references for the problems that MUST be fixed.

Your job is to inspect the existing implementation, identify the relevant components/CSS/layout logic, and implement a production-quality fix across the entire application.

==================================================
1. FINA CHAT — RESTORE THE ORIGINAL FINA LOGO
==================================================

REFERENCE:
Screenshot 1 — Fina chat screen.

PROBLEM:
The Fina chat currently uses an incorrect generic/person-style icon instead of Fina's ORIGINAL ChangeAIPay/Fina mascot/logo.

FIX:

1. Find the original Fina logo/mascot asset already used elsewhere in the application.
2. Reuse the EXACT existing Fina asset.
3. Do NOT create a new avatar.
4. Do NOT substitute it with:
   - generic user icon
   - human silhouette
   - AI sparkle icon
   - random robot
   - emoji
   - placeholder
5. The same official Fina identity must be used consistently throughout the app.

Update all Fina locations, including:
- Fina chat header
- Fina message avatar
- Fina floating assistant
- Fina home-screen assistant card
- Fina bottom navigation/avatar if applicable
- Any Fina notification or recommendation component

The Fina avatar should remain visually consistent in:
- size
- proportions
- border treatment
- glow
- background
- image quality

Do not distort the logo.

If the original Fina asset already exists in the project, use that exact asset rather than creating another copy.

==================================================
2. RIGHT-SIDE TAB / QUICK ACTION BUTTON
==================================================

REFERENCE:
Screenshot 2.

PROBLEM:
The expandable right-side tab/quick-action control is not positioned correctly and the action options do not visually sit in the correct middle area of the tab/button.

The options shown in the screenshot are:

- Send
- Scan QR
- AI
- Alerts

FIX:

Create/fix the right-side floating quick-action control so that:

1. The main tab/button remains attached to the right side of the viewport.
2. When expanded, the options appear centered vertically within the floating panel.
3. Each option must have:
   - icon
   - label
   - adequate spacing
   - touch-friendly hit area
4. The options must be visually centered inside the panel rather than pushed toward an edge.
5. The expanded panel must never overflow outside the viewport.
6. It must work correctly on:
   - iPhone
   - Android
   - tablet
   - desktop
7. Use responsive positioning rather than hardcoded pixel positioning.

Recommended behavior:

COLLAPSED:
[tab/button] anchored to the right edge.

EXPANDED:

┌─────────────────┐
│       ↑         │
│      Send       │
│                 │
│      QR         │
│    Scan QR      │
│                 │
│      ✧          │
│       AI        │
│                 │
│      🔔         │
│     Alerts      │
└─────────────────┘

The entire action group should be centered inside the panel.

Ensure every action is actually clickable:

Send → opens Send Money screen
Scan QR → opens QR Scanner screen
AI → opens Fina AI screen
Alerts → opens Notifications/Alerts screen

Do not merely make the buttons visually clickable.

==================================================
3. CHANGEAIPAY LOGO — CIRCULAR, NOT SQUARE
==================================================

REFERENCE:
Screenshot 3.

PROBLEM:
The ChangeAIPay logo appears inside a square container and does not properly fill the circular area.

FIX:

The ChangeAIPay logo in the account/card area must be:

- perfectly circular
- centered
- fully contained inside the intended circular logo area
- visually filling the available circular space
- not displayed as a square
- not clipped incorrectly
- not stretched
- not distorted

Use the existing official ChangeAIPay logo asset.

The implementation should use proper image containment/cropping.

For example, the visual structure should behave like:

      ╭─────────╮
     │  LOGO    │
     │  FULL    │
     │ CIRCLE   │
      ╰─────────╯

NOT:

      ┌─────────┐
      │  LOGO   │
      │ SQUARE  │
      └─────────┘

If the existing logo file contains transparent padding, compensate for the padding so the actual logo visually fills the circular container.

Requirements:
- border-radius: 50%
- overflow: hidden where appropriate
- object-fit: contain/cover based on the actual asset
- no square background visible
- no unnecessary rectangular frame

Apply this consistently wherever the ChangeAIPay logo is presented as a circular avatar/icon.

==================================================
4. MOBILE NAVIGATION — MOVE QUICK MENU TO TOP-RIGHT
==================================================

REFERENCE:
Screenshot 4.

PROBLEM:
The current navigation/menu control is positioned at the bottom and overlaps/touches the bottom navigation options.

This creates:
- visual collision
- poor touch targets
- accidental taps
- crowded navigation
- poor mobile UX

FIX:

Move the floating quick/menu control to the:

TOP-RIGHT CORNER

similar to modern mobile applications.

It must sit safely inside the device's viewport/safe area.

Use:

position: fixed;

and responsive safe-area-aware positioning.

The control must NOT overlap:
- bottom navigation
- Fina navigation item
- Send
- Request
- Add Money
- Scan
- content cards
- input fields
- CTA buttons

On mobile:

TOP-RIGHT:
[menu/quick-action control]

BOTTOM:
[Home] [Cards] [Fina] [Activity] [Profile]

The top-right control should remain accessible while scrolling.

Use safe-area handling for modern iPhones:

env(safe-area-inset-top)
env(safe-area-inset-right)

Do not use arbitrary hardcoded coordinates that only work on one phone.

==================================================
5. iPHONE RESPONSIVENESS — REMOVE THE WHITE SPACE
==================================================

REFERENCE:
Screenshot 5.

PROBLEM:
When previewing the application using an iPhone 17-sized frame in Figma, there is still a large empty WHITE area around/outside the application.

This indicates that the application viewport/layout is not correctly adapting to the device dimensions.

FIX THIS COMPLETELY.

The application must fill the entire available mobile viewport.

There must be:

NO:
- white vertical strip
- white horizontal strip
- blank page area
- desktop-width overflow
- fixed-width content
- body margin
- content extending outside viewport
- horizontal scrollbar
- accidental min-width
- hardcoded desktop canvas width

Implement proper responsive behavior.

Use a robust viewport setup such as:

width: 100%;
max-width: 100%;
min-height: 100dvh;

and ensure:

html,
body,
#root {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
}

For mobile application screens, use:

min-height: 100dvh;

instead of relying exclusively on 100vh.

Also account for:

- iPhone Dynamic Island
- safe-area top
- safe-area bottom
- safe-area left/right
- browser viewport differences
- Figma mobile device frames

Use:

padding-top: env(safe-area-inset-top);
padding-bottom: env(safe-area-inset-bottom);

where appropriate.

IMPORTANT:
Do not simply hide the white space with overflow:hidden.

Fix the actual layout/root-width problem.

==================================================
6. FULL IPHONE RESPONSIVE SYSTEM
==================================================

Audit EVERY major screen.

The application must adapt correctly to:

- iPhone 13/14/15/16
- iPhone 17
- iPhone Pro-sized screens
- smaller Android phones
- larger Android phones
- tablets
- desktop

Do not create a separate hardcoded layout for iPhone 17.

Use responsive CSS/layout rules.

Check:

- viewport width
- viewport height
- content width
- navigation
- cards
- buttons
- typography
- Fina chat
- QR scanner
- Send
- Request
- Add Money
- Scan
- account/card section
- transaction history
- alerts
- floating controls
- modals
- bottom navigation

No element should:
- overflow horizontally
- become unreachable
- overlap another control
- be cut off
- extend beyond the viewport
- create unintended white space

==================================================
7. CONSUMER NAVBAR — MAKE EVERYTHING ACTUALLY CLICKABLE
==================================================

The Consumer navigation must not be decorative.

Every navbar item must trigger its intended screen.

Audit the entire Consumer navigation.

Example structure:

Home
→ Consumer Home Dashboard

Cards
→ Consumer Cards / Payment Cards screen

Fina
→ Fina AI Financial Assistant screen

Activity
→ Transaction / Payment Activity screen

Profile
→ Consumer Profile / Settings screen

If the application already has named routes/screens for these, use the existing routes.

DO NOT create duplicate screens if the correct screens already exist.

Every item needs:
- click/tap handler
- active state
- correct route/state transition
- responsive touch target
- visual feedback

The active navbar item must visually indicate the current screen.

==================================================
8. MERCHANT NAVBAR — MAKE EVERYTHING ACTUALLY CLICKABLE
==================================================

The Merchant experience must have its own functional navigation.

Every Merchant navbar item must trigger its specific Merchant screen.

Do NOT accidentally route Merchant users to Consumer screens.

Audit the Merchant navigation and connect each item to the appropriate existing Merchant screen.

Typical Merchant navigation may include:

Dashboard
→ Merchant Dashboard

Payments/Transactions
→ Merchant Transactions

QR / Receive
→ Merchant QR/payment collection screen

Analytics
→ Merchant Analytics

Profile/Business
→ Merchant Business Profile / Settings

Use the exact screens/routes already designed in the application where available.

If a screen already exists visually but is not connected, connect it.

If a route exists but clicking the navbar does nothing, fix the handler.

==================================================
9. CONSUMER ↔ MERCHANT MODE SWITCHING
==================================================

The Consumer and Merchant experiences must remain logically separated.

If the application contains a Consumer/Merchant switcher:

Consumer selected
→ show Consumer navigation + Consumer screens.

Merchant selected
→ show Merchant navigation + Merchant screens.

The switch must not merely change the label.

It must actually change:
- navigation
- dashboard
- available actions
- relevant screens
- active state
- routing/state

Preserve the existing visual design.

==================================================
10. TOUCH TARGETS
==================================================

Because this is a financial application, all mobile interactions must be easy to tap.

Minimum practical touch targets should be approximately 44px where possible.

Ensure sufficient spacing between:
- navbar buttons
- Send
- Request
- Add Money
- Scan
- Fina
- quick actions
- menu buttons
- close buttons

No two interactive elements should overlap.

==================================================
11. SAFE AREA + MODERN IPHONE SUPPORT
==================================================

Implement proper safe-area support.

Account for:

env(safe-area-inset-top)
env(safe-area-inset-right)
env(safe-area-inset-bottom)
env(safe-area-inset-left)

The top header must not collide with:
- Dynamic Island
- status bar

The bottom navigation must not collide with:
- iPhone home indicator
- browser controls
- device safe area

Floating controls must also respect the safe area.

==================================================
12. DO NOT BREAK EXISTING FUNCTIONALITY
==================================================

While fixing the UI, DO NOT break existing:

- authentication
- wallet functionality
- payments
- QR generation
- QR scanning
- transaction history
- Fina AI
- Consumer screens
- Merchant screens
- navigation
- API calls
- backend integration
- state management

Do not rewrite working functionality unnecessarily.

Fix the smallest relevant components.

==================================================
13. RESPONSIVE CSS AUDIT
==================================================

Search the entire project for problematic patterns such as:

width: 100vw;
min-width: ...
width: 390px;
width: 430px;
height: 844px;
height: 932px;
position: absolute;
left: ...
right: ...
margin-left: ...
transform: translateX(...)
fixed desktop widths
hardcoded phone dimensions

Replace inappropriate hardcoded values with responsive values where necessary.

Be especially careful with:

100vw

because it can cause horizontal overflow when scrollbars are present.

Prefer:

width: 100%;

for major containers.

==================================================
14. ROOT APPLICATION CONTAINER
==================================================

Ensure the application root correctly fills the viewport.

Audit:

html
body
#root
App
main layout
mobile shell
desktop shell

There must be no inherited browser margin.

There must be no unexpected white background outside the application.

The app background should extend to the full viewport.

==================================================
15. Z-INDEX / LAYERING
==================================================

Create a clear layering hierarchy.

Suggested logical hierarchy:

Base content
↓
Cards/content
↓
Floating controls
↓
Headers
↓
Bottom navigation
↓
Modals/dialogs

Do not solve overlap problems by blindly increasing z-index everywhere.

Fix positioning first, then establish sensible z-index values.

==================================================
16. FINA CHAT MOBILE BEHAVIOR
==================================================

Audit Fina chat specifically for mobile.

The chat must:

- fill available mobile width
- respect safe areas
- keep messages inside viewport
- keep the input accessible
- allow scrolling
- prevent horizontal overflow
- keep quick suggestion buttons usable
- keep Fina avatar/logo correct
- avoid the keyboard covering the input

The input area should remain properly positioned at the bottom without colliding with navigation.

==================================================
17. VISUAL CONSISTENCY
==================================================

DO NOT redesign ChangeAIPay.

Preserve the existing:

- dark navy background
- blue/cyan gradients
- glowing elements
- typography
- card style
- border treatment
- button language
- Fina branding
- ChangeAIPay branding
- spacing system
- overall premium fintech aesthetic

Only fix the problems described in this prompt and any directly related responsive/interaction bugs discovered during implementation.

==================================================
18. FINAL QA CHECKLIST
==================================================

Before considering the task complete, test every fix.

CHECK 1:
Fina chat uses the ORIGINAL Fina logo/mascot.

CHECK 2:
Right-side quick action panel:
- opens correctly
- options are centered
- Send works
- Scan QR works
- AI works
- Alerts works
- no viewport overflow

CHECK 3:
ChangeAIPay logo:
- circular
- fills circular container
- not square
- not distorted

CHECK 4:
Floating menu:
- moved to top-right
- does not overlap bottom navigation
- works on mobile

CHECK 5:
iPhone 17:
- entire screen filled
- NO white space
- NO horizontal overflow
- NO white strip
- content fits viewport

CHECK 6:
Consumer navbar:
- every option clickable
- every option opens correct screen
- active state works

CHECK 7:
Merchant navbar:
- every option clickable
- every option opens correct Merchant screen
- active state works

CHECK 8:
Consumer/Merchant switching:
- actually changes experience
- correct navigation appears
- correct screens appear

CHECK 9:
Responsive:
- small iPhone
- iPhone 17
- large phone
- Android
- tablet
- desktop

CHECK 10:
No regressions:
- authentication still works
- payments still work
- QR still works
- Fina still works
- existing screens still work

==================================================
19. IMPLEMENTATION RULE
==================================================

DO NOT just tell me what needs to be changed.

ACTUALLY IMPLEMENT THE FIXES IN THE EXISTING PROJECT.

First inspect the existing codebase and identify:

- routing
- navigation components
- mobile layout
- desktop layout
- Fina components
- logo assets
- Consumer navigation
- Merchant navigation
- responsive CSS
- root application container
- floating action/menu component

Then modify the relevant files.

Reuse existing components and assets.

Avoid duplicate implementations.

After implementation, run/build the application and check for:
- compile errors
- runtime errors
- broken imports
- missing assets
- route errors
- CSS errors
- mobile overflow

Fix all errors introduced by the changes.

==================================================
20. MOST IMPORTANT PRIORITY
==================================================

The final result should look like a polished production fintech application.

The five uploaded screenshots represent BUGS/ISSUES to fix, NOT a request to redesign the application.

Therefore:

PRESERVE THE EXISTING CHANGEAIPAY DESIGN.

FIX:
1. Wrong Fina logo
2. Right-side action positioning
3. Square ChangeAIPay logo
4. Bottom floating menu collision
5. iPhone 17 white space/responsiveness
6. Consumer navigation functionality
7. Merchant navigation functionality
8. Consumer/Merchant screen routing
9. Mobile safe areas
10. Responsive layout
11. Touch interactions
12. Any directly related overflow/positioning bugs

Do not stop after fixing only the visual appearance.

Everything must be FUNCTIONAL, RESPONSIVE, CLICKABLE, and production-ready.