import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBody,
  ApiTags,
  ApiOkResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

import { LoginDto } from '@src/auth/models/dto/login.dto';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { SW_RESPONSES } from '@src/shared/helpers/responses-swagger';
import { AuthService } from '@src/auth/services/auth.service';
import { GenericResponse } from '@src/shared/models/generic-response.model';

@Controller('auth')
@ApiTags('Services Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('/login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse(SW_RESPONSES.loginOkResponse)
  @ApiUnauthorizedResponse(SW_RESPONSES.loginFailedUnauthorized)
  @ApiBadRequestResponse(SW_RESPONSES.badRequestResponse)
  @ApiInternalServerErrorResponse(SW_RESPONSES.errorServerResponse)
  async login(@Body() { password, email }: LoginDto) {
    const data = await this.authService.login(password, email);
    return new GenericResponse(
      data,
      HttpStatus.OK.valueOf(),
      'Usuario logueado correctamente.',
    );
  }
}
