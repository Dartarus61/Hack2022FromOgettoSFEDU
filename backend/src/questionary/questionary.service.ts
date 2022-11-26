import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Quest } from 'src/models/quest.model';
import { UserService } from 'src/user/user.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { CreateQuestDto } from './dto/generateQuest.dto';

@Injectable()
export class QuestionaryService {
  constructor(private userSerice: UserService,
    @InjectModel(Quest) private questRepository: typeof Quest) {}

  async createQuest(questData: CreateQuestDto) {
    const user = await this.userSerice.getUserById(questData.userId)
    delete questData.userId
    const newQuest = await this.questRepository.create({...questData})
    await user.$set('questId', newQuest)
  }

  async generateQuest(questData: CreateQuizDto) {
    var arr = [];
    while (arr.length < questData.count-1) {
      var r = Math.floor(Math.random() * 100) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    const result = Promise.all(arr.map(async el=> {
      return this.userSerice.getUserById(el)
    }))
  }
}
