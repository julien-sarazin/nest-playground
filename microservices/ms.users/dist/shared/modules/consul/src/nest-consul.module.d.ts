import { DynamicModule } from '@nestjs/common';
import { ConsulModuleConfiguration } from './interfaces';
export declare class NestConsulModule {
    static init(options: ConsulModuleConfiguration): DynamicModule;
}
