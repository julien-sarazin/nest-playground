import { IsDate, IsOptional, IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsDate()
  @IsOptional()
  birthDate: Date;

  @IsString()
  @IsOptional()
  streetAddress: string;

  @IsString()
  @IsOptional()
  zipCode: string;
}
