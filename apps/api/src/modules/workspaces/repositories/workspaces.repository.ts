import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Workspace } from '../schemas/workspace.schema';

@Injectable()
export class WorkspacesRepository {
  constructor(@InjectModel(Workspace.name) private readonly model: Model<Workspace>) {}

  async findById(id: string) { return this.model.findById(id).exec(); }
  async findBySlug(slug: string) { return this.model.findOne({ slug }).exec(); }
  async create(data: Partial<Workspace>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<Workspace>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
}
