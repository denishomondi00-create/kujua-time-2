import { IsEmail, IsISO8601, IsOptional, IsString } from 'class-validator';
export class CreateBookingHoldDto {
  @IsString() publicEventId: string;
  @IsISO8601() startAt: string;
  @IsISO8601() endAt: string;
  @IsString() timezone: string;
  @IsOptional() @IsString() clientName?: string;
  @IsOptional() @IsEmail() clientEmail?: string;
}
