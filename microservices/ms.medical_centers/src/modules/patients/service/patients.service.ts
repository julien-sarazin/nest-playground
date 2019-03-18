import { Inject, Injectable, Query } from '@nestjs/common';
import { Patient } from '../model/patient.entity';
import IPatient from '../model/patient.interface';
import { Repository } from 'typeorm';
import { PatientCreateDTO } from '../dto/create.dto';
import { PatientUpdateDTO } from '../dto/update.dto';

@Injectable()
export default class PatientsService {

  constructor(
    @Inject('PatientRepository') private readonly patientRepository: Repository<Patient>,
  ) {
  }

  public async list(@Query() query): Promise<IPatient[]> {
    return await this.patientRepository
      .find();
  }

  public async get(id: number): Promise<IPatient> {
    const result = await this.patientRepository
      .findOne(id);

    if (!result) {
      throw new PatientNotFoundException();
    }

    return result;
  }

  public async peek(@Query() query): Promise<IPatient> {
    return await this.patientRepository
      .findOne(query);
  }

  public async create(dto: PatientCreateDTO): Promise<IPatient> {
    return await this.patientRepository
      .save(dto.data);
  }

  public async update(id: number, dto: PatientUpdateDTO): Promise<boolean> {
    const result = await this.patientRepository
      .update(id, dto);

    console.log('result', result);

    return true;
  }

  public async remove(id: number): Promise<boolean> {
    const entity = await this.patientRepository
      .findOne(id);

    const result = await this.patientRepository
      .remove(entity);

    console.log(result);
    return true;
  }
}

export class PatientNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
