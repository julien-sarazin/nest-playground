import { Connection } from 'typeorm';
import { Car } from './car.entity';

export const CarRepositoryProviders = [
  {
    provide: 'CarRepository',
    useFactory: (connection: Connection) => connection.getRepository(Car),
    inject: ['DbConnection'],
  },
];
