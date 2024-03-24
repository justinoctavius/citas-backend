import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReserveScheduleDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
