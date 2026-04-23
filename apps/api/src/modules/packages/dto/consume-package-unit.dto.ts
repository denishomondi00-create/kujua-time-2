import { IsInt, IsOptional, IsString, Min } from 'class-validator';
export class ConsumePackageUnitDto {
  @IsString() packageId: string;
  @IsOptional() @IsString() bookingId?: string;
  @IsOptional() @IsInt() @Min(1) units?: number;
}
