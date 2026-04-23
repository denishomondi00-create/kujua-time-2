/**
 * Slug utilities for booking page URLs and event type paths.
 *
 * Workspace slugs:  /book/{workspaceSlug}
 * Event type slugs: /book/{workspaceSlug}/{eventTypeSlug}
 */

/**
 * Convert a string to a URL-safe slug.
 * "Acme Coaching LLC" → "acme-coaching-llc"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '')    // Remove non-alphanumeric
    .replace(/\s+/g, '-')            // Spaces to hyphens
    .replace(/-+/g, '-')             // Collapse multiple hyphens
    .replace(/^-|-$/g, '');          // Trim leading/trailing hyphens
}

/**
 * Generate a unique slug by appending a short random suffix.
 * "acme-coaching" → "acme-coaching-x7k2"
 */
export function uniqueSlug(base: string): string {
  const slug = slugify(base);
  const suffix = Math.random().toString(36).substring(2, 6);
  return `${slug}-${suffix}`;
}

/**
 * Validate that a slug meets Kujua Time conventions.
 * Must be: lowercase, alphanumeric + hyphens, 3-64 chars, no leading/trailing hyphen.
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9][a-z0-9-]{1,62}[a-z0-9]$/.test(slug);
}

/**
 * Reserved slugs that cannot be used as workspace slugs.
 */
const RESERVED_SLUGS = new Set([
  'app', 'api', 'admin', 'login', 'signup', 'auth',
  'book', 'booking', 'embed', 'widget', 'pricing',
  'help', 'support', 'docs', 'blog', 'about', 'terms',
  'privacy', 'security', 'settings', 'developers',
  'status', 'health', 'webhooks', 'internal', 'public',
  'v1', 'v2', 'graphql', 'ws', 'socket',
]);

/**
 * Check if a slug is reserved.
 */
export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}
