# Kujua Time apps/web, Architecture Reference

This `apps/web` build is aligned to the provided:

- **Kujua Time, Product Design Blueprint**
- **Kujua Time, Complete System Architecture**

## What this web package reflects

### Product position and launch shape
The structure supports Kujua Time as a **branded scheduling + payments + reminders + client CRM** platform for service businesses, especially Africa-friendly operators with **Paystack-first** support and simple adoption.

### Frontend architecture reflected here
- **Next.js App Router** with route groups
- **Server-first rendering** for marketing pages, route shells, and public booking shell
- **Client islands** for booking interaction, slot picking, intake, payments, rescheduling, and cancel flows
- **Feature-first organization** under `features/*`
- **Shared frontend layer** under `components/*`, `hooks/*`, `lib/*`, and `styles/*`
- **Public booking route** at `/book/[workspaceSlug]/[[...path]]`

### Key folders used to assemble the final web app
Because the request listed five folder placeholders without names, the build was normalized around the five most central frontend folders implied by the architecture:

1. `app/`
2. `features/`
3. `components/`
4. `hooks/`
5. `lib/`

To keep the package runnable and complete, the following required frontend assets were also preserved:
- `public/`
- `styles/`
- `middleware.ts`
- `instrumentation.ts`
- `next.config.mjs`
- `tailwind.config.ts`
- `postcss.config.js`
- `tsconfig.json`
- `package.json`
- `next-env.d.ts`
- `README.md`

## Source assembly
The final `apps/web` tree was assembled from the uploaded frontend archives as follows:

- **Route-heavy App Router pages** from the route archives
- **Feature-first folders** from the feature-first archive
- **Shared frontend primitives and public booking support** from the shared frontend archive
- **Merged complete tree** from the combined `apps-web-complete` archive, used as the canonical final base after validation

## Result
This output gives you a clean `kujua-time/apps/web/` package shaped for:
- public booking performance
- modular dashboard growth
- payments and reminders UI wiring
- client CRM views
- future expansion into team scheduling, automations, and deeper platform modules

