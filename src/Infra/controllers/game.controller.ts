import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { GameService } from "../../App/services/game-services/game.service";
import { GetCurrentUserId, Roles } from "src/App/common/decorators";
import { CreateGameDto, UpdateGameDto } from "../../App/dtos";
import { Role } from "@prisma/client";

@Controller('game')
export class GameController{
    constructor(
        private gameService: GameService
        ) {}

    @Get()
    @Roles(Role.ADMIN)
    async findAll(
        @Query('name') name:string,
        @Query('genre') genre:string,
        @Query('rating') rating:number,
        @Query('orderBy') orderBy: string,
        @Query('sortOrder') sortOrder:'asc' | 'desc' = 'asc',
        ){
            const filters = { name, genre, rating }
            return this.gameService.findAll(
                filters,
                orderBy,
                sortOrder
            )
        }

    @Get(':id')
    findOne(
        @Param('id', ParseIntPipe) id:number
        ){
            return this.gameService.findOne(
                id
            )
        }


    @Post()
    create(
        @GetCurrentUserId() authorId:number,
        @Body() dto:CreateGameDto
        ){
            return this.gameService.create(
                authorId,
                dto
            )
        }

    @Patch(':id')
    update(
        @GetCurrentUserId() authorId:number,
        @Param('id', ParseIntPipe) id:number,
        @Body() dto:UpdateGameDto,
        ){
            return this.gameService.update(
                authorId,
                id,
                dto
            )
        }


    @HttpCode(204)
    @Delete(':id')
    @Roles(Role.ADMIN)
    async delete(
        @GetCurrentUserId() authorId:number,
        @Param('id', ParseIntPipe) id:number,
        ){
            return await this.gameService.delete(
                authorId,
                id
            )
        }
}