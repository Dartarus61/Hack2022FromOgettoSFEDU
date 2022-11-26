import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateQuestDto } from './dto/generateQuest.dto';
import { QuestionaryService } from './questionary.service';


@Controller('questionary')
export class QuestionaryController {
constructor (private questService: QuestionaryService) {}

    @Post('/createquest')
    Createquest(@Body() questData: CreateQuestDto) {
        return this.questService.createQuest(questData)
    }
}
