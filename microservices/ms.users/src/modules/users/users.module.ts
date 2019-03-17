import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import UsersService from './service/users.service';
import { DatabaseModule } from '../../database/database.module';
import { UsersRepositoryProvider } from './model/user.repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersRepositoryProvider,
    UsersService,
  ],
  exports: [
    UsersService,
  ],
  imports: [
    DatabaseModule,
  ],
})
export class UsersModule {
}
