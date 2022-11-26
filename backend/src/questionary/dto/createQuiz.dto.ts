import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({ example: 10, description: 'Кол-во вопросов' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly count: number;
  @ApiProperty({ example: 5, description: 'ID пользователя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly id: number;
}
