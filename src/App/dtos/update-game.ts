/* eslint-disable prettier/prettier */

import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateGameDto{


    @IsString()
    @IsOptional()
    name?:string

    @IsString()
    @IsOptional()
    genre?:string

    @IsNumber()
    @IsOptional()
    rating?:number
}