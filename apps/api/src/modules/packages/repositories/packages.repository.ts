import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PackagePass } from '../schemas/package-pass.schema';

@Injectable()
export class PackagesRepository {
  constructor(@InjectModel(PackagePass.name) private readonly model: Model<PackagePass>) {}

  async listByWorkspace(workspaceId: string) { return this.model.find({ workspaceId }).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<PackagePass>) { return this.model.create(data); }
  async updateById(id: string, data: any) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
}
