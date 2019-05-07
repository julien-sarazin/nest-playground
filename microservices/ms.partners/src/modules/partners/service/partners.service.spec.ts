import PartnersService, {
    ApplicationAlreadyExistsException,
    PartnerNotFoundException,
} from '../service/partners.service';
import { Test, TestingModule } from '@nestjs/testing';
import PartnersRepository from '../model/partner.repository';
import { KONG_SERVICE_PROVIDER } from '@shared/modules/kong';
import { NestKongService } from '@shared/modules/kong/src';
import { InternalServerErrorException } from '@nestjs/common';
import { UpdatePartnerDTO } from '../dto/update.dto';
import { IPartner } from '../model/partner.interface';
import { Partner } from '../model/partner.entity';

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

describe('.create()', () => {
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

        jest
          .spyOn(kongService.consumers, 'remove')
          .mockImplementation(async () => await undefined);

        await service.create(partner);

        expect(kongService.consumers.create)
          .toHaveBeenCalled();

        expect(kongService.consumers.generateApiKey)
          .toHaveBeenCalled();

        expect(kongService.consumers.remove)
          .not
          .toHaveBeenCalled();
    });

    describe('When the partner already exists', () => {
        it('should throw the proper exception', async () => {
            jest
              .spyOn(repository, 'findOne')
              .mockImplementation(async () => await partner);

            expect(service.create(partner))
              .rejects
              .toThrowError(ApplicationAlreadyExistsException);
        });
    });

    describe('When the repository fails to persist the partner', () => {
        it('should try to remove the KongConsumer from the API', async () => {
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

            jest
              .spyOn(kongService.consumers, 'remove')
              .mockImplementation(async () => await undefined);

            jest
              .spyOn(repository, 'save')
              .mockImplementation(async () => {
                  throw new InternalServerErrorException('fake_error');
              });

            await expect(service.create(partner))
              .rejects
              .toThrowError(InternalServerErrorException);

            expect(kongService.consumers.remove)
              .toHaveBeenCalled();
        });
    });
});

describe('.update()', () => {
    it('should look for an existing resource', async () => {
        const dto: UpdatePartnerDTO = {
            applicationName: 'fake',
        };

        const partner: IPartner = {
            applicationKey: 'fake_application_key',
            applicationId: 'fake_application_id',
            applicationName: 'fake_application_name',
            id: 1,
        };

        jest
          .spyOn(repository, 'findOne')
          .mockImplementation(async () => await partner);

        jest
          .spyOn(repository, 'save')
          .mockImplementation(async () => await undefined);

        await service
          .update(1, dto);

        expect(repository.findOne)
          .toHaveBeenCalled();
    });
    describe('when the targeted resource does not exist', () => {
        it('should throw an Partner not found exception', async () => {
            const dto: UpdatePartnerDTO = {
                applicationName: 'fake',
            };

            jest
              .spyOn(repository, 'findOne')
              .mockImplementation(async () => await undefined);

            jest
              .spyOn(repository, 'save')
              .mockImplementation(async () => await undefined);

            await expect(service.update(1, dto))
              .rejects
              .toThrowError(PartnerNotFoundException);
        });
    });
});

describe('.remove()', () => {
    it('should also try to remove the consumer from the Kong API', async () => {
        const partner: IPartner = {
            id: 1234,
            applicationName: 'fake',
            applicationId: 'fake',
            applicationKey: 'fake',
        };

        jest
          .spyOn(repository, 'findOne')
          .mockImplementation(async () => await partner);

        jest
          .spyOn(kongService.consumers, 'remove')
          .mockImplementation(async () => await undefined);

        await service.remove(1234);

        expect(repository.findOne)
          .toHaveBeenCalled();

        expect(kongService.consumers.remove)
          .toHaveBeenCalled();
    });

    describe('when the partner does not exists', () => {
        it('should throw a PartnerNotFoundException', async () => {
            jest
              .spyOn(repository, 'findOne')
              .mockImplementation(async () => await undefined);

            expect(service.remove(123))
              .rejects
              .toThrow(PartnerNotFoundException);
        });
    });

    describe('when the kong service fails', () => {
        it('should forward the error to the caller', async () => {
            const partner: IPartner = {
                id: 1234,
                applicationName: 'fake',
                applicationId: 'fake',
                applicationKey: 'fake',
            };

            jest
              .spyOn(repository, 'findOne')
              .mockImplementation(async () => await partner);

            jest
              .spyOn(kongService.consumers, 'remove')
              .mockImplementation(async () => {
                  throw new Error('fake_error');
              });

            await expect(service.remove(1234))
              .rejects
              .toThrow('fake_error');
        });
    });
});

describe('.list()', () => {
    it('should forward repository results', async () => {
        const repositoryResult = [];

        jest
          .spyOn(repository, 'find')
          .mockImplementation(async () => await repositoryResult);

        const results = await service.list({});

        expect(results)
          .toBe(repositoryResult);
    });
});

describe('.get()', () => {
    it('should return an instance of partner', async () => {
        const repositoryResult: IPartner = {
            applicationKey: 'fake',
            applicationId: 'fake',
            applicationName: 'fake',
            id: 523,
        };

        jest
          .spyOn(repository, 'findOne')
          .mockImplementation(async () => await repositoryResult);

        const result = await service.get(523);

        expect(result)
          .toBe(repositoryResult);
    });

    describe('when no partner is found', () => {
        it('should throw a PartnerNotFound exception', async () => {
            jest
              .spyOn(repository, 'findOne')
              .mockImplementation(async () => await undefined);

            await expect(service.get(123))
              .rejects
              .toThrow(PartnerNotFoundException);
        });
    });
});

describe('.search()', () => {
    it('should forward repository results', async () => {
        const repositoryResult: IPartner = {
            applicationKey: 'fake_application_key',
            applicationId: 'fake_application_id',
            applicationName: 'fake_application_name',
            id: 1,
        };

        jest
          .spyOn(repository, 'findOne')
          .mockImplementation(async () => await repositoryResult);

        const result = await service.search({});

        expect(result)
          .toBe(repositoryResult);
    });
});
