import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Quest } from './quest.model';
import { Role } from './role.model';
import { UserRoles } from './user-roles.model';

interface UserCreationAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'User', timestamps: false, freezeTableName: true })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Почтовый адрес' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  acticationLink: string;

  @Column({ type: DataType.STRING, allowNull: true })
  switchKey: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  firstIn: boolean;

  @ApiProperty({ example: '[USER]', description: 'Роли пользователя' })
  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];

  @HasOne(() => Quest)
  questId: Quest;
}
