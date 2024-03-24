import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class PasswordlessValidateDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(6)
  otp: string;
}
