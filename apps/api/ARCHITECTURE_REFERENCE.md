# Kujua Time API Reference Alignment

This API scaffold is aligned to the two source references supplied for Kujua Time:

1. Product Design Blueprint
2. Complete System Architecture

## Key alignment choices

- NestJS modular monolith in `apps/api`
- public booking, workspace, payments, calendar, CRM, reports, automation, and admin modules
- MongoDB and Mongoose schemas per module
- repository and service split for maintainability
- public booking flow centered on booking holds, confirmation, cancellation, and rescheduling
- provider webhooks kept thin and queue friendly
- Google Calendar sync and Paystack plus Stripe placeholders aligned to launch architecture
- client record creation and automation hooks represented in service boundaries

## Notes

- This is a scaffold, not a finished production implementation.
- The structure is intended to plug into shared packages later, exactly as described in the complete architecture.
- Existing uploaded files were preserved where possible, then expanded with the missing module files.
