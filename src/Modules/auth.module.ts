/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { AuthController } from "../Infra/controllers/auth.controller";
import { AuthService } from "../App/services/auth.service";
import { PrismaService } from "src/App/services/prisma.service";
import { AtStrategy, RtStrategy } from "../App/strategies";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports:[JwtModule.register({})],
    controllers:[AuthController],
    providers:[AuthService, PrismaService, AtStrategy, RtStrategy],
})
export class AuthModule{}
