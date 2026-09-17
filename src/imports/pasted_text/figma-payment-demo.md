Create a single copy-paste-ready prompt for Figma Make that adds ONLY a temporary, clickable payment demonstration flow to my existing ChangeAIPay app.

IMPORTANT CONTEXT:
My existing ChangeAIPay app already has an established design system, branding, navigation, components, screens, and clean empty states with no mock data. Preserve all of this.

ChangeAIPay uses the Nano blockchain for its intended payment infrastructure and is positioned around zero transaction fees. The payment demonstration must clearly show Transaction Fee: $0.00 / Zero Transaction Fee. Do not describe the fee as "near zero", "low", or "almost free".

This is for a judging/demo video. It must look polished and realistic as a product experience while remaining clearly identified as a prototype/test flow.

STRICT SCOPE:

- Do NOT redesign the existing app.
- Do NOT change existing branding, colors, typography, navigation, layouts, icons, components, or unrelated screens.
- Do NOT populate existing empty states with mock data.
- Do NOT add fake users, fake balances, fake transaction history, fake merchants, fake reviews, fake traction, or fake activity.
- Add ONLY the minimum screens and interactions necessary for the payment demonstration.
- Reuse existing ChangeAIPay payment/send/receive components and screens wherever possible.
- Match the existing ChangeAIPay visual design exactly.
- Do not create duplicate screens if an appropriate existing screen can be reused.

RESPONSIVE / AUTO LAYOUT:

- Use Figma Auto Layout wherever appropriate for all newly created UI.
- Use Auto Layout for payment cards, rows, amount sections, buttons, forms, receipts, and content groups.
- Use consistent padding, spacing, alignment, and constraints.
- Avoid unnecessary absolute/fixed positioning.
- Make the new screens responsive and suitable for mobile phone dimensions.
- Ensure long recipient names, different payment amounts, and varying text lengths do not break the layout.
- Keep the implementation structured and clean so the screens can be recreated/imported into FlutterFlow later if needed.

CONSUMER PAYMENT DEMO:

Create an isolated demo entry point within the EXISTING consumer Send Money/Pay experience (Payments Hub 52 → Send 53).

Flow:

1. Existing Consumer Send Money/Pay action (Send, 53)
2. Clearly labeled Demo Merchant/recipient
3. Enter/select payment amount (reuse the existing Amount screen, 55)
4. Payment Review screen (reuse the existing Review screen, 56, and its shared-state fee/total recalculation pattern)
5. Review screen clearly displays:
   - Recipient
   - Amount
   - Transaction Fee: $0.00
   - Zero Transaction Fee
   - Total: same as payment amount
6. Confirm Payment
7. Payment Successful — Demo screen (visually matching the existing Payment Success pattern, 57, but see DEMO SAFEGUARD below)
8. Demo receipt/transaction details (reuse the existing Receipt pattern, 83)
9. Return to the normal consumer app

MERCHANT PAYMENT DEMO:

Create a corresponding isolated demo entry point within the EXISTING merchant payment/receive/request-money experience (Merchant Payments Hub, reusing Invoice 170, QR 171, or Payment Links as the most appropriate existing entry point).

Flow:

1. Existing Merchant payment/receive/request-money action
2. Clearly labeled Demo Customer/payer
3. Enter/select payment amount
4. Payment Review screen
5. Review screen clearly displays:
   - Customer/payer
   - Amount
   - Transaction Fee: $0.00
   - Zero Transaction Fee
   - Total: same as payment amount
6. Confirm Payment
7. Payment Successful — Demo screen
8. Merchant-side demo receipt/transaction details
9. Return to the normal merchant app

DEMO SAFEGUARD — DO NOT TRIGGER REAL REVIEW PROMPT:
The existing Payment Success screen (57) is wired to trigger the native App Store/Play Store in-app review API on a genuine first payment success. The demo Payment Successful screens (both consumer and merchant) must visually match that pattern but must NOT invoke the real native review-prompt trigger — this is a demo interaction, not a genuine win moment, and firing a real review request from it would be incorrect. Confirm this explicitly during build.

DEMO LABELING:
Clearly identify the entire experience as:
DEMO MODE
or
TEST PAYMENT

Use subtle but unmistakable labeling so judges understand that no real money is being transferred.

Do NOT claim that an actual Nano transaction, blockchain confirmation, or real payment occurred.

Do NOT fabricate a real transaction hash, blockchain confirmation, real user account, or real transaction history.

If a transaction/reference identifier is needed visually, use an obviously demo-only identifier such as:
DEMO-PAYMENT

ZERO-FEE PRESENTATION:
The payment review and success/receipt screens should make the zero-fee experience immediately understandable:

Transaction Fee
$0.00

and, where appropriate:

Zero Transaction Fee

The total must equal the payment amount because the displayed transaction fee is $0.00.

Do not introduce unrelated FX fees, subscription fees, merchant fees, or other charges into this specific demo unless they already exist in the relevant existing screen and are necessary to preserve the existing product design.

ISOLATED AND REMOVABLE:
Treat all newly created payment-demo screens, components, and prototype connections as a clearly identifiable isolated demo section/flow wherever Figma Make allows.

Do not modify unrelated screens.

Do not permanently alter the existing clean empty-state experience.

The demo must be easy to remove later without rebuilding the rest of the application.

FINAL QUALITY REQUIREMENTS:

- The consumer and merchant demo flows must both be clickable from their appropriate existing payment entry points.
- Both flows must be deterministic and easy to repeat.
- Both flows must visually match the existing ChangeAIPay app.
- Both flows must be optimized for a mobile judging/demo video.
- Keep the number of new screens to the absolute minimum.
- Do not add unnecessary features.
- Do not make any changes outside this payment demonstration.
- Confirm the demo Payment Success screens do not trigger the real native review-prompt API.

The final result should allow me to demonstrate in approximately 1–2 minutes that a consumer can send a payment and a merchant can receive/process a payment, while clearly showing the intended $0.00 zero transaction fee experience.

Before making changes, inspect the existing app and reuse its existing screens/components wherever possible. Do not rebuild existing UI unnecessarily.

Output/build ONLY this scoped payment demonstration. Do not redesign or modify the rest of the application.