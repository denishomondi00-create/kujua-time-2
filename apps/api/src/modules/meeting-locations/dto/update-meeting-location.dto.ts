import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
export class UpdateMeetingLocationDto {
  @IsOptional() @IsIn(['in_person','google_meet','zoom','phone','whatsapp']) kind?: string;
  @IsOptional() @IsString() label?: string;
  @IsOptional() @IsString() value?: string;
  @IsOptional() @IsBoolean() active?: boolean;
}
