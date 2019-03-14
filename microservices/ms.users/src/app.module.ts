import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [],
  controllers: [],
  providers: [UsersModule],
})
export class AppModule {}
