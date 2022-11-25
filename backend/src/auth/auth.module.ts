import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { MailModule } from 'backend/src/mail/mail.module'
import { TokenModule } from 'backend/src/token/token.module'
import { UserModule } from 'backend/src/user/user.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        TokenModule,
        MailModule,
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY,
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
    exports: [AuthService, JwtModule],
})
export class AuthModule {}
