import { Connection } from 'typeorm';
import { Credential } from './credentials.entity';

export const CredentialRepositoryProviders = [
  {
    provide: 'CredentialRepository',
    useFactory: (connection: Connection) => connection.getRepository(Credential),
    inject: ['DbConnection'],
  },
];
