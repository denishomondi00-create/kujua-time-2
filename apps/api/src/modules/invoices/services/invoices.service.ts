import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoicesRepository } from '../repositories/invoices.repository';

@Injectable()
export class InvoicesService {
  constructor(private readonly repo: InvoicesRepository) {}

  async list(workspaceId: string, filters?: any) { return this.repo.findByWorkspace(workspaceId, filters); }
  async findById(id: string) { const inv = await this.repo.findById(id); if (!inv) throw new NotFoundException('Invoice not found.'); return inv; }
  async create(workspaceId: string, data: any) {
    const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;
    return this.repo.create({ ...data, workspaceId, invoiceNumber });
  }
  async send(id: string) { return this.repo.updateById(id, { status: 'sent', sentAt: new Date() }); }
  async markPaid(id: string) { return this.repo.updateById(id, { status: 'paid', paidAt: new Date() }); }
  async void_(id: string) { return this.repo.updateById(id, { status: 'void' }); }
  async getPdf(id: string) { return { url: `/invoices/${id}.pdf` }; }
}
