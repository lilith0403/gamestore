import { ForbiddenException, NotFoundException } from "@nestjs/common"
import { GameRepository } from "src/Infra/repositories/game.repository"

export async function deleteService(
    gameRepository: GameRepository,
    authorId:number, 
    id:number
    ){
        const game = await gameRepository.findOne(authorId, id)
        console.log(game)
        console.log(authorId)
        console.log(id)

        if (!game) {
            throw new NotFoundException('Game not found!')
        } else {
            if (game.authorId !== id) {
                throw new ForbiddenException('Acess to resource denied!')
            }
        }

        await gameRepository.delete(id)  
    }

