import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto } from '../models/dto/create-event.dto';
import { UpdateEventDto } from '../models/dto/update-event.dto';
import { Auth, GetUser } from '@src/auth/decorators';
import { RolesEnum } from '@src/auth/enums/roles.enum';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SW_RESPONSES } from '@src/shared/helpers/responses-swagger';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';
import { PaginationEventsDto } from '../models/dto/pagination-events.dto';
import { ParseIntPipe } from '@src/shared/pipes/parse-int.pipe';

@Controller('events')
@ApiTags('Services events')
@ApiBearerAuth()
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('create')
  @ApiBody({ type: CreateEventDto })
  @ApiOkResponse(SW_RESPONSES.createEventOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiConflictResponse(SW_RESPONSES.conflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @Auth(RolesEnum.SUPERADMIN)
  async create(
    @Body() createEventDto: CreateEventDto,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    const data = await this.eventsService.create(createEventDto, userId);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Evento creado correctamente.',
    );
  }

  @Get()
  @Auth()
  @ApiOkResponse(SW_RESPONSES.getAllEventsOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async findAll(@Query() paginationEventDto: PaginationEventsDto) {
    const data = await this.eventsService.findAll(paginationEventDto);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Eventos encontrados',
    );
  }

  @Get(':id')
  @Auth()
  @ApiOkResponse(SW_RESPONSES.getOneEventsOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async findOne(@Param('id') id: string) {
    const data = await this.eventsService.findById(+id);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Evento encontrado',
    );
  }

  @Patch('update/:id')
  @Auth(RolesEnum.SUPERADMIN)
  @ApiBody({ type: UpdateEventDto })
  @ApiOkResponse(SW_RESPONSES.updateEventOkResponse)
  @ApiConflictResponse(SW_RESPONSES.conflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiParam({
    name: 'id',
    description: 'Identificador(id) del evento.',
    type: Number,
    example: 1,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser('id', ParseIntPipe) userId: number,
  ) {
    const data = await this.eventsService.update(id, updateEventDto, userId);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Evento actualizado correctamente.',
    );
  }

  @Delete('/remove/:id')
  @Auth(RolesEnum.SUPERADMIN)
  @ApiOkResponse(SW_RESPONSES.deleteEventsOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiParam({
    name: 'id',
    description: 'Identificador(id) del evento',
    type: Number,
  })
  async remove(@Param('id', ParseIntPipe) eventId: number) {
    const data = await this.eventsService.remove(eventId);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Evento eliminado correctamente.',
    );
  }
}
