import { Module, Global, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * MetricsService
 *
 * Lightweight application metrics for monitoring.
 * In production, integrates with Prometheus-compatible exporters.
 * In development, logs to console at debug level.
 *
 * Key metrics tracked:
 *   - HTTP request duration and status codes
 *   - Booking creation, cancellation, no-show rates
 *   - Payment success/failure rates
 *   - Queue job processing times
 *   - Calendar sync durations
 *   - Cache hit/miss ratios
 */
@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);
  private readonly isProduction: boolean;
  private readonly counters = new Map<string, number>();
  private readonly histograms = new Map<string, number[]>();

  constructor(config: ConfigService) {
    this.isProduction = config.get<string>('NODE_ENV') === 'production';
  }

  /**
   * Increment a counter metric.
   */
  increment(name: string, labels?: Record<string, string>, value = 1): void {
    const key = this.buildKey(name, labels);
    const current = this.counters.get(key) ?? 0;
    this.counters.set(key, current + value);

    if (!this.isProduction) {
      this.logger.debug(`metric:counter ${key} = ${current + value}`);
    }
  }

  /**
   * Record a value in a histogram (e.g. request duration in ms).
   */
  observe(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.buildKey(name, labels);
    const values = this.histograms.get(key) ?? [];
    values.push(value);

    // Keep last 1000 observations in memory for dev inspection
    if (values.length > 1000) values.shift();
    this.histograms.set(key, values);

    if (!this.isProduction) {
      this.logger.debug(`metric:histogram ${key} = ${value}`);
    }
  }

  /**
   * Create a timer that records duration on stop().
   */
  startTimer(name: string, labels?: Record<string, string>): { stop: () => number } {
    const start = performance.now();
    return {
      stop: () => {
        const duration = Math.round(performance.now() - start);
        this.observe(name, duration, labels);
        return duration;
      },
    };
  }

  /**
   * Get current counter value (for health checks / admin).
   */
  getCounter(name: string, labels?: Record<string, string>): number {
    return this.counters.get(this.buildKey(name, labels)) ?? 0;
  }

  /**
   * Get histogram summary (for admin endpoints).
   */
  getHistogramSummary(name: string, labels?: Record<string, string>): {
    count: number;
    mean: number;
    p50: number;
    p95: number;
    p99: number;
  } | null {
    const values = this.histograms.get(this.buildKey(name, labels));
    if (!values || values.length === 0) return null;

    const sorted = [...values].sort((a, b) => a - b);
    const count = sorted.length;

    return {
      count,
      mean: Math.round(sorted.reduce((a, b) => a + b, 0) / count),
      p50: sorted[Math.floor(count * 0.5)],
      p95: sorted[Math.floor(count * 0.95)],
      p99: sorted[Math.floor(count * 0.99)],
    };
  }

  /**
   * Reset all metrics (useful for testing).
   */
  reset(): void {
    this.counters.clear();
    this.histograms.clear();
  }

  private buildKey(name: string, labels?: Record<string, string>): string {
    if (!labels || Object.keys(labels).length === 0) return name;
    const labelStr = Object.entries(labels)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}="${v}"`)
      .join(',');
    return `${name}{${labelStr}}`;
  }
}

@Global()
@Module({
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
