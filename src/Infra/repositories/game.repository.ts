import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/App/services/prisma.service";
import { CreateGameDto, UpdateGameDto } from "../../App/dtos";
import { Prisma } from "@prisma/client";

@Injectable()
export class GameRepository {
    constructor(private prisma: PrismaService){}


    async create(
        authorId: number, 
        dto: CreateGameDto
        ){
            const game = await this.prisma.game.create({
                data: {
                    authorId,
                    ...dto
                }
            })
            return game
        }

    findAll(
        filters: { name?: string, genre?: string, rating?: number },
        orderBy: string = 'name', 
        sortOrder: 'asc' | 'desc' = 'asc'
        ){

            const { name, genre, rating } = filters

            const where: Prisma.GameWhereInput = {}

            if (name) {
                where.name = { contains: name }
            }
            if (genre) {
                where.genre = { contains: genre }
            }
            if (typeof rating === 'string') {
                const ratingNumber = parseInt(rating);
                if (!isNaN(ratingNumber)) {
                    where.rating = { equals: ratingNumber };
                }
            }
        
            return this.prisma.game.findMany({
                where,
                orderBy: {
                    [orderBy]: sortOrder
                }
            })
        }

    findOne(
        id:number
        ){
            return this.prisma.game.findFirst({
                where: {
                    id: id
                    
                }
            })
        }

    async update(
        id: number,
        dto: UpdateGameDto
        ){
            await this.prisma.game.findUnique({
                where: {
                    id:id
                }
            })

            return this.prisma.game.update({
                where: {
                    id:id
                },
                data: {
                    ...dto
                }
            })
        }

    async delete(
        id:number
        ){
            await this.prisma.game.findUnique({
                where: {
                    id:id
                }
            })

            await this.prisma.game.delete({
                where: {
                    id:id
                }
            })
        }
}