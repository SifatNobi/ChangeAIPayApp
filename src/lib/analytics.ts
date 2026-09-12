// Time-to-first-value analytics
// Replace with a real analytics SDK (Segment, Mixpanel, etc.) when ready.

type AnalyticsEvent =
  | 'account_created'
  | 'first_send_success'
  | 'first_goal_created'
  | 'first_bank_linked'
  | 'intent_captured'

const SESSION_KEY = 'cap_account_created_at'

function now(): number {
  return Date.now()
}

function getAccountCreatedAt(): number | null {
  try {
    const v = localStorage.getItem(SESSION_KEY)
    return v ? parseInt(v, 10) : null
  } catch { return null }
}

function setAccountCreatedAt(): void {
  try { localStorage.setItem(SESSION_KEY, String(now())) } catch { /* quota */ }
}

function ttfv(): number | null {
  const createdAt = getAccountCreatedAt()
  return createdAt ? Math.round((now() - createdAt) / 1000) : null
}

export function trackEvent(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  if (event === 'account_created') setAccountCreatedAt()

  const payload = {
    event,
    timestamp: new Date().toISOString(),
    ttfv_seconds: ttfv(),
    ...props,
  }

  // Console log for now — swap for SDK call (e.g. analytics.track(event, payload))
  console.info('[CAP Analytics]', payload)

  // Persist first-value milestone locally for debugging
  if (event === 'first_send_success' || event === 'first_goal_created' || event === 'first_bank_linked') {
    try {
      const key = `cap_milestone_${event}`
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(payload))
      }
    } catch { /* quota */ }
  }
}
