export interface BookingBase {
  workspaceId: string;
  eventTypeId: string;
  clientId: string;
  startAt: string;
  endAt: string;
  timezone: string;
  status: 'pending_approval' | 'confirmed' | 'canceled' | 'rescheduled' | 'completed' | 'no_show';
  source: 'booking_page' | 'embed' | 'api' | 'manual';
  reference: string;
  meetingLocation?: MeetingLocationInfo;
  paymentId?: string;
  notes?: string;
  cancelReason?: string;
  rescheduledFromId?: string;
}

export interface MeetingLocationInfo {
  type: 'in_person' | 'zoom' | 'google_meet' | 'phone' | 'whatsapp' | 'custom';
  value?: string;
  instructions?: string;
}

export interface BookingSlot {
  startAt: string;
  endAt: string;
  available: boolean;
}

export interface BookingHoldInput {
  eventTypeId: string;
  startAt: string;
  endAt: string;
  timezone: string;
  clientName: string;
  clientEmail: string;
}
