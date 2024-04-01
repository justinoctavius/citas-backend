import {
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class ScheduleDto {
  @IsDate()
  @IsNotEmpty()
  from: string;

  @IsDate()
  @IsNotEmpty()
  to: string;
}

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsOptional()
  schedules: ScheduleDto[];

  @IsString()
  @IsNotEmpty()
  emoji: string;
}
