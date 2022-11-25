import { Injectable } from '@nestjs/common';
import { UserService } from 'backend/src/user/user.service';
import { CreateQuestDto } from './dto/createQuest.dto';

@Injectable()
export class QuestionaryService {
  constructor(private userSerice: UserService) {}

  async createQuest(questData: CreateQuestDto) {
    const alluser = await this.userSerice.getAllWithoutNewbie(questData.id);
    var arr = [];
    while (arr.length < questData.count-1) {
      var r = Math.floor(Math.random() * 100) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
  }
}
