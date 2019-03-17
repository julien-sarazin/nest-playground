import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import ICredential from './credentials.interface';

@Entity()
export class Credential implements ICredential {
  @PrimaryColumn()
  id: number;

  @Column('text')
  token: string;

  @Column('date')
  createdAt: Date;

  @Column('date')
  updatedAt: Date;
}
