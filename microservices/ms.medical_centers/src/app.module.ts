import { Module } from '@nestjs/common';
import { PatientsModule } from './modules/patients/patients.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HTTPLoggingInterceptor } from './interceptors/HTTPLogging.interceptors';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HTTPLoggingInterceptor,
    }
  ],
  imports: [
    PatientsModule,
  ],
})

export class ApplicationModule {
  // Todo: Configure pipe usage globally.
}
