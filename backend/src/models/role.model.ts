import { ApiProperty } from '@nestjs/swagger'
import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { UserRoles } from './user-roles.model'
import { User } from './user.model'

interface RoleCreationAttrs {
    value: string
    description: string
}

@Table({ tableName: 'Role', timestamps:false, freezeTableName:true })
export class Role extends Model<Role, RoleCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'CREATOR', description: 'Роль' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string

    @ApiProperty({ example: 'Может создавать статьи', description: 'Описание роли' })
    @Column({ type: DataType.STRING, allowNull: false })
    description: string

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}
