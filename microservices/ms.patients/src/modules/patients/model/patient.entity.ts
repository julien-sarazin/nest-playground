import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import IPatient from './patient.interface';

@Entity()
export class Patient implements IPatient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  color: string;

  @Column('text')
  model: string;

  @Column('int')
  speed: number;
}
