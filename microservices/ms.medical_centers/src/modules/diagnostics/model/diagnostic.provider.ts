import { Connection } from 'typeorm';
import { Diagnostic } from './diagnostic.entity';

export const DiagnosticRepositoryProviders = [
  {
    provide: 'DiagnosticRepository',
    useFactory: (connection: Connection) => connection.getRepository(Diagnostic),
    inject: ['DbConnection'],
  },
];
