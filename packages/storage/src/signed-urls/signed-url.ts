import crypto from 'crypto';

export function generateSignedUploadToken(key: string, secret: string, expiresInSeconds = 3600): string {
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds;
  const payload = `${key}:${expiresAt}`;
  const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(JSON.stringify({ key, expiresAt, signature })).toString('base64url');
}

export function verifySignedUploadToken(token: string, secret: string): { key: string; valid: boolean } {
  try {
    const { key, expiresAt, signature } = JSON.parse(Buffer.from(token, 'base64url').toString('utf8'));
    const expected = crypto.createHmac('sha256', secret).update(`${key}:${expiresAt}`).digest('hex');
    const valid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected)) && Date.now() / 1000 < expiresAt;
    return { key, valid };
  } catch { return { key: '', valid: false }; }
}
