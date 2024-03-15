/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsPositive, IsString, Length, Max, Min } from "class-validator"

export class CreateGameDto {

    @IsNotEmpty({message: 'The game name should not be empty'})
    @Length(3,40,{message: 'The name should be at least 3 characters'})
    @IsString()

    name: string

    @Length(2,40,{message: 'The genre should be at least 2 characters'})
    @IsNotEmpty({message: 'The game genre should not be empty'})
    @IsString()

    genre: string

    @IsNotEmpty({message: 'The game rating should not be empty'})
    @Min(0)
    @Max(10)
    rating: number
}