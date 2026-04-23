import { IsIn, IsOptional, IsString } from 'class-validator';
export class ConnectPaymentProviderDto {
  @IsIn(['stripe','paystack']) provider: string;
  @IsOptional() @IsString() redirectUri?: string;
}
