# Kujua Time

Kujua Time is a branded scheduling and client workflow platform for service businesses. It is designed to help teams get booked, get paid, stay organized, and automate follow-up from one system.

## North star

Every booking should become an operational record. In practice that means the platform should:

- book the appointment
- check the calendar
- collect the payment
- create or update the client record
- trigger the right communication workflow

## What this repository contains

This repository now includes:

- the uploaded core application bundle for `apps/web`, `apps/embed`, `apps/api`, `apps/worker`, `apps/scheduler`, and `packages/*`
- the generated monorepo shell and operational files requested around that bundle
- infrastructure, monitoring, deployment, docs, CI/CD, workspace configuration, and release scaffolding

## Product direction reflected here

This repo is grounded in the two owner-provided reference documents:

- **Kujua Time, Product Design Blueprint**
- **Kujua Time, Complete System Architecture**

The implementation shape in this repo follows those references closely:

- branded scheduling + payments + reminders + client CRM as the launch category
- modular monorepo with independent web, API, worker, scheduler, embed, and docs apps
- BullMQ as the native automation engine
- MongoDB as the primary system of record
- Redis for queues, locks, hot-path cache, and rate limiting
- Google Calendar first, Stripe + Paystack first, Africa-friendly from day one

## Repo layout

```text
apps/
  web/        Next.js marketing, auth, dashboard, public booking
  api/        NestJS API
  worker/     BullMQ processors
  scheduler/  BullMQ repeatable job registration
  embed/      embeddable booking widget runtime
  docs/       internal and public documentation site

packages/
  analytics/
  auth/
  automation/
  calendaring/
  config/
  db/
  email-templates/
  messaging/
  notifications/
  observability/
  payments/
  queue/
  redis/
  storage/
  types/
  ui/
  validation/

infra/
  docker/
  compose/
  nginx/
  terraform/
  k8s/
  monitoring/

docs/
  architecture/
  product/
  operations/
  api/
  decisions/
```

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm bootstrap
pnpm dev
```

For containerized local development:

```bash
docker compose -f infra/compose/docker-compose.yml up -d
```

## Recommended build order

1. Run the public booking path end to end
2. Stabilize booking hold, payment, and booking confirmation transactions
3. Wire domain events to BullMQ automations
4. Complete reports, invoicing, and forms
5. Expand into team scheduling, packages, waitlist, and deeper workflows

## Important note about completeness

The uploaded bundle already supplied the heavy application/package tree. The generated files added here are the missing repo shell, docs, and infrastructure assets needed to turn that bundle into a full project scaffold. They are intentionally production-minded, but they should still be reviewed and adapted before live deployment.

## Key references

- `docs/product/blueprint.md`
- `docs/architecture/complete-system-architecture.md`
- `docs/operations/local-development.md`
- `docs/api/endpoint-map.md`
