import { IsDate, IsString, ValidateNested } from 'class-validator';

class CredentialDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: number;

  @IsDate()
  birthDate: Date;
}

export class CredentialCreateDTO {
  @ValidateNested()
  data: CredentialDTO;
}
