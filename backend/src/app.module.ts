import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { User } from './models/user.model'
import * as path from 'path'
import { RoleModule } from './role/role.module'
import { Role } from './models/role.model'
import { UserRoles } from './models/user-roles.model'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { QuestionaryModule } from './questionary/questionary.module';
import { SendfileModule } from './sendfile/sendfile.module'


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env`,
            isGlobal: true,
        }),
        MailerModule.forRoot({
            transport: `smtps://${process.env.SMTP_USER}:${process.env.SMTP_PASSWORD}@${process.env.SMTP_HOST}`,
            defaults: {
                from: `"no reply" <${process.env.SMTP_USER}>`,
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new EjsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: Number(process.env.DB_PORT) || 5432,
            username: process.env.DB_USER || 'postgres',
            password: process.env.DB_PASSWORD || 'postgres',
            database: process.env.DB_NAME || 'ogetto',
            models: [User, Role, UserRoles],
            autoLoadModels: true,
            /* sync: { force: true }, */
        }),
        UserModule,
        AuthModule,
        RoleModule,
        QuestionaryModule,
        SendfileModule

    ],
})
export class AppModule {}
