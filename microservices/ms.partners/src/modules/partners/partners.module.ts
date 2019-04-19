import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { PartnersRepositoryProvider } from './model/partner.repository';
import { PartnersController } from './controller/partners.controller';
import PartnersService from './service/partners.service';
import { NestKongModule } from '@shared/modules/kong';

@Module({
    controllers: [PartnersController],
    providers: [
        PartnersRepositoryProvider,
        PartnersService,
    ],
    exports: [
        PartnersService,
    ],
    imports: [
        DatabaseModule,
        NestKongModule,
    ],
})

export class PartnersModule {
}
