import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
    @Get('check')
    public async() {
        return { status: 'I am alive and well' };
    }
}
