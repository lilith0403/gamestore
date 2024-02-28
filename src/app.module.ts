/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GameModule } from './games/game.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';

@Module({
  imports: [GameModule, AuthModule, PrismaModule],
  providers:[{
    provide: APP_GUARD,
    useClass:AtGuard
  }]
})
export class AppModule {}
