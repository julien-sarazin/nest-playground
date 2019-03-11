import { Module } from '@nestjs/common';
import { CarsModule } from './modules/cars/cars.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { HTTPLoggingInterceptor } from './interceptors/HTTPLogging.interceptors';
import { DatabaseModule } from './database/database.module';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HTTPLoggingInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    CarsModule,
  ],
})

export class ApplicationModule {
  // Todo: Configure pipe usage globally.
}
