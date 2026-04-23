import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheService } from '../../infra/cache/cache.service';

export const RATE_LIMIT_KEY = 'rate_limit';

/**
 * Decorator to set rate limit on a route.
 * @param maxRequests Maximum requests allowed in the window
 * @param windowSeconds Time window in seconds
 *
 * Usage: @RateLimit(60, 60) — 60 requests per minute
 */
export const RateLimit = (maxRequests: number, windowSeconds: number) =>
  SetMetadata(RATE_LIMIT_KEY, { maxRequests, windowSeconds });

@Injectable()
export class RateLimitGuard implements CanActivate {
  /** Default limits for public booking routes. */
  private static readonly DEFAULT_MAX = 60;
  private static readonly DEFAULT_WINDOW = 60;

  constructor(
    private readonly reflector: Reflector,
    private readonly cache: CacheService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const config = this.reflector.get<{ maxRequests: number; windowSeconds: number }>(
      RATE_LIMIT_KEY,
      context.getHandler(),
    );

    const maxRequests = config?.maxRequests ?? RateLimitGuard.DEFAULT_MAX;
    const windowSeconds = config?.windowSeconds ?? RateLimitGuard.DEFAULT_WINDOW;

    const request = context.switchToHttp().getRequest();
    const identifier = request.user?.id ?? request.ip ?? 'unknown';
    const route = `${request.method}:${request.route?.path ?? request.url}`;
    const key = `${identifier}:${route}:${Math.floor(Date.now() / (windowSeconds * 1000))}`;

    const { allowed, remaining } = await this.cache.checkRateLimit(key, maxRequests, windowSeconds);

    const response = context.switchToHttp().getResponse();
    response.setHeader('X-RateLimit-Limit', maxRequests);
    response.setHeader('X-RateLimit-Remaining', remaining);

    if (!allowed) {
      throw new HttpException(
        { message: 'Too many requests. Please try again later.', code: 'RATE_LIMITED' },
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return true;
  }
}
