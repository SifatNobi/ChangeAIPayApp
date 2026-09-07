import { useEffect } from 'react'
import { initializeReEngagementSystem, recordAppOpen } from '../services/reEngagementNotifications'

export function ReEngagementProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize the re-engagement system on app load
    initializeReEngagementSystem()
  }, [])

  return <>{children}</>
}