import { InternalServerErrorException, NotFoundException } from "@nestjs/common"
import { GameRepository } from "../../../Infra/repositories/game.repository"
import { Game } from "@prisma/client";



export async function findAllService(
    gameRepository: GameRepository,
    filters: { name?: string, genre?: string, rating?: number },
    orderBy: string = 'name', 
    sortOrder: 'asc' | 'desc' = 'asc'
): Promise<{ message?: string, data?: Game[]}> {
try {
    const games = await gameRepository.findAll(filters, orderBy, sortOrder);
    if (games.length === 0) {
        throw new NotFoundException('No games found matching the specified criteria.');
    }
    return {message: 'Games found successfully', data: games };
} catch (error) {
    if (error instanceof NotFoundException) {
        throw error
    }
    throw new InternalServerErrorException('Error searching the games!');
}
}