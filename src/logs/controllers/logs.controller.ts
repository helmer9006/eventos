import { Controller, Post, Body, HttpStatus, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { LogsService } from '../services/logs.service';
import { CreateLogDto } from '../models/dto/create-log.dto';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { Auth, GetUser } from '@src/auth/decorators';
import { RolesEnum } from '@src/auth/enums/roles.enum';
import { RequestGetLogsDto } from '../models/dto/request-get-logs.dto';
import { SW_RESPONSES } from '@src/shared/helpers/responses-swagger';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';

@Controller('logs')
@ApiTags('Services Logs')
@ApiBearerAuth()
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post('create')
  @ApiBody({ type: CreateLogDto })
  @ApiOkResponse(SW_RESPONSES.createLogsOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @Auth(RolesEnum.SUPERADMIN)
  async create(@Body() createLogDto: CreateLogDto) {
    const data = await this.logsService.create(createLogDto);
    if (Object.keys(data).length == 0) {
      throw new GenericResponse(
        {},
        HttpStatus.BAD_REQUEST.valueOf(),
        'Error creando registro de log.',
      );
    }
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Log creado correctamente.',
    );
  }

  @Post('/getLogs')
  @Auth()
  @ApiBody({ type: RequestGetLogsDto })
  @ApiOkResponse(SW_RESPONSES.getLogsUsersOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async findLogs(
    @Body() getUsersLogsDto: RequestGetLogsDto,
    @GetUser('roleId') roleId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    const data = await this.logsService.findLogs(
      getUsersLogsDto,
      roleId,
      paginationDto,
    );
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Logs encontrados.',
    );
  }
}
