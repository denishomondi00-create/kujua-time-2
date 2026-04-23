import { IsArray, IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
export class UpdateClientDto {
  @IsOptional() @IsString() fullName?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() lifecycleStage?: string;
  @IsOptional() @IsArray() tags?: string[];
  @IsOptional() @IsBoolean() blocked?: boolean;
}
