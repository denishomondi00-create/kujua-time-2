import { IsString, IsOptional, MinLength } from 'class-validator';

export class ConfirmFreeBookingDto {
  @IsString()
  @MinLength(1)
  holdId: string;
}

export class ConfirmPaidBookingDto {
  @IsString()
  @MinLength(1)
  paymentAttemptId: string;
}
