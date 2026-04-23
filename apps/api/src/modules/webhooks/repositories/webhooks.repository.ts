import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WebhookConfig } from '../schemas/webhook-config.schema';
@Injectable()
export class WebhooksRepository {
  constructor(@InjectModel(WebhookConfig.name) private readonly model: Model<WebhookConfig>) {}
  async findMany(filter: Record<string, unknown> = {}) { return this.model.find(filter).sort({ createdAt: -1 }).exec(); }
  async create(data: Partial<WebhookConfig>) { return this.model.create(data); }
  async deleteById(id: string) { return this.model.findByIdAndDelete(id).exec(); }
}
