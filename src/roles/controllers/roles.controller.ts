import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { RolesService } from '../services/roles.service';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';
import { Auth } from '@src/auth/decorators';
import { SW_RESPONSES } from '@src/shared/helpers/responses-swagger';

@Controller('roles')
@ApiTags('Services roles')
@ApiBearerAuth()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Auth()
  @ApiOkResponse(SW_RESPONSES.listRolesResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async findAll(@Query() paginationDto: PaginationDto) {
    const data = await this.rolesService.findAll(paginationDto);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Roles encontrados.',
    );
  }
}
