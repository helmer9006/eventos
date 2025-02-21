import {
  Injectable,
  HttpStatus,
  Inject,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { ConfigService, ConfigType } from '@nestjs/config';
import config from '@src/config/config';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { LoginDto } from '@src/auth/models/dto/login.dto';
import { handleExceptions } from '@src/shared/helpers/general';
import { ParseIntPipe } from '@src/shared/pipes/parse-int.pipe';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(enterPassword: string, email: string) {
    try {
      const userFound = await this.prismaService.users.findUnique({
        where: { email },
      });
      if (!userFound)
        throw new BadRequestException(
          'El correo electrónico proporcionado no está registrado o la contraseña es incorrecta. Por favor, verifica y vuelve a intentarlo',
        );
      // Decode password Base64
      const decodedPassword = Buffer.from(enterPassword, 'base64').toString(
        'utf-8',
      );

      // validate password
      const isCorrectPass = await bcrypt.compare(
        decodedPassword,
        userFound.password,
      );
      if (!isCorrectPass)
        throw new BadRequestException(
          'El correo electrónico proporcionado no está registrado o la contraseña es incorrecta. Por favor, verifica y vuelve a intentarlo',
        );
      if (!userFound.isActive)
        throw new BadRequestException(
          'Se ha detectado que su usuario está inactivo. Por favor, póngase en contacto con el administrador del sistema.',
        );
      const token = await this.generateJwtTokenAlly(userFound);
      const { password, ...user } = userFound;
      const modules = await this.prismaService.modules.findMany({
        where: { permissions: { some: {} } },
        include: {
          permissions: {
            where: {
              rolesPermission: {
                some: {
                  roleId: userFound.roleId,
                },
              },
            },
          },
        },
      });
      const modulesToReturn = modules.filter(
        (module) => module.permissions.length > 0,
      );
      return { user, token, modules: modulesToReturn };
    } catch (error) {
      handleExceptions(error);
    }
  }

  async generateJwtTokenAlly(user: Users): Promise<string> {
    try {
      if (!user)
        throw new BadRequestException(
          'No es posible generar el token, datos incompletos.',
        );
      const { password, createdAt, updatedAt, ...payload } = user;
      const token = await this.jwtService.sign(payload);
      return token;
    } catch (error) {
      handleExceptions(error);
    }
  }
}
