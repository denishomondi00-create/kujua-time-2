import { Injectable } from '@nestjs/common';
import { CalendarsRepository } from '../repositories/calendars.repository';
@Injectable()
export class CalendarsService {
  constructor(private readonly repo: CalendarsRepository) {}
  async list(workspaceId: string) { return this.repo.listByWorkspace(workspaceId); }
  async startGoogleConnect(workspaceId: string) { return { workspaceId, provider: 'google', url: `/v1/calendars/google/connect/callback?workspaceId=${workspaceId}` }; }
  async disconnect(id: string) { await this.repo.deleteById(id); return { success: true }; }
}
