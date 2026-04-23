import { Injectable } from '@nestjs/common';
import { FilesRepository } from '../repositories/files.repository';

@Injectable()
export class FilesService {
  constructor(private readonly repo: FilesRepository) {}

  async upload(workspaceId: string, file: any) {
    const key = `${workspaceId}/${Date.now()}-${file?.filename ?? 'file'}`;
    return this.repo.create({
      workspaceId,
      clientId: file?.clientId ?? 'unassigned',
      key,
      url: `/files/${key}`,
      filename: file?.filename ?? 'file',
      mimeType: file?.mimeType,
      sizeBytes: file?.sizeBytes,
    });
  }

  async getSignedUrl(key: string) { return { url: `https://storage.example.com/${key}?signed=true` }; }
  async listByClient(workspaceId: string, clientId: string) { return this.repo.listByClient(workspaceId, clientId); }
}
