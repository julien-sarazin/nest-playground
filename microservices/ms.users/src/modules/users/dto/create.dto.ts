import { IsDateString, IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDTO {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  readonly password: string;

  @IsDateString()
  @IsOptional()
  readonly birthDate: Date;

  @IsString()
  @IsOptional()
  readonly streetAddress: string;

  @IsString()
  @IsOptional()
  readonly zipCode: string;
}
