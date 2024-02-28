/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsPositive, IsString, Length } from "class-validator"

export class CreateGameDto {

    @IsNotEmpty({
        message: 'The game name should not be empty'
    })
    @Length(3,40,{
        message: 'The name should be at least 3 characters'
    })
    @IsString()
    name: string

    @IsNotEmpty({
        message: 'The game genre should not be empty'
    })
    @IsString()
    genre: string

    @IsNotEmpty({
        message: 'The game rating should not be empty'
    })
    @IsPositive()
    rating: number
}