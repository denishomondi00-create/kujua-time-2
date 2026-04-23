import { IsInt, IsOptional, IsString, Min } from 'class-validator';
export class CreatePackageDto {
  @IsString() name: string;
  @IsInt() @Min(1) unitsIncluded: number;
  @IsOptional() @IsInt() @Min(0) price?: number;
  @IsOptional() @IsString() currency?: string;
}
