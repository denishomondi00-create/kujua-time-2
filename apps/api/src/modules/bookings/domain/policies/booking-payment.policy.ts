import { DomainException } from '../../../../shared/exceptions/domain.exception';

export class BookingPaymentPolicy {
  /**
   * Enforce payment requirement before confirmation.
   */
  static enforce(paymentRequired: boolean, paymentStatus?: string): void {
    if (paymentRequired && paymentStatus !== 'paid' && paymentStatus !== 'partial') {
      throw new DomainException('Payment is required to confirm this booking.');
    }
  }
}
