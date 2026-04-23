import { Module, Global, Injectable, NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response, NextFunction } from 'express';
import { AsyncLocalStorage } from 'async_hooks';

/**
 * Trace context for request correlation.
 * Uses AsyncLocalStorage so trace IDs propagate through async calls
 * without explicit parameter threading.
 */
export interface TraceContext {
  traceId: string;
  spanId?: string;
  parentSpanId?: string;
  startedAt: number;
}

const traceStorage = new AsyncLocalStorage<TraceContext>();

/**
 * Get the current trace context.
 */
export function getTraceContext(): TraceContext | undefined {
  return traceStorage.getStore();
}

/**
 * Get the current trace ID, or generate one if none exists.
 */
export function getTraceId(): string {
  return traceStorage.getStore()?.traceId ?? randomUUID();
}

/**
 * TracingMiddleware
 *
 * Attaches a trace ID to every incoming request.
 * Respects X-Trace-Id header from upstream proxies,
 * otherwise generates a new UUID.
 */
@Injectable()
export class TracingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const traceId = (req.headers['x-trace-id'] as string) ?? randomUUID();

    const context: TraceContext = {
      traceId,
      startedAt: Date.now(),
    };

    // Set response header for client correlation
    res.setHeader('x-trace-id', traceId);

    traceStorage.run(context, () => {
      next();
    });
  }
}

@Global()
@Module({
  providers: [TracingMiddleware],
  exports: [TracingMiddleware],
})
export class TracingModule {}
