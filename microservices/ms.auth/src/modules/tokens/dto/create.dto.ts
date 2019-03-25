import { IsString } from 'class-validator';

export class CreateTokensDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
