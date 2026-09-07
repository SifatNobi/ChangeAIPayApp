import { useState, useEffect } from 'react'

export type ReEngagementTriggerType = 
  | 'inactivity_7d'
  | 'unfinished_goal_14d'
  | 'abandoned_transaction'
  | 'referral_milestone_proximity'
  | 'achievement_badge_proximity'

export interface ReEngagementNotification {
  id: string
  type: ReEngagementTriggerType
  title: string
  body: string
  deepLink: string
  priority: 'low' | 'medium' | 'high'
  createdAt: number
  read: boolean
}

interface NotificationPreferences {
  inactivity_7d: boolean
  unfinished_goal_14d: boolean
  abandoned_transaction: boolean
  referral_milestone_proximity: boolean
  achievement_badge_proximity: boolean
}

const DEFAULT_PREFERENCES: NotificationPreferences = {
  inactivity_7d: true,
  unfinished_goal_14d: true,
  abandoned_transaction: true,
  referral_milestone_proximity: true,
  achievement_badge_proximity: true,
}

const STORAGE_KEYS = {
  preferences: 'reengagement_preferences',
  lastAppOpen: 'last_app_open_timestamp',
  lastGoalContribution: 'last_goal_contribution_timestamp',
  transactionFlowStarted: 'transaction_flow_started_timestamp',
  transactionFlowCompleted: 'transaction_flow_completed_timestamp',
  referralProgress: 'referral_active_connections_count',
  achievementProgress: 'achievement_badges_earned_count',
  notifications: 'reengagement_notifications_list',
  lastTriggered: 'reengagement_last_triggered',
}

function getStoredPreferences(): NotificationPreferences {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.preferences)
    if (stored) {
      return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) }
    }
  } catch {}
  return DEFAULT_PREFERENCES
}

function setStoredPreferences(prefs: NotificationPreferences): void {
  localStorage.setItem(STORAGE_KEYS.preferences, JSON.stringify(prefs))
}

function getStoredNotifications(): ReEngagementNotification[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.notifications)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch {}
  return []
}

function setStoredNotifications(notifications: ReEngagementNotification[]): void {
  localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifications))
}

export function recordAppOpen(): void {
  localStorage.setItem(STORAGE_KEYS.lastAppOpen, Date.now().toString())
}

export function recordGoalContribution(): void {
  localStorage.setItem(STORAGE_KEYS.lastGoalContribution, Date.now().toString())
}

export function recordTransactionFlowStart(): void {
  localStorage.setItem(STORAGE_KEYS.transactionFlowStarted, Date.now().toString())
}

export function recordTransactionFlowComplete(): void {
  localStorage.setItem(STORAGE_KEYS.transactionFlowCompleted, Date.now().toString())
  localStorage.removeItem(STORAGE_KEYS.transactionFlowStarted)
}

export function recordReferralProgress(count: number): void {
  localStorage.setItem(STORAGE_KEYS.referralProgress, count.toString())
}

export function recordAchievementProgress(count: number): void {
  localStorage.setItem(STORAGE_KEYS.achievementProgress, count.toString())
}

function checkAndTriggerNotifications(): ReEngagementNotification[] {
  const prefs = getStoredPreferences()
  const now = Date.now()
  const newNotifications: ReEngagementNotification[] = []
  const existingNotifications = getStoredNotifications()
  const lastTriggeredData = JSON.parse(localStorage.getItem(STORAGE_KEYS.lastTriggered) || '{}')

  // 1. Inactivity nudge (7+ days)
  if (prefs.inactivity_7d) {
    const lastOpen = parseInt(localStorage.getItem(STORAGE_KEYS.lastAppOpen) || '0')
    const daysSinceOpen = (now - lastOpen) / (1000 * 60 * 60 * 24)
    const lastInactivityTrigger = lastTriggeredData.inactivity_7d || 0
    const daysSinceTrigger = (now - lastInactivityTrigger) / (1000 * 60 * 60 * 24)

    if (daysSinceOpen >= 7 && daysSinceTrigger >= 7) {
      newNotifications.push({
        id: `inactivity_${now}`,
        type: 'inactivity_7d',
        title: 'We miss you!',
        body: "It's been a week since you last opened ChangeAIPay. Come back to see what's new with Fina and your savings goals.",
        deepLink: 'home',
        priority: 'medium',
        createdAt: now,
        read: false,
      })
    }
  }

  // 2. Unfinished goal reminder (14+ days)
  if (prefs.unfinished_goal_14d) {
    const lastContribution = parseInt(localStorage.getItem(STORAGE_KEYS.lastGoalContribution) || '0')
    const daysSinceContribution = (now - lastContribution) / (1000 * 60 * 60 * 24)
    const lastGoalTrigger = lastTriggeredData.unfinished_goal_14d || 0
    const daysSinceTrigger = (now - lastGoalTrigger) / (1000 * 60 * 60 * 24)

    if (lastContribution > 0 && daysSinceContribution >= 14 && daysSinceTrigger >= 14) {
      newNotifications.push({
        id: `goal_${now}`,
        type: 'unfinished_goal_14d',
        title: 'Your goals miss you',
        body: "It's been two weeks since you added to your savings goals. Even a small deposit keeps you on track.",
        deepLink: 'goals',
        priority: 'medium',
        createdAt: now,
        read: false,
      })
    }
  }

  // 3. Abandoned transaction reminder
  if (prefs.abandoned_transaction) {
    const flowStarted = parseInt(localStorage.getItem(STORAGE_KEYS.transactionFlowStarted) || '0')
    const flowCompleted = parseInt(localStorage.getItem(STORAGE_KEYS.transactionFlowCompleted) || '0')
    const flowStartedRecently = flowStarted > 0 && (now - flowStarted) < 24 * 60 * 60 * 1000
    const flowNotCompleted = flowCompleted === 0 || flowCompleted < flowStarted
    const lastAbandonedTrigger = lastTriggeredData.abandoned_transaction || 0
    const hoursSinceTrigger = (now - lastAbandonedTrigger) / (1000 * 60 * 60)

    if (flowStartedRecently && flowNotCompleted && hoursSinceTrigger >= 1) {
      newNotifications.push({
        id: `abandoned_${now}`,
        type: 'abandoned_transaction',
        title: 'Finish what you started',
        body: "You started a transfer but didn't complete it. Tap to pick up where you left off.",
        deepLink: 'sendAmount',
        priority: 'high',
        createdAt: now,
        read: false,
      })
    }
  }

  // 4. Referral milestone proximity
  if (prefs.referral_milestone_proximity) {
    const referralCount = parseInt(localStorage.getItem(STORAGE_KEYS.referralProgress) || '0')
    const milestones = [1, 3, 5, 10, 25, 50]
    const nextMilestone = milestones.find(m => m > referralCount)
    const lastReferralTrigger = lastTriggeredData.referral_milestone_proximity || 0
    const daysSinceTrigger = (now - lastReferralTrigger) / (1000 * 60 * 60 * 24)

    if (nextMilestone && (nextMilestone - referralCount) <= 2 && daysSinceTrigger >= 7) {
      newNotifications.push({
        id: `referral_${now}`,
        type: 'referral_milestone_proximity',
        title: `Almost there: ${nextMilestone} referrals`,
        body: `You're ${nextMilestone - referralCount} referral${nextMilestone - referralCount > 1 ? 's' : ''} away from your next milestone. Keep sharing!`,
        deepLink: 'referralTerms',
        priority: 'low',
        createdAt: now,
        read: false,
      })
    }
  }

  // 5. Achievement badge proximity
  if (prefs.achievement_badge_proximity) {
    const badgeCount = parseInt(localStorage.getItem(STORAGE_KEYS.achievementProgress) || '0')
    const badgeMilestones = [1, 3, 5, 10, 25, 50]
    const nextBadge = badgeMilestones.find(m => m > badgeCount)
    const lastBadgeTrigger = lastTriggeredData.achievement_badge_proximity || 0
    const daysSinceTrigger = (now - lastBadgeTrigger) / (1000 * 60 * 60 * 24)

    if (nextBadge && (nextBadge - badgeCount) <= 2 && daysSinceTrigger >= 7) {
      newNotifications.push({
        id: `badge_${now}`,
        type: 'achievement_badge_proximity',
        title: `Badge unlocked soon: ${nextBadge} badges`,
        body: `You're ${nextBadge - badgeCount} badge${nextBadge - badgeCount > 1 ? 's' : ''} away from your next achievement. Keep going!`,
        deepLink: 'achievementBadges',
        priority: 'low',
        createdAt: now,
        read: false,
      })
    }
  }

  if (newNotifications.length > 0) {
    const updatedTriggered = { ...lastTriggeredData }
    newNotifications.forEach(n => {
      updatedTriggered[n.type] = n.createdAt
    })
    localStorage.setItem(STORAGE_KEYS.lastTriggered, JSON.stringify(updatedTriggered))

    const updatedNotifications = [...newNotifications, ...existingNotifications].slice(0, 50)
    setStoredNotifications(updatedNotifications)
  }

  return newNotifications
}

export function useReEngagementNotifications() {
  const [notifications, setNotifications] = useState<ReEngagementNotification[]>([])

  useEffect(() => {
    // Check for new notifications on mount
    const newNotifications = checkAndTriggerNotifications()
    if (newNotifications.length > 0) {
      setNotifications(prev => [...newNotifications, ...prev].slice(0, 50))
    } else {
      setNotifications(getStoredNotifications())
    }

    // Set up periodic check (every hour)
    const interval = setInterval(() => {
      const newNotifications = checkAndTriggerNotifications()
      if (newNotifications.length > 0) {
        setNotifications(prev => [...newNotifications, ...prev].slice(0, 50))
      }
    }, 60 * 60 * 1000)

    return () => clearInterval(interval)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    const updated = getStoredNotifications().map(n => n.id === id ? { ...n, read: true } : n)
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(updated))
  }

  const dismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
    const updated = getStoredNotifications().filter(n => n.id !== id)
    localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(updated))
  }

  const clearAll = () => {
    setNotifications([])
    localStorage.removeItem(STORAGE_KEYS.notifications)
  }

  return {
    notifications,
    markAsRead,
    dismiss,
    clearAll,
    unreadCount: notifications.filter(n => !n.read).length,
  }
}

export function getNotificationPreferences(): NotificationPreferences {
  return getStoredPreferences()
}

export function setNotificationPreferences(prefs: Partial<NotificationPreferences>): void {
  const current = getStoredPreferences()
  setStoredPreferences({ ...current, ...prefs })
}

export function initializeReEngagementSystem(): void {
  recordAppOpen()
  checkAndTriggerNotifications()
}