/* eslint-disable prettier/prettier */

import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionfIlter implements ExceptionFilter{
    catch(exception: NotFoundExceptionfIlter, host: ArgumentsHost) {
        const context = host.switchToHttp()
        const response = context.getResponse<Response>()
        response.status(404).json({
            statusCode: 404,
            message: 'Recurso nao encontrado!'
        })
    }
}