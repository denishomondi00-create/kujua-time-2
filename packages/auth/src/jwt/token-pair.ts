import { signToken, TokenPayload } from './token';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface TokenSecrets {
  accessSecret: string;
  refreshSecret: string;
  accessExpiresIn: string;
  refreshExpiresIn: string;
}

export function generateTokenPair(
  userId: string,
  workspaceId: string | undefined,
  role: string | undefined,
  secrets: TokenSecrets,
): TokenPair {
  const basePayload: Omit<TokenPayload, 'type'> = { sub: userId, workspaceId, role };

  const accessToken = signToken({ ...basePayload, type: 'access' }, secrets.accessSecret, secrets.accessExpiresIn);
  const refreshToken = signToken({ ...basePayload, type: 'refresh' }, secrets.refreshSecret, secrets.refreshExpiresIn);

  return {
    accessToken,
    refreshToken,
    expiresIn: parseExpiresIn(secrets.accessExpiresIn),
  };
}

function parseExpiresIn(exp: string): number {
  const match = exp.match(/^(\d+)(s|m|h|d)$/);
  if (!match) return 900;
  const [, val, unit] = match;
  const multipliers: Record<string, number> = { s: 1, m: 60, h: 3600, d: 86400 };
  return Number(val) * (multipliers[unit] ?? 1);
}
