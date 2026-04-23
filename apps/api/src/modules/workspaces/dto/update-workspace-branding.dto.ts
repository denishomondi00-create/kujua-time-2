import { IsOptional, IsString, IsUrl } from 'class-validator';
export class UpdateWorkspaceBrandingDto {
  @IsOptional() @IsString() accentColor?: string;
  @IsOptional() @IsUrl() logoUrl?: string;
  @IsOptional() @IsUrl() coverImageUrl?: string;
  @IsOptional() @IsString() tagline?: string;
}
