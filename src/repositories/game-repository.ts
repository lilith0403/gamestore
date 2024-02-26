/* eslint-disable prettier/prettier */

import { PrismaGameRepository } from "./prisma/prisma-game-repository";

export abstract class GameRepository extends PrismaGameRepository{
    abstract create(name:string, genre:string, rating:number): Promise<void>

}