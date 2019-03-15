import { IsDate, IsString, ValidateNested } from 'class-validator';

class PractitionerDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: number;

  @IsDate()
  birthDate: Date;
}

export class PractitionerCreateDTO {
  @ValidateNested()
  data: PractitionerDTO;
}
