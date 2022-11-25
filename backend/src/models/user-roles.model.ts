import { BelongsToMany, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { Role } from './role.model'
import { User } from './user.model'

@Table({ tableName: 'User_role', timestamps:false, freezeTableName:true  })
export class UserRoles extends Model<UserRoles> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ForeignKey(() => Role)
    @Column({ type: DataType.INTEGER })
    roleId: number

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number
}
