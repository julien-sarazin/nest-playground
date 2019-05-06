import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get()
    public async check() {
        return { status: 'I am alive and well' };
    }
}
