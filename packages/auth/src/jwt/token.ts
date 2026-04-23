import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

export interface TokenPayload {
  sub: string;
  workspaceId?: string;
  role?: string;
  type: 'access' | 'refresh';
}

export function signToken(payload: TokenPayload, secret: string, expiresIn: string): string {
  const opts: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, secret, opts);
}

export function verifyToken(token: string, secret: string): TokenPayload & JwtPayload {
  return jwt.verify(token, secret) as TokenPayload & JwtPayload;
}

export function decodeToken(token: string): (TokenPayload & JwtPayload) | null {
  const decoded = jwt.decode(token);
  return decoded as (TokenPayload & JwtPayload) | null;
}
