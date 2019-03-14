import * as Joi from 'joi';
import { IsNumber, IsString } from 'class-validator';

export class PatientCreateDTO {
  @IsString()
  readonly model: string;

  @IsString()
  readonly color: string;

  @IsNumber()
  readonly speed: number;

  static Schema(): string[] {
    return Joi.object().keys({
      model: Joi.string().required(),
      color: Joi.string().required(),
      speed: Joi.number().required(),
    });
  }
}
