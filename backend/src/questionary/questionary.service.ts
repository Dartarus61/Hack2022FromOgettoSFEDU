import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { FilesService } from 'src/files/files.service';
import { Dashboard } from 'src/models/dashboard.model';
import { EOffice, EQuest, Quest } from 'src/models/quest.model';
import { User } from 'src/models/user.model';
import { UserService } from 'src/user/user.service';
import { CreateLineOfDashboardDto } from './dto/createDash.dto';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { CreateQuestDto } from './dto/generateQuest.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class QuestionaryService {
  constructor(
    private userSerice: UserService,
    private fileService: FilesService,
    @InjectModel(Quest) private questRepository: typeof Quest,
    @InjectModel(Dashboard) private dashRepository: typeof Dashboard,
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
          answer: quest.position,
          employee: `${quest.surname} ${quest.name} ${quest.middlename}`,
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

  async updateUser(dto: UpdateUserDto) {
    const userQuest = await this.questRepository.findOne({
      where: { userId: dto.id },
    });

    if (userQuest) {
      const result = await userQuest.update({ ...dto });
      return result;
    }
    throw new HttpException(
      'Анкета пользователя не найдена',
      HttpStatus.NOT_FOUND,
    );
  }

  async getDash(quizId: number) {
    return this.dashRepository.findAll({
      where: { numberOfQuiz: quizId },
      limit: 25,
      order: [['count', 'DESC']],
    });
  }

  async createLineOfDashboard(quizData: CreateLineOfDashboardDto) {
    const user = await this.userSerice.getUserById(quizData.userId);
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    const dashLine = await this.dashRepository.findOne({
      where: {
        username: `${user.questId.surname} ${user.questId.name}`,
        numberOfQuiz: quizData.typeOfQuiz,
      },
    });
    if (dashLine) {
      await dashLine.update({ count: quizData.count });
      return dashLine;
    }
    return this.dashRepository.create({
      username: `${user.questId.surname} ${user.questId.name}`,
      count: quizData.count,
      numberOfQuiz: quizData.typeOfQuiz,
    });
  }
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
