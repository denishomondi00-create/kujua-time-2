# ADR-001: BullMQ as the native automation engine

## Status
Accepted

## Decision
Use BullMQ as the native internal automation engine. Do not rely on n8n for core product automations.

## Why
Core product workflows, reminders, payment reconciliation, and automation rules need a first-party execution path that is tightly coupled to domain events and idempotent job contracts.

## Consequence
External automation tools can still integrate through webhooks, but core system behavior remains native and dependable.
