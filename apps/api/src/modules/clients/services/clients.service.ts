import { Injectable, NotFoundException } from '@nestjs/common';
import { ClientsRepository } from '../repositories/clients.repository';

@Injectable()
export class ClientsService {
  constructor(private readonly repo: ClientsRepository) {}

  async list(workspaceId: string, filters?: any) { return this.repo.findByWorkspace(workspaceId, filters); }

  async findById(id: string) {
    const client = await this.repo.findById(id);
    if (!client) throw new NotFoundException('Client not found.');
    return client;
  }

  async create(workspaceId: string, data: any) { return this.repo.create({ ...data, workspaceId }); }
  async update(id: string, data: any) { return this.repo.updateById(id, data); }
  async block(id: string) { return this.repo.updateById(id, { isBlocked: true }); }
  async unblock(id: string) { return this.repo.updateById(id, { isBlocked: false }); }
  async findOrCreate(workspaceId: string, data: any) { return this.repo.findOrCreate(workspaceId, data); }
  async export(workspaceId: string) { return { url: `/exports/clients-${workspaceId}.csv` }; }
}
