/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, HttpCode, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { CreateGameDto } from './dtos/create-game';
import { UpdateGameDto } from "./dtos/update-game";
import { GameService } from "./game.service";
import { Game } from "@prisma/client";

@Controller('games')
export class GameController{
    constructor(private gameService: GameService) {}
    
@Post()
async create(@Body() body:CreateGameDto):Promise<{ sucess:boolean, message?:string }>{
    const { name, genre, rating } = body
    return await this.gameService.create(name, genre, rating)
    }

@Get()
async findAll(
    @Query('name') name?:string,
    @Query('genre') genre?:string,
    @Query('rating') rating?:number,
    @Query('sortBy') sortBy: 'name' | 'genre' | 'rating' = 'name',
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
):Promise<{ message: string, data:Game[] }> {
    const filter = { name, genre, rating }
    return await this.gameService.findAll(filter, sortBy, sortOrder)
}

@Get(':id')
async findOne(@Param('id') id: string): Promise<{sucess:boolean, message?:string, data?:Game}>{
    return this.gameService.findOne(id)
}


@Put(':id')
async update(@Param('id') id: string, @Body()body:UpdateGameDto): Promise<{ sucess:boolean, data?:Game, message?:string }>{
    const { name, genre, rating } = body
    return this.gameService.update(id, name, genre, rating)
    }


@Delete(':id')
async delete (@Param('id')id:string): Promise<{sucess: boolean, message?:string}>{
    return this.gameService.delete(id)
}
}


