import { Body, Controller, Get } from '@nestjs/common';
import { QuestionaryService } from './questionary.service';


@Controller('questionary')
export class QuestionaryController {
constructor (private questService: QuestionaryService) {}

    @Get('/createquest')
    Createquest(@Body('count') questDto) {
        return this.questService.createQuest(questDto)
    }
}
