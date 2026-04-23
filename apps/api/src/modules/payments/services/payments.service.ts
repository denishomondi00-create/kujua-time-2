import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentsRepository } from '../repositories/payments.repository';
import { randomBytes } from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private readonly repo: PaymentsRepository) {}

  async list(workspaceId: string, filters?: any) { return this.repo.findByWorkspace(workspaceId, filters); }
  async findById(id: string) { const p = await this.repo.findById(id); if (!p) throw new NotFoundException('Payment not found.'); return p; }
  async getProviders(workspaceId: string) { return { items: [{ provider: 'stripe', connected: false }, { provider: 'paystack', connected: false }] }; }
  async getPayouts(workspaceId: string) { return { items: [], total: 0 }; }

  async createCheckout(holdId: string, provider?: string) {
    const reference = `pay_${randomBytes(8).toString('hex')}`;
    const payment = await this.repo.create({ holdId, provider: provider ?? 'stripe', status: 'pending', amount: 0, currency: 'USD', reference, workspaceId: '' });
    return { checkoutUrl: undefined, paymentAttemptId: payment.id, provider: payment.provider, status: 'pending' };
  }

  async getPaymentStatus(paymentAttemptId: string) {
    const payment = await this.repo.findById(paymentAttemptId);
    if (!payment) throw new NotFoundException('Payment not found.');
    return { status: payment.status, booking: payment.status === 'succeeded' ? { publicBookingToken: '' } : undefined };
  }

  async refund(paymentId: string, data: { amount?: number; reason?: string }) {
    return this.repo.updateById(paymentId, { status: 'refunded', refundedAmount: data.amount, refundReason: data.reason });
  }

  async handleStripeWebhook(body: any, signature: string) { /* Verify + process */ }
  async handlePaystackWebhook(body: any) { /* Verify + process */ }

  async startStripeConnect(workspaceId: string) { return { redirectUrl: 'https://connect.stripe.com/oauth/authorize' }; }
  async handleStripeConnectCallback(code: string) { return { connected: true }; }
  async startPaystackConnect(workspaceId: string) { return { redirectUrl: 'https://dashboard.paystack.co' }; }
}
