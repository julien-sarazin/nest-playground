import { IsOptional, IsString } from 'class-validator';

export class UpdatePartnerDTO {
  @IsString()
  @IsOptional()
  readonly applicationName: string;
}
