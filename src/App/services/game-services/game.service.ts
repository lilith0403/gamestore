import { CreateGameDto, UpdateGameDto } from "src/App/dtos";
import { GameRepository } from "../../../Infra/repositories/game.repository";
import { createService } from "./create.service";
import { deleteService } from "./delete.service";
import { findAllService } from "./findAll.service";
import { findOneService } from "./findOne.service";
import { updateService } from "./update.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GameService{
    constructor(private gameRepository: GameRepository){}

    async findAll(
        filters: { name?: string, genre?: string, rating?:number },
        orderBy: string = 'name',
        sortOrder: 'asc' | 'desc' = 'asc'
    ){
        return await findAllService(this.gameRepository, filters, orderBy, sortOrder)
    }

    async findOne(
        authorId:number,
        id:number
    ){
        return await findOneService(this.gameRepository, authorId, id)
    }

    async create(
        authorId: number,
        dto: CreateGameDto
        ){
        return await createService(this.gameRepository, authorId, dto)
    }

    async update(
        authorId:number,
        id:number,
        dto:UpdateGameDto
        ){
            return await updateService(this.gameRepository, authorId, id, dto)
        }

    async delete(
        authorId: number,
        id:number
        ){
            return await deleteService(this.gameRepository, authorId, id)
        }

}