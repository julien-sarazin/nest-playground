import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import ICredential from './credentials.interface';

@Entity()
export class Credential implements ICredential {
  @PrimaryColumn()
  userId: number;

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
