import { Entity, Column, PrimaryColumn, CreateDateColumn, BeforeUpdate } from 'typeorm';
import IToken from './token.interface';

@Entity()
export class Token implements IToken{
  @PrimaryColumn()
  id: number;

  @Column('int')
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  private setUpdatedDate() {
    this.updatedAt = new Date();
  }
}
