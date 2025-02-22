import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { RegistrationsService } from '../services/registrations.service';
import { CreateRegistrationDto } from '../models/dto/create-registration.dto';
import { UpdateRegistrationDto } from '../models/dto/update-registration.dto';
import { RolesEnum } from '@src/auth/enums/roles.enum';
import { Auth, GetUser } from '@src/auth/decorators';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SW_RESPONSES } from '@src/shared/helpers/responses-swagger';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';

@Controller('registrations')
@ApiTags('Services registrations')
@ApiBearerAuth()
export class RegistrationsController {
  constructor(private readonly registrationsService: RegistrationsService) {}

  @Post('create/:eventId')
  @Auth(RolesEnum.SUPERADMIN, RolesEnum.SUBSCRIBER)
  @ApiOkResponse(SW_RESPONSES.createRegistrationOkResponse)
  @ApiConflictResponse(SW_RESPONSES.conflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiParam({
    name: 'eventId',
    description: 'Identificador(id) del evento.',
    type: Number,
    example: 1,
  })
  async createRegistrations(
    @Param('eventId', ParseIntPipe) eventId: number,
    @GetUser('id') userId: number,
  ) {
    const data = await this.registrationsService.createRegistrations(
      eventId,
      userId,
    );
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Inscripción realizada correctamente.',
    );
  }

  @Get()
  @Auth()
  @ApiOkResponse(SW_RESPONSES.getAllRegistrationsOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async findAll(
    @Query() paginationDto: PaginationDto,
    @GetUser('roleId') roleId: number,
    @GetUser('id') userId: number,
  ) {
    const data = await this.registrationsService.findAll(
      paginationDto,
      roleId,
      userId,
    );
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Eventos encontrados',
    );
  }

  @Post('cancel/:registrationId')
  @Auth(RolesEnum.SUPERADMIN, RolesEnum.SUBSCRIBER)
  @ApiOkResponse(SW_RESPONSES.cancelRegistrationOkResponse)
  @ApiConflictResponse(SW_RESPONSES.conflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiParam({
    name: 'registrationId',
    description: 'Identificador(id) de la inscripción.',
    type: Number,
    example: 1,
  })
  async cancelRegistrations(
    @Param('registrationId', ParseIntPipe) registrationId: number,
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
  ) {
    const data = await this.registrationsService.cancelRegistration(
      registrationId,
      userId,
      roleId,
    );
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Inscripción cancelada correctamente.',
    );
  }
}
