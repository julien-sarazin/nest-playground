import { Entity, Column, PrimaryColumn, CreateDateColumn, BeforeUpdate } from 'typeorm';

@Entity()
export class Tokens {
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
