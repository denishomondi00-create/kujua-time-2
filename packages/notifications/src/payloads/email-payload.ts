export interface EmailPayload {
  workspaceId: string;
  to: string;
  from?: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tag?: string;
  automationExecutionId?: string;
}

export function buildEmailPayload(
  workspaceId: string,
  to: string,
  subject: string,
  html: string,
  opts?: { from?: string; replyTo?: string; tag?: string; automationExecutionId?: string },
): EmailPayload {
  return { workspaceId, to, subject, html, ...opts };
}
