import PartnersService from '../service/partners.service';
import { Test, TestingModule } from '@nestjs/testing';
import PartnersRepository from '../model/partner.repository';
import { KONG_SERVICE_PROVIDER, NestKongService } from '@shared/modules/kong';

const mockPartnerRepository = {
    findById:
      () => ({}),
    findOne:
      () => ({}),
    find:
      () => ({}),
    create:
      () => ({}),
    remove:
      () => ({}),
    update:
      () => ({}),
};
const mockKongService = {};

const partnersRepositoryProvider = {
    provide: PartnersRepository,
    useValue: mockPartnerRepository,
};

const kongServiceProvider = {
    provide: KONG_SERVICE_PROVIDER,
    useValue: mockKongService,
};

describe('Partners.service', () => {
    let service: PartnersService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule(
          {
              providers: [
                  partnersRepositoryProvider,
                  kongServiceProvider,
                  PartnersService,
              ],
          })
          .compile();

        service = module.get<PartnersService>(PartnersService);
    });

    describe('When init', () => {
        it('should be defined', () => expect(service).toBeDefined());
    });
});
