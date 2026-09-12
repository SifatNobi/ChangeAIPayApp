FIX-ONLY TASK — DO NOT REDESIGN, RESTYLE, RESTRUCTURE, OR REMOVE ANY EXISTING UI.

I need you to fix the existing merchant pricing/tier cards in the current app.

CURRENT BUG:
In the pricing/tier cards, only some included features are visible. A “+4 more” option appears on some tiers, but clicking/tapping “+4 more” currently does nothing and no additional tier details appear.

PRIMARY OBJECTIVE:
Make the “+X more” interaction fully functional and ensure that EVERY feature included in each tier can be viewed in real time when the user clicks/taps the “+X more” option.

IMPORTANT:
Preserve the existing visual design, typography, colors, spacing, card layout, borders, gradients, buttons, pricing, and overall UI exactly as they currently are. This is a functionality/data-display fix only.

DO NOT:
- Redesign the pricing cards
- Change the visual style
- Remove existing features
- Change pricing
- Change fee percentages
- Change tier names
- Change revenue thresholds
- Invent additional features
- Replace the existing pricing section with a different component
- Break responsive/mobile layouts
- Create fake/non-functional buttons
- Hard-code a “+4 more” label if the actual hidden feature count is different

IMPLEMENT THE FOLLOWING BEHAVIOR:

1. EACH TIER MUST HAVE A COMPLETE FEATURE DATASET

Use the following exact tier information:

TIER 1 — STARTUP
Name:
Startup Tier

Revenue:
Up to $10K annual merchant revenue

Platform fee:
1.25%

FX spread:
1.00%

Features:
- AI Revenue Booster (basic sales pattern insights)
- Basic Cash Flow Predictor
- Smart transcripts + money monitoring
- Entry analytics dashboard
- Payment speaker or message
- AI note taking


TIER 2 — GROWTH
Name:
Growth Tier

Revenue:
$10K–$50K annual merchant revenue

Platform fee:
1.75%

FX spread:
0.85%

Features:
- Everything in Startup Tier
- Auto-Personalized Marketing
- AI Upsell Assistant
- Improved pricing suggestions
- Customer re-engagement starter tools


TIER 3 — SCALE
Name:
Scale Tier

Revenue:
$50K–$100K annual merchant revenue

Platform fee:
2.25%

FX spread:
0.70%

Features:
- Everything in Growth Tier
- Smart Pricing Engine
- Customer Lifetime Value Predictor
- Full Business Health Intelligence Dashboard
- Stronger Cash Flow Predictor


TIER 4 — PREMIUM
Name:
Premium Tier

Revenue:
$100K+ annual merchant revenue

Platform fee:
2.75% capped platform fee

FX spread:
0.60%

Features:
- Everything in Scale Tier
- AI Customer Recovery System
- Dynamic demand pricing
- Advanced churn prevention
- Priority support + premium analytics


TIER 5 — RETENTION
Name:
Retention Tier

Revenue:
$400K+ annual merchant revenue

Retention fee:
2.35%

FX spread:
0.50%

Features:
- Everything in Premium Tier
- Retention-focused AI campaigns
- Dedicated profitability optimization models
- Lower FX pricing to reduce churn


TIER 6 — ENTERPRISE
Name:
Enterprise Tier

Revenue:
$500K+ annual merchant revenue

Enterprise fee:
2.20% enterprise cap

FX spread:
0.45%

Features:
- Everything in Retention Tier
- AI call handling and messaging
- Custom AI workflow automation
- Enterprise infrastructure licensing
- Dedicated fraud intelligence models
- API customization + private routing logic
- Strategic account management

AI CALL HANDLING AND MESSAGING DESCRIPTION:
AI Agent takes calls for merchants when busy or unavailable, helps book a service when needed by checking and matching available time slots, and can send and receive messages if a customer prefers messaging instead of calls after customer approval.


2. “+X MORE” MUST BE DYNAMIC

Do NOT hard-code “+4 more”.

The interface must calculate the number of hidden features dynamically from the actual feature list.

For example:

visibleFeatures = the features currently displayed inside the collapsed card

hiddenFeatures = all remaining features

moreCount = hiddenFeatures.length

Then display:

“+{moreCount} more”

If there are no hidden features, do not display a “+0 more” control.

The displayed count must always match the actual number of hidden feature items.


3. CLICK/TAP MUST ACTUALLY WORK

When the user clicks/taps “+X more”:

- Expand the SAME pricing card
- Reveal all remaining features belonging to that tier
- Keep the existing card styling
- Keep the existing pricing information visible
- Do not navigate away from the pricing page
- Do not open a blank screen
- Do not require a page refresh
- Do not lose the current tier information
- Do not reset the application state

The interaction must happen immediately in the UI.


4. COLLAPSE FUNCTIONALITY

After expansion, change the control from:

“+X more”

to:

“Show less”

When the user clicks/taps “Show less”:

- Hide the previously revealed features
- Return the card to its original collapsed state
- Restore the correct dynamically calculated “+X more” count
- Preserve all other card information


5. EACH TIER MUST BE INDEPENDENT

The expansion state of one pricing card must not accidentally expand or collapse every other card.

For example:

If Startup is expanded:
- Startup expands
- Growth, Scale, Premium, Retention and Enterprise remain unchanged

If Enterprise is expanded:
- Only Enterprise expands

Use independent state for each tier, such as:

expandedTiers[tierId]

Do NOT use one global boolean that causes every pricing card to expand simultaneously.


6. “EVERYTHING IN [PREVIOUS TIER]” MUST BE HANDLED CORRECTLY

For tiers containing:

“Everything in Startup Tier”
“Everything in Growth Tier”
“Everything in Scale Tier”
“Everything in Premium Tier”
“Everything in Retention Tier”

Make sure the UI can expose the complete inherited feature set.

Do not display only the literal phrase “Everything in Startup Tier” if the purpose of the expanded feature list is to show the actual included capabilities.

The expanded tier should allow the user to see the complete effective feature set available at that tier.

Avoid duplicate feature entries when inheriting features from previous tiers.

For example:

Growth should contain the effective Startup features PLUS:
- Auto-Personalized Marketing
- AI Upsell Assistant
- Improved pricing suggestions
- Customer re-engagement starter tools

Scale should contain the effective Growth features PLUS:
- Smart Pricing Engine
- Customer Lifetime Value Predictor
- Full Business Health Intelligence Dashboard
- Stronger Cash Flow Predictor

Continue the same inheritance logic for Premium, Retention and Enterprise.


7. ENTERPRISE AI CALL/MESSAGING FEATURE

The Enterprise tier's “AI call handling and messaging” feature is important and must NOT be truncated or hidden permanently.

When Enterprise is expanded, display the feature clearly.

The detailed explanation should be accessible without breaking the card layout.

If the existing design uses feature tooltips, expandable descriptions, or another existing pattern, reuse that existing pattern rather than creating a new visual style.

The full meaning must remain:

“AI Agent takes calls for merchants when busy or unavailable, helps book a service when needed by checking and matching available time slots, and sends and receives messages if a customer prefers messaging instead of calls after customer approval.”


8. RESPONSIVE BEHAVIOR

Make the expanded content work correctly on:

- Desktop
- Tablet
- Mobile

On smaller screens:
- Do not allow text to overflow outside the card
- Do not clip feature descriptions
- Allow the card to grow vertically naturally
- Keep the “Show less” control accessible
- Do not create horizontal scrolling
- Do not break neighboring pricing cards


9. ACCESSIBILITY

The “+X more” / “Show less” control must be a real interactive button/control, not decorative text.

It should:
- Be keyboard accessible
- Have an appropriate accessible label
- Clearly communicate expanded/collapsed state
- Work with mouse, touch and keyboard
- Have a visible existing-style interaction state


10. REAL-TIME UI STATE

The expanded/collapsed content must be driven by application state.

Do NOT implement this as a static visual mockup.

The UI should immediately re-render when the user clicks:

+X more → expanded feature list

Show less → collapsed feature list


11. DATA CONSISTENCY

Create/use a single structured pricing-tier data source rather than manually creating disconnected copies of the same features throughout the UI.

For example, conceptually:

tiers = [
  {
    id: "startup",
    name: "Startup Tier",
    ...
    features: [...]
  },
  ...
]

The pricing card should render from this data.

The “+X more” count must be calculated from the rendered tier's feature array.

This prevents the displayed count and actual feature list from becoming inconsistent later.


12. DO NOT CHANGE THE EXISTING DEFAULT APPEARANCE

The pricing cards should initially look exactly like they look now.

Only the interaction behavior should change.

The initial collapsed state should continue showing the same number of visible features that the current design intends to show.

The only difference should be that clicking “+X more” now works and reveals the remaining features.


13. PRESERVE EXISTING CONTENT

Do not delete or rewrite existing pricing information.

Preserve:

Startup — 1.25% platform fee / 1.00% FX spread
Growth — 1.75% platform fee / 0.85% FX spread
Scale — 2.25% platform fee / 0.70% FX spread
Premium — 2.75% capped platform fee / 0.60% FX spread
Retention — 2.35% retention fee / 0.50% FX spread
Enterprise — 2.20% enterprise cap / 0.45% FX spread

Do not modify these values.


14. IMPORTANT VALIDATION

After implementing the fix, TEST every tier manually in the prototype/app:

Startup:
Click +X more → all Startup features appear → Show less works.

Growth:
Click +X more → all effective Growth features appear → Show less works.

Scale:
Click +X more → all effective Scale features appear → Show less works.

Premium:
Click +X more → all effective Premium features appear → Show less works.

Retention:
Click +X more → all effective Retention features appear → Show less works.

Enterprise:
Click +X more → all effective Enterprise features appear, including AI call handling/messaging and its complete description → Show less works.

Also verify:
- Correct dynamic +X count
- No blank interaction
- No navigation
- No page reload
- No duplicated inherited features
- No missing features
- No text clipping
- No broken mobile layout
- Expanding one card does not expand another
- Existing styling remains unchanged


FINAL REQUIREMENT:

This is a BUG FIX to the existing pricing section, NOT a redesign.

Inspect the existing implementation first, identify why the current “+4 more” interaction is non-functional, then repair the underlying interaction/state/data-rendering logic.

Make the smallest reliable code changes necessary.

After the fix, the user must be able to click/tap every “+X more” control and immediately see ALL features included in that specific tier in the existing UI.