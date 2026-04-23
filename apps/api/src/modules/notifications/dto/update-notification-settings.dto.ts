import { IsBoolean, IsOptional } from 'class-validator';
export class UpdateNotificationSettingsDto {
  @IsOptional() @IsBoolean() emailEnabled?: boolean;
  @IsOptional() @IsBoolean() smsEnabled?: boolean;
  @IsOptional() @IsBoolean() whatsappEnabled?: boolean;
}
