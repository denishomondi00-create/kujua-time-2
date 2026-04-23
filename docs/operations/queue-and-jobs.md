# Queue and jobs

## Core queues

- automation.dispatch
- automation.execute
- notifications.email
- notifications.sms
- notifications.whatsapp
- calendar.sync
- payments.reconcile
- invoices.generate
- webhooks.deliver
- analytics.project
- cleanup.expiry

## Principles

- every job must be idempotent
- payment jobs retry more carefully than notifications
- scheduler registers repeatable jobs only
- workers execute jobs, they do not expose HTTP APIs
