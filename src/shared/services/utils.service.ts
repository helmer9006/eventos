import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { ConfigService, ConfigType } from '@nestjs/config';
import { AxiosAdapter } from '../adapters/axios.adapter';
import { Logger } from '@nestjs/common';
import { handleExceptions } from '../helpers/general';
import config from '@src/config/config';

@Injectable()
export class UtilsService {
  constructor(
    private prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly http: AxiosAdapter,
    @Inject(config.KEY)
    private readonly configuration: ConfigType<typeof config>,
  ) {}
  logger = new Logger('UtilsService');
  async validatePermission(code: string, roleId: number) {
    try {
      const permission = await this.prismaService.permissions.findMany({
        where: {
          code: code,
          rolesPermission: {
            some: { roleId: roleId },
          },
        },
        include: { rolesPermission: true },
      });
      if (permission.length == 0) throw Error;
      return;
    } catch (error) {
      throw new GenericResponse(
        {},
        401,
        'No tiene permisos necesario para acceder al recurso.',
      );
    }
  }

}
