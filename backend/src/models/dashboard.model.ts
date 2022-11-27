import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Dashboard', timestamps: false, freezeTableName: true })
export class Dashboard extends Model<Dashboard> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 10, description: 'Кол-во набранных баллов' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  count: number;

  @ApiProperty({ example: 3, description: 'ФИ пользователя' })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  username: string;

  @ApiProperty({ example: 1, description: 'Номер квиза' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  numberOfQuiz: number;
}
