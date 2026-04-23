import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '../repositories/reports.repository';
@Injectable()
export class ReportsService {
  constructor(private readonly repo: ReportsRepository) {}
  async getOverview(workspaceId: string) {
    const snapshots = await this.repo.findMany({ workspaceId, report: 'overview' });
    return snapshots[0] ?? { workspaceId, report: 'overview', payload: { totalBookings: 0, totalRevenue: 0, noShowRate: 0 } };
  }
  async export(workspaceId: string, report: string) { return { workspaceId, report, status: 'queued', message: 'Report export scaffold created.' }; }
}
