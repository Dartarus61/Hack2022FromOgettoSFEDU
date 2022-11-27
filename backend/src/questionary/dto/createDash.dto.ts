import { ApiProperty } from '@nestjs/swagger';

export class CreateLineOfDashboardDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  readonly userId: number;
  @ApiProperty({ example: 15, description: 'Кол-во набранных баллов' })
  readonly count: number;
  @ApiProperty({ example: 1, description: 'Номер квиза' })
  readonly typeOfQuiz: number;
}
