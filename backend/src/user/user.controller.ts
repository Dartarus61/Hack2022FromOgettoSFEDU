import { Body, Controller, Get, Headers, Param, Post, Put, Redirect, UseGuards } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Roles } from 'backend/src/auth/roles-auth.decorator'
import { RolesGuard } from 'backend/src/auth/roles.guard'
import { ChangeRoleDto } from './dto/ChangeRole.dto'
import { CreateUserDto } from './dto/create_user.dto'
import { UpdateUserDto } from './dto/UpdateUser.dto'
import { User } from '../models/user.model'
import { UserService } from './user.service'
@ApiTags('Пользователи')
@Controller('user')
export class UserController {
    constructor(private UserService: UserService) {}

    @Get('/activ/:value')
    @Redirect('http://localhost:3000/login')
    async activation(@Param('value') value: string) {
        const fuser = await this.UserService.activate(value)
        return { url: 'http://localhost:3000/myProfile' }
    }

    @ApiOperation({ summary: 'Поиск пользователя по почте' })
    @ApiResponse({ status: 200, type: User })
    @UseGuards(RolesGuard)
    @Roles('USER')
    @Post('/byemail')
    GetUserByEmail(@Body('email') email: string) {
        return this.UserService.getUserByEmail(email)
    }

    @ApiOperation({ summary: 'Выдать роль' })
    @ApiResponse({ status: 200 })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Post('/addrole')
    ChangeRole(@Body() dto: ChangeRoleDto) {
        return this.UserService.addRole(dto)
    }

    @ApiOperation({ summary: 'Получить всех пользователей' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Get('/all')
    AllPeople() {
        return this.UserService.getAll()
    }

    @Get('/profile')
    userProfile(@Headers('authorization') authorization: string) {
        return this.UserService.GetMyProfile(authorization)
    }
}
