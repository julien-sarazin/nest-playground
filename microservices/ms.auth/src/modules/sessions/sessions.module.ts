import { Module } from '@nestjs/common';
import { ConsulModule } from '../consul/consul.module';

@Module({
  imports: [
    ConsulModule,
  ],
})
export class SessionsModule {
}
