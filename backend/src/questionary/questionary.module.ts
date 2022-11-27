import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryController } from './questionary.controller';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Quest } from 'src/models/quest.model';
import { User } from 'src/models/user.model';
import { FilesModule } from 'src/files/files.module';
import { Dashboard } from 'src/models/dashboard.model';

@Module({
  providers: [QuestionaryService],
  controllers: [QuestionaryController],
  imports: [
    UserModule,
    FilesModule,
    SequelizeModule.forFeature([Quest, User, Dashboard]),
  ],
})
export class QuestionaryModule {}
