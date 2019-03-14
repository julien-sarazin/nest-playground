import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
