import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';
import { EOffice, EQuest } from 'src/models/quest.model';

export class UpdateUserDto {
  @ApiProperty({ example: 5, description: 'ID пользователя' })
  @IsNumber({}, { message: 'Должно быть числом' })
  id: number;
  readonly position: string;
  readonly typeOfWork: EQuest;
  readonly office: EOffice;
  readonly city: string;
  readonly fact: string;
}
