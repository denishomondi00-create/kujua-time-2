import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientNote } from '../schemas/client-note.schema';

@Injectable()
export class ClientNotesRepository {
  constructor(@InjectModel(ClientNote.name) private readonly model: Model<ClientNote>) {}

  async listByClient(workspaceId: string, clientId: string) { return this.model.find({ workspaceId, clientId }).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<ClientNote>) { return this.model.create(data); }
  async updateById(id: string, data: Partial<ClientNote>) { return this.model.findByIdAndUpdate(id, data, { new: true }).exec(); }
}
