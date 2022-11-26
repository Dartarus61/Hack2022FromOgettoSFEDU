import { ApiProperty } from '@nestjs/swagger';

export class OutputDataDto {
  @ApiProperty({
    example:
      'http://localhost:5000/sendfile/img/31ee8cd7-21c5-4784-aa51-5edbb6feec9e.jpg',
    description: 'URL на фото сотрудника',
  })
  photo: string;
  @ApiProperty({
    example: '[head,lead,worker]',
    description: 'Варианты ответов',
  })
  options: string[];

  @ApiProperty({
    example: 'проверяю людей на знание технологий',
    description: 'Факты о сотруднике',
  })
  fact: string;
  @ApiProperty({ example: 'worker', description: 'Правильный ответ' })
  answer: string;
}
