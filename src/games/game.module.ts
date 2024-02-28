/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { PrismaService } from "src/database/prisma.service";
import { GameRepository } from "src/repositories/game-repository";
import { PrismaGameRepository } from "src/repositories/prisma/prisma-game-repository";
import { GameService } from "./game.service";

@Module({
    controllers:[GameController],
    providers:[
        PrismaService,
        {
            provide: GameRepository,
            useClass: PrismaGameRepository,
        },
        GameService
    ]
})
export class GameModule{}