import { Injectable, NotFoundException } from '@nestjs/common';
import { PaymentsRepository } from '../repositories/payments.repository';
import { randomBytes } from 'crypto';
import { BookingHoldsService } from '../../booking-holds/services/booking-holds.service';
import { EventTypesService } from '../../event-types/services/event-types.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly repo: PaymentsRepository,
    private readonly bookingHoldsService: BookingHoldsService,
    private readonly eventTypesService: EventTypesService,
  ) {}

  async list(workspaceId: string, filters?: any) { return this.repo.findByWorkspace(workspaceId, filters); }
  async findById(id: string) { const p = await this.repo.findById(id); if (!p) throw new NotFoundException('Payment not found.'); return p; }
  async getProviders(workspaceId: string) { return { items: [{ provider: 'stripe', connected: false }, { provider: 'paystack', connected: false }] }; }
  async getPayouts(workspaceId: string) { return { items: [], total: 0 }; }

  async createCheckout(holdId: string, provider?: string) {
    const hold = await this.bookingHoldsService.findById(holdId);
    if (!hold || hold.status !== 'active') throw new NotFoundException('Hold not found or expired.');
    const eventType = await this.eventTypesService.findById(hold.eventTypeId);
    const paymentConfig = eventType.payment ?? { mode: 'free', amount: 0, currency: 'USD' };
    const amount = paymentConfig.mode === 'free' ? 0 : Number(paymentConfig.amount ?? 0);
    const reference = `pay_${randomBytes(8).toString('hex')}`;
    const payment = await this.repo.create({
      holdId,
      provider: provider ?? 'manual',
      status: 'pending',
      amount,
      currency: paymentConfig.currency ?? 'USD',
      reference,
      providerPaymentId: reference,
      workspaceId: hold.workspaceId,
      clientName: hold.client?.fullName,
    });

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

  async markSucceeded(paymentAttemptId: string, data: { bookingId?: string; clientId?: string; clientName?: string } = {}) {
    const payment = await this.repo.updateById(paymentAttemptId, { status: 'succeeded', ...data });
    if (!payment) throw new NotFoundException('Payment not found.');
    return payment;
  }

  async handleStripeWebhook(body: any, signature: string) { /* Verify + process */ }
  async handlePaystackWebhook(body: any) { /* Verify + process */ }

  async startStripeConnect(workspaceId: string) { return { redirectUrl: 'https://connect.stripe.com/oauth/authorize' }; }
  async handleStripeConnectCallback(code: string) { return { connected: true }; }
  async startPaystackConnect(workspaceId: string) { return { redirectUrl: 'https://dashboard.paystack.co' }; }
}
