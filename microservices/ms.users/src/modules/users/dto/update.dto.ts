import { IsDate, IsOptional, IsString } from 'class-validator';

export class UserUpdateDTO {
  @IsString()
  @IsOptional()
  readonly firstName: string;

  @IsString()
  @IsOptional()
  readonly lastName: string;

  @IsDate()
  @IsOptional()
  readonly birthDate: Date;

  @IsString()
  @IsOptional()
  readonly streetAddress: string;

  @IsString()
  @IsOptional()
  readonly zipCode: string;
}
