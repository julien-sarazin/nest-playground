import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      return await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3031,
        username: 'root',
        password: 'root',
        database: 'cars_service_database',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });
      },
  },
];
