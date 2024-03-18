import { SetMetadata } from "@nestjs/common"
import { Role } from "@prisma/client"
import * as dotenv from 'dotenv'

dotenv.config()

export const ROLES_KEY = 'roles'

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)