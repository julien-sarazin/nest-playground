import { Inject, Injectable, Query } from '@nestjs/common';
import { Diagnostic } from '../model/diagnostic.entity';
import IDiagnostic from '../model/diagnostic.interface';
import { Repository } from 'typeorm';
import { DiagnosticCreateDTO } from '../dto/create.dto';
import { DiagnosticUpdateDTO } from '../dto/update.dto';

@Injectable()
export default class DiagnosticsService {

  constructor(
    @Inject('DiagnosticRepository') private readonly diagnosticRepository: Repository<Diagnostic>,
  ) {
  }

  public async list(@Query() query): Promise<IDiagnostic[]> {
    return await this.diagnosticRepository
      .find();
  }

  public async get(id: number): Promise<IDiagnostic> {
    const result = await this.diagnosticRepository
      .findOneOrFail(id);

    if (!result) {
      throw new DiagnosticNotFoundException();
    }

    return result;
  }

  public async search(@Query() query): Promise<IDiagnostic> {
    return await this.diagnosticRepository
      .findOne(query);
  }

  public async create(dto: DiagnosticCreateDTO): Promise<IDiagnostic> {
    return await this.diagnosticRepository
      .save(dto);
  }

  public async update(id: number, dto: DiagnosticUpdateDTO): Promise<boolean> {
    const result = await this.diagnosticRepository
      .update(id, dto);

    console.log('result', result);

    return true;
  }

  public async remove(id: number): Promise<boolean> {
    const entity = await this.diagnosticRepository
      .findOneOrFail(id);

    const result = await this.diagnosticRepository
      .remove(entity);

    console.log(result);
    return true;
  }
}

export class DiagnosticNotFoundException extends Error {
  constructor(message?: string) {
    super(message);
  }
}
