import { Module, Global, LoggerService, Injectable, LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * KujuaLogger
 *
 * Structured logger that outputs JSON in production and
 * pretty-printed text in development.
 * Wraps NestJS LoggerService for DI compatibility.
 */
@Injectable()
export class KujuaLogger implements LoggerService {
  private readonly isProduction: boolean;
  private minLevel: number;

  private static readonly LEVELS: Record<string, number> = {
    error: 0,
    warn: 1,
    log: 2,
    debug: 3,
    verbose: 4,
  };

  constructor(private readonly config: ConfigService) {
    this.isProduction = config.get<string>('NODE_ENV', 'development') === 'production';
    const configLevel = config.get<string>('LOG_LEVEL', this.isProduction ? 'log' : 'debug');
    this.minLevel = KujuaLogger.LEVELS[configLevel] ?? 2;
  }

  log(message: any, context?: string) {
    this.write('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.write('error', message, context, { trace });
  }

  warn(message: any, context?: string) {
    this.write('warn', message, context);
  }

  debug?(message: any, context?: string) {
    this.write('debug', message, context);
  }

  verbose?(message: any, context?: string) {
    this.write('verbose', message, context);
  }

  setLogLevels?(levels: LogLevel[]) {
    // Used by NestJS runtime; we control via config instead
  }

  private write(
    level: string,
    message: any,
    context?: string,
    extra?: Record<string, any>,
  ) {
    const numericLevel = KujuaLogger.LEVELS[level] ?? 2;
    if (numericLevel > this.minLevel) return;

    if (this.isProduction) {
      const entry: Record<string, any> = {
        level,
        timestamp: new Date().toISOString(),
        context: context ?? 'App',
        message: typeof message === 'string' ? message : JSON.stringify(message),
        ...extra,
      };
      process.stdout.write(JSON.stringify(entry) + '\n');
    } else {
      const prefix = `[${context ?? 'App'}]`;
      const levelTag = level.toUpperCase().padEnd(7);
      const timestamp = new Date().toISOString();
      console.log(`${timestamp} ${levelTag} ${prefix} ${message}`);
      if (extra?.trace) console.log(extra.trace);
    }
  }
}

@Global()
@Module({
  providers: [
    {
      provide: KujuaLogger,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => new KujuaLogger(config),
    },
  ],
  exports: [KujuaLogger],
})
export class LoggingModule {}
