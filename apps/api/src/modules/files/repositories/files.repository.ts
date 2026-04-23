import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileRecord } from '../schemas/file-record.schema';

@Injectable()
export class FilesRepository {
  constructor(@InjectModel(FileRecord.name) private readonly model: Model<FileRecord>) {}

  async listByClient(workspaceId: string, clientId: string) { return this.model.find({ workspaceId, clientId }).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<FileRecord>) { return this.model.create(data); }
}
