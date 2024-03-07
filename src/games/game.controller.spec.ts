import { Test, TestingModule } from "@nestjs/testing"
import { GameController } from "./game.controller"
import { GameService } from "./game.service"
import { HttpException, HttpStatus } from "@nestjs/common"

describe('GameController', () => {
    let gameController: GameController
    let gameServiceMock: jest.Mocked<GameService>

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GameController],
            providers: [{
                provide: GameService,
                useFactory: () => ({
                    create: jest.fn(),
                    findAll: jest.fn(),
                    findOne: jest.fn(),
                    update: jest.fn(),
                    delete: jest.fn()
                })
            }]
        }).compile()

        gameController = module.get<GameController>(GameController)
        gameServiceMock = module.get(GameService) as jest.Mocked<GameService>

    })

    describe('create', () => {
        it('should create a game successfully', async () => {
            const createGameDto = {
                name: 'Teste',
                genre: 'Action',
                rating: 3
            }

            await gameController.create(createGameDto)

            expect(gameServiceMock.create).toHaveBeenCalledWith(createGameDto.name, createGameDto.genre, createGameDto.rating)
        })

        it('should throw a internal server error when something goes wrong with the creation', async () => {

            const createGameDto = {
                name: 'Teste',
                genre: 'Action',
                rating: 3
            }

            gameServiceMock.create.mockRejectedValue(
                new HttpException('Error creating the game', HttpStatus.INTERNAL_SERVER_ERROR)
            )

            await expect(gameController.create(createGameDto)).rejects.toThrow(
                new HttpException('Error creating the game', HttpStatus.INTERNAL_SERVER_ERROR)
            )
            expect(gameServiceMock.create).toHaveBeenCalledWith(createGameDto.name, createGameDto.genre, createGameDto.rating)
        })
    })

    describe('findAll', () => {
        it('should return the games successfully', async () => {
            const filter = { name: 'Teste', genre: 'Action', rating: 3 }
            const sortBy = 'name'
            const sortOrder = 'asc'
            const mockGames = [{ id: '1', name: 'Teste', genre: 'Action', rating: 3 }, { id: '2', name: 'Testando', genre: 'Action', rating: 3 }]

            gameServiceMock.findAll.mockResolvedValue({message: 'Games found successfully!', data: mockGames})

            const result = await gameController.findAll(filter.name, filter.genre, filter.rating)

            expect(result).toEqual({message: 'Games found successfully!', data: mockGames})
            expect(gameServiceMock.findAll).toHaveBeenCalledWith(filter, sortBy, sortOrder)
        })
        it('should throw an internal server error if something goes wrong while finding games', async () => {
            const filter = { name: 'Test Game', genre: 'Action', rating: 4 };
            const sortBy = 'name';
            const sortOrder = 'asc';

            gameServiceMock.findAll.mockRejectedValue(new HttpException('Error finding games', HttpStatus.INTERNAL_SERVER_ERROR))

            await expect(gameController.findAll(filter.name, filter.genre, filter.rating, sortBy, sortOrder)).rejects.toThrow(
                new HttpException('Error finding games', HttpStatus.INTERNAL_SERVER_ERROR)
            )
            expect(gameServiceMock.findAll).toHaveBeenCalledWith(filter, sortBy, sortOrder)
        })
    })

    describe('findOne', () => {
        it('should find one game successfully', async () => {
            const id = '1'
            const mockGame = { id, name: 'Teste', genre: 'Action', rating: 3 }

            gameServiceMock.findOne.mockResolvedValue({ success: true, message: 'Game found successfully!', data: mockGame })

            const result = await gameController.findOne(id)

            expect(result).toEqual({ success: true, message: 'Game found successfully!', data: mockGame })
            expect(gameServiceMock.findOne).toHaveBeenCalledWith(id)
        })
        it('should throw a not found exception if the game doesnt exist', async () => {

            const id = '2'

            gameServiceMock.findOne.mockRejectedValue(
                new HttpException(`Game with ID: '${id}' not found!`, HttpStatus.NOT_FOUND)
            );
            
            await expect(gameController.findOne(id)).rejects.toThrow(
                new HttpException(`Game with ID: '${id}' not found!`, HttpStatus.NOT_FOUND)
            )
            expect(gameServiceMock.findOne).toHaveBeenCalledWith(id)
        })
        it('should throw an internal server error if something goes wrong while finding the game', async () => {

            const id = '3';

            gameServiceMock.findOne.mockRejectedValue(new HttpException('Error finding the game', HttpStatus.INTERNAL_SERVER_ERROR));

            await expect(gameController.findOne(id)).rejects.toThrow(
                new HttpException('Error finding the game', HttpStatus.INTERNAL_SERVER_ERROR),
            );
            expect(gameServiceMock.findOne).toHaveBeenCalledWith(id);
        });
    })

    describe('update', () => {
        it('should update a game successfully', async () => {
            const id = '1'
            const updateGameDto = {
                name: 'Teste',
                genre: 'Action',
                rating: 3
            }
            const mockGame = { id, name: 'Teste', genre: 'Action', rating: 3 }

            gameServiceMock.update.mockResolvedValue({ success: true, data: mockGame, message: 'Game updated successfully!' })

            const result = await gameController.update(id, updateGameDto)

            expect(result).toEqual({success: true, data: mockGame, message: 'Game updated successfully!'})
            expect(gameServiceMock.update).toHaveBeenCalledWith(id, updateGameDto.name, updateGameDto.genre, updateGameDto.rating)

        });
        it('should throw an internal server error when something goes wrong with the update', async () => {
            const id = '1';
            const updateGameDto = {
                name: 'Updated Game',
                genre: 'Adventure',
                rating: 5,
            };

            gameServiceMock.update.mockRejectedValue(
                new HttpException('Error while updating the game', HttpStatus.INTERNAL_SERVER_ERROR)
            );

            await expect(gameController.update(id, updateGameDto)).rejects.toThrow(
                new HttpException('Error while updating the game', HttpStatus.INTERNAL_SERVER_ERROR)
            );
            expect(gameServiceMock.update).toHaveBeenCalledWith(id, updateGameDto.name, updateGameDto.genre, updateGameDto.rating);
        });
    });

    describe('delete', () => {
        it('should delete a game successfully ', async () => {
            const id = '1'

            gameServiceMock.delete.mockResolvedValue({ success: true, message: 'Game deleted successfully!' })

            const result = await gameController.delete(id)

            expect(result).toEqual({ success: true, message: 'Game deleted successfully!' })
            expect(gameServiceMock.delete).toHaveBeenCalledWith(id)
        });
        it('should throw an internal server error when something goes wrong with the deletion', async () => {
            const id = '1';

            gameServiceMock.delete.mockRejectedValue(
                new HttpException('Error deleting the game', HttpStatus.INTERNAL_SERVER_ERROR)
            );

            await expect(gameController.delete(id)).rejects.toThrow(
                new HttpException('Error deleting the game', HttpStatus.INTERNAL_SERVER_ERROR)
            );
            expect(gameServiceMock.delete).toHaveBeenCalledWith(id);
        });
    });
})