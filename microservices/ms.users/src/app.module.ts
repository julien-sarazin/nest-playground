import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConsulModule } from '@nestcloud/consul';
import { ConsulServiceModule } from '@nestcloud/consul-service';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    UsersModule,
    HealthModule,
    ConsulModule.register({
      host: '127.0.0.1',
      port: 8500,
    }),
    ConsulServiceModule.register({
      serviceId: 'node1',
      serviceName: 'user-service',
      port: 3001,
      consul: {
        discoveryHost: 'localhost',
        healthCheck: {
          timeout: '1s',
          interval: '5s',
          http: '/api/health',
        },
        maxRetry: 5,
        retryInterval: 3000,
      },
    }),
  ],
})
export class AppModule {
}
