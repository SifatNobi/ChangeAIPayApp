export type FundingMethod = 'manual' | 'roundup' | 'paycheck' | 'recurring'

export interface Goal {
  id: string
  name: string
  emoji: string
  targetAmount: number
  currentAmount: number
  targetDate?: string
  fundingMethod: FundingMethod
  color: string
  createdAt: string
}

export const GOALS: Goal[] = []

export const FUNDING_LABELS: Record<FundingMethod, string> = {
  manual:    'Manual deposits',
  roundup:   'Round-up sweeps',
  paycheck:  'Paycheck split',
  recurring: 'Auto recurring',
}

export const GOAL_EMOJIS = ['🛡️','✈️','💻','💍','🏠','🚗','🎓','📱','💰','🏖️','🎸','🏋️','🍕','🎨','📚','🌱']
