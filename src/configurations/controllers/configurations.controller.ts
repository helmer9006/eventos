import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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
import { ConfigurationsServices } from '../services/configurations.service';
import { SW_RESPONSES } from '@src/shared/helpers/responses-swagger';
import { RolesEnum } from '@src/auth/enums/roles.enum';
import { Auth, GetUser } from '@src/auth/decorators';
import { GenericResponse } from '@src/shared/models/generic-response.model';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { CreateEntityDto } from '../models/dto/create-entity.dto';
import { UpdateEntityDto } from '../models/dto/update-entity.dto';
import { ParseIntPipe } from '@src/shared/pipes/parse-int.pipe';
import { CreateBenefitPlansDto } from '../models/dto/create-benefit-plan.dto';
import { UpdateBenefitPlanDto } from '../models/dto/update-benefit-plan.dto';

@Controller('configurations')
@ApiTags('Services Configurations')
@ApiBearerAuth()
export class ConfigurationsController {
  constructor(
    private readonly configurationsServices: ConfigurationsServices,
    private readonly prismaService: PrismaService,
  ) {}

}
