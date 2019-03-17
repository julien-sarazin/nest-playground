import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UserAuthenticateDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(16)
  readonly password: string;
}
