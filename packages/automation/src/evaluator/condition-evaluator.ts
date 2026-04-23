/**
 * Evaluates conditions for conditional automation steps.
 * Supports comparison operators for flexible rule configuration.
 */

export type Operator = 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin' | 'exists' | 'contains';

export interface Condition {
  field: string;
  operator: Operator;
  value: unknown;
}

export function evaluateCondition(
  condition: Condition,
  context: Record<string, unknown>,
): boolean {
  const actual = getNestedValue(context, condition.field);

  switch (condition.operator) {
    case 'eq':
      return actual === condition.value;
    case 'neq':
      return actual !== condition.value;
    case 'gt':
      return typeof actual === 'number' && actual > (condition.value as number);
    case 'gte':
      return typeof actual === 'number' && actual >= (condition.value as number);
    case 'lt':
      return typeof actual === 'number' && actual < (condition.value as number);
    case 'lte':
      return typeof actual === 'number' && actual <= (condition.value as number);
    case 'in':
      return Array.isArray(condition.value) && condition.value.includes(actual);
    case 'nin':
      return Array.isArray(condition.value) && !condition.value.includes(actual);
    case 'exists':
      return condition.value ? actual !== undefined && actual !== null : actual === undefined || actual === null;
    case 'contains':
      return typeof actual === 'string' && typeof condition.value === 'string' && actual.includes(condition.value);
    default:
      return false;
  }
}

export function evaluateAllConditions(
  conditions: Condition[],
  context: Record<string, unknown>,
): boolean {
  return conditions.every((c) => evaluateCondition(c, context));
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object') {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}
