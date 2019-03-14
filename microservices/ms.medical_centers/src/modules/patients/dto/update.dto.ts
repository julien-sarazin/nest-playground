import { IsDate, IsString, IsOptional } from 'class-validator';

export class PatientUpdateDTO {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: number;

  @IsDate()
  @IsOptional()
  birthDate?: Date;
}
