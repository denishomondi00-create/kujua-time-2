import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Storage provider port.
 * Adapters for Cloudflare R2 or AWS S3 live in packages/storage.
 */
export const STORAGE_PROVIDER = Symbol('STORAGE_PROVIDER');

export interface StorageProvider {
  upload(params: {
    key: string;
    body: Buffer | ReadableStream;
    contentType: string;
    metadata?: Record<string, string>;
  }): Promise<{ key: string; url: string }>;

  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;

  delete(key: string): Promise<void>;

  exists(key: string): Promise<boolean>;
}

/**
 * Local filesystem storage for development.
 */
class DevStorageProvider implements StorageProvider {
  private readonly basePath = '/tmp/kujua-time-uploads';

  async upload(params: { key: string; contentType: string }) {
    console.log(`[DEV STORAGE] Upload: ${params.key} (${params.contentType})`);
    return { key: params.key, url: `http://localhost:4000/dev-uploads/${params.key}` };
  }

  async getSignedUrl(key: string) {
    return `http://localhost:4000/dev-uploads/${key}?signed=true&expires=${Date.now() + 3600_000}`;
  }

  async delete(key: string) {
    console.log(`[DEV STORAGE] Delete: ${key}`);
  }

  async exists(_key: string) {
    return false;
  }
}

@Global()
@Module({
  providers: [
    {
      provide: STORAGE_PROVIDER,
      inject: [ConfigService],
      useFactory: (config: ConfigService): StorageProvider => {
        const provider = config.get<string>('STORAGE_PROVIDER', 'dev');

        switch (provider) {
          // case 'r2': return new R2Adapter(config);
          // case 's3': return new S3Adapter(config);
          default:
            return new DevStorageProvider();
        }
      },
    },
  ],
  exports: [STORAGE_PROVIDER],
})
export class StorageModule {}
