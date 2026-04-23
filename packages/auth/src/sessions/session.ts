import { v4 as uuidv4 } from 'uuid';

export interface SessionData {
  sessionId: string;
  userId: string;
  workspaceId?: string;
  userAgent?: string;
  ipAddress?: string;
  createdAt: Date;
  expiresAt: Date;
  lastActiveAt: Date;
}

export function createSession(
  userId: string,
  workspaceId: string | undefined,
  ttlSeconds: number,
  meta?: { userAgent?: string; ipAddress?: string },
): SessionData {
  const now = new Date();
  return {
    sessionId: uuidv4(),
    userId,
    workspaceId,
    userAgent: meta?.userAgent,
    ipAddress: meta?.ipAddress,
    createdAt: now,
    expiresAt: new Date(now.getTime() + ttlSeconds * 1000),
    lastActiveAt: now,
  };
}

export function isSessionExpired(session: SessionData): boolean {
  return new Date() > session.expiresAt;
}
