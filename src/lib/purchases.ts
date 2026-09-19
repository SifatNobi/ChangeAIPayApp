import { Capacitor } from '@capacitor/core'
import { Purchases, LOG_LEVEL, PACKAGE_TYPE } from '@revenuecat/purchases-capacitor'
import type {
  CustomerInfo,
  MakePurchaseResult,
  PurchasesPackage,
} from '@revenuecat/purchases-capacitor'
import type { TierName } from '@/data/merchantTiers'

// RevenueCat public Test Store SDK key (Test Store marketplace keys start with "test_").
export const REVENUECAT_PUBLIC_SDK_KEY = 'test_AGnEOgfhFYwvQnrzkxfjxYjMnyd'

// REQUIRED: exact RevenueCat entitlement identifier for the "ChangeAIPay Pro" entitlement.
export const CHANGE_AI_PAY_PRO_ENTITLEMENT_ID = 'changeaipay_pro'

// Merchant entitlement + offering identifiers (RevenueCat dashboard: Merchant Offering, id "merchant").
export const CHANGE_AI_PAY_MERCHANT_ENTITLEMENT_ID = 'changeaipay_merchant'
export const MERCHANT_OFFERING_IDENTIFIER = 'merchant'
// Personal plans live under their OWN exact RevenueCat offering (identifier "personal") — NOT the
// default/current offering. Each ChangeAIPay pro tier must resolve against "personal" so the exact
// store product is found in the precise container, independent of whatever offering is currently set.
export const PERSONAL_OFFERING_IDENTIFIER = 'personal'

// Exact RevenueCat Store product identifiers (Test Store marketplace) per ChangeAIPay tier.
// Do NOT guess/reuse generic product ids â€” each tier must resolve to its own Store product so
// the exact RevenueCat package is purchased (not whatever happens to be first/current).
export type PersonalPlan = 'edge' | 'prime' | 'apex'

export const PERSONAL_MONTHLY_PRODUCT_IDS: Record<PersonalPlan, string> = {
  edge: 'changeaipay_personal_edge_monthly',
  prime: 'changeaipay_personal_prime_monthly',
  apex: 'changeaipay_personal_apex_monthly',
}

export const MERCHANT_YEARLY_PRODUCT_IDS: Record<TierName, string> = {
  Startup: 'changeaipay_merchant_startup_yearly',
  Growth: 'changeaipay_merchant_growth_yearly',
  Scale: 'changeaipay_merchant_scale_yearly',
  Premium: 'changeaipay_merchant_premium_yearly',
  Retention: 'changeaipay_merchant_retention_yearly',
  Enterprise: 'changeaipay_merchant_enterprise_yearly',
}

let configured = false

// RevenueCat SDK is only usable inside the native Capacitor shell (Android).
// The web preview / Figma Make environment has no native store, so we stay inert there.
export function isRevenueCatNative(): boolean {
  return Capacitor.isNativePlatform()
}

export async function initPurchases(): Promise<boolean> {
  if (!isRevenueCatNative()) return false
  if (configured) return true
  await Purchases.configure({ apiKey: REVENUECAT_PUBLIC_SDK_KEY })
  await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG })
  configured = true
  return true
}

export function hasProAccess(customerInfo: CustomerInfo | null | undefined): boolean {
  if (!customerInfo) return false
  const entitlement = customerInfo.entitlements?.active?.[CHANGE_AI_PAY_PRO_ENTITLEMENT_ID]
  return entitlement?.isActive === true
}

export async function getMonthlyProPackage(): Promise<PurchasesPackage | null> {
  if (!(await initPurchases())) return null
  const offerings = await Purchases.getOfferings()
  const current = offerings.current
  if (!current) return null
  if (current.monthly) return current.monthly
  return current.availablePackages.find(pkg => pkg.packageType === PACKAGE_TYPE.MONTHLY) ?? null
}

// EXACT-tier package resolution. NEVER blindly buy whichever monthly package happens to be
// first/current in an offering â€” each ChangeAIPay plan must resolve to ITS OWN RevenueCat store
// product so the precisely-configured package is purchased. Returns null when the exact product
// is absent from the offering so the caller surfaces a visible error instead of a mis-purchase.
export async function getExactPersonalMonthlyPackage(
  plan: PersonalPlan,
): Promise<PurchasesPackage | null> {
  if (!(await initPurchases())) return null
  const offerings = await Purchases.getOfferings()
  // Personal purchases resolve against the EXACT "personal" offering registered on the
  // RevenueCat dashboard. The easiest "current/default" offering must never be used on the
  // Personal path — each ChangeAIPay tier resolves to ITS OWN offering identifier so the exact
  // RevenueCat store product is always found inside the correct container.
  const exactOffering = offerings.all[PERSONAL_OFFERING_IDENTIFIER]
  if (!exactOffering) {
    // TEMP diagnostic (RevenueCat bug-fix pass) — identifiers only, the SDK key is never logged.
    console.warn(
      `[RevenueCat-diagnostic:personal] offering "${PERSONAL_OFFERING_IDENTIFIER}" not present. returned offering ids=${JSON.stringify(Object.keys(offerings.all ?? {}))} current=${offerings.current?.identifier ?? 'none'}`,
    )
    return null
  }
  const exactProductId = PERSONAL_MONTHLY_PRODUCT_IDS[plan]
  const exactPackages = await exactOffering.availablePackages
  const exactPackage =
    exactPackages.find(pkg => pkg.product?.identifier === exactProductId) ?? null
  // TEMP diagnostic (RevenueCat bug-fix pass) — identifiers only, the SDK key is never logged.
  console.info(
    `[RevenueCat-diagnostic:personal] plan=${plan} offering=${PERSONAL_OFFERING_IDENTIFIER} packageIds=${JSON.stringify(exactPackages.map(p => p.product?.identifier))} selected=${exactProductId} matched=${exactPackage?.product?.identifier ?? 'null'}`,
  )
  return exactPackage
}

export async function purchasePersonalMonthlyPackage(
  plan: PersonalPlan,
): Promise<MakePurchaseResult> {
  const pkg = await getExactPersonalMonthlyPackage(plan)
  if (!pkg) {
    throw new Error(
      `No RevenueCat package found for the exact "${PERSONAL_MONTHLY_PRODUCT_IDS[plan]}" product in the default/current offering â€” check the RevenueCat dashboard store product.`,
    )
  }
  return Purchases.purchasePackage({ aPackage: pkg })
}

export async function getMerchantYearlyPackage(tier: TierName): Promise<PurchasesPackage | null> {
  if (!(await initPurchases())) return null
  const offerings = await Purchases.getOfferings()
  const merchantOffering =
    offerings.all[MERCHANT_OFFERING_IDENTIFIER] ?? (offerings.current?.identifier === MERCHANT_OFFERING_IDENTIFIER ? offerings.current : null)
  if (!merchantOffering) {
    // TEMP diagnostic (RevenueCat bug-fix pass) — identifiers only, the SDK key is never logged.
    console.warn(
      `[RevenueCat-diagnostic:merchant] offering "${MERCHANT_OFFERING_IDENTIFIER}" not present. returned offering ids=${JSON.stringify(Object.keys(offerings.all ?? {}))} current=${offerings.current?.identifier ?? 'none'}`,
    )
    return null
  }
  const exactProductId = MERCHANT_YEARLY_PRODUCT_IDS[tier]
  const exactPackages = await merchantOffering.availablePackages
  const exactPackage =
    exactPackages.find(pkg => pkg.product?.identifier === exactProductId) ?? null
  // TEMP diagnostic (RevenueCat bug-fix pass) — identifiers only, the SDK key is never logged.
  console.info(
    `[RevenueCat-diagnostic:merchant] tier=${tier} offering=${MERCHANT_OFFERING_IDENTIFIER} packageIds=${JSON.stringify(exactPackages.map(p => p.product?.identifier))} selected=${exactProductId} matched=${exactPackage?.product?.identifier ?? 'null'}`,
  )
  return exactPackage
}

export async function purchaseMerchantYearlyPackage(tier: TierName): Promise<MakePurchaseResult> {
  const pkg = await getMerchantYearlyPackage(tier)
  if (!pkg) {
    throw new Error(
      `No RevenueCat package found for the exact "${MERCHANT_YEARLY_PRODUCT_IDS[tier]}" product in the "${MERCHANT_OFFERING_IDENTIFIER}" offering â€” check the RevenueCat dashboard merchant store product.`,
    )
  }
  return Purchases.purchasePackage({ aPackage: pkg })
}

export async function restorePurchases(): Promise<CustomerInfo> {
  if (!(await initPurchases())) {
    throw new Error('RevenueCat is unavailable on this platform')
  }
  const { customerInfo } = await Purchases.restorePurchases()
  return customerInfo
}

export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  if (!(await initPurchases())) return null
  try {
    const { customerInfo } = await Purchases.getCustomerInfo()
    return customerInfo
  } catch {
    return null
  }
}

export async function subscribeToCustomerInfo(
  listener: (customerInfo: CustomerInfo) => void,
): Promise<(() => void) | null> {
  if (!(await initPurchases())) return null
  const listenerId = await Purchases.addCustomerInfoUpdateListener(listener)
  return () => {
    void Purchases.removeCustomerInfoUpdateListener({ listenerToRemove: listenerId }).catch(() => {})
  }
}
