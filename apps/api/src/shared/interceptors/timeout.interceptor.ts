import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
  SetMetadata,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

export const TIMEOUT_KEY = 'request_timeout';

/**
 * Decorator to set a custom timeout on a specific route handler.
 * @param ms Timeout in milliseconds
 *
 * Usage: @RequestTimeout(60_000) for 60s timeout
 */
export const RequestTimeout = (ms: number) => SetMetadata(TIMEOUT_KEY, ms);

/**
 * TimeoutInterceptor
 *
 * Enforces a maximum request duration.
 * Default: 30s. Override per-route with @RequestTimeout().
 *
 * Long-running operations (report exports, bulk imports)
 * should use @RequestTimeout(120_000) or delegate to BullMQ workers.
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private static readonly DEFAULT_TIMEOUT_MS = 30_000;

  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const customTimeout = this.reflector.get<number>(
      TIMEOUT_KEY,
      context.getHandler(),
    );
    const timeoutMs = customTimeout ?? TimeoutInterceptor.DEFAULT_TIMEOUT_MS;

    return next.handle().pipe(
      timeout(timeoutMs),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () => new RequestTimeoutException(`Request timed out after ${timeoutMs}ms.`),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
