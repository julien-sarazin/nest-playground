import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { nullable: false, select: false })
  password: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('text', { nullable: true })
  streetAddress: string;

  @Column('text', { nullable: true })
  zipCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeUpdate()
  private setUpdatedDate() {
    this.updatedAt = new Date();
  }
}
