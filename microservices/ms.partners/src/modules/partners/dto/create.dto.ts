import { IsString} from 'class-validator';

export class CreatePartnerDTO {
  @IsString()
  readonly applicationName: string;
}
