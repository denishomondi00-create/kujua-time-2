import { IsArray, IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateWebhookDto {
  @IsString() name: string;
  @IsUrl() targetUrl: string;
  @IsArray() events: string[];
  @IsOptional() @IsString() secret?: string;
}
