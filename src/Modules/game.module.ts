/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { GameController } from "../Infra/controllers/game.controller";
import { PrismaService } from "src/App/services/prisma.service";
import { GameRepository } from "../Infra/repositories/game.repository";
import { GameService } from "src/App/services/game-services/game.service";

@Module({
    controllers:[GameController],
    providers:[PrismaService, GameRepository, GameService]
})
export class GameModule{}