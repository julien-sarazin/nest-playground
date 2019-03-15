import { Connection } from 'typeorm';
import { Practitioner } from './practitioner.entity';

export const PractitionerRepositoryProviders = [
  {
    provide: 'PractitionerRepository',
    useFactory: (connection: Connection) => connection.getRepository(Practitioner),
    inject: ['DbConnection'],
  },
];
