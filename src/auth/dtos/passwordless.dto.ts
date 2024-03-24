import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordlessDto {
  @IsString()
  @IsNotEmpty()
  email: string;
}
