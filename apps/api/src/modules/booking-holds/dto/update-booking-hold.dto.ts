import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
export class UpdateBookingHoldDto {
  @IsString() fullName: string;
  @IsEmail() email: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsString() notes?: string;
  @IsOptional() @IsObject() answers?: Record<string, unknown>;
}
