import { Inject, Injectable, Query } from '@nestjs/common';
import { Practitioner } from '../model/practitioner.entity';
import IPractitioner from '../model/practitioner.interface';
import { Repository } from 'typeorm';
import { PractitionerCreateDTO } from '../dto/create.dto';
import { PractitionerUpdateDTO } from '../dto/update.dto';

@Injectable()
export default class PractitionersService {

  constructor(
    @Inject('PractitionerRepository') private readonly practitionerRepository: Repository<Practitioner>,
  ) {
  }

  public async list(@Query() query): Promise<IPractitioner[]> {
    return await this.practitionerRepository
      .find();
  }

  public async get(id: number): Promise<IPractitioner> {
    const result = await this.practitionerRepository
      .findOneOrFail(id);

    if (!result) {
      throw new PractitionerNotFoundException();
    }

    return result;
  }

  public async search(@Query() query): Promise<IPractitioner> {
    return await this.practitionerRepository
      .findOne(query);
  }

  public async create(dto: PractitionerCreateDTO): Promise<IPractitioner> {
    return await this.practitionerRepository
      .save(dto.data);
  }

  public async update(id: number, dto: PractitionerUpdateDTO): Promise<boolean> {
    const result = await this.practitionerRepository
      .update(id, dto);

    console.log('result', result);

    return true;
  }

  public async remove(id: number): Promise<boolean> {
    const entity = await this.practitionerRepository
      .findOneOrFail(id);

    const result = await this.practitionerRepository
      .remove(entity);

    console.log(result);
    return true;
  }
}

export class PractitionerNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
