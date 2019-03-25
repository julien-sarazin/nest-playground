import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
    log(message: any, context?: string): void {
        console.log(message, context);
        super.log(message, context);
    }

    warn(message: any, context?: string): void {
        console.warn(message, context);
        super.warn(message, context);
    }

    error(message: any, trace?: string, context?: string): void {
        console.error(message, trace, context);
        super.error(message, trace, context);
    }
}
