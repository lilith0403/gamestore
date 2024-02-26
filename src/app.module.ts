/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GameModule } from './games/game.module';
import { AuthModule } from './auth/auth.module';
import { NotFoundExceptionfIlter } from './exceptions/http-exception.filter';

@Module({
  imports: [GameModule, AuthModule],
  controllers: [],
  providers: [NotFoundExceptionfIlter],
})
export class AppModule {}
