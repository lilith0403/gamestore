import { InternalServerErrorException } from "@nestjs/common"
import { GameRepository } from "../../../Infra/repositories/game.repository"



export async function findAllService(
    gameRepository: GameRepository,
    filters: { name?: string, genre?: string, rating?: number },
    orderBy: string = 'name', 
    sortOrder: 'asc' | 'desc' = 'asc'
    ){
        try {
            return gameRepository.findAll(filters, orderBy, sortOrder)
        } catch (error) {
            throw new InternalServerErrorException('Error searching the games!')
        }
    }