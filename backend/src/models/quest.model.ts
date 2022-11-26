import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './user.model';

export enum EQuest {
  OFFICE = 'В ОФИСЕ',
  DISTANT = 'УДАЛЕННО',
}

export enum EOffice {
  ROSTOV = 'РОСТОВ-НА-ДОНУ',
  TAGANROG = 'ТАГАНРОГ',
}

@Table({ tableName: 'Quest', timestamps: false, freezeTableName: true })
export class Quest extends Model<Quest> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'sdg456-ag45-sdfsd4-ddfg4.jpg',
    description: 'название фото',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  photoPath: string;

  @ApiProperty({ example: 'backend lead', description: 'Должность' })
  @Column({ type: DataType.STRING, allowNull: false })
  position: string;

  @ApiProperty({ example: 'УДАЛЕННО/В ОФИСЕ', description: 'Тип работы' })
  @Column({
    type: DataType.ENUM(EQuest.DISTANT, EQuest.OFFICE),
    allowNull: false,
  })
  typeOfWork: EQuest;

  @ApiProperty({
    example: 'РОСТОВ-НА-ДОНУ/ТАГАНРОГ',
    description: 'В каком офисе работает',
  })
  @Column({
    type: DataType.ENUM(EOffice.ROSTOV, EOffice.TAGANROG),
    allowNull: true,
  })
  office: EOffice;

  @ApiProperty({ example: 'Москва', description: 'Город проживания' })
  @Column({ type: DataType.STRING, allowNull: true })
  city: string;

  @ApiProperty({
    example: 'Учу дружбе сервера',
    description: 'Факты о своей работе',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  fact: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
