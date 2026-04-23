# Kujua Time Complete System Architecture

This repository structure references the owner-supplied complete system architecture.

## North star

The platform should be built as a monorepo with a clean split between:

- user-facing apps
- backend API
- background workers
- recurring schedulers
- shared packages for domain logic, providers, and infrastructure helpers

## Five architectural priorities

- fast public booking pages
- clean modular dashboard growth
- one trustworthy backend write path for bookings and payments
- native automations through BullMQ
- clear upgrade paths into team features, AI, and enterprise controls

## Runtime split

- `apps/web`: Next.js marketing, auth, dashboard, public booking
- `apps/api`: NestJS API and trusted write path
- `apps/worker`: BullMQ processors
- `apps/scheduler`: repeatable job registration only
- `apps/embed`: embeddable widget runtime
- `apps/docs`: docs site

## Shared packages

Business logic and provider integration stay in `packages/*`, not buried inside app code.

## Trust model

Bookings are the source of truth. External calendar mirrors are busy-time reflections, not the canonical record.

## Automation model

Domain action completes in the API, the same transaction writes to `domain_events`, then a dispatcher enqueues BullMQ jobs, then workers execute automation rules and notifications.

## Final architecture sentence

The system should keep the public booking path extremely fast while ensuring every confirmed booking flows through one stable backend path that can safely create records, trigger automations, and scale into a much larger platform later.
