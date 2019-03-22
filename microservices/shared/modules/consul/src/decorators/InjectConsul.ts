import { CONSUL_CLIENT_PROVIDER } from '../constants';
import { Inject } from '@nestjs/common';

export const InjectConsul = () => Inject(CONSUL_CLIENT_PROVIDER);
