import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import IDiagnostic from './diagnostic.interface';
import { IsNumber, IsString } from 'class-validator';
import { Patient } from '../../patients/model/patient.entity';
import { Practitioner } from '../../practitioners/model/practitioner.entity';

@Entity()
export class Diagnostic implements IDiagnostic {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  practitionerId: number;

  @IsNumber()
  status: number;

  @IsString()
  notes: string;

  @OneToMany(type => Practitioner, practitioner => practitioner.diagnostics) // specify inverse side as a second parameter
  practitioner: Practitioner;

  @OneToMany(type => Patient, patient => patient.diagnostics) // specify inverse side as a second parameter
  patient: Patient;
}
