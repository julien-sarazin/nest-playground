import { Connection } from 'typeorm';
import { Patient } from './patient.entity';

export const PatientRepositoryProviders = [
  {
    provide: 'PatientRepository',
    useFactory: (connection: Connection) => connection.getRepository(Patient),
    inject: ['DbConnection'],
  },
];
