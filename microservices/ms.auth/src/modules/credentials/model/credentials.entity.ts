import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, BeforeUpdate } from 'typeorm';
import ICredential from './credentials.interface';

@Entity()
export class Credential implements ICredential {
  @PrimaryColumn()
  id: number;

  @Column('text')
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  private setUpdatedDate() {
    this.updatedAt = new Date();
  }
}
