import { ForbiddenException, NotFoundException } from "@nestjs/common"
import { GameRepository } from "src/Infra/repositories/game.repository"

export async function deleteService(
    gameRepository: GameRepository,
    authorId:number, 
    id:number
    ):Promise<{message?: string, data: void}>{
        const game = await gameRepository.findOne(authorId, id)

        if (!game || game.authorId !== authorId) {
            throw new ForbiddenException('Access to resource denied!')
        }

        const del = await gameRepository.delete(id)

        return { message: 'Game deleted', data:del}
    }
