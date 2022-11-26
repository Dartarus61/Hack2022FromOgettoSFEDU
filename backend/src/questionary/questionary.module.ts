import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryController } from './questionary.controller';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quest } from 'src/models/quest.model';
import { User } from 'src/models/user.model';


@Module({
  providers: [QuestionaryService],
  controllers: [QuestionaryController],
  imports: [UserModule,SequelizeModule.forFeature([Quest, User])]
})
export class QuestionaryModule {}
