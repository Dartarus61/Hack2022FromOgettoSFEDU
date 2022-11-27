import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Quest } from 'src/models/quest.model';
import { UpdateUserDto } from 'src/questionary/dto/UpdateUser.dto';
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

  @ApiOperation({ summary: 'Изменение данных пользователя' })
  @ApiResponse({ status: 200, type: Quest })
  @Put('/updata')
  ChangeData(@Body() dto: UpdateUserDto) {
    return this.questService.updateUser(dto);
  }

  @ApiOperation({ summary: 'Получение списка лидеров' })
  @Get('/dash/:id')
  GetDash(@Param('id') id: number) {
    return this.questService.getDash(id);
  }
}
