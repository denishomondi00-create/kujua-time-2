import { BookingStatus } from '../value-objects/booking-status.vo';
import { BookingTimeRange } from '../value-objects/booking-time-range.vo';
import { BookingSource } from '../value-objects/booking-source.vo';

export interface BookingEntity {
  id: string;
  workspaceId: string;
  eventTypeId: string;
  eventTypeName: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  timeRange: BookingTimeRange;
  timezone: string;
  status: BookingStatus;
  paymentStatus: string;
  amount?: number;
  currency: string;
  source: BookingSource;
  reference: string;
  publicBookingToken: string;
  meetingLocation?: string;
  notes?: string;
  formResponses?: Record<string, unknown>;
  holdId?: string;
  paymentId?: string;
  canceledAt?: Date;
  cancelReason?: string;
  completedAt?: Date;
  noShowAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
