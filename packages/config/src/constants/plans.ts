export const PLANS = {
  FREE: 'free',
  STANDARD: 'standard',
  PRO: 'pro',
  PREMIUM: 'premium',
} as const;

export type PlanId = (typeof PLANS)[keyof typeof PLANS];

export interface PlanLimits {
  maxUsers: number;
  maxEventTypes: number;
  maxConnectedCalendars: number;
  twoWaySync: boolean;
  customBranding: boolean;
  forms: boolean;
  automations: boolean;
  groupBookings: boolean;
  packages: boolean;
  invoices: boolean;
  roundRobin: boolean;
  collectiveScheduling: boolean;
  advancedAnalytics: boolean;
  whiteLabel: boolean;
  platformFeePercent: number;
}

export const PLAN_LIMITS: Record<PlanId, PlanLimits> = {
  free: {
    maxUsers: 1, maxEventTypes: 1, maxConnectedCalendars: 1,
    twoWaySync: false, customBranding: false, forms: false, automations: false,
    groupBookings: false, packages: false, invoices: false, roundRobin: false,
    collectiveScheduling: false, advancedAnalytics: false, whiteLabel: false,
    platformFeePercent: 4,
  },
  standard: {
    maxUsers: 1, maxEventTypes: -1, maxConnectedCalendars: 6,
    twoWaySync: true, customBranding: true, forms: true, automations: true,
    groupBookings: false, packages: false, invoices: false, roundRobin: false,
    collectiveScheduling: false, advancedAnalytics: false, whiteLabel: false,
    platformFeePercent: 0,
  },
  pro: {
    maxUsers: 10, maxEventTypes: -1, maxConnectedCalendars: -1,
    twoWaySync: true, customBranding: true, forms: true, automations: true,
    groupBookings: true, packages: true, invoices: true, roundRobin: true,
    collectiveScheduling: true, advancedAnalytics: true, whiteLabel: false,
    platformFeePercent: 0,
  },
  premium: {
    maxUsers: -1, maxEventTypes: -1, maxConnectedCalendars: -1,
    twoWaySync: true, customBranding: true, forms: true, automations: true,
    groupBookings: true, packages: true, invoices: true, roundRobin: true,
    collectiveScheduling: true, advancedAnalytics: true, whiteLabel: true,
    platformFeePercent: 0,
  },
};
