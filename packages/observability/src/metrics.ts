/**
 * Simple in-process metrics counters.
 * Replace with Prometheus client or StatsD in production.
 */
const counters = new Map<string, number>();
const histograms = new Map<string, number[]>();

export function incrementCounter(name: string, value = 1, tags?: Record<string, string>): void {
  const key = tags ? `${name}:${JSON.stringify(tags)}` : name;
  counters.set(key, (counters.get(key) ?? 0) + value);
}

export function recordHistogram(name: string, value: number, tags?: Record<string, string>): void {
  const key = tags ? `${name}:${JSON.stringify(tags)}` : name;
  const existing = histograms.get(key) ?? [];
  existing.push(value);
  histograms.set(key, existing);
}

export function getCounter(name: string): number { return counters.get(name) ?? 0; }
export function resetMetrics(): void { counters.clear(); histograms.clear(); }
