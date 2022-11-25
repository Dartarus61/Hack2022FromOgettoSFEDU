import { forwardRef, Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'backend/src/auth/auth.module'
import { MailModule } from 'backend/src/mail/mail.module'
import { Role } from 'backend/src/models/role.model'
import { RoleModule } from 'backend/src/role/role.module'
import { UserRoles } from 'backend/src/models/user-roles.model'
import { UserController } from './user.controller'
import { User } from '../models/user.model'
import { UserService } from './user.service'
import { TokenModule } from 'backend/src/token/token.module'


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
