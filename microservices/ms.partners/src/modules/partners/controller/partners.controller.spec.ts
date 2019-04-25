import { PartnersController } from './partners.controller';
import PartnersService, {
    ApplicationAlreadyExistsException,
    PartnerNotFoundException,
} from '../service/partners.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';

const mockPartnersService = {
    get:
      () => ({}),
    list:
      () => ({}),
    search:
      () => ({}),
    create:
      () => ({}),
    update:
      () => ({}),
    remove:
      () => ({}),
};

const partnersServiceProvider = {
    provide: PartnersService,
    useValue: mockPartnersService,
};

let controller: PartnersController;
let service: PartnersService;

beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule(
      {
          controllers: [PartnersController],
          providers: [partnersServiceProvider],
      })
      .compile();

    controller = module.get<PartnersController>(PartnersController);
    service = module.get<PartnersService>(PartnersService);
});

describe('.get()', () => {
    it('should properly behave with the PartnersService', async () => {
        const partner = {
            id: 1,
            applicationId: 'fake_id',
            applicationName: 'fake_name',
            applicationKey: 'fake_key',
        };

        jest
          .spyOn(service, 'get')
          .mockImplementation(async () => await partner);

        expect(await controller.get(partner.id)).toBe(partner);
    });
    describe('when the Partner does not exist', async () => {
        it('should handle service errors properly', async () => {
            const partnerId = 1;

            jest
              .spyOn(service, 'get')
              .mockImplementation(() => {
                  throw new PartnerNotFoundException();
              });

            expect(controller.get(partnerId))
              .rejects
              .toThrowError(NotFoundException);
        });
    });
});

describe('.list()', () => {
    it('should properly behave with the PartnersService', async () => {
        const partners = [{
            id: 1,
            applicationId: 'fake_id',
            applicationName: 'fake_name',
            applicationKey: 'fake_key',
        }];

        jest
          .spyOn(service, 'list')
          .mockImplementation(async () => await partners);

        expect(await controller.list({})).toBe(partners);
    });
});

describe('.search()', () => {
    it('should properly behave with the PartnersService', async () => {
        const partner = {
            id: 1,
            applicationId: 'fake_id',
            applicationName: 'fake_name',
            applicationKey: 'fake_key',
        };

        jest
          .spyOn(service, 'search')
          .mockImplementation(async () => await partner);

        expect(await controller.search({}))
          .toEqual(partner);
    });
});

describe('.create()', () => {
    it('should properly behave with the PartnersService', async () => {
        const partner = {
            id: 1,
            applicationId: 'fake_id',
            applicationName: 'fake_name',
            applicationKey: 'fake_key',
        };

        jest
          .spyOn(service, 'create')
          .mockImplementation(async () => await partner);

        expect(await controller.create(partner))
          .toBe(partner);
    });
    describe('when the application name already exists', async () => {
        it('should handle service errors properly', async () => {
            const partner = {
                id: 1,
                applicationId: 'fake_id',
                applicationName: 'fake_name',
                applicationKey: 'fake_key',
            };

            jest
              .spyOn(service, 'create')
              .mockImplementation(() => {
                  throw new ApplicationAlreadyExistsException();
              });

            expect(controller.create(partner))
              .rejects
              .toThrowError(ConflictException);
        });
    });
});

describe('.update()', () => {
    it('should properly behave with the PartnersService', async () => {
        const partner = {
            id: 1,
            applicationId: 'fake_id',
            applicationName: 'fake_name',
            applicationKey: 'fake_key',
        };

        jest
          .spyOn(service, 'update')
          .mockImplementation(async () => undefined);

        expect(await controller.update(partner.id, partner))
          .toBe(undefined);
    });
    describe('when the Partner does not exist', async () => {
        it('should handle service errors properly', async () => {
            const partner = {
                id: 1,
                applicationId: 'fake_id',
                applicationName: 'fake_name',
                applicationKey: 'fake_key',
            };

            jest
              .spyOn(service, 'update')
              .mockImplementation(() => {
                  throw new PartnerNotFoundException();
              });

            expect(controller.update(partner.id, partner))
              .rejects
              .toThrowError(NotFoundException);
        });
    });
});

describe('.remove()', () => {
    it('should properly behave with the PartnersService', async () => {
        const partnerId = 1;

        jest
          .spyOn(service, 'remove')
          .mockImplementation(async () => undefined);

        expect(await controller.remove(partnerId))
          .toBe(undefined);
    });
    describe('when the Partner does not exist', async () => {
        it('should handle service errors properly', async () => {
            const partnerId = 1;

            jest
              .spyOn(service, 'remove')
              .mockImplementation(() => {
                  throw new PartnerNotFoundException();
              });

            expect(controller.remove(partnerId))
              .rejects
              .toThrowError(NotFoundException);
        });
    });
});
