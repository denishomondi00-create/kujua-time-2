import { Connection } from 'mongoose';

export function getNativeDb(conn: Connection): NonNullable<Connection['db']> {
  if (!conn.db) {
    throw new Error('Mongoose connection is not ready; native database handle is unavailable.');
  }
  return conn.db;
}
