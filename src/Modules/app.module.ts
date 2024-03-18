/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { GameModule } from './game.module';
import { AuthModule } from './auth.module';
import { PrismaModule } from './prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard, RolesGuard } from '../App/common/guards';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [GameModule, AuthModule, PrismaModule, ConfigModule.forRoot({
    isGlobal: true
  })],
  providers:[{
    provide: APP_GUARD,
    useClass: AtGuard
  },
  {
    provide: APP_GUARD,
    useClass: RolesGuard
  }]
})
export class AppModule {}