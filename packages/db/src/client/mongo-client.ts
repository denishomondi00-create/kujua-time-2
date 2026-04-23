/**
 * Low-level MongoClient wrapper for change streams, admin ops,
 * and direct aggregation pipelines outside Mongoose.
 */
import { MongoClient, MongoClientOptions } from 'mongodb';

let client: MongoClient | null = null;

export interface MongoConnectionOptions {
  uri: string;
  options?: MongoClientOptions;
}

export async function getMongoClient(
  config: MongoConnectionOptions,
): Promise<MongoClient> {
  if (client) return client;

  client = new MongoClient(config.uri, {
    retryWrites: true,
    w: 'majority',
    maxPoolSize: 20,
    minPoolSize: 2,
    connectTimeoutMS: 10_000,
    serverSelectionTimeoutMS: 10_000,
    ...config.options,
  });

  await client.connect();
  return client;
}

export async function closeMongoClient(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
  }
}
