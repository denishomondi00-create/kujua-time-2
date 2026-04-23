export interface WorkspaceBase {
  name: string;
  slug: string;
  ownerId: string;
  plan: 'free' | 'standard' | 'pro' | 'premium';
  timezone: string;
  currency: string;
  country: string;
}

export interface WorkspaceBranding {
  workspaceId: string;
  logo?: string;
  coverImage?: string;
  accentColor: string;
  headline?: string;
  description?: string;
  customCss?: string;
}

export interface WorkspaceMemberInfo {
  userId: string;
  workspaceId: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  inviteEmail?: string;
  inviteStatus: 'pending' | 'accepted' | 'revoked';
}
