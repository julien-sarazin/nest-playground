import { IsDate, IsString, ValidateNested } from 'class-validator';

class CreateCredentialsCreateDTO {
  @IsString()
  email: string;

  @IsString()
  password: number;
}
