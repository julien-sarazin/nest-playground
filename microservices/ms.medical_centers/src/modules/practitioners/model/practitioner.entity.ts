import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import IPractitioner from './practitioner.interface';
import { Diagnostic } from '../../diagnostics/model/diagnostic.entity';

@Entity()
export class Practitioner implements IPractitioner {
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

  @OneToMany(type => Diagnostic, diagnostic => diagnostic.practitioner)
  diagnostics: Diagnostic[];
}
