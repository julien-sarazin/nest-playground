import { Inject, Injectable, Query } from '@nestjs/common';
import { Credential } from '../model/credentials.entity';
import ICredential from '../model/credentials.interface';
import { Repository } from 'typeorm';
import { CredentialCreateDTO } from '../dto/create.dto';
import { CredentialUpdateDTO } from '../dto/update.dto';

@Injectable()
export default class CredentialsService {

  constructor(
    @Inject('CredentialRepository') private readonly credentialRepository: Repository<Credential>,
  ) {
  }

  public async list(@Query() query): Promise<ICredential[]> {
    return await this.credentialRepository
      .find();
  }

  public async get(id: number): Promise<ICredential> {
    const result = await this.credentialRepository
      .findOneOrFail(id);

    if (!result) {
      throw new CredentialNotFoundException();
    }

    return result;
  }

  public async peek(@Query() query): Promise<ICredential> {
    return await this.credentialRepository
      .findOne(query);
  }

  public async create(dto: CredentialCreateDTO): Promise<ICredential> {
    return await this.credentialRepository
      .save(dto.data);
  }

  public async update(id: number, dto: CredentialUpdateDTO): Promise<boolean> {
    const result = await this.credentialRepository
      .update(id, dto);

    console.log('result', result);

    return true;
  }

  public async remove(id: number): Promise<boolean> {
    const entity = await this.credentialRepository
      .findOneOrFail(id);

    const result = await this.credentialRepository
      .remove(entity);

    console.log(result);
    return true;
  }
}

export class CredentialNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
