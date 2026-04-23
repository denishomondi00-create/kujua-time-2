// Client
export * from './client/mongo-client';
export * from './client/mongoose';

// Schemas
export * from './schemas/identity';
export * from './schemas/workspace';
export * from './schemas/scheduling';
export * from './schemas/crm';
export * from './schemas/calendar';
export * from './schemas/payments';
export * from './schemas/automation';
export * from './schemas/system';

// Indexes
export { ensureTTLIndexes } from './indexes/ttl.indexes';
export { ensureUniqueIndexes } from './indexes/unique.indexes';
export { ensureReportingIndexes } from './indexes/reporting.indexes';
export { ensureSearchIndexes } from './indexes/search.indexes';

// Repositories
export { BaseRepository } from './repositories/base.repository';
export type { PaginationOptions, PaginatedResult } from './repositories/base.repository';

// Transactions
export { withTransaction } from './transactions/with-transaction';
export type { TransactionOptions } from './transactions/with-transaction';

// Types
export * from './types';

// Constants
export * from './constants';
