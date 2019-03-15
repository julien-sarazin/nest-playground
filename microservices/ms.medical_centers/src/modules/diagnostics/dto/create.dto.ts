import { IsNumber, IsString} from 'class-validator';

export class DiagnosticCreateDTO {
  @IsNumber()
  practitionerId: number;

  @IsNumber()
  patientId: number;

  @IsNumber()
  status: number;

  @IsString()
  notes: string;
}
