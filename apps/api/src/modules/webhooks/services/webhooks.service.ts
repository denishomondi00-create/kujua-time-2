import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookConfig } from '../schemas/webhook-config.schema';

@Injectable()
export class WebhooksService {
  constructor(@InjectModel(WebhookConfig.name) private readonly model: Model<WebhookConfig>) {}

  async list(workspaceId: string) { return this.model.find({ workspaceId }).exec(); }
  async create(workspaceId: string, data: any) { return this.model.create({ ...data, workspaceId }); }
  async delete(id: string) { return this.model.findByIdAndDelete(id).exec(); }
}
