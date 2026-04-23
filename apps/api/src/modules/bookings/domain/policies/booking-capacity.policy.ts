import { DomainException } from '../../../../shared/exceptions/domain.exception';

export class BookingCapacityPolicy {
  /**
   * Enforce capacity limit for group events.
   * For 1:1, capacity is always 1.
   */
  static enforce(currentCount: number, maxCapacity: number): void {
    if (currentCount >= maxCapacity) {
      throw new DomainException('This time slot is fully booked.');
    }
  }
}
