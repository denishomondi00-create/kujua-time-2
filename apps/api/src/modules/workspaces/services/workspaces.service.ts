import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkspacesRepository } from '../repositories/workspaces.repository';

@Injectable()
export class WorkspacesService {
  constructor(private readonly repo: WorkspacesRepository) {}

  async findById(id: string) {
    const ws = await this.repo.findById(id);
    if (!ws) throw new NotFoundException('Workspace not found.');
    return ws;
  }

  async findBySlug(slug: string) { return this.repo.findBySlug(slug); }
  async create(data: any) { return this.repo.create(data); }
  async update(id: string, data: any) { return this.repo.updateById(id, data); }

  async getBranding(id: string) {
    const ws = await this.findById(id);
    return { accentColor: ws.accentColor, logoUrl: ws.logoUrl, coverImageUrl: ws.coverImageUrl, tagline: ws.tagline };
  }

  async updateBranding(id: string, data: any) { return this.repo.updateById(id, data); }
}
