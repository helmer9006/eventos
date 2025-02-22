import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsController } from './controllers/events.controller';
import { PrismaService } from '@src/prisma/services/prisma.service';
import { MailModule } from '@src/mail/mail.module';
import { UsersService } from '../users/services/users.service';
import { LogsService } from '@src/logs/services/logs.service';
import { UtilsService } from '@src/shared/services/utils.service';
import { AxiosAdapter } from '@src/shared/adapters/axios.adapter';

@Module({
  imports: [MailModule],
  controllers: [EventsController],
  providers: [
    EventsService,
    PrismaService,
    UsersService,
    LogsService,
    UtilsService,
    AxiosAdapter,
  ],
})
export class EventsModule {}
