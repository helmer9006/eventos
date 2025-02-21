import {
  Injectable,
  HttpStatus,
  InternalServerErrorException,
  Logger,
  Inject,
} from '@nestjs/common';
import { CreateRoleDto } from '../models/dto/create-role.dto';
import { UpdateRoleDto } from '../models/dto/update-role.dto';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { BadRequestException, ConflictException } from '@src/shared/exceptions';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { ICreateRolePermission } from '../interface/create-role-permission.interface';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';
import { UtilsService } from '../../shared/services/utils.service';
import { ConfigType } from '@nestjs/config';
import config from '@src/config/config';
import { LogsService } from '@src/logs/services/logs.service';
import { handleExceptions } from '@src/shared/helpers/general';

@Injectable()
export class RolesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly utilService: UtilsService,
    @Inject(config.KEY)
    private readonly configuration: ConfigType<typeof config>,
    private readonly logs: LogsService,
  ) {}
  logger = new Logger('RolesService');

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit, offset = 1, term } = paginationDto;
      return await this.prismaService.roles.findMany({
        where: {
          name: {
            contains: term,
            mode: 'insensitive',
          },
        },
        include: {
          rolesPermissions: {
            include: {
              permissions: true,
            },
          },
        },
        take: limit ? limit : undefined,
        skip: limit ? (offset - 1) * limit : undefined,
        orderBy: {
          name: 'asc',
        },
      });
    } catch (error) {
      handleExceptions(error);
    }
  }

  async updateRolePermission(roleId: number, permissions: number[]) {
    try {
      const currentPermissions =
        await this.prismaService.rolesPermissions.findMany({
          where: { roleId: roleId },
        });
      const IdsCurrentRolesPermissions =
        currentPermissions.length > 0
          ? currentPermissions.map((permission) => permission.permissionId)
          : [];
      const permissionsToInsert = permissions.filter(
        (permiso) => !IdsCurrentRolesPermissions.includes(permiso),
      );
      const permissionsToDelete = IdsCurrentRolesPermissions.filter(
        (permiso) => !permissions.includes(permiso),
      );
      const IdsPermissionsToDelete = currentPermissions
        .filter((permission) =>
          permissionsToDelete.includes(permission.permissionId),
        )
        .map((item) => item.id);

      if (IdsPermissionsToDelete && IdsPermissionsToDelete.length > 0) {
        await this.prismaService.rolesPermissions.deleteMany({
          where: {
            id: {
              in: IdsPermissionsToDelete,
            },
          },
        });
      }
      let res;
      if (permissionsToInsert && permissionsToInsert.length > 0) {
        const rolesPermissions: ICreateRolePermission[] =
          permissionsToInsert.map((permission) => {
            return { roleId: roleId, permissionId: permission };
          });
        res = await this.prismaService.rolesPermissions.createMany({
          data: rolesPermissions,
        });
      }

      return res;
    } catch (error) {
      handleExceptions(error);
    }
  }
}
