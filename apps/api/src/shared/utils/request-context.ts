export type RequestContext = {
  requestId?: string;
  workspaceId?: string;
  userId?: string;
  ip?: string;
  userAgent?: string;
};

export function getRequestContext(request: any): RequestContext {
  return {
    requestId: request?.requestId ?? request?.headers?.['x-request-id'] ?? request?.headers?.['x-trace-id'],
    workspaceId: request?.workspace?.id ?? request?.headers?.['x-workspace-id'],
    userId: request?.user?.id,
    ip: request?.ip,
    userAgent: request?.headers?.['user-agent'],
  };
}
