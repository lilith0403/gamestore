/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, HttpCode, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { CreateGameDto } from "src/games/dtos/create-game";
import { UpdateGameDto } from "src/games/dtos/update-game";
import { GameService } from "./game.service";

@Controller('games')
export class GameController{
    constructor(private gameService: GameService) {}
    
@Post()
async create(@Body() body:CreateGameDto){
    const { name, genre, rating } = body
    return await this.gameService.create(name, genre, rating)
    }

@Get()
async findAll():Promise<any> {
    return await this.gameService.findAll()
}

@Get(':id')
async findOne(@Param('id') id: string){
    return await this.gameService.findOne(id)
}


@Put(':id')
async update(@Param('id') id: string, @Body()body:UpdateGameDto){
    const { name, genre, rating } = body

    return this.gameService.update(id, name, genre, rating)
    }


@Delete(':id')
async delete (@Param('id')id:string){
    return this.gameService.delete(id)
}
}


