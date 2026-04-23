import { Types } from 'mongoose';

/**
 * Generate a new MongoDB ObjectId.
 */
export function newObjectId(): Types.ObjectId {
  return new Types.ObjectId();
}

/**
 * Convert a string to an ObjectId, or return null if invalid.
 */
export function toObjectId(id: string): Types.ObjectId | null {
  return Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
}

/**
 * Safely convert string to ObjectId, throwing if invalid.
 */
export function toObjectIdOrThrow(id: string, label = 'ID'): Types.ObjectId {
  if (!Types.ObjectId.isValid(id)) {
    throw new Error(`Invalid ${label}: "${id}"`);
  }
  return new Types.ObjectId(id);
}

/**
 * Check if two ObjectId-like values are equal.
 */
export function objectIdsEqual(
  a: Types.ObjectId | string | null | undefined,
  b: Types.ObjectId | string | null | undefined,
): boolean {
  if (!a || !b) return false;
  return a.toString() === b.toString();
}
