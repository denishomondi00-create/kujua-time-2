/**
 * Google Calendar OAuth helper.
 * Handles auth URL generation, code exchange, and token refresh.
 */
import { google } from 'googleapis';

export interface GoogleOAuthConfig {
  clientId: string;
  clientSecret: string;
  scopes?: string[];
}

const DEFAULT_SCOPES = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/calendar.events',
  'openid',
  'email',
  'profile',
];

export function createOAuth2Client(config: GoogleOAuthConfig, redirectUri?: string): InstanceType<typeof google.auth.OAuth2> {
  return new google.auth.OAuth2(config.clientId, config.clientSecret, redirectUri);
}

export function getGoogleAuthUrl(
  config: GoogleOAuthConfig,
  state: string,
  redirectUri: string,
): string {
  const oauth2Client = createOAuth2Client(config, redirectUri);

  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: config.scopes ?? DEFAULT_SCOPES,
    state,
    redirect_uri: redirectUri,
  });
}

export async function exchangeGoogleCode(
  config: GoogleOAuthConfig,
  code: string,
  redirectUri: string,
): Promise<{
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
  accountId: string;
  email: string;
}> {
  const oauth2Client = createOAuth2Client(config, redirectUri);

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Get user info
  const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
  const { data: userInfo } = await oauth2.userinfo.get();

  return {
    accessToken: tokens.access_token!,
    refreshToken: tokens.refresh_token!,
    expiresAt: new Date(tokens.expiry_date!),
    accountId: userInfo.id!,
    email: userInfo.email!,
  };
}

export async function refreshGoogleToken(
  config: GoogleOAuthConfig,
  refreshToken: string,
): Promise<{
  accessToken: string;
  expiresAt: Date;
}> {
  const oauth2Client = createOAuth2Client(config);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const { credentials } = await oauth2Client.refreshAccessToken();

  return {
    accessToken: credentials.access_token!,
    expiresAt: new Date(credentials.expiry_date!),
  };
}
