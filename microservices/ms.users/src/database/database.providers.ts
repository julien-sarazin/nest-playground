import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      return await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3033,
        username: 'root',
        password: 'root',
        database: 'users_service_database',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
      },
  },
];
