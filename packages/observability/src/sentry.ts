import * as Sentry from '@sentry/node';

export function initSentry(dsn: string | undefined, service: string, environment: string): void {
  if (!dsn) return;
  Sentry.init({ dsn, environment, serverName: service, tracesSampleRate: environment === 'production' ? 0.1 : 1.0 });
}

export function captureException(error: Error, context?: Record<string, unknown>): void {
  Sentry.captureException(error, { extra: context });
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info'): void {
  Sentry.captureMessage(message, level);
}
