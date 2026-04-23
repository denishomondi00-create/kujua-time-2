import {
  Module,
  Global,
  Injectable,
  Logger,
  OnModuleInit,
  Catch,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * SentryService
 *
 * Wraps Sentry SDK for error capture and performance tracing.
 * In development (no DSN configured), errors are logged locally.
 *
 * Production setup requires SENTRY_DSN environment variable.
 */
@Injectable()
export class SentryService implements OnModuleInit {
  private readonly logger = new Logger(SentryService.name);
  private initialized = false;
  private Sentry: any = null;

  constructor(private readonly config: ConfigService) {}

  async onModuleInit() {
    const dsn = this.config.get<string>('SENTRY_DSN');
    if (!dsn) {
      this.logger.log('Sentry DSN not configured — error tracking disabled.');
      return;
    }

    try {
      this.Sentry = await import('@sentry/node');
      this.Sentry.init({
        dsn,
        environment: this.config.get<string>('NODE_ENV', 'development'),
        release: this.config.get<string>('APP_VERSION', '0.0.0'),
        tracesSampleRate: this.config.get<number>('SENTRY_TRACES_SAMPLE_RATE', 0.1),
        integrations: [],
      });
      this.initialized = true;
      this.logger.log('Sentry initialized successfully.');
    } catch (error) {
      this.logger.warn(`Sentry initialization failed: ${(error as Error).message}`);
    }
  }

  /**
   * Capture an exception and send to Sentry.
   */
  captureException(error: Error, context?: Record<string, any>): void {
    if (this.initialized && this.Sentry) {
      this.Sentry.withScope((scope: any) => {
        if (context) {
          scope.setExtras(context);
        }
        this.Sentry.captureException(error);
      });
    } else {
      this.logger.error(`[Untracked] ${error.message}`, error.stack);
    }
  }

  /**
   * Capture a message (non-error event).
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
    if (this.initialized && this.Sentry) {
      this.Sentry.captureMessage(message, level);
    } else {
      this.logger.log(`[Untracked] ${level}: ${message}`);
    }
  }

  /**
   * Set user context for subsequent captures in the current scope.
   */
  setUser(user: { id: string; email?: string; workspaceId?: string }): void {
    if (this.initialized && this.Sentry) {
      this.Sentry.setUser(user);
    }
  }

  /**
   * Add breadcrumb for debugging context.
   */
  addBreadcrumb(params: {
    category: string;
    message: string;
    level?: 'debug' | 'info' | 'warning' | 'error';
    data?: Record<string, any>;
  }): void {
    if (this.initialized && this.Sentry) {
      this.Sentry.addBreadcrumb({
        category: params.category,
        message: params.message,
        level: params.level ?? 'info',
        data: params.data,
      });
    }
  }
}

/**
 * Global exception filter that reports unhandled errors to Sentry.
 * Apply via APP_FILTER provider or in main.ts.
 */
@Catch()
export class SentryExceptionFilter implements ExceptionFilter {
  constructor(private readonly sentry: SentryService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    // Only capture unexpected errors (5xx), not client errors (4xx)
    const status = exception?.getStatus?.() ?? 500;
    if (status >= 500) {
      this.sentry.captureException(exception, {
        url: request.url,
        method: request.method,
        userId: request.user?.id,
        workspaceId: request.user?.workspaceId,
      });
    }

    // Let NestJS default error handling continue
    const message = exception?.response?.message ?? exception?.message ?? 'Internal server error';
    response.status(status).json({
      statusCode: status,
      message,
      ...(status >= 500 ? { error: 'Internal Server Error' } : {}),
    });
  }
}

@Global()
@Module({
  providers: [SentryService, SentryExceptionFilter],
  exports: [SentryService, SentryExceptionFilter],
})
export class SentryModule {}
