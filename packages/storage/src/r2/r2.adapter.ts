import { S3Adapter, S3Config } from '../s3/s3.adapter';

/**
 * Cloudflare R2 adapter — uses S3-compatible API.
 */
export class R2Adapter extends S3Adapter {
  constructor(config: Omit<S3Config, 'forcePathStyle'>) {
    super({ ...config, forcePathStyle: true });
  }
}
