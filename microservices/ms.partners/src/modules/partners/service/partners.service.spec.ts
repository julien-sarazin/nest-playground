import PartnersService from '../service/partners.service';
import { Test, TestingModule } from '@nestjs/testing';
import PartnersRepository from '../model/partner.repository';
import { KONG_SERVICE_PROVIDER } from '@shared/modules/kong';
import { NestKongService } from '@shared/modules/kong/src';

const mockPartnerRepository = {
    findById:
      () => ({}),
    findOne:
      () => ({}),
    find:
      () => ({}),
    save:
      () => ({}),
    remove:
      () => ({}),
    update:
      () => ({}),
};
const mockKongService = {
    consumers: {
        create:
          () => ({}),
        generateApiKey:
          () => ({}),
        remove:
          () => ({}),
    },
};

const partnersRepositoryProvider = {
    provide: PartnersRepository,
    useValue: mockPartnerRepository,
};

const kongServiceProvider = {
    provide: KONG_SERVICE_PROVIDER,
    useValue: mockKongService,
};

let service: PartnersService;
let repository: PartnersRepository;
let kongService: NestKongService;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            partnersRepositoryProvider,
            kongServiceProvider,
            PartnersService,
        ],
    })
      .compile();

    service = module.get<PartnersService>(PartnersService);
    repository = module.get<PartnersRepository>(PartnersRepository);
    kongService = module.get<NestKongService>(KONG_SERVICE_PROVIDER);
});

describe('create()', () => {
    const partner = {
        id: 1,
        applicationId: 'fake_id',
        applicationName: 'fake_name',
        applicationKey: 'fake_key',
    };
    const kongConsumer = {
        username: 'fake_username',
        custom_id: 'fake_custom_id',
    };
    const kongApiKey = { consumer: kongConsumer, key: 'fake_key' };

    it('should create a consumer and generate an Apikey from the Kong Gateway API.', async () => {
        jest
          .spyOn(repository, 'findOne')
          .mockImplementation(async () => await undefined);

        jest
          .spyOn(kongService.consumers, 'create')
          .mockImplementation(async () => await kongConsumer);

        jest
          .spyOn(repository, 'save')
          .mockImplementation(async () => await undefined);

        jest
          .spyOn(kongService.consumers, 'generateApiKey')
          .mockImplementation(async () => await kongApiKey);

        await service.create(partner);

        expect(kongService.consumers.create)
          .toHaveBeenCalled();

        expect(kongService.consumers.generateApiKey)
          .toHaveBeenCalled();
    });

    describe('When the partner already exists', () => {
        it('should throw the proper exception', async () => {
            jest
              .spyOn(repository, 'findOne')
              .mockImplementation(async () => await partner);

            expect(service.create(partner))
              .rejects
              .toThrowError(Error);
        });
    });
});
