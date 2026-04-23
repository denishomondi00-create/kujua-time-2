/**
 * Matches domain events against enabled automation rules.
 * Returns all rules whose trigger event + filters match the incoming event.
 */
import type { DomainEventName, AutomationRuleMatch } from '../types';

export interface StoredAutomationRule {
  _id: string;
  workspaceId: string;
  name: string;
  enabled: boolean;
  trigger: {
    event: string;
    filters?: Record<string, unknown>;
  };
  actions: Array<{
    type: string;
    config: Record<string, unknown>;
  }>;
  timing?: {
    delayMinutes?: number;
  };
  rateLimits?: {
    maxPerHour?: number;
    maxPerDay?: number;
  };
}

/**
 * Find all enabled rules matching a domain event.
 */
export function matchRules(
  rules: StoredAutomationRule[],
  eventName: DomainEventName,
  eventPayload: Record<string, unknown>,
): AutomationRuleMatch[] {
  return rules
    .filter((rule) => {
      if (!rule.enabled) return false;
      if (rule.trigger.event !== eventName) return false;

      // Check trigger filters
      if (rule.trigger.filters) {
        return evaluateFilters(rule.trigger.filters, eventPayload);
      }

      return true;
    })
    .map((rule) => ({
      ruleId: rule._id,
      ruleName: rule.name,
      actions: rule.actions.map((a) => ({
        type: a.type as any,
        config: a.config,
      })),
      timing: rule.timing,
    }));
}

function evaluateFilters(
  filters: Record<string, unknown>,
  payload: Record<string, unknown>,
): boolean {
  for (const [key, expected] of Object.entries(filters)) {
    const actual = getNestedValue(payload, key);
    if (Array.isArray(expected)) {
      if (!expected.includes(actual)) return false;
    } else if (actual !== expected) {
      return false;
    }
  }
  return true;
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}
