import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../models/dto/create-user.dto';
import { UpdateUserDto } from '../models/dto/update-user.dto';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { EmailPipe } from '@src/shared/pipes/email.pipe';
import { PaginationDto } from '@src/shared/models/dto/pagination.dto';
import { GetUser } from '@src/auth/decorators/get-user.decorator';
import { RolesEnum } from '@src/auth/enums/roles.enum';
import { Auth } from '@src/auth/decorators';
import { SW_RESPONSES } from '@src/shared/helpers/responses-swagger';
import { ParseIntPipe } from '@src/shared/pipes/parse-int.pipe';
import { ChangePasswordDto } from '../models/dto/change-pasword.dto';

@Controller('users')
@ApiTags('Services users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @Auth(RolesEnum.SUPERADMIN)
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse(SW_RESPONSES.createUserOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.createUserUnauthorizeResponse)
  @ApiConflictResponse(SW_RESPONSES.conflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async create(
    @Body() createUserDto: CreateUserDto,
    @GetUser('id') userId: number,
    @GetUser('roleId') roleId: number,
  ) {
    const data = await this.usersService.create(createUserDto, userId, roleId);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuario creado correctamente.',
    );
  }

  @Get()
  @ApiOkResponse(SW_RESPONSES.getUserOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.createUserUnauthorizeResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @Auth(RolesEnum.SUPERADMIN)
  async findAll(@Query() paginationDto: PaginationDto) {
    const data = await this.usersService.findAll(paginationDto);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuarios encontrados',
    );
  }

  @Patch('update/:id')
  @Auth(RolesEnum.SUPERADMIN)
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse(SW_RESPONSES.updateUserOkResponse)
  @ApiConflictResponse(SW_RESPONSES.userConflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiNotFoundResponse(SW_RESPONSES.updateUserNotFoundResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiParam({
    name: 'id',
    description: 'Identificador(id) del usuario.',
    type: Number,
    example: 1,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser('id') userId: number,
  ) {
    const data = await this.usersService.update(id, updateUserDto, userId);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuario actualizado correctamente.',
    );
  }

  @Get('/getByMail/:email')
  @Auth()
  @ApiOkResponse(SW_RESPONSES.getMailUserOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiParam({
    name: 'email',
    description: 'Correo electrónico a consultar.',
    type: Number,
    example: 'hola@gmail.com',
  })
  async getByEmail(@Param('email', EmailPipe) email: string) {
    const data = await this.usersService.findByMail(email);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuario encontrado.',
    );
  }

  @Get('/getByRoleId/:roleId')
  @Auth()
  @ApiOkResponse(SW_RESPONSES.getByRoleIdUserOkResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiParam({
    name: 'roleId',
    description: 'Identificador(id) del rol.',
    type: Number,
    example: 1,
  })
  async getByRolId(
    @Param('roleId') roleId: string,
    @Query() paginationDto: PaginationDto,
  ) {
    const data = await this.usersService.findByRoleId(+roleId, paginationDto);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuario encontrado.',
    );
  }

  @Patch('changePassword')
  @Auth()
  @ApiBody({ type: UpdateUserDto })
  @ApiOkResponse(SW_RESPONSES.changePasswordUserOkResponse)
  @ApiConflictResponse(SW_RESPONSES.userConflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiNotFoundResponse(SW_RESPONSES.updateUserNotFoundResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  async updatePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @GetUser('id') userId: number,
  ) {
    const data = await this.usersService.updatePassword(
      changePasswordDto,
      userId,
    );
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Contraseña actualizada correctamente.',
    );
  }

  @Get('/getById/:userId')
  @Auth()
  @ApiOkResponse(SW_RESPONSES.getByRoleIdUserOkResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.unauthorizedResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  @ApiParam({
    name: 'userId',
    description: 'Identificador(id) del usuario.',
    type: Number,
    example: 1,
  })
  async getById(@Param('userId', ParseIntPipe) userId: number) {
    const data = await this.usersService.findById(userId);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuario encontrado.',
    );
  }

  @Post('createUserPublic')
  @ApiBody({ type: CreateUserDto })
  @ApiOkResponse(SW_RESPONSES.createUserOkResponse)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.createUserUnauthorizeResponse)
  @ApiConflictResponse(SW_RESPONSES.conflictResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async createPublic(@Body() createUserDto: CreateUserDto) {
    const roleId = await RolesEnum.SUBSCRIBER;
    const data = await this.usersService.createPublic(createUserDto, roleId);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuario creado correctamente.',
    );
  }
}
