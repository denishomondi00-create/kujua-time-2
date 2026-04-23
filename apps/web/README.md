# Kujua Time Web

This package merges the uploaded route scaffolds with a complete shared frontend layer and a production-shaped public booking page architecture.

## What is included

- shared frontend folders for providers, layout, navigation, feedback, data-display, forms, modals, and charts
- shared hooks, auth helpers, query helpers, API clients, analytics helpers, CSS tokens, themes, and prose styles
- public assets for brand mark, OG image, robots, and web manifest
- a server-first public booking route at `/book/[workspaceSlug]/[[...path]]`
- client-hydrated public booking interactions for slot picking, intake, payment, reschedule, and cancel flows

## Rendering model

### Server Components
Use server components for:

- marketing pages
- dashboard route shells
- initial dashboard page reads
- public booking page shells
- metadata generation

### Client Components
Use client components for:

- form entry
- mutations
- slot picking
- payment element
- filters, tabs, drawers, calendars, and charts
- polling widgets and live states

### TanStack Query
TanStack Query owns:

- mutations
- optimistic UI
- cache invalidation
- client-side polling
- interactive filters after initial load
- stale-while-revalidate on dashboard widgets

Do not use it for initial SEO page content or route shell bootstrapping where server components are cleaner.

## Shared import rules

- route files import from `feature server/*` first
- client components import from `feature queries/*` and `mutations/*`
- all fetches go through `lib/api-client/*`
- permission checks live in `lib/auth/permissions.ts`
- URL construction lives in `lib/utils/urls.ts`

## Public booking flow

The route shell fetches `getPublicBookingPageModel` on the server and renders branding, theme, meeting summary, first availability snapshot, FAQ, and policies. A single client entry point hydrates booking interactions.

## API map used by the public booking UI

- `GET /v1/public/booking-pages/:workspaceSlug/*path`
- `GET /v1/public/event-types/:publicEventId/slots?date=&tz=`
- `POST /v1/public/booking-holds`
- `PATCH /v1/public/booking-holds/:holdId`
- `POST /v1/public/payments/checkout`
- `POST /v1/public/bookings/confirm-free`
- `POST /v1/public/bookings/confirm-paid`
- `GET /v1/public/bookings/:publicBookingToken`
- `POST /v1/public/bookings/:publicBookingToken/reschedule`
- `POST /v1/public/bookings/:publicBookingToken/cancel`

## Notes

Fallback demo data is intentionally included in the public booking feature so the shell and interaction files remain usable before the API is fully wired.
