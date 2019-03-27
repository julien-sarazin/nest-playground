import { BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import IToken from './token.interface';

@Entity()
export class Token implements IToken {
    @PrimaryGeneratedColumn()
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
