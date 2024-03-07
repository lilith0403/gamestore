import { HttpException, HttpStatus } from "@nestjs/common";
import { GameRepository } from "../repositories/game-repository"
import { GameService } from "./game.service"
import { Test, TestingModule } from "@nestjs/testing";

describe('GameService', () => {
    let gameService: GameService
    let gameRepositoryMock: jest.Mocked<GameRepository>


    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameService,
                {
                    provide: GameRepository,
                    useFactory: () => ({
                        findAll: jest.fn(),
                        create: jest.fn(),
                        findByName: jest.fn(),
                        findOne: jest.fn(),
                        updateOne: jest.fn(),
                        deleteOne: jest.fn()
                    }),
                },
            ],
        }).compile()

        gameService = module.get<GameService>(GameService)
        gameRepositoryMock = module.get (GameRepository) as jest.Mocked<GameRepository>
    })

    describe('findAll', () => {
        it('should return games successfully', async () => {
            const filter = { name: 'Test', genre: 'Action', rating: 3 }
            const sortBy = 'name'
            const sortOrder = 'asc'
            const mockGames = [
                { id: '1', name: 'Test 1', genre: 'Action', rating: 3 },
                { id: '2', name: 'Test 2', genre: 'Action', rating: 3 }
            ]

            gameRepositoryMock.findAll.mockResolvedValue(mockGames)

            const result = await gameService.findAll(filter, sortBy, sortOrder)

            expect(result.message).toEqual('Here are the games!')
            expect(result.data).toEqual(mockGames)
            expect(gameRepositoryMock.findAll).toHaveBeenCalledWith(filter, sortBy, sortOrder)
        })
        

        it('shoul return an internal server error on repository error', async () => {
            const filter = { name: 'Test', genre: 'Action', rating: 3 }
            const sortBy = 'name'
            const sortOrder = 'asc'

            gameRepositoryMock.findAll.mockRejectedValue(new Error('Database error'))

            await expect(gameService.findAll(filter, sortBy, sortOrder)).rejects.toThrow(
                new HttpException('Could not search the games!', HttpStatus.INTERNAL_SERVER_ERROR)
            )
        })
        
    })

    describe('create', () => {
        it('should create a game successfully', async () => {
            const name = 'Teste123'
            const genre = 'Action'
            const rating = 3

            gameRepositoryMock.findByName.mockResolvedValue(null)

            gameRepositoryMock.create.mockResolvedValue()

            const result = await gameService.create(name, genre, rating)

            expect(result.success).toBe(true)
            expect(result.message).toEqual(`Game with name ${name} created successfully!`)
            expect(gameRepositoryMock.findByName).toHaveBeenCalledWith(name)
            expect(gameRepositoryMock.create).toHaveBeenCalledWith(name, genre, rating)
        })

        it('should return an conflict exception if the game alredy exists', async () => {
            const name = 'Existing Game'
            const genre = 'Action'
            const rating = 3

            gameRepositoryMock.findByName.mockResolvedValue({ id: '2', name, genre, rating })

            await expect(gameService.create(name, genre, rating)).rejects.toThrow(
                new HttpException(`The game with name ${name} alredy exists!`, HttpStatus.CONFLICT)
            )
            expect(gameRepositoryMock.findByName).toHaveBeenCalledWith(name)
            expect(gameRepositoryMock.create).not.toHaveBeenCalled
        })

        it('should throw an internal server error on repository error', async () => {
            const name = 'Example Game'
            const genre = 'Action'
            const rating = 3

            gameRepositoryMock.findByName.mockRejectedValue(new Error('Database error'))

            await expect(gameService.create(name, genre, rating)).rejects.toThrow(
                new HttpException('Error creating the game!', HttpStatus.INTERNAL_SERVER_ERROR)
            )
            expect(gameRepositoryMock.findByName).toHaveBeenCalledWith(name)
            expect(gameRepositoryMock.create).not.toHaveBeenCalled()
        })
    })

    describe('findOne', () => {
        it('should find one game successfully', async () => {

            const id = '1'
            const mockGame = { id , name: 'Test 1', genre: 'Action', rating: 3 }

            gameRepositoryMock.findOne.mockResolvedValue(mockGame)

            const result = await gameService.findOne(id)

            expect(result.sucess).toBe(true)
            expect(result.data).toEqual(mockGame)
            expect(result.message).toEqual('Game found successfully!')
        })
        it('should throw a not found exception if the game doesnt exists', async () => {

            const id = '2'

            gameRepositoryMock.findOne.mockResolvedValue(null)

            await expect(gameService.findOne(id)).rejects.toThrow(
                new HttpException(`Game with ID: '${id}' not found!`, HttpStatus.NOT_FOUND)
            )
        })
        it('should throw a internal server error on repository error', async () => {
            const id = '2'
            const mockGame = { id, name: 'Database', genre: 'Error', rating: 3 }

            gameRepositoryMock.findOne.mockRejectedValue(new Error('Database error'))

            await expect (gameService.findOne(id)).rejects.toThrow(
                new HttpException(`Error finding game with ID: '${2}'`, HttpStatus.INTERNAL_SERVER_ERROR)
            )
        })
    })

    describe('update', () => {
        it('should update a game successfully', async () => {
            const id = '2'
            const name = 'Updated Game'
            const genre = 'Action'
            const rating = 3
            const mockGame = { id, name, genre, rating }

            gameRepositoryMock.findOne.mockResolvedValue(mockGame)

            gameRepositoryMock.updateOne.mockResolvedValue(mockGame)

            const result = await gameService.update(id, name, genre, rating)

            expect(result.sucess).toBe(true)
            expect(result.data).toEqual(mockGame)
            expect(result.message).toEqual('Game updated successfully!')
        })

        it('should throw a not found exception if game dont exists', async () => {
            const id = '2'
            const name = 'Updated Game'
            const genre = 'Action'
            const rating = 3
            const mockGame = { id, name, genre, rating }

            gameRepositoryMock.findOne.mockResolvedValue(null)
            
            await expect(gameService.update(id, name, genre, rating)).rejects.toThrow(
                new HttpException(`Game with ID: '${id}' not found!`, HttpStatus.NOT_FOUND)
            )

            expect(gameRepositoryMock.findOne).toHaveBeenCalledWith(id)
            expect(gameRepositoryMock.updateOne).not.toHaveBeenCalled()
        })
        it('should throw a internal server error on repository error', async () => {
            const id = '2'
            const name = 'Updated Game'
            const genre = 'Action'
            const rating = 3
            const mockGame = { id, name, genre, rating }

            gameRepositoryMock.findOne.mockResolvedValue(mockGame)
            gameRepositoryMock.updateOne.mockRejectedValue(new Error('Database error'))

            await expect(gameService.update(id, name, genre, rating)).rejects.toThrow(
                new HttpException(`Error updating the game with ID: '${id}'`, HttpStatus.INTERNAL_SERVER_ERROR)
            )
        })
    })


    describe('delete', () => {
        it('should delete a game successfully', async () => {
            const id = '2'
            const mockGame = { id, name: 'Deleted game', genre: 'Action', rating: 3 }

            gameRepositoryMock.findOne.mockResolvedValue(mockGame)

            gameRepositoryMock.deleteOne.mockResolvedValue()

            const result = await gameService.delete(id)

            expect(result.sucess).toBe(true)
            expect(result.message).toEqual(`Game with ID: '${id}' deleted successfully!`)
        })
        it('should throw a not found exception if game dont exists', async () => {
            const id = '2'
            const mockGame = { id, name: 'Notfound game', genre: 'Action', rating: 3 }

            gameRepositoryMock.findOne.mockResolvedValue(null)

            await expect(gameService.delete(id)).rejects.toThrow(
                new HttpException(`Game with ID: '${id}' not found!`, HttpStatus.NOT_FOUND)
            )
            expect(gameRepositoryMock.findOne).toHaveBeenCalledWith(id)
            expect(gameRepositoryMock.deleteOne).not.toHaveBeenCalled()
        })
        it('should throw a internal server error on repository error', async () => {

            const id = '2'
            const mockGame = { id, name: 'Notfound game', genre: 'Action', rating: 3 }

            gameRepositoryMock.findOne.mockResolvedValue(mockGame)

            gameRepositoryMock.deleteOne.mockRejectedValue(new Error('Database error'))

            await expect(gameService.delete(id)).rejects.toThrow(
                new HttpException(`Error deleting game with ID: '${id}'`, HttpStatus.INTERNAL_SERVER_ERROR)
            )
            expect(gameRepositoryMock.findOne).toHaveBeenCalledWith(id)
        })
    });
})