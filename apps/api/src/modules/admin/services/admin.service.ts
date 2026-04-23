import { Injectable } from '@nestjs/common';
import { AdminRepository } from '../repositories/admin.repository';
@Injectable()
export class AdminService {
  constructor(private readonly repo: AdminRepository) {}
  async listActions(workspaceId?: string) { return this.repo.findMany(workspaceId ? { workspaceId } : {}); }
  async updateWorkspacePlan(actorId: string, workspaceId: string, plan: string) {
    return this.repo.create({ actorId, workspaceId, action: 'workspace.plan.updated', metadata: { plan } });
  }
}
