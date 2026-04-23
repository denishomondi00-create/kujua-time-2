import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FormResponse } from '../schemas/form-response.schema';
@Injectable()
export class FormResponsesRepository {
  constructor(@InjectModel(FormResponse.name) private readonly model: Model<FormResponse>) {}
  async listByWorkspace(workspaceId: string) { return this.model.find({ workspaceId }).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<FormResponse>) { return this.model.create(data); }
  async findById(id: string) { return this.model.findById(id).exec(); }
}
