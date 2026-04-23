# Kujua Time Delivery Manifest

This bundle contains the requested extracted application folders and the generated/refined API backend infra/shared/root layer.

## Included extracted folders
- `kujua-time/apps/web/`
- `kujua-time/apps/embed/`
- `kujua-time/apps/api/`

## Requested API infra layer files included
1. `apps/api/src/infra/db/mongo.module.ts`
2. `apps/api/src/infra/db/transaction.manager.ts`
3. `apps/api/src/infra/db/transaction.decorator.ts`
4. `apps/api/src/infra/db/indexes.bootstrap.ts`
5. `apps/api/src/infra/cache/redis.module.ts`
6. `apps/api/src/infra/cache/cache.service.ts`
7. `apps/api/src/infra/queue/bullmq.module.ts`
8. `apps/api/src/infra/queue/queue-registry.ts`
9. `apps/api/src/infra/messaging/messaging.module.ts`
10. `apps/api/src/infra/payments/payments.module.ts`
11. `apps/api/src/infra/calendaring/calendaring.module.ts`
12. `apps/api/src/infra/storage/storage.module.ts`
13. `apps/api/src/infra/observability/logging.module.ts`
14. `apps/api/src/infra/observability/tracing.module.ts`
15. `apps/api/src/infra/observability/metrics.module.ts`
16. `apps/api/src/infra/observability/sentry.module.ts`

## Requested shared layer and root scope included
- `apps/api/src/shared/dto/*`
- `apps/api/src/shared/guards/*`
- `apps/api/src/shared/decorators/*`
- `apps/api/src/shared/pipes/*`
- `apps/api/src/shared/interceptors/*`
- `apps/api/src/shared/exceptions/*`
- `apps/api/src/shared/utils/*`
- `apps/api/test/*`
- `apps/api/package.json`
- `apps/api/tsconfig.json`
- `apps/api/nest-cli.json`

## Refinements applied
- Added shared barrel exports for DTOs, decorators, guards, and exceptions.
- Added common shared DTOs for ID, date-range, and list queries.
- Added shared exceptions for not-found, forbidden-action, and provider integration failures.
- Added extra shared pipes for boolean and integer-range parsing.
- Added request-id interceptor and shared pagination/request-context helpers.
- Corrected the Paystack webhook signature path to use HMAC-SHA512.
- Corrected route key composition in the rate-limit guard.

## Scope note
This delivery follows the requested extraction scope (`apps/web`, `apps/embed`, and `apps/api`).
Shared monorepo packages outside that scope (such as `packages/*`) are not included here.
