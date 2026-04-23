import { Injectable, NotFoundException } from '@nestjs/common';
import { FormsRepository } from '../repositories/forms.repository';

@Injectable()
export class FormsService {
  constructor(private readonly repo: FormsRepository) {}

  async list(workspaceId: string, filters?: any) { return this.repo.findByWorkspace(workspaceId, filters); }
  async findById(id: string) { const f = await this.repo.findById(id); if (!f) throw new NotFoundException('Form not found.'); return f; }
  async create(workspaceId: string, data: any) { return this.repo.create({ ...data, workspaceId }); }
  async update(id: string, data: any) { await this.findById(id); return this.repo.updateById(id, data); }
  async delete(id: string) { return this.repo.deleteById(id); }
}
