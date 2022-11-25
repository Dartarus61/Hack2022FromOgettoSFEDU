import { Module } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';
import { QuestionaryController } from './questionary.controller';
import { UserModule } from 'backend/src/user/user.module';

@Module({
  providers: [QuestionaryService],
  controllers: [QuestionaryController],
  imports: [UserModule]
})
export class QuestionaryModule {}
