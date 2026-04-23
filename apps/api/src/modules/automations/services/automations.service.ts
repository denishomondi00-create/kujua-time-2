import { Injectable, NotFoundException } from '@nestjs/common';
import { AutomationsRepository } from '../repositories/automations.repository';

const TEMPLATES = [
  { id: 'tpl-confirm', name: 'Booking confirmation', description: 'Send confirmation email when a booking is created.', triggerEvent: 'booking.created', actions: [{ id: 'a1', type: 'send_email', label: 'Send confirmation email', config: {} }] },
  { id: 'tpl-reminder-24h', name: '24h reminder', description: 'Send a reminder 24 hours before the booking.', triggerEvent: 'booking.created', actions: [{ id: 'a1', type: 'send_email', label: 'Send reminder email', config: { delayHours: 24 } }] },
  { id: 'tpl-payment-receipt', name: 'Payment receipt', description: 'Send receipt when payment succeeds.', triggerEvent: 'payment.succeeded', actions: [{ id: 'a1', type: 'send_email', label: 'Send payment receipt', config: {} }] },
  { id: 'tpl-no-show', name: 'No-show follow-up', description: 'Send rebook prompt when a booking is marked no-show.', triggerEvent: 'booking.no_show', actions: [{ id: 'a1', type: 'send_email', label: 'Send rebook prompt', config: {} }] },
];

@Injectable()
export class AutomationsService {
  constructor(private readonly repo: AutomationsRepository) {}

  async list(workspaceId: string) { return this.repo.findRulesByWorkspace(workspaceId); }
  async findById(id: string) { const r = await this.repo.findRuleById(id); if (!r) throw new NotFoundException('Automation not found.'); return r; }
  async create(workspaceId: string, data: any) { return this.repo.createRule({ ...data, workspaceId }); }
  async update(id: string, data: any) { await this.findById(id); return this.repo.updateRule(id, data); }
  async toggle(id: string) { const rule = await this.findById(id); return this.repo.updateRule(id, { enabled: !rule.enabled }); }
  async templates() { return { items: TEMPLATES, total: TEMPLATES.length }; }
  async logs(workspaceId: string) { return this.repo.findExecutionsByWorkspace(workspaceId); }
  async logDetail(executionId: string) { return this.repo.findExecutionById(executionId); }
  async test(automationId: string) { return { success: true, message: 'Test execution queued.' }; }
}
