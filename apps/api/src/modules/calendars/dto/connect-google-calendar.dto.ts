import { IsOptional, IsString } from 'class-validator';
export class ConnectGoogleCalendarDto {
  @IsOptional() @IsString() redirectUri?: string;
}
