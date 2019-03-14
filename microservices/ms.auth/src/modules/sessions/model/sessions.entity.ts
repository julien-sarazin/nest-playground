import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';
import IPatient from './patient.interface';

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
  birthDate: Date
}
