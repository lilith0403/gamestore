/* eslint-disable prettier/prettier */

import { PrismaService } from "src/database/prisma.service";
import { GameRepository } from "../game-repository";
import { randomUUID } from "node:crypto";
import { Injectable } from "@nestjs/common";
import { Game } from "@prisma/client";


@Injectable()
export class PrismaGameRepository implements GameRepository {

    constructor(private prisma: PrismaService){}

    async create(name: string, genre: string, rating: number){
        await this.prisma.game.create({
            data:{
                id: randomUUID(),
                name,
                genre,
                rating 
            }
        })
    }

    async findAll():Promise<Game[]>{
        return await this.prisma.game.findMany()
    }


    async findOne(id:string){
        const found = await this.prisma.game.findUnique({
            where:{ id },
        })
        return found
    }

    async findByName (name:string){
        const found = await this.prisma.game.findFirst({ where: {name} })
        return found
    }

    async updateOne(id: string, name:string, genre:string, rating:number) :Promise<Game> {
        return this.prisma.game.update({
            where:{id},
            data:{
                name,
                genre,
                rating
            }
        })
    }

    async deleteOne(id:string){
        await this.prisma.game.delete({
            where:{ id }
        })
    }
}