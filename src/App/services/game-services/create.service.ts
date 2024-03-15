import { InternalServerErrorException } from "@nestjs/common";
import { Game } from "@prisma/client";
import { CreateGameDto } from "src/App/dtos";
import { GameRepository } from "src/Infra/repositories/game.repository";


export async function createService(
    gameRepository: GameRepository,
    authorId: number, 
    dto: CreateGameDto
    ): Promise<{ message?: string, data: Game}>{
        try {
            const game = await gameRepository.create(authorId, dto)
            return { message: 'Game created successfully!', data: game  }
        } catch (error) {
            throw new InternalServerErrorException('Error creating the game!')
        }
    }