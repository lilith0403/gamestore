/* eslint-disable prettier/prettier */

import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Game } from "@prisma/client";
import { generateKeySync } from "crypto";
import { PrismaService } from "src/database/prisma.service";
import { GameRepository } from "src/repositories/game-repository";


@Injectable()
export class GameService{
    constructor(private gameRepository:GameRepository, private readonly prisma:PrismaService)
    {}

    async create(name:string, genre:string, rating:number){
        try {
            const gameExists = await this.gameRepository.findByName(name)
            if(gameExists){
                throw new HttpException(`The game with name ${name} alredy exists`, HttpStatus.CONFLICT)
            } else{
                const game = await this.gameRepository.create(name, genre,rating)
                return {sucess:true, data:game, message: `Game with name ${name} created successfully!`}
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            } else {
                throw new HttpException (`Error creating the game`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async findAll():Promise<{ data: Game[], message: string}>{
        try{
            const games = await this.gameRepository.findAll()
            return { message: 'Here are the games!', data: games }
        } catch (error) {
            throw new HttpException (`Error searching the games`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async findOne(id:string): Promise<{sucess:boolean, message?:string, data?:Game}>{
        try {
            const found = await this.gameRepository.findOne(id)
            if(!found){
                throw new HttpException(`Game with ID: {${id}} not found`, HttpStatus.NOT_FOUND)
            }
            return {sucess:true, data:found, message: 'Game found successfully!'}
        } catch (error) {
            if(error instanceof HttpException){
                throw error
            } else{
                throw new HttpException (`Error finding game with ID: {${id}}`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async update(id:string, name:string, genre:string, rating:number):Promise<{sucess:boolean, data?:Game, message?:string}>{
        try {
            const found = await this.gameRepository.findOne(id)
            if(!found){
                throw new HttpException(`Game with ID {${id}} not found`, HttpStatus.NOT_FOUND)
            } else{
                const game = await this.gameRepository.updateOne(id,name,genre,rating)
                return { sucess:true, message:'Game updated successfully!', data:game }
            }
        } catch (error) {
            if (error instanceof HttpException) {
                throw error
            } else{
                throw new HttpException (`Error updating game with ID: {${id}}`, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
    }

    async delete(id:string):Promise<any>{
        await this.gameRepository.deleteOne(id)
    }
    
}