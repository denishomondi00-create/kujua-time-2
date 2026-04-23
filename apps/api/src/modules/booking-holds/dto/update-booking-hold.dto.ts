import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';
export class UpdateBookingHoldDto {
  @IsOptional() @IsString() clientName?: string;
  @IsOptional() @IsEmail() clientEmail?: string;
  @IsOptional() @IsObject() answers?: Record<string, unknown>;
}
