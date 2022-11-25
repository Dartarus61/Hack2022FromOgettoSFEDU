import { forwardRef, Module } from '@nestjs/common'
import { UserModule } from 'backend/src/user/user.module'
import { MailService } from './mail.service'

@Module({
    providers: [MailService],
    imports: [],
    exports: [MailService],
})
export class MailModule {}
