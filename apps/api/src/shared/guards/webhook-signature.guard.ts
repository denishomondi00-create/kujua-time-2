import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { hmacSha512, secureCompare } from '../utils/crypto';

export const WEBHOOK_PROVIDER_KEY = 'webhook_provider';

export const WebhookProvider = (provider: string) =>
  SetMetadata(WEBHOOK_PROVIDER_KEY, provider);

@Injectable()
export class WebhookSignatureGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const provider = this.reflector.get<string>(WEBHOOK_PROVIDER_KEY, context.getHandler());

    switch (provider) {
      case 'stripe':
        return this.verifyStripe(request);
      case 'paystack':
        return this.verifyPaystack(request);
      default:
        return this.verifyGeneric(request);
    }
  }

  private verifyStripe(request: any): boolean {
    const signature = request.headers['stripe-signature'];
    if (!signature) {
      throw new BadRequestException('Missing Stripe webhook signature.');
    }

    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret) {
      throw new BadRequestException('Stripe webhook secret not configured.');
    }

    if (!signature.includes('t=') || !signature.includes('v1=')) {
      throw new BadRequestException('Invalid Stripe signature format.');
    }

    return true;
  }

  private verifyPaystack(request: any): boolean {
    const signature = request.headers['x-paystack-signature'];
    if (!signature) {
      throw new BadRequestException('Missing Paystack webhook signature.');
    }

    const secret = this.config.get<string>('PAYSTACK_SECRET_KEY');
    if (!secret) {
      throw new BadRequestException('Paystack secret key not configured.');
    }

    const rawBody = request.rawBody
      ? Buffer.isBuffer(request.rawBody)
        ? request.rawBody.toString('utf8')
        : String(request.rawBody)
      : typeof request.body === 'string'
        ? request.body
        : JSON.stringify(request.body ?? {});

    const expectedSignature = hmacSha512(rawBody, secret);
    if (!secureCompare(signature, expectedSignature)) {
      throw new BadRequestException('Invalid Paystack webhook signature.');
    }

    return true;
  }

  private verifyGeneric(request: any): boolean {
    const signature =
      request.headers['x-webhook-signature'] ??
      request.headers['x-hub-signature-256'];

    if (!signature) {
      throw new BadRequestException('Missing webhook signature.');
    }

    return true;
  }
}
