import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkspaceMembersRepository } from '../repositories/workspace-members.repository';

@Injectable()
export class WorkspaceMembersService {
  constructor(private readonly repo: WorkspaceMembersRepository) {}

  async listByWorkspace(workspaceId: string) { return this.repo.findByWorkspace(workspaceId); }

  async invite(workspaceId: string, data: { email: string; role?: string }) {
    return this.repo.create({ workspaceId, userId: '', invitedEmail: data.email, role: data.role ?? 'member', status: 'invited' });
  }

  async updateRole(memberId: string, role: string) {
    const member = await this.repo.findById(memberId);
    if (!member) throw new NotFoundException('Member not found.');
    return this.repo.updateById(memberId, { role });
  }

  async remove(memberId: string) {
    const member = await this.repo.findById(memberId);
    if (!member) throw new NotFoundException('Member not found.');
    return this.repo.deleteById(memberId);
  }
}
