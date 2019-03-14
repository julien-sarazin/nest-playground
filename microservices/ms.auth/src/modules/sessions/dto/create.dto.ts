import { IsDate, IsString, ValidateNested } from 'class-validator';

class PatientDTO {
  @IsString()
  firstName: string;

  @IsString()
  lastName: number;

  @IsDate()
  birthDate: Date;
}

export class PatientCreateDTO {
  @ValidateNested()
  data: PatientDTO;
}
