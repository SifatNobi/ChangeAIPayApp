import { Capacitor } from '@capacitor/core'
import { Purchases, LOG_LEVEL, PACKAGE_TYPE } from '@revenuecat/purchases-capacitor'
import type {
  CustomerInfo,
  MakePurchaseResult,
  PurchasesPackage,
} from '@revenuecat/purchases-capacitor'

// RevenueCat public Test Store SDK key (Test Store marketplace keys start with "test_").
export const REVENUECAT_PUBLIC_SDK_KEY = 'test_AGnEOgfhFYwvQnrzkxfjxYjMnyd'

// REQUIRED: exact RevenueCat entitlement identifier for the "ChangeAIPay Pro" entitlement.
export const CHANGE_AI_PAY_PRO_ENTITLEMENT_ID = 'changeaipay_pro'

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

export async function purchaseMonthlyPackage(): Promise<MakePurchaseResult> {
  const pkg = await getMonthlyProPackage()
  if (!pkg) throw new Error('No monthly package found in the RevenueCat default offering')
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