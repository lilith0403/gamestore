/* eslint-disable prettier/prettier */

import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../../App/services/auth.service";
import { AuthDto } from "../../App/dtos/auth.dto";
import { RtGuard } from "src/App/common/guards";
import { GetCurrentUser, GetCurrentUserId, Public } from "src/App/common/decorators";
import { Tokens } from "../../App/types/index";

@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @Public()
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal(@Body() dto:AuthDto): Promise<Tokens>{
        return this.authService.signupLocal(dto)
    }

    @Public()
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal(@Body() dto:AuthDto): Promise<Tokens>{
        return this.authService.signinLocal(dto)
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentUserId() userId: number){
        return this.authService.logout(userId)
    }

    @Public()
    @UseGuards(RtGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
        @GetCurrentUserId() userId: number,
        @GetCurrentUser('refreshToken') refreshToken: string,
        ){
        return this.authService.refreshTokens(userId, refreshToken)
    }
}