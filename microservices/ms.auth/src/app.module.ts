import { Module } from '@nestjs/common';
import { TokensModule } from './modules/tokens/tokens.module';

@Module({
  modules: [
    TokensModule,
  ],
})
export class AppModule {
}
