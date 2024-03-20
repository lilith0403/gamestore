import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { GameRepository } from "src/Infra/repositories/game.repository";


export async function findOneService(
    gameRepository: GameRepository,
    id:number
    ){
        try {
            const game = await gameRepository.findOne(id)
            if (!game) {
                throw new NotFoundException('Game not found!')
            }
            return game
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error
            }
            throw new InternalServerErrorException('Error finding the game')
        }
    }