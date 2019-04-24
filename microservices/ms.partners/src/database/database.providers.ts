import { createConnection } from 'typeorm';
import { MYSQL_CONFIG } from '../config/database.config';

export const databaseProviders = [
    {
        provide: 'DbConnection',
        useFactory: async () => {
            return await createConnection({
                type: 'mysql',
                host: MYSQL_CONFIG.host,
                port: MYSQL_CONFIG.port,
                username: MYSQL_CONFIG.username,
                password: MYSQL_CONFIG.password,
                database: MYSQL_CONFIG.database,
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                synchronize: true,
            });
        },
    },
];
