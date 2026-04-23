export interface FeatureFlag {
  key: string
  defaultValue: boolean
  description: string
}

export const FEATURE_FLAGS: Record<string, FeatureFlag> = {
  GROUP_BOOKINGS: {
    key: 'group_bookings',
    defaultValue: false,
    description: 'Enable group booking sessions',
  },
  WAITLIST: {
    key: 'waitlist',
    defaultValue: false,
    description: 'Enable waitlist for fully booked events',
  },
  AI_NOTES: {
    key: 'ai_notes',
    defaultValue: false,
    description: 'Enable AI session note generation',
  },
  WHITE_LABEL: {
    key: 'white_label',
    defaultValue: false,
    description: 'Enable white-label domain support',
  },
  SMS_NOTIFICATIONS: {
    key: 'sms_notifications',
    defaultValue: false,
    description: 'Enable SMS notification channel',
  },
  WHATSAPP_NOTIFICATIONS: {
    key: 'whatsapp_notifications',
    defaultValue: false,
    description: 'Enable WhatsApp messaging',
  },
  CLIENT_PORTAL: {
    key: 'client_portal',
    defaultValue: false,
    description: 'Enable client self-service portal',
  },
  PACKAGES_PASSES: {
    key: 'packages_passes',
    defaultValue: false,
    description: 'Enable session packs and passes',
  },
}

export function isFeatureEnabled(
  key: string,
  overrides?: Record<string, boolean>
): boolean {
  const overrideValue = overrides?.[key]

  if (typeof overrideValue === 'boolean') {
    return overrideValue
  }

  const flag = FEATURE_FLAGS[key]
  return flag?.defaultValue ?? false
}