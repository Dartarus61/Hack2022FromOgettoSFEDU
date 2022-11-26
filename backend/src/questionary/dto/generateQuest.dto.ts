import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { EOffice, EQuest } from 'src/models/quest.model';

export class CreateQuestDto {
  @ApiProperty({ example: 'designer', description: 'Должность' })
  @IsString({ message: 'Должно быть строкой' })
  readonly position: string;
  @ApiProperty({ example: 'УДАЛЕННО/В ОФИСЕ', description: 'Тип работы' })
  @IsString({ message: 'Должно быть строкой' })
  readonly typeOfWork: EQuest;
  @ApiProperty({
    example: 'РОСТОВ-НА-ДОНУ/ТАГАНРОГ',
    description: 'В каком офисе работает',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly office: EOffice;
  @ApiProperty({ example: 'Москва', description: 'Город проживания' })
  @IsString({ message: 'Должно быть строкой' })
  readonly city: string;
  @ApiProperty({
    example: 'Я люблю пить пиво',
    description: 'Факты о своей работе',
  })
  @IsString({ message: 'Должно быть строкой' })
  readonly fact: string;
  @ApiProperty({ example: 5, description: 'ID пользователя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  userId: number;
}
