import { IsString, IsDateString, IsOptional, MaxLength, MinLength } from 'class-validator';

export class RescheduleBookingDto {
  @IsDateString()
  startAt: string;

  @IsDateString()
  endAt: string;

  @IsString()
  @MinLength(1)
  timezone: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
