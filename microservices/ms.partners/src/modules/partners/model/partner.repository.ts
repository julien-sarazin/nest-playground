import { Partner } from './partner.entity';
import { Connection, EntityRepository, Repository } from 'typeorm';

@EntityRepository(Partner)
export default class PartnersRepository extends Repository<Partner> {

}

export const PartnersRepositoryProvider = {
    provide: 'PartnersRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(PartnersRepository),
    inject: ['DbConnection'],
};
