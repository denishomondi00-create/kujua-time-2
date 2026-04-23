import { IsOptional, IsString, MinLength } from 'class-validator';
export class UpdateClientNoteDto {
  @IsOptional() @IsString() @MinLength(1) content?: string;
}
