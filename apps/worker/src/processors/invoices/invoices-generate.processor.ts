/**
 * Generates invoices from booking/payment events.
 * Processor for: invoices.generate
 */
import { Worker, Job } from 'bullmq';
import type { ConnectionOptions } from 'bullmq';
import { INVOICES_GENERATE_QUEUE_NAME, type InvoiceGenerateJobData } from '@kujua-time/queue';
import { createLogger } from '@kujua-time/observability';

const logger = createLogger('invoices-generate');

export function registerInvoicesGenerateProcessor(connection: ConnectionOptions, concurrency: number): Worker[] {
  const worker = new Worker<InvoiceGenerateJobData>(
    INVOICES_GENERATE_QUEUE_NAME,
    async (job: Job<InvoiceGenerateJobData>) => {
      const { workspaceId, clientId, bookingId, amount, currency, description, autoSend } = job.data;

      logger.info(`Generating invoice for client ${clientId}`, { workspaceId, bookingId });

      const mongoose = (await import('mongoose')).default;
      const Invoice = mongoose.model('Invoice');
      const Client = mongoose.model('Client');

      const client = await Client.findById(clientId).lean();
      if (!client) {
        logger.warn(`Client ${clientId} not found, skipping invoice`);
        return;
      }

      const invoiceNumber = `INV-${Date.now().toString(36).toUpperCase()}`;

      const invoice = await Invoice.create({
        workspaceId,
        clientId,
        bookingId,
        invoiceNumber,
        amount: amount ?? 0,
        currency: currency ?? 'KES',
        description: description ?? 'Service booking',
        status: 'draft',
        issuedAt: new Date(),
        lineItems: [
          {
            description: description ?? 'Service booking',
            quantity: 1,
            unitPrice: amount ?? 0,
            total: amount ?? 0,
          },
        ],
      });

      logger.info(`Invoice ${invoiceNumber} created`, { invoiceId: invoice._id });

      if (autoSend) {
        await Invoice.updateOne({ _id: invoice._id }, { $set: { status: 'sent', sentAt: new Date() } });
        logger.info(`Invoice ${invoiceNumber} auto-sent`);
      }
    },
    { connection, concurrency },
  );

  return [worker];
}
