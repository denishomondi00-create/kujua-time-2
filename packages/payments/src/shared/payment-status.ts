import type { PaymentStatus } from './payment.types';

export function isTerminalStatus(status: PaymentStatus): boolean {
  return ['succeeded', 'failed', 'refunded', 'canceled'].includes(status);
}

export function canRefund(status: PaymentStatus): boolean {
  return status === 'succeeded';
}

export function canRetry(status: PaymentStatus): boolean {
  return status === 'failed';
}
