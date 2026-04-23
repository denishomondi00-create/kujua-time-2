import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { getTraceId } from '../../infra/observability/tracing.module';

/**
 * LoggingInterceptor
 *
 * Logs every request with method, URL, status code, and duration.
 * Includes trace ID for correlation with downstream logs.
 *
 * In production, outputs structured JSON.
 * In development, outputs readable one-liners.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip } = request;
    const traceId = getTraceId();
    const startTime = Date.now();
    const userId = request.user?.id ?? 'anonymous';

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const duration = Date.now() - startTime;
          const statusCode = response.statusCode;

          this.logger.log(
            `${method} ${url} ${statusCode} ${duration}ms` +
            ` | user=${userId} trace=${traceId} ip=${ip}`,
          );
        },
        error: (error) => {
          const duration = Date.now() - startTime;
          const statusCode = error?.status ?? error?.getStatus?.() ?? 500;

          this.logger.warn(
            `${method} ${url} ${statusCode} ${duration}ms` +
            ` | user=${userId} trace=${traceId} ip=${ip}` +
            ` | error=${error.message}`,
          );
        },
      }),
    );
  }
}
