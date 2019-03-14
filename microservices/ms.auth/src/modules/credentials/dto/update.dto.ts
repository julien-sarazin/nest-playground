import { IsDate, IsString, IsOptional } from 'class-validator';

export class CredentialUpdateDTO {
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
