import { Global, Module } from "@nestjs/common";
import { PrismaService } from "../App/services/prisma.service";

@Global()
@Module({
    providers: [PrismaService],
})
export class PrismaModule{}