/**
 * Read model projections for analytics dashboards.
 */

export interface BookingSummary {
  workspaceId: string;
  date: string;
  totalBookings: number;
  confirmedBookings: number;
  canceledBookings: number;
  noShows: number;
  completedBookings: number;
}

export interface RevenueSummary {
  workspaceId: string;
  date: string;
  totalRevenue: number;
  currency: string;
  transactionCount: number;
  refundCount: number;
  refundAmount: number;
}

export interface ConversionMetrics {
  workspaceId: string;
  period: string;
  pageViews: number;
  bookingStarts: number;
  bookingsCompleted: number;
  conversionRate: number;
}
