import {
  Injectable,
  HttpStatus,
  Logger,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { CreateUserDto, UpdateUserDto } from '../models/dto';
import { PrismaService } from '@src/prisma/services/prisma.service';
import config from '@src/config/config';
import { isNumber } from '@src/shared/helpers/general';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';
import { UtilsService } from '../../shared/services/utils.service';
import { readFileSync } from 'fs';
import { LogsService } from '@src/logs/services/logs.service';
import { handleExceptions } from '../../shared/helpers/general';
import { Users } from '@prisma/client';
import { AuthService } from '@src/auth/services/auth.service';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '../models/dto/change-pasword.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(config.KEY)
    private readonly configuration: ConfigType<typeof config>,
    private readonly prismaService: PrismaService,
    private readonly logs: LogsService,
  ) {}

  logger = new Logger('UserService');

  async create(createUserDto: CreateUserDto, userId: number, roleId) {
    // await this.utilService.validatePermission('USE001', roleId)
    try {
      // Decode password Base64
      const decodedPassword = Buffer.from(
        createUserDto.password,
        'base64',
      ).toString('utf-8');

      //hashed  password
      const hashedPassword = await bcrypt.hash(decodedPassword, 10);
      createUserDto.password = hashedPassword;
      const { description, action } = this.configuration.AUDIT_ACTIONS
        ? this.configuration.AUDIT_ACTIONS.USER_CREATE
        : null;

      const userCreated = await this.prismaService.users.create({
        data: { ...createUserDto, roleId: createUserDto.roleId },
      });

      // Insert log for audit
      const dataObject = {
        actionUserId: userId,
        description: description,
        typeAction: action,
        data: JSON.stringify(createUserDto),
        model: this.configuration.MODELS.USERS,
        modelId: userCreated.id,
        createdAt: new Date(),
      };
      this.logs.create(dataObject);
      const { password, ...response } = userCreated;
      return response;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit, offset = 1, term } = paginationDto;
      let where;
      if (term && isNumber(term)) {
        where = {
          identification: { contains: term, mode: 'insensitive' },
        };
      } else if (term) {
        where = {
          OR: [
            {
              name: { contains: term, mode: 'insensitive' },
            },
            {
              lastname: { contains: term, mode: 'insensitive' },
            },
          ],
        };
      }
      const [count, users] = await this.prismaService.$transaction([
        this.prismaService.users.count({ where }),
        this.prismaService.users.findMany({
          where,
          take: limit ? limit : undefined,
          skip: limit ? (offset - 1) * limit : undefined,
          select: {
            id: true,
            name: true,
            lastname: true,
            identificationType: true,
            identification: true,
            email: true,
            phone: true,
            isActive: true,
            roleId: true,
            createdAt: true,
            roles: true,
          },
          orderBy: {
            name: 'asc',
          },
        }),
      ]);
      return { count, users };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findByMail(email: string) {
    let user;
    try {
      user = await this.prismaService.users.findUnique({
        where: {
          email: email.toString().trim().toLowerCase(),
        },
        select: {
          id: false,
          name: true,
          lastname: true,
          identificationType: true,
          identification: true,
          email: true,
          phone: true,
          isActive: true,
          roleId: true,
          createdAt: true,
          roles: true,
        },
      });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      return user;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, userId: number) {
    const { description, action } = this.configuration.AUDIT_ACTIONS
      ? this.configuration.AUDIT_ACTIONS.USER_UPDATE
      : null;
    try {
      if (updateUserDto.hasOwnProperty('password')) {
        // Decode password Base64
        const decodedPassword = Buffer.from(
          updateUserDto.password,
          'base64',
        ).toString('utf-8');

        //hashed  password
        const hashedPassword = await bcrypt.hash(decodedPassword, 10);
        updateUserDto.password = hashedPassword;
      }
      const { createdAt, updatedAt, ...body } = updateUserDto;
      const updatedUser = await this.prismaService.users.update({
        where: {
          id: id,
        },
        data: updateUserDto,
      });
      if (!updatedUser)
        throw new NotFoundException('El usuario no pudo ser actualizado.');
      const dataObject = {
        actionUserId: userId,
        description: description,
        typeAction: action,
        data: JSON.stringify(updateUserDto),
        model: this.configuration.MODELS.USERS,
        modelId: updatedUser.id,
        createdAt: new Date(),
      };
      this.logs.create(dataObject);
      return updatedUser;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findByRoleId(roleId: number, paginationDto: PaginationDto) {
    try {
      const { limit = 10, offset = 1 } = paginationDto;
      return await this.prismaService.users.findMany({
        where: { roleId: roleId },
        select: {
          id: false,
          name: true,
          lastname: true,
          identificationType: true,
          identification: true,
          email: true,
          phone: true,
          isActive: true,
          roleId: true,
          createdAt: true,
          roles: true,
        },
        take: limit,
        skip: (offset - 1) * limit,
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      handleExceptions(error);
    }
  }

  async updatePassword(changePasswordDto: ChangePasswordDto, userId: number) {
    const { description, action } = this.configuration.AUDIT_ACTIONS
      ? this.configuration.AUDIT_ACTIONS.CHANGE_PASSWORD
      : null;
    try {
      const userFound = await this.prismaService.users.findUnique({
        where: { id: userId },
        select: {
          password: true,
        },
      });
      if (!userFound)
        throw new BadRequestException(
          'Usuario no encontrado, no es posible realizar el proceso.',
        );
      const { newPassword } = changePasswordDto;

      const decodedPasswordNew = Buffer.from(newPassword, 'base64').toString(
        'utf-8',
      );
      //hashed  passwords
      const hashedPasswordNew = await bcrypt.hash(decodedPasswordNew, 10);

      const updatedUser = await this.prismaService.users.update({
        where: {
          id: userId,
        },
        data: { password: hashedPasswordNew },
      });
      if (!updatedUser)
        throw new NotFoundException(
          'La contraseña no pudo ser actualizada, vuelve a intentarlo.',
        );
      const dataObject = {
        actionUserId: userId,
        description: description,
        typeAction: action,
        data: JSON.stringify({ password: hashedPasswordNew }),
        model: this.configuration.MODELS.USERS,
        modelId: updatedUser.id,
        createdAt: new Date(),
      };
      this.logs.create(dataObject);
      const { password, ...user } = updatedUser;
      return user;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async findById(userId: number) {
    try {
      const foundUser = await this.prismaService.users.findUnique({
        where: { id: userId },
        select: {
          id: false,
          name: true,
          lastname: true,
          identificationType: true,
          identification: true,
          email: true,
          phone: true,
          isActive: true,
          roleId: true,
          createdAt: true,
          roles: true,
        },
      });
      if (!foundUser) throw new NotFoundException('Usuario no encontrado.');
      return foundUser;
    } catch (error) {
      handleExceptions(error);
    }
  }

  async createPublic(createUserDto: CreateUserDto, roleId: number) {
    try {
      // Decode password Base64
      const decodedPassword = Buffer.from(
        createUserDto.password,
        'base64',
      ).toString('utf-8');

      //hashed  password
      const hashedPassword = await bcrypt.hash(decodedPassword, 10);
      createUserDto.password = hashedPassword;
      const { description, action } = this.configuration.AUDIT_ACTIONS
        ? this.configuration.AUDIT_ACTIONS.USER_CREATE
        : null;
      delete createUserDto.roleId;
      const userCreated = await this.prismaService.users.create({
        data: { ...createUserDto, roleId: roleId },
      });
      const { password, ...response } = userCreated;
      return response;
    } catch (error) {
      handleExceptions(error);
    }
  }
}
