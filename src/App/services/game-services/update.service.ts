import { ForbiddenException } from "@nestjs/common"
import { UpdateGameDto } from "src/App/dtos"
import { GameRepository } from "src/Infra/repositories/game.repository"

export async function updateService(
    gameRepository: GameRepository,
    authorId: number, 
    id: number,
    dto: UpdateGameDto
    ){
        const game = await gameRepository.findOne(authorId, id)

        if (!game || game.authorId !== authorId) {
            throw new ForbiddenException('Acess to resource denied!')
        }

        return gameRepository.update (id, dto)
    }
