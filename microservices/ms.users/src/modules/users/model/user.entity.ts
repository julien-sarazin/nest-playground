import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IUser } from './user.interface';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('text')
  streetAddress: string;

  @Column('int')
  zipCode: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
