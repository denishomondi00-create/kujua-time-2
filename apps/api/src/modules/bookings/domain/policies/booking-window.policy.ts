import { DomainException } from '../../../../shared/exceptions/domain.exception';

export class BookingWindowPolicy {
  /**
   * Enforce min notice and max booking window.
   */
  static enforce(startAt: Date, minNoticeMinutes: number, maxDaysAhead: number): void {
    const now = new Date();
    const minNoticeMs = minNoticeMinutes * 60_000;
    const maxAheadMs = maxDaysAhead * 24 * 60 * 60_000;

    if (startAt.getTime() - now.getTime() < minNoticeMs) {
      throw new DomainException(`Bookings require at least ${minNoticeMinutes} minutes notice.`);
    }

    if (startAt.getTime() - now.getTime() > maxAheadMs) {
      throw new DomainException(`Bookings cannot be made more than ${maxDaysAhead} days in advance.`);
    }
  }
}
