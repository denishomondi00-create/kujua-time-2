import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AutomationRule } from '../schemas/automation-rule.schema';
import { AutomationExecution } from '../schemas/automation-execution.schema';

@Injectable()
export class AutomationsRepository {
  constructor(
    @InjectModel(AutomationRule.name) private readonly ruleModel: Model<AutomationRule>,
    @InjectModel(AutomationExecution.name) private readonly execModel: Model<AutomationExecution>,
  ) {}

  async findRulesByWorkspace(workspaceId: string) {
    const items = await this.ruleModel.find({ workspaceId }).sort({ createdAt: -1 }).exec();
    return { items, total: items.length };
  }

  async findRuleById(id: string) { return this.ruleModel.findById(id).exec(); }
  async createRule(data: Partial<AutomationRule>) { return this.ruleModel.create(data); }
  async updateRule(id: string, data: Partial<AutomationRule>) { return this.ruleModel.findByIdAndUpdate(id, data, { new: true }).exec(); }

  async findExecutionsByWorkspace(workspaceId: string) {
    const items = await this.execModel.find({ workspaceId }).sort({ createdAt: -1 }).limit(100).exec();
    return { items, total: items.length };
  }

  async findExecutionById(id: string) { return this.execModel.findById(id).exec(); }
  async createExecution(data: Partial<AutomationExecution>) { return this.execModel.create(data); }
}
