import { IsOptional, IsString } from 'class-validator';
export class MarkInvoicePaidDto {
  @IsOptional() @IsString() paymentId?: string;
  @IsOptional() @IsString() note?: string;
}
