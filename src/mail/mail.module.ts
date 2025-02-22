import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailService } from './services/mail.service';
import { MailController } from './controllers/mail.controller';
import { MailProcessor } from './services/mail.processesor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'mailQueue', // Nombre de la cola
    }),
  ],
  controllers: [MailController],
  providers: [MailService, MailProcessor],
  exports: [MailService], // Exporta MailService para que otros módulos puedan usarlo
})
export class MailModule {}
