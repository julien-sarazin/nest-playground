import { Inject, Injectable } from '@nestjs/common';
import { CreatePartnerDTO } from '../dto/create.dto';
import { UpdatePartnerDTO } from '../dto/update.dto';
import PartnersRepository from '../model/partner.repository';
import { Partner } from '../model/partner.entity';
import { IPartner } from '../model/partner.interface';
import * as uuid from 'uuid/v4';
import { KONG_SERVICE_PROVIDER, NestKongService } from '@shared/modules/kong';

@Injectable()
export default class PartnersService {

    constructor(
      @Inject('PartnersRepository') private readonly partnersRepository: PartnersRepository,
      @Inject(KONG_SERVICE_PROVIDER) private readonly kongService: NestKongService,
    ) {
    }

    public async list(criteria): Promise<IPartner[]> {
        return await this.partnersRepository
          .find(criteria);
    }

    public async get(id: number): Promise<IPartner> {
        const entity = await this.partnersRepository
          .findOne(id);

        if (!entity) {
            throw new PartnerNotFoundException();
        }

        return entity;
    }

    public async search(criteria): Promise<IPartner> {
        return await this.partnersRepository
          .findOne(criteria);
    }

    public async create(dto: CreatePartnerDTO): Promise<IPartner> {
        let partner: IPartner = await this.partnersRepository
          .findOne({ applicationName: dto.applicationName });

        if (partner) {
            throw new ApplicationAlreadyExistsException('Application name already used.');
        }

        partner = Object.assign(new Partner(), dto);
        partner.applicationId = uuid();

        const consumer = await this.kongService
          .consumers
          .create(partner.applicationName, partner.applicationId);

        const credentials = await this.kongService
          .consumers
          .generateApiKey(consumer);

        partner.applicationKey = credentials.key;

        try {
            await this.partnersRepository
              .save(partner);
        }
        catch (e) {
            await this.kongService
              .consumers
              .remove(partner.applicationId);

            throw e;
        }

        return partner;
    }

    public async update(id: number, dto: UpdatePartnerDTO): Promise<void> {
        let partner = await this.partnersRepository
          .findOne(id);

        if (!partner) {
            throw new PartnerNotFoundException(`No partner with the identifier ${id}`);
        }

        partner = Object.assign(partner, dto);

        await this.partnersRepository
          .save(partner);
    }

    public async remove(id: number): Promise<void> {
        const entity = await this.partnersRepository
          .findOne(id);

        if (!entity) {
            throw new PartnerNotFoundException(`No partner with the identifier ${id}`);
        }

        await this.partnersRepository
          .remove(entity);
    }
}

export class PartnerNotFoundException extends Error {
    constructor(message?: string) {
        super(message);
    }
}

export class ApplicationAlreadyExistsException extends Error {
    constructor(message?: string) {
        super(message);
    }
}
