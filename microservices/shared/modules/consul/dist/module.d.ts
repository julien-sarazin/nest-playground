import { DynamicModule } from '@nestjs/common';
import { ConsulModuleConfiguration } from './interfaces';
export declare class ConsulModule {
    static init(options: ConsulModuleConfiguration): DynamicModule;
}
