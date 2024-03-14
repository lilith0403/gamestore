import { InternalServerErrorException } from "@nestjs/common";
import { CreateGameDto } from "src/App/dtos";
import { GameRepository } from "src/Infra/repositories/game.repository";


export async function createService(
    gameRepository: GameRepository,
    authorId: number, 
    dto: CreateGameDto
    ){
        try {
            return await gameRepository.create(authorId, dto)
        } catch (error) {
            throw new InternalServerErrorException('Error creating the game!')
        }
    }