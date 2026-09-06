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

export const GOALS: Goal[] = [
  {
    id: 'g1', name: 'Emergency Fund', emoji: '🛡️',
    targetAmount: 5000, currentAmount: 2450,
    fundingMethod: 'paycheck', color: '#3FE7FF',
    targetDate: '2026-12-31', createdAt: 'Feb 2026',
  },
  {
    id: 'g2', name: 'Vacation', emoji: '✈️',
    targetAmount: 2500, currentAmount: 780,
    fundingMethod: 'roundup', color: '#F5B700',
    targetDate: '2027-06-01', createdAt: 'May 2026',
  },
  {
    id: 'g3', name: 'New MacBook', emoji: '💻',
    targetAmount: 1800, currentAmount: 1200,
    fundingMethod: 'recurring', color: '#9945FF',
    targetDate: '2026-10-01', createdAt: 'Jun 2026',
  },
  {
    id: 'g4', name: 'Wedding', emoji: '💍',
    targetAmount: 10000, currentAmount: 4200,
    fundingMethod: 'manual', color: '#E6007A',
    targetDate: '2027-09-15', createdAt: 'Jan 2026',
  },
]

export const FUNDING_LABELS: Record<FundingMethod, string> = {
  manual:    'Manual deposits',
  roundup:   'Round-up sweeps',
  paycheck:  'Paycheck split',
  recurring: 'Auto recurring',
}

export const GOAL_EMOJIS = ['🛡️','✈️','💻','💍','🏠','🚗','🎓','📱','💰','🏖️','🎸','🏋️','🍕','🎨','📚','🌱']
