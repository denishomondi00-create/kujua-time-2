export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  service?: string;
  traceId?: string;
  workspaceId?: string;
  userId?: string;
  [key: string]: unknown;
}

export function createLogger(service: string) {
  const log = (level: LogLevel, message: string, ctx?: LogContext) => {
    const entry = { level, message, service, timestamp: new Date().toISOString(), ...ctx };
    const fn = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
    fn(JSON.stringify(entry));
  };

  return {
    debug: (msg: string, ctx?: LogContext) => log('debug', msg, ctx),
    info: (msg: string, ctx?: LogContext) => log('info', msg, ctx),
    warn: (msg: string, ctx?: LogContext) => log('warn', msg, ctx),
    error: (msg: string, ctx?: LogContext) => log('error', msg, ctx),
  };
}
