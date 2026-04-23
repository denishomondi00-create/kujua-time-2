import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WorkspaceMember } from '../schemas/workspace-member.schema';

@Injectable()
export class WorkspaceMembersRepository {
  constructor(@InjectModel(WorkspaceMember.name) private readonly model: Model<WorkspaceMember>) {}

  async findByWorkspace(workspaceId: string) { return this.model.find({ workspaceId }).exec(); }
  async findById(id: string) { return this.model.findById(id).exec(); }
  async create(data: Partial<WorkspaceMember>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<WorkspaceMember>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
  async deleteById(id: string) { return this.model.findByIdAndDelete(id).exec(); }
}
