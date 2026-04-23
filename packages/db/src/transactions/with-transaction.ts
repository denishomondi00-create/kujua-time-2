/**
 * Transaction helper for multi-document atomic writes.
 *
 * Required for:
 * - confirm booking from hold
 * - consume or release booking hold
 * - create booking + client + payment + domain event
 * - cancel booking + free capacity + domain event
 * - issue invoice + attach payment references
 * - reschedule booking + update hold + domain event
 */
import { Connection, ClientSession } from 'mongoose';

export interface TransactionOptions {
  maxRetries?: number;
  readConcern?: string;
  writeConcern?: { w: string | number; j?: boolean };
}

const DEFAULT_OPTIONS: TransactionOptions = {
  maxRetries: 3,
  readConcern: 'snapshot',
  writeConcern: { w: 'majority', j: true },
};

/**
 * Execute a callback within a MongoDB transaction with automatic retry.
 *
 * @example
 * ```ts
 * const result = await withTransaction(connection, async (session) => {
 *   await BookingModel.create([bookingDoc], { session });
 *   await ClientModel.findOneAndUpdate(filter, update, { session });
 *   await DomainEventModel.create([eventDoc], { session });
 *   return bookingDoc;
 * });
 * ```
 */
export async function withTransaction<T>(
  connection: Connection,
  callback: (session: ClientSession) => Promise<T>,
  options?: TransactionOptions,
): Promise<T> {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const session = await connection.startSession();

  let lastError: Error | undefined;

  for (let attempt = 0; attempt < (opts.maxRetries ?? 3); attempt++) {
    try {
      session.startTransaction({
        readConcern: { level: opts.readConcern as any },
        writeConcern: opts.writeConcern as any,
      });

      const result = await callback(session);

      await session.commitTransaction();
      return result;
    } catch (error: any) {
      lastError = error;

      // Abort if transaction is still in progress
      if (session.inTransaction()) {
        await session.abortTransaction();
      }

      // Only retry on transient errors
      const isTransient =
        error.hasErrorLabel?.('TransientTransactionError') ||
        error.code === 112 || // WriteConflict
        error.code === 251;   // TransactionAborted

      if (!isTransient || attempt === (opts.maxRetries ?? 3) - 1) {
        break;
      }

      // Exponential backoff before retry
      await new Promise((r) => setTimeout(r, Math.pow(2, attempt) * 100));
    }
  }

  session.endSession();
  throw lastError;
}
