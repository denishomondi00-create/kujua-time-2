import { IsIn, IsNumber, IsOptional, IsString, Min } from 'class-validator';
export class CreatePaymentCheckoutDto {
  @IsString() bookingHoldId: string;
  @IsIn(['stripe','paystack']) provider: string;
  @IsOptional() @IsNumber() @Min(0) amount?: number;
  @IsOptional() @IsString() currency?: string;
}
