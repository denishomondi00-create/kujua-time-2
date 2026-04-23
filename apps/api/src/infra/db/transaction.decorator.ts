import { Inject } from '@nestjs/common';
import { TransactionManager } from './transaction.manager';

/**
 * @Transactional() decorator
 *
 * Wraps a service method in a Mongo transaction.
 * The decorated method receives a ClientSession as its last argument.
 *
 * Usage:
 *   @Transactional()
 *   async confirmBooking(holdId: string, session?: ClientSession) {
 *     // All writes within this method are atomic
 *   }
 *
 * Requirements:
 *   - The class must inject TransactionManager
 *   - The decorated method's last parameter must accept ClientSession
 */
export function Transactional(): MethodDecorator {
  const injectTxManager = Inject(TransactionManager);

  return function (
    target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) {
    // Ensure TransactionManager is injected
    injectTxManager(target, '__txManager__');

    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const txManager: TransactionManager = (this as any).__txManager__;

      if (!txManager) {
        throw new Error(
          `@Transactional() requires TransactionManager to be injectable. ` +
          `Ensure TransactionManager is provided in the module.`,
        );
      }

      // If a session is already passed as the last argument, use it directly
      // (allows nested calls that share the same session)
      const lastArg = args[args.length - 1];
      if (lastArg && typeof lastArg === 'object' && typeof lastArg.startTransaction === 'function') {
        return originalMethod.apply(this, args);
      }

      return txManager.withTransaction(async (session) => {
        return originalMethod.apply(this, [...args, session]);
      });
    };

    return descriptor;
  };
}
