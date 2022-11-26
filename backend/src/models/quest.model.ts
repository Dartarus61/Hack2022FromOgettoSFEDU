import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { User } from './user.model'

export enum EQuest {
    OFFICE = 'В ОФИСЕ',
    DISTANT = 'УДАЛЕННО'
}

export enum EOffice {
    ROSTOV = 'РОСТОВ-НА-ДОНУ',
    TAGANROG = 'ТАГАНРОГ',
}

@Table({ tableName: 'Quest', timestamps:false, freezeTableName:true })
export class Quest extends Model<Quest> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'CREATOR', description: 'Роль' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    photoPath: string

    @ApiProperty({ example: 'Может создавать статьи', description: 'Описание роли' })
    @Column({ type: DataType.STRING, allowNull: false })
    position: string

    @Column({type: DataType.ENUM(EQuest.DISTANT, EQuest.OFFICE), allowNull: false})
    typeOfWork: EQuest

    @Column({type: DataType.ENUM(EOffice.ROSTOV, EOffice.TAGANROG), allowNull: true})
    office: EOffice

    @Column({type: DataType.STRING, allowNull: true})
    city: string

    @Column({type: DataType.STRING, allowNull: false})
    fact: string

    @ForeignKey(() => User)
    @Column
    userId: number

    @BelongsTo(()=>User)
    user: User

}
