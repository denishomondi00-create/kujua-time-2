export interface UploadParams {
  key: string;
  body: Buffer | Uint8Array | string;
  contentType: string;
  metadata?: Record<string, string>;
}

export interface DownloadResult {
  body: Buffer;
  contentType: string;
  metadata?: Record<string, string>;
}

export interface StorageProvider {
  upload(params: UploadParams): Promise<{ key: string; url: string }>;
  download(key: string): Promise<DownloadResult>;
  delete(key: string): Promise<void>;
  getSignedUrl(key: string, expiresInSeconds?: number): Promise<string>;
  exists(key: string): Promise<boolean>;
}
