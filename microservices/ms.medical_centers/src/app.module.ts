import { Module } from '@nestjs/common';
import { PatientsModule } from './modules/patients/patients.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HTTPLoggingInterceptor } from './interceptors/HTTPLogging.interceptors';

@Module({
  imports: [
    PatientsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HTTPLoggingInterceptor,
    },
  ],
})

export class ApplicationModule {
  // Todo: Configure pipe usage globally.
}
