import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { handleExceptions } from '@src/shared/helpers/general';
import { CreateEntityDto } from '../models/dto/create-entity.dto';
import config from '@src/config/config';
import { ConfigType } from '@nestjs/config';
import { LogsService } from '@src/logs/services/logs.service';
import { UpdateEntityDto } from '../models/dto/update-entity.dto';
import { CreateBenefitPlansDto } from '../models/dto/create-benefit-plan.dto';
import { UpdateBenefitPlanDto } from '../models/dto/update-benefit-plan.dto';

@Injectable()
export class ConfigurationsServices {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(config.KEY)
    private readonly configuration: ConfigType<typeof config>,
    private readonly logs: LogsService,
  ) {}

 

}
