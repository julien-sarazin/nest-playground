import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { nullable: false })
  applicationName: string;

  @Column('text', { nullable: false })
  applicationId: string;

  @Column('text', { nullable: false, select: false })
  applicationKey: string;
}
