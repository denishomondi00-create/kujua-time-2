import { randomBytes, createHash, createHmac, timingSafeEqual } from 'crypto';

export function generateToken(length = 32): string {
  return randomBytes(length).toString('hex');
}

export function generateShortToken(length = 16): string {
  return randomBytes(length)
    .toString('base64url')
    .slice(0, length);
}

export function sha256(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function hmacSha256(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function hmacSha512(payload: string, secret: string): string {
  return createHmac('sha512', secret).update(payload).digest('hex');
}

export function secureCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) return false;

  return timingSafeEqual(bufA, bufB);
}

export function makeIdempotencyKey(provider: string, reference: string): string {
  return sha256(`${provider}:${reference}`);
}
