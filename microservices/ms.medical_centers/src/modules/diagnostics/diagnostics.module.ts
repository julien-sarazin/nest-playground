import { Module } from '@nestjs/common';
import DiagnosticsService from './service/diagnostics.service';
import { DiagnosticsController } from './controller/diagnostics.controller';
import { DiagnosticRepositoryProviders } from './model/diagnostic.provider';
import { DatabaseModule } from '../../database/database.module';

@Module({
  controllers: [
    DiagnosticsController,
  ],
  providers: [
    ...DiagnosticRepositoryProviders,
    DiagnosticsService,
  ],
  exports: [
    DiagnosticsService,
  ],
  imports: [
    DatabaseModule,
  ],
})
export class DiagnosticsModule {
}
