import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { EOffice, EQuest, Quest } from 'src/models/quest.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { CreateQuestDto } from './dto/generateQuest.dto';

@Injectable()
export class QuestionaryService {
  constructor(
    private userSerice: UserService,
    private fileService: FilesService,
    @InjectModel(Quest) private questRepository: typeof Quest,
  ) {}

  async createQuest(questData: CreateQuestDto, file: Express.Multer.File) {
    const photoPath = await this.fileService.createFile(file);
    const user = await this.userSerice.getUserById(questData.userId);
    delete questData.userId;
    const newQuest = await this.questRepository.create({
      ...questData,
      photoPath,
    });
    await user.$set('questId', newQuest);
  }

  async generateQuest(questData: CreateQuizDto) {
    const paramsForSearching = await this.questRepository.findByPk(
      questData.id,
    );
    console.log(paramsForSearching);

    let countOfUsers;
    if (paramsForSearching.typeOfWork == EQuest.OFFICE) {
      countOfUsers = await this.userSerice.getCountofUsers(
        paramsForSearching.city,
      );
    } else {
      countOfUsers = await this.userSerice.getCountofUsers();
    }

    var questiorariesArr = [];
    while (questiorariesArr.length < questData.count) {
      var r = Math.floor(Math.random() * 100) + 1;
      if (questiorariesArr.indexOf(r) === -1 && r <= countOfUsers.count)
        questiorariesArr.push(r);
    }

    const position = await Promise.all(
      (
        await this.getAllQuestionaries()
      ).map((el) => {
        return el.position;
      }),
    );
    const uniquePosition = [...new Set(position)];

    const result = await Promise.all(
      questiorariesArr.map(async (el) => {
        const quest = await this.getQuestionaryById(el);
        const options = this.createAnswerOptions(
          paramsForSearching.position,
          uniquePosition,
        );
        return {
          photo: `${process.env.URL_FOR_IMG}${quest.photoPath}`,
          fact: quest.fact,
          options,
        };
      }),
    );
    return result;
  }

  async getQuestionaryById(id: number) {
    const quest = await this.questRepository.findByPk(id, { include: [User] });
    if (quest) return quest;
    throw new HttpException('пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async getAllQuestionaries() {
    return this.questRepository.findAll();
  }

  createAnswerOptions(positionOfUser: string, arrOfPositions: string[]) {
    var uniqueAnswer = [];
    uniqueAnswer.push(positionOfUser);
    while (uniqueAnswer.length < 3) {
      var r = Math.floor(getRandomArbitrary(1, arrOfPositions.length));
      console.log(r);
      if (uniqueAnswer.indexOf(arrOfPositions[r]) === -1)
        uniqueAnswer.push(arrOfPositions[r]);
    }

    return uniqueAnswer.sort((a, b) => a.length - b.length);
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
