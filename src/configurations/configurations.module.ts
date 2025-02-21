import { Module } from '@nestjs/common';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { UtilsService } from '@src/shared/services/utils.service';
import { AxiosAdapter } from '@src/shared/adapters/axios.adapter';
import { LogsService } from '@src/logs/services/logs.service';
import { AuthService } from '@src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigurationsController } from './controllers/configurations.controller';
import { ConfigurationsServices } from './services/configurations.service';

@Module({
  controllers: [ConfigurationsController],
  providers: [
    ConfigurationsServices,
    PrismaService,
    UtilsService,
    AxiosAdapter,
    AuthService,
    LogsService,
    JwtService,
  ],
})
export class ConfigurationsModule {}
