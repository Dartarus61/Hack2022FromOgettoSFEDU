import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'

import { UserController } from './user.controller'
import { User } from '../models/user.model'
import { UserService } from './user.service'
import { AuthModule } from 'src/auth/auth.module'
import { MailModule } from 'src/mail/mail.module'
import { Role } from 'src/models/role.model'
import { UserRoles } from 'src/models/user-roles.model'
import { RoleModule } from 'src/role/role.module'
import { TokenModule } from 'src/token/token.module'



@Module({
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
    imports: [
        SequelizeModule.forFeature([User, Role, UserRoles]),
        RoleModule,
        MailModule,
        forwardRef(() => AuthModule),
        TokenModule,
     
    ],
})
export class UserModule {}
