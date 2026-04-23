export type ClientLifecycleStage = 'lead' | 'client' | 'inactive' | 'vip';

export interface ClientBase {
  workspaceId: string;
  name: string;
  email: string;
  phone?: string;
  lifecycleStage: ClientLifecycleStage;
  tags: string[];
  blocked: boolean;
  source: 'booking' | 'manual' | 'form' | 'import';
  metadata?: Record<string, unknown>;
}

export interface ClientNote {
  clientId: string;
  workspaceId: string;
  authorId: string;
  content: string;
  pinned: boolean;
}
