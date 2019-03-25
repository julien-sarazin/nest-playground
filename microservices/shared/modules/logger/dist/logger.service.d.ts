import { Logger } from '@nestjs/common';
export declare class LoggerService extends Logger {
    log(message: any, context?: string): void;
    warn(message: any, context?: string): void;
    error(message: any, trace?: string, context?: string): void;
}
