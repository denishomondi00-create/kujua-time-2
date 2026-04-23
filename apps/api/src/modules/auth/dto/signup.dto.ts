import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(1, { message: 'First name is required.' })
  firstName: string;

  @IsString()
  @MinLength(1, { message: 'Last name is required.' })
  lastName: string;

  @IsString()
  @MinLength(2, { message: 'Business name is required.' })
  businessName: string;

  @IsEmail({}, { message: 'Enter a valid email address.' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(128)
  password: string;

  @IsString()
  @MinLength(1)
  confirmPassword: string;
}
