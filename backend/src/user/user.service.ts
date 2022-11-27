import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ChangeRoleDto } from './dto/ChangeRole.dto';
import { CreateUserDto } from './dto/create_user.dto';
import { UpdateUserDto } from '../questionary/dto/UpdateUser.dto';
import { User } from '../models/user.model';
import { profileUserDto } from './dto/profileUser.dto';
import { Op } from 'sequelize';
import { Role } from 'src/models/role.model';
import { RoleService } from 'src/role/role.service';
import { TokenService } from 'src/token/token.service';
import { Quest } from 'src/models/quest.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleService: RoleService,
    private tokenService: TokenService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }
  async addRole(dto: ChangeRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('roles', [role.id]);
      return user;
    }
    throw new HttpException(
      'Пользователь или роль не найдена',
      HttpStatus.NOT_FOUND,
    );
  }

  async getAll() {
    const users = await this.userRepository.findAll({
      where: { isActivated: false },
    });
    return users;
  }

  async updateUser(dto: UpdateUserDto, user: User) {
    await user.update({ ...dto });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id, {
      include: { all: true },
    });
    if (user) return user;
    throw new HttpException('пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async deleteUser(email: string) {
    const user = await this.getUserByEmail(email);
    await this.userRepository.destroy({ where: { id: user.id } });
  }

  async getUserByCode(code: string) {
    return this.userRepository.findOne({ where: { switchKey: code } });
  }

  async activate(value: string) {
    const user = await this.userRepository.findOne({
      where: { acticationLink: value },
    });
    if (user) {
      user.update({ isActivated: true });
      return user;
    }
    throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
  }

  async GetMyProfile(authorization: string) {
    const decoded = await this.tokenService.getDataFromToken(authorization);
    delete decoded.iat;
    delete decoded.exp;

    let userProfileData = await this.getUserById(decoded.id);
    const temp = JSON.stringify(userProfileData);
    userProfileData = JSON.parse(temp);
    console.log(userProfileData.questId);

    let userObject = {
      ...decoded,
/*       name: userProfileData.questId.name,
      surname: userProfileData.questId.surname, */
      /* photo: `${process.env.URL_FOR_IMG}${userProfileData.questId.photoPath}`, */
    };
    userObject.roles = userObject.roles.map((el) => {
      return el.value;
    });
    console.log({ user: userObject });
    return userObject;
  }

  async getAllWithoutNewbie(userId: number) {
    return this.userRepository.findAll({
      where: {
        id: { [Op.ne]: userId },
      },
    });
  }

  async getCountofUsers(option?: any) {
    if (option) {
      return this.userRepository.findAndCountAll({
        include: { model: Quest, where: { city: option } },
      });
    } else return this.userRepository.findAndCountAll();
  }
}
