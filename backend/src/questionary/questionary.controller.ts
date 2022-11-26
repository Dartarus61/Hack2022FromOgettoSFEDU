import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuizDto } from './dto/createQuiz.dto';
import { CreateQuestDto } from './dto/generateQuest.dto';
import { OutputDataDto } from './dto/outputData.dto';
import { QuestionaryService } from './questionary.service';

@ApiTags('Создание тестов & анкета')
@Controller('questionary')
export class QuestionaryController {
  constructor(private questService: QuestionaryService) {}

  @ApiOperation({ summary: 'создание анкеты сотрудника' })
  @ApiResponse({ status: 200 })
  @Post('/createquest')
  @UseInterceptors(FileInterceptor('file'))
  Createquest(
    @Body() questData: CreateQuestDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.questService.createQuest(questData, file);
  }

  @ApiOperation({ summary: 'Генерация теста для пользователя' })
  @ApiResponse({ status: 200, type: OutputDataDto })
  @Get('/getqa')
  GenerateQA(@Body() userData: CreateQuizDto) {
    return this.questService.generateQuest(userData);
  }
}
