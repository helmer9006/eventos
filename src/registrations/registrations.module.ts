import { Module } from '@nestjs/common';
import { RegistrationsService } from './services/registrations.service';
import { RegistrationsController } from './controllers/registrations.controller';
import { UsersService } from '@src/users/services/users.service';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { EventsService } from '@src/events/services/events.service';
import { LogsService } from '@src/logs/services/logs.service';
import { UtilsService } from '@src/shared/services/utils.service';
import { AxiosAdapter } from '@src/shared/adapters/axios.adapter';
import { MailModule } from '@src/mail/mail.module';

@Module({
  controllers: [RegistrationsController],
  providers: [
    RegistrationsService,
    UsersService,
    PrismaService,
    EventsService,
    LogsService,
    UtilsService,
    AxiosAdapter,
  ],
  imports: [MailModule],
})
export class RegistrationsModule {}
