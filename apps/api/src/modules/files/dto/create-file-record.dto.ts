import { IsOptional, IsString, IsUrl } from 'class-validator';
export class CreateFileRecordDto {
  @IsString() clientId: string;
  @IsString() key: string;
  @IsOptional() @IsUrl() url?: string;
  @IsOptional() @IsString() filename?: string;
}
