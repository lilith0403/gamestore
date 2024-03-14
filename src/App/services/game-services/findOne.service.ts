import { GameRepository } from "src/Infra/repositories/game.repository";


export async function findOneService(
    gameRepository: GameRepository,
    authorId: number, 
    id:number
    ){
        return await gameRepository.findOne(authorId,id)
    }