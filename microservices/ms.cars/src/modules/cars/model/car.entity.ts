import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import ICar from './car.interface';

@Entity()
export class Car implements ICar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  color: string;

  @Column('text')
  model: string;

  @Column('int')
  speed: number;
}
