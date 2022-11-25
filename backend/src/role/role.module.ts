import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { RoleController } from './role.controller'
import { Role } from '../models/role.model'
import { RoleService } from './role.service'
import { UserRoles } from '../models/user-roles.model'
import { User } from 'src/models/user.model'

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
    exports: [RoleService],
})
export class RoleModule {}
