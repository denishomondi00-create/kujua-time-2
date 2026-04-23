import { Injectable } from '@nestjs/common';
import { CalendarSyncRepository } from '../repositories/calendar-sync.repository';
@Injectable()
export class CalendarSyncService {
  constructor(private readonly repo: CalendarSyncRepository) {}
  async run(connectedCalendarId: string, forceFullSync = false) {
    const state = await this.repo.upsertState(connectedCalendarId, { status: 'queued', lastRequestedAt: new Date(), forceFullSync });
    return { success: true, connectedCalendarId, status: state?.status ?? 'queued', forceFullSync };
  }
  async getState(connectedCalendarId: string) { return this.repo.findByConnectedCalendarId(connectedCalendarId); }
}
