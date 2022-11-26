import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangeRoleDto } from './dto/ChangeRole.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { User } from '../models/user.model';
import { UserService } from './user.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private UserService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('/activ/:value')
  async activation(@Param('value') value: string) {
    const fuser = await this.UserService.activate(value);
    return fuser;
  }

  @ApiOperation({ summary: 'Поиск пользователя по почте' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(RolesGuard)
  @Roles('USER')
  @Post('/byemail')
  GetUserByEmail(@Body('email') email: string) {
    return this.UserService.getUserByEmail(email);
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: 200 })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Post('/addrole')
  ChangeRole(@Body() dto: ChangeRoleDto) {
    return this.UserService.addRole(dto);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @UseGuards(RolesGuard)
  @Roles('ADMIN')
  @Get('/all')
  AllPeople() {
    return this.UserService.getAll();
  }

  @ApiOperation({ summary: 'Профиль пользователя' })
  @Get('/profile')
  userProfile(@Headers('authorization') authorization: string) {
    return this.UserService.GetMyProfile(authorization);
  }
}
