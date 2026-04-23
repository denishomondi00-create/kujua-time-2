import { Injectable } from '@nestjs/common';
import { AvailabilityRepository } from '../repositories/availability.repository';

@Injectable()
export class AvailabilityService {
  constructor(private readonly repo: AvailabilityRepository) {}

  async getRules(workspaceId: string, eventTypeId?: string) { return this.repo.findRules(workspaceId, eventTypeId); }
  async setRules(workspaceId: string, eventTypeId: string | undefined, data: any) { return this.repo.upsertRule(workspaceId, eventTypeId, data); }
  async getExceptions(workspaceId: string) { return this.repo.findExceptions(workspaceId); }
  async createException(workspaceId: string, data: any) { return this.repo.createException({ ...data, workspaceId }); }
  async deleteException(id: string) { return this.repo.deleteException(id); }
}
