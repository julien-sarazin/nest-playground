import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () => {
      const connection = await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3030,
        username: 'root',
        password: 'root',
        database: 'nest_playground',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
      });

      await connection
        .query('CREATE DATABASE IF NOT EXISTS nest_playground;');

      return connection;
    },
  },
];
