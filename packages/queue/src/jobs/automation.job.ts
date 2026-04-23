/**
 * Job payload contracts for automation queues.
 * All jobs must be idempotent.
 */

export interface AutomationDispatchJobData {
  /** Batch of unpublished domain event IDs to process */
  domainEventIds: string[];
}

export interface AutomationExecuteJobData {
  workspaceId: string;
  automationRuleId: string;
  executionId: string;
  eventName: string;
  eventPayload: Record<string, unknown>;
  actions: Array<{
    type: string;
    config: Record<string, unknown>;
  }>;
}

export const AUTOMATION_JOB_NAMES = {
  DISPATCH: 'automation:dispatch',
  EXECUTE: 'automation:execute',
} as const;
