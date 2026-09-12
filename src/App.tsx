import { useState, useCallback } from 'react'
import { type Transaction } from '@/data/transactions'
import { trackEvent } from '@/lib/analytics'

import PhoneFrame from './components/PhoneFrame'
import Splash from './screens/Splash'
import AppUpdate from './screens/AppUpdate'
import Maintenance from './screens/Maintenance'
import NoInternet from './screens/NoInternet'
import ServerError from './screens/ServerError'
import Welcome from './screens/Welcome'
import Permissions from './screens/Permissions'
import AccountType from './screens/AccountType'
import CreateAccount from './screens/CreateAccount'
import UnderageGate from './screens/UnderageGate'
import OTPVerification from './screens/OTPVerification'
import AccountCreated from './screens/AccountCreated'
import SetPIN from './screens/SetPIN'
import EnableBiometrics from './screens/EnableBiometrics'
import Enable2FA from './screens/Enable2FA'
import Login from './screens/Login'
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword'
import PasswordResetSuccess from './screens/PasswordResetSuccess'
import LoadingGateway from './screens/LoadingGateway'
import WelcomeBack from './screens/WelcomeBack'
import WhatsNew from './screens/WhatsNew'
import SessionExpired from './screens/SessionExpired'
import NewDeviceVerification from './screens/NewDeviceVerification'
import SuspiciousLogin from './screens/SuspiciousLogin'
import PINLockout from './screens/PINLockout'
import KYCIntro from './screens/KYCIntro'
import KYCPersonalDetails, { type PersonalData } from './screens/KYCPersonalDetails'
import KYCIDSelection, { type IDSelectionData } from './screens/KYCIDSelection'
import KYCIDCapture from './screens/KYCIDCapture'
import KYCLiveness from './screens/KYCLiveness'
import KYCReview from './screens/KYCReview'
import KYCPending from './screens/KYCPending'
import KYCSuccess from './screens/KYCSuccess'
import KYCFailed from './screens/KYCFailed'
import KYCBiometricConsent from './screens/KYCBiometricConsent'
import KYCNeedsInfo from './screens/KYCNeedsInfo'
import KYCAttemptLimit from './screens/KYCAttemptLimit'
import Home from './screens/Home'
import WalletDetail from './screens/WalletDetail'
import Notifications from './screens/Notifications'
import NotificationDetail from './screens/NotificationDetail'
import VerificationGate from './screens/VerificationGate'
import TransactionLimitReached from './screens/TransactionLimitReached'
import Search from './screens/Search'
import SubscriptionPlans from './screens/SubscriptionPlans'
import SearchResults from './screens/SearchResults'
import SpendingInsightsPreview from './screens/SpendingInsightsPreview'
import AISuggestionsWidget from './screens/AISuggestionsWidget'
import QuickActions from './screens/QuickActions'
import DashboardCustomization from './screens/DashboardCustomization'
import RefreshState from './screens/RefreshState'
import PaymentsHub from './screens/PaymentsHub'
import SendMethod from './screens/SendMethod'
import ContactPicker from './screens/ContactPicker'
import SendAmount from './screens/SendAmount'
import SendConfirmation from './screens/SendConfirmation'
import SendSuccess from './screens/SendSuccess'
import SendFailed from './screens/SendFailed'
import SendPending from './screens/SendPending'
import Receive from './screens/Receive'
import QRHub from './screens/QRHub'
import ScanQR from './screens/ScanQR'
import InvalidQR from './screens/InvalidQR'
import ExpiredQR from './screens/ExpiredQR'
import SplitPayment from './screens/SplitPayment'
import SplitSuccess from './screens/SplitSuccess'
import PaymentNote from './screens/PaymentNote'
import RefundRequest from './screens/RefundRequest'
import RefundResult from './screens/RefundResult'
import BankSelection from './screens/BankSelection'
import LinkBank from './screens/LinkBank'
import VerificationPending from './screens/VerificationPending'
import VerificationFailed from './screens/VerificationFailed'
import ConnectionError from './screens/ConnectionError'
import LinkedSuccess from './screens/LinkedSuccess'
import LinkedBankDetail from './screens/LinkedBankDetail'
import AddMoney from './screens/AddMoney'
import Withdraw from './screens/Withdraw'
import RemoveBank from './screens/RemoveBank'
import TransactionHistory from './screens/TransactionHistory'
import TransactionDetail from './screens/TransactionDetail'
import Receipt from './screens/Receipt'
import ShareReceipt from './screens/ShareReceipt'
import Export from './screens/Export'
import TransactionSearch from './screens/TransactionSearch'
import Filters from './screens/Filters'
import Recurring from './screens/Recurring'
import Scheduled from './screens/Scheduled'
import CancelScheduled from './screens/CancelScheduled'
import CryptoHome from './screens/CryptoHome'
import CryptoBuy, { type BuyOrder } from './screens/CryptoBuy'
import CryptoProviderComparison from './screens/CryptoProviderComparison'
import CryptoReview, { type ReviewOrder } from './screens/CryptoReview'
import CryptoProcessing from './screens/CryptoProcessing'
import CryptoSuccess from './screens/CryptoSuccess'
import CryptoSell, { type SellOrder } from './screens/CryptoSell'
import CryptoSellConfirmation, { type SellConfirmationOrder } from './screens/CryptoSellConfirmation'
import CryptoSellSuccess from './screens/CryptoSellSuccess'
import CryptoHistory from './screens/CryptoHistory'
import CryptoWalletAddress from './screens/CryptoWalletAddress'
import CryptoDeposit from './screens/CryptoDeposit'
import CryptoWithdraw from './screens/CryptoWithdraw'
import Goals from './screens/Goals'
import CreateGoal from './screens/CreateGoal'
import GoalDetail from './screens/GoalDetail'
import EditGoal from './screens/EditGoal'
import DeleteGoal from './screens/DeleteGoal'
import GoalCelebration from './screens/GoalCelebration'
import AutoSave from './screens/AutoSave'
import AutoSaveHistory from './screens/AutoSaveHistory'
import { type Goal } from '@/data/goals'
import FinaChat from './screens/FinaChat'
import ChatHistory from './screens/ChatHistory'
import SavedResponses from './screens/SavedResponses'
import AIMemory from './screens/AIMemory'
import AIPrivacy from './screens/AIPrivacy'
import VoiceMode from './screens/VoiceMode'
import AinaVoiceMode from './screens/AinaVoiceMode'
import SystemUpdate from './screens/SystemUpdate'
import FinancialReport from './screens/FinancialReport'
import SuggestedBudget from './screens/SuggestedBudget'
import SpendingInsights from './screens/SpendingInsights'
import SubscriptionReview from './screens/SubscriptionReview'
import GoalPlanner from './screens/GoalPlanner'
import AISettings from './screens/AISettings'
import ComparePlans from './screens/ComparePlans'
import Checkout from './screens/Checkout'
import Upgrade from './screens/Upgrade'
import Downgrade from './screens/Downgrade'
import BillingHistory from './screens/BillingHistory'
import InvoiceDownload from './screens/InvoiceDownload'
import Statements from './screens/Statements'
import TaxDocuments from './screens/TaxDocuments'
import Help from './screens/Help'
import Support from './screens/Support'
import DeleteAccount from './screens/DeleteAccount'
import DeleteConfirmation from './screens/DeleteConfirmation'
import LogoutConfirm from './screens/LogoutConfirm'
import LogoutSuccess from './screens/LogoutSuccess'
import Profile from './screens/Profile'
import PersonalInformation from './screens/PersonalInformation'
import Security from './screens/Security'
import Devices from './screens/Devices'
import NotificationPreferences from './screens/NotificationPreferences'
import Language from './screens/Language'
import InviteFriends from './screens/InviteFriends'
import ChangeCircle from './screens/ChangeCircle'
import CircleMomentum from './screens/CircleMomentum'
import MilestoneUnlocks from './screens/MilestoneUnlocks'
import MilestoneReveal from './screens/MilestoneReveal'
import ChangeVault from './screens/ChangeVault'
import MilestoneSurprise from './screens/MilestoneSurprise'
import ReferralTerms from './screens/ReferralTerms'
import ChangeImpactSummary from './screens/ChangeImpactSummary'
import Leaderboard from './screens/Leaderboard'
import SavingsLeaderboard from './screens/SavingsLeaderboard'
import MonthlyRankings from './screens/MonthlyRankings'
import AchievementBadges from './screens/AchievementBadges'
import CommunityChallenges from './screens/CommunityChallenges'
import SavingsMilestones from './screens/SavingsMilestones'
import SupportDevelopment from './screens/SupportDevelopment'
import KYBIntro from './screens/KYBIntro'
import KYBBusinessDetails, { type BusinessDetailsData } from './screens/KYBBusinessDetails'
import KYBAddress, { type KYBAddressData } from './screens/KYBAddress'
import KYBStakeholders, { type Stakeholder } from './screens/KYBStakeholders'
import KYBDocuments from './screens/KYBDocuments'
import KYBPending from './screens/KYBPending'
import KYBSuccess from './screens/KYBSuccess'
import KYBFailed from './screens/KYBFailed'
import MerchantHome from './screens/MerchantHome'
import MerchantNotifications from './screens/MerchantNotifications'
import MerchantPaymentsHub from './screens/MerchantPaymentsHub'
import Invoice from './screens/Invoice'
import MerchantQR from './screens/MerchantQR'
import Payout from './screens/Payout'
import MerchantTransactionHistory from './screens/MerchantTransactionHistory'
import BusinessHealth from './screens/BusinessHealth'
import RevenueOverview from './screens/RevenueOverview'
import CustomerInsights from './screens/CustomerInsights'
import CashFlow from './screens/CashFlow'
import AinaChat from './screens/AinaChat'
import RevenueReport from './screens/RevenueReport'
import BusinessInsights from './screens/BusinessInsights'
import MerchantProfile from './screens/MerchantProfile'
import TeamMembers from './screens/TeamMembers'
import Roles from './screens/Roles'
import MerchantSecurity from './screens/MerchantSecurity'
import MerchantSettings from './screens/MerchantSettings'
import MerchantDeleteAccount from './screens/MerchantDeleteAccount'
import MerchantDeleteConfirmation from './screens/MerchantDeleteConfirmation'
import MerchantLogout from './screens/MerchantLogout'
import MerchantPlans from './screens/MerchantPlans'
import MerchantComparePlans from './screens/MerchantComparePlans'
import MerchantCheckout from './screens/MerchantCheckout'
import MerchantUpgrade from './screens/MerchantUpgrade'
import MerchantDowngrade from './screens/MerchantDowngrade'
import MerchantBilling from './screens/MerchantBilling'
import EnterpriseContact from './screens/EnterpriseContact'
import { type TierName } from '@/data/merchantTiers'
import UniversalBroadcast from './screens/UniversalBroadcast'
import UpdateDetail from './screens/UpdateDetail'
import PromotionalCampaign from './screens/PromotionalCampaign'
import EmergencyNotice from './screens/EmergencyNotice'
import AMLReview from './screens/AMLReview'
import SourceOfFunds from './screens/SourceOfFunds'
import AdditionalVerification from './screens/AdditionalVerification'
import ComplianceInReview from './screens/ComplianceInReview'
import ComplianceResubmitted from './screens/ComplianceResubmitted'
import ComplianceApproved from './screens/ComplianceApproved'
import ComplianceRejected from './screens/ComplianceRejected'
import HelpCenter from './screens/HelpCenter'
import FAQ from './screens/FAQ'
import ContactSupport from './screens/ContactSupport'
import LiveChat from './screens/LiveChat'
import SubmitTicket from './screens/SubmitTicket'
import TicketDetail from './screens/TicketDetail'
import TicketResolved from './screens/TicketResolved'
import Feedback from './screens/Feedback'
import LanguageSelection from './screens/LanguageSelection'
import CurrencySelection from './screens/CurrencySelection'
import RegionalSettings from './screens/RegionalSettings'
import TimeZone from './screens/TimeZone'
import EmptyTransactions from './screens/EmptyTransactions'
import EmptyNotifications from './screens/EmptyNotifications'
import EmptyGoals from './screens/EmptyGoals'
import EmptyAI from './screens/EmptyAI'
import EmptyFeatures from './screens/EmptyFeatures'
import NoSearchResults from './screens/NoSearchResults'
import GenericError from './screens/GenericError'
import NotFound from './screens/NotFound'
import RetryLoading from './screens/RetryLoading'
import SomethingWentWrong from './screens/SomethingWentWrong'
import SuccessAnimationLibrary from './screens/SuccessAnimationLibrary'
import LogoutSuccessPolished from './screens/LogoutSuccessPolished'
import AccountDeleted from './screens/AccountDeleted'
import MaintenanceComplete from './screens/MaintenanceComplete'
import SecurityAlert from './screens/SecurityAlert'
import WelcomeBackExtended from './screens/WelcomeBackExtended'
import AppReviewRequest from './screens/AppReviewRequest'
import RateApp from './screens/RateApp'
import LightCardComingSoon from './screens/LightCardComingSoon'
import LightVaultComingSoon from './screens/LightVaultComingSoon'
import RealCostConsumer from './screens/RealCostConsumer'
import RealCostMerchant from './screens/RealCostMerchant'
import RemittanceCost from './screens/RemittanceCost'
import PayBillsHub, { type Biller } from './screens/PayBillsHub'
import PayBillsAccount from './screens/PayBillsAccount'
import PayBillsAmount from './screens/PayBillsAmount'
import PayBillsConfirmation from './screens/PayBillsConfirmation'
import ReceiveNano from './screens/ReceiveNano'
import SendNanoExternal from './screens/SendNanoExternal'
import ExportNanoWallet from './screens/ExportNanoWallet'
import NanoNetworkTransparency from './screens/NanoNetworkTransparency'
import QuickActionToolbar from './components/QuickActionToolbar'
import IntentCapture, { type UserIntent } from './screens/IntentCapture'
import InstDashboard from './screens/inst/InstDashboard'
import InstOverview from './screens/inst/InstOverview'
import InstTradeDetail from './screens/inst/InstTradeDetail'
import InstMonitor from './screens/inst/InstMonitor'
import InstExceptions from './screens/inst/InstExceptions'
import InstHistory from './screens/inst/InstHistory'
import InstCounterparty from './screens/inst/InstCounterparty'
import InstRisk from './screens/inst/InstRisk'
import InstTimeline from './screens/inst/InstTimeline'
import InstConfirmation from './screens/inst/InstConfirmation'
import PaymentLinksHub from './screens/PaymentLinksHub'
import CreatePaymentLink from './screens/CreatePaymentLink'
import PaymentLinkDetail from './screens/PaymentLinkDetail'
import PayoutSettings from './screens/PayoutSettings'
import RiskFraudCenter from './screens/RiskFraudCenter'
import FlaggedTransactionDetail from './screens/FlaggedTransactionDetail'
import FileDispute from './screens/FileDispute'
import RespondToDispute from './screens/RespondToDispute'
import DisputeStatus from './screens/DisputeStatus'
import DeveloperSettings from './screens/DeveloperSettings'
import MerchantStatements from './screens/MerchantStatements'
import RecurringBillingHub from './screens/RecurringBillingHub'
import CreateBillingPlan from './screens/CreateBillingPlan'
import BillingPlanDetail from './screens/BillingPlanDetail'
import MyCapSubscriptions from './screens/MyCapSubscriptions'

type Screen =
  | 'splash' | 'welcome'
  | 'appUpdate' | 'maintenance' | 'noInternet' | 'serverError'
  | 'permissions' | 'accountType' | 'intentCapture' | 'createAccount' | 'underageGate'
  | 'otpVerification' | 'accountCreated'
  | 'setPIN' | 'enableBiometrics' | 'enable2FA'
  | 'login' | 'forgotPassword' | 'resetPassword' | 'passwordResetSuccess'
  | 'loadingGateway' | 'welcomeBack' | 'whatsNew'
  | 'sessionExpired' | 'newDeviceVerification' | 'suspiciousLogin' | 'pinLockout'
  | 'kycIntro' | 'kycPersonalDetails' | 'kycBiometricConsent' | 'kycIDSelection'
  | 'kycIDCapture' | 'kycLiveness' | 'kycReview' | 'kycPending'
  | 'kycSuccess' | 'kycFailed' | 'kycNeedsInfo' | 'kycAttemptLimit'
  | 'home' | 'walletDetail' | 'notifications' | 'notificationDetail'
  | 'verificationGate' | 'transactionLimitReached' | 'search' | 'subscriptionPlans'
  | 'searchResults' | 'spendingInsightsPreview' | 'aiSuggestionsWidget'
  | 'quickActions' | 'dashboardCustomization' | 'refreshState'
  | 'paymentsHub' | 'sendMethod' | 'contactPicker' | 'sendAmount'
  | 'sendConfirmation' | 'sendSuccess' | 'sendFailed' | 'sendPending' | 'receive'
  | 'qrHub' | 'scanQR' | 'invalidQR' | 'expiredQR'
  | 'splitPayment' | 'splitSuccess' | 'paymentNote'
  | 'refundRequest' | 'refundResult'
  | 'bankSelection' | 'linkBank' | 'verificationPending' | 'verificationFailed'
  | 'connectionError' | 'linkedSuccess' | 'linkedBankDetail'
  | 'addMoney' | 'withdraw' | 'removeBank'
  | 'transactionHistory' | 'transactionDetail' | 'receipt' | 'shareReceipt'
  | 'export' | 'transactionSearch' | 'filters' | 'recurring' | 'scheduled' | 'cancelScheduled'
  | 'cryptoHome' | 'cryptoBuy' | 'cryptoProviderComparison' | 'cryptoReview' | 'cryptoProcessing' | 'cryptoSuccess'
  | 'cryptoSell' | 'cryptoSellConfirmation' | 'cryptoSellSuccess'
  | 'cryptoHistory' | 'cryptoWalletAddress' | 'cryptoDeposit' | 'cryptoWithdraw'
  | 'goals' | 'createGoal' | 'goalDetail' | 'editGoal' | 'deleteGoal'
  | 'goalCelebration' | 'autoSave' | 'autoSaveHistory'
  | 'finaChat' | 'chatHistory' | 'savedResponses' | 'aiMemory' | 'aiPrivacy' | 'voiceMode'
  | 'financialReport' | 'suggestedBudget' | 'spendingInsights'
  | 'subscriptionReview' | 'goalPlanner' | 'aiSettings'
  | 'comparePlans' | 'checkout' | 'upgrade' | 'downgrade'
  | 'billingHistory' | 'invoiceDownload'
  | 'statements' | 'taxDocuments' | 'help' | 'support'
  | 'deleteAccount' | 'deleteConfirmation'
  | 'logoutConfirm' | 'logoutSuccess'
  | 'profile' | 'personalInformation' | 'security' | 'devices'
  | 'notificationPreferences' | 'language'
  | 'inviteFriends' | 'changeCircle' | 'circleMomentum' | 'milestoneUnlocks'
  | 'milestoneReveal' | 'changeVault' | 'milestoneSurprise' | 'referralTerms'
  | 'changeImpactSummary' | 'leaderboard'
  | 'savingsLeaderboard' | 'monthlyRankings' | 'achievementBadges'
  | 'communityChallenges' | 'savingsMilestones' | 'supportDevelopment'
  | 'kybIntro' | 'kybBusinessDetails' | 'kybAddress' | 'kybStakeholders'
  | 'kybDocuments' | 'kybPending' | 'kybSuccess' | 'kybFailed'
  | 'merchantHome' | 'merchantNotifications' | 'merchantPaymentsHub'
  | 'invoice' | 'merchantQR' | 'payout'
  | 'merchantTransactionHistory' | 'businessHealth' | 'revenueOverview'
  | 'customerInsights' | 'cashFlow'
  | 'ainaChat' | 'ainaVoiceMode' | 'revenueReport' | 'businessInsights' | 'systemUpdate'
  | 'paymentLinksHub' | 'createPaymentLink' | 'paymentLinkDetail'
  | 'payoutSettings' | 'riskFraudCenter' | 'flaggedTransactionDetail'
  | 'fileDispute' | 'respondToDispute' | 'disputeStatus'
  | 'developerSettings' | 'merchantStatements'
  | 'recurringBillingHub' | 'createBillingPlan' | 'billingPlanDetail'
  | 'myCapSubscriptions'
  | 'merchantProfile' | 'teamMembers' | 'roles'
  | 'merchantSecurity' | 'merchantSettings'
  | 'merchantDeleteAccount' | 'merchantDeleteConfirmation' | 'merchantLogout'
  | 'merchantPlans' | 'merchantComparePlans' | 'merchantCheckout'
  | 'merchantUpgrade' | 'merchantDowngrade' | 'merchantBilling'
  | 'enterpriseContact'
  | 'universalBroadcast' | 'updateDetail' | 'promotionalCampaign' | 'emergencyNotice'
  | 'amlReview' | 'sourceOfFunds' | 'additionalVerification'
  | 'complianceInReview' | 'complianceResubmitted' | 'complianceApproved' | 'complianceRejected'
  | 'helpCenter' | 'faq' | 'contactSupport' | 'liveChat'
  | 'submitTicket' | 'ticketDetail' | 'ticketResolved' | 'feedback'
  | 'successAnimationLibrary'
  | 'logoutSuccessPolished' | 'accountDeleted' | 'maintenanceComplete'
  | 'securityAlert' | 'welcomeBackExtended'
  | 'appReviewRequest' | 'rateApp'
  | 'lightCardComingSoon' | 'lightVaultComingSoon'
  | 'realCostConsumer' | 'realCostMerchant' | 'remittanceCost'
  | 'payBillsHub' | 'payBillsAccount' | 'payBillsAmount' | 'payBillsConfirmation'
  | 'receiveNano' | 'sendNanoExternal' | 'exportNanoWallet' | 'nanoNetworkTransparency'
  | 'languageSelection' | 'currencySelection' | 'regionalSettings' | 'timeZone'
  | 'emptyTransactions' | 'emptyNotifications' | 'emptyGoals' | 'emptyAI' | 'emptyFeatures'
  | 'noSearchResults' | 'genericError' | 'notFound' | 'retryLoading' | 'somethingWentWrong'
  | 'instDashboard' | 'instOverview' | 'instTradeDetail' | 'instMonitor' | 'instExceptions'
  | 'instHistory' | 'instCounterparty' | 'instRisk' | 'instTimeline' | 'instConfirmation'

const NAV_ITEMS: { id: Screen; label: string; group: string }[] = [
  { id: 'splash',               label: '01 Splash',               group: 'System' },
  { id: 'welcome',              label: '06 Welcome',              group: 'System' },
  { id: 'appUpdate',            label: '02 App Update',           group: 'System' },
  { id: 'maintenance',          label: '03 Maintenance',          group: 'System' },
  { id: 'noInternet',           label: '04 No Internet',          group: 'System' },
  { id: 'serverError',          label: '05 Server Error',         group: 'System' },
  { id: 'loadingGateway',       label: '19 Loading Gateway',      group: 'Session' },
  { id: 'welcomeBack',          label: '20 Welcome Back',         group: 'Session' },
  { id: 'whatsNew',             label: '21 What\'s New',          group: 'Session' },
  { id: 'sessionExpired',       label: '22 Session Expired',      group: 'Session' },
  { id: 'newDeviceVerification',label: '23 New Device',           group: 'Session' },
  { id: 'suspiciousLogin',      label: '24 Suspicious Login',     group: 'Session' },
  { id: 'pinLockout',           label: '25 PIN Lockout',          group: 'Session' },
  { id: 'kycIntro',            label: '26 KYC Intro',            group: 'KYC' },
  { id: 'kycPersonalDetails',  label: '27 Personal Details',     group: 'KYC' },
  { id: 'kycIDSelection',      label: '28 ID Selection',         group: 'KYC' },
  { id: 'kycIDCapture',        label: '29 ID Capture',           group: 'KYC' },
  { id: 'kycLiveness',         label: '30 Liveness',             group: 'KYC' },
  { id: 'kycReview',           label: '31 Review',               group: 'KYC' },
  { id: 'kycPending',          label: '32 Pending',              group: 'KYC' },
  { id: 'kycSuccess',          label: '33 KYC Success',          group: 'KYC' },
  { id: 'kycFailed',           label: '34 KYC Failed',           group: 'KYC' },
  { id: 'kycBiometricConsent', label: '35 Biometric Consent',    group: 'KYC' },
  { id: 'kycNeedsInfo',        label: '36 Needs Info',           group: 'KYC' },
  { id: 'kycAttemptLimit',     label: '37 Attempt Limit',        group: 'KYC' },
  { id: 'home',                 label: '38 Home',                 group: 'App' },
  { id: 'walletDetail',         label: '39 Wallet Detail',        group: 'App' },
  { id: 'notifications',        label: '40 Notifications',        group: 'App' },
  { id: 'notificationDetail',   label: '41 Notif Detail',         group: 'App' },
  { id: 'verificationGate',     label: '42 Verification Gate',    group: 'App' },
  { id: 'transactionLimitReached', label: '43 Tx Limit Reached',  group: 'App' },
  { id: 'search',               label: '44 Search',               group: 'App' },
  { id: 'subscriptionPlans',    label: '45 Subscription Plans',   group: 'App' },
  { id: 'searchResults',        label: '46 Search Results',        group: 'App' },
  { id: 'spendingInsightsPreview', label: '47 Spending Insights',  group: 'App' },
  { id: 'aiSuggestionsWidget',  label: '48 AI Suggestions',        group: 'App' },
  { id: 'quickActions',         label: '49 Quick Actions',         group: 'App' },
  { id: 'dashboardCustomization', label: '50 Dashboard Custom.',   group: 'App' },
  { id: 'refreshState',         label: '51 Refresh State',         group: 'App' },
  { id: 'paymentsHub',          label: '52 Payments Hub',          group: 'App' },
  { id: 'sendMethod',           label: '53 Send Method',           group: 'App' },
  { id: 'contactPicker',        label: '54 Contact Picker',        group: 'App' },
  { id: 'sendAmount',           label: '55 Send Amount',           group: 'App' },
  { id: 'sendConfirmation',     label: '56 Send Confirmation',     group: 'App' },
  { id: 'sendSuccess',          label: '57 Send Success',          group: 'App' },
  { id: 'sendFailed',           label: '58 Send Failed',           group: 'App' },
  { id: 'sendPending',          label: '59 Send Pending',          group: 'App' },
  { id: 'receive',              label: '60 Receive',               group: 'App' },
  { id: 'qrHub',               label: '61 QR Hub',                group: 'App' },
  { id: 'scanQR',              label: '62 Scan QR',               group: 'App' },
  { id: 'invalidQR',           label: '63 Invalid QR',            group: 'App' },
  { id: 'expiredQR',           label: '64 Expired QR',            group: 'App' },
  { id: 'splitPayment',        label: '65 Split Payment',         group: 'App' },
  { id: 'splitSuccess',        label: '66 Split Success',         group: 'App' },
  { id: 'paymentNote',         label: '67 Payment Note',          group: 'App' },
  { id: 'refundRequest',       label: '68 Refund Request',        group: 'App' },
  { id: 'refundResult',        label: '69 Refund Result',         group: 'App' },
  { id: 'bankSelection',       label: '70 Bank Selection',        group: 'App' },
  { id: 'linkBank',            label: '71 Link Bank',             group: 'App' },
  { id: 'verificationPending', label: '72 Verification Pending',  group: 'App' },
  { id: 'verificationFailed',  label: '73 Verification Failed',   group: 'App' },
  { id: 'connectionError',     label: '74 Connection Error',      group: 'App' },
  { id: 'linkedSuccess',       label: '75 Linked Success',        group: 'App' },
  { id: 'linkedBankDetail',    label: '76 Linked Bank Detail',    group: 'App' },
  { id: 'addMoney',            label: '77 Add Money',             group: 'App' },
  { id: 'withdraw',            label: '78 Withdraw',              group: 'App' },
  { id: 'removeBank',          label: '79 Remove Bank',           group: 'App' },
  { id: 'transactionHistory', label: '80 Tx History',            group: 'App' },
  { id: 'transactionDetail',  label: '81 Tx Detail',             group: 'App' },
  { id: 'receipt',            label: '82 Receipt',               group: 'App' },
  { id: 'shareReceipt',       label: '83 Share Receipt',         group: 'App' },
  { id: 'export',             label: '84 Export',                group: 'App' },
  { id: 'transactionSearch',  label: '85 Tx Search',             group: 'App' },
  { id: 'filters',            label: '86 Filters',               group: 'App' },
  { id: 'recurring',          label: '87 Recurring',             group: 'App' },
  { id: 'scheduled',          label: '88 Scheduled',             group: 'App' },
  { id: 'cancelScheduled',    label: '89 Cancel Scheduled',      group: 'App' },
  { id: 'cryptoHome',              label: '90 Crypto Home',           group: 'App' },
  { id: 'cryptoBuy',               label: '91 Buy Crypto',            group: 'App' },
  { id: 'cryptoProviderComparison',label: '92 Provider Comparison',   group: 'App' },
  { id: 'cryptoReview',            label: '93 Review Order',          group: 'App' },
  { id: 'cryptoProcessing',        label: '94 Processing',            group: 'App' },
  { id: 'cryptoSuccess',           label: '95 Buy Success',           group: 'App' },
  { id: 'cryptoSell',             label: '96 Sell Crypto',           group: 'App' },
  { id: 'cryptoSellConfirmation', label: '97 Sell Confirmation',     group: 'App' },
  { id: 'cryptoSellSuccess',      label: '98 Sell Success',          group: 'App' },
  { id: 'cryptoHistory',          label: '99 Crypto History',        group: 'App' },
  { id: 'cryptoWalletAddress',    label: '100 Wallet Address',       group: 'App' },
  { id: 'cryptoDeposit',          label: '101 Deposit',              group: 'App' },
  { id: 'cryptoWithdraw',         label: '102 Withdraw',             group: 'App' },
  { id: 'goals',               label: '103 Goals',                group: 'App' },
  { id: 'createGoal',          label: '104 Create Goal',          group: 'App' },
  { id: 'goalDetail',          label: '105 Goal Detail',          group: 'App' },
  { id: 'editGoal',            label: '106 Edit Goal',            group: 'App' },
  { id: 'deleteGoal',          label: '107 Delete Goal',          group: 'App' },
  { id: 'goalCelebration',     label: '108 Goal Celebration',     group: 'App' },
  { id: 'autoSave',            label: '109 Auto Save',            group: 'App' },
  { id: 'autoSaveHistory',     label: '110 Auto Save History',    group: 'App' },
  { id: 'finaChat',            label: '111 Fina Chat',            group: 'App' },
  { id: 'chatHistory',         label: '112 Chat History',         group: 'App' },
  { id: 'savedResponses',      label: '113 Saved Responses',      group: 'App' },
  { id: 'aiMemory',            label: '114 AI Memory',            group: 'App' },
  { id: 'aiPrivacy',           label: '115 AI Privacy',           group: 'App' },
  { id: 'voiceMode',           label: '116 Voice Mode',           group: 'App' },
  { id: 'systemUpdate',        label: '116b System Update',       group: 'App' },
  { id: 'financialReport',     label: '117 Financial Report',     group: 'App' },
  { id: 'suggestedBudget',     label: '118 Suggested Budget',     group: 'App' },
  { id: 'spendingInsights',    label: '119 Spending Insights',    group: 'App' },
  { id: 'subscriptionReview',  label: '120 Subscription Review',  group: 'App' },
  { id: 'goalPlanner',         label: '121 Goal Planner',         group: 'App' },
  { id: 'aiSettings',          label: '122 AI Settings',          group: 'App' },
  { id: 'comparePlans',        label: '137 Compare Plans',        group: 'App' },
  { id: 'checkout',            label: '138 Checkout',             group: 'App' },
  { id: 'upgrade',             label: '139 Upgrade',              group: 'App' },
  { id: 'downgrade',           label: '140 Downgrade',            group: 'App' },
  { id: 'billingHistory',      label: '141 Billing History',      group: 'App' },
  { id: 'invoiceDownload',     label: '142 Invoice Download',     group: 'App' },
  { id: 'statements',          label: '129 Statements',           group: 'App' },
  { id: 'taxDocuments',        label: '130 Tax Documents',        group: 'App' },
  { id: 'help',                label: '131 Help',                 group: 'App' },
  { id: 'support',             label: '132 Support',              group: 'App' },
  { id: 'deleteAccount',       label: '133 Delete Account',       group: 'App' },
  { id: 'deleteConfirmation',  label: '134 Delete Confirmation',  group: 'App' },
  { id: 'logoutConfirm',       label: '135 Logout Confirm',       group: 'App' },
  { id: 'logoutSuccess',       label: '136 Logout Success',       group: 'App' },
  { id: 'profile',             label: '123 Profile',              group: 'App' },
  { id: 'personalInformation', label: '124 Personal Information', group: 'App' },
  { id: 'security',            label: '125 Security',             group: 'App' },
  { id: 'devices',             label: '126 Devices',              group: 'App' },
  { id: 'notificationPreferences', label: '127 Notifications',    group: 'App' },
  { id: 'language',            label: '128 Language',             group: 'App' },
  { id: 'inviteFriends',       label: '143 Invite Friends',       group: 'App' },
  { id: 'changeCircle',        label: '144 Change Circle',        group: 'App' },
  { id: 'circleMomentum',      label: '145 Circle Momentum',      group: 'App' },
  { id: 'milestoneUnlocks',    label: '146 Milestone Unlocks',    group: 'App' },
  { id: 'milestoneReveal',     label: '147 Milestone Reveal',     group: 'App' },
  { id: 'changeVault',         label: '148 Change Vault',         group: 'App' },
  { id: 'milestoneSurprise',   label: '149 Milestone Surprise',   group: 'App' },
  { id: 'referralTerms',       label: '150 Referral Terms',       group: 'App' },
  { id: 'changeImpactSummary', label: '151 Change Impact',        group: 'App' },
  { id: 'leaderboard',         label: '152 Leaderboard',          group: 'App' },
  { id: 'savingsLeaderboard',  label: '153 Savings Leaderboard',  group: 'App' },
  { id: 'monthlyRankings',     label: '154 Monthly Rankings',     group: 'App' },
  { id: 'achievementBadges',   label: '155 Achievement Badges',   group: 'App' },
  { id: 'communityChallenges', label: '156 Community Challenges', group: 'App' },
  { id: 'savingsMilestones',   label: '157 Savings Milestones',   group: 'App' },
  { id: 'supportDevelopment',  label: '158 Support Development',  group: 'App' },
  { id: 'kybIntro',            label: '159 KYB Intro',            group: 'App' },
  { id: 'kybBusinessDetails',  label: '160 Business Details',     group: 'App' },
  { id: 'kybAddress',          label: '161 Address',              group: 'App' },
  { id: 'kybStakeholders',     label: '162 Stakeholders',         group: 'App' },
  { id: 'kybDocuments',        label: '163 Documents',            group: 'App' },
  { id: 'kybPending',          label: '164 KYB Pending',          group: 'App' },
  { id: 'kybSuccess',          label: '165 KYB Success',          group: 'App' },
  { id: 'kybFailed',           label: '166 KYB Failed',           group: 'App' },
  { id: 'merchantHome',        label: '167 Merchant Home',        group: 'Merchant' },
  { id: 'merchantNotifications', label: '168 Merchant Notifs',    group: 'Merchant' },
  { id: 'merchantPaymentsHub', label: '169 Merchant Payments',    group: 'Merchant' },
  { id: 'invoice',             label: '170 Invoice',              group: 'Merchant' },
  { id: 'merchantQR',          label: '171 QR Code',              group: 'Merchant' },
  { id: 'payout',              label: '172 Payout',               group: 'Merchant' },
  { id: 'merchantTransactionHistory', label: '173 Merchant Tx History', group: 'Merchant' },
  { id: 'businessHealth',      label: '174 Business Health',      group: 'Merchant' },
  { id: 'revenueOverview',     label: '175 Revenue Overview',     group: 'Merchant' },
  { id: 'customerInsights',    label: '176 Customer Insights',    group: 'Merchant' },
  { id: 'cashFlow',            label: '177 Cash Flow',            group: 'Merchant' },
  { id: 'ainaChat',           label: '178 Aina Chat',            group: 'Merchant' },
  { id: 'ainaVoiceMode',      label: '178b Aina Voice Mode',     group: 'Merchant' },
  { id: 'revenueReport',      label: '179 Revenue Report',       group: 'Merchant' },
  { id: 'businessInsights',   label: '180 Business Insights',    group: 'Merchant' },
  { id: 'merchantProfile',    label: '181 Merchant Profile',     group: 'Merchant' },
  { id: 'teamMembers',        label: '182 Team Members',         group: 'Merchant' },
  { id: 'roles',              label: '183 Roles',                group: 'Merchant' },
  { id: 'merchantSecurity',   label: '184 Merchant Security',    group: 'Merchant' },
  { id: 'merchantSettings',   label: '185 Merchant Settings',    group: 'Merchant' },
  { id: 'paymentLinksHub',      label: '186a Payment Links Hub',   group: 'Merchant' },
  { id: 'createPaymentLink',    label: '186b Create Payment Link', group: 'Merchant' },
  { id: 'paymentLinkDetail',    label: '186c Payment Link Detail', group: 'Merchant' },
  { id: 'payoutSettings',       label: '186d Payout Settings',     group: 'Merchant' },
  { id: 'riskFraudCenter',      label: '186e Risk & Fraud Center', group: 'Merchant' },
  { id: 'flaggedTransactionDetail', label: '186f Flagged Tx Detail', group: 'Merchant' },
  { id: 'respondToDispute',     label: '186g Respond to Dispute',  group: 'Merchant' },
  { id: 'developerSettings',    label: '186h Developer Settings',  group: 'Merchant' },
  { id: 'merchantStatements',   label: '186i Merchant Statements', group: 'Merchant' },
  { id: 'recurringBillingHub',  label: '186j Recurring Billing',   group: 'Merchant' },
  { id: 'createBillingPlan',    label: '186k Create Billing Plan', group: 'Merchant' },
  { id: 'billingPlanDetail',    label: '186l Billing Plan Detail', group: 'Merchant' },
  { id: 'fileDispute',          label: '186m File Dispute',        group: 'App' },
  { id: 'disputeStatus',        label: '186n Dispute Status',      group: 'App' },
  { id: 'myCapSubscriptions',   label: '186o My Subscriptions',    group: 'App' },
  { id: 'merchantDeleteAccount', label: '186 Delete Account',    group: 'Merchant' },
  { id: 'merchantDeleteConfirmation', label: '187 Delete Confirm', group: 'Merchant' },
  { id: 'merchantLogout',     label: '188 Merchant Logout',      group: 'Merchant' },
  { id: 'merchantPlans',      label: '189 Plans',                group: 'Merchant' },
  { id: 'merchantComparePlans', label: '190 Compare Plans',      group: 'Merchant' },
  { id: 'merchantCheckout',   label: '191 Checkout',             group: 'Merchant' },
  { id: 'merchantUpgrade',    label: '192 Upgrade',              group: 'Merchant' },
  { id: 'merchantDowngrade',  label: '193 Downgrade',            group: 'Merchant' },
  { id: 'merchantBilling',    label: '194 Billing',              group: 'Merchant' },
  { id: 'enterpriseContact',  label: '195 Enterprise Contact',   group: 'Merchant' },
  { id: 'instDashboard',      label: 'Inst Dashboard',           group: 'Enterprise' },
  { id: 'instOverview',       label: 'Inst Overview',            group: 'Enterprise' },
  { id: 'instTradeDetail',    label: 'Inst Trade Detail',        group: 'Enterprise' },
  { id: 'instMonitor',        label: 'Inst Monitor',             group: 'Enterprise' },
  { id: 'instExceptions',     label: 'Inst Exceptions',          group: 'Enterprise' },
  { id: 'instHistory',        label: 'Inst History',             group: 'Enterprise' },
  { id: 'instCounterparty',   label: 'Inst Counterparty',        group: 'Enterprise' },
  { id: 'instRisk',           label: 'Inst Risk & AI',           group: 'Enterprise' },
  { id: 'instTimeline',       label: 'Inst Timeline',            group: 'Enterprise' },
  { id: 'instConfirmation',   label: 'Inst Confirmation',        group: 'Enterprise' },
  { id: 'universalBroadcast', label: '204 Universal Broadcast',  group: 'System' },
  { id: 'updateDetail',       label: '205 Update Detail',        group: 'System' },
  { id: 'promotionalCampaign', label: '206 Promotional Campaign', group: 'System' },
  { id: 'emergencyNotice',    label: '207 Emergency Notice',     group: 'System' },
  { id: 'amlReview',           label: '216 AML Review',           group: 'System' },
  { id: 'sourceOfFunds',      label: '217 Source of Funds',      group: 'System' },
  { id: 'additionalVerification', label: '218 Additional Verif.', group: 'System' },
  { id: 'complianceInReview', label: '219 In Review',            group: 'System' },
  { id: 'complianceResubmitted', label: '220 Resubmitted',       group: 'System' },
  { id: 'complianceApproved', label: '221 Approved',             group: 'System' },
  { id: 'complianceRejected', label: '222 Rejected',             group: 'System' },
  { id: 'helpCenter',         label: '208 Help Center',          group: 'System' },
  { id: 'faq',                label: '209 FAQ',                  group: 'System' },
  { id: 'contactSupport',     label: '210 Contact Support',      group: 'System' },
  { id: 'liveChat',           label: '211 Live Chat',            group: 'System' },
  { id: 'submitTicket',       label: '212 Submit Ticket',        group: 'System' },
  { id: 'ticketDetail',       label: '213 Ticket Detail',        group: 'System' },
  { id: 'ticketResolved',     label: '214 Ticket Resolved',      group: 'System' },
  { id: 'feedback',           label: '215 Feedback',             group: 'System' },
  { id: 'successAnimationLibrary', label: '237 Success Library',      group: 'System' },
  { id: 'logoutSuccessPolished',   label: '238 Logout Success',       group: 'System' },
  { id: 'accountDeleted',          label: '239 Account Deleted',      group: 'System' },
  { id: 'maintenanceComplete',     label: '240 Maintenance Complete', group: 'System' },
  { id: 'securityAlert',           label: '241 Security Alert',       group: 'System' },
  { id: 'welcomeBackExtended',     label: '242 Welcome Back',         group: 'System' },
  { id: 'appReviewRequest',        label: '243 App Review Request',   group: 'System' },
  { id: 'rateApp',                 label: '244 Rate ChangeAIPay',     group: 'System' },
  { id: 'lightCardComingSoon',     label: '245 LightCard',            group: 'System' },
  { id: 'lightVaultComingSoon',    label: '246 LightVault',           group: 'System' },
  { id: 'realCostConsumer',        label: '247 Real Cost Consumer',   group: 'Onboarding' },
  { id: 'realCostMerchant',        label: '248 Real Cost Merchant',   group: 'Onboarding' },
  { id: 'remittanceCost',          label: '249 Remittance Cost',      group: 'Onboarding' },
  { id: 'payBillsHub',             label: 'Pay Bills Hub',            group: 'App' },
  { id: 'payBillsAccount',         label: 'Pay Bills Account',        group: 'App' },
  { id: 'payBillsAmount',          label: 'Pay Bills Amount',         group: 'App' },
  { id: 'payBillsConfirmation',    label: 'Pay Bills Confirm',        group: 'App' },
  { id: 'receiveNano',             label: '250 Receive NANO',         group: 'App' },
  { id: 'sendNanoExternal',        label: '251 Send NANO External',   group: 'App' },
  { id: 'exportNanoWallet',        label: '252 Export Nano Wallet',   group: 'App' },
  { id: 'nanoNetworkTransparency', label: '253 Nano Transparency',    group: 'App' },
  { id: 'languageSelection',  label: '233 Language Selection',   group: 'System' },
  { id: 'currencySelection',  label: '234 Currency Selection',   group: 'System' },
  { id: 'regionalSettings',   label: '235 Regional Settings',    group: 'System' },
  { id: 'timeZone',           label: '236 Time Zone',            group: 'System' },
  { id: 'emptyTransactions',  label: '223 Empty Transactions',   group: 'System' },
  { id: 'emptyNotifications', label: '224 Empty Notifications',  group: 'System' },
  { id: 'emptyGoals',         label: '225 Empty Goals',          group: 'System' },
  { id: 'emptyAI',            label: '226 Empty AI',             group: 'System' },
  { id: 'emptyFeatures',      label: '227 Empty Features',       group: 'System' },
  { id: 'noSearchResults',    label: '228 No Search Results',    group: 'System' },
  { id: 'genericError',       label: '229 Generic Error',        group: 'System' },
  { id: 'notFound',           label: '230 Not Found',            group: 'System' },
  { id: 'retryLoading',       label: '231 Retry Loading',        group: 'System' },
  { id: 'somethingWentWrong', label: '232 Something Went Wrong', group: 'System' },
  { id: 'permissions',          label: '07 Permissions',          group: 'Onboarding' },
  { id: 'accountType',          label: '08 Account Type',         group: 'Onboarding' },
  { id: 'intentCapture',        label: '08b Intent Capture',      group: 'Onboarding' },
  { id: 'createAccount',        label: '09 Create Account',       group: 'Onboarding' },
  { id: 'otpVerification',      label: '10 OTP Verify',           group: 'Onboarding' },
  { id: 'accountCreated',       label: '11 Account Created',      group: 'Onboarding' },
  { id: 'setPIN',               label: '12 Set PIN',              group: 'Security' },
  { id: 'enableBiometrics',     label: '13 Enable Biometrics',    group: 'Security' },
  { id: 'enable2FA',            label: '14 Enable 2FA',           group: 'Security' },
  { id: 'login',                label: '15 Login',                group: 'Auth' },
  { id: 'forgotPassword',       label: '16 Forgot Password',      group: 'Auth' },
  { id: 'resetPassword',        label: '17 Reset Password',       group: 'Auth' },
  { id: 'passwordResetSuccess', label: '18 Reset Success',        group: 'Auth' },
]

const GROUPS = ['App', 'Merchant', 'System', 'Session', 'KYC', 'Onboarding', 'Security', 'Auth']

export default function App() {
  const [current, setCurrent] = useState<Screen>('splash')
  const [showNav, setShowNav] = useState(false)
  const [accountType, setAccountType] = useState<'personal' | 'business'>('personal')
  const [userIntent, setUserIntent] = useState<UserIntent | null>(null)
  const [sendMethodBack, setSendMethodBack] = useState<Screen>('paymentsHub')
  const [userData, setUserData] = useState({ name: 'Maya Patel', email: 'maya@example.com', phone: '' })
  const [kycPersonal, setKycPersonal] = useState<PersonalData | null>(null)
  const [kycIDSel, setKycIDSel] = useState<IDSelectionData | null>(null)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [buyOrder, setBuyOrder] = useState<BuyOrder | null>(null)
  const [reviewOrder, setReviewOrder] = useState<ReviewOrder | null>(null)
  const [selectedProviderId, setSelectedProviderId] = useState<string>('liquidity-a')
  const [sellOrder, setSellOrder] = useState<SellOrder | null>(null)
  const [sellConfirmOrder, setSellConfirmOrder] = useState<SellConfirmationOrder | null>(null)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [recommendedPlan, setRecommendedPlan] = useState<'prime' | 'apex'>('prime')
  const [kybBusinessData, setKybBusinessData] = useState<BusinessDetailsData | null>(null)
  const [kybAddressData, setKybAddressData] = useState<KYBAddressData | null>(null)
  const [kybStakeholders, setKybStakeholders] = useState<Stakeholder[] | null>(null)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null)
  const [selectedMerchantTier, setSelectedMerchantTier] = useState<TierName>('Enterprise')
  const [instTradeId, setInstTradeId] = useState<string | undefined>(undefined)
  const [instCpId, setInstCpId] = useState<string | undefined>(undefined)
  const [selectedLinkId, setSelectedLinkId] = useState<string | undefined>(undefined)
  const [selectedFlagId, setSelectedFlagId] = useState<string | undefined>(undefined)
  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined)
  const [sendFlow, setSendFlow] = useState<{ amount: string; currency: string; note: string }>({ amount: '0.00', currency: 'USD', note: '' })
  const [billFlow, setBillFlow] = useState<{ biller: Biller | null; accountNumber: string; amount: string }>({ biller: null, accountNumber: '', amount: '0.00' })
  const [splitTotal, setSplitTotal] = useState<string>('120.00')

  const go = useCallback((screen: Screen) => {
    setCurrent(screen)
    setShowNav(false)
  }, [])

  const consumerNav = useCallback((tab: string) => {
    if (tab === 'home') go('home')
    else if (tab === 'payments') go('paymentsHub')
    else if (tab === 'subscription') go('subscriptionPlans')
    else if (tab === 'ai') go('finaChat')
    else if (tab === 'requests') go('feedback')
    else if (tab === 'history') go('transactionHistory')
    else if (tab === 'profile') go('profile')
  }, [go])

  const merchantNav = useCallback((item: string) => {
    if (item === 'home') go('merchantHome')
    else if (item === 'payments') go('merchantPaymentsHub')
    else if (item === 'ai') go('ainaChat')
    else if (item === 'plans') go('merchantPlans')
    else if (item === 'requests') go('feedback')
    else if (item === 'insights') go('businessHealth')
    else if (item === 'profile') go('merchantProfile')
  }, [go])

  const renderScreen = () => {
    switch (current) {
      case 'splash':
        return <Splash onComplete={() => go('welcome')} />

      case 'welcome':
        return (
          <Welcome
            onGoogle={() => go('accountType')}
            onApple={() => go('accountType')}
            onEmail={() => go('accountType')}
            onLogin={() => go('login')}
          />
        )

      case 'appUpdate':
        return (
          <AppUpdate
            onUpdate={() => go('welcome')}
            onExit={() => {}}
          />
        )

      case 'maintenance':
        return (
          <Maintenance
            onNotify={() => {}}
            onRetry={() => go('welcome')}
          />
        )

      case 'noInternet':
        return (
          <NoInternet
            onRetry={() => go('welcome')}
            onSettings={() => {}}
          />
        )

      case 'serverError':
        return (
          <ServerError
            onRetry={() => {}}
            onSupport={() => go('support')}
          />
        )

      case 'permissions':
        return (
          <Permissions
            onComplete={() => go('accountType')}
            onBack={() => go('welcome')}
          />
        )

      case 'realCostConsumer':
        return (
          <RealCostConsumer
            onContinue={() => go('remittanceCost')}
            onSkip={() => go('createAccount')}
            onBack={() => go('intentCapture')}
          />
        )

      case 'remittanceCost':
        return (
          <RemittanceCost
            onContinue={() => go('createAccount')}
            onSkip={() => go('createAccount')}
            onBack={() => go('realCostConsumer')}
          />
        )

      case 'receiveNano':
        return (
          <ReceiveNano
            onBack={() => go('walletDetail')}
          />
        )

      case 'sendNanoExternal':
        return (
          <SendNanoExternal
            onBack={() => go('walletDetail')}
            onDone={() => go('walletDetail')}
            onScanQR={() => go('scanQR')}
          />
        )

      case 'realCostMerchant':
        return (
          <RealCostMerchant
            onContinue={() => go('createAccount')}
            onSkip={() => go('createAccount')}
            onBack={() => go('intentCapture')}
          />
        )

      case 'accountType':
        return (
          <AccountType
            onSelect={type => {
              setAccountType(type)
              go('intentCapture')
            }}
            onBack={() => go('welcome')}
          />
        )

      case 'intentCapture':
        return (
          <IntentCapture
            onSelect={intent => {
              setUserIntent(intent)
              trackEvent('intent_captured', { intent })
              if (accountType === 'business') go('realCostMerchant')
              else go('realCostConsumer')
            }}
            onSkip={() => {
              if (accountType === 'business') go('realCostMerchant')
              else go('realCostConsumer')
            }}
            onBack={() => go('accountType')}
          />
        )

      case 'createAccount':
        return (
          <CreateAccount
            accountType={accountType}
            onSubmit={data => { setUserData(d => ({ ...d, ...data })); go('otpVerification') }}
            onUnderage={() => go('underageGate')}
            onBack={() => go('accountType')}
            onLogin={() => go('login')}
          />
        )

      case 'underageGate':
        return <UnderageGate onBack={() => go('createAccount')} />

      case 'otpVerification':
        return (
          <OTPVerification
            contact={userData.email || userData.phone}
            onVerified={() => go('accountCreated')}
            onBack={() => go('createAccount')}
          />
        )

      case 'accountCreated':
        trackEvent('account_created', { accountType })
        return (
          <AccountCreated
            name={userData.name}
            accountType={accountType}
            onContinue={() => go('setPIN')}
          />
        )

      case 'setPIN':
        return (
          <SetPIN
            onComplete={() => go('enableBiometrics')}
            onBack={() => go('accountCreated')}
            onSkip={() => go('enableBiometrics')}
          />
        )

      case 'enableBiometrics':
        return (
          <EnableBiometrics
            onEnable={() => go('enable2FA')}
            onSkip={() => go('enable2FA')}
            onBack={() => go('setPIN')}
          />
        )

      case 'enable2FA':
        return (
          <Enable2FA
            onEnable={() => go('home')}
            onSkip={() => go('home')}
            onBack={() => go('enableBiometrics')}
          />
        )

      case 'login':
        return (
          <Login
            onLogin={() => go('home')}
            onForgotPassword={() => go('forgotPassword')}
            onSignUp={() => go('permissions')}
            biometricEnabled={false}
          />
        )

      case 'forgotPassword':
        return (
          <ForgotPassword
            onSent={contact => { setUserData(d => ({ ...d, email: contact })); go('resetPassword') }}
            onBack={() => go('login')}
          />
        )

      case 'resetPassword':
        return (
          <ResetPassword
            onReset={() => go('passwordResetSuccess')}
            onBack={() => go('forgotPassword')}
          />
        )

      case 'passwordResetSuccess':
        return (
          <PasswordResetSuccess
            onLogin={() => go('login')}
          />
        )

      case 'loadingGateway':
        return (
          <LoadingGateway
            onAuthenticated={() => go('welcomeBack')}
            onExpired={() => go('sessionExpired')}
            onFirstTime={() => go('welcome')}
          />
        )

      case 'welcomeBack':
        return (
          <WelcomeBack
            name={userData.name}
            onComplete={() => go('home')}
          />
        )

      case 'whatsNew':
        return (
          <WhatsNew
            onContinue={() => go('home')}
            onSkip={() => go('home')}
          />
        )

      case 'sessionExpired':
        return (
          <SessionExpired
            onLogin={() => go('login')}
          />
        )

      case 'newDeviceVerification':
        return (
          <NewDeviceVerification
            deviceType="MacBook Pro"
            location="London, UK"
            onConfirm={() => go('welcome')}
            onDeny={() => go('resetPassword')}
            onBack={() => go('login')}
          />
        )

      case 'suspiciousLogin':
        return (
          <SuspiciousLogin
            activityType="a login from an unusual location"
            location="Lagos, Nigeria"
            onConfirm={() => go('welcome')}
            onSecure={() => go('resetPassword')}
          />
        )

      case 'pinLockout':
        return (
          <PINLockout
            failedAttempts={5}
            lockoutReason="pin"
            onPasswordLogin={() => go('login')}
            onRetry={() => go('setPIN')}
          />
        )

      case 'kycIntro':
        return (
          <KYCIntro
            onStart={() => go('kycPersonalDetails')}
            onBack={() => go('welcome')}
          />
        )

      case 'kycPersonalDetails':
        return (
          <KYCPersonalDetails
            onContinue={data => { setKycPersonal(data); go('kycBiometricConsent') }}
            onBack={() => go('kycIntro')}
            initial={kycPersonal ?? undefined}
          />
        )

      case 'kycBiometricConsent':
        return (
          <KYCBiometricConsent
            onAccept={() => go('kycIDSelection')}
            onDecline={() => go('kycIntro')}
            onBack={() => go('kycPersonalDetails')}
          />
        )

      case 'kycIDSelection':
        return (
          <KYCIDSelection
            onContinue={data => { setKycIDSel(data); go('kycIDCapture') }}
            onBack={() => go('kycPersonalDetails')}
          />
        )

      case 'kycIDCapture':
        return (
          <KYCIDCapture
            idType={kycIDSel?.idType ?? 'passport'}
            onComplete={() => go('kycLiveness')}
            onBack={() => go('kycIDSelection')}
            onLimitReached={() => go('kycAttemptLimit')}
          />
        )

      case 'kycLiveness':
        return (
          <KYCLiveness
            onComplete={() => go('kycReview')}
            onBack={() => go('kycIDCapture')}
            onLimitReached={() => go('kycAttemptLimit')}
            maxAttempts={3}
          />
        )

      case 'kycReview':
        return (
          <KYCReview
            personalData={kycPersonal ?? {
              fullName: 'Maya Patel', dob: '1992-06-15',
              addressLine1: '24 Baker Street', addressLine2: '',
              city: 'London', postcode: 'NW1 6XE', nationality: 'British',
            }}
            idSelection={kycIDSel ?? { country: 'United Kingdom', idType: 'passport' }}
            onSubmit={() => go('kycPending')}
            onEditPersonal={() => go('kycPersonalDetails')}
            onEditID={() => go('kycIDSelection')}
            onBack={() => go('kycLiveness')}
          />
        )

      case 'kycPending':
        return (
          <KYCPending
            onContinue={() => go('welcome')}
          />
        )

      case 'kycSuccess':
        return (
          <KYCSuccess
            name={userData.name}
            onContinue={() => go('welcome')}
          />
        )

      case 'kycFailed':
        return (
          <KYCFailed
            reason="blurry_document"
            onResubmit={() => go('kycIntro')}
            onSupport={() => go('support')}
          />
        )

      case 'kycBiometricConsent':
        return (
          <KYCBiometricConsent
            onAccept={() => go('kycIDSelection')}
            onDecline={() => go('kycIntro')}
            onBack={() => go('kycPersonalDetails')}
          />
        )

      case 'kycNeedsInfo':
        return (
          <KYCNeedsInfo
            mode="resubmit_doc"
            onResubmit={() => go('kycIDCapture')}
            onContinue={() => go('welcome')}
          />
        )

      case 'kycAttemptLimit':
        return (
          <KYCAttemptLimit
            reason="liveness"
            cooldownSeconds={300}
            onContactSupport={() => go('contactSupport')}
            onRetry={() => go('kycLiveness')}
          />
        )

      case 'home': {
        let hiddenWidgets = new Set<string>()
        try {
          const stored = localStorage.getItem('cap_hidden_widgets')
          if (stored) hiddenWidgets = new Set(JSON.parse(stored) as string[])
        } catch { /* ignore */ }
        return (
          <Home
            userName={userData.name}
            accountType={accountType}
            kycStatus="complete"
            plan="free"
            onNavigate={consumerNav}
            onSend={() => { setSendMethodBack('home'); go('sendMethod') }}
            onRequest={() => go('receive')}
            onAddMoney={() => go('addMoney')}
            onScan={() => go('scanQR')}
            onSeeAllTransactions={() => go('transactionHistory')}
            onNotifications={() => go('notifications')}
            onVerify={() => go('verificationGate')}
            onUpgrade={(rec) => { if (rec) setRecommendedPlan(rec); go('comparePlans') }}
            onWalletDetail={() => go('walletDetail')}
            hiddenWidgets={hiddenWidgets}
          />
        )
      }

      case 'walletDetail':
        return (
          <WalletDetail
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onAddMoney={() => go('addMoney')}
            onWithdraw={() => go('withdraw')}
            onNotifications={() => go('notifications')}
            onReceiveNano={() => go('receiveNano')}
            onSendNano={() => go('sendNanoExternal')}
          />
        )

      case 'notifications':
        return (
          <Notifications
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onNotificationDetail={_id => go('notificationDetail')}
            onNotifications={() => go('notifications')}
          />
        )

      case 'notificationDetail':
        return (
          <NotificationDetail
            accountType={accountType}
            notificationId="2"
            onNavigate={consumerNav}
            onBack={() => go('notifications')}
            onNotifications={() => go('notifications')}
            onCTA={() => go('home')}
          />
        )

      case 'verificationGate':
        return (
          <div className="relative bg-bg flex flex-col" style={{ minHeight: 785 }}>
            {/* Dimmed home preview underneath */}
            <div className="opacity-40 pointer-events-none">
              <Home
                userName={userData.name}
                accountType={accountType}
                kycStatus="incomplete"
                plan="free"
                onNavigate={() => {}}
              />
            </div>
            <VerificationGate
              actionLabel="Send Money"
              onVerify={() => go('kycIntro')}
              onDismiss={() => go('home')}
            />
          </div>
        )

      case 'transactionLimitReached':
        return (
          <div className="relative bg-bg flex flex-col" style={{ minHeight: 785 }}>
            <div className="opacity-40 pointer-events-none">
              <Home
                userName={userData.name}
                accountType={accountType}
                kycStatus="complete"
                plan="free"
                onNavigate={() => {}}
              />
            </div>
            <TransactionLimitReached
              usedAmount={400}
              limitAmount={400}
              onUpgrade={() => go('subscriptionPlans')}
              onDismiss={() => go('home')}
            />
          </div>
        )

      case 'search':
        return (
          <Search
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('home')}
          />
        )

      case 'subscriptionPlans':
        return (
          <SubscriptionPlans
            accountType={accountType}
            currentPlan="free"
            kycComplete={false}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onNotifications={() => go('notifications')}
            onSelectPlan={plan => { if (plan && plan !== 'free') { setRecommendedPlan(plan as 'prime' | 'apex'); go('checkout') } }}
            onVerify={() => go('kycIntro')}
          />
        )

      case 'searchResults':
        return (
          <SearchResults
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('search')}
          />
        )

      case 'spendingInsightsPreview':
        return (
          <SpendingInsightsPreview
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onNotifications={() => go('notifications')}
            onSeeFullReport={() => go('aiSuggestionsWidget')}
          />
        )

      case 'aiSuggestionsWidget':
        return (
          <AISuggestionsWidget
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onNotifications={() => go('notifications')}
            onOpenChat={() => go('finaChat')}
          />
        )

      case 'quickActions':
        return (
          <QuickActions
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onNotifications={() => go('notifications')}
            onSend={() => { setSendMethodBack('home'); go('sendMethod') }}
            onRequest={() => go('receive')}
            onAddMoney={() => go('addMoney')}
            onScan={() => go('scanQR')}
            onPayBills={() => go('payBillsHub')}
            onSplitBill={() => go('splitPayment')}
          />
        )

      case 'dashboardCustomization':
        return (
          <DashboardCustomization
            accountType={accountType}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onNotifications={() => go('notifications')}
            onSave={() => go('home')}
          />
        )

      case 'refreshState':
        return (
          <RefreshState
            accountType={accountType}
            userName={userData.name}
            onNavigate={consumerNav}
            onBack={() => go('home')}
            onNotifications={() => go('notifications')}
          />
        )

      case 'paymentsHub':
        return (
          <PaymentsHub
            accountType={accountType}
            onNavigate={consumerNav}
            onNotifications={() => go('notifications')}
            onSend={() => { setSendMethodBack('paymentsHub'); go('sendMethod') }}
            onRequest={() => go('receive')}
            onAddMoney={() => go('addMoney')}
            onSplitBill={() => go('splitPayment')}
            onPayBills={() => go('payBillsHub')}
            onMySubscriptions={() => go('myCapSubscriptions')}
          />
        )

      case 'sendMethod':
        return (
          <SendMethod
            onChangeAPay={() => go('contactPicker')}
            onPhone={() => go('contactPicker')}
            onEmail={() => go('contactPicker')}
            onBankDomestic={() => go('contactPicker')}
            onBankInternational={() => go('contactPicker')}
            onBack={() => go(sendMethodBack)}
          />
        )

      case 'contactPicker':
        return (
          <ContactPicker
            onSelect={() => go('sendAmount')}
            onBack={() => go('sendMethod')}
            onAddNew={() => {}}
          />
        )

      case 'sendAmount':
        return (
          <SendAmount
            onContinue={(amount, currency, note) => { setSendFlow({ amount, currency, note }); go('sendConfirmation') }}
            onBack={() => go('contactPicker')}
            onLimitReached={() => go('transactionLimitReached')}
          />
        )

      case 'payBillsHub':
        return (
          <PayBillsHub
            onBack={() => go('home')}
            onSelectBiller={biller => {
              setBillFlow(f => ({ ...f, biller }))
              go('payBillsAccount')
            }}
          />
        )

      case 'payBillsAccount':
        return (
          <PayBillsAccount
            biller={billFlow.biller ?? undefined}
            onBack={() => go('payBillsHub')}
            onContinue={accountNumber => {
              setBillFlow(f => ({ ...f, accountNumber }))
              go('payBillsAmount')
            }}
          />
        )

      case 'payBillsAmount':
        return (
          <PayBillsAmount
            biller={billFlow.biller ?? undefined}
            accountNumber={billFlow.accountNumber}
            onBack={() => go('payBillsAccount')}
            onContinue={amount => {
              setBillFlow(f => ({ ...f, amount }))
              go('payBillsConfirmation')
            }}
          />
        )

      case 'payBillsConfirmation':
        return (
          <PayBillsConfirmation
            biller={billFlow.biller ?? undefined}
            accountNumber={billFlow.accountNumber}
            amount={billFlow.amount}
            onBack={() => go('payBillsAmount')}
            onConfirm={() => go('sendSuccess')}
          />
        )

      case 'sendConfirmation': {
        const sfFee = 'Free'
        const sfTotal = `${sendFlow.currency === 'GBP' ? '£' : sendFlow.currency === 'EUR' ? '€' : '$'}${sendFlow.amount}`
        return (
          <SendConfirmation
            amount={sendFlow.amount}
            currency={sendFlow.currency}
            fee={sfFee}
            total={sfTotal}
            onConfirm={() => go('sendSuccess')}
            onBack={() => go('sendAmount')}
            onEditRecipient={() => go('contactPicker')}
            onEditAmount={() => go('sendAmount')}
          />
        )
      }

      case 'sendSuccess':
        trackEvent('first_send_success', { amount: sendFlow.amount, currency: sendFlow.currency })
        return (
          <SendSuccess
            amount={sendFlow.amount}
            currency={sendFlow.currency}
            fee="Free"
            onDone={() => go('paymentsHub')}
            onShareReceipt={() => go('shareReceipt')}
            onAddFavorite={() => {}}
          />
        )

      case 'sendFailed': {
        const sym = sendFlow.currency === 'GBP' ? '£' : sendFlow.currency === 'EUR' ? '€' : '$'
        return (
          <SendFailed
            amount={`${sym}${sendFlow.amount}`}
            reason="network_error"
            onRetry={() => go('sendConfirmation')}
            onSupport={() => go('support')}
            onCancel={() => go('paymentsHub')}
          />
        )
      }

      case 'sendPending': {
        const sym = sendFlow.currency === 'GBP' ? '£' : sendFlow.currency === 'EUR' ? '€' : '$'
        return (
          <SendPending
            amount={`${sym}${sendFlow.amount}`}
            currency={sendFlow.currency}
            reason="bank_settlement"
            onViewReceipt={() => go('receipt')}
            onDone={() => go('paymentsHub')}
          />
        )
      }

      case 'receive':
        return (
          <Receive
            handle="@mayapatel"
            displayName={userData.name}
            avatarInitials={userData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            onBack={() => go('paymentsHub')}
            onDone={() => go('paymentsHub')}
          />
        )

      case 'qrHub':
        return (
          <QRHub
            handle="@mayapatel"
            displayName={userData.name}
            avatarInitials={userData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            onScan={() => go('scanQR')}
            onBack={() => go('paymentsHub')}
            onSelectContact={() => go('sendAmount')}
          />
        )

      case 'scanQR':
        return (
          <ScanQR
            onSuccess={() => go('sendAmount')}
            onInvalid={() => go('invalidQR')}
            onExpired={() => go('expiredQR')}
            onBack={() => go('qrHub')}
          />
        )

      case 'invalidQR':
        return (
          <InvalidQR
            onTryAgain={() => go('scanQR')}
            onCancel={() => go('qrHub')}
          />
        )

      case 'expiredQR':
        return (
          <ExpiredQR
            onRequestFresh={() => go('qrHub')}
            onGoBack={() => go('qrHub')}
          />
        )

      case 'splitPayment':
        return (
          <SplitPayment
            onSendRequests={(total) => { setSplitTotal(total); go('splitSuccess') }}
            onBack={() => go('paymentsHub')}
            onAddContact={() => go('contactPicker')}
          />
        )

      case 'splitSuccess':
        return (
          <SplitSuccess
            total={splitTotal}
            onShare={() => {}}
            onDone={() => go('paymentsHub')}
          />
        )

      case 'paymentNote':
        return (
          <PaymentNote
            onSave={() => go('sendAmount')}
            onBack={() => go('sendAmount')}
          />
        )

      case 'refundRequest':
        return (
          <RefundRequest
            onSubmit={() => go('refundResult')}
            onBack={() => go('home')}
          />
        )

      case 'refundResult':
        return (
          <RefundResult
            outcome="approved"
            refundAmount={selectedTx ? selectedTx.amount.replace(/^[£€$]/, '') : '24.50'}
            merchantName={selectedTx?.merchant ?? 'Coffee & Co'}
            onDone={() => go('home')}
            onAppeal={() => go('refundRequest')}
            onSupport={() => go('support')}
            onViewBalance={() => go('walletDetail')}
          />
        )

      case 'bankSelection':
        return (
          <BankSelection
            onSelectBank={() => go('linkBank')}
            onManualEntry={() => go('linkBank')}
            onBack={() => go('home')}
          />
        )

      case 'linkBank':
        return (
          <LinkBank
            onContinue={() => go('verificationPending')}
            onBack={() => go('bankSelection')}
          />
        )

      case 'verificationPending':
        return (
          <VerificationPending
            method="instant"
            onContinue={() => go('linkedSuccess')}
            onCancel={() => go('bankSelection')}
          />
        )

      case 'verificationFailed':
        return (
          <VerificationFailed
            reason="ownership"
            onRetry={() => go('linkBank')}
            onTryDifferent={() => go('bankSelection')}
            onCancel={() => go('home')}
          />
        )

      case 'connectionError':
        return (
          <ConnectionError
            onRetry={() => go('linkBank')}
            onSupport={() => go('support')}
            onCancel={() => go('bankSelection')}
          />
        )

      case 'linkedSuccess':
        trackEvent('first_bank_linked')
        return (
          <LinkedSuccess
            onViewDetail={() => go('linkedBankDetail')}
            onHome={() => go('home')}
          />
        )

      case 'linkedBankDetail':
        return (
          <LinkedBankDetail
            onAddMoney={() => go('addMoney')}
            onWithdraw={() => go('withdraw')}
            onUnlink={() => go('removeBank')}
            onBack={() => go('home')}
          />
        )

      case 'addMoney':
        return (
          <AddMoney
            onConfirm={() => go('home')}
            onBack={() => go('walletDetail')}
          />
        )

      case 'withdraw':
        return (
          <Withdraw
            onConfirm={() => go('home')}
            onLimitReached={() => go('transactionLimitReached')}
            onBack={() => go('linkedBankDetail')}
          />
        )

      case 'removeBank':
        return (
          <RemoveBank
            onConfirmUnlink={() => go('home')}
            onCancel={() => go('linkedBankDetail')}
          />
        )

      case 'transactionHistory':
        return (
          <TransactionHistory
            accountType={accountType}
            onNavigate={consumerNav}
            onSelectTransaction={tx => { setSelectedTx(tx); go('transactionDetail') }}
            onSearch={() => go('transactionSearch')}
            onFilter={() => go('filters')}
            onExport={() => go('export')}
            onBack={() => go('home')}
          />
        )

      case 'transactionDetail':
        return (
          <TransactionDetail
            transaction={selectedTx ?? undefined}
            onViewReceipt={() => go('receipt')}
            onShare={() => go('shareReceipt')}
            onRefund={() => go('refundRequest')}
            onReport={() => {}}
            onFileDispute={() => go('fileDispute')}
            onBack={() => go('transactionHistory')}
          />
        )

      case 'receipt':
        return (
          <Receipt
            transaction={selectedTx ?? undefined}
            onShare={() => go('shareReceipt')}
            onBack={() => go('transactionDetail')}
          />
        )

      case 'shareReceipt': {
        const txId = selectedTx?.transactionId ?? 'receipt'
        const receiptMsg = `ChangeAIPay receipt ${txId} — ${selectedTx?.amount ?? ''} on ${selectedTx?.date ?? ''}`
        return (
          <ShareReceipt
            transactionId={txId}
            onMessage={() => { window.open(`sms:?body=${encodeURIComponent(receiptMsg)}`); go('transactionDetail') }}
            onEmail={() => { window.open(`mailto:?subject=${encodeURIComponent('ChangeAIPay Receipt')}&body=${encodeURIComponent(receiptMsg)}`); go('transactionDetail') }}
            onSavePDF={() => go('transactionDetail')}
            onSaveImage={() => go('transactionDetail')}
            onCopyLink={() => { navigator.clipboard?.writeText(receiptMsg).catch(() => {}); go('transactionDetail') }}
            onDismiss={() => go('transactionDetail')}
          />
        )
      }

      case 'export':
        return (
          <Export
            onExport={() => go('transactionHistory')}
            onBack={() => go('transactionHistory')}
          />
        )

      case 'transactionSearch':
        return (
          <TransactionSearch
            onSelectTransaction={tx => { setSelectedTx(tx); go('transactionDetail') }}
            onBack={() => go('transactionHistory')}
          />
        )

      case 'filters':
        return (
          <Filters
            onApply={() => go('transactionHistory')}
            onReset={() => {}}
            onBack={() => go('transactionHistory')}
          />
        )

      case 'recurring':
        return (
          <Recurring
            onManage={() => {}}
            onBack={() => go('home')}
          />
        )

      case 'scheduled':
        return (
          <Scheduled
            onEdit={() => {}}
            onCancel={_id => go('cancelScheduled')}
            onBack={() => go('home')}
          />
        )

      case 'cancelScheduled':
        return (
          <CancelScheduled
            isRecurring={false}
            onConfirmCancel={() => go('scheduled')}
            onKeep={() => go('scheduled')}
          />
        )

      case 'cryptoHome':
        return (
          <CryptoHome
            accountType={accountType}
            onNavigate={consumerNav}
            onBuy={asset => { if (asset) setBuyOrder({ ...asset, amountUSD: 0, amountCrypto: 0 }); go('cryptoBuy') }}
            onSell={() => go('cryptoBuy')}
            onBack={() => go('home')}
          />
        )

      case 'cryptoBuy':
        return (
          <CryptoBuy
            onContinue={order => { setBuyOrder(order); go('cryptoProviderComparison') }}
            onBack={() => go('cryptoHome')}
            onNetworkTransparency={() => go('nanoNetworkTransparency')}
          />
        )

      case 'cryptoProviderComparison':
        return (
          <CryptoProviderComparison
            order={buyOrder ?? undefined}
            onSelect={providerId => {
              setSelectedProviderId(providerId)
              const providerNames: Record<string, string> = { 'liquidity-a': 'LiquidX', 'liquidity-b': 'CoinRoute', 'liquidity-c': 'TradeNova' }
              if (buyOrder) {
                const fee = buyOrder.zeroFee ? 0 : buyOrder.amountUSD * 0.0015
                setReviewOrder({
                  ...buyOrder,
                  providerId,
                  providerName: providerNames[providerId] ?? 'LiquidX',
                  fee,
                  totalUSD: buyOrder.amountUSD + fee,
                })
              }
              go('cryptoReview')
            }}
            onBack={() => go('cryptoBuy')}
          />
        )

      case 'cryptoReview':
        return (
          <CryptoReview
            order={reviewOrder ?? undefined}
            onConfirm={() => go('cryptoProcessing')}
            onBack={() => go('cryptoProviderComparison')}
          />
        )

      case 'cryptoProcessing':
        return (
          <CryptoProcessing
            order={reviewOrder ?? undefined}
            onComplete={() => go('cryptoSuccess')}
            onError={() => go('cryptoProviderComparison')}
          />
        )

      case 'cryptoSuccess':
        return (
          <CryptoSuccess
            order={reviewOrder ?? undefined}
            updatedPortfolioValue={2946.58 + (reviewOrder?.amountUSD ?? 100)}
            onDone={() => go('cryptoHome')}
            onViewPortfolio={() => go('cryptoHome')}
          />
        )

      case 'cryptoSell':
        return (
          <CryptoSell
            onContinue={order => {
              setSellOrder(order)
              setSellConfirmOrder({ ...order, fee: 0, proceeds: order.amountUSD })
              go('cryptoSellConfirmation')
            }}
            onBack={() => go('cryptoHome')}
          />
        )

      case 'cryptoSellConfirmation':
        return (
          <CryptoSellConfirmation
            order={sellConfirmOrder ?? undefined}
            onConfirm={() => go('cryptoSellSuccess')}
            onBack={() => go('cryptoSell')}
          />
        )

      case 'cryptoSellSuccess':
        return (
          <CryptoSellSuccess
            order={sellConfirmOrder ?? undefined}
            updatedPortfolioValue={2846.58 - (sellConfirmOrder?.proceeds ?? 374)}
            updatedBalance={1248.50 + (sellConfirmOrder?.proceeds ?? 374)}
            onDone={() => go('cryptoHome')}
            onViewPortfolio={() => go('cryptoHome')}
          />
        )

      case 'cryptoHistory':
        return (
          <CryptoHistory
            onBack={() => go('cryptoHome')}
          />
        )

      case 'cryptoWalletAddress':
        return (
          <CryptoWalletAddress
            symbol="ETH"
            name="Ethereum"
            color="#627EEA"
            onDeposit={() => go('cryptoDeposit')}
            onBack={() => go('cryptoHome')}
          />
        )

      case 'cryptoDeposit':
        return (
          <CryptoDeposit
            symbol="ETH"
            name="Ethereum"
            color="#627EEA"
            onBack={() => go('cryptoWalletAddress')}
          />
        )

      case 'cryptoWithdraw':
        return (
          <CryptoWithdraw
            symbol="ETH"
            name="Ethereum"
            color="#627EEA"
            availableCrypto={0.45}
            onDone={() => go('cryptoHome')}
            onBack={() => go('cryptoHome')}
          />
        )

      case 'goals':
        return (
          <Goals
            onCreateGoal={() => go('createGoal')}
            onSelectGoal={goal => { setSelectedGoal(goal); go('goalDetail') }}
            onAutoSave={() => go('autoSave')}
            onBack={() => go('home')}
          />
        )

      case 'createGoal':
        return (
          <CreateGoal
            onSave={() => { trackEvent('first_goal_created'); go('goals') }}
            onBack={() => go('goals')}
          />
        )

      case 'goalDetail':
        return (
          <GoalDetail
            goal={selectedGoal ?? undefined}
            onAddFunds={() => go('addMoney')}
            onEdit={() => go('editGoal')}
            onDelete={() => go('deleteGoal')}
            onBack={() => go('goals')}
          />
        )

      case 'editGoal':
        return (
          <EditGoal
            goal={selectedGoal ?? undefined}
            onSave={updated => { if (selectedGoal) setSelectedGoal({ ...selectedGoal, ...updated }); go('goalDetail') }}
            onBack={() => go('goalDetail')}
          />
        )

      case 'deleteGoal':
        return (
          <DeleteGoal
            goal={selectedGoal ?? undefined}
            onConfirm={() => { setSelectedGoal(null); go('goals') }}
            onCancel={() => go('goalDetail')}
          />
        )

      case 'goalCelebration':
        return (
          <GoalCelebration
            goalName={selectedGoal?.name ?? 'Emergency Fund'}
            goalEmoji={selectedGoal?.emoji ?? '🛡️'}
            goalAmount={selectedGoal?.targetAmount ?? 5000}
            monthsToReach={7}
            onNewGoal={() => go('createGoal')}
            onContinue={() => go('goals')}
          />
        )

      case 'autoSave':
        return (
          <AutoSave
            onBack={() => go('goals')}
            onHistory={() => go('autoSaveHistory')}
          />
        )

      case 'autoSaveHistory':
        return (
          <AutoSaveHistory
            onBack={() => go('autoSave')}
          />
        )

      case 'finaChat':
        return (
          <FinaChat
            onBack={() => go('home')}
            onHistory={() => go('chatHistory')}
            onVoice={() => go('voiceMode')}
          />
        )

      case 'chatHistory':
        return (
          <ChatHistory
            onResume={_id => go('finaChat')}
            onBack={() => go('finaChat')}
          />
        )

      case 'savedResponses':
        return (
          <SavedResponses
            onOpenConvo={_id => go('finaChat')}
            onBack={() => go('finaChat')}
          />
        )

      case 'aiMemory':
        return (
          <AIMemory
            onBack={() => go('finaChat')}
            onPrivacySettings={() => go('aiPrivacy')}
          />
        )

      case 'aiPrivacy':
        return (
          <AIPrivacy
            onBack={() => go('finaChat')}
            onMemory={() => go('aiMemory')}
          />
        )

      case 'voiceMode':
        return (
          <VoiceMode
            onEnd={() => go('finaChat')}
            onSwitchToText={() => go('finaChat')}
          />
        )

      case 'financialReport':
        return (
          <FinancialReport
            onExport={() => {}}
            onShare={() => {}}
            onBack={() => go('home')}
          />
        )

      case 'suggestedBudget':
        return (
          <SuggestedBudget
            onAccept={() => go('home')}
            onBack={() => go('spendingInsights')}
          />
        )

      case 'spendingInsights':
        return (
          <SpendingInsights
            onBack={() => go('home')}
            onOpenBudget={() => go('suggestedBudget')}
          />
        )

      case 'subscriptionReview':
        return (
          <SubscriptionReview
            onBack={() => go('home')}
            onOpenRecurring={() => go('recurring')}
          />
        )

      case 'goalPlanner':
        return (
          <GoalPlanner
            onCreateGoal={() => go('createGoal')}
            onEditGoal={_id => go('editGoal')}
            onBack={() => go('goals')}
          />
        )

      case 'aiSettings':
        return (
          <AISettings
            onBack={() => go('finaChat')}
            onMemory={() => go('aiMemory')}
            onPrivacy={() => go('aiPrivacy')}
          />
        )

      case 'profile':
        return (
          <Profile
            name={userData.name}
            handle="@mayapatel"
            email={userData.email}
            accountType={accountType}
            kycStatus="complete"
            onPersonalInfo={() => go('personalInformation')}
            onSecurity={() => go('security')}
            onDevices={() => go('devices')}
            onNotifications={() => go('notificationPreferences')}
            onLanguage={() => go('language')}
            onAISettings={() => go('aiSettings')}
            onSubscription={() => go('billingHistory')}
            onStatements={() => go('statements')}
            onTaxDocuments={() => go('taxDocuments')}
            onHelp={() => go('help')}
            onSupport={() => go('support')}
            onLogout={() => go('logoutConfirm')}
            onDeleteAccount={() => go('deleteAccount')}
            onBack={() => go('home')}
          />
        )

      case 'personalInformation':
        return (
          <PersonalInformation
            onSave={() => {}}
            onBack={() => go('profile')}
            onReVerify={() => go('kycIntro')}
          />
        )

      case 'security':
        return (
          <Security
            onBack={() => go('profile')}
            onChangePin={() => go('setPIN')}
            onBiometric={() => go('enableBiometrics')}
            onTwoFactor={() => go('enable2FA')}
            onExportWallet={() => go('exportNanoWallet')}
            onNetworkTransparency={() => go('nanoNetworkTransparency')}
          />
        )

      case 'exportNanoWallet':
        return (
          <ExportNanoWallet
            onBack={() => go('security')}
          />
        )

      case 'nanoNetworkTransparency':
        return (
          <NanoNetworkTransparency
            onBack={() => go('security')}
          />
        )

      case 'devices':
        return (
          <Devices
            onBack={() => go('profile')}
            onAddDevice={() => go('newDeviceVerification')}
            onSuspiciousLogin={() => go('suspiciousLogin')}
          />
        )

      case 'notificationPreferences':
        return (
          <NotificationPreferences
            onBack={() => go('profile')}
          />
        )

      case 'language':
        return (
          <Language
            onBack={() => go('profile')}
            onApply={() => {}}
          />
        )

      case 'statements':
        return (
          <Statements
            onBack={() => go('profile')}
          />
        )

      case 'taxDocuments':
        return (
          <TaxDocuments
            onBack={() => go('profile')}
          />
        )

      case 'help':
        return (
          <Help
            onBack={() => go('profile')}
            onSupport={() => go('support')}
          />
        )

      case 'support':
        return (
          <Support
            onBack={() => go('help')}
            onChat={() => go('finaChat')}
          />
        )

      case 'deleteAccount':
        return (
          <DeleteAccount
            onBack={() => go('profile')}
            onContinue={() => go('deleteConfirmation')}
          />
        )

      case 'deleteConfirmation':
        return (
          <DeleteConfirmation
            onConfirm={() => go('logoutSuccess')}
            onCancel={() => go('deleteAccount')}
          />
        )

      case 'logoutConfirm':
        return (
          <LogoutConfirm
            name={userData.name}
            onConfirm={() => go('logoutSuccess')}
            onCancel={() => go('profile')}
          />
        )

      case 'logoutSuccess':
        return (
          <LogoutSuccess
            onLogin={() => go('login')}
          />
        )

      case 'comparePlans':
        return (
          <ComparePlans
            currentPlan="free"
            recommendedPlan={recommendedPlan}
            onSelectPlan={plan => { setRecommendedPlan(plan === 'free' ? 'prime' : plan as 'prime' | 'apex'); go('checkout') }}
            onBack={() => go('subscriptionPlans')}
          />
        )

      case 'checkout':
        return (
          <Checkout
            plan={recommendedPlan === 'apex' ? 'apex' : 'prime'}
            onConfirm={() => go('home')}
            onBack={() => go('comparePlans')}
            onComparePlans={() => go('comparePlans')}
          />
        )

      case 'upgrade':
        return (
          <Upgrade
            fromPlan="prime"
            toPlan="apex"
            onConfirm={() => go('subscriptionPlans')}
            onBack={() => go('subscriptionPlans')}
          />
        )

      case 'downgrade':
        return (
          <Downgrade
            fromPlan="apex"
            toPlan="prime"
            onConfirm={() => go('subscriptionPlans')}
            onBack={() => go('subscriptionPlans')}
          />
        )

      case 'billingHistory':
        return (
          <BillingHistory
            onBack={() => go('profile')}
            onViewInvoice={(id) => { setSelectedInvoiceId(id); go('invoiceDownload') }}
          />
        )

      case 'invoiceDownload':
        return (
          <InvoiceDownload
            invoiceId={selectedInvoiceId ?? undefined}
            onBack={() => go('billingHistory')}
          />
        )

      case 'inviteFriends':
        return (
          <InviteFriends
            onBack={() => go('changeCircle')}
            onViewCircle={() => go('changeCircle')}
            onViewTerms={() => go('referralTerms')}
          />
        )

      case 'changeCircle':
        return (
          <ChangeCircle
            onBack={() => go('home')}
            onInvite={() => go('inviteFriends')}
            onViewMilestones={() => go('milestoneUnlocks')}
          />
        )

      case 'circleMomentum':
        return (
          <CircleMomentum
            onBack={() => go('changeCircle')}
            onViewMilestones={() => go('milestoneUnlocks')}
            onInvite={() => go('inviteFriends')}
          />
        )

      case 'milestoneUnlocks':
        return (
          <MilestoneUnlocks
            onBack={() => go('changeCircle')}
            onInvite={() => go('inviteFriends')}
          />
        )

      case 'milestoneReveal':
        return (
          <MilestoneReveal
            onContinue={() => go('changeCircle')}
            onViewVault={() => go('changeVault')}
          />
        )

      case 'changeVault':
        return (
          <ChangeVault
            onBack={() => go('changeCircle')}
          />
        )

      case 'milestoneSurprise':
        return (
          <MilestoneSurprise
            onContinue={() => go('changeCircle')}
            onViewVault={() => go('changeVault')}
          />
        )

      case 'referralTerms':
        return (
          <ReferralTerms
            onBack={() => go('inviteFriends')}
            onInvite={() => go('inviteFriends')}
          />
        )

      case 'changeImpactSummary':
        return (
          <ChangeImpactSummary
            onBack={() => go('changeCircle')}
            onInvite={() => go('inviteFriends')}
            onViewCircle={() => go('changeCircle')}
            onViewVault={() => go('changeVault')}
          />
        )

      case 'leaderboard':
        return (
          <Leaderboard
            onBack={() => go('changeCircle')}
            onInvite={() => go('inviteFriends')}
          />
        )

      case 'savingsLeaderboard':
        return (
          <SavingsLeaderboard
            onBack={() => go('home')}
            onViewChallenges={() => go('communityChallenges')}
          />
        )

      case 'monthlyRankings':
        return (
          <MonthlyRankings
            onBack={() => go('home')}
            onViewLeaderboard={() => go('savingsLeaderboard')}
            onViewChallenges={() => go('communityChallenges')}
          />
        )

      case 'achievementBadges':
        return (
          <AchievementBadges
            onBack={() => go('home')}
            onViewCircle={() => go('changeCircle')}
          />
        )

      case 'communityChallenges':
        return (
          <CommunityChallenges
            onBack={() => go('home')}
            onViewLeaderboard={() => go('savingsLeaderboard')}
          />
        )

      case 'savingsMilestones':
        return (
          <SavingsMilestones
            onBack={() => go('goals')}
            onViewGoals={() => go('goals')}
            onViewVault={() => go('changeVault')}
          />
        )

      case 'supportDevelopment':
        return (
          <SupportDevelopment
            onBack={() => go('home')}
          />
        )

      case 'kybIntro':
        return (
          <KYBIntro
            businessName={userData.name}
            onStart={() => go('kybBusinessDetails')}
            onBack={() => go('home')}
          />
        )

      case 'kybBusinessDetails':
        return (
          <KYBBusinessDetails
            initial={kybBusinessData ?? undefined}
            onContinue={data => { setKybBusinessData(data); go('kybAddress') }}
            onBack={() => go('kybIntro')}
          />
        )

      case 'kybAddress':
        return (
          <KYBAddress
            initial={kybAddressData ?? undefined}
            onContinue={data => { setKybAddressData(data); go('kybStakeholders') }}
            onBack={() => go('kybBusinessDetails')}
          />
        )

      case 'kybStakeholders':
        return (
          <KYBStakeholders
            initial={kybStakeholders ?? undefined}
            onContinue={stakeholders => { setKybStakeholders(stakeholders); go('kybDocuments') }}
            onBack={() => go('kybAddress')}
          />
        )

      case 'kybDocuments':
        return (
          <KYBDocuments
            onContinue={() => go('kybPending')}
            onBack={() => go('kybStakeholders')}
          />
        )

      case 'kybPending':
        return (
          <KYBPending
            businessName={kybBusinessData?.legalName ?? 'Your Business'}
            onContinue={() => go('home')}
          />
        )

      case 'kybSuccess':
        return (
          <KYBSuccess
            businessName={kybBusinessData?.legalName ?? 'Your Business'}
            onContinue={() => go('home')}
          />
        )

      case 'kybFailed':
        return (
          <KYBFailed
            reason="document_mismatch"
            onResubmit={() => go('kybBusinessDetails')}
            onSupport={() => go('support')}
            onBack={() => go('home')}
          />
        )

      case 'merchantHome':
        return (
          <MerchantHome
            businessName={kybBusinessData?.legalName ?? 'Apex Studio LLC'}
            onNavigate={merchantNav}
            onNotifications={() => go('merchantNotifications')}
            onCreateInvoice={() => go('invoice')}
            onGenerateQR={() => go('merchantQR')}
            onViewPayout={() => go('payout')}
            onSendMoney={() => go('sendMethod')}
            onSeeAllTransactions={() => go('merchantTransactionHistory')}
            onPlans={() => go('merchantPlans')}
            onFeatureRequests={() => go('feedback')}
            isEnterprise={selectedMerchantTier === 'Enterprise'}
            onInstitutionalPayments={() => go('instDashboard')}
            onRiskFraud={() => go('riskFraudCenter')}
          />
        )

      case 'merchantNotifications':
        return (
          <MerchantNotifications
            onNavigate={merchantNav}
            onBack={() => go('merchantHome')}
          />
        )

      case 'merchantPaymentsHub':
        return (
          <MerchantPaymentsHub
            onNavigate={merchantNav}
            onCreateInvoice={() => go('invoice')}
            onGenerateQR={() => go('merchantQR')}
            onRequestPayment={() => go('receive')}
            onPaymentLinks={() => go('paymentLinksHub')}
            onRecurringBilling={() => go('recurringBillingHub')}
            onDisputes={() => go('respondToDispute')}
            onBack={() => go('merchantHome')}
          />
        )

      case 'invoice':
        return (
          <Invoice
            onSend={() => go('merchantPaymentsHub')}
            onSaveDraft={() => go('merchantPaymentsHub')}
            onBack={() => go('merchantPaymentsHub')}
          />
        )

      case 'merchantQR':
        return (
          <MerchantQR
            businessName={kybBusinessData?.legalName ?? 'Apex Studio LLC'}
            onBack={() => go('merchantPaymentsHub')}
            onShare={() => {}}
            onPrint={() => {}}
          />
        )

      case 'payout':
        return (
          <Payout
            onBack={() => go('merchantHome')}
            onLinkBank={() => go('linkedBankDetail')}
          />
        )

      case 'merchantTransactionHistory':
        return (
          <MerchantTransactionHistory
            onBack={() => go('merchantHome')}
            onSelectTx={() => go('transactionDetail')}
          />
        )

      case 'businessHealth':
        return (
          <BusinessHealth
            onBack={() => go('merchantHome')}
            onViewRevenue={() => go('revenueOverview')}
          />
        )

      case 'revenueOverview':
        return (
          <RevenueOverview
            onBack={() => go('businessHealth')}
          />
        )

      case 'customerInsights':
        return (
          <CustomerInsights
            onBack={() => go('businessHealth')}
          />
        )

      case 'cashFlow':
        return (
          <CashFlow
            onBack={() => go('businessHealth')}
            onViewPayout={() => go('payout')}
          />
        )

      case 'ainaChat':
        return (
          <AinaChat
            onBack={() => go('merchantHome')}
            onHistory={() => go('chatHistory')}
            onVoice={() => go('ainaVoiceMode')}
          />
        )

      case 'ainaVoiceMode':
        return (
          <AinaVoiceMode
            onEnd={() => go('ainaChat')}
            onSwitchToText={() => go('ainaChat')}
          />
        )

      case 'systemUpdate':
        return (
          <div className="relative" style={{ width: 390, height: 844 }}>
            <div className="w-full h-full bg-bg" />
            <SystemUpdate
              onRestart={() => go('home')}
              onDismiss={() => go('home')}
            />
          </div>
        )

      case 'paymentLinksHub':
        return <PaymentLinksHub onBack={() => go('merchantPaymentsHub')} onCreateLink={() => go('createPaymentLink')} onLinkDetail={id => { setSelectedLinkId(id); go('paymentLinkDetail') }} />

      case 'createPaymentLink':
        return <CreatePaymentLink onBack={() => go('paymentLinksHub')} onCreate={() => go('paymentLinksHub')} />

      case 'paymentLinkDetail':
        return <PaymentLinkDetail linkId={selectedLinkId} onBack={() => go('paymentLinksHub')} onShare={() => {}} onDeactivate={() => go('paymentLinksHub')} />

      case 'payoutSettings':
        return <PayoutSettings onBack={() => go('merchantSettings')} onHistory={() => go('transactionHistory')} />

      case 'riskFraudCenter':
        return <RiskFraudCenter onBack={() => go('merchantHome')} onTransactionDetail={id => { setSelectedFlagId(id); go('flaggedTransactionDetail') }} />

      case 'flaggedTransactionDetail':
        return <FlaggedTransactionDetail flagId={selectedFlagId} onBack={() => go('riskFraudCenter')} onApprove={() => go('riskFraudCenter')} onBlock={() => go('riskFraudCenter')} />

      case 'fileDispute':
        return <FileDispute onBack={() => go('transactionDetail')} onSubmit={() => go('disputeStatus')} />

      case 'respondToDispute':
        return <RespondToDispute onBack={() => go('merchantPaymentsHub')} onSubmit={() => go('disputeStatus')} />

      case 'disputeStatus':
        return <DisputeStatus onBack={() => go('transactionDetail')} />

      case 'developerSettings':
        return <DeveloperSettings onBack={() => go('merchantSettings')} />

      case 'merchantStatements':
        return <MerchantStatements onBack={() => go('merchantProfile')} onDownload={() => {}} />

      case 'recurringBillingHub':
        return <RecurringBillingHub onBack={() => go('merchantPaymentsHub')} onCreatePlan={() => go('createBillingPlan')} onPlanDetail={id => { setSelectedPlanId(id); go('billingPlanDetail') }} />

      case 'createBillingPlan':
        return <CreateBillingPlan onBack={() => go('recurringBillingHub')} onCreate={() => go('recurringBillingHub')} />

      case 'billingPlanDetail':
        return <BillingPlanDetail planId={selectedPlanId} onBack={() => go('recurringBillingHub')} onEdit={() => go('createBillingPlan')} onPause={() => go('recurringBillingHub')} onCancel={() => go('recurringBillingHub')} />

      case 'myCapSubscriptions':
        return <MyCapSubscriptions onBack={() => go('paymentsHub')} />

      case 'revenueReport':
        return (
          <RevenueReport
            onBack={() => go('businessHealth')}
            onExport={() => {}}
            onShare={() => {}}
            onOpenAina={() => go('ainaChat')}
          />
        )

      case 'businessInsights':
        return (
          <BusinessInsights
            onBack={() => go('merchantHome')}
            onOpenAina={() => go('ainaChat')}
          />
        )

      case 'merchantProfile':
        return (
          <MerchantProfile
            businessName={kybBusinessData?.legalName ?? 'Apex Studio LLC'}
            onNavigate={merchantNav}
            onTeamMembers={() => go('teamMembers')}
            onRoles={() => go('roles')}
            onSecurity={() => go('merchantSecurity')}
            onSettings={() => go('merchantSettings')}
            onStatements={() => go('merchantStatements')}
            onPayoutSettings={() => go('payoutSettings')}
            onDeveloperSettings={() => go('developerSettings')}
            onTaxDocuments={() => go('taxDocuments')}
            onHelp={() => go('help')}
            onSupport={() => go('support')}
            onDeleteAccount={() => go('merchantDeleteAccount')}
            onLogout={() => go('merchantLogout')}
            onAinaChat={() => go('ainaChat')}
            isEnterprise={selectedMerchantTier === 'Enterprise'}
          />
        )

      case 'teamMembers':
        return (
          <TeamMembers
            onBack={() => go('merchantProfile')}
            onViewRoles={() => go('roles')}
          />
        )

      case 'roles':
        return (
          <Roles
            onBack={() => go('teamMembers')}
          />
        )

      case 'merchantSecurity':
        return (
          <MerchantSecurity
            onBack={() => go('merchantProfile')}
          />
        )

      case 'merchantSettings':
        return (
          <MerchantSettings
            onBack={() => go('merchantProfile')}
          />
        )

      case 'merchantDeleteAccount':
        return (
          <MerchantDeleteAccount
            businessName={kybBusinessData?.legalName ?? 'Apex Studio LLC'}
            onBack={() => go('merchantProfile')}
            onContinue={() => go('merchantDeleteConfirmation')}
          />
        )

      case 'merchantDeleteConfirmation':
        return (
          <MerchantDeleteConfirmation
            businessName={kybBusinessData?.legalName ?? 'Apex Studio LLC'}
            onBack={() => go('merchantDeleteAccount')}
            onDeleted={() => go('logoutSuccess')}
          />
        )

      case 'merchantLogout':
        return (
          <MerchantLogout
            businessName={kybBusinessData?.legalName ?? 'Apex Studio LLC'}
            onConfirm={() => go('logoutSuccess')}
            onCancel={() => go('merchantProfile')}
          />
        )

      case 'merchantPlans':
        return (
          <MerchantPlans
            annualVolume={472800}
            onBack={() => go('merchantProfile')}
            onSelectTier={tier => { setSelectedMerchantTier(tier.name); go('merchantCheckout') }}
            onCompare={() => go('merchantComparePlans')}
            onEnterprise={() => go('enterpriseContact')}
          />
        )

      case 'merchantComparePlans':
        return (
          <MerchantComparePlans
            annualVolume={472800}
            onBack={() => go('merchantPlans')}
            onSelectTier={tierName => { setSelectedMerchantTier(tierName); go('merchantCheckout') }}
          />
        )

      case 'merchantCheckout':
        return (
          <MerchantCheckout
            tierName={selectedMerchantTier}
            annualVolume={472800}
            onBack={() => go('merchantPlans')}
            onSuccess={() => go('merchantProfile')}
          />
        )

      case 'merchantUpgrade':
        return (
          <MerchantUpgrade
            fromTier="Growth"
            toTier={selectedMerchantTier}
            annualVolume={472800}
            onBack={() => go('merchantPlans')}
            onConfirm={() => go('merchantProfile')}
          />
        )

      case 'merchantDowngrade':
        return (
          <MerchantDowngrade
            fromTier={selectedMerchantTier}
            annualVolume={472800}
            onBack={() => go('merchantPlans')}
            onConfirm={() => go('merchantProfile')}
          />
        )

      case 'merchantBilling':
        return (
          <MerchantBilling
            onBack={() => go('merchantProfile')}
            onChangePlan={() => go('merchantPlans')}
          />
        )

      case 'enterpriseContact':
        return (
          <EnterpriseContact
            onBack={() => go('merchantPlans')}
            onSelfServe={() => { setSelectedMerchantTier('Enterprise'); go('merchantCheckout') }}
          />
        )

      // ── Institutional Payments Module ───────────────────────────
      case 'instDashboard':
        return (
          <InstDashboard
            onNavigate={tab => {
              const map: Record<string, Screen> = { dashboard: 'instDashboard', overview: 'instOverview', monitor: 'instMonitor', exceptions: 'instExceptions', history: 'instHistory', risk: 'instRisk' }
              go(map[tab] as Screen)
            }}
            onTradeTap={id => { setInstTradeId(id); go('instTradeDetail') }}
            onCounterpartyTap={id => { setInstCpId(id); go('instCounterparty') }}
          />
        )

      case 'instOverview':
        return (
          <InstOverview
            onNavigate={tab => {
              const map: Record<string, Screen> = { dashboard: 'instDashboard', overview: 'instOverview', monitor: 'instMonitor', exceptions: 'instExceptions', history: 'instHistory', risk: 'instRisk' }
              go(map[tab] as Screen)
            }}
          />
        )

      case 'instTradeDetail':
        return (
          <InstTradeDetail
            tradeId={instTradeId}
            onBack={() => go('instMonitor')}
            onViewTimeline={id => { setInstTradeId(id); go('instTimeline') }}
            onFlagException={id => { setInstTradeId(id); go('instExceptions') }}
          />
        )

      case 'instMonitor':
        return (
          <InstMonitor
            onNavigate={tab => {
              const map: Record<string, Screen> = { dashboard: 'instDashboard', overview: 'instOverview', monitor: 'instMonitor', exceptions: 'instExceptions', history: 'instHistory', risk: 'instRisk' }
              go(map[tab] as Screen)
            }}
            onTradeTap={id => { setInstTradeId(id); go('instTradeDetail') }}
          />
        )

      case 'instExceptions':
        return (
          <InstExceptions
            onNavigate={tab => {
              const map: Record<string, Screen> = { dashboard: 'instDashboard', overview: 'instOverview', monitor: 'instMonitor', exceptions: 'instExceptions', history: 'instHistory', risk: 'instRisk' }
              go(map[tab] as Screen)
            }}
          />
        )

      case 'instHistory':
        return (
          <InstHistory
            onNavigate={tab => {
              const map: Record<string, Screen> = { dashboard: 'instDashboard', overview: 'instOverview', monitor: 'instMonitor', exceptions: 'instExceptions', history: 'instHistory', risk: 'instRisk' }
              go(map[tab] as Screen)
            }}
            onTradeTap={id => { setInstTradeId(id); go('instTradeDetail') }}
            onExport={() => go('export')}
          />
        )

      case 'instCounterparty':
        return (
          <InstCounterparty
            counterpartyId={instCpId}
            onBack={() => go('instDashboard')}
            onViewTrades={id => { setInstCpId(id); go('instHistory') }}
          />
        )

      case 'instRisk':
        return (
          <InstRisk
            onNavigate={tab => {
              const map: Record<string, Screen> = { dashboard: 'instDashboard', overview: 'instOverview', monitor: 'instMonitor', exceptions: 'instExceptions', history: 'instHistory', risk: 'instRisk' }
              go(map[tab] as Screen)
            }}
            onInsightTap={id => { setInstTradeId(id); go('instTradeDetail') }}
            onCounterpartyTap={id => { setInstCpId(id); go('instCounterparty') }}
          />
        )

      case 'instTimeline':
        return (
          <InstTimeline
            tradeId={instTradeId}
            onBack={() => go('instTradeDetail')}
          />
        )

      case 'instConfirmation':
        return (
          <InstConfirmation
            tradeId={instTradeId}
            onDone={() => go('instDashboard')}
            onDownload={() => {}}
          />
        )

      case 'universalBroadcast':
        return (
          <UniversalBroadcast
            onBack={() => go('home')}
            onOpenMessage={_id => go('updateDetail')}
          />
        )

      case 'updateDetail':
        return (
          <UpdateDetail
            onBack={() => go('universalBroadcast')}
            onCTA={_id => go('universalBroadcast')}
          />
        )

      case 'promotionalCampaign':
        return (
          <PromotionalCampaign
            onDismiss={() => go('home')}
            onCTA={_id => go('home')}
          />
        )

      case 'emergencyNotice':
        return (
          <EmergencyNotice
            onAcknowledge={() => go('home')}
            onAction={() => go('security')}
          />
        )

      case 'amlReview':
        return (
          <AMLReview
            onContinue={() => go('sourceOfFunds')}
            onContactSupport={() => go('contactSupport')}
          />
        )

      case 'sourceOfFunds':
        return (
          <SourceOfFunds
            onBack={() => go('amlReview')}
            onSubmit={() => go('complianceInReview')}
          />
        )

      case 'additionalVerification':
        return (
          <AdditionalVerification
            onBack={() => go('amlReview')}
            onSubmit={() => go('complianceInReview')}
          />
        )

      case 'complianceInReview':
        return (
          <ComplianceInReview
            onHome={() => go('home')}
            onContactSupport={() => go('contactSupport')}
          />
        )

      case 'complianceResubmitted':
        return (
          <ComplianceResubmitted
            onHome={() => go('home')}
            onContactSupport={() => go('contactSupport')}
          />
        )

      case 'complianceApproved':
        return (
          <ComplianceApproved
            onContinue={() => go('home')}
          />
        )

      case 'complianceRejected':
        return (
          <ComplianceRejected
            onAppeal={() => go('submitTicket')}
            onContactSupport={() => go('contactSupport')}
            onAcknowledge={() => go('home')}
          />
        )

      case 'helpCenter':
        return (
          <HelpCenter
            onBack={() => go('home')}
            onFAQ={() => go('faq')}
            onContactSupport={() => go('contactSupport')}
            onTickets={() => go('ticketDetail')}
          />
        )

      case 'faq':
        return (
          <FAQ
            onBack={() => go('helpCenter')}
            onContactSupport={() => go('contactSupport')}
          />
        )

      case 'contactSupport':
        return (
          <ContactSupport
            onBack={() => go('helpCenter')}
            onLiveChat={() => go('liveChat')}
            onSubmitTicket={() => go('submitTicket')}
            onFAQ={() => go('faq')}
          />
        )

      case 'liveChat':
        return (
          <LiveChat
            onBack={() => go('contactSupport')}
            aiAssistant="fina"
          />
        )

      case 'submitTicket':
        return (
          <SubmitTicket
            onBack={() => go('contactSupport')}
            onSubmitted={_id => go('ticketDetail')}
          />
        )

      case 'ticketDetail':
        return (
          <TicketDetail
            onBack={() => go('submitTicket')}
            onResolved={() => go('ticketResolved')}
          />
        )

      case 'ticketResolved':
        return (
          <TicketResolved
            onBack={() => go('ticketDetail')}
            onReopen={() => go('ticketDetail')}
            onFeedback={() => go('feedback')}
            onHome={() => go('home')}
          />
        )

      case 'feedback':
        return (
          <Feedback
            onBack={() => go('home')}
            onSubmitted={() => go('home')}
          />
        )

      case 'successAnimationLibrary':
        return <SuccessAnimationLibrary />

      case 'logoutSuccessPolished':
        return (
          <LogoutSuccessPolished
            onLogin={() => go('login')}
          />
        )

      case 'accountDeleted':
        return (
          <AccountDeleted
            onDone={() => go('welcome')}
          />
        )

      case 'maintenanceComplete':
        return (
          <MaintenanceComplete
            onContinue={() => go('home')}
          />
        )

      case 'securityAlert':
        return (
          <SecurityAlert
            severity="warning"
            onInvestigate={() => go('security')}
            onDismiss={() => go('home')}
            onContactSupport={() => go('contactSupport')}
          />
        )

      case 'welcomeBackExtended':
        return (
          <WelcomeBackExtended
            onContinue={() => go('home')}
          />
        )

      case 'appReviewRequest':
        return (
          <AppReviewRequest
            onRate={() => go('rateApp')}
            onDismiss={() => go('home')}
          />
        )

      case 'rateApp':
        return (
          <RateApp
            onBack={() => go('appReviewRequest')}
            onSubmit={() => go('home')}
            onSkip={() => go('home')}
          />
        )

      case 'lightCardComingSoon':
        return (
          <LightCardComingSoon
            onBack={() => go('home')}
            onNotify={() => {}}
          />
        )

      case 'lightVaultComingSoon':
        return (
          <LightVaultComingSoon
            onBack={() => go('merchantHome')}
            onNotify={() => {}}
          />
        )

      case 'languageSelection':
        return (
          <LanguageSelection
            onBack={() => go('profile')}
            onApply={() => go('profile')}
          />
        )

      case 'currencySelection':
        return (
          <CurrencySelection
            onBack={() => go('profile')}
            onApply={() => go('profile')}
          />
        )

      case 'regionalSettings':
        return (
          <RegionalSettings
            onBack={() => go('profile')}
            onSave={() => go('profile')}
          />
        )

      case 'timeZone':
        return (
          <TimeZone
            onBack={() => go('profile')}
            onApply={() => go('profile')}
          />
        )

      case 'emptyTransactions':
        return (
          <EmptyTransactions
            onSendMoney={() => go('sendMethod')}
            onRequestMoney={() => go('receive')}
          />
        )

      case 'emptyNotifications':
        return (
          <EmptyNotifications
            onExplore={() => go('home')}
          />
        )

      case 'emptyGoals':
        return (
          <EmptyGoals
            onCreateGoal={() => go('createGoal')}
          />
        )

      case 'emptyAI':
        return (
          <EmptyAI
            onStartChat={() => go('finaChat')}
            aiAssistant="fina"
          />
        )

      case 'emptyFeatures':
        return (
          <EmptyFeatures
            onClearFilter={() => go('emptyFeatures')}
            onRequestFeature={() => go('home')}
          />
        )

      case 'noSearchResults':
        return (
          <NoSearchResults
            query="example"
            onClear={() => go('search')}
          />
        )

      case 'genericError':
        return (
          <GenericError
            onRetry={() => go('home')}
            onBack={() => go('home')}
            errorCode="ERR_500"
          />
        )

      case 'notFound':
        return (
          <NotFound
            onHome={() => go('home')}
            path="/unknown-page"
          />
        )

      case 'retryLoading':
        return (
          <RetryLoading
            onRetry={() => go('home')}
            onBack={() => go('home')}
          />
        )

      case 'somethingWentWrong':
        return (
          <SomethingWentWrong
            onRetry={() => go('home')}
            onContactSupport={() => go('contactSupport')}
            onHome={() => go('home')}
            errorId="ERR-20260901-001"
          />
        )

      default:
        return null
    }
  }

  return (
    /* PhoneFrame provides the 390×844 canvas and status bar */
    <PhoneFrame>
      <div
        key={current}
        className="animate-fade-in relative"
        style={{ animationDuration: current === 'splash' ? '0ms' : '180ms', minHeight: '100%' }}
      >
        {renderScreen()}
        {/* Quick-action toolbar — shown only while inside the app */}
        {['home','paymentsHub','sendMethod','contactPicker','walletDetail','transactionHistory',
          'goals','finaChat','ainaChat','notifications','merchantHome','merchantNotifications',
          'merchantPaymentsHub','cryptoHome','profile','merchantProfile',
        ].includes(current) && (
          <QuickActionToolbar
            onSend={() => go('sendMethod')}
            onScanQR={() => go('scanQR')}
            onAI={() => go(accountType === 'business' ? 'ainaChat' : 'finaChat')}
            onNotifications={() => go(accountType === 'business' ? 'merchantNotifications' : 'notifications')}
          />
        )}
      </div>

      {/* ── Dev navigator — screen picker, hidden during splash ── */}
      {current !== 'splash' && (
        <>
          <button
            onClick={() => setShowNav(n => !n)}
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}
            className="w-11 h-11 rounded-full bg-surface border border-[color:var(--color-border)] flex items-center justify-center shadow-[var(--shadow-lg)] transition-all duration-[250ms] hover:border-accent/40"
            aria-label="Screen navigator"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
              className={`transition-transform duration-[250ms] ${showNav ? 'rotate-45' : ''}`}>
              <path d="M2 4h12M2 8h12M2 12h12" stroke="#AFC5FF" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {showNav && (
            <div style={{ position: 'fixed', bottom: 80, right: 24, zIndex: 9999, width: 200, maxHeight: '70vh' }}
              className="rounded-[--radius-2xl] glass border border-[color:var(--color-border)] shadow-[var(--shadow-lg)] animate-scale-in overflow-hidden">
              <div className="px-4 py-3 border-b border-[color:var(--color-border)]">
                <p className="font-body text-xs text-text-muted uppercase tracking-widest">Screens</p>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(70vh - 48px)' }}>
                {GROUPS.map(group => (
                  <div key={group}>
                    <p className="px-4 pt-3 pb-1 font-body text-[10px] text-text-muted uppercase tracking-widest">{group}</p>
                    {NAV_ITEMS.filter(i => i.group === group).map(item => (
                      <button key={item.id} onClick={() => go(item.id)}
                        className={`w-full flex items-center gap-2 px-4 py-2 font-body text-xs transition-colors duration-[200ms] text-left ${current === item.id ? 'text-accent bg-primary/8' : 'text-text-2 hover:text-text hover:bg-surface'}`}>
                        <span className="flex-1">{item.label}</span>
                        {current === item.id && <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </PhoneFrame>
  )
}
