import { IsString, IsNumber } from 'class-validator';

export class DiagnosticUpdateDTO {
  @IsNumber()
  status: number;

  @IsString()
  notes: string;
}
