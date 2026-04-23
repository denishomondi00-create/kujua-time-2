import { randomUUID } from 'crypto';

export function generateTraceId(): string {
  return randomUUID().replace(/-/g, '').substring(0, 32);
}

export function generateSpanId(): string {
  return randomUUID().replace(/-/g, '').substring(0, 16);
}
