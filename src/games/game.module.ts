/* eslint-disable prettier/prettier */

import { Module } from "@nestjs/common";
import { GameController } from "./game.controller";
import { PrismaService } from "src/database/prisma.service";
import { GameRepository } from "src/repositories/game-repository";
import { PrismaGameRepository } from "src/repositories/prisma/prisma-game-repository";
import { GameService } from "./game.service";
import { NotFoundExceptionfIlter } from "src/exceptions/http-exception.filter";

@Module({
    controllers:[GameController],
    providers:[
        NotFoundExceptionfIlter,
        PrismaService,
        {
            provide: GameRepository,
            useClass: PrismaGameRepository,
        },
        GameService
    ]
})
export class GameModule{}