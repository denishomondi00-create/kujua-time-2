import { Injectable, Logger } from '@nestjs/common'
import { InjectConnection } from '@nestjs/mongoose'
import { Connection, ClientSession } from 'mongoose'

@Injectable()
export class TransactionManager {
  private readonly logger = new Logger(TransactionManager.name)

  constructor(@InjectConnection() private readonly connection: Connection) {}

  async withTransaction<T>(
    fn: (session: ClientSession) => Promise<T>,
    options?: {
      readConcern?: 'local' | 'majority' | 'snapshot'
      writeConcern?: { w?: 'majority' | number; j?: boolean }
      maxRetries?: number
    },
  ): Promise<T> {
    const session = await this.connection.startSession()
    const maxRetries = options?.maxRetries ?? 3
    let attempt = 0

    try {
      let result!: T

      await session.withTransaction(
        async () => {
          attempt++
          if (attempt > 1) {
            this.logger.warn(`Transaction retry attempt ${attempt}/${maxRetries}`)
          }
          result = await fn(session)
        },
        {
          readConcern: { level: options?.readConcern ?? 'majority' },
          writeConcern: {
            w: options?.writeConcern?.w ?? 'majority',
            j: options?.writeConcern?.j ?? true,
          },
          maxCommitTimeMS: 30_000,
        },
      )

      return result
    } catch (error) {
      this.logger.error(`Transaction failed after ${attempt} attempts: ${(error as Error).message}`)
      throw error
    } finally {
      await session.endSession()
    }
  }

  async startSession(): Promise<ClientSession> {
    return this.connection.startSession()
  }
}