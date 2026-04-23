/**
 * Cache for workspace branding used in public booking pages.
 * Key pattern: cache:workspace-branding:{workspaceId}
 */
import type Redis from 'ioredis';

const PREFIX = 'cache:workspace-branding';
const DEFAULT_TTL = 600; // 10 minutes

export async function getWorkspaceBrandingCache(
  redis: Redis,
  workspaceId: string,
): Promise<Record<string, unknown> | null> {
  const data = await redis.get(`${PREFIX}:${workspaceId}`);
  return data ? JSON.parse(data) : null;
}

export async function setWorkspaceBrandingCache(
  redis: Redis,
  workspaceId: string,
  value: Record<string, unknown>,
  ttl = DEFAULT_TTL,
): Promise<void> {
  await redis.set(`${PREFIX}:${workspaceId}`, JSON.stringify(value), 'EX', ttl);
}

export async function invalidateWorkspaceBrandingCache(
  redis: Redis,
  workspaceId: string,
): Promise<void> {
  await redis.del(`${PREFIX}:${workspaceId}`);
}
