/**
 * Mongoose connection factory for apps/api MongoModule.
 */
import mongoose, { Connection } from 'mongoose';

export interface MongooseConfig {
  uri: string;
  replicaSet?: string;
  debug?: boolean;
}

export async function createMongooseConnection(
  config: MongooseConfig,
): Promise<Connection> {
  const options: mongoose.ConnectOptions = {
    retryWrites: true,
    w: 'majority',
    maxPoolSize: 20,
    minPoolSize: 2,
    connectTimeoutMS: 10_000,
    serverSelectionTimeoutMS: 10_000,
    ...(config.replicaSet ? { replicaSet: config.replicaSet } : {}),
  };

  if (config.debug) {
    mongoose.set('debug', true);
  }

  await mongoose.connect(config.uri, options);
  return mongoose.connection;
}

export function getDefaultConnection(): Connection {
  return mongoose.connection;
}

export async function closeMongoose(): Promise<void> {
  await mongoose.disconnect();
}

export { mongoose };
