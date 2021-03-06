import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import IPatient from './patient.interface';
import { Diagnostic } from '../../diagnostics/model/diagnostic.entity';

@Entity()
export class Patient implements IPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', unique: true, nullable: true })
  userId?: number;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: number;

  @Column('date')
  birthDate: Date;

  @OneToMany(type => Diagnostic, diagnostic => diagnostic.patient)
  diagnostics: Diagnostic[];
}
