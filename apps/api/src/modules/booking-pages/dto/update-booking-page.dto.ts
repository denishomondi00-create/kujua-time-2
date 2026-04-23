import { IsBoolean, IsOptional, IsString, IsUrl } from 'class-validator';
export class UpdateBookingPageDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() headline?: string;
  @IsOptional() @IsString() accentColor?: string;
  @IsOptional() @IsUrl() logoUrl?: string;
  @IsOptional() @IsBoolean() isPublished?: boolean;
}
